import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

import {Button} from '@/components/Button';
import {Heading} from '@/components/Heading';
import logoKotlin from '@/images/logos/kotlin.svg';
import logoPython from '@/images/logos/python.svg';
import logoRust from '@/images/logos/rust.svg';
import logoSwift from '@/images/logos/swift.svg';
import logoNodeJs from '@/images/logos/node.svg';
import { Tag } from '@/components/Tag';

const libraries = [
  {
    name: 'Rust',
    description:
      'The core of iroh is written in rust, and can be used by directly importing iroh crates.',
    logo: logoRust,
    links: [
      { title: "docs.rs", href: "https://docs.rs/iroh", external: true },
      { title: "crates.io", href: "https://crates.io/crates/iroh", external: true },
      { title: "github", href: "https://github.com/n0-computer/iroh", external: true }
    ]
  },
  {
    name: 'node.js',
    description: 'Iroh\'s node.js SDK uses the rust runtime via c-bindings, maximizing performance from the comfort of javascript syntax.',
    logo: logoNodeJs,
    links: [
      { title: "npm", href: "https://www.npmjs.com/package/@number0/iroh", external: true },
      { title: "github", href: "https://github.com/n0-computer/iroh-ffi/tree/main/iroh-js", external: true }
    ]
  },
  {
    name: 'Python',
    description:
      'Iroh\'s python SDK uses the rust runtime via c-bindings, maximizing performance from the comfort of python syntax.',
    logo: logoPython,
    links: [
      { title: "pypi", href: "https://pypi.org/project/iroh/", external: true },
      { title: "github", href: "https://github.com/n0-computer/iroh-ffi/blob/main/README.python.md", external: true }
    ]
  },
  {
    name: 'Swift',
    description:
      'Build native iOS apps with iroh\'s swift SDK, tested with SwiftUI, works with uikit.',
    logo: logoSwift,
    links: [
      { title: "cocoapods", href: "https://cocoapods.org/pods/IrohLib", external: true },
      { title: "github", href: "https://github.com/n0-computer/iroh-ffi/blob/main/README.swift.md", external: true }
    ]
  },
  {
    name: 'Kotlin',
    description:
      'Iroh\'s go SDK uses the rust implementation via c-bindings.',
    logo: logoKotlin,
    links: [
      { title: "github", href: "https://github.com/n0-computer/iroh-ffi/blob/main/README.kotlin.md", external: true }
    ]
  }
];

export function Libraries() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="official-libraries">
        Official libraries
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
        {libraries.map((library) => (
          <div key={library.name} className="flex flex-row-reverse gap-6">
            <div className="flex-auto">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {library.name}
              </h3>
              {library.comingSoon && <div>
                  <Tag variant='medium' color='amber'>Coming Soon</Tag>
              </div>}
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {library.description}
              </p>
              {library.links && <p className="mt-4">
                {library.links.map((link,i) => (
                  <div key={i}>
                    <Button href={link.href} variant="text">
                      {link.title}
                      {link.external && <ArrowTopRightOnSquareIcon className="text-irohGray-500 hover:text-irohPurple-500 w-4 h-4 mt-1 ml-1" />}
                    </Button>
                  </div>
                ))}
              </p>}
            </div>
            <Image
              src={library.logo}
              alt=""
              className="h-12 w-12"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
