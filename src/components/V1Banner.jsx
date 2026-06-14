'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {XMarkIcon} from '@heroicons/react/20/solid';

const STORAGE_KEY = 'iroh-v1-banner-dismissed';
// CSS variable that fixed headers + page content offset themselves by, so the
// banner never overlaps (or is overlapped by) the fixed topbars.
const HEIGHT_VAR = '--v1-banner-height';

export function V1Banner() {
  // Start hidden so SSR/first paint doesn't flash the banner before we've
  // checked localStorage; reveal once we know it hasn't been dismissed.
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname();
  // Don't promote the post on the post itself.
  const show = visible && pathname !== '/blog/v1';

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== '1') {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (e.g. private mode) — show the banner anyway.
      setVisible(true);
    }
  }, []);

  // Publish the banner's actual rendered height so the rest of the layout can
  // offset by it. Re-measure on resize since the banner can wrap on narrow
  // viewports. Reset to 0 whenever the banner isn't shown.
  useEffect(() => {
    const root = document.documentElement;
    if (!show || !ref.current) {
      root.style.setProperty(HEIGHT_VAR, '0px');
      return;
    }
    const el = ref.current;
    const update = () => root.style.setProperty(HEIGHT_VAR, `${el.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty(HEIGHT_VAR, '0px');
    };
  }, [show]);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore write failures
    }
  }

  if (!show) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] bg-iroh-purple-600 text-white w-full"
    >
      <Link
        href="/blog/v1"
        className="flex flex-wrap gap-x-3 gap-y-1 px-10 py-2 text-sm font-medium hover:bg-irohPurple-700 transition-colors"
      >
        <span>🎉 version 1.0 is here!</span>
        <span className="underline underline-offset-2">Read the blog post</span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute inset-y-0 right-0 flex items-center px-3 text-white/70 hover:text-white transition-colors"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
