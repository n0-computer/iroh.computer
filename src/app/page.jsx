import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

import {FooterMarketing} from '@/components/FooterMarketing';
import {HeaderSparse} from '@/components/HeaderSparse';
import {HomeHero} from '@/components/HomeHero';
import {UsersShowcase} from '@/components/UsersShowcase';
import {FromTheBlog} from '@/components/FromTheBlog';
import {WrenchCodeIcon} from '@/components/icons/WrenchCodeIcon';
import {PerfChartIllustration} from '@/components/PerfChartIllustration';
import {ConnectDevicesIllustration} from '@/components/ConnectDevicesIllustration';
import {ProtocolHeroList} from '@/components/ProtocolHeroList';
import {LogoCloud} from '@/components/home/LogoCloud';
import {UseCaseScroller, UseCases} from '@/components/home/UseCases';

import logoRust from '@/images/language-logos/rust.svg';
import { CodeBlock } from '@/components/CodeBlock';

export const metadata = {
  title: 'Iroh',
  description:
    'less net work for networks',
};

export default function Page() {
  return (
    <div>
      <HeaderSparse />

      <div className="bg-iroh-gray-50 dark:bg-iroh-gray-900 text-iroh-gray-700 dark:text-iroh-gray-100 h-92 justify-between font-space">
        <main className="mb-auto flex flex-col min-h-92">
          {/* hero */}
          <section className="min-h-92 pt-20 bg-cover" style={{ height: 600 }}>
            <div className='relative h-10 max-w-6xl mx-auto'>
              <div className='absolute h-full top-0 left-0 bg-linear-to-t from-iroh-gray-300 dark:from-zinc-800 to-transparent' style={{ width: 1 }} />
              <div className='absolute h-full top-0 right-0 bg-linear-to-t from-iroh-gray-300 dark:from-zinc-800 to-transparent' style={{ width: 1 }}  />
            </div>
            <div className='relative max-w-6xl mx-auto'>
              <div className='absolute z-10 overflow-hidden w-full'>
                <HomeHero className='' />
              </div>
              <div className="absolute z-40 max-w-6xl mx-auto md:grid md:grid-cols-4 md:gap-4">
                <div className="col-span-2 pl-8" style={{ paddingTop: 100 }}>
                  <h1 className="z-50 text-5xl font-bold leading-tight">
                    p2p that just works
                  </h1>
                  <h3 className="text-lg mt-3 leading-normal">Iroh is a library for building on direct connections between devices, putting more control in the hands of your users.</h3>
                  <div className='flex mt-3'>
                    <a href="/docs/quickstart" className="my-4 p-3 px-4 transition bg-iroh-gray-800 text-iroh-purple-500 uppercase hover:bg-iroh-gray-700 hover:text-gray-200 plausible-event-name=Home+Hero+Start+Project+Click">Start Now</a>
                    <a href="/docs" className="flex ml-5 my-4 p-3 px-4 bg-gray-300 text-gray-500 transition hover:bg-gray-400 hover:text-gray-200 uppercase plausible-event-name=Home+Hero+Documentation+Click">
                      <BookOpenIcon className="h-5 w-5 mt-0.5 mr-2" />
                      Documentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='max-w-6xl mx-auto border-l border-r border-iroh-gray-300 dark:border-iroh-gray-800 grid grid-cols-1 md:grid-cols-2 border-b border-iroh-gray-300 dark:border-iroh-gray-800'>
            <LogoCloud />
            <UseCaseScroller />
          </section>


          <section className='max-w-6xl mx-auto md:grid md:grid-cols-4 md:gap-4 border-l border-r border-iroh-gray-300 dark:border-iroh-gray-800'>
            <div className='md:col-span-3 px-5 py-20 border-r border-iroh-gray-300 dark:border-iroh-gray-800'>
              <ConnectDevicesIllustration className='mb-12 max-w-xl' />
              <h3 className='text-4xl font-bold mb-4'>Connect any two devices on the planet</h3>
              <p className='text-iroh-gray-600 dark:text-iroh-gray-200 max-w-2xl'>Iroh gives you an API for dialing by public key. You say “connect to that phone”, iroh will find &amp; maintain the fastest connection for you, regardless of where it is.</p>
            </div>
            <div className="text-right mlw-xl px-5 py-20 md:col-span-1">
              <p className='italic text-xl text-iroh-gray-600 dark:text-iroh-gray-400 mb-5'>&ldquo;In stark contrast to other p2p &amp; dweb technologies we&apos;ve played with - which are exciting due to their implications for the future - <span className='font-bold'>Iroh brought instant gains in our present.&quot;</span></p>
              <p className=''>- <a className='text-iroh-purple-500' href="https://a.weird.one/">weird.one</a></p>
            </div>
          </section>


          {/* iroh protocols */}
          <section className='pt-10 pb-16 border border-iroh-gray-300 dark:border-iroh-gray-800'>
            <div className='max-w-6xl mx-auto px-4'>
              <div className='pb-10'>
                <h3 className='text-3xl font-bold mb-2'>Compose your own tailor-made protocol stack</h3>
                <p className='text-iroh-gray-600 dark:text-iroh-gray-400 text-lg'>An ecosystem of ready-made, composable protocols are built on top of iroh. <br />Mix & match to get the feature set you need.</p>
              </div>
              <ProtocolHeroList />
            </div>
          </section>

          <section className='max-w-6xl mx-auto border-l border-r border-iroh-gray-300 dark:border-iroh-gray-800 md:grid md:grid-cols-4'>
            <div className='md:col-span-2 px-10 py-20 md:border-r border-iroh-gray-300 dark:border-iroh-gray-800'>
              <WrenchCodeIcon className='w-16 h-16 mb-8' />
              <h3 className='text-3xl font-bold mb-4'>Build your own protocol</h3>
              <p className='mb-10 text-iroh-gray-600 dark:text-iroh-gray-400'>Don&apos;t see a protocol you need? Build your own! Iroh gives you a reliable foundation for building distributed systems that reach the edge. The rest is up to you.</p>
              <Link href="/docs/quickstart" className={clsx(
                "my-4 p-3 transition bg-iroh-gray-800 shadow-sm text-iroh-purple-500 hover:bg-iroh-gray-700 hover:text-gray-200 text-lg")}>
                <span>Protocol Docs</span>
              </Link>
            </div>
            <div className='md:col-span-2 px-10 py-10 md:py-20 border-t md:border-none border-iroh-gray-300 dark:border-iroh-gray-800'>
              <PerfChartIllustration />
              <h3 className='text-3xl font-bold mb-4'>Continuously Measured</h3>
              <p className='mb-10 text-iroh-gray-600 dark:text-iroh-gray-400'>All commits to iroh&apos;s main branch run through a growing set of simulations &amp; tests</p>
              <Link href="https://perf.iroh.computer" className={clsx(
                "my-4 p-3 transition bg-iroh-gray-800 text-iroh-purple-500 hover:bg-iroh-gray-700 hover:text-gray-200 text-lg")}>
                <span>Iroh Perf Site</span>
              </Link>
            </div>
          </section>

          {/* use cases */}
          <section className='relative max-w-6xl w-full mx-auto border-l border-t border-r border-iroh-gray-300 dark:border-iroh-gray-800'>
            <div className='absolute w-full h-full grid grid-cols-4'>
              <div className='col-span-1 border-dotted border-r border-iroh-gray-300 dark:border-iroh-gray-800 h-full' />
              <div className='col-span-1 border-dotted border-r border-iroh-gray-300 dark:border-iroh-gray-800' />
              <div className='col-span-1 border-dotted border-r border-iroh-gray-300 dark:border-iroh-gray-800' />
            </div>
            <div className='mb-4 md:w-1/2 p-10'>
              <h3 className='text-3xl text-iroh-purple-500 font-bold'>Real World Use</h3>
              <p>Iroh is running in production on <strong>millions</strong> of devices, on all major platforms.</p>
            </div>
            <div className='relative overflow-hidden' style={{ width: '100%', height: 350 }}>
              <UsersShowcase />
            </div>
          </section>

          {/* build in your language */}
          <section>
            <div className='max-w-6xl mx-auto px-4 lg:flex lg:space-x-10 border-r border-l border-t border-iroh-gray-300 dark:border-iroh-gray-800 py-20'>
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
                <Link href='/docs/examples' className='inline-block my-4 p-3 px-4 bg-iroh-gray-800 text-iroh-purple-500 plausible-event-name=Home+Start+Building+Click'>
                  Start Building
                </Link>
              </div>
              <div className='lg:w-2/3 lg:mt-28'>
                <CodeBlock code={codeSample} language='rust' />
              </div>
            </div>
          </section>
          <section className='max-w-6xl w-full mx-auto px-10 border-r border-l border-t border-iroh-gray-300 dark:border-iroh-gray-800 py-20'>
            <div className='w-full md:px-5'>
              <h3 className='text-lg tracking-wider font-bold text-iroh-gray-600 dark:text-iroh-gray-400 uppercase'>From the Blog</h3>
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
    let recv_endpoint = Endpoint::builder().discovery_n0().bind().await?;
    let recv_router = Router::builder(recv_endpoint)
      .accept(PingALPN, Ping::new())
      .spawn();

    // get the receive side's address:
    let addr = recv_router.endpoint().node_addr().await?;

    // create the send side & send a ping!
    let send_ep = Endpoint::builder().discovery_n0().bind().await?;
    let send_pinger = Ping::new();
    send_pinger.ping(&send_ep, addr).await?;

    // ok!
    Ok(())
}`
