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
        Windows, macOS, Linux, Android, iOS, and <Link href="https://docs.iroh.computer/compatibility" className="text-irohPurple-500 hover:underline">embedded devices</Link>. Connect over <Link href="https://docs.iroh.computer/transports/bluetooth" className="text-irohPurple-500 hover:underline">Bluetooth</Link>, <Link href="https://docs.iroh.computer/connecting/local-discovery" className="text-irohPurple-500 hover:underline">LAN</Link>, Wi-Fi, or <Link href="https://www.iroh.computer/blog/tor-custom-transport" className="text-irohPurple-500 hover:underline">Tor</Link>.
      </p>
    ),
    diagram: <IrohEverywhere />,
  },
  {
    id: 'sync',
    label: 'Sync Any Data',
    body: (
      <p>
        <Link href="https://docs.iroh.computer/protocols/blobs" className="text-irohPurple-500 hover:underline">Files</Link>, <Link href="https://docs.iroh.computer/protocols/kv-crdts" className="text-irohPurple-500 hover:underline">structured data</Link>, <Link href="https://docs.iroh.computer/protocols/streaming" className="text-irohPurple-500 hover:underline">video</Link>, <Link href="https://docs.iroh.computer/protocols/rpc" className="text-irohPurple-500 hover:underline">RPC</Link>&mdash;or write your own protocol.
      </p>
    ),
    diagram: <OpenSourceIllustration className="w-full" />,
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
