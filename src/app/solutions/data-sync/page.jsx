import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { Shield, Smartphone, Globe } from "lucide-react"

export const metadata = {
  title: 'Real-time Sync - Use Case',
  description: 'How Strada and Delta Chat use iroh to move data directly between devices, reduce infrastructure costs, and keep applications in sync.',
}

export default function RealTimeSyncSolutionPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-black text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl pt-12 relative z-10">
            <div className="max-w-3xl">
              <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Use Case: Real-time Sync</p>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Move Data Without Moving It Through Your Cloud
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Connect devices directly for fast, encrypted sync. Keep centralized infrastructure
                for coordination, not as an expensive middleman for every byte.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://services.iroh.computer/signup?utm_source=website&utm_content=real-time-sync-hero">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strada customer story */}
        <section id="strada" className="py-20 px-6 scroll-mt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-12 lg:gap-20 items-center">
              <div>
                <div className="inline-flex bg-white rounded-lg border border-irohGray-200 px-5 py-3 mb-8">
                  <img src="/img/user-logos/strada.png" alt="Strada" className="h-9 w-auto object-contain" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Strada reduced central-server traffic by 90.7%
                </h2>
                <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                  Strada helps creative teams access and edit media on remote drives. By moving
                  large files directly between devices with iroh, Strada sent 13.9 TB through central servers in July 2026, compared with 150 TB if every byte had taken that path.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  Connections are end-to-end encrypted. Relays cannot read or store file data, and Strada runs discovery under its own domain.
                </p>
              </div>

              <aside className="space-y-6">
                <div className="rounded-xl border border-irohGray-700 bg-irohGray-800 p-8 text-white dark:bg-irohGray-900">
                  <p className="mb-3 text-sm uppercase tracking-wide text-irohPurple-400">Estimated monthly impact</p>
                  <p className="mb-2 text-5xl font-bold text-irohPurple-400 md:text-6xl">$10,310</p>
                  <p className="mb-8 text-irohGray-300">at benchmark egress rates, not Strada&apos;s actual bill</p>

                  <div className="grid grid-cols-2 gap-6 border-t border-irohGray-700 pt-6">
                    <div>
                      <p className="mb-1 text-3xl font-bold">90.7%</p>
                      <p className="text-sm text-irohGray-400">less central-server traffic</p>
                    </div>
                    <div>
                      <p className="mb-1 text-3xl font-bold">$123.7k</p>
                      <p className="text-sm text-irohGray-400">annualized</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-irohGray-300 p-6 dark:border-irohGray-700">
                  <h3 className="mb-6 font-medium">July 2026 central-server traffic</h3>

                  <div className="mb-6">
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm text-irohGray-600 dark:text-irohGray-300">If every byte crossed central servers</span>
                      <span className="font-bold">150 TB</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-irohGray-200 dark:bg-irohGray-800">
                      <div className="h-full w-full rounded-full bg-irohGray-500" />
                    </div>
                  </div>

                  <div className="mb-7">
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm text-irohGray-600 dark:text-irohGray-300">What actually did</span>
                      <span className="font-bold text-irohPurple-500">13.9 TB</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-irohGray-200 dark:bg-irohGray-800">
                      <div className="h-full rounded-full bg-irohPurple-500" style={{ width: '9.27%' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-irohGray-300 pt-5 text-sm dark:border-irohGray-700">
                    <div>
                      <p className="mb-1 text-irohGray-500 dark:text-irohGray-400">All central estimate</p>
                      <p className="font-medium">$11,571.20/mo</p>
                    </div>
                    <div>
                      <p className="mb-1 text-irohGray-500 dark:text-irohGray-400">Observed traffic estimate</p>
                      <p className="font-medium">$1,261.06/mo</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Delta Chat example */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="mb-6">
                  <img src="/img/user-logos/delta_chat.svg" alt="Delta Chat" className="h-24 w-24 object-contain" />
                </div>
                <h2 className="text-3xl font-bold mb-6">Multi-Device & P2P Apps</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Delta Chat integrated iroh for multi-device setup support, enabling seamless
                  sync across phones, tablets, and desktops. 
                </p>
                <blockquote className="border-l-4 border-irohPurple-500 pl-6">
                  <p className="text-lg italic leading-relaxed text-irohGray-700 dark:text-irohGray-200">
                    &ldquo;We regard iroh to be one of the most interesting efforts to arise out of the ashes of Web3.&rdquo;
                  </p>
                  <footer className="mt-3 text-sm text-irohGray-500 dark:text-irohGray-400">
                    <Link href="https://delta.chat/en/2024-02-15-webxdc-m3" target="_blank" rel="noopener noreferrer" className="hover:text-irohPurple-500 hover:underline">
                      Holger Krekel, Delta Chat
                    </Link>
                  </footer>
                </blockquote>
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
                      Proven NAT traversal keeps users connected even when internet access is precarious.
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

                <Link href="https://delta.chat/en/2024-11-20-webxdc-realtime" className="inline-flex items-center font-medium text-lg text-irohPurple-500 hover:underline">
                  Read more about iroh in delta chat →
                </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build Real-time Sync?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Move data directly between devices without giving up reliable connectivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://services.iroh.computer/signup?utm_source=website&utm_content=real-time-sync-cta">
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
