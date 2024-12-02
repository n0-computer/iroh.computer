import {Guides} from '@/components/Guides'
import {Resources, Resource} from '@/components/Resources'
import {HeroPattern} from '@/components/HeroPattern'
import {ProtocolHeroList} from '@/components/ProtocolHeroList';
import { Prose } from '@/components/Prose';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/Button';

export const metadata = {
  title: 'Protocols',
  description:
    'Pluggable protocols built atop iroh connections',
}

export default function Page() {
  return (
    <>
      <HeroPattern />
      <Prose>
        <Heading size={1}>Protocols</Heading>
        <p>Iroh Protocols are pluggable extensions that build on direct connections. They're like HTTP server middleware on steriods! Mix & match for fast, flexible, functionality.</p>
      </Prose>
      <div className="not-prose">
        <div className="mb-16 mt-6 flex gap-3">
          <Button href="/docs/protocols" arrow="right" children="Protocols Overview" />
          <Button href="/docs/protocol-quickstart" variant="outline" children="Write a protocol" />
        </div>
      </div>
      <ProtocolHeroList />
    </>
  )
}