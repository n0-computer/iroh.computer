import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import {FooterMarketing} from '@/components/FooterMarketing';
import {HeaderSparse} from '@/components/HeaderSparse';
import {HomeHero} from '@/components/HomeHero';
import {UsersShowcase} from '@/components/UsersShowcase';
import {FromTheBlog} from '@/components/FromTheBlog';
import {WrenchCodeIcon} from '@/components/icons/WrenchCodeIcon';
import {PerfChartIllustration} from '@/components/PerfChartIllustration';
import {AnywhereIllustration} from '@/components/AnywhereIllustration';
import {ProtocolHeroList} from '@/components/ProtocolHeroList';
import {LogoCloud} from '@/components/home/LogoCloud';
import {UseCaseScroller} from '@/components/home/UseCases';
import {FeatureBentoGrid} from '@/components/FeatureBentoGrid';

import logoRust from '@/images/language-logos/rust.svg';
import { CodeBlock } from '@/components/CodeBlock';
import SolutionsPage from './solutions/page';

export const metadata = {
  title: 'Iroh',
  description:
    'less net work for networks',
};

export default function Page() {
  return (
    <div>
      <HeaderSparse />

      <div className="bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100 h-92 justify-between font-space">
        <main className="mb-auto flex flex-col min-h-92">
          {/* hero */}
          <section className="min-h-92 pt-20 bg-cover" style={{ height: 600 }}>
            <div className='relative h-10 max-w-6xl mx-auto'>
              <div className='absolute h-full top-0 left-0 bg-linear-to-t from-irohGray-300 dark:from-zinc-800 to-transparent' style={{ width: 1 }} />
              <div className='absolute h-full top-0 right-0 bg-linear-to-t from-irohGray-300 dark:from-zinc-800 to-transparent' style={{ width: 1 }}  />
            </div>
            <div className='relative max-w-6xl mx-auto'>
              <div className='absolute z-10 overflow-hidden w-full'>
                <HomeHero className='' />
              </div>
              <div className="absolute z-40 max-w-6xl mx-auto md:grid md:grid-cols-4 md:gap-4">
                <div className="col-span-2 pl-8" style={{ paddingTop: 100 }}>
                  <h1 className="z-50 text-5xl font-bold leading-tight">
                    IP addresses <span className="text-irohPurple-500">break,</span> dial keys instead
                  </h1>
                  <h3 className="text-lg mt-3 leading-normal">Modular networking stack trusted by thousands of developers and millions of users worldwide.</h3>
                  <div className='flex mt-3'>
                    <a href="https://docs.iroh.computer/quickstart" className="my-4 p-3 px-4 transition bg-irohGray-800 text-irohPurple-500 uppercase hover:bg-irohGray-700 hover:text-gray-200 plausible-event-name=Home+Hero+Start+Project+Click">Read the Docs</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='max-w-6xl mx-auto border-l border-r border-irohGray-300 dark:border-irohGray-800 grid grid-cols-1 md:grid-cols-2 border-b border-irohGray-300 dark:border-irohGray-800'>
            <LogoCloud />
            <UseCaseScroller />
          </section>

          <FeatureBentoGrid />

          <section className='max-w-6xl mx-auto border-l border-r border-irohGray-300 dark:border-irohGray-800 py-16 px-4'>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
              <div className='relative'>
                <div className='absolute inset-px rounded-lg bg-gradient-to-br' />
                <AnywhereIllustration className='w-full max-w-lg' />
              </div>
              <div className='relative'>
                <div className='absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20' />
                <div className='relative flex h-full flex-col overflow-hidden rounded-lg'>
                  <div className='px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10'>
                    <p className='mt-6 text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100'>
                      <span className='text-irohPurple-500'>Fast connections.</span>
                      <br />
                      Anywhere.
                      <br />
                      Forever.
                    </p>
                    <p className='mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400'>
                      Dial any endpoint running anywhere, big or small &mdash; cloud servers, tablets, or Raspberry Pis. When a direct connection isn&apos;t possible, <a href="https://docs.iroh.computer/concepts/relay" className='text-irohPurple-500 hover:underline'>relays</a> keep your app running smoothly.
                    </p>
                    <p className='mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400 mb-8'>
                      The core technology is <a href="https://github.com/n0-computer/iroh" className='text-irohPurple-500 hover:underline'>open source</a>, and relays are stateless. That means you can pluralize with hosting across regions and clouds, or self-host anywhere in the world.
                    </p>
                    <Link href='https://docs.iroh.computer/concepts/relay' className='inline-block my-4 text-irohPurple-500 plausible-event-name=Home+Fast+Connections+Click'>
                      Learn about Relays <ArrowRightIcon className='inline-block w-5 h-5 ml-2 -mt-1' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* iroh protocols */}
          <section className='pt-10 pb-16 border border-irohGray-300 dark:border-irohGray-800'>
            <div className='max-w-6xl mx-auto px-4'>
              <div className='pb-10'>
                <h3 className='text-3xl font-bold mb-2'>Modular toolkit</h3>
                <p className='text-irohGray-600 dark:text-irohGray-400 text-lg'>Iroh provides a reliable connectivity API for building systems that reach any device, anywhere. The rest is up to you. There are dozens of open source ready-made, composable protocols are built on top of iroh. Mix & match to get the feature set you need.</p>
              </div>
              <ProtocolHeroList />
            </div>
          </section>

          <section className='max-w-6xl mx-auto border-l border-r border-irohGray-300 dark:border-irohGray-800 py-16 px-4'>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
              <div className='relative'>
                <div className='absolute inset-px rounded-lg bg-gradient-to-br' />
                    <PerfChartIllustration />
              </div>
              <div className='relative'>
                <div className='absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20' />
                <div className='relative flex h-full flex-col overflow-hidden rounded-lg'>
                  <div className='px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10'>
                    <p className='mt-6 text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100'>Deploy, Monitor, Fix</p>
                    <p className='mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400'>All commits to iroh&apos;s main branch run through a growing set of <a href="https://perf.iroh.computer" target="_blank" className="text-irohPurple-500 hover:underline">simulations &amp; tests</a>. </p>
                    
                    <p className='mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400 mb-8'>Get visibility into your endpoints &mdash; track connection health and throughput across all your devices and services. Build custom metrics specific for your app.</p>

                <Link href='https://docs.iroh.computer/what-is-iroh' className='inline-block my-4 text-irohPurple-500 plausible-event-name=Home+Start+Building+Click'>
                  Montior your App<ArrowRightIcon className='inline-block w-5 h-5 ml-2 -mt-1' />
                </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* build in your language */}
          <section>
            <div className='max-w-6xl mx-auto px-4 lg:flex lg:space-x-10 border-r border-l border-t border-irohGray-300 dark:border-irohGray-800 py-20'>
              <div className='lg:w-1/3 mb-10'>
                <div className='flex space-x-6 mb-6'>
                  <div className=''>
                    <Image
                      src={logoRust}
                      alt=""
                      className="h-12 w-12"
                      unoptimized
                      />
                  </div>
                </div>
                <h1 className='text-3xl font-bold mb-2'>Build something amazing, today.</h1>
                <Link href='https://docs.iroh.computer/what-is-iroh' className='inline-block my-4  text-irohPurple-500 plausible-event-name=Home+Start+Building+Click'>
                  Read the Docs <ArrowRightIcon className='inline-block w-5 h-5 ml-2 -mt-1' />
                </Link>
              </div>
              <div className='lg:w-2/3 lg:mt-28'>
                <CodeBlock code={codeSample} language='rust' />
              </div>
            </div>
          </section>
          <section className='max-w-6xl w-full mx-auto px-10 border-r border-l border-t border-irohGray-300 dark:border-irohGray-800 py-20'>
            <div className='w-full md:px-5'>
              <h3 className='text-lg tracking-wider font-bold text-irohGray-600 dark:text-irohGray-400 uppercase'>From the Blog</h3>
            </div>
            <FromTheBlog />
          </section>
        </main>
        <FooterMarketing />
      </div>
    </div>
  )
}


const codeSample = `// a program that creates two endpoints & sends a ping between them
use anyhow::Result;
use iroh::{Endpoint, protocol::Router};
use iroh_ping::{ALPN as PingALPN, Ping};

#[tokio::main]
async fn main() -> Result<()> {
    // create the receive side
    let recv_endpoint = Endpoint::bind().await?;
    let recv_router = Router::builder(recv_endpoint)
      .accept(PingALPN, Ping::new())
      .spawn();

    // get the receive side's address:
    let addr = recv_router.endpoint().addr().await?;

    // create the send side & send a ping!
    let send_ep = Endpoint::bind().await?;
    let send_pinger = Ping::new();
    send_pinger.ping(&send_ep, addr).await?;

    // ok!
    Ok(())
}`
