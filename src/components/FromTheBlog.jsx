import clsx from 'clsx'

import { getAllPosts  } from '@/lib/blog'
import { formatDate } from '@/lib/formatDate'
import { Card } from '@/components/Card'

function Article({ className, post }) {
  return (
    <article className={clsx(className, "m-10")}>
      <Card className="">
        <Card.Eyebrow
          as="time"
          dateTime={post.date}
          className="mt-1"
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Title href={`/blog/${post.slug}`}>
          {post.title}
        </Card.Title>
        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read Post</Card.Cta>
      </Card>
    </article>
  )
}


export async function FromTheBlog() {
  let posts = await getAllPosts()
  posts = posts.slice(0, 4)

  return (
    <div className="w-full md:grid md:grid-cols-4">
      {posts.map((post) => (
        <Article className='md:col-span-2' key={post.slug} post={post} />
      ))}
    </div>
  )
}