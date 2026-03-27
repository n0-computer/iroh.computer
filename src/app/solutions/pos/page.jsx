import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { Shield, Zap, Lock, Radio, ArrowRightLeft, ServerOff } from "lucide-react"
import { PaycodePCIDiagram } from "@/components/PaycodePCIDiagram"


export const metadata = {
  title: 'PCI-Compliant Peer-to-Peer Payments | Iroh',
  description: 'Use iroh to connect payment terminals directly to point of sale systems with full PCI compliance. No servers, no brokers, no complexity.',
}

export default function PaycodeUseCasePage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl pt-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Payments / Point of Sale</p>
                <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                 Payments & Point of Sale
                </h1>
                <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                  Connect payment terminals directly to point of sale systems over
                  Bluetooth, LAN, or Wi-Fi with iroh.
                  No additional servers, no cloud dependency.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="https://docs.iroh.computer/quickstart">
                    <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="https://cal.com/team/number-0/iroh-services">
                    <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                      Talk to Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <video
                  src="/img/pos-demo.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why P2P for Payments */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Peer-to-Peer for Payments</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <ServerOff className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">No Servers Required</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    Eliminate broker servers, VPNs, and cloud dependencies.
                    Devices connect directly, reducing infrastructure cost and points of failure.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Lock className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">End-to-End Encrypted</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    All connections are encrypted by default using open standards. Card data stays on the
                    payment terminal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Radio className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Works Offline</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    iroh works over <Link href="https://docs.iroh.computer/transports/bluetooth" className="text-irohPurple-500 hover:underline">Bluetooth</Link>, <Link href="https://docs.iroh.computer/connecting/local-discovery" className="text-irohPurple-500 hover:underline">LAN</Link>, and Wi-Fi&mdash;devices
                    on the same local network connect directly without internet.
                    When connectivity returns, iroh reconnects automatically.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ArrowRightLeft className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Cross-Platform</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    iroh runs on <Link href="https://docs.iroh.computer/compatibility" className="text-irohPurple-500 hover:underline">Android, iOS, Windows, Linux, and embedded devices</Link>.
                    Connect any POS device to any terminal regardless of platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Low Latency</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    Direct connections mean no round-trip to a cloud server. Payment
                    commands execute in milliseconds, not seconds.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Resilient by Default</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    No single point of failure. If one connection path goes down, iroh
                    automatically finds another&mdash;direct, local network, or <Link href="https://docs.iroh.computer/concepts/relays" className="text-irohPurple-500 hover:underline">fallback over the internet via relays</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        {/* PCI Architecture Diagram */}
        <section className="py-16 px-6  dark:border-irohGray-800">
          <div className="container mx-auto max-w-5xl">
            <PaycodePCIDiagram />
          </div>
        </section>

        {/* Compliance by Design */}
        <section className="py-20 px-6 ">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Compliance by Design</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed max-w-4xl mx-auto">
              PCI-compliant payment systems require that raw payment data never flows through
              anything other than the official compliant software. Traditional architectures solve
              this with servers and VPNs, adding cost, complexity, and single points of failure.
            </p>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              iroh takes a different approach. Peer-to-peer connections act as a <strong>blind command
              and control channel</strong> between devices over Bluetooth, LAN, or Wi-Fi. Raw payment
              data never leaves the payment terminal. Only encrypted payloads and commands travel
              through the iroh channel. Compliance is maintained by architecture.
            </p>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  The iroh channel is transparent to payment data&mdash;it only routes encrypted
                  payloads. Even as connectivity changes, compliance and security boundaries remain intact.
                </p>
              </div>
            </div>
          </div>
        </section>

        </section>

        {/* Case Study: Paycode */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Case Study</p>
            <img
              alt="Paycode logo"
              src="/img/user-logos/paycode.svg"
              width={200}
              height={100}
              className="object-contain max-h-12 mb-6 brightness-0 dark:invert"
            />
            <h2 className="text-3xl font-bold mb-6">Highway Toll Booths</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
              Paycode used iroh to bring tap-to-pay to highway toll booths running Windows 7
              hardware. They connected Kotlin Android POS devices to .NET 6 terminals with no
              additional servers.
            </p>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg mb-6">
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 italic">
                &ldquo;iroh was super easy to use&hellip; I started hacking and was able to integrate
                it into our Kotlin PoS app and have a published .NET NuGet package for our client
                to use in that month.&rdquo;
              </p>
            </div>
            <Link href="/blog/paycode" className="text-irohPurple-500 font-medium text-lg hover:underline">
              Read the full case study &rarr;
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Build Payment Systems Without Servers
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with iroh in minutes. Connect devices,
              maintain compliance, and reduce complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://services.iroh.computer/signup?utm_source=website&utm_content=paycode-cta">
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
