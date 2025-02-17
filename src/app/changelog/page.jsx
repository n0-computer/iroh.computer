import Link from 'next/link';
import clsx from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

import { EmailSubscribe } from "@/components/EmailSubscribe"
import { BlankLayout } from '@/components/BlankLayout';
import { formatDate } from '@/lib/formatDate'
import releases from './releases.json';

export const metadata = {
  title: 'Changelog',
  description:
    'Iroh Release History',
};

export default function Component() {
  return (
    <BlankLayout>
      <h1 className="text-2xl sm:text-4xl font-space font-bold tracking-tight text-zinc-800 dark:text-zinc-100">Change Log</h1>
      <div className="mt-5 mb-20">
        <h4 className='text-lg'>Subscribe for updates</h4>
        <EmailSubscribe />
        <div className="max-w-md">
          <p>We&apos;ll send you an email with each new release of iroh &amp; and a link to the blog post. Right now iroh is releasing roughly every 3 weeks.</p>
        </div>
      </div>
      {releases.map((release, i) => <Release key={i} data={release} />)}
    </BlankLayout>
  )
}

function Release({ data }) {
  const { version, date, title, github_release, changelog, blog_post } = data;
  return (
    <div style={{ marginLeft: '7.95rem' }} className={clsx(
      'border-l relative pb-8 max-w-md dark:border-irohGray-700 border-irohPurple-500',
    )}>
      <div className='absolute -left-2.5 rounded-full bg-white dark:bg-irohGray-900'>
        <CheckCircleIcon className='w-5 h-5 text-irohPurple-500' />
      </div>
      <div className='absolute -left-24 text-right'>
        <h2 className='text-lg font-space font-bold tracking-tight leading-tight text-irohGray-400'>
          <Link className='text-irohPurple-500 cursor-pointer' href={github_release}>{version}</Link>
        </h2>
        <p className='text-xs text-irohGray-400 dark:text-irohGray-600'>{formatDate(date, true)}</p>
      </div>
      <div className='px-4 pb-3'>
        <h3 className={clsx('text-xl mb-1 leading-6 text-irohGray-600 font-space font-bold dark:text-irohGray-400', !title && "opacity-20")}>{title || "untitled"}</h3>
        {blog_post && <a href={blog_post} className='text-md underline mr-4'>blog post</a>}
        {github_release && <a href={github_release} className='text-md underline mr-4'>github</a>}
        {changelog && <a href={changelog} className='text-md underline'>changelog</a>}
      </div>
    </div>
  )
}
