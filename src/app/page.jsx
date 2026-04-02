import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import {FooterMarketing} from '@/components/FooterMarketing';
import {HeaderSparse} from '@/components/HeaderSparse';
import {HomeHero} from '@/components/HomeHero';
import {FromTheBlog} from '@/components/FromTheBlog';
import {PerfChartIllustration} from '@/components/PerfChartIllustration';
import {AnywhereIllustration} from '@/components/AnywhereIllustration';
import { IrohEverywhere } from '@/components/IrohEverywhere';
import {ProtocolHeroList} from '@/components/ProtocolHeroList';
import {LogoCloud} from '@/components/home/LogoCloud';
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
            <div className='relative max-w-7xl mx-auto'>
              <div className='absolute z-10 overflow-hidden w-full'>
                <HomeHero className='' />
              </div>
              <div className="absolute z-40 max-w-7xl mx-auto md:grid md:grid-cols-4 md:gap-4">
                <div className="col-span-2 pl-8" style={{ paddingTop: 100 }}>
                  <h1 className="z-50 text-5xl font-bold leading-tight">
                    IP addresses <span className="text-irohPurple-500">break,</span> dial keys instead
                  </h1>
                  <h3 className="text-lg mt-3 leading-normal">Modular networking stack for direct,{' '}
                    <br />peer-to-peer connections between devices</h3>
                  <div className='flex mt-3'>
                    <a href="https://docs.iroh.computer/quickstart" className="my-4 p-3 px-4 transition bg-irohGray-800 text-irohPurple-500 uppercase hover:bg-irohGray-700 hover:text-gray-200 plausible-event-name=Home+Hero+Start+Project+Click">Read the Docs</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='max-w-7xl mx-auto'>
            <LogoCloud />
          </section>

          <section className='max-w-7xl mx-auto py-16 px-4'>
            <div className='flex flex-col md:flex-row md:items-start md:gap-12 mb-10'>
              <p className='text-5xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100 md:w-1/2 shrink-0'>
                <span className='text-irohPurple-500'>Fast connections.</span>
                <br />
                Anywhere.
                <br />
                Forever.
              </p>
              <p className='text-xl font-medium text-irohGray-600 dark:text-irohGray-400 mt-4 md:mt-2'>
                Send data to any device running anywhere, big or small &mdash;
                cloud servers, tablets, or embedded systems.
                The core peer-to-peer technology is <a href="https://github.com/n0-computer/iroh" className='text-irohPurple-500 hover:underline'>open source</a> and built on open standards, so you&apos;re never locked in.
              </p>
            </div>
            <IrohEverywhere />
          </section>


          <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10"></div>
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <figure className="mt-10">
                <blockquote className="text-center text-xl/8 font-semibold text-white sm:text-2xl/9">
                  <p>&ldquo;Doubling the network speed halves our compute budget.&rdquo;</p>
                </blockquote>
                <figcaption className="mt-10">
                  <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-white">Ari Lotter</div>
                    <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-white">
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <div className="text-gray-400">Principal Engineer at Nous</div>
                    <a href="/solutions/nous" className="text-irohPurple-500 hover:underline ml-2">Read the Case Study <ArrowRightIcon className='inline-block w-5 h-5 ml-1 -mt-1' /></a>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>

          <FeatureBentoGrid />

          {/* Solutions */}
          <section id="solutions" className='max-w-7xl mx-auto py-16 px-4'>
            <div className='mb-10'>
              <h3 className='text-5xl font-bold mb-2'>How are people using iroh?</h3>
            </div>
            <div className='space-y-6'>
              <Link href="/solutions/nous" className="block">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <div className="md:col-span-2">
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
                    <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Video Streaming</p>
                    <p className="text-irohGray-600 dark:text-irohGray-300">Stream video between devices, using peer to peer technology. Create encrypted connections built on open standards, across the globe or across the room.</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/img/user-logos/rave.png" alt="Rave logo" className="object-contain max-h-16" />
                  </div>
                </div>
              </Link>
              <Link href="/solutions/delta-chat" className="block">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <div className="md:col-span-2">
                    <p className="text-xl font-medium text-irohGray-100 dark:text-irohGray-100 mb-2">Data sync & P2P Web Apps</p>
                    <p className="text-irohGray-600 dark:text-irohGray-300">Powers in-chat apps for hundreds of thousands of devices around the world, even when internet access is precarious.</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/img/user-logos/delta_chat.png" alt="Delta Chat logo" className="object-contain max-h-16" />
                  </div>
                </div>
              </Link>
              <Link href="/solutions/pos" className="block">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <div className="md:col-span-2">
                    <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Point of Sale Payments</p>
                    <p className="text-irohGray-600 dark:text-irohGray-300">Connect payment terminals directly to point of sale systems over Bluetooth, LAN, or Wi-Fi with full PCI compliance and no additional servers.</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/img/user-logos/paycode.svg" alt="Paycode logo" className="object-contain max-h-16" />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          <section className='max-w-7xl mx-auto py-16 px-4'>
            <div className='grid gap-12 grid-cols-1 md:grid-cols-2 items-center'>
              <div>
                <p className='text-5xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100'>Deploy, Monitor, Fix</p>
                <p className='mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400'>All commits to iroh&apos;s main branch run through a growing set of <a href="https://perf.iroh.computer" target="_blank" className="text-irohPurple-500 hover:underline">simulations &amp; tests</a>.</p>
                <p className='mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400'>
                  iroh provides opt-in
                  <a href="https://docs.iroh.computer/iroh-services/metrics" className="text-irohPurple-500 hover:underline"> observability</a> and
                  <a href="https://docs.iroh.computer/iroh-services/net-diagnostics/quickstart" className="text-irohPurple-500 hover:underline"> network diagnostics</a> &mdash; track connection health and throughput across all your devices and services.
                </p>
                <Link href='https://services.iroh.computer/' className='inline-block mt-6 text-irohPurple-500 plausible-event-name=Home+Start+Building+Click'>
                  Monitor your App <ArrowRightIcon className='inline-block w-5 h-5 ml-2 -mt-1' />
                </Link>
              </div>
              <div>
                <PerfChartIllustration />
              </div>
            </div>
          </section>

          {/* iroh protocols */}
          <section className='max-w-7xl mx-auto py-16 px-4'>
            <h3 className='text-5xl font-bold mb-4'>Modular toolkit</h3>
            <p className='text-irohGray-600 dark:text-irohGray-400 text-lg mb-10'>
              Dozens of open-source, composable protocols built on top of iroh. Mix & match to get the feature set you need.</p>
            <ProtocolHeroList />
          </section>

          {/* build in your language */}
          <section>
            <div className='max-w-7xl mx-auto px-4 lg:flex lg:space-x-10 py-20'>
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
                <h1 className='text-5xl font-bold mb-2'>Start building.</h1>
                <Link href='https://docs.iroh.computer/what-is-iroh' className='inline-block my-4 text-irohPurple-500 plausible-event-name=Home+Start+Building+Click'>
                  Read the Docs <ArrowRightIcon className='inline-block w-5 h-5 ml-2 -mt-1' />
                </Link>
              </div>
              <div className='lg:w-2/3'>
                <CodeBlock code={codeSample} language='rust' />
              </div>
            </div>
          </section>
          <section className='max-w-7xl w-full mx-auto px-4 py-20'>
            <div className='w-full'>
              <h3 className='text-5xl font-bold mb-2'>From the Blog</h3>
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
