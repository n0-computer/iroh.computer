'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {motion} from 'framer-motion';

import {Footer} from '@/components/Footer';
import {Prose} from '@/components/Prose';
import {Header} from '@/components/Header';
import {Logotype} from '@/components/Logotype';
import {Navigation} from '@/components/Navigation';
import {SectionProvider} from '@/components/SectionProvider';

export const navItems = [
  {
    title: 'Getting Started',
    links: [
      {title: 'Overview', href: '/docs/overview'},
      {title: 'Quickstart', href: '/docs/quickstart'},
      {title: 'Tour', href: '/docs/tour' },
      {title: 'Examples', href: '/docs/examples'},
    ],
  },
  { title: 'Concepts',
    links: [
      {title: 'Architecture', href: '/docs/concepts/architecture'},
      {title: 'Endpoint', href: '/docs/concepts/endpoint'},
      {title: 'Relay', href: '/docs/concepts/relay'},
      {title: 'Discovery', href: '/docs/concepts/discovery'},
      {title: 'Protocol', href: '/docs/concepts/protocol'},
      {title: 'Router', href: '/docs/concepts/router'},
      {title: 'Ticket', href: '/docs/concepts/tickets'},
    ],
  },
  {title: 'Resources',
    links: [
      {title: 'Protocol Registry', href: '/proto'},
      {title: 'Awesome List', href: 'https://github.com/n0-computer/awesome-iroh'},
      {title: 'FAQ', href: '/docs/faq' },
    ],
  },
];

export default function DocsLayout({children, sections = {}}) {
  const pathname = usePathname();
  sections = sections[pathname] || [];

  return (
    <SectionProvider sections={sections}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logotype className="h-6" />
              </Link>
            </div>
            <Header sidebar={navItems} />
            <Navigation className="hidden lg:mt-10 lg:block" sidebar={navItems} />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">
            <article className="flex h-full flex-col pb-10 pt-16">
              <Prose className="flex-auto">{children}</Prose>
              <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
              </footer>
            </article>
          </main>
          <Footer navItems={navItems} />
        </div>
      </div>
    </SectionProvider>
  );
}
