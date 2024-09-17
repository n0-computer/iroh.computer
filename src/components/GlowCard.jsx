'use client'

import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react'

export const GlowCard = function GlowCard (props) {
  const { className, children } = props;
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (cardRef.current && isHovering) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovering])

  return (
    <div
      ref={cardRef}
      className={clsx(
        className,
        "relative overflow-hidden"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124,124,255,0.8) 0%, rgba(124,124,255,0) 100%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}