import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { Radio, HeartHandshake, Wrench } from "lucide-react"

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
              <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Solution: Open Source</p>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Open Source, Built for Open Source
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Iroh is fully open source under MIT/Apache 2.0 licenses. We believe open source 
                projects deserve open source tools. If your project needs help with relays, 
                reliability, or networking infrastructure, we want to hear from you.
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

        {/* What We Offer */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">How We Help</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Iroh&apos;s code is open source and always will be. Open source projects often 
                  need reliable networking but lack the resources to build and maintain infrastructure. 
                  We provide relay access, engineering support, and help with integration so you can 
                  focus on what matters most&mdash;your project.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  Whether you&apos;re building a resilient application, need reliable connectivity
                  for distributed systems, or want to improve the resilience of your existing
                  networking stack, reach out and tell us about your project.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Radio className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Relay Access</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Free public relays for development and testing, with options to self-host or use managed relays for production.{' '}
                      <Link href="/features/relays" className="text-irohPurple-500 hover:underline">Learn more →</Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Wrench className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Reliability Support</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Engineering guidance on connection management, error handling, and building systems that stay up.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HeartHandshake className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Integration Help</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Hands-on support integrating iroh into your project, from architecture advice to code review.
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
              Tell Us About Your Project
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              We&apos;re looking to support projects that push the boundaries of open source networking. Get in touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:hello@iroh.computer">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Contact Us
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
