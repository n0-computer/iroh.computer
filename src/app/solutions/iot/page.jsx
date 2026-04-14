import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import Link from "next/link"
import { DiscoveryDiagram } from "@/components/DiscoveryDiagram"

export const metadata = {
  title: 'Iroh for IoT & Embedded Devices',
  description: 'Connect embedded devices directly with iroh. Run on ESP32, Raspberry Pi, and Linux. No brokers, no gateways.',
}

const devices = [
  { name: "Raspberry Pi", note: "Fully supported" },
  { name: "ESP32", note: "4 MiB flash / 2 MiB RAM" },
  { name: "Linux SBCs", note: "x86_64 and ARM" },
  { name: "FreeRTOS", note: "Microcontroller-class" },
]

const comparison = [
  { feature: "Vendor-neutral hardware", iroh: true, mqtt: true, espnow: false },
  { feature: "Works over the internet", iroh: true, mqtt: true, espnow: false },
  { feature: "No server or broker required", iroh: true, mqtt: false, espnow: true },
  { feature: "Direct peer-to-peer", iroh: true, mqtt: false, espnow: true },
  { feature: "End-to-end encrypted by default", iroh: true, mqtt: false, espnow: false },
  { feature: "NAT & firewall traversal", iroh: true, mqtt: false, espnow: false },
  { feature: "Cryptographic device identity", iroh: true, mqtt: false, espnow: false },
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

export default function IoTUseCasePage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl pt-12 text-center">
            <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">IoT & Embedded</p>
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
              Connect every device, everywhere
            </h1>
            <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Run iroh on ESP32, Raspberry Pi, and Linux with the same API.
              No brokers, no gateways.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="https://docs.iroh.computer/quickstart">
                <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                  Get Started
                </Button>
              </Link>
              <Link href="https://cal.com/team/number-0/iroh-services">
                <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Discovery */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-4">
                <p className="text-irohPurple-500 font-medium mb-3 uppercase tracking-wide text-sm">Automatic Discovery</p>
                <h2 className="text-4xl font-bold mb-6">Devices find each other</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  Power on a device and it announces itself on the local network.
                  Peers connect directly over Wi-Fi, Ethernet, or Bluetooth — no
                  broker, no manual pairing, no cloud round-trip.
                </p>
              </div>
              <div className="md:col-span-8">
                <DiscoveryDiagram className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Device Support */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-bold mb-4">From microcontroller to cloud</h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-12 max-w-2xl mx-auto">
              The same API runs across the full range of hardware a connected product touches.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {devices.map((device) => (
                <div
                  key={device.name}
                  className="p-6 border border-irohGray-300 dark:border-irohGray-700 rounded-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{device.name}</h3>
                  <p className="text-sm text-irohGray-600 dark:text-irohGray-300">{device.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-irohGray-600 dark:text-irohGray-400 mt-8">
              See the full{" "}
              <Link href="https://docs.iroh.computer/compatibility" className="text-irohPurple-500 hover:underline">
                compatibility matrix
              </Link>.
            </p>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-irohPurple-500 font-medium mb-3 uppercase tracking-wide text-sm">Why iroh</p>
              <h2 className="text-4xl font-bold mb-4">iroh vs. MQTT vs. ESP-NOW</h2>
              <p className="text-lg text-irohGray-600 dark:text-irohGray-300 max-w-2xl mx-auto">
                MQTT needs a broker. ESP-NOW stops at the edge of the room.
                iroh connects devices directly, anywhere.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-irohGray-300 dark:border-irohGray-700">
                    <th className="py-4 px-4 text-left text-sm uppercase tracking-wide text-irohGray-600 dark:text-irohGray-400 font-medium"></th>
                    <th className="py-4 px-4 text-center text-sm uppercase tracking-wide text-irohPurple-500 font-bold">iroh</th>
                    <th className="py-4 px-4 text-center text-sm uppercase tracking-wide text-irohGray-600 dark:text-irohGray-400 font-medium">MQTT</th>
                    <th className="py-4 px-4 text-center text-sm uppercase tracking-wide text-irohGray-600 dark:text-irohGray-400 font-medium">ESP-NOW</th>
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
                      <td className="py-4 px-4 text-center"><Mark value={row.mqtt} /></td>
                      <td className="py-4 px-4 text-center"><Mark value={row.espnow} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ship devices that just work
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://docs.iroh.computer/quickstart">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Read the Docs
                </Button>
              </Link>
              <Link href="https://cal.com/team/number-0/iroh-services">
                <Button
                  arrow="none"
                  variant="outline"
                  className="border-irohGray-300 dark:border-irohGray-600 hover:bg-irohGray-100 dark:hover:bg-irohGray-800 px-8 py-3 bg-transparent"
                >
                  Talk to Us
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
