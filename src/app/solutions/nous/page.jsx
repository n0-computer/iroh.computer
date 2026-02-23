import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { OpenSourceIllustration } from "@/components/OpenSourceIllustration"
import Link from "next/link"
import { Server, Zap, Globe, Shield, Cpu, MessageSquare, BarChart3, Network } from "lucide-react"

export const metadata = {
  title: 'Nous Research - Use Case | Iroh',
  description: 'How Nous uses iroh to train foundation LLMs with compute distributed around the world.',
}

export default function NousUseCasePage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800 relative overflow-hidden">
          {/* Background Logo */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none">
            <img src="/img/user-logos/nous.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="container mx-auto max-w-6xl pt-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Use Case: AI/ML</p>
                <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                  Distributed AI Training at Global Scale
                </h1>
                <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                  Nous Research uses iroh to train foundation LLMs with compute distributed around the world,
                  across AWS, GCP, Azure, and self-hosted infrastructure.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="https://docs.iroh.computer/quickstart">
                    <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="https://nousresearch.com" target="_blank" rel="noopener noreferrer">
                    <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                      Visit Nous Research
                    </Button>
                  </Link>
                  <Link href="https://docs.psyche.network" target="_blank" rel="noopener noreferrer">
                    <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                      Psyche Docs
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <OpenSourceIllustration className="w-full max-w-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">10x</p>
                <p className="text-irohGray-600 dark:text-irohGray-300">Bandwidth reduction (10Gbps → 1Gbps)</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">50%</p>
                <p className="text-irohGray-600 dark:text-irohGray-300">Cost reduction ($1M → $500K models)</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">30-50</p>
                <p className="text-irohGray-600 dark:text-irohGray-300">Nodes in training runs</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">100%</p>
                <p className="text-irohGray-600 dark:text-irohGray-300">GPU & network utilization</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">The Problem: Training LLMs is Brutally Expensive</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
              The amount of data that needs to be sent between every GPU during training is intense&mdash;basically
              the entire model. Traditional approaches require building massive data centers with specialized
              high-bandwidth interconnects. There&apos;s been no way to do this without concentrated infrastructure.
            </p>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg mb-6">
              <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 italic">
                &ldquo;Doubling the network speed halves our compute budget. That&apos;s the difference between
                a $1M model and a $500K model.&rdquo;
              </p>
            </div>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
              But what if you could run distributed training over the internet? What if you could use the
              cheapest compute anywhere in the world and link them all together?
            </p>
          </div>
        </section>

        {/* The Solution: Psyche */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Solution: Psyche</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  <a href="https://github.com/psychefoundation/psyche" className="text-irohPurple-500 hover:underline">Psyche</a> is
                  Nous&apos;s distributed training framework. It brings the bandwidth requirements between each machine
                  down from 10Gbps to just 1Gbps&mdash;making internet-based distributed training viable.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Data center operators can download a binary and use iroh to connect to every other node in
                  a training run. They do training on their GPUs and communicate information through
                  <a href="https://docs.iroh.computer/proto/iroh-gossip" className="text-irohPurple-500 hover:underline"> gossip</a>,
                  transferring large amounts of data via <a href="https://docs.iroh.computer/proto/iroh-blobs" className="text-irohPurple-500 hover:underline">blobs</a>.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  The core question was simple: <strong>how do you get something to talk to something else?</strong> Iroh
                  solves this. Gossip is especially useful because Psyche is building a swarm, not just a centralized service.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Network className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Swarm Architecture</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Built as a decentralized swarm, not a centralized service. Gossip enables coordination across all nodes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Cpu className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">100% Utilization</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Most training frameworks do a train step then synchronize. Psyche&apos;s asynchronous approach
                      pegs GPUs at 100% and network connections at 100% simultaneously.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Saturated Connections</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      The use case: saturate all connections 100%. From iroh, they need reliable delivery of messages
                      and file transfer as fast as it can possibly go.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Blockchain Coordination</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      High-level coordination through blockchain integration&mdash;useful when you need to pay
                      someone and you don&apos;t know who they are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Relays Matter */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Why Relays Matter</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
              Nous runs 5 iroh relays to ensure reliable connectivity across their distributed training network.
              The key insight: <strong>when things deteriorate, they can&apos;t break</strong>.
            </p>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
              Iroh automatically establishes direct connections when possible for maximum throughput. When direct
              connections aren&apos;t possible&mdash;due to NATs, firewalls, or network conditions&mdash;traffic
              flows through relays. This fallback mechanism means training runs continue even when network
              conditions change.
            </p>
          </div>
        </section>

        {/* Managed Relays & Monitoring */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">Managed Relays & Monitoring</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  The <a href="https://n0.computer" className="text-irohPurple-500 hover:underline">n0.computer</a> team
                  hosts relays for Nous through the <a href="https://n0des.iroh.computer" className="text-irohPurple-500 hover:underline">iroh services</a> service.
                  This provides reliable relay infrastructure without Nous having to manage it themselves.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  We&apos;re also partnering with Nous to build better monitoring tools for distributed
                  training&mdash;making it easy to understand what&apos;s happening at the network level
                  during training runs.
                </p>
              </div>
              <div className="flex items-center">
                <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg">
                  <p className="text-xl text-irohGray-600 dark:text-irohGray-300 italic">
                    &ldquo;iroh does so much low-level networking for us. We don&apos;t have to learn about
                    the low-level details of QUIC. When things go wrong, we want to look at the metrics and logs
                    to understand what happened.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Connect Your Distributed Infrastructure?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with iroh in minutes. No complex configuration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://n0des.iroh.computer/signup?utm_source=website&utm_content=nous-cta">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="https://docs.iroh.computer/quickstart">
                <Button
                  arrow="none"
                  variant="outline"
                  className="border-irohGray-300 dark:border-irohGray-600 hover:bg-irohGray-100 dark:hover:bg-irohGray-800 px-8 py-3 bg-transparent"
                >
                  Read the Docs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FooterMarketing />
      </div>
    </div>
  )
}
