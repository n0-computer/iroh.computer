import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { Radio, HeartHandshake, Wrench, Github, Cloud } from "lucide-react"

export const metadata = {
  title: 'Open Source - Solutions | Iroh',
  description: 'Supporting open source projects with relays, reliability, and networking infrastructure.',
}

export default function OpenSourceSolutionPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl pt-12">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Open Source, Forever
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Iroh is fully open source under MIT/Apache 2.0 licenses. 
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="mailto:hello@iroh.computer">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Contact Us
                  </Button>
                </Link>
                <Link href="https://github.com/n0-computer/iroh" target="_blank" rel="noopener noreferrer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Options */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
              <p className="text-lg text-irohGray-600 dark:text-irohGray-300 max-w-2xl mx-auto">
                Start with open source, scale with managed infrastructure when you need it.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Open Source */}
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <Github className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Open Source</h3>
                <p className="text-2xl font-bold text-irohPurple-500 mb-3">$0<span className="text-base font-normal text-irohGray-500">/forever</span></p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Self-host with full access to the source code.
                </p>
                <ul className="text-irohGray-600 dark:text-irohGray-300 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Public infrastructure with rate limits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Self-host on your own infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> GitHub &amp; Discord community support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Ideal for developers and students
                  </li>
                </ul>
                <Link href="https://github.com/n0-computer/iroh" target="_blank" rel="noopener noreferrer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    View on GitHub
                  </Button>
                </Link>
              </div>

              {/* Fully Managed Cloud */}
              <div className="p-8 rounded-lg border border-irohPurple-500 bg-irohGray-100 dark:bg-irohGray-800">
                <Cloud className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-2xl font-bold text-irohPurple-500 mb-3">Contact us<span className="text-base font-normal text-irohGray-500"></span></p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Let us handle the infrastructure so you can focus on building.
                </p>
                <ul className="text-irohGray-600 dark:text-irohGray-300 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Fully managed, single tenant or on-prem
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Dedicated support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Custom protocol development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Uptime SLAs
                  </li>
                </ul>
                <Link href="https://cal.com/team/number-0/n0-protocol-services">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                    Book a meeting
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FooterMarketing />
      </div>
    </div>
  )
}
