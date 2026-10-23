#!/usr/bin/env python3
"""Validate the deployable HTML, including without a JavaScript runtime."""
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.elements = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))

    def select(self, tag, **attrs):
        return [a for t, a in self.elements if t == tag and all(a.get(k) == v for k, v in attrs.items())]


def check(output):
    urls = [e.text for e in ET.parse(output / 'sitemap.xml').findall('.//{*}loc')]
    for url in urls + ['https://iroh.computer/404']:
        path = urlsplit(url).path
        file = output / ('index.html' if path == '/' else path.lstrip('/') + '.html')
        html = file.read_text()
        page = Page(html)
        assert len(page.select('title')) == 1, file
        assert len(page.select('meta', name='description')) == 1, file
        assert len(page.select('meta', property='og:title')) == 1, file
        assert page.select('h1'), file
        assert len(page.select('main', id='content')) == 1, file
        assert len(page.select('div', id='prerender')) == 1, file
        assert len(page.select('div', id='main')) == 1, file
        assert 'hidden' in page.select('div', id='main')[0], file
        assert '/private/' not in html and 'PLACEHOLDER_HASH' not in html, file
        if path == '/404':
            assert page.select('meta', name='robots', content='noindex'), file
            assert not page.select('link', rel='canonical'), file
        else:
            assert page.select('link', rel='canonical') == [{'data-iroh-meta': None, 'rel': 'canonical', 'href': url}], file
            assert not page.select('meta', name='robots'), file
        styles = page.select('link', rel='stylesheet')
        assert styles and 'style-dxh' in styles[0]['href'], file
        resources = [a['href'] for a in styles]
        scripts = page.select('script', type='module')
        assert scripts, file
        resources += [a['src'] for a in scripts]
        image = page.select('meta', property='og:image')[0]['content']
        if urlsplit(image).netloc == 'iroh.computer':
            resources.append(urlsplit(image).path)
        for resource in resources:
            assert (output / resource.lstrip('/')).is_file(), (file, resource)
    print(f'Validated {len(urls)} prerendered pages, the 404 page, metadata, and bundled assets')


if __name__ == '__main__':
    check(Path(sys.argv[1]))
