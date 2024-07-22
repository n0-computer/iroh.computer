import Link from 'next/link';

import { GithubIcon } from '@/components/icons/GithubIcon';

export default function GithubStars(props) {
  return (
    <Link href="https://github.com/n0-computer/iroh" className='p-2 -mt-2 flex text-sm leading-5 fill-zinc-400 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-600 dark:hover:fill-zinc-600 hover:bg-black/10 rounded'>
      <GithubIcon className="h-5 w-5" />
      <span className='ml-2 mt-0'>2.2k</span>
    </Link>
  )
}
