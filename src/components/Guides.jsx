import {Button} from '@/components/Button';
import {Heading} from '@/components/Heading';

const guides = [
  {
    href: '/docs/protocols/documents',
    name: 'Documents',
    description: 'Understand documents, mutable, syncable key-value stores',
  },
  {
    href: '/docs/protocols/blobs',
    name: 'Blobs',
    description:
      'Documents point to blobs: opaque bytes identified by their hash',
  },
  {
    href: '/docs/protocols/gossip',
    name: 'Gossip',
    description:
      'Broadcast messages to all nodes in a swarm',
  }
];

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Protocols
      </Heading>
      <p className="text-md text-zinc-600 dark:text-zinc-400">
        An iroh protocol is a set of rules that defines how nodes communicate with each other.
      </p>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-md font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
