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
      <Prose>
        <Heading size={1} className="text-4xl">Protocols</Heading>
        <p>Iroh Protocols are pluggable extensions that build on direct connections. Like HTTP server middleware on steroids! Mix & match for fast, flexible, functionality.</p>
      </Prose>
      <div className="mb-16 mt-6 flex gap-3">
        <Button href="/docs/protocols" arrow="right">Protocols Overview</Button>
        <Button href="/docs/protocols/quickstart" variant="outline">Write a protocol</Button>
      </div>
      <div>
        {protocols.map((proto, i) => <ProtocolCard key={proto.slug} data={proto} />)}
      </div>
    </div>
  )
}