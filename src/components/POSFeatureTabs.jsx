'use client'

import Link from 'next/link'
import { FeatureTabs } from '@/components/FeatureTabs'
import { PaycodePCIDiagram } from '@/components/PaycodePCIDiagram'
import { IrohEverywhere } from '@/components/IrohEverywhere'
import { OpenSourceIllustration } from '@/components/OpenSourceIllustration'

const tabs = [
  {
    id: 'secure',
    label: 'Secure & Offline',
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

export function POSFeatureTabs() {
  return <FeatureTabs title="How It Works" tabs={tabs} />
}
