import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { GlobalRelayIllustration } from "@/components/GlobalRelayIllustration"
import Link from "next/link"
import { Globe, Zap } from "lucide-react"

export const metadata = {
  title: 'Rave - Solutions | Iroh',
  description: 'How Rave uses iroh to stream video between millions of devices around the world.',
}

export default function RaveSolutionPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800 relative overflow-hidden">
          {/* Background Logo */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none">
            <img src="/img/user-logos/rave.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="container mx-auto max-w-6xl pt-12 relative z-10">
            <div className="max-w-3xl">
              <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Solution: Streaming Video</p>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Video Streaming at Global Scale
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Rave uses iroh to stream video between millions of devices around the world every day,
                with over 1 million concurrent connections per relay. They self-host these relays using
                iroh&apos;s open source software, ensuring low-latency and reliable video delivery to their users.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://n0des.iroh.computer/signup">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Get Started
                  </Button>
                </Link>
                <Link href="https://rave.io" target="_blank" rel="noopener noreferrer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Visit Rave
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">1M+</p>
                <p className="text-irohGray-600 dark:text-irohGray-300">Concurrent connections per relay</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">5</p>
                <p className="text-irohGray-600 dark:text-irohGray-300">Global relay locations</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">24/7</p>
                <p className="text-irohGray-600 dark:text-irohGray-300">Always-on streaming</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Iroh */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Why Iroh?</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Rave evaluated multiple networking stacks including libp2p and WebRTC. Iroh delivered
              the best performance, especially for handling packet loss on mobile networks.
            </p>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg mb-8">
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 italic">
                &ldquo;Media over QUIC has real legs. It works on mobile and handles packet loss so much better.&rdquo;
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Globe className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Global Reach</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    Relays in 5 countries, serving users worldwide.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Better Than WebRTC</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    QUIC handles packet loss gracefully without the CPU overhead of WebRTC&apos;s baseline.
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
              Ready to Stream at Scale?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with managed relays and monitoring through iroh services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://n0des.iroh.computer/signup">
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
