"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const useCases = {
  "Streaming Video": [
    "Rave uses iroh to stream video between millions of devices around the world every day.",
  ],
  "AI/ML": [
    "Nous uses iroh to train foundation LLMs with compute distributed around the world.",
  ],
  "Gaming": [
    "Shaga uses iroh to deliver ultra low latency gaming on any device, anywhere.\n\nSpicy Lobster uses iroh to ship unkillable games that don't need a server."
  ],
  "Data Transfer": [
    "Recall uses iroh to replicate massive amounts content-addressed data for validating AI Agents."
  ],
  "Resilient Apps": [
    "Delta Chat uses iroh to power in-chat apps for hundreds of thousands of devices around the world, even when internet access is precarious."
  ]
}

export function UseCaseScroller() {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(useCases)[0])
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const timerRef = useRef(null)

  // Get the sentences for the current category
  const sentences = useCases[selectedCategory] || []

  // Handle category change
  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return

    // Start fade out
    setIsVisible(false)

    // After fade out completes, change category and reset index
    setTimeout(() => {
      setSelectedCategory(category)
      setCurrentSentenceIndex(0)
      setIsVisible(true)
    }, 500) // Match this with the CSS transition duration
  }

  // Auto-scroll through sentences
  useEffect(() => {
    if (!isAnimating || sentences.length <= 1) return

    const cycleText = () => {
      // Start fade out
      setIsVisible(false)

      // After fade out completes, change to next sentence
      setTimeout(() => {
        setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length)
        setIsVisible(true)
      }, 500) // Match this with the CSS transition duration
    }

    // Set timer for cycling
    timerRef.current = setTimeout(cycleText, 2500) // Show each sentence for 5 seconds

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentSentenceIndex, isAnimating, sentences.length])

  return (
    <div className="w-full max-w-3xl mx-auto px-5 md:pt-16 pb-8 flex flex-col">
      {/* Sentence display */}
      <div className="relative h-20 md:h-36 lg:h-24 flex flex-col mb-10">
        <p
          className={`text-xl font-semibold md:text-2xl transition-opacity duration-500 text-irohGray-700 dark:text-irohGray-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {sentences[currentSentenceIndex]}
        </p>
        {selectedCategory === "Streaming Video" && (
          <Link href="/solutions/rave" className="text-irohPurple-500 hover:underline mt-2 text-sm">
            Read the Rave case study →
          </Link>
        )}
        {selectedCategory === "AI/ML" && (
          <Link href="/solutions/nous" className="text-irohPurple-500 hover:underline mt-2 text-sm">
            Read the Nous case study →
          </Link>
        )}
        {selectedCategory === "Resilient Apps" && (
          <Link href="/solutions/delta-chat" className="text-irohPurple-500 hover:underline mt-2 text-sm">
            Read the Delta Chat case study →
          </Link>
        )}
      </div>

      {/* Pagination dots */}
      {sentences.length > 1 && (
        <div className="flex gap-2 mt-4">
          {sentences.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSentenceIndex ? "bg-irohPurple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Category selector */}
      <div className="flex flex-wrap mt-6 gap-1">
        {Object.keys(useCases).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-2 py-1 text-sm font-semibold transition-colors bg-irohGray-200/10 cursor-pointer ${
              selectedCategory === category ? "text-irohPurple-500" : "text-irohGray-800/20 dark:text-irohGray-400 hover:text-irohPurple-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
