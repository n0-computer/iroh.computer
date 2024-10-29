'use client'

import dynamic from 'next/dynamic'
import '@motion-canvas/core';

// motion canvas player relies on 'HTMLElement' being defined,
// which is a browser API and not available in Node.js/
// This wrapper component disables server-side rendering
// https://nextjs.org/docs/messages/prerender-error#5-disable-server-side-rendering-for-components-using-browser-apis
export const MotionCanvasNoSSR = dynamic(
  () => import('@motion-canvas/player'),
  { ssr: false }
)

export function MotionCanvas(props) {
  const { src, auto = false } = props;
  return (
    <MotionCanvasNoSSR
      src={src}
      auto={auto}
      />
  );
}