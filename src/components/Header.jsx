'use client'

import {forwardRef} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {motion} from 'framer-motion';

import {Button} from '@/components/Button';
import {Logotype} from '@/components/Logotype';
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation';
import {useMobileNavigationStore} from '@/components/MobileNavigation';
import {MobileSearch, Search} from '@/components/Search';
import {ThemeToggle} from '@/components/ThemeToggle';
import GithubStars from './GithubStars';

export const navItems = [
  {content: 'Blog', href: '/blog'},
  {content: 'Docs', href: '/docs'},
  {content: 'Protocols', href: '/proto'},
  {content: 'Roadmap', href: '/roadmap'},
];

export function TopLevelNavItem({href, children}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export const Header = forwardRef(function Header({className, sidebar = []}, ref) {
  const {isOpen: mobileNavIsOpen} = useMobileNavigationStore();
  const isInsideMobileNavigation = useIsInsideMobileNavigation();

  return (
    <motion.div
      ref={ref}
      className={clsx(
          className,
          'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
          'bg-white dark:bg-zinc-900',
          !isInsideMobileNavigation &&
          'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
      )}
    >
      <div
        className={clsx(
            'absolute inset-x-0 top-full h-px transition',
            (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5',
        )}
      />
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation sidebar={sidebar}  />
        <Link href="/" aria-label="Home">
          <Logotype className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden lg:block">
          <ul role="list" className="flex items-center gap-8">
            {navItems.map((item, i ) => {
              return <TopLevelNavItem key={i} href={item.href}>{item.content}</TopLevelNavItem>;
            })}
            <li className='mt-2.5'>
              <GithubStars />
            </li>
          </ul>
        </nav>
        {/* <div className="hidden lg:block lg:h-5 lg:w-px lg:bg-zinc-900/10 lg:dark:bg-white/15" /> */}
        <div className="flex gap-4">
          <MobileSearch />
          <ThemeToggle />
        </div>
        <div className="hidden min-[416px]:contents">
          <Button href="https://iroh.computer/discord">Join Discord</Button>
        </div>
      </div>
    </motion.div>
  );
});
