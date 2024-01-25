import { getAllPosts  } from '@/lib/blog'
import { formatDate } from '@/lib/formatDate'

import { Card } from '@/components/Card'
import BlogHeader from '@/components/BlogHeader'
import { FooterMarketing } from '@/components/FooterMarketing'

export const metadata = {
  title: 'Blog',
  description:
    'Articles related to iroh use & development',
}

function Article({ post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${post.slug}`}>
          {post.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.date}
          className="md:hidden"
          decorate
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read Post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(post.date)}
      </Card.Eyebrow>
    </article>
  )
}


export default async function ArticlesIndex() {
  let posts = await getAllPosts()

  return (
    <div>
      <BlogHeader />
      <div className='mt-20 mx-auto max-w-2xl min-h-screen lg:mt-32'>
        <header className="max-w-2xl">
          <h1 className="text-4xl font-space font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">Blog</h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">all things iroh &amp; development</p>
        </header>
        <div className="mt-20 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((post) => (
              <Article key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
      <FooterMarketing />
    </div>
  )
}