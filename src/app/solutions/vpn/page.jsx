import { Button } from "@/components/Button"
import { ContactButton } from "@/components/ContactButton"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { ConnectDevicesIllustration } from "@/components/ConnectDevicesIllustration"
import Link from "next/link"
import { KeyRound, Wifi, Shield, Package } from "lucide-react"

export const metadata = {
  title: 'Iroh as a VPN Alternative',
  description: 'How teams use iroh in place of Tailscale, WireGuard, and reverse SSH tunnels to reach devices directly.',
}

const comparison = [
  { feature: "Embeds directly in your app", iroh: true, other: false },
  { feature: "No separate client to install", iroh: true, other: false },
  { feature: "NAT & firewall traversal", iroh: true, other: true },
  { feature: "End-to-end encrypted by default", iroh: true, other: true },
  { feature: "Whole-device network overlay", iroh: false, other: true },
]

const builtWithIroh = [
  {
    name: "TunTun",
    description: "Open-source mesh networking. Connect your machines into a private network, wherever they are.",
    href: "https://github.com/orielhaim/TunTun",
  },
  {
    name: "Pigeons",
    description: "SSH to any machine without an IP address, behind a NAT or firewall, without port forwarding or VPN setup.",
    href: "https://github.com/n0-computer/pigeons",
  },
  {
    name: "Rayfish",
    description: "Your own private network. No servers, no setup.",
    href: "https://rayfish.xyz/",
  },
]

function Mark({ value, accent = false }) {
  if (value) {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-label="yes"
        className={`mx-auto h-6 w-6 ${accent ? "text-irohPurple-500" : "text-irohGray-500 dark:text-irohGray-400"}`}
      >
        <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-label="no"
      className="mx-auto h-5 w-5 text-irohGray-400 dark:text-irohGray-600"
    >
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function VPNUseCasePage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-black text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl pt-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Use Case: Networking</p>
                <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                  Reach Any Device, No VPN Required
                </h1>
                <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                  Teams are replacing Tailscale, WireGuard, and reverse SSH tunnels with iroh&mdash;dial
                  a device&apos;s public key and get a direct, encrypted connection. No coordination
                  server to run, no ports to open.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="https://docs.iroh.computer/quickstart">
                    <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                      Get Started
                    </Button>
                  </Link>
                  <ContactButton source="vpn-hero" arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Talk to Us
                  </ContactButton>
                </div>
              </div>
              <div className="flex justify-center">
                <ConnectDevicesIllustration className="w-full max-w-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-irohPurple-500 font-medium mb-3 uppercase tracking-wide text-sm">Why iroh</p>
              <h2 className="text-4xl font-bold">iroh vs. Tailscale & WireGuard</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-irohGray-300 dark:border-irohGray-700">
                    <th className="py-4 px-4 text-left text-sm uppercase tracking-wide text-irohGray-600 dark:text-irohGray-400 font-medium"></th>
                    <th className="py-4 px-4 text-center text-sm uppercase tracking-wide text-irohPurple-500 font-bold">iroh</th>
                    <th className="py-4 px-4 text-center text-sm uppercase tracking-wide text-irohGray-600 dark:text-irohGray-400 font-medium">Tailscale / WireGuard</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-irohGray-200 dark:border-irohGray-800"
                    >
                      <td className="py-4 px-4 font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center"><Mark value={row.iroh} accent /></td>
                      <td className="py-4 px-4 text-center"><Mark value={row.other} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-irohGray-600 dark:text-irohGray-400 mt-6 text-center">
              Iroh connects your app&apos;s own devices directly&mdash;it&apos;s not a general-purpose
              replacement for joining a whole network of unrelated machines.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">The Problem: VPNs Are Infrastructure You Didn&apos;t Want to Own</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
              Reaching a device that isn&apos;t sitting on the public internet usually means standing up
              a VPN: a coordination server to run and secure, client software to distribute, and firewall
              rules to get right. Or it means reverse SSH tunnels and all the operational shenanigans
              that come with them.
            </p>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 p-6 rounded-lg mb-6">
              <p className="text-xl font-medium text-irohGray-800 dark:text-irohGray-100 italic">
                &ldquo;It&apos;s Tailscale, but as a library. Instead of standing up VPN
                infrastructure&mdash;coordination servers, client software, all the network
                shenanigans&mdash;we dial a device&apos;s public key directly from inside our own app
                and get a direct, encrypted connection.&rdquo;
              </p>
            </div>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
              But what if your app could just dial the other device directly&mdash;no separate network
              to join, no client to install, no infrastructure to babysit?
            </p>
          </div>
        </section>

        {/* The Solution */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Solution: Dial Keys, Not IPs</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  Every iroh node has a public key as its address. To reach a device, you dial that key
                  directly from inside your own application&mdash;there&apos;s no separate VPN client for
                  your users to install, and no central network your traffic has to join.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <KeyRound className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Dial Keys, Not IPs</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Every node has a cryptographic identity. Connect to a device by its public key, wherever it is.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Wifi className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Direct Connections</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Iroh punches through NATs and firewalls automatically to connect devices directly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Encrypted by Default</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Every connection is end-to-end encrypted, so your platform can&apos;t see or modify traffic between devices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Package className="h-8 w-8 text-irohPurple-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">A Library, Not a Client</h3>
                    <p className="text-irohGray-600 dark:text-irohGray-300">
                      Iroh ships inside your app, so the connection is just part of your product&mdash;not a separate piece of software your users manage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built With Iroh */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-irohPurple-500 font-medium mb-3 uppercase tracking-wide text-sm">Built With Iroh</p>
              <h2 className="text-4xl font-bold">Open Source VPN Solutions</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {builtWithIroh.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  className="block p-6 rounded-lg border border-irohGray-300 dark:border-irohGray-700 hover:border-irohPurple-500 transition-colors"
                >
                  <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                  <p className="text-irohGray-600 dark:text-irohGray-300">{project.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Skip the VPN Infrastructure?
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with iroh in minutes. No complex configuration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://services.iroh.computer/signup?utm_source=website&utm_content=vpn-cta">
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
