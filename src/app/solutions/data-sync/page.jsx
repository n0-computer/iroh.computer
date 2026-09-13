import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { Shield, Smartphone, Globe } from "lucide-react"

export const metadata = {
  title: 'Real-time Sync - Use Case | Iroh',
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
                for coordination—not as an expensive middleman for every byte.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://services.iroh.computer/signup?utm_source=website&utm_content=real-time-sync-hero">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Get Started
                  </Button>
                </Link>
                <Link href="#strada">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    See Strada&apos;s Results
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strada customer deep dive */}
        <section id="strada" className="py-20 px-6 scroll-mt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-12 lg:gap-20 items-start">
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <div className="bg-white rounded-lg border border-irohGray-200 px-5 py-3">
                    <img src="/img/user-logos/strada.png" alt="Strada" className="h-9 w-auto object-contain" />
                  </div>
                  <p className="text-irohPurple-500 font-medium uppercase tracking-wide text-sm">Customer deep dive</p>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Strada cut AWS egress by 90.7%
                </h2>
                <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-10 leading-relaxed">
                  Strada helps creative teams access and edit media on remote drives. By using iroh
                  to move large files directly between devices, Strada reduced monthly AWS internet
                  egress from 150 TB to 13.9 TB—an estimated $10,310 in monthly savings.
                </p>

                <div className="space-y-10">
                  <div>
                    <p className="text-sm text-irohGray-500 dark:text-irohGray-400 uppercase tracking-wide mb-2">The challenge</p>
                    <h3 className="text-2xl font-medium mb-3">Large media made the cloud an expensive middleman</h3>
                    <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                      In a centralized transfer architecture, every file travels up to cloud
                      infrastructure and back down to its destination. For video and other large
                      creative assets, that detour compounds quickly: more users and larger projects
                      mean proportionally more cloud egress.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-irohGray-500 dark:text-irohGray-400 uppercase tracking-wide mb-2">The approach</p>
                    <h3 className="text-2xl font-medium mb-3">Put the shortest reliable path in the data plane</h3>
                    <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                      Iroh establishes an encrypted connection between the machine holding the media
                      and the person who needs it. Transfers go direct whenever possible, with relay
                      fallback when network conditions prevent a direct path. Strada keeps the cloud
                      services it needs while removing AWS from the path of most file data.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link href="https://strada.tech" target="_blank" rel="noopener noreferrer" className="text-irohPurple-500 font-medium hover:underline">
                      Visit Strada →
                    </Link>
                    <Link href="https://docs.iroh.computer/concepts/relays" className="text-irohPurple-500 font-medium hover:underline">
                      How direct connections work →
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-irohGray-800 dark:bg-irohGray-900 text-white rounded-xl p-8 border border-irohGray-700">
                  <p className="text-sm text-irohPurple-400 uppercase tracking-wide mb-3">Monthly impact</p>
                  <p className="text-5xl md:text-6xl font-bold text-irohPurple-400 mb-2">$10,310</p>
                  <p className="text-irohGray-300 mb-8">estimated AWS egress savings</p>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-irohGray-700">
                    <div>
                      <p className="text-3xl font-bold mb-1">90.7%</p>
                      <p className="text-sm text-irohGray-400">less egress</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold mb-1">$123.7k</p>
                      <p className="text-sm text-irohGray-400">annualized</p>
                    </div>
                  </div>
                </div>

                <div className="border border-irohGray-300 dark:border-irohGray-700 rounded-xl p-6">
                  <h3 className="font-medium mb-6">AWS internet egress</h3>

                  <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm text-irohGray-600 dark:text-irohGray-300">Before iroh</span>
                      <span className="font-bold">150 TB</span>
                    </div>
                    <div className="h-3 bg-irohGray-200 dark:bg-irohGray-800 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-irohGray-500 rounded-full" />
                    </div>
                  </div>

                  <div className="mb-7">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm text-irohGray-600 dark:text-irohGray-300">With iroh</span>
                      <span className="font-bold text-irohPurple-500">13.9 TB</span>
                    </div>
                    <div className="h-3 bg-irohGray-200 dark:bg-irohGray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-irohPurple-500 rounded-full" style={{ width: '9.27%' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-irohGray-300 dark:border-irohGray-700 text-sm">
                    <div>
                      <p className="text-irohGray-500 dark:text-irohGray-400 mb-1">Before</p>
                      <p className="font-medium">$11,571.20/mo</p>
                    </div>
                    <div>
                      <p className="text-irohGray-500 dark:text-irohGray-400 mb-1">After</p>
                      <p className="font-medium">$1,261.06/mo</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-irohGray-500 dark:text-irohGray-400">
                  Estimate assumes 1 TB = 1,024 GB and standard US-region AWS internet egress
                  <a href="https://aws.amazon.com/ec2/pricing/on-demand/" target="_blank" rel="noopener noreferrer" className="text-irohPurple-500 hover:underline"> rates</a> of $0.09/GB for the first 10 TB, $0.085 for the next 40 TB, and $0.07
                  for the next 100 TB. It excludes taxes, negotiated discounts, credits, and the
                  100 GB monthly free allowance. Actual bills may vary.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* Delta Chat example */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img src="/img/user-logos/delta_chat.png" alt="Delta Chat" className="h-12 w-12 object-contain" />
                  <p className="text-irohPurple-500 font-medium uppercase tracking-wide text-sm">Customer example</p>
                </div>
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
