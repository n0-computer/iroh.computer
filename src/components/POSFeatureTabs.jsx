'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PaycodePCIDiagram } from '@/components/PaycodePCIDiagram'
import { IrohEverywhere } from '@/components/IrohEverywhere'
import { OpenSourceIllustration } from '@/components/OpenSourceIllustration'

const tabs = [
  {
    id: 'secure',
    label: 'Secure & Offline',
    title: 'End-to-end encrypted, works offline',
    body: (
      <p>
        All iroh connections are encrypted by default using open standards.
        Raw card data never leaves the payment terminal. Compliance is maintained by architecture.
      </p>
    ),
    diagram: <PaycodePCIDiagram className="w-full" />,
  },
  {
    id: 'cross-platform',
    label: 'Cross-Platform',
    title: 'Runs everywhere',
    body: (
      <p>
        iroh runs on <Link href="https://docs.iroh.computer/compatibility" className="text-irohPurple-500 hover:underline">Android, iOS, Windows, Linux, and embedded devices</Link>.
        Connect any POS device to any terminal regardless of platform&mdash;from
        modern tablets to legacy Windows 7 machines.
      </p>
    ),
    diagram: <IrohEverywhere />,
  },
  {
    id: 'resilient',
    label: 'Resilient by Default',
    title: 'No single point of failure',
    body: (
      <p>
        Host relays across AWS, GCP, Azure, or your own infrastructure. If one
        connection path goes down, iroh automatically finds another&mdash;direct,
        local network, or <Link href="https://docs.iroh.computer/concepts/relays" className="text-irohPurple-500 hover:underline">fallback through relays</Link>.
        No single cloud provider is a single point of failure.
      </p>
    ),
    diagram: <OpenSourceIllustration className="w-full" />,
  },
]

const INTERVAL = 10000

export function POSFeatureTabs() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % tabs.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [active])

  const selectTab = (index) => {
    setActive(index)
  }

  return (
    <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex flex-col gap-6">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => selectTab(i)}
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
