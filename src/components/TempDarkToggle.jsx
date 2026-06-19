'use client';
// TEMP-DARK-TOGGLE: floating button to switch between light and dark while tweaking SVGs.
// To revert: delete this file and remove the <TempDarkToggle/> usage in src/components/BlogPostLayout.jsx.

import {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';

export function TempDarkToggle() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 9999,
        padding: '8px 12px',
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        borderRadius: 6,
        border: '1px solid #888',
        background: isDark ? '#111' : '#fff',
        color: isDark ? '#fff' : '#111',
        cursor: 'pointer',
      }}
      aria-label="Toggle dark mode (temporary)"
    >
      {isDark ? '☀ light' : '☾ dark'}
    </button>
  );
}
