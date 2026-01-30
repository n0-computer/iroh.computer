import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Shield, DollarSign, Scale, ArrowRight, Cpu, FileText, Users } from "lucide-react"
import {HeaderSparse} from '@/components/HeaderSparse';
import {LogoCloud} from '@/components/home/LogoCloud';
import {UseCaseScroller} from '@/components/home/UseCases';
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { ThemeImage } from "@/components/ThemeImage"

export default function Component() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screentransition-colors font-space">
        {/* Hero Section */}
        <section className="py-24 px-6 bg-iroh-kv-2 bg-cover min-h-[70vh]">
          <div className="container mx-auto max-w-4xl pt-20">
            <div className="max-w-xl">
              <h1 className="text-6xl md:text-6xl mb-6 text-gray-900 leading-tight font-bold">
                The zero-config, works-anywhere networking stack for enterprise.
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Deliver fast, complaint, battle-tested networking into the enterprise with iroh.
              </p>
              <div className="flex gap-4">
                <Link href="https://cal.com/team/number-0/iroh-services">
                  <Button arrow="none" className="bg-gray-900 hover:bg-gray-800 px-6 py-2 text-sm font-medium cursor-pointer">
                    Chat with us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-3xl">
            <LogoCloud />
          </div>
        </section>

        {/* Edge-First Networking */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-normal mb-6 text-gray-900 dark:text-white">Edge-First Networking</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Shipping an enterprise app today means potentially deploying to multiple clouds, on-premises
                  infrastructure, employee virtual private networks, user devices, in-field IoT hardware, containerized
                  networking stacks, virtualized networking stacks—the list goes on.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Iroh makes networking at the edge easy, which in turn makes all networking easy. Every device gets a
                  public key you can dial. Iroh figures out the rest.
                </p>
              </div>
              <div>
                <ThemeImage
                  width={800}
                  height={600}
                  alt="a cluster of computers in various locations,"
                  lightSrc="/svg/enterprise_nodes_light.svg"
                  darkSrc="/svg/enterprise_nodes_dark.svg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Shield className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Compliant</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Iroh Enterprise makes all aspects of the Iroh stack hot-swappable to match compliance requirements: from encryption cypher, to transport protocols, log tuning, and beyond.
                </p>
              </div>

              <div className="space-y-4">
                <Cpu className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reliable</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  The world is embracing Rust for its memory safety. Iroh extends this into the networking stack with
                  proven reliability at scale.
                </p>
              </div>

              <div className="space-y-4">
                <DollarSign className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cost Effective</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Deliver a product that costs less by moving data across the edge instead of through the cloud.
                </p>
              </div>

              <div className="space-y-4">
                <Scale className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Proven Scale</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Iroh runs on millions of devices every day, from low-power IoT up to InfiniBand-linked datacenter racks.
                  Iroh has been tested against harsh networking conditions around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto px-16 flex">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-4xl font-normal mb-8 text-gray-900 dark:text-white">An SLA with <i className="italic">so</i> many nines</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  When servers can run on the edge, reliability goes up. As the makers of iroh, <a href="https://n0.computer" className="text-irohPurple-500">n0.computer</a> can deliver avilability backed by a contractual guarantee.
                </p>
              </div>
              <div className="relative">
                <h1 className="text-9xl text-gray-600/50">99.99</h1>
                <div className="absolute right-0 top-0 z-10 h-full w-[200px] bg-linear-to-l from-irohGray-50 dark:from-irohGray-900 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-medium mb-6 text-gray-900 dark:text-white">
                  Your Enterprise GTM Back-of-House
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We work directly with your team to deliver a seamless, compliant, and up-to-date experience for
                  each of your target verticals. As the team behind a ground-up networking stack, we have a deep well of
                  knowledge of the technical fundamentals that underpin enterprise design decisions.
                </p>
                <Link href="https://n0.computer/team">
                  <Button
                    arrow="none"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent"
                  >
                    Meet the team →
                  </Button>
                </Link>
              </div>

              <div>
                <h3 className="text-3xl font-medium mb-4 text-gray-900 dark:text-white">Tailor-Made Stacks</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Draw from a library of enterprise-focused networking protocols for authentication, data transfer,
                  encryption, streaming, broadcast, leader election, replication, and more. Iroh means composing what&apos;s
                  needed instead of building from scratch.
                </p>
                <Link href="https://github.com/n0-computer">
                  <Button
                    arrow="none"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent"
                  >
                    Browse Iroh protocols →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl px-6 flex">
            <div>
              <h2 className="text-4xl font-normal mb-8 text-gray-900 dark:text-white">Auditing that ties identity to individual connections</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Iroh drives public key infrastructure into individual connections, forming an attributable audit trail that is asserted on every packet of data sent. No more &ldquo;Hey, how did this data end up in an S3 bucket?&rdquo; You&apos;ll have an audit log that matches each PUT, with an audit log connected to a user&apos;s identity, regardless of where they are in the world.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-normal mb-6 text-gray-900 dark:text-white">
              Ready to Transform Your Enterprise Networking?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Compose what&apos;s needed instead of building from scratch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://cal.com/team/number-0/iroh-services">
                <Button
                  arrow="none"
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-3 bg-transparent"
                >
                  Chat with us
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
