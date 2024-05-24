import glob from 'fast-glob';

import {Providers} from '@/app/providers';
import {Layout} from '@/components/Layout';

import '@/styles/tailwind.css';

export const metadata = {
  title: {
    template: '%s - Iroh',
    default: 'docs, guides, and examples',
  },
  openGraph: {
    title: 'iroh',
    description: 'A distributed systems toolkit',
    images: [{
      url: '/api/og?title=iroh&subtitle=A distributed systems toolkit',
      width: 1200,
      height: 630,
      alt: 'iroh. A distributed systems toolkit',
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
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout
              allSections={allSections}>
              {children}
            </Layout>
          </div>
        </Providers>
        <script defer data-domain="iroh.computer" src="https://plausible.io/js/script.tagged-events.js"></script>
      </body>
    </html>
  );
}
