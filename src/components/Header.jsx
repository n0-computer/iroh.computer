'use client'

import {forwardRef, useState, useRef, useEffect} from 'react';
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
  {content: 'Features', href: '/#features', dropdown: [
    {label: 'Relays', href: '/features/relays'},
    {label: 'Metrics', href: '/features/metrics'},
  ]},
  {content: 'Use Cases', href: '/#solutions', dropdown: [
    {label: 'Distributed AI', href: '/solutions/nous'},
    {label: 'Video Streaming', href: '/solutions/rave'},
    {label: 'Resilient Apps', href: '/solutions/delta-chat'},
    {label: 'Enterprise', href: '/enterprise'},
    {label: 'Open source', href: '/solutions/open-source'}
  ]},
  {content: 'Docs', href: 'https://docs.iroh.computer/'},
  {content: 'Blog', href: '/blog'},
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

function DropdownNavItem({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li className="relative flex items-center" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white inline-flex items-center gap-1"
      >
        {label}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 py-1 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-irohPurple-500"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
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
              if (item.dropdown) {
                return <DropdownNavItem key={i} label={item.content} items={item.dropdown} />;
              }
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
          <Button href="https://n0des.iroh.computer" variant="filled">Sign Up</Button>
        </div>
      </div>
    </motion.div>
  );
});
