import Image from 'next/image'
import Link from 'next/link'

import Logo from "@/components/Logo";
import { ThemeToggle } from './ThemeToggle';
import { BlueskyIcon, DiscordIcon, GitHubIcon, MastodonIcon, TwitterIcon, YouTubeIcon } from './Footer';

const navigation = {
  build: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Github', href: 'https://github.com/n0-computer/iroh' },
  ],
  learn: [
    { name: 'Blog', href: '/blog' },
    { name: 'Examples', href: '/docs/examples' },
    { name: 'dumbpipe', href: 'https://dumbpipe.dev'},
    { name: 'sendme', href: '/sendme'},
  ],
  connect: [
    { name: 'Discord', href: 'https://iroh.computer/discord' },
    { name: 'Discussion', href: 'https://github.com/n0-computer/iroh/discussions' },
    { name: 'Twitter', href: 'https://twitter.com/iroh_n0' },
  ],
  social: [
    {
      name: 'Discord',
      href: 'https://iroh.computer/discord',
      icon: DiscordIcon,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/iroh_n0',
      icon: TwitterIcon,
    },
    {
      name: 'Bluesky',
      href: 'https://bsky.app/profile/iroh.computer',
      icon: BlueskyIcon
    },
    {
      name: 'Mastodon',
      href: 'https://mastodon.social/@n0iroh',
      icon: MastodonIcon
    },
    {
      name: 'GitHub',
      href: 'https://github.com/n0-computer',
      icon: GitHubIcon,
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@n0computer',
      icon: YouTubeIcon,
    },
  ],
}

export function FooterMarketing() {
  return (
    <footer className="bg-iroh-gray-1000" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo className="h-7" />
            <p className="text-sm leading-6 text-gray-300">
              Less net work for networks.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div />
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Build</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.build.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Learn</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.learn.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Connect</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.connect.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400 mr-auto">&copy; 2025 n0, inc.</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
