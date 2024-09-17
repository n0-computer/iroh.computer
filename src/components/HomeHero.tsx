'use client'

import clsx from 'clsx'
import { useState, useEffect, useCallback } from 'react'
import { createNoise3D } from 'simplex-noise'

const GRID_WIDTH = 1152
const GRID_HEIGHT = 480
const SQUARE_SIZE = 96
const GRID_COLUMNS = GRID_WIDTH / SQUARE_SIZE
const GRID_ROWS = GRID_HEIGHT / SQUARE_SIZE
const TOTAL_SQUARES = GRID_COLUMNS * GRID_ROWS

// This is a placeholder image URL. Replace with your actual sprite sheet URL
const SPRITE_SHEET_URL = '/img/kv/iroh-kv-1.png'

const noise3D = createNoise3D(() => 0.4)

export const Hero = function Hero({ className, style }: { className: string, style: string }) {
  const [time, setTime] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height })
      setImageLoaded(true)
    }
    img.src = SPRITE_SHEET_URL
  }, [])

  const getNoise = useCallback((x: number, y: number, t: number) => {
    // Scale down the coordinates and time for smoother transitions
    const scale = 0.1
    return (noise3D(x * scale, y * scale, t * scale) + 1) / 2 // Normalize to 0-1
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      setTime(t => t + 0.01) // Increment time slowly for smooth transitions
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className={clsx(className, "flex flex-col justify-center items-center")} style={{height: GRID_HEIGHT, ...style}}>
      <div
        className="grid border-l border-t border-zinc-800"
        style={{
          width: `${GRID_WIDTH}px`,
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
        }}
      >
        {Array.from({ length: TOTAL_SQUARES }).map((_, index) => {
          const x = index % GRID_COLUMNS
          const y = Math.floor(index / GRID_COLUMNS)
          const noiseValue = getNoise(x, y, time)
          
          return (
            <div
              key={index}
              className="border-r border-b border-zinc-800 p-2"
              style={{
                height: SQUARE_SIZE,
                width: SQUARE_SIZE,
                // backgroundSize: `${imageDimensions.width}px ${imageDimensions.height}px`,
                // borderColor: `rgba(255, 255, 255, ${noiseValue})`,
                // backgroundColor: `rgba(147, 51, 234, ${noiseValue})`, // Purple color with varying opacity
                // boxShadow: `0 0 ${noiseValue * 10}px ${noiseValue * 5}px rgba(147, 51, 234, ${noiseValue})`,
              }}
            >
              <div className='w-full h-full' style={{
                backgroundImage: `url(${SPRITE_SHEET_URL})`,
                backgroundPosition: `-${x * SQUARE_SIZE}px -${y * SQUARE_SIZE}px`,
                opacity: noiseValue,
              }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}