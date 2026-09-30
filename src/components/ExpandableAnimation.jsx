'use client'

import { useRef } from 'react'
import { ThemeImage } from '@/components/ThemeImage'

export function ExpandableAnimation({ src, darkSrc, alt, width, height }) {
  const dialog = useRef(null)
  const themeStyle = { backgroundColor: 'var(--background)', color: 'var(--foreground)' }
  const renderImage = (className) => darkSrc ? (
    <ThemeImage lightSrc={src} darkSrc={darkSrc} alt={alt} width={width} height={height} className={className} />
  ) : (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  )
  return (
    <div className="not-prose mx-auto my-8 max-w-2xl">
      <div className="relative">
        {renderImage("w-full h-auto")}
        <button
          type="button"
          onClick={() => dialog.current.showModal()}
          className="absolute right-2 top-2 rounded border border-gray-400 px-2 py-1 text-sm shadow-sm"
          style={themeStyle}
          aria-label="Expand animation"
        >
          ⛶ Expand
        </button>
      </div>
      <dialog
        ref={dialog}
        aria-label="Expanded animation"
        style={themeStyle}
        className="fixed inset-0 m-auto w-[95vw] max-w-none max-h-[95vh] rounded-lg p-4 backdrop:bg-black/70"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close()
        }}
      >
        <div className="flex justify-end">
          <button type="button" autoFocus onClick={() => dialog.current.close()} style={themeStyle} className="rounded border border-gray-400 px-3 py-1">
            Close
          </button>
        </div>
        {renderImage("mx-auto w-full h-auto max-h-[80vh] object-contain")}
      </dialog>
    </div>
  )
}
