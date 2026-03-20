import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { Globe, Zap, Radio, Shield } from "lucide-react"

export const metadata = {
  title: 'Video Streaming with MoQ - Solutions | Iroh',
  description: 'How iroh and Media over QUIC (MoQ) are changing the game for video streaming—and how Rave uses it to reach millions of devices worldwide.',
}

export default function VideoSolutionsPage() {
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
              <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Solution: Video Streaming</p>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                A Better Way to Stream Video
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Stream video between devices, using peer to peer technology. Create encrypted connections built on open standards, across the globe or across the room.
                </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://services.iroh.computer/signup?utm_source=website&utm_content=video-hero">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Get Started
                  </Button>
                </Link>
                <Link href="https://docs.iroh.computer/protocols/streaming">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Read the docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video embed */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/GKvSE2g_Yss"
                title="What if your security camera was secure? — Iroh + MoQ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* What is MoQ */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Media over QUIC</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              <a href="https://doc.moq.dev/" target="_blank" rel="noopener noreferrer" className="text-irohPurple-500 hover:underline">MoQ</a> is
              an open standard for real-time media streaming built natively on QUIC. Unlike WebRTC,
              which layers a complex media stack on top of existing protocols, MoQ is designed from the
              ground up to take advantage of QUIC&apos;s properties: low latency, reliable stream multiplexing,
              and graceful degradation on lossy networks.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Radio className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Poll-based Streaming</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    Streams are only created when someone asks for them. Devices don&apos;t
                    encode or transmit video until a viewer connects—saving battery, bandwidth,
                    and compute.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Better Than WebRTC</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    QUIC handles packet loss gracefully without the CPU overhead of WebRTC&apos;s
                    baseline. It works especially well on mobile networks with variable connectivity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Encrypted by Default</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    Iroh creates direct encrypted connections between devices. You control
                    exactly who can see a stream—no third-party server in the middle.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Works Everywhere</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">
                    Iroh&apos;s NAT traversal finds the fastest path—direct when possible,
                    relayed when needed. The same stack runs on IoT devices, phones, browsers,
                    and servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rave Case Study */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <p className="text-irohPurple-500 font-medium mb-2 uppercase tracking-wide text-sm">Example</p>
            <h2 className="text-3xl font-bold mb-6">Rave: Video Streaming at Global Scale</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              <a href="https://rave.io" target="_blank" rel="noopener noreferrer" className="text-irohPurple-500 hover:underline">Rave</a> evaluated
              multiple networking stacks—including libp2p and WebRTC—before choosing iroh. Today they
              stream video between millions of devices every day, self-hosting iroh relays to keep
              latency low and delivery reliable.
            </p>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg mb-10">
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 italic">
                &ldquo;Media over QUIC has real legs. It works on mobile and handles packet loss so much better.&rdquo;
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold text-irohPurple-500 mb-2">600k</p>
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

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build the Future of Video?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with managed relays and monitoring through iroh services,
              or read our deep dive on iroh and MoQ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://services.iroh.computer/signup?utm_source=website&utm_content=rave-cta">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/blog/secure-video-everywhere">
                <Button
                  arrow="none"
                  variant="outline"
                  className="border-irohGray-300 dark:border-irohGray-600 hover:bg-irohGray-100 dark:hover:bg-irohGray-800 px-8 py-3 bg-transparent"
                >
                  Read the Blog Post
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
