import React from 'react'

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 mx-0 w-full h-full max-w-none overflow-hidden">
      <svg id="visual" viewBox="0 0 900 600">
        <defs>
          <filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur stdDeviation="161" result="effect1_foregroundBlur"></feGaussianBlur>
          </filter>

          <circle id="shape" cx="450" cy="300" r="1200" />
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="19.5"
              numOctaves="10"
              result="turbulence"
            />
            <feComposite operator="in" in="turbulence" in2="SourceAlpha" result="composite"/>
            <feColorMatrix in="composite" type="luminanceToAlpha" />
            <feBlend in="SourceGraphic" in2="composite" mode="color-burn" />
          </filter>
          <mask id="gradient">
            <linearGradient id="fade">
              <stop offset="0%" stop-color="black" stop-opacity="0.6" />
              <stop offset="65%" stop-color="white" stop-opacity="0.9" />
              <stop offset="75%" stop-color="white" stop-opacity="1" />
            </linearGradient>
            <use href="#shape" fill="url('#fade')" />
          </mask>
        </defs>
        <rect width="900" height="600" fill="#6600FF"></rect>
        <g filter="url(#blur1)">
          <circle cx="28" cy="89" fill="#00CC99" r="357"></circle>
          <circle cx="845" cy="44" fill="#6600FF" r="357"></circle>
          <circle cx="500" cy="119" fill="#00CC99" r="357"></circle>
          <circle cx="197" cy="377" fill="#00CC99" r="357"></circle>
          <circle cx="106" cy="591" fill="#6600FF" r="357"></circle>
          <circle cx="309" cy="517" fill="#00CC99" r="357"></circle>
        </g>
        <use href="#shape" fill="hsl(337, 92%, 69%)" mask="url(#gradient)" filter="url('#noise')" />
      </svg>
    </div>
  )
}