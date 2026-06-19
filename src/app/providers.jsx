'use client';

import {createContext} from 'react';
import {ThemeProvider} from 'next-themes';

export const AppContext = createContext({})

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
