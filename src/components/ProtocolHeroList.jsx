import Image from 'next/image'
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import {protocols} from '@/app/proto/protocols'
import {GlowCard} from '@/components/GlowCard';

import iconCarat from '@/images/icons/icon_carat.svg';
import iconFaster from '@/images/icons/icon_faster.svg';
import iconOpen from '@/images/icons/icon_open.svg';
import iconPlatforms from '@/images/icons/icon_platforms.svg';

const icons = {
  iconCarat,
  iconFaster,
  iconOpen,
  iconPlatforms
}

export const ProtocolHeroList = function ProtocolHeroList() {
  return (
    <div className='md:grid md:grid-cols-4 border-l border-t border-irohGray-300 dark:border-irohGray-800'>
      {protocols.filter((p) => !!p.featured).map((proto, i) => (
        <Link href={proto.href} key={i}>
        <GlowCard className='border-r border-b border-irohGray-300 dark:border-irohGray-800 p-5'>
          <Image
            src={icons[proto.icon]}
            alt=""
            className="h-12 w-12 float-left md:float-none"
            unoptimized
            />
          <div className='pl-20 md:pl-0'>
            <h2 className='text-2xl mb-2 md:mt-10 text-irohPurple-500 font-bold'>{proto.title}</h2>
            <p className=''>{proto.tagline}</p>
          </div>
        </GlowCard>
        </Link>
      ))}
      <GlowCard className='border-r border-b border-irohGray-300 dark:border-irohGray-800 p-5'>
        <Link href='https://docs.iroh.computer/concepts/protocols' className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-2xl mb-2 text-irohGray-500'>Learn more</h1>
          <ArrowRightIcon className='w-10 h-10' />
        </Link>
      </GlowCard>
    </div>
  )
}
