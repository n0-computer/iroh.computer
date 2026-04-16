import { Button } from "@/components/Button"
import { ContactButton } from "@/components/ContactButton"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { MQTTDiagram } from "@/components/MQTTDiagram"
import { IrohPaymentDiagram } from "@/components/IrohPaymentDiagram"
import { POSFeatureTabs } from "@/components/POSFeatureTabs"


export const metadata = {
  title: 'Iroh for Payments',
  description: 'Connect payment terminals directly to point of sale systems over Bluetooth, LAN, or Wi-Fi with iroh. No servers, no brokers, no complexity.',
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
                  <ContactButton source="pos-hero" arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Talk to Us
                  </ContactButton>
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

        {/* The Problem: Local Servers */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-4">
                <p className="text-irohPurple-500 font-medium mb-3 uppercase tracking-wide text-sm">The Problem</p>
                <h2 className="text-4xl font-bold mb-6">Local servers are a liability</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-4 leading-relaxed">
                  Traditional payment architectures use an MQTT broker or local server to route
                  messages between devices. The operator machine publishes a command, the broker
                  forwards it to the POS terminal, and the result takes the same path back.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  This means extra hardware on-site, another service to maintain, and a single point
                  of failure that can take down every terminal at once.
                </p>
              </div>
              <div className="md:col-span-8">
                <MQTTDiagram className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* The Solution: No Servers */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-4">
                <p className="text-irohPurple-500 font-medium mb-3 uppercase tracking-wide text-sm">The Solution</p>
                <h2 className="text-4xl font-bold mb-6">No servers required</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-4 leading-relaxed">
                  With peer-to-peer, there is no local server required. Devices connect directly over
                  whatever network is available: <Link href="https://docs.iroh.computer/transports/bluetooth" className="text-irohPurple-500 hover:underline">Bluetooth</Link>, <Link href="https://docs.iroh.computer/connecting/local-discovery" className="text-irohPurple-500 hover:underline">LAN</Link>, 
                  or Wi-Fi. Devices on the same local network connect directly without internet.
                </p>

                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-4 leading-relaxed">
                  Additionally, servers and relays in the cloud need to hold no extra state
                  beyond authentication. This means that even if the cloud
                  service goes down, devices can continue to operate and sync
                  data.
                </p>

              </div>
              <div className="md:col-span-8">
                <IrohPaymentDiagram className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Case Study: Paycode */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-8">
                <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Case Study</p>
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
              <div className="md:col-span-4 flex items-center justify-center">
                <img
                  alt="Paycode logo"
                  src="/img/user-logos/paycode.svg"
                  width={200}
                  height={100}
                  className="object-contain max-h-20 brightness-0 dark:invert"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works — Feature Tabs */}
        <POSFeatureTabs />

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
