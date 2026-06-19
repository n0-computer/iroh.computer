import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { SquareCheck } from 'lucide-react'

import {FooterMarketing} from '@/components/FooterMarketing';
import {HeaderSparse} from '@/components/HeaderSparse';
import {HomeHero} from '@/components/HomeHero';
import {FromTheBlog} from '@/components/FromTheBlog';
import {MetricsIllustration} from '@/components/MetricsIllustration';
import {AnywhereIllustration} from '@/components/AnywhereIllustration';
import { IrohEverywhere } from '@/components/IrohEverywhere';
import {ProtocolHeroList} from '@/components/ProtocolHeroList';
import {LogoCloud} from '@/components/home/LogoCloud';

import { OpenSourceIllustration } from '@/components/OpenSourceIllustration';

import logoRust from '@/images/language-logos/rust.svg';
import logoSwift from '@/images/language-logos/swift.svg';
import logoJavascript from '@/images/language-logos/node.svg';
import logoKotlin from '@/images/language-logos/kotlin.svg';
import logoPython from '@/images/language-logos/python.svg';
import { CodeBlockTabs } from '@/components/CodeBlockTabs';

export const metadata = {
  title: 'Iroh',
  description:
    'less net work for networks',
};

const languages = [
  { name: 'Swift', logo: logoSwift, href: 'https://docs.iroh.computer/languages/swift' },
  { name: 'Rust', logo: logoRust, href: 'https://docs.iroh.computer/languages/rust' },
  { name: 'JavaScript', logo: logoJavascript, href: 'https://docs.iroh.computer/languages/javascript' },
  { name: 'Kotlin', logo: logoKotlin, href: 'https://docs.iroh.computer/languages/kotlin' },
  { name: 'Python', logo: logoPython, href: 'https://docs.iroh.computer/languages/python' },
];

const platforms = [
  { name: 'Raspberry Pi', file: 'RaspberryPi', color: '#A22846' },
  { name: 'Espressif', file: 'Espressif', color: '#E7352C' },
  { name: 'Linux', file: 'Linux', color: '#B8860B' },
  { name: 'Windows', file: 'Windows', color: '#0078D4' },
  { name: 'Apple', file: 'Apple' },
  { name: 'Android', file: 'Android', color: '#34A853' },
];

function PlatformLogo({ name, file, href, color, logo }) {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper href={href} className={`flex items-center gap-2.5${href ? ' transition-opacity hover:opacity-70' : ''}`}>
      {logo ? (
        <Image src={logo} alt='' aria-hidden='true' className='h-6 w-6 shrink-0' unoptimized />
      ) : (
        <span
          aria-hidden='true'
          className={`h-6 w-6 shrink-0${color ? '' : ' bg-irohGray-700 dark:bg-irohGray-200'}`}
          style={{
            ...(color ? { backgroundColor: color } : {}),
            maskImage: `url(/img/platform-logos/${file}.svg)`,
            WebkitMaskImage: `url(/img/platform-logos/${file}.svg)`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
        />
      )}
      <span className='text-lg font-medium text-irohGray-700 dark:text-irohGray-200'>{name}</span>
    </Wrapper>
  );
}

export default function Page() {
  return (
    <div>
      <HeaderSparse />

      <div className="bg-white dark:bg-black text-irohGray-700 dark:text-irohGray-100 h-92 justify-between font-space">
        <main className="mb-auto flex flex-col min-h-92">
          {/* hero */}
          <section className="min-h-92 pt-20 bg-cover overflow-hidden md:h-[480px]">
            <div className='relative max-w-7xl mx-auto'>
              <div className='absolute z-10 overflow-hidden w-full'>
                <HomeHero className='' />
              </div>
              <div className="relative md:absolute z-40 w-full md:w-auto max-w-7xl mx-auto md:grid md:grid-cols-4 md:gap-4">
                <div className="col-span-2 pl-8 pr-8 md:pr-0" style={{ paddingTop: 100 }}>
                  <h1 className="z-50 text-5xl font-bold leading-tight">
                    IP addresses <span className="text-irohPurple-500">break,</span> dial keys instead
                  </h1>
                  <h3 className="text-lg mt-3 leading-normal">
                    Add peer-to-peer connectivity to your app, agent, or workflow.
                  </h3>
                  <div className='flex mt-3 gap-3'>
                    <a href="https://docs.iroh.computer/quickstart" className="my-4 p-3 px-4 transition bg-irohPurple-500 text-white uppercase hover:bg-irohPurple-600 hover:text-white plausible-event-name=Home+Hero+Start+Project+Click">Read the Docs</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* real-world use */}
          <section className='max-w-7xl mx-auto'>
            <LogoCloud />
          </section>


          <section className="relative isolate overflow-hidden bg-gray-900 dark:bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10"></div>
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 dark:bg-slate-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <figure className="mt">
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

          {/* supported platforms */}
          <section className='max-w-7xl mx-auto px-4 py-16'>
            
            <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-5'>
              {languages.map((logo) => (
                <PlatformLogo key={logo.name} {...logo} />
              ))}
            </div>
            <div className='mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-5'>
              {platforms.map((logo) => (
                <PlatformLogo key={logo.name} {...logo} />
              ))}
            </div>
          </section>

          {/* reach every device */}
          <section className='max-w-7xl mx-auto py-16 px-4'>
            <div className='grid gap-12 grid-cols-1 md:grid-cols-2 items-center'>
              <div>
              <h3 className='text-5xl font-bold mb-10'> Built for environments where connectivity is unreliable or intermittent</h3>
                <ul className='space-y-5'>
                  <li className='flex gap-3'>
                    <SquareCheck className='w-6 h-6 shrink-0 mt-1 text-irohPurple-500' aria-hidden='true' />
                    <p className='text-xl text-irohGray-600 dark:text-irohGray-400'><span className='font-semibold text-irohGray-900 dark:text-irohGray-100'>Use all the radios:</span> Wi-Fi, cellular, ethernet, LAN, or <a href="https://docs.iroh.computer/transports/bluetooth" className="text-irohPurple-500 hover:underline">Bluetooth</a>, or bring your own transport.</p>
                  </li>
                  <li className='flex gap-3'>
                    <SquareCheck className='w-6 h-6 shrink-0 mt-1 text-irohPurple-500' aria-hidden='true' />
                    <p className='text-xl text-irohGray-600 dark:text-irohGray-400'> <span className='font-semibold text-irohGray-900 dark:text-irohGray-100'>Lean on the cloud less</span> with direct links that bypass NATs and firewalls, with <a href="https://docs.iroh.computer/concepts/relays" className="text-irohPurple-500 hover:underline">stateless relays</a> as fallback.</p>
                  </li>
                  <li className='flex gap-3'>
                    <SquareCheck className='w-6 h-6 shrink-0 mt-1 text-irohPurple-500' aria-hidden='true' />
                    <p className='text-xl text-irohGray-600 dark:text-irohGray-400'><span className='font-semibold text-irohGray-900 dark:text-irohGray-100'>Secure end-to-end encryption</span>, with opt-in <a href="https://docs.iroh.computer/iroh-services/metrics" className="text-irohPurple-500 hover:underline">observability</a> to diagnose issues and improve performance.</p>
                  </li>
                </ul>
              </div>
              <div>
                <OpenSourceIllustration className="w-full" />
              </div>
            </div>
          </section>

          {/* Solutions */}
          <section id="solutions" className='max-w-7xl mx-auto py-16 px-4'>
            <div className='mb-10'>
              <h3 className='text-5xl font-bold mb-2'>How are people using iroh?</h3>
            </div>
            <div className='grid gap-6 md:grid-cols-2'>
              <Link href="/solutions/nous" className="block h-full">
                <div className="h-full p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Distributed AI Training</p>
                  <p className="text-irohGray-600 dark:text-irohGray-300">Train foundation LLMs with compute distributed around the world, across AWS, GCP, Azure, and self-hosted infrastructure.</p>
                </div>
              </Link>
              <Link href="/solutions/rave" className="block h-full">
                <div className="h-full p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Video Streaming</p>
                  <p className="text-irohGray-600 dark:text-irohGray-300">Stream video between devices, using peer to peer technology. Create encrypted connections built on open standards, across the globe or across the room.</p>
                </div>
              </Link>
              <Link href="/solutions/delta-chat" className="block h-full">
                <div className="h-full p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Real-time Sync for Mobile Applications</p>
                  <p className="text-irohGray-600 dark:text-irohGray-300">Powers apps for hundreds of thousands of devices around the world, even when internet access is precarious.</p>
                </div>
              </Link>
              <Link href="/solutions/pos" className="block h-full">
                <div className="h-full p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">Point of Sale Payments</p>
                  <p className="text-irohGray-600 dark:text-irohGray-300">Connect payment terminals directly to point of sale systems over Bluetooth, LAN, or Wi-Fi with full PCI compliance and no additional servers.</p>
                </div>
              </Link>
              <Link href="/solutions/iot" className="block h-full">
                <div className="h-full p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">IoT &amp; Embedded Devices</p>
                  <p className="text-irohGray-600 dark:text-irohGray-300">Run iroh on ESP32, Raspberry Pi, and Linux with the same API. Devices discover each other automatically. No brokers, no gateways.</p>
                </div>
              </Link>
              <Link href="https://docs.iroh.computer" className="block h-full">
                <div className="h-full p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg hover:border-irohPurple-500 transition-colors">
                  <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 mb-2">File Transfer &amp; Sync</p>
                  <p className="text-irohGray-600 dark:text-irohGray-300">Move files and large blobs directly between devices with content-addressed, resumable transfers that verify every byte.</p>
                </div>
              </Link>
            </div>
          </section>

          <section className='max-w-7xl mx-auto py-16 px-4'>
            <div className='grid gap-12 grid-cols-1 md:grid-cols-2 items-center'>
              <div>
                <p className='text-5xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100'>Ready for production</p>
                <ul className='mt-8 space-y-6'>
                  <li className='flex gap-3'>
                    <SquareCheck className='w-6 h-6 shrink-0 mt-1 text-irohPurple-500' aria-hidden='true' />
                    <p className='text-xl text-irohGray-600 dark:text-irohGray-400'>
                      <span className='font-semibold text-irohGray-900 dark:text-irohGray-100'>Performant.</span> Every commit to iroh&apos;s main branch runs through a growing set of <a href="https://perf.iroh.computer" target="_blank" className="text-irohPurple-500 hover:underline">simulations &amp; tests</a>.
                    </p>
                  </li>
                  <li className='flex gap-3'>
                    <SquareCheck className='w-6 h-6 shrink-0 mt-1 text-irohPurple-500' aria-hidden='true' />
                    <p className='text-xl text-irohGray-600 dark:text-irohGray-400'>
                      <span className='font-semibold text-irohGray-900 dark:text-irohGray-100'>Monitored.</span> <a href="https://docs.iroh.computer/iroh-services/metrics" className="text-irohPurple-500 hover:underline">Observability</a> and <a href="https://docs.iroh.computer/iroh-services/net-diagnostics/quickstart" className="text-irohPurple-500 hover:underline">network diagnostics</a> track connection health and throughput.
                    </p>
                  </li>
                  <li className='flex gap-3'>
                    <SquareCheck className='w-6 h-6 shrink-0 mt-1 text-irohPurple-500' aria-hidden='true' />
                    <p className='text-xl text-irohGray-600 dark:text-irohGray-400'>
                      <span className='font-semibold text-irohGray-900 dark:text-irohGray-100'>Supported.</span> Every major release is <a href="https://docs.iroh.computer/about/release-policy" className="text-irohPurple-500 hover:underline">supported for multiple years</a> with extended support contracts available.
                    </p>
                  </li>
                </ul>
                <Link href='/services/enterprise' className='inline-block mt-6 text-irohPurple-500 plausible-event-name=Home+Start+Building+Click'>
                  Get help from the pros <ArrowRightIcon className='inline-block w-5 h-5 ml-2 -mt-1' />
                </Link>
              </div>
              <div>
                <MetricsIllustration className="w-full" />
              </div>
            </div>
          </section>


          <section className="bg-gray-900 dark:bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:gap-12'>
              <p className='text-5xl font-bold tracking-tight text-white md:w-1/2 shrink-0'>
                <span className='text-irohPurple-500'>Open source.</span>
                <br />
                Forever.
              </p>
              <p className='text-xl font-medium text-gray-300 mt-4 md:mt-2'>
                The core peer-to-peer technology is <a href="https://github.com/n0-computer/iroh" className='text-irohPurple-500 hover:underline'>open source</a> and built on open standards, so you&apos;re never locked in: connect over our free community <a href="https://docs.iroh.computer/concepts/relays" className='text-irohPurple-500 hover:underline'>relays</a>, self-host your own, let us <a href="/services/hosting" className='text-irohPurple-500 hover:underline'>run them for you</a>, and switch between them whenever you want.
              </p>
            </div>
          </section>

          {/* build in your language */}
          <section>
            <div className='max-w-7xl mx-auto px-4 lg:flex lg:space-x-10 py-20'>
              <div className='lg:w-1/3 mb-10'>
                <div className='flex space-x-6 mb-6'>
                  {[
                    { logo: logoSwift, name: 'Swift' },
                    { logo: logoRust, name: 'Rust' },
                    { logo: logoJavascript, name: 'JavaScript' },
                    { logo: logoKotlin, name: 'Kotlin' },
                    { logo: logoPython, name: 'Python' },
                  ].map(({ logo, name }) => (
                    <Image
                      key={name}
                      src={logo}
                      alt={name}
                      className="h-12 w-12"
                      unoptimized
                    />
                  ))}
                </div>
                <h1 className='text-5xl font-bold mb-2'>Start building.</h1>
                <Link href='https://docs.iroh.computer/what-is-iroh' className='inline-block my-4 text-irohPurple-500 plausible-event-name=Home+Start+Building+Click'>
                  Read the Docs <ArrowRightIcon className='inline-block w-5 h-5 ml-2 -mt-1' />
                </Link>
              </div>
              <div className='lg:w-2/3'>
                <CodeBlockTabs snippets={codeSnippets} />
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


// Minimal "dial a peer and echo a message" flow in each language.
// APIs match the iroh-ffi endpoint tests and the Rust quickstart docs.
const codeSnippets = [
  {
    title: 'Swift',
    label: 'App.swift',
    language: 'swift',
    code: `import IrohLib

@main
struct App {
    static func main() async throws {
        // Dial a peer and echo a message over a bidirectional stream.
        let endpoint = try await Endpoint.bind(
            options: EndpointOptions(preset: presetN0())
        )

        let conn = try await endpoint.connect(addr: serverAddr, alpn: ALPN)
        let bi = try await conn.openBi()

        try await bi.send().writeAll(buf: Data("hello iroh".utf8))
        try await bi.send().finish()

        let echoed = try await bi.recv().readToEnd(sizeLimit: 64)
        print(String(decoding: echoed, as: UTF8.self))
    }
}`,
  },
  {
    title: 'Rust',
    label: 'main.rs',
    language: 'rust',
    code: `use anyhow::Result;
use iroh::{Endpoint, endpoint::presets};

#[tokio::main]
async fn main() -> Result<()> {
    // Dial a peer and echo a message over a bidirectional stream.
    let endpoint = Endpoint::bind(presets::N0).await?;

    let conn = endpoint.connect(server_addr, ALPN).await?;
    let (mut send, mut recv) = conn.open_bi().await?;

    send.write_all(b"hello iroh").await?;
    send.finish()?;

    let echoed = recv.read_to_end(64).await?;
    println!("{}", String::from_utf8_lossy(&echoed));
    Ok(())
}`,
  },
  {
    title: 'JavaScript',
    label: 'index.js',
    language: 'javascript',
    code: `const { Endpoint } = require('@number0/iroh')

async function main() {
  // Dial a peer and echo a message over a bidirectional stream.
  const builder = Endpoint.builder()
  builder.applyN0()
  const endpoint = await builder.bind()

  const conn = await endpoint.connect(serverAddr, ALPN)
  const bi = await conn.openBi()

  await bi.send.writeAll(Array.from(Buffer.from('hello iroh')))
  await bi.send.finish()

  const echoed = await bi.recv.readToEnd(64)
  console.log(Buffer.from(echoed).toString())
}

main()`,
  },
  {
    title: 'Kotlin',
    label: 'Main.kt',
    language: 'kotlin',
    code: `import computer.iroh.*
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    // Dial a peer and echo a message over a bidirectional stream.
    val endpoint = Endpoint.bind(EndpointOptions(preset = presetN0()))

    val conn = endpoint.connect(serverAddr, ALPN)
    val bi = conn.openBi()

    bi.send().writeAll("hello iroh".toByteArray())
    bi.send().finish()

    val echoed = bi.recv().readToEnd(64u)
    println(String(echoed))
}`,
  },
  {
    title: 'Python',
    label: 'main.py',
    language: 'python',
    code: `import asyncio
from iroh import Endpoint, EndpointOptions, preset_n0

async def main():
    # Dial a peer and echo a message over a bidirectional stream.
    endpoint = await Endpoint.bind(EndpointOptions(preset=preset_n0()))

    conn = await endpoint.connect(server_addr, ALPN)
    bi = await conn.open_bi()

    await bi.send().write_all(b"hello iroh")
    await bi.send().finish()

    echoed = await bi.recv().read_to_end(64)
    print(echoed.decode())

asyncio.run(main())`,
  },
]
