import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { RelayIllustration } from "@/components/RelayIllustration"
import Link from "next/link"
import { Globe, Server } from "lucide-react"

export const metadata = {
  title: 'Relays | Iroh',
  description: 'Keep your users connected with iroh relays. Free public relays for development, dedicated relays for production.',
}

export default function RelaysPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl pt-12">
            <div className="max-w-3xl">
              <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Product</p>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Relays
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Relays keep your users connected when direct peer-to-peer connections aren&apos;t possible. 
                Choose from free public relays for development or dedicated relays for production.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://docs.iroh.computer/concepts/relays">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Read the Docs
                  </Button>
                </Link>
                <Link href="https://github.com/n0-computer/iroh/tree/main/iroh-relay" target="_blank" rel="noopener noreferrer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Open Source
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How Relays Work */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">How Relays Work</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Iroh uses QUIC for fast, reliable connections between peers. When a direct connection 
                  isn&apos;t possible&mdash;due to firewalls, NAT, or network conditions&mdash;relays step in 
                  to ensure your users stay connected.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  Relay code is fully open source. You can run your own relay server, use a hosting provider, 
                  or take advantage of the public relays provided by the n0 team.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <RelayIllustration className="w-full max-w-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Relay Options */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Relay Option</h2>
              <p className="text-lg text-irohGray-600 dark:text-irohGray-300 max-w-2xl mx-auto">
                Whether you&apos;re just getting started or running production workloads, 
                there&apos;s a relay option that fits your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Public Relays */}
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <Globe className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Public Relays</h3>
                <p className="text-2xl font-bold text-irohPurple-500 mb-3">Free</p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Iroh comes configured with public relays provided by the n0 team that are free to use. 
                  Traffic is rate-limited to prevent abuse and ensure availability for everyone.
                </p>
                <ul className="text-irohGray-600 dark:text-irohGray-300 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Free to use
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> No setup required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Great for development &amp; testing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohGray-400">–</span> Rate-limited traffic
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohGray-400">–</span> No uptime guarantees
                  </li>
                </ul>
                <Link href="https://docs.iroh.computer/concepts/relays" className="text-irohPurple-500 hover:underline font-medium">
                  Learn about relays →
                </Link>
              </div>

              {/* Dedicated Relays */}
              <div className="p-8 rounded-lg border border-irohPurple-500 bg-irohGray-100 dark:bg-irohGray-800">
                <Server className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Dedicated Relays</h3>
                <p className="text-2xl font-bold text-irohPurple-500 mb-3">$199<span className="text-base font-normal text-irohGray-500">/month</span></p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  For production use, dedicated relays&mdash;either self-hosted or as a managed service&mdash;provide 
                  better performance, security, and uptime guarantees.
                </p>
                <ul className="text-irohGray-600 dark:text-irohGray-300 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Better performance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Uptime guarantees
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Enhanced security
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Self-host or managed service
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Relay code is open source
                  </li>
                </ul>
                <Link href="https://n0des.iroh.computer" className="text-irohPurple-500 hover:underline font-medium">
                  Sign up →
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Start with the public relays for free, or explore dedicated options for production workloads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://docs.iroh.computer/iroh-online/quickstart">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/n0-computer/iroh/tree/main/iroh-relay">
                <Button
                  arrow="none"
                  variant="outline"
                  className="border-irohGray-300 dark:border-irohGray-600 hover:bg-irohGray-100 dark:hover:bg-irohGray-800 px-8 py-3 bg-transparent"
                >
                    Open Source
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
