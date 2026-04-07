import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { LogoCloud } from '@/components/home/LogoCloud'
import { FooterMarketing } from "@/components/FooterMarketing"
import { MetricsIllustration } from "@/components/MetricsIllustration"
import { IrohEverywhere } from "@/components/IrohEverywhere"
import Link from "next/link"
import {
  EyeOff,
  Compass,
  BarChart3,
  Stethoscope,
  MessageCircle,
  Shield,
  Check,
  Minus,
  Users,
  Code2,
} from "lucide-react"

export const metadata = {
  title: 'Enterprise | Iroh',
  description: 'Defeat connection anxiety in production. Custom health metrics, network diagnostics, and direct access to the core iroh team.',
}

export default function EnterprisePage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl pt-12 text-center">
            <h1 className="text-5xl md:text-6xl mb-3 leading-tight font-bold">
              iroh enterprise
            </h1>
            <p className="text-lg text-irohGray-500 dark:text-irohGray-400 mb-6">
              For teams going to production with peer-to-peer.
            </p>
            <div className="flex gap-4 mt-8 justify-center">
              <Link href="https://cal.com/team/number-0/iroh-services">
                <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                  Chat with us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Connection Anxiety */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-6">Turn connection anxiety into confidence</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-12 leading-relaxed">
              You chose p2p, it&apos;s deployed in production. But it&apos;s been some time, and now you have two problems:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <EyeOff className="h-8 w-8 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">You&apos;re flying blind.</h3>
                <p className="text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  No dashboard. No proof connections are healthy. You find out something&apos;s wrong when a user tells you.
                </p>
              </div>
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <Compass className="h-8 w-8 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">When something breaks, blame is a maze.</h3>
                <p className="text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  Is it iroh? Your code? The user&apos;s network? Every incident is an investigation with no obvious starting point.
                </p>
              </div>
            </div>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mt-12 leading-relaxed text-center">
              This is connection anxiety. We can help.
            </p>
            <div className="text-center">
            <Link href="https://cal.com/team/number-0/iroh-services" className="inline-block mt-6">
              <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                Tell us what you&apos;re building
              </Button>
            </Link>
            </div>
          </div>
        </section>

        {/* Why Number0 */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Why Number0</h2>
            <ul className="space-y-4 text-lg text-irohGray-700 dark:text-irohGray-300">
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-irohPurple-500 flex-shrink-0 mt-0.5" />
                We wrote iroh: no translation layer between your problem and the fix
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-irohPurple-500 flex-shrink-0 mt-0.5" />
                Dual MIT/Apache licensed — no lock-in risk
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-irohPurple-500 flex-shrink-0 mt-0.5" />
                A small, senior team: you talk to engineers, not a support queue
              </li>
            </ul>
          </div>
        </section>
        {/* Two Tools */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Two tools. One cure: confidence in production.</h2>
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 space-y-6">
                <div className="p-6 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                  <BarChart3 className="h-8 w-8 text-irohPurple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Custom Health Metrics</h3>
                  <p className="text-sm font-medium text-irohPurple-500 mb-3">End the blindness.</p>
                  <p className="text-sm text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                    We help you collect key aggregated metrics to monitor performance and user experience.
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                  <Stethoscope className="h-8 w-8 text-irohPurple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Network Diagnostics</h3>
                  <p className="text-sm font-medium text-irohPurple-500 mb-3">End the blame maze.</p>
                  <p className="text-sm text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                    Know immediately whether the fault is in iroh, your integration, or the user&apos;s environment.
                  </p>
                </div>
                <Link href="https://cal.com/team/number-0/iroh-services" className="inline-block">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                    Set up monitoring
                  </Button>
                </Link>
              </div>
              <div className="md:col-span-7">
                <MetricsIllustration className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Tested Everywhere */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-bold mb-6">Tested everywhere you deploy</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-4 leading-relaxed">
                  Every commit to iroh runs through <a href="https://perf.iroh.computer" target="_blank" className="text-irohPurple-500 hover:underline">simulations and tests</a> across
                  Windows, macOS, Linux, Android, iOS, and embedded targets.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  Running on unusual hardware? Send us the device. We&apos;ll add it to our test lab
                  and make sure iroh works on your target platform.
                </p>
                <Link href="https://cal.com/team/number-0/iroh-services" className="inline-block">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                    Discuss your platform
                  </Button>
                </Link>
              </div>
              <div className="md:col-span-7">
                <IrohEverywhere />
              </div>
            </div>
          </div>
        </section>

        {/* Core Team on Speed-Dial */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-6">
              Connection anxiety thrives in silence.</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-12 leading-relaxed">
              iroh Enterprise means messaging <Link href="https://n0.computer/people/" target="_blank" rel="noopener noreferrer" className="text-irohPurple-500 hover:underline">the engineers who wrote the code</Link>.  Your dedicated Slack or Discord channel connects you directly to the Number0
              core team: the same people committing to iroh every day, triaging issues,
              and shipping features.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Users className="h-6 w-6 text-irohPurple-500 mb-3" />
                <h3 className="font-semibold mb-2">Dedicated private channel with the OSS team.</h3>
                <p className="text-sm text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  When you surface a bug or need a feature, it goes straight to the people with
                  the power and the context to act fast.
                </p>
              </div>
              <div>
                <Code2 className="h-6 w-6 text-irohPurple-500 mb-3" />
                <h3 className="font-semibold mb-2">Institutional knowledge, on demand.</h3>
                <p className="text-sm text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  Architectural decisions, edge cases, upgrade paths: the answers live in the
                  team, not a knowledge base.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Dedicated Engineer */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-4">Dedicated Engineer</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              For teams building iroh into the core of their product:
            </p>
            <ul className="space-y-3 text-irohGray-600 dark:text-irohGray-300 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-irohPurple-500 flex-shrink-0 mt-0.5" />
                Code reviews and direct collaboration on your codebase
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-irohPurple-500 flex-shrink-0 mt-0.5" />
                Custom feature development
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-irohPurple-500 flex-shrink-0 mt-0.5" />
                Source code access
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-irohPurple-500 flex-shrink-0 mt-0.5" />
                Highest-tier SLA guarantees
              </li>
            </ul>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed text-center">
              Think of it as embedding an iroh expert into your team.
            </p>
            <div className="text-center">
              <Link href="https://cal.com/team/number-0/iroh-services" className="inline-block mt-6">
                <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                  Hire a dedicated engineer
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-4">iroh is already running at scale</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-12">
              Hundreds of thousands of devices in production.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Link href="/solutions/rave" className="block p-6 rounded-lg border border-irohGray-300 dark:border-irohGray-700 hover:border-irohPurple-500 transition-colors">
                <img src="/img/user-logos/rave.png" alt="Rave logo" className="object-contain max-h-10 mb-4" />
                <p className="font-semibold mb-1">Video Streaming</p>
                <p className="text-sm text-irohGray-500 dark:text-irohGray-400">Real-time video for millions of concurrent connections.</p>
                <p className="text-sm text-irohPurple-500 mt-3">Read the case study &rarr;</p>
              </Link>
              <Link href="/solutions/nous" className="block p-6 rounded-lg border border-irohGray-300 dark:border-irohGray-700 hover:border-irohPurple-500 transition-colors">
                <img src="/img/user-logos/nous.png" alt="Nous logo" className="object-contain max-h-10 mb-4" />
                <p className="font-semibold mb-1">Distributed AI Training</p>
                <p className="text-sm text-irohGray-500 dark:text-irohGray-400">Train foundation LLMs across AWS, GCP, Azure, and self-hosted compute.</p>
                <p className="text-sm text-irohPurple-500 mt-3">Read the case study &rarr;</p>
              </Link>
              <Link href="/solutions/pos" className="block p-6 rounded-lg border border-irohGray-300 dark:border-irohGray-700 hover:border-irohPurple-500 transition-colors">
                <img src="/img/user-logos/paycode.svg" alt="Paycode logo" className="object-contain max-h-10 mb-4 brightness-0 dark:invert" />
                <p className="font-semibold mb-1">Payments &amp; Point of Sale</p>
                <p className="text-sm text-irohGray-500 dark:text-irohGray-400">Tap-to-pay at highway toll booths with no additional servers.</p>
                <p className="text-sm text-irohPurple-500 mt-3">Read the case study &rarr;</p>
              </Link>
            </div>
            <blockquote className="border-l-4 border-irohPurple-500 pl-6 py-2">
              <p className="text-lg italic text-irohGray-700 dark:text-irohGray-300 mb-2">
                &ldquo;Doubling the network speed halves our compute budget.&rdquo;
              </p>
              <cite className="text-sm text-irohGray-500 dark:text-irohGray-400 not-italic">
                — Ari Lotter, Principal Engineer, Nous Research
              </cite>
            </blockquote>
          </div>
        </section>

        {/* SLAs */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-4">SLAs that cut through the anxiety</h2>
            <p className="text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Measured from first contact. Delivered through your dedicated channel.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-irohGray-300 dark:border-irohGray-700">
                    <th className="py-3 pr-6 text-sm font-semibold text-irohGray-500 dark:text-irohGray-400">Severity</th>
                    <th className="py-3 pr-6 text-sm font-semibold text-irohGray-500 dark:text-irohGray-400 text-center">Pro</th>
                    <th className="py-3 text-sm font-semibold text-irohGray-500 dark:text-irohGray-400 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-irohGray-200 dark:border-irohGray-800">
                    <td className="py-4 pr-6">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mr-2" />
                      <span className="font-semibold">Critical</span>
                      <span className="text-irohGray-500 dark:text-irohGray-400"> — system down, no workaround</span>
                    </td>
                    <td className="py-4 text-center text-irohGray-500 dark:text-irohGray-400">Best effort</td>
                    <td className="py-4 text-center font-semibold">4 hours</td>
                  </tr>
                  <tr className="border-b border-irohGray-200 dark:border-irohGray-800">
                    <td className="py-4 pr-6">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500 mr-2" />
                      <span className="font-semibold">Standard</span>
                      <span className="text-irohGray-500 dark:text-irohGray-400"> — degraded, operations impacted</span>
                    </td>
                    <td className="py-4 text-center text-irohGray-500 dark:text-irohGray-400">Best effort</td>
                    <td className="py-4 text-center font-semibold">1 business day</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 mr-2" />
                      <span className="font-semibold">Minor</span>
                      <span className="text-irohGray-500 dark:text-irohGray-400"> — limited impact, workaround exists</span>
                    </td>
                    <td className="py-4 text-center text-irohGray-500 dark:text-irohGray-400">Best effort</td>
                    <td className="py-4 text-center font-semibold">2 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center">
              <Link href="https://cal.com/team/number-0/iroh-services" className="inline-block mt-8">
                <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                  Get SLA details
                </Button>
              </Link>
            </div>
          </div>
        </section>


        {/* Tier Comparison */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Tier comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-irohGray-300 dark:border-irohGray-700">
                    <th className="py-3 pr-6 text-sm font-semibold text-irohGray-500 dark:text-irohGray-400">Service</th>
                    <th className="py-3 pr-6 text-sm font-semibold text-irohGray-500 dark:text-irohGray-400 text-center">Pro</th>
                    <th className="py-3 pr-6 text-sm font-semibold text-irohGray-500 dark:text-irohGray-400 text-center">Enterprise</th>
                    <th className="py-3 text-sm font-semibold text-irohGray-500 dark:text-irohGray-400 text-center">Dedicated Engineer</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { feature: "Support tickets", pro: true, enterprise: true, dedicated: true },
                    { feature: "SLAs", pro: "Best effort", enterprise: true, dedicated: true },
                    { feature: "Managed relays", pro: "Pay as you go", enterprise: "Custom", dedicated: "Custom" },
                    { feature: "Dedicated private channel", pro: false, enterprise: true, dedicated: true },
                    { feature: "Custom metrics & monitoring", pro: false, enterprise: true, dedicated: true },
                    { feature: "Network diagnostics", pro: false, enterprise: true, dedicated: true },
                    { feature: "Issue & feature prioritization", pro: false, enterprise: true, dedicated: true },
                    { feature: "Early access to new features", pro: false, enterprise: true, dedicated: true },
                    { feature: "Training sessions", pro: false, enterprise: true, dedicated: true },
                    { feature: "Architectural guidance", pro: false, enterprise: true, dedicated: true },
                    { feature: "Self-hosted relay guidance", pro: false, enterprise: true, dedicated: true },
                    { feature: "Device testing", pro: false, enterprise: true, dedicated: true },
                    { feature: "Code reviews", pro: false, enterprise: false, dedicated: true },
                    { feature: "Custom feature development", pro: false, enterprise: false, dedicated: true },
                    { feature: "Source code access & collaboration", pro: false, enterprise: false, dedicated: true },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-irohGray-200 dark:border-irohGray-800">
                      <td className="py-3 pr-6">{row.feature}</td>
                      <td className="py-3 pr-6 text-center">
                        <TierCell value={row.pro} />
                      </td>
                      <td className="py-3 pr-6 text-center">
                        <TierCell value={row.enterprise} />
                      </td>
                      <td className="py-3 text-center">
                        <TierCell value={row.dedicated} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to defeat connection anxiety?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Talk to the team that wrote iroh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://cal.com/team/number-0/iroh-services">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3 text-sm font-medium cursor-pointer"
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

function TierCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="h-5 w-5 text-irohPurple-500 inline-block" />
  }
  if (value === false) {
    return <Minus className="h-5 w-5 text-irohGray-400 inline-block" />
  }
  return <span className="text-irohGray-600 dark:text-irohGray-300">{value}</span>
}
