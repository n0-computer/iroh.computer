'use client';

import {createContext} from 'react';
import {usePathname} from 'next/navigation';
import {ThemeProvider} from 'next-themes';

export const AppContext = createContext({})

export function Providers({ children }) {
  // The site is forced to light mode everywhere except the blog, where the
  // header exposes a theme toggle.
  const pathname = usePathname();
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/');

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme={isBlog ? undefined : 'light'}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
