'use client';

import '@motion-canvas/core';
import '@motion-canvas/player';

export function MotionCanvas(props) {
  const { src, auto = false } = props;
  return (
    <motion-canvas-player
      src={src}
      auto={auto}
      />
  );
}