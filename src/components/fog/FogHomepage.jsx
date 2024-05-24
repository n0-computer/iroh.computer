'use client';

import React from 'react'
import Image from 'next/image'
import localFont from 'next/font/local'
import clsx from 'clsx'
import {
  ChatBubbleLeftIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'
import { Button } from '../Button'

const koulen = localFont({
  src: '../../fonts/Koulen-Regular.ttf',
  display: 'swap',
  variable: '--font-koulen-regular',
  weight: '200 900',
})

const install = `curl -fsSL https://iroh.computer/fog.sh | sh`

export default function SendmePage() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(install);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }

  return (
    <div className={clsx('w-full h-full bg-white text-zinc-700', koulen.variable)}>
      <div className="pt-10 mx-auto lg:max-w-5xl">
        <div className='max-w-5xl mx-auto text-center mt-20'>
          <h1 className='text-5xl lg:text-7xl font-koulen'>FOG</h1>
          <p className='text-lg text-zinc-500'>It's the cloud, but on the ground</p>
        </div>
        <Image src="/img/sendme/sendme_hero_1.svg" alt='one computer sending files to another computer through a pipe' width='1600' height='900' className='md:-mt-20' />

        <div className='md:-mt-20 mx-5 md:mx-0 h-10 border-l border-r shadow-sm' />
        <div className='mx-5 md:mx-0 border-t border-l border-r shadow-sm'>
          <div className='md:flex'>
            <div className='px-5 py-10 border-b md:border-r md:w-5/12'>
              <h2 className='text-4xl text-zinc-700 font-koulen'>Run a dynamic Compute cluster from the laptop in your closet</h2>
              <p className='mt-1 text-sm/6 text-gray-500'>Pull compute resources from <i className='italic'>anywhere</i> in a dynamic network that can run docker & WASM jobs. Data transfer, work scheduling, image pulling, and even discord integration are all handled automatically</p>
            </div>

            <div className='px-5 py-10 border-b flex-1 md:w-7/12'>
              <h3 className='text-3xl font-koulen'>Fog bot</h3>
              <p className='mt-1 text-sm/6 text-gray-500'>Join the iroh discord & use `/docker` in the #fog channel:</p>
              <a href='https://iroh.computer/discord' className='text-xs md:text rounded bg-zinc-100 p-2 mt-2 flex plausible-event-name=Fog+Join+Discord+Click'>
                JOIN DISCORD
              </a>

              <h3 className='text-3xl mt-10 font-koulen'>Install</h3>
              <p className='mt-1 text-sm/6 text-gray-500'>Add fog to your machine using shell:</p>
              <button className='text-xs md:text rounded bg-zinc-100 p-2 mt-2 flex plausible-event-name=Fog+Copy+Install+Script+Click' onClick={handleCopy}>
                <div className='grow mr-10 font-spaceMono'>$ {install}</div>
                {copied
                  ? <span className='w-10 mr-1'>copied!</span>
                  : <span className='w-10 mr-1'></span> }
                {copied
                  ? <ClipboardDocumentCheckIcon className="h-5 w-5 text-zinc-500" />
                  : <ClipboardDocumentIcon className="h-5 w-5 text-zinc-500" />}
              </button>
            </div>
          </div>
        </div>

        <div className='mx-5 md:mx-0 h-5 border-l border-r shadow-sm' />
        <div className='mx-5 md:mx-0 border-t border-l border-r shadow-sm'>
          <div className='md:flex sm:gap-5 border-b'>
            <div className='md:w-1/3 p-5 pb-10'>
              <div className='px-5 pt-10'>
                <h3 className='font-koulen text-zinc-600 text-xl'></h3>
              </div>
              <div className='relative rounded border border-zinc-300 bg-zinc-100 p-2 py-8 h-40 mb-5'>
                <div className='absolute top-0 left-0 p-2 flex gap-1'>
                  <div className='border border-zinc-400 w-3 h-3 rounded-full' />
                  <div className='border border-zinc-400 w-3 h-3 rounded-full' />
                  <div className='border border-zinc-400 w-3 h-3 rounded-full' />
                </div>
                <p className='font-mono font-bold text-sm'>{'>'} $ sendme send ~/great_photos</p>
                <p className='font-mono text-zinc-400 text-sm'>content added</p>
                <p className='font-mono text-zinc-400 text-sm'>run sendme receive blobQmFoo...</p>
              </div>
              <h3 className='font-koulen text-3xl'>Shared Workspace</h3>
              <p className='mt-1 text-sm/6 text-gray-500'>pass a file or folder you want to share to sendme. It&apos;ll spit out a ticket.</p>
            </div>
            <div className='md:w-1/3 p-5 pb-10'>
              
              <div className='relative p-2 flex h-40 mb-5'>
                <ChatBubbleLeftIcon className='w-6 h-6 mr-2' />
                <div className='rounded-tr-lg rounded-br-lg rounded-bl-lg border bg-zinc-50 p-2 pb-10 mb-2 h-20'>
                  hey here have some great photos:
                  blobQmFoo...
                </div>
              </div>
              <h3 className='font-koulen text-3xl'>S3 API support</h3>
              <p className='mt-1 text-sm/6 text-gray-500'>every workspace stores all objects in a shared </p>
            </div>
            <div className='md:w-1/3 p-5 pb-10'>
              <div className='relative rounded border border-zinc-300 bg-zinc-100 p-2 py-8 h-40 mb-5'>
                <div className='absolute top-0 left-0 p-2 flex gap-1'>
                  <div className='border border-zinc-400 w-3 h-3 rounded-full' />
                  <div className='border border-zinc-400 w-3 h-3 rounded-full' />
                  <div className='border border-zinc-400 w-3 h-3 rounded-full' />
                </div>
                <p className='font-mono font-bold text-sm'>{'>'} $ sendme receive blobQmFoo...</p>
                <p className='font-mono text-zinc-400 text-sm'>fetched to great_photos</p>
              </div>
              <h3 className='font-koulen text-3xl'>3. Download</h3>
              <p className='mt-1 text-sm/6 text-gray-500'>run get to fetch data directly from your friend.</p>
            </div>
          </div>
        </div>

          <div className='mx-5 md:mx-0 h-5 border-l border-r shadow-sm' />
          <div className='mx-5 md:mx-0 border-t border-l border-r shadow-sm'>
            <div>
              <div className='p-5'>
                <h3 className='text-2xl md:text-3xl font-koulen'>Free, for files & folders of any size</h3>
                <p className='mt-1 text-sm/6 text-gray-500'>sendme works by connecting sender and receiver directly, so there&apos;s no need to upload to a server, which means no cost!</p>
              </div>
              <div className='md:flex border-t border-b'>
                <div className='p-5 md:border-r'>
                  <h3 className='font-koulen text-3xl'>Fast</h3>
                  <p className='mt-1 text-sm/6 text-gray-500'>Sendme can saturate a 4Gbps connection.</p>
                </div>
                <div className='p-5 md:border-r'>
                  <h3 className='font-koulen text-3xl'>Resumable fetching</h3>
                  <p className='mt-1 text-sm/6 text-gray-500'>Interrupted downloads pick up where they left off.</p>
                </div>
                <div className='p-5'>
                  <h3 className='font-koulen text-3xl'>Integrity checks</h3>
                  <p className='mt-1 text-sm/6 text-gray-500'>Data is automatically verified for correctness on both send and receive.</p>
                </div>
              </div>
            </div>

          <div className='border-t border-b bg-iroh-kv-1 p-5 py-20'>
            <h2 className='text-2xl font-bold font-spaceMono'>Fog is built on <a href="/" className='text-irohPurple-500'>iroh</a></h2>
            <p className='md:max-w-lg mt-5'>Just like <a className='text-irohPurple-500' href="https://iroh.computer/sendme">sendme</a> and <a className='text-irohPurple-500' href="https://dumbpipe.dev">dumbpipe</a>, sendme is built on iroh. Fog uses iroh <a className='text-irohPurple-700' href='https://iroh.computer/docs/layers/documents'>documents</a> to coordinate computer, <a className='text-irohPurple-700' href="/docs/layers/blobs">blobs</a> to replicate data, and <a className='text-irohPurple-700' href='/docs/layers/connections'>connections</a> to establish direct links between devices</p>
            <Button href='/' variant='filled' className='mt-5 plausible-event-name=Fog+Iroh+CTA+Click'>BUILD ON IROH</Button>
          </div>
        </div>
        <div className='mx-5 mb-20 md:mx-0 h-5 border-l border-r' />
      </div>
    </div>
  )
}
