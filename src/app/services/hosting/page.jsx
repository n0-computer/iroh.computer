import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { RelayIllustration } from "@/components/RelayIllustration"
import Link from "next/link"
import { Globe, Server } from "lucide-react"
import { GithubIcon } from '@/components/icons/GithubIcon';


export const metadata = {
  title: 'Hosting | Iroh',
  description: 'Keep your endpoints connected. Free public relays for development, dedicated relays for production.',
}

export default function HostingPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl pt-12">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Hosting
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                By default, iroh uses publically-run infrastructure to get connected quickly and reliably.
                In production, you will want to deploy dedicated infrastructure.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://n0des.iroh.computer">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                    Get started
                  </Button>
                </Link>
                <Link href="https://docs.iroh.computer/concepts/relays" target="_blank" rel="noopener noreferrer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Read the docs
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
                <h2 className="text-3xl font-bold mb-6">Relays</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Iroh uses QUIC for fast, reliable connections between peers. When a direct connection 
                  isn&apos;t possible&mdash;due to firewalls, NAT, or network conditions&mdash;relays step in 
                  to ensure data continues flowing.
                  <br></br>

                  <Link href="https://docs.iroh.computer/concepts/relays" target="_blank" className="text-irohPurple-500 hover:underline">
                  Read more.
                  </Link> 
                </p>

                <h2 className="text-3xl font-bold mb-6">DNS</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Iroh can use standard DNS servers to publish and resolve
                  EndpointIds. This allows clients to be discoverable globally.
                  <br></br> 
                  
                  <Link href="https://docs.iroh.computer/concepts/discovery" target="_blank" className="text-irohPurple-500 hover:underline">
                  Read more.
                  </Link> 
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
              <h2 className="text-3xl font-bold mb-4">Get Started</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Public Relays */}
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <Globe className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Public Relays</h3>
                <p className="text-2xl font-bold text-irohPurple-500 mb-3">Free</p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  By default, iroh endpoints will use relays provided by <a href="https://n0.computer" className="text-irohPurple-500" target="_blank">n0 computer</a>. 
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
                  For production applications ready to scale with low latency.
                </p>
                <ul className="text-irohGray-600 dark:text-irohGray-300 space-y-2 mb-6">

                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Multi-region deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Fully managed infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Dedicated bandwidth
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span>Early access to new features 
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Uptime SLAs available
                  </li>
                </ul>
                <Link href="https://n0des.iroh.computer" className="text-irohPurple-500 hover:underline font-medium">
                  Sign up →
                </Link>
              </div>

              {/* Open Source */}
                      <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                      <GithubIcon className="h-10 w-10 text-irohPurple-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Open Source</h3>
                      <p className="text-irohGray-600 dark:text-irohGray-300 mb-6">
                        Self-host your relays for free. Forever.
                      </p>
                      <Link href="https://github.com/n0-computer/iroh/tree/main/iroh-relay" className="text-irohPurple-500 hover:underline font-medium inline-flex items-center gap-2">
                        View on GitHub  →
                      </Link>
                      </div>
                    </div>
                    </div>
                  </section>

                  {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Deploy a Relay today
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://n0des.iroh.computer">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                    Get started
                  </Button>
                </Link>
                <Link href="https://docs.iroh.computer/concepts/relays" target="_blank" rel="noopener noreferrer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Read the docs
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
