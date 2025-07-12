"use client"

import React from 'react';
import {ThemeImage} from '@/components/ThemeImage'
import { useEffect, useRef } from "react"

// each of these has a png at /img/user-logos/${COMPANY}.png
const companies = [
  "spacedrive",
  "nous",
  "shaga",
  "rave",
  "delta_chat",
  "recall"
];

// interface LogoCloudProps {
//   logos: string[]
//   speed?: number
//   height?: number
// }
export function LogoCloud({ speed = 0.85, height = 150 }) {
  const scrollerRef = useRef(null)
  const innerScrollerRef = useRef(null)

  useEffect(() => {
    if (!scrollerRef.current || !innerScrollerRef.current) return

    // Clone the content for seamless scrolling
    const scrollerContent = Array.from(innerScrollerRef.current.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      innerScrollerRef.current.appendChild(duplicatedItem)
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
      if (innerScrollerRef.current) {
        innerScrollerRef.current.style.transform = `translateX(-${progress % 50}%)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [speed])

  return (
    <div>
      <div className="pl-5 md:pl-10 pt-8 lg:max-w-none">
        <h1 className="text-lg font-medium text-irohGray-600 dark:text-irohGray-200">Trusted by the world’s most innovative teams</h1>
      </div>
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient masks for fading edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-irohGray-50 dark:from-irohGray-900 to-transparent"></div>
        <div className="absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-irohGray-50 dark:from-irohGray-900 to-transparent"></div>

        {/* Scroller container */}
        <div ref={scrollerRef} className="flex w-full h-full overflow-hidden">
          <div ref={innerScrollerRef} className="flex animate-scroll whitespace-nowrap">
            {companies.map((co, index) => (
              <div key={`${co}-${index}`} style={{ height, width: height * 1.4 }} className="flex items-center justify-center px-4">
                <ThemeImage
                  key={co}
                  alt={`${co} logo`}
                  darkSrc={`/img/user-logos/${co}.png`}
                  lightSrc={`/img/user-logos/${co}.png`}
                  width={height * 1.4}
                  height={height}
                  className="object-contain"
                />
              </div>
            ))}
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
