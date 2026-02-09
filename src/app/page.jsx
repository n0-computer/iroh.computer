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
                      Dial any endpoint running anywhere, big or small &mdash;
                      cloud servers, tablets, or Raspberry Pis.
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

          <FeatureBentoGrid />
          <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10"></div>
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <img src="/img/user-logos/nous.png" alt="Nous" className="mx-auto h-12" />
              <figure className="mt-10">
                <blockquote className="text-center text-xl/8 font-semibold text-white sm:text-2xl/9">
                  <p>&ldquo;Doubling the network speed halves our compute budget. That&apos;s the difference between a $1M model and a $500K model.&rdquo;</p>
                </blockquote>
                <figcaption className="mt-10">
                  <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-white">Ari Lotter</div>
                    <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-white">
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <div className="text-gray-400">Prinicpal Engineer at Nous</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>

          {/* iroh protocols */}
          <section className='pt-10 pb-16 border border-irohGray-300 dark:border-irohGray-800'>
            <div className='max-w-6xl mx-auto px-4'>
              <div className='pb-10'>
                <h3 className='text-3xl font-bold mb-2'>Modular toolkit</h3>
                <p className='text-irohGray-600 dark:text-irohGray-400
                text-lg'>
                There are dozens of open source ready-made, composable protocols
                are built on top of iroh. Mix & match to get the feature set you
                need.</p> </div>
              <ProtocolHeroList />
            </div>
          </section>

          {/* Solutions */}
          <section id="solutions" className='max-w-6xl mx-auto border-l border-r border-b border-irohGray-300 dark:border-irohGray-800 py-16 px-4'>
            <div className='md:px-5 mb-10'>
              <h3 className='text-3xl font-bold mb-2'>Solutions</h3>
              <p className='text-irohGray-600 dark:text-irohGray-400 text-lg'>See how companies use iroh to build fast, reliable, distributed applications.</p>
            </div>
            <div className='space-y-6 px-0 md:px-5'>
              <Link href="/solutions/nous" className="block">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <div className="md:col-span-2">
                    <p className="text-sm text-irohPurple-500 font-medium mb-2 uppercase tracking-wide">AI/ML</p>
                    <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Distributed AI Training</p>
                    <p className="text-irohGray-600 dark:text-irohGray-300">Train foundation LLMs with compute distributed around the world, across AWS, GCP, Azure, and self-hosted infrastructure.</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/img/user-logos/nous.png" alt="Nous logo" className="object-contain max-h-16" />
                  </div>
                </div>
              </Link>
              <Link href="/solutions/rave" className="block">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <div className="md:col-span-2">
                    <p className="text-sm text-irohPurple-500 font-medium mb-2 uppercase tracking-wide">Streaming Video</p>
                    <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Video Streaming at Global Scale</p>
                    <p className="text-irohGray-600 dark:text-irohGray-300">Stream video between millions of devices around the world every day, with over 1 million concurrent connections per relay.</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/img/user-logos/rave.png" alt="Rave logo" className="object-contain max-h-16" />
                  </div>
                </div>
              </Link>
              <Link href="/solutions/delta-chat" className="block">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <div className="md:col-span-2">
                    <p className="text-sm text-irohPurple-500 font-medium mb-2 uppercase tracking-wide">Resilient Apps</p>
                    <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Resilient Messaging & P2P Web Apps</p>
                    <p className="text-irohGray-600 dark:text-irohGray-300">Power in-chat apps for hundreds of thousands of devices around the world, even when internet access is precarious.</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/img/user-logos/delta_chat.png" alt="Delta Chat logo" className="object-contain max-h-16" />
                  </div>
                </div>
              </Link>
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

                    <p className='mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400 mb-8'>
                      When you build your app, iroh provides opt-in
                      <a href="https://docs.iroh.computer/iroh-online/metrics/custom" className="text-irohPurple-500 hover:underline"> observability</a> and
                      <a href="https://docs.iroh.computer/metrics/custom" className="text-irohPurple-500 hover:underline"> custom metrics</a> specific for your app. Get visibility into your endpoints &mdash; track connection health and throughput across all your devices and services.

                      </p>

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
use iroh_ping::Ping;

#[tokio::main]
async fn main() -> Result<()> {
    // create the receive side
    let recv_ep = Endpoint::builder().bind().await?;
    let recv_router = Router::builder(recv_ep.clone())
        .accept(iroh_ping::ALPN, Ping::new())
        .spawn();
    recv_ep.online().await;
    let addr = recv_router.endpoint().addr();

    // create a send side & send a ping
    let send_ep = Endpoint::builder().bind().await?;
    let send_pinger = Ping::new();
    let rtt = send_pinger.ping(&send_ep, addr).await?;
    println!("ping took: {rtt:?} to complete");

    Ok(())
}`
