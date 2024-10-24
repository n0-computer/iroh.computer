import { CheckCircleIcon } from '@heroicons/react/20/solid';
import roadmap from './roadmap.json';
import { BlankLayout } from '@/components/BlankLayout';

export const metadata = {
  title: 'Roadmap',
  description:
    'Sync Anywhere',
};


export default function Component() {
  return (
    <BlankLayout>
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
  const { version, done } = data;
  return (
    <div className='pr-5 ml-0.5 py-8 relative w-32 border-r text-right'>
      {done
        ? <CheckCircleIcon className='w-7 h-7 text-irohPurple-500 absolute -right-3.5 top-8' />
        : <CheckCircleIcon className='w-7 h-7 text-irohGray-200 absolute -right-3.5 top-8' />}
      <div>
        <h2 className='text-xl font-spaceMono font-bold'>{version}</h2>
      </div>
    </div>
  )
}

function Milestone({ data }) {
  const { done, title, description, subtasks, tracking_issue, doc } = data;
  const issueNunber = tracking_issue?.split("/").slice(-1)[0]
  return (
    <div className='border-l ml-32 relative pb-5 max-w-lg'>
      {done
        ? <CheckCircleIcon className='w-5 h-5 text-irohPurple-500 absolute -left-2.5 top-1' />
        : <CheckCircleIcon className='w-5 h-5 text-irohGray-200 absolute -left-2.5 top-1' />}
      <div className='px-4'>
        <h3 className='text-xl font-space font-bold'>{title}</h3>
        <p className='text-sm font-spaceMono text-irohGray-500'>{description}</p>
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
            : <CheckCircleIcon className='w-4 h-4 text-irohGray-200 inline-block' />}
          <span className='ml-2 font-spaceMono text-irohGray-500'>{taskName}</span>
        </li>
      ))}
    </ul>
  )
}