'use client'

import '@motion-canvas/core';
import '@motion-canvas/player';

export default function MotionCanvas(props) {
  const { src, auto = false } = props;
  return (
    <motion-canvas-player
      src={src}
      // TODO - re-enable auto-play, this throws an 'attempt to set getter-only property' error
      // client side at the moment
      // auto={false}
      />
  );
}