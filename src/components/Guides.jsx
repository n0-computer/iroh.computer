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
  },
  {
    href: '/docs/protocols/net',
    name: 'Networking',
    description:
      'At the core of iroh is the ability to connect to any online node with only a Peer identifier',
  },
];

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Components
      </Heading>
      <p className="text-md text-zinc-600 dark:text-zinc-400">
      Iroh has four mix-and-match protocols: Documents, Blobs, Gossip, & Networking
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
