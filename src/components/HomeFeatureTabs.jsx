'use client'

import Link from 'next/link'
import { FeatureTabs } from '@/components/FeatureTabs'
import { IrohEverywhere } from '@/components/IrohEverywhere'
import { OpenSourceIllustration } from '@/components/OpenSourceIllustration'
import { PaycodePCIDiagram } from '@/components/PaycodePCIDiagram'

const tabs = [
  {
    id: 'everywhere',
    label: 'Works Everywhere',
    body: (
      <p>
        Windows, macOS, Linux, Android, iOS, cloud, servers, and <Link href="https://docs.iroh.computer/compatibility" className="text-irohPurple-500 hover:underline">embedded devices</Link>. Connect over <Link href="https://docs.iroh.computer/transports/bluetooth" className="text-irohPurple-500 hover:underline">Bluetooth</Link>, <Link href="https://docs.iroh.computer/connecting/local-discovery" className="text-irohPurple-500 hover:underline">LAN</Link>, Wi-Fi, ethernet, cellular, or <Link href="https://www.iroh.computer/blog/iroh-0-97-0-custom-transports-and-noq" className="text-irohPurple-500 hover:underline">create your own transport</Link>.
      </p>
    ),
    diagram: <IrohEverywhere />,
  },
  {
    id: 'encrypted',
    label: 'E2E Encrypted, Always',
    body: (
      <p>
        Every connection is <Link href="https://docs.iroh.computer" className="text-irohPurple-500 hover:underline">end-to-end encrypted</Link> over <Link href="https://github.com/n0-computer/quinn" className="text-irohPurple-500 hover:underline">QUIC</Link>. No certificates to manage.
      </p>
    ),
    diagram: <PaycodePCIDiagram className="w-full" />,
  },
  {
    id: 'costs',
    label: 'Save Cloud Costs',
    body: (
      <p>
        Peer-to-peer connections bypass NATs and firewalls. <Link href="https://docs.iroh.computer/concepts/relays" className="text-irohPurple-500 hover:underline">Relays</Link> keep data flowing when direct connections can&apos;t be made.
      </p>
    ),
    diagram: <OpenSourceIllustration className="w-full" />,
  },
]

export function HomeFeatureTabs() {
  return <FeatureTabs tabs={tabs} />
}
