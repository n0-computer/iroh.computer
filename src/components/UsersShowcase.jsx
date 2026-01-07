'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  { title: "Delta Chat",
    description: "Iroh powers multi-device backup & live connections for in-chat WebXDC apps",
    thumbnail: '/img/users/delta_chat.png',
    href: 'https://delta.chat',
  },
  { title: "Shaga",
    description: "Streaming gaming to Android devices from high powered, gaming PCs. Iroh builds direct connections for simultaneous video, audio, and controller streams.",
    thumbnail: '/img/users/shaga.png',
    href: 'https://shaga.xyz',
  },
  { title: "Fish Folk",
    description: "Multiplayer driven by iroh direct connections.",
    thumbnail: '/img/users/fish_folk.png',
    href: 'https://fishfolk.org/',
  },
  { title: "Sendme",
    description: "Send files. Any size. No Accounts. Free.",
    thumbnail: '/img/users/sendme.png',
    href: '/sendme',
  },
  { title: "Dumbpipe",
    description: "It's a unix pipe, over the internet",
    thumbnail: '/img/users/dumbpipe.png',
    href: 'https://dumbpipe.dev',
  },
]

const useTimer = (callback, delay) => {
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(callback, delay)
    return () => clearInterval(id)
  }, [callback, delay, isRunning])

  return { isRunning, setIsRunning }
}

export const UsersShowcase = function UsersShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }, [])

  const { setIsRunning } = useTimer(nextSlide, 3000)

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            src={projects[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
          >
              <div className="absolute inset-0 flex items-center justify-center max-w-xl mx-auto px-10">
                <div className="">
                  <Link href={projects[currentIndex].href}>
                    <Image
                      src={projects[currentIndex].thumbnail}
                      alt={projects[currentIndex].title}
                      width={150}
                      height={150}
                      className='rounded-lg overflow-hidden shadow-xs mx-auto mb-5'
                      />
                  </Link>
                  <Link className='cursor-pointer' href={projects[currentIndex].href}>
                    <h2 className="text-2xl font-bold">{projects[currentIndex].title}</h2>
                  </Link>
                  <p className="text-sm">{projects[currentIndex].description}</p>
                </div>
              </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-irohGray-600 dark:bg-irohGray-300' : 'bg-irohGray-700/20 dark:bg-irohGray-600/40'
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setIsRunning(false)
              setTimeout(() => setIsRunning(true), 3000)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
