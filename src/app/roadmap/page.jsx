import Link from 'next/link';
import clsx from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

import roadmap from './roadmap.json';
import { BlankLayout } from '@/components/BlankLayout';
import { formatDate } from '@/lib/formatDate'

export const metadata = {
  title: 'Roadmap',
  description:
    'Iroh 1.0 roadmap. Here\'s where we\'re headed, and progress we made against our goal to date.',
};


export default function Component() {
  const { last_updated } = roadmap;
  return (
    <BlankLayout>
        <header className="max-w-lg px-4 sm:px-0">
          <h1 className="text-2xl sm:text-4xl font-space font-bold tracking-tight text-zinc-800 dark:text-zinc-100">iroh 1.0 roadmap</h1>
          <p className="my-3 text-base text-zinc-600 dark:text-irohGray-400">Here&apos;s where we&apos;re headed, and progress we made against our goal to date. For more details see the <Link className='text-irohPurple-500 underline decoration-dotted' href="/blog/road-to-1.0">iroh 1.0 roadmap post</Link></p>
          <p className='font-space tracking-tight text-zinc-800 dark:text-zinc-100'>Last Updated {formatDate(last_updated)}</p>
        </header>
        <div className='max-w-2xl mb-20'>
          <h1 className='text-3xl font-bold font-spaceMono text-irohGray-700 mb-4'></h1>
          <p className='text-irohGray-500'></p>
        </div>
        {roadmap.milestones.map((milestone, i) => {
          if (milestone.version) {
            return <Release key={i} data={milestone} />
          }
          return <Milestone key={i} data={milestone} />
        })}
    </BlankLayout>
  )
}

function Release({ data }) {
  const { version, done, doc, released, expected } = data;
  return (
    <div className={clsx(
      'pr-5 ml-calc pt-8 pb-2 relative w-32 border-r dark:border-irohGray-700 text-right', 
      done && 'border-irohPurple-500 dark:border-irohPurple-500')}>
      <div className='absolute -right-3.5 top-8 w-7 h-7 rounded-full bg-white dark:bg-irohGray-900'>
        {done
          ? <CheckCircleIcon className='w-7 h-7 text-irohPurple-500' />
          : <CheckCircleIcon className='w-7 h-7 text-irohGray-200 dark:text-irohGray-400' />}
      </div>
      <div>
        <h2 className='text-lg font-space font-bold tracking-tight text-irohGray-400'>
        {doc
          ? <Link className='text-irohPurple-500 cursor-pointer' href={doc}>{version}</Link>
          : version }</h2>
        {released && <p className='text-xs text-irohGray-700'>{formatDate(released, true)}</p>}
        {expected && <p className='text-xs text-irohGray-400'>ETA {expected}</p>}
      </div>
    </div>
  )
}

function Milestone({ data }) {
  const { done, title, description, subtasks, tracking_issue, doc } = data;
  const issueNunber = tracking_issue?.split("/").slice(-1)[0]
  return (
    <div style={{ marginLeft: '7.95rem' }} className={clsx(
      'border-l relative pb-5 max-w-md dark:border-irohGray-700', 
      done && 'border-irohPurple-500 dark:border-irohPurple-500'
    )}>
      <div className='absolute -left-2.5 rounded-full bg-white dark:bg-irohGray-900'>
        {done
          ? <CheckCircleIcon className='w-5 h-5 text-irohPurple-500' />
          : <CheckCircleIcon className='w-5 h-5 text-irohGray-600 dark:text-irohGray-400' />}
      </div>
      <div className='px-4 pb-3'>
        <h3 style={{ lineHeight: 0.8 }} className='text-xl text-irohGray-600 font-space font-bold dark:text-irohGray-400'>{title}</h3>
        <p className='text-sm leading tight font-space text-irohGray-500'>{description}</p>
        {tracking_issue && <a href={tracking_issue} className='text-md underline mr-4'>#{issueNunber}</a>}
        {doc && <a href={doc} className='text-md underline'>details</a>}
        <Subtasks data={subtasks} />
      </div>
    </div>
  )
}

function Subtasks({ data }) {
  if (!data) return null;

  return (
    <ul className='pl-3 mt-2'>
      {Object.keys(data).map((taskName, i) => (
        <li key={i}>
          {data[taskName]
            ? <CheckCircleIcon className='w-4 h-4 text-irohPurple-500 inline-block' />
            : <CheckCircleIcon className='w-4 h-4 text-irohGray-200 dark:text-irohGray-400 inline-block' />}
          <span className='ml-2 leading-tight text-xs font-spaceMono text-irohGray-500'>{taskName}</span>
        </li>
      ))}
    </ul>
  )
}