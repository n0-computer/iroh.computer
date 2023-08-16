'use client'

import Link from 'next/link'
import { navItems } from '@/components/Header'

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        // className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        className="text-irohGray-400 px-3 py-2 rounded-md text-sm font-medium transition ease-in-out delay-50 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export function HeaderSparse() {
  return (
    <nav id="navbar" className="fixed w-full transition-colors ease-in duration-1000">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="relative flex items-center justify-between h-20">
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          {/* Mobile menu button  */}
          <button id="toggle-mobile-menu" type="button" className="inline-flex items-center justify-center p-2 rounded-md text-irohGray-400 hover:text-white hover:bg-irohGray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
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
          <Link href="/" className="block flex-shrink-0 flex items-center mr-auto">
            <img className="block h-8 w-auto" src="/img/logo/iroh-wordmark-purple.svg" alt="Iroh" />
          </Link>
          
          <div className="hidden inset-y-0 sm:block sm:pr-0 sm:inset-auto">
            <ul className="flex space-x-5">
              {navItems.map((item,i ) => {
                return <TopLevelNavItem key={i} href={item.href}>{item.content}</TopLevelNavItem>
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile menu, show/hide based on menu state. */}
    <div id="mobile-menu" className="hidden bg-irohGray-100 sm:hidden transition-colors ease-in duration-1000" aria-hidden="true" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <a href="/docs" className="hover:text-white block px-3 py-2 rounded-md text-base font-medium">docs</a>
        <a href="/design" className="hover:text-white block px-3 py-2 rounded-md text-base font-medium">design</a>
        <a href="https://github.com/n0-computer" className="hover:text-white block px-3 py-2 rounded-md text-base font-medium">github</a>
      </div>
    </div>
  </nav>
  )
}