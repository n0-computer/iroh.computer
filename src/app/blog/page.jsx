import { Card } from '@/components/Card'
import { BlogLayout } from '@/components/BlogLayout'
import { getAllPosts  } from '@/lib/blog'
import { formatDate } from '@/lib/formatDate'

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

export const metadata = {
  title: 'Blog',
  description:
    'Articles related to iroh use & development',
}

export default async function ArticlesIndex() {
  let posts = await getAllPosts()

  return (
    <BlogLayout
      title="Iroh Blog"
      intro="Articles related to iroh use & development"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {posts.map((post) => (
            <Article key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </BlogLayout>
  )
}