import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { Shield, Smartphone, Globe } from "lucide-react"

export const metadata = {
  title: 'Delta Chat - Solutions | Iroh',
  description: 'How Delta Chat uses iroh for multi-device sync and P2P web apps.',
}

export default function DeltaChatSolutionPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl pt-12">
            <div className="max-w-3xl">
              <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Solution: Resilient Apps</p>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Resilient Messaging & P2P Web Apps
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Delta Chat uses iroh for multi-device setup and realtime P2P communication,
                powering in-chat apps for hundreds of thousands of devices around the world.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://n0des.iroh.computer/signup">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Get Started
                  </Button>
                </Link>
                <Link href="https://delta.chat" target="_blank" rel="noopener noreferrer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Visit Delta Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Iroh */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">Multi-Device & P2P Apps</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Delta Chat integrated iroh for multi-device setup support, enabling seamless
                  sync across phones, tablets, and desktops. They&apos;re also building experimental
                  support for <a href="https://webxdc.org" className="text-irohPurple-500 hover:underline">webxdc</a> apps
                  to use realtime P2P communication.
                </p>
                <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg">
                  <p className="text-xl text-irohGray-600 dark:text-irohGray-300 italic">
                    &ldquo;We regard iroh to be one of the most interesting efforts to arise out of the ashes of Web3.&rdquo;
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Smartphone className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Multi-Device Sync</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Iroh powers device-to-device sync without requiring centralized servers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Works Everywhere</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Proven holepunching keeps users connected even when internet access is precarious.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">P2P Web Apps</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      webxdc apps use simple send/receive APIs while iroh handles the networking underneath.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build Resilient Apps?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with iroh and build apps that work everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://n0des.iroh.computer/signup">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Sign Up for iroh-online
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
