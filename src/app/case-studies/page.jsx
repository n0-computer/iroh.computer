'use client';

import BlogHeader from '@/components/BlogHeader'
import Example from '@/components/Example'
import { FooterMarketing } from '@/components/FooterMarketing'
import Image from 'next/image'

// export const metadata = {
//   title: 'Use Cases',
//   description:
//     'Some of the ways teams are using iroh',
// }

export default async function ArticlesIndex() {
  return (
    <div>
      <BlogHeader />
      <header className="py-32 bg-iroh-kv-2">
        <div className='mt-20 ml-10 mr-auto'>
          <h1 className="text-4xl font-space text-zinc-800 sm:text-4xl">Use Cases</h1>
          <p className='text-lg text-zinc-500 mt-2'>iroh is a software development kit with all sorts uses, <br />here are a few to get your own ideas flowing.</p>
        </div>
      </header>
      <section className='py-20'>
        <div className='mx-auto max-w-5xl md:flex'>
          <div>
            <h2 className='text-3xl font-space uppercase dark:text-zinc-200'>App Development</h2>
            <p className='mt-2 text-zinc-500'>Build apps that increase user agency, work offline, and scale to millions of users, all while costing less to operate.</p>
          </div>
          <div>
            <Example example={{
              // TODO: finish TODOs docs page, switch this href for "/docs/examples/todos"
              href: 'https://github.com/n0-computer/iroh-example-todos',
              name: 'Todos',
              description:
                'See iroh in the classic TODO app example, with a CLI & desktop GUI.',
              tags: ["data modeling", "CLI", "tauri", "desktop"],
              pattern: {
                y: 16,
                squares: [
                  [0, 1],
                  [1, 3],
                ],
              },
            }} />
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='mx-auto max-w-5xl md:flex'>
          <div>

          </div>
          <div>
            <h2 className='text-3xl font-space uppercase dark:text-zinc-200'>File Syncing</h2>
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='mx-auto max-w-5xl md:flex'>
          <div>
            <h2 className='text-3xl font-space uppercase dark:text-zinc-200'>Machine Learning</h2>
            <p>
            - content addressed inputs
                - RAG + Content Addressing = $$$
                - Case Study: EQTY Lab
            - downloading models locally
            </p>
          </div>
          <div>
            <p>Case Study: EQTY Lab</p>
            <Image alt='screenshot of EQTY lab web site' src='/img/use-cases/eqty-lab.png' width={500} height={500} />
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='mx-auto max-w-5xl md:flex'>
          <div>
            <h2 className='text-3xl font-space uppercase dark:text-zinc-200'>Internet of Things</h2>
            <p>
            - data aggregation
                - dial into remote boxes & verifiably fetch the latest data
                - bridge to HTTP & query with HTTP-backed SQL queries
            - multi-site backup
            </p>
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='mx-auto max-w-5xl md:flex'>
          <div>
            <h2 className='text-3xl font-space uppercase dark:text-zinc-200'>Gaming & 3D</h2>
            <p>
            - magical networking
            - unreliable streams
            - Asset Distribution
            </p>
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='mx-auto max-w-5xl md:flex'>
          <div>
            <h2 className='text-3xl font-space uppercase dark:text-zinc-200'>DataOps</h2>
            <p>
            - CI Integration
            </p>
          </div>
        </div>
      </section>
      <FooterMarketing />
    </div>
  )
}
