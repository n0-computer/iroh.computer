'use client';

import {createContext} from 'react';
import {ThemeProvider} from 'next-themes';

export const AppContext = createContext({})

export function Providers({ children }) {
  // TEMP-DARK-TOGGLE: drop forcedTheme so the floating dev toggle can switch modes.
  // To revert: restore forcedTheme="light" and remove disableTransitionOnChange's neighbours.
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
