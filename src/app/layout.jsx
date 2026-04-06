import glob from 'fast-glob';
import Script from 'next/script';

import {Providers} from '@/app/providers';
import '@/styles/tailwind.css';

export const metadata = {
  metadataBase: new URL('https://www.iroh.computer'),
  title: {
    template: '%s - Iroh',
    default: 'docs, guides, and examples',
  },
  openGraph: {
    title: 'iroh',
    description: 'less net work for networks',
    images: [{
      url: '/api/og?title=iroh&subtitle=less net work for networks',
      width: 1200,
      height: 630,
      alt: 'iroh. less net work for networks',
      type: 'image/png',
    }],
    type: 'website'
  }
};

export default async function RootLayout({children}) {
  let pages = await glob('**/*.mdx', {cwd: 'src/app'});
  let allSectionEntries = await Promise.all(
      pages.map(async (filename) => [
        '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
        (await import(`./${filename}`)).sections,
      ]),
  );
  let allSections = Object.fromEntries(allSectionEntries);

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="me" href="https://mastodon.social/@n0iroh" />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900 font-space">
        <Providers>
          <div className="w-full overflow-x-hidden">
            {children}
          </div>
        </Providers>
      </body>
      <Script defer data-domain="iroh.computer" src="https://plausible.io/js/script.outbound-links.js" />
    </html>
  );
}
