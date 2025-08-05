import Link from 'next/link';
import clsx from 'clsx';
import { CheckCircleIcon, EllipsisHorizontalIcon, TrophyIcon } from '@heroicons/react/20/solid';

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
          <p className="my-3 text-base text-zinc-600 dark:text-iroh-gray-400">Here&apos;s where we&apos;re headed, and progress we made against our goal to date. For more details see the <Link className='text-iroh-purple-500 underline decoration-dotted' href="/blog/road-to-1-0">iroh 1.0 roadmap post</Link>, and check past releases in the <Link className='text-iroh-purple-500 underline decoration-dotted' href="/changelog">changelog</Link></p>
          <p className='font-space tracking-tight text-zinc-800 dark:text-zinc-100'>Last Updated {formatDate(last_updated)}</p>
        </header>
        <div className='max-w-2xl mb-20'>
          <h1 className='text-3xl font-bold font-space-mono text-iroh-gray-700 mb-4'></h1>
          <p className='text-iroh-gray-500'></p>
        </div>
        {roadmap.milestones.map((milestone, i) => {
          if (milestone.version) {
            return <Release key={i} data={milestone} />
          } else if (milestone.all_done === false || milestone.all_done === true) {
            return <AllDone key={i} data={milestone} />
          } else if (milestone.ellipsis) {
            return <Ellipsis key={i} data={milestone} />
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
      'pr-5 ml-calc pt-9 pb-2 relative w-32 border-r dark:border-iroh-gray-700 text-right',
      done && 'border-iroh-purple-500 dark:border-iroh-purple-500')}>
      <div className='absolute -right-3.5 top-8 w-7 h-7 rounded-full bg-white dark:bg-iroh-gray-900'>
        {done
          ? <CheckCircleIcon className='w-7 h-7 text-iroh-purple-500' />
          : <div className='w-5 h-5 m-1 rounded-full bg-iroh-gray-600 dark:bg-iroh-gray-400' />}
      </div>
      <div>
        <h2 className='text-lg font-space font-bold tracking-tight leading-tight text-iroh-gray-400'>
        {doc
          ? <Link className='text-iroh-purple-500 cursor-pointer' href={doc}>{version}</Link>
          : version }</h2>
        {released && <p className='text-xs text-iroh-gray-400 dark:text-iroh-gray-600'>{formatDate(released, true)}</p>}
        {expected && <p className='text-xs text-iroh-gray-400 dark:text-iroh-gray-600'>{expected}</p>}
      </div>
    </div>
  )
}

function Milestone({ data }) {
  const { done, title, description, subtasks, tracking_issue, doc } = data;
  const issueNunber = tracking_issue?.split("/").slice(-1)[0]
  return (
    <div style={{ marginLeft: '7.95rem' }} className={clsx(
      'border-l relative pb-5 max-w-md dark:border-iroh-gray-700',
      done && 'border-iroh-purple-500 dark:border-iroh-purple-500'
    )}>
      <div className='absolute -left-2.5 rounded-full bg-white dark:bg-iroh-gray-900'>
        {done
          ? <CheckCircleIcon className='w-5 h-5 text-iroh-purple-500' />
          : <div className='w-3 h-3 m-1 rounded-full bg-iroh-gray-600 dark:bg-iroh-gray-400' />}
      </div>
      <div className='px-4 pb-3'>
        <h3 className='text-xl mb-1 leading-6 text-iroh-gray-600 font-space font-bold dark:text-iroh-gray-400'>{title}</h3>
        <p className='text-sm leading-5 font-space text-iroh-gray-500'>{description}</p>
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
            ? <CheckCircleIcon className='w-4 h-4 text-iroh-purple-500 inline-block' />
            : <div className='w-2.5 h-2.5 ml-0.5 rounded-full bg-iroh-gray-600 dark:bg-iroh-gray-500 inline-block' />}
          <span className='ml-2 leading-tight text-xs font-space-mono text-iroh-gray-500'>{taskName}</span>
        </li>
      ))}
    </ul>
  )
}

function Ellipsis() {
  return (
    <div style={{ marginLeft: '7.95rem' }} className='relative py-10 border-l max-w-md dark:border-iroh-gray-700'>
      <div className='absolute -left-2.5 rounded-full bg-white dark:bg-iroh-gray-900'>
        <EllipsisHorizontalIcon className='w-5 h-5 text-iroh-gray-600 dark:text-iroh-gray-400' />
      </div>
      <div className='px-4 pb-3'>
        <p className='text-sm leading-5 font-space italic text-iroh-gray-500'>future work</p>
      </div>
    </div>
  )
}

function AllDone({ data }) {
  const { title, description, link, all_done } = data;
  return (
    <div style={{ marginLeft: '7.95rem' }} className={clsx(
      'relative pb-5 max-w-md dark:border-iroh-gray-700',
      all_done && 'border-iroh-purple-500 dark:border-iroh-purple-500'
    )}>
      <div className='absolute -left-2.5 rounded-full bg-white dark:bg-iroh-gray-900'>
        <Link href={link}>
          <TrophyIcon className='w-5 h-5 text-iroh-gray-600 dark:text-iroh-gray-400' />
        </Link>
      </div>
      <div className='px-4 pb-3'>
        <h3 className='text-xl mb-1 leading-6 text-iroh-gray-600 font-space font-bold dark:text-iroh-gray-400'>{title}</h3>
        <p className='text-sm leading-5 font-space text-iroh-gray-500'>{description}</p>
      </div>
    </div>
  )
}
