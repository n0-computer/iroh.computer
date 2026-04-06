'use client'

import { useState, useEffect } from 'react'

const INTERVAL = 10000

export function FeatureTabs({ title, tabs }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % tabs.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [active, tabs.length])

  return (
    <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
      <div className="container mx-auto max-w-7xl">
        {title && <h2 className="text-4xl font-bold mb-12">{title}</h2>}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex flex-col gap-6">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActive(i)}
                className={`text-left py-5 border-l-2 pl-5 transition-all cursor-pointer ${
                  i === active
                    ? 'border-irohPurple-500 opacity-100'
                    : 'border-irohGray-200 dark:border-irohGray-700 opacity-40 hover:opacity-60'
                }`}
              >
                <h3 className={`text-lg font-bold mb-2 ${
                  i === active ? 'text-irohPurple-500' : ''
                }`}>{tab.label}</h3>
                <div className="text-sm text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  {tab.body}
                </div>
              </button>
            ))}
          </div>
          <div className="md:col-span-8">
            {tabs[active].diagram}
          </div>
        </div>
      </div>
    </section>
  )
}
