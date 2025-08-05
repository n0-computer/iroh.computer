import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import {GlowCard} from '@/components/GlowCard';

export function ProtocolCard(props) {
  const { data: proto } = props;
  return (
    <Link href={`/proto/${proto.slug}`} {...props}>
      <GlowCard className='border border-iroh-gray-300 rounded-md dark:border-iroh-gray-800 p-5 my-5'>
        <div className='pl-20 md:pl-0'>
          <h2 className='text-2xl mb-2 md:mt-10 text-iroh-purple-500 font-bold'>{proto.slug}</h2>
          <p className=''>{proto.tagline}</p>
        </div>
      </GlowCard>
    </Link>
  )
}
