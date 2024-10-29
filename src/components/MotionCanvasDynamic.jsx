'use client'

import dynamic from 'next/dynamic'

// motion canvas player relies on 'HTMLElement' being defined,
// which is a browser API and not available in Node.js/
// This wrapper component disables server-side rendering
// https://nextjs.org/docs/messages/prerender-error#5-disable-server-side-rendering-for-components-using-browser-apis
export const MotionCanvasDynamic = dynamic(
  () => import('./MotionCanvas'),
  { ssr: false }
)