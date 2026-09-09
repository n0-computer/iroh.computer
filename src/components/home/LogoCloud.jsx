"use client"

import React from 'react';
import {ThemeImage} from '@/components/ThemeImage'
import { useEffect, useRef } from "react"

const companies = [
  {
    name: "cmux",
    lightSrc: "/img/user-logos/cmux-light.png",
    darkSrc: "/img/user-logos/cmux-dark.png",
    label: "cmux",
    labelClassName: "font-semibold",
    imgClassName: "max-h-12",
    href: "https://cmux.com/",
  },
  { name: "spacedrive", ext: "png", widthScale: 2.2, imgClassName: "max-h-20", href: "https://www.spacedrive.com" },
  { name: "nous", ext: "png", href: "https://nousresearch.com" },
  { name: "meshllm", ext: "svg", imgClassName: "max-h-12 grayscale", href: "https://meshllm.cloud" },
  { name: "strada", ext: "png", label: "strada", labelClassName: "font-black", imgClassName: "max-h-6", href: "https://strada.tech" },
  { name: "paycode", ext: "svg", href: "https://www.paycode.com.mx" },
  { name: "rave", ext: "png", href: "https://rave.io" },
  {
    name: "block",
    lightSrc: "/img/user-logos/block-light.png",
    darkSrc: "/img/user-logos/block-dark.png",
    widthScale: 1.6,
    imgClassName: "max-h-6 opacity-50",
    href: "/blog/buzz-agent-workspaces",
  },
  { name: "delta_chat", ext: "png", widthScale: 2.2, imgClassName: "max-h-20", href: "https://delta.chat" },
  { name: "ottomatic", ext: "png", label: "Ottomatic", imgClassName: "max-h-6", href: "https://ottomatic.io" },
  { name: "rayfish", ext: "png", label: "Rayfish", imgClassName: "max-h-6", href: "https://rayfish.xyz" },
  { name: "outl", label: "Outl", href: "https://outl.app" },
  { name: "datum", ext: "svg", href: "https://www.datum.net" },
  { name: "fedimint", ext: "png", href: "https://fedimint.org" },
];

// interface LogoCloudProps {
//   logos: string[]
//   speed?: number
//   height?: number
// }
export function LogoCloud({ speed = 0.4, height = 100 }) {
  const scrollerRef = useRef(null)
  const innerScrollerRef = useRef(null)

  useEffect(() => {
    if (!scrollerRef.current || !innerScrollerRef.current) return
    const innerScroller = innerScrollerRef.current

    // React runs effects twice in development. Clear any previous marquee
    // copies before creating the one duplicate set needed for a seamless loop.
    innerScroller
      .querySelectorAll('[data-logo-cloud-clone]')
      .forEach((item) => item.remove())

    // Clone the content for seamless scrolling
    const scrollerContent = Array.from(innerScroller.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      duplicatedItem.setAttribute('data-logo-cloud-clone', '')
      duplicatedItem.setAttribute('aria-hidden', 'true')
      duplicatedItem.tabIndex = -1
      innerScroller.appendChild(duplicatedItem)
    })

    // Animation function
    let animationId
    let startTime = null
    let progress = 0

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Calculate how much to move based on elapsed time and speed
      const newProgress = (elapsed * speed) / 1000
      const delta = newProgress - progress
      progress = newProgress

      // Move the scroller
      innerScroller.style.transform = `translateX(-${progress % 50}%)`

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      innerScroller
        .querySelectorAll('[data-logo-cloud-clone]')
        .forEach((item) => item.remove())
    }
  }, [speed])

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full overflow-hidden py-2">
        {/* Scroller container */}
        <div ref={scrollerRef} className="flex w-full h-full overflow-hidden">
          <div ref={innerScrollerRef} className="flex animate-scroll whitespace-nowrap">
            {companies.map(({ name, ext, lightSrc, darkSrc, widthScale = 1.4, imgClassName, label, labelClassName, href }, index) => {
              const external = href.startsWith('http')
              return (
              <a
                key={`${name}-${index}`}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{ height, width: label ? undefined : height * widthScale }}
                className={`flex items-center justify-center ${label && ext ? 'gap-1' : 'gap-2.5'} px-4 transition-opacity hover:opacity-70`}
              >
                {(ext || lightSrc) && (
                  <ThemeImage
                    alt={`${name} logo`}
                    darkSrc={darkSrc || `/img/user-logos/${name}.${ext}`}
                    lightSrc={lightSrc || `/img/user-logos/${name}.${ext}`}
                    width={label ? height : height * widthScale}
                    height={height}
                    className={`object-contain ${label ? 'w-auto flex-shrink-0' : 'w-auto'} ${imgClassName || 'max-h-12'}`}
                  />
                )}
                {label && (
                  <span className={`text-2xl text-irohGray-500 dark:text-irohGray-400 ${labelClassName || 'font-bold'}`}>{label}</span>
                )}
              </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}


// export function LogoCloud() {
//   return (
//     <section className='max-w-6xl mx-auto border-r border-t border-l border-irohGray-300 dark:border-irohGray-800 py-24 sm:py-10 md:flex'>
//       <div className="mx-auto max-w-2xl px-10 lg:max-w-none">
//         <h1 className="text-lg font-semibold text-irohGray-600 dark:text-irohGray-200 md:mt-32">Trusted by the world’s most innovative teams</h1>
//       </div>
//       <div className="mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 items-start gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:grid-cols-3">
//         {companies.map((co)=> (
//           <ThemeImage
//             key={co}
//             alt="Transistor"
//             darkSrc={`/img/user-logos/${co}.png`}
//             lightSrc={`/img/user-logos/${co}.png`}
//             width={300}
//             height={150}
//             className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
//           />
//         ))}
//       </div>
//     </section>
//   )
// }
