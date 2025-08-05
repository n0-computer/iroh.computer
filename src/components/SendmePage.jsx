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
import { Button } from './Button'

const koulen = localFont({
  src: '../fonts/Koulen-Regular.ttf',
  display: 'swap',
  variable: '--font-koulen-regular',
  weight: '200 900',
})

export default function SendmePage() {
  const install = `curl -fsSL https://iroh.computer/sendme.sh | sh`
  const install_win = `iwr https://iroh.computer/sendme.ps1 -useb | iex`
  const [copied, setCopied] = React.useState(false)
  const [copiedWin, setCopiedWin] = React.useState(false)

  const _handleCopy = (ins) => {
    navigator.clipboard.writeText(ins);
  }

  const handleCopy = () => {
    _handleCopy(install);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }

  const handleCopyWin = () => {
    _handleCopy(install_win);
    setCopiedWin(true);
    setTimeout(() => {
      setCopiedWin(false);
    }, 1300);
  }

  return (
    <div className={clsx('w-full h-full bg-white text-zinc-700', koulen.variable)}>
      <div className="pt-10 mx-auto lg:max-w-5xl">
        <div className='max-w-5xl mx-auto text-center mt-20'>
          <p className='text-lg text-zinc-500 font-koulen'>Need to send files? Try</p>
          <h1 className='text-5xl lg:text-7xl font-koulen'>Sendme</h1>
          <p className='text-lg text-zinc-500'>Free. No account required.</p>
        </div>
        <Image src="/img/sendme/sendme_hero_1.svg" alt='one computer sending files to another computer through a pipe' width='1600' height='900' className='md:-mt-20' />

        <div className='md:-mt-20 mx-5 md:mx-0 h-10 border-l border-r shadow-sm' />
        <div className='mx-5 md:mx-0 border-t border-l border-r shadow-sm'>
          <div className='md:flex'>
            <div className='px-5 py-10 border-b md:border-r md:w-5/12'>
              <h2 className='text-4xl text-zinc-700 font-koulen'>File transfer<br />doesn&apos;t need to be complicated</h2>
              <p className='mt-5 text-md/10 text-gray-500'>It&apos;s like <span className='font-space-mono bg-zinc-100 px-1 py-0.5 rounded'>scp</span> without needing to know the IP address. Add some files to sendme, and it will give you a pastable ticket that you can give to anyone who needs your files. Sendme will connect your devices directly & transfer the data without any accounts or configuration.</p>
            </div>

            <div className='px-5 py-10 border-b flex-1 md:w-7/12'>
              <h3 className='text-3xl font-koulen'>Install</h3>
              <p className='mt-1 text-sm/6 text-gray-500'>Add sendme to your machine using bash:</p>
              <button className='text-xs md:text rounded bg-zinc-100 p-2 mt-2 flex plausible-event-name=Sendme+Copy+Install+Script+Click' onClick={handleCopy}>
                <div className='grow mr-10 font-spaceMono'>$ {install}</div>
                {copied
                  ? <span className='w-10 mr-1'>copied!</span>
                  : <span className='w-10 mr-1'></span> }
                {copied
                  ? <ClipboardDocumentCheckIcon className="h-5 w-5 text-zinc-500" />
                  : <ClipboardDocumentIcon className="h-5 w-5 text-zinc-500" />}
              </button>
              <p className='mt-1 text-sm/6 text-gray-500'>On windows with PowerShell:</p>
              <button className='text-xs md:text rounded bg-zinc-100 p-2 mt-2 flex plausible-event-name=Sendme+Copy+Install+Script+Click' onClick={handleCopyWin}>
                <div className='grow mr-10 font-spaceMono'>$ {install_win}</div>
                {copiedWin
                  ? <span className='w-10 mr-1'>copied!</span>
                  : <span className='w-10 mr-1'></span> }
                {copiedWin
                  ? <ClipboardDocumentCheckIcon className="h-5 w-5 text-zinc-500" />
                  : <ClipboardDocumentIcon className="h-5 w-5 text-zinc-500" />}
              </button>
              <div className='mt-2 text-xs/6 text-gray-500'>
                <p>This will copy the sendme binary to the path you ran the script from.<br />Run it with <pre className='font-mono text-sm/6 rounded bg-zinc-100 px-2 py-1 inline'>./sendme</pre> on unix systems</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-5 md:mx-0 h-5 border-l border-r shadow-sm' />
        <div className='mx-5 md:mx-0 border-t border-l border-r shadow-sm'>
          <div className='px-5 pt-10'>
            <h3 className='font-koulen text-zinc-600 text-xl'>USING SENDME:</h3>
          </div>
          <div className='md:flex sm:gap-5 border-b'>
            <div className='md:w-1/3 p-5 pb-10'>
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
              <h3 className='font-koulen text-3xl'>1. Setup</h3>
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
              <h3 className='font-koulen text-3xl'>2. Paste</h3>
              <p className='mt-1 text-sm/6 text-gray-500'>copy-paste the ticket to your friend.</p>
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
            <h2 className='text-2xl font-bold font-spaceMono'>Sendme is built on <a href="/" className='text-iroh-purple-500'>iroh</a></h2>
            <p className='md:max-w-lg mt-5'>Just like <a className='text-iroh-purple-500' href="https://dumbpipe.dev">dumbpipe</a>, sendme is built on iroh. Sendme uses <a className='text-iroh-purple-700' href='/docs/overview'>iroh</a> to establish direct links between devices for data transfer, and <a className='text-iroh-purple-700' href="/proto/iroh-blobs">iroh-blobs</a> to send and verify your files</p>
            <Button href='/' variant='filled' className='mt-5 plausible-event-name=Sendme+Iroh+CTA+Click'>BUILD ON IROH</Button>
          </div>
        </div>
        <div className='mx-5 mb-20 md:mx-0 h-5 border-l border-r' />
      </div>
    </div>
  )
}
