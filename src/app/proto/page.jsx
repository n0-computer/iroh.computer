import { Prose } from '@/components/Prose';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/Button';

import { protocols } from '@/app/proto/protocols';
import { ProtocolCard } from '@/components/ProtocolCard';

export const metadata = {
  title: 'Protocols',
  description:
    'Pluggable protocols built atop iroh connections',
}

export default function Page() {
  return (
    <div className='max-w-3xl mx-auto'>
      <div>
        <Heading size={1} className="text-4xl font-bold font-space mb-3">Protocols</Heading>
        <p className='text-iroh-gray-500 leading-relaxed'>Iroh Protocols are pluggable extensions that build on direct connections. Like HTTP server middleware on steroids! Mix & match for fast, flexible, functionality.</p>
      </div>
      <div className="mb-16 mt-6 flex gap-3">
        <Button href="https://docs.iroh.computer/concepts/protocols" arrow="right">Protocols Overview</Button>
        <Button href="https://docs.iroh.computer/protocols/writing-a-protocol" variant="outline">Write a protocol</Button>
      </div>
      <div>
        {protocols.map((proto, i) => <ProtocolCard key={proto.slug} data={proto} />)}
      </div>
    </div>
  )
}
