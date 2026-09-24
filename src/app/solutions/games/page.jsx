import Link from 'next/link'

import { Button } from '@/components/Button'
import { ContactButton } from '@/components/ContactButton'
import { FooterMarketing } from '@/components/FooterMarketing'
import { HeaderSparse } from '@/components/HeaderSparse'

export const metadata = {
  title: 'Games',
  description: 'Build connected games with iroh: direct, encrypted connections for multiplayer sessions and game streaming.',
}

const useCases = [
  {
    title: 'Multiplayer games',
    description:
      'Connect players directly for session traffic. Iroh handles finding a path across networks, while your game decides how to synchronize state and manage the session.',
  },
  {
    title: 'Game streaming',
    description:
      'Connect a gaming PC to a player on another device. Carry the video, audio, and controller traffic over an encrypted connection that takes a direct path when possible.',
  },
]

export default function GamesUseCasePage() {
  return (
    <div>
      <HeaderSparse />

      <main className="min-h-screen bg-irohGray-50 font-space text-irohGray-700 dark:bg-black dark:text-irohGray-100">
        <section className="border-b border-irohGray-300 px-6 py-24 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl pt-12 text-center">
            <p className="mb-4 font-medium uppercase tracking-wide text-irohPurple-500">Use Case: Games</p>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Bring players together, wherever they are
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-irohGray-600 dark:text-irohGray-300">
              Build multiplayer and game streaming experiences with direct, encrypted connections between devices. Iroh handles the networking so you can focus on the game.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://docs.iroh.computer/quickstart">
                <Button arrow="none" className="cursor-pointer bg-irohGray-800 px-6 py-2 text-sm font-medium uppercase text-irohPurple-500 hover:bg-irohGray-700">
                  Get Started
                </Button>
              </Link>
              <ContactButton source="games-hero" arrow="none" variant="outline" className="cursor-pointer border-irohGray-300 bg-transparent px-6 py-2 text-sm font-medium dark:border-irohGray-600">
                Talk to Us
              </ContactButton>
            </div>
          </div>
        </section>

        <section className="border-b border-irohGray-300 px-6 py-20 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-irohPurple-500">What you can build</p>
              <h2 className="mb-4 text-4xl font-bold">One connection layer, different kinds of play</h2>
              <p className="text-lg leading-relaxed text-irohGray-600 dark:text-irohGray-300">
                Iroh gives your game a way to connect devices across local networks and the internet.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {useCases.map((useCase) => (
                <article key={useCase.title} className="rounded-lg border border-irohGray-300 p-8 dark:border-irohGray-700">
                  <h3 className="mb-4 text-2xl font-bold">{useCase.title}</h3>
                  <p className="text-lg leading-relaxed text-irohGray-600 dark:text-irohGray-300">{useCase.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-irohGray-300 px-6 py-20 dark:border-irohGray-800">
          <div className="container mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-irohPurple-500">Why iroh</p>
            <h2 className="mb-8 text-4xl font-bold">A path between players, even across networks</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-3 text-xl font-bold">Direct when possible</h3>
                <p className="leading-relaxed text-irohGray-600 dark:text-irohGray-300">Iroh attempts a direct connection between devices, including when players are behind NATs and firewalls.</p>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-bold">Connected when it is not</h3>
                <p className="leading-relaxed text-irohGray-600 dark:text-irohGray-300">When a direct path is unavailable, a relay forwards the encrypted traffic so the session can continue.</p>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-bold">Encrypted end to end</h3>
                <p className="leading-relaxed text-irohGray-600 dark:text-irohGray-300">Connections are encrypted between devices, including when traffic passes through a relay.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-irohGray-300 px-6 py-20 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-irohPurple-500">Build with your tools</p>
            <h2 className="mb-5 text-4xl font-bold">Bring peer-to-peer connections into Godot</h2>
            <p className="mb-6 text-lg leading-relaxed text-irohGray-600 dark:text-irohGray-300">
              The community-built Godot iroh extension brings iroh connections to multiplayer projects in Godot. It is one way to try direct networking in a game without building the engine integration yourself.
            </p>
            <Link href="https://github.com/tipragot/godot-iroh" className="font-medium text-irohPurple-500 hover:underline">
              Explore Godot iroh →
            </Link>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="mb-5 text-3xl font-bold">Start building connected games</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-irohGray-600 dark:text-irohGray-300">
              Start with iroh&apos;s connection API and build the multiplayer or streaming protocol your game needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://docs.iroh.computer/quickstart">
                <Button arrow="none" className="bg-irohGray-800 px-8 py-3 text-irohPurple-500 hover:bg-irohGray-700">
                  Read the Docs
                </Button>
              </Link>
              <ContactButton source="games-footer" arrow="none" variant="outline" className="border-irohGray-300 bg-transparent px-8 py-3 dark:border-irohGray-600">
                Talk to Us
              </ContactButton>
            </div>
          </div>
        </section>

        <FooterMarketing />
      </main>
    </div>
  )
}
