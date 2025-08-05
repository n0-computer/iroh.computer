import { ChevronLeftIcon } from '@heroicons/react/20/solid'

import { Prose } from '@/components/Prose'
import References from '@/components/References'
import BlogHeader from '@/components/BlogHeader'
import { FooterMarketing } from '@/components/FooterMarketing'
import { formatDate } from '@/lib/formatDate'

export function BlogPostLayout({ article, references = [], children }) {
  return (
    <div>
      <BlogHeader />
      <div className="px-5 sm:px-0 mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto mt-32 mb-64 max-w-2xl">
            <a
              href="/blog"
              aria-label="Go back to articles"
              className="flex text-sm font-medium text-iroh-purple-500 mb-5"
            >
              <ChevronLeftIcon className="mr-1 mt-1 h-4 w-4" />
              Blog Index
            </a>
            <article>
              <header className="flex flex-col">
                <h1 className="text-4xl font-space tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                  {article.title}
                </h1>
                <span className='mt-1 text-base text-zinc-400 dark:text-zinc-500'>
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  <span>{' '}by {article.author}</span>
                </span>
              </header>
              <Prose className="mt-8" data-mdx-content>
                {children}
                {references.length > 0 && (
                  <References references={references} />
                )}
                <div className="text-base text-zinc-400 dark:text-zinc-500 italic">
                  Iroh is a dial-any-device networking library that just works. Compose from an ecosystem of ready-made protocols to get the features you need, or go fully custom on a clean abstraction over dumb pipes. Iroh is open source, and already running in production on hundreds of thousands of devices.<br/>
                  To get started, take a look at our <a href="https://iroh.computer/docs">docs</a>, dive directly into <a href="https://github.com/n0-computer/iroh">the code</a>, or chat with us in our <a href="https://iroh.computer/discord">discord channel</a>.
                </div>
              </Prose>
            </article>
          </div>
        </div>
      </div>
      <FooterMarketing />
    </div>
  )
}
