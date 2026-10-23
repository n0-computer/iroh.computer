"""Validate deployed XML files, optionally checking compatibility with an old RSS feed."""
import argparse
import datetime
import email.utils
import pathlib
import xml.etree.ElementTree as ET

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("directory", type=pathlib.Path)
parser.add_argument("--previous-rss", type=pathlib.Path)
args = parser.parse_args()
site = "https://iroh.computer"

rss = ET.parse(args.directory / "rss.xml").getroot()
assert rss.tag == "rss" and rss.attrib["version"] == "2.0"
channel = rss.find("channel")
assert channel.findtext("link") == site
atom = channel.find("{http://www.w3.org/2005/Atom}link")
assert atom.attrib == {"href": site + "/rss.xml", "rel": "self", "type": "application/rss+xml"}
items = channel.findall("item")
assert items, "empty RSS feed"
guids, dates = set(), []
for item in items:
    url = item.findtext("link")
    guid = item.find("guid")
    assert url.startswith(site + "/blog/"), url
    assert guid.text == url and guid.attrib["isPermaLink"] == "true"
    assert guid.text not in guids, "duplicate GUID: " + guid.text
    guids.add(guid.text)
    assert item.findtext("title"), "missing title: " + url
    assert item.find("description") is not None
    date = email.utils.parsedate_to_datetime(item.findtext("pubDate"))
    assert date.utcoffset() == datetime.timedelta(0), date
    dates.append(date)
assert dates == sorted(dates, reverse=True), "RSS is not newest first"

namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
sitemap = ET.parse(args.directory / "sitemap.xml").getroot()
assert sitemap.tag == namespace + "urlset"
locations = set()
for entry in sitemap:
    assert entry.tag == namespace + "url"
    loc = entry.findtext(namespace + "loc")
    assert loc.startswith(site + "/"), loc
    assert loc not in locations, "duplicate sitemap URL: " + loc
    locations.add(loc)
    date = entry.findtext(namespace + "lastmod")
    if date:
        assert datetime.date.fromisoformat(date).isoformat() == date
assert {site + path for path in ["/", "/blog", "/proto", "/pricing", "/services/hosting"]} <= locations

if args.previous_rss:
    old = ET.parse(args.previous_rss).getroot().findall("./channel/item")
    current = {item.findtext("guid"): item for item in items}
    for item in old:
        guid = item.findtext("guid")
        assert guid in current, "old subscriber item missing: " + guid
        assert item.findtext("link") == current[guid].findtext("link")
        assert email.utils.parsedate_to_datetime(item.findtext("pubDate")) == email.utils.parsedate_to_datetime(current[guid].findtext("pubDate"))
    print(f"Preserved {len(old)} existing feed IDs, links, and publication dates")
print(f"Valid XML: {len(items)} RSS items, {len(locations)} sitemap URLs")
