import { irohPurple } from '@/palette'
import React from 'react'

const palette = [irohPurple[500], irohPurple[400], irohPurple[300]]

export const PerfChartIllustration = function PerfChartIllustration() {

  const baseX = 20
  const generatePoints = (baseX, baseY, pointCount) => {
    return Array.from({ length: pointCount }, (_, i) => {
      const x = baseX + (i / (pointCount - 1)) * 400
      const y = 200 - (baseY + i * 3 + Math.sin(i) * 10)
      return `${x},${y}`
    }).join(' ')
  }

  return (
    <div className="flex items-center">
      <svg viewBox="0 0 440 240" className="rounded">
        {/* Grid lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`grid-${i}`}
            x1="20"
            y1={40 * i + 20}
            x2="420"
            y2={40 * i + 20}
            stroke="#f0f0f055"
            strokeWidth="1"
          />
        ))}

        {/* Lines */}
        <polyline
          points={generatePoints(20, 50, 20)}
          fill="none"
          stroke={palette[0]}
          strokeWidth="2"
        />
        <polyline
          points={generatePoints(20, 30, 20)}
          fill="none"
          stroke={palette[1]}
          strokeWidth="2"
        />
        <polyline
          points={generatePoints(20, 10, 20)}
          fill="none"
          stroke={palette[2]}
          strokeWidth="2"
        />

        {/* Dots */}
        {[50, 30, 10].map((baseY, lineIndex) =>
          Array.from({ length: 20 }, (_, i) => {
            const x = (i / 19) * 400
            const y = 200 - (baseY + i * 3 + Math.sin(i) * 10)
            return (
              <circle
                key={`dot-${lineIndex}-${i}`}
                cx={baseX + x}
                cy={y}
                r="3"
                fill={palette[lineIndex]}
              />
            )
          })
        )}
      </svg>
    </div>
  )
}