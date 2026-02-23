'use client';

import React, {useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import {navItems} from '@/components/Header';
import GithubStars from './GithubStars';

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-irohGray-400 px-3 py-2 rounded-md text-sm font-medium transition ease-in-out delay-50 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        {children}
      </Link>
    </li>
  );
}

function DropdownNavItem({ href, label, items }) {
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
        className="text-irohGray-400 px-3 py-2 rounded-md text-sm font-medium transition ease-in-out delay-50 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 inline-flex items-center gap-1"
      >
        {label}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-irohGray-800 rounded-md shadow-lg border border-irohGray-200 dark:border-irohGray-700 py-1 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-irohGray-600 dark:text-irohGray-300 hover:bg-irohGray-100 dark:hover:bg-irohGray-700 hover:text-irohPurple-500"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

function SignUpLink(props) {
  return (
    <li>
      <Link
        href="https://n0des.iroh.computer?utm_source=website&utm_content=nav-signup"
        className='px-3 py-2 flex text-sm bg-irohPurple-500 text-white transition hover:bg-irohPurple-400 rounded'>
        Sign Up
      </Link>
    </li>
  )
}

export function HeaderSparse() {
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  useEffect(() => {
    function handleScroll() {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 0) {
        navbar.classList.add('bg-irohGray-50', 'shadow-md', 'dark:bg-irohGray-900');
      } else {
        navbar?.classList.remove('bg-irohGray-50', 'shadow-md', 'dark:bg-irohGray-900');
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav id="navbar" className={clsx(
      "fixed w-full z-50",
      "transition-colors ease-in duration-200 bg-irohGray-50 dark:bg-irohGray-900 animate-all",
      mobileMenuOpen && 'backdrop-blur-md'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            {/* Mobile menu button  */}
            <button id="toggle-mobile-menu" type="button" onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-irohGray-400 hover:text-white hover:bg-irohGray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex sm:items-stretch sm:justify-start">
            <Link href="/" className="block shrink-0 flex items-center mr-auto">
              <img className="block h-7 w-auto" src="/img/logo/iroh-wordmark-purple.svg" alt="Iroh" width={200} />
            </Link>

            <div className="hidden inset-y-0 sm:block sm:pr-0 sm:inset-auto">
              <ul className="flex items-center space-x-5">
                {navItems.map((item, i ) => {
                  if (item.dropdown) {
                    return <DropdownNavItem key={i} href={item.href} label={item.content} items={item.dropdown} />;
                  }
                  return <TopLevelNavItem key={i} href={item.href}>{item.content}</TopLevelNavItem>;
                })}
                <SignUpLink />
                <li>
                  <GithubStars />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div id="mobile-menu" className={clsx("bg-white dark:bg-zinc-900 drop-shadow-md sm:hidden transition-colors ease-in duration-1000", mobileMenuOpen ? "block" : "hidden")} aria-hidden="true" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item, i ) => {
            if (item.dropdown) {
              return (
                <div key={i}>
                  <span className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">{item.content}</span>
                  {item.dropdown.map((sub) => (
                    <Link key={sub.href} href={sub.href} className="text-gray-400 block px-6 py-1.5 rounded-md text-sm">{sub.label}</Link>
                  ))}
                </div>
              );
            }
            return <Link key={i} href={item.href} className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">{item.content}</Link>;
          })}
        </div>
      </div>
    </nav>
  );
}
