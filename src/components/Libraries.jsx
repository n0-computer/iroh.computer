import Image from 'next/image';

import {Button} from '@/components/Button';
import {Heading} from '@/components/Heading';
import logoGo from '@/images/logos/go.svg';
import logoNode from '@/images/logos/node.svg';
import logoPython from '@/images/logos/python.svg';
import logoRuby from '@/images/logos/ruby.svg';
import logoRust from '@/images/logos/rust.svg';
import logoSwift from '@/images/logos/swift.svg';
import { Tag } from '@/components/Tag';

const libraries = [
  {
    href: 'https://github.com/n0-computer/iroh',
    name: 'Rust',
    description:
      'The core of iroh is written in rust, and can be used by directly importing iroh crates.',
    logo: logoRust,
  },
  {
    href: 'https://github.com/n0-computer/iroh-swift',
    name: 'Swift',
    description:
      'Build native iOS apps with iroh\'s swift SDK, tested with SwiftUI, works with uikit.',
    logo: logoSwift,
  },
  {
    href: 'https://github.com/n0-computer/iroh-go',
    name: 'Go',
    comingSoon: true,
    description:
      'Iroh\'s go SDK uses the rust implementation via c-bindings.',
    logo: logoGo,
  },
  {
    href: 'https://github.com/n0-computer/iroh-python',
    name: 'Python',
    comingSoon: true,
    description:
      'Iroh\'s python SDK uses the rust runtime via c-bindings, maximizing performance from the comfort of python syntax.',
    logo: logoPython,
  },
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
              <p className="mt-4">
                <Button href={library.href} variant="text" arrow="right">
                  More on GitHub
                </Button>
              </p>
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
