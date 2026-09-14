import clsx from 'clsx'
import Link from 'next/link'

import { getAllPosts  } from '@/lib/blog'
import { formatDate } from '@/lib/formatDate'

function Article({ className, post }) {
  return (
    <article className={clsx(className, 'h-full')}>
      <Link
        href={`/blog/${post.slug}`}
        className='group flex h-full cursor-pointer flex-col border border-irohGray-300 bg-white px-6 py-7 shadow-sm transition hover:-translate-y-0.5 hover:border-irohPurple-500 hover:bg-irohPurple-500/5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-irohPurple-500 dark:border-irohGray-700 dark:bg-irohGray-900 dark:hover:border-irohPurple-500 sm:px-8'
      >
        <time dateTime={post.date} className='font-mono text-sm uppercase tracking-wider text-irohGray-500 dark:text-irohGray-400'>
          {formatDate(post.date)}
        </time>
        <h3 className='mt-5 text-2xl font-semibold tracking-tight text-irohGray-900 transition-colors group-hover:text-irohPurple-600 dark:text-irohGray-100 dark:group-hover:text-irohPurple-400'>
          {post.title}
        </h3>
        <p className='mt-3 flex-1 text-base leading-7 text-irohGray-600 dark:text-irohGray-400'>{post.description}</p>
        <span className='mt-6 font-semibold text-irohPurple-500'>Read post <span className='inline-block transition-transform group-hover:translate-x-1'>→</span></span>
      </Link>
    </article>
  )
}


export async function FromTheBlog() {
  let posts = await getAllPosts()
  posts = posts.slice(0, 2)

  return (
    <div className="mt-12 grid w-full gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <Article key={post.slug} post={post} />
      ))}
    </div>
  )
}
