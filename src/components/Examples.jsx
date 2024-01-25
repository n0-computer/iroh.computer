'use client';
import Example from "@/components/Example";

const examples = [
  {
    href: '/docs/examples/ios-starter',
    name: 'iOS Starter',
    description:
      'Get up and running with iroh on iOS with this starter project.',
    tags: ["iOS", "Swift"],
    pattern: {
      y: 16,
      squares: [
        [3, 0],
        [0, 1],
      ],
    },
  },
  {
    // TODO: finish TODOs docs page, switch this href for "/docs/examples/todos"
    href: 'https://github.com/n0-computer/iroh-example-todos',
    name: 'Todos',
    description:
      'See iroh in the classic TODO app example, with a CLI & desktop GUI.',
    tags: ["data modeling", "CLI", "tauri", "desktop"],
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    // TODO: finish TODOs docs page, switch this href for "/docs/examples/todos"
    href: 'https://github.com/n0-computer/iroh-examples',
    name: 'Examples written in rust and go',
    description:
      'See how iroh can be used to write a gateway, a content tracker, and more.',
    tags: ["ipfs", "go", "gateway", "rust"],
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  }
];

export function Examples() {
  return (
    <div className="my-16 xl:max-w-none">
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2">
        {examples.map((example) => (
          <Example key={example.href} example={example} />
        ))}
      </div>
    </div>
  );
}
