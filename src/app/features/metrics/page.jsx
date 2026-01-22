import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { MetricsIllustration } from "@/components/MetricsIllustration"
import Link from "next/link"
import { BarChart3, Activity, Shield, Gauge } from "lucide-react"

export const metadata = {
  title: 'Metrics | Iroh',
  description: 'Monitor your network with comprehensive metrics collection. Track connections, latency, throughput, and custom application metrics.',
}

export default function MetricsPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl pt-12">
            <div className="max-w-3xl">
              <p className="text-irohPurple-500 font-medium mb-4 uppercase tracking-wide">Product</p>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Metrics
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Monitor your network with comprehensive metrics collection. Track connections, 
                latency, throughput, and custom application-specific metrics.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://n0des.iroh.computer">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer uppercase">
                    Get Started
                  </Button>
                </Link>
                <Link href="https://docs.iroh.computer">
                  <Button arrow="none" variant="outline" className="border-irohGray-300 dark:border-irohGray-600 px-6 py-2 text-sm font-medium cursor-pointer bg-transparent">
                    Read the Docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  When you add endpoints to your network, various metrics are collected to help improve 
                  performance and user experience. By monitoring these metrics, you can identify bottlenecks 
                  and areas for improvement in your application.
                </p>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
                  All endpoints added to your network can have these metrics collected and reported to 
                  the Iroh Online project dashboard.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <MetricsIllustration className="w-full max-w-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Built-in Metrics */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Built-in Metrics</h2>
              <p className="text-lg text-irohGray-600 dark:text-irohGray-300 max-w-2xl mx-auto">
                Create behavioral aggregations to monitor the health of your software.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Project-level */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-irohPurple-500" />
                  Project-level Metrics
                  <span className="text-xs bg-irohPurple-500 text-white px-2 py-1 rounded">Free</span>
                </h3>
                <ul className="space-y-4">
                  <li className="p-4 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                    <p className="font-medium mb-1">Connections</p>
                    <p className="text-sm text-irohGray-600 dark:text-irohGray-400">
                      The number of successful and active connections made through the relay servers.
                    </p>
                  </li>
                  <li className="p-4 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                    <p className="font-medium mb-1">Latency</p>
                    <p className="text-sm text-irohGray-600 dark:text-irohGray-400">
                      The time it takes for a request to travel from one endpoint to another.
                    </p>
                  </li>
                  <li className="p-4 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                    <p className="font-medium mb-1">Throughput</p>
                    <p className="text-sm text-irohGray-600 dark:text-irohGray-400">
                      The amount of data processed by the relay server in a given time period.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Relay-level */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-irohPurple-500" />
                  Relay-level Metrics
                  <span className="text-xs bg-irohGray-600 text-white px-2 py-1 rounded">Pro</span>
                </h3>
                <ul className="space-y-4">

                  <li className="p-4 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                    <p className="font-medium mb-1">Holepunching Rate</p>
                    <p className="text-sm text-irohGray-600 dark:text-irohGray-400">
                      The success rate of holepunching attempts made by the relay server.
                    </p>
                  </li>
                  <li className="p-4 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                    <p className="font-medium mb-1">Uptime</p>
                    <p className="text-sm text-irohGray-600 dark:text-irohGray-400">
                      The amount of time the relay server is operational and available to handle requests.
                    </p>
                  </li>
                   <li className="p-4 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                    <p className="font-medium mb-1">Error reporting</p>
                    <p className="text-sm text-irohGray-600 dark:text-irohGray-400">
                        Information about any UPnP probes or NAT traversal failures that occur.
                    </p>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-irohGray-600 dark:text-irohGray-400">
                  For a list of all metrics, see the{' '}
                  <Link href="https://docs.iroh.computer/iroh-online/metrics/glossary" className="text-irohPurple-500 hover:underline">
                    metrics glossary
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Types */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Project Metrics */}
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <BarChart3 className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Project Metrics</h3>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Some metrics are aggregated at the project level, to provide insights into 
                  overall network performance. This aggregated data helps in understanding trends and 
                  patterns without exposing individual endpoint details.
                </p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  You can also define and collect custom metrics specific to your application&apos;s needs. 
                  This allows you to monitor application-specific events and performance indicators.
                </p>
                <Link href="https://docs.iroh.computer/iroh-online/metrics/custom" className="text-irohPurple-500 hover:underline font-medium">
                  Read more about custom metrics →
                </Link>
              </div>

              {/* Endpoint Metrics */}
              <div className="p-8 rounded-lg border border-irohPurple-500 bg-irohGray-100 dark:bg-irohGray-800">
                <Activity className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Endpoint Metrics</h3>
                <p className="text-sm text-irohPurple-500 font-medium mb-3">Pro</p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Detailed metrics are available for each endpoint added to the
                  network. These metrics are available at the endpoint level, so
                  you can drill down into specific behaviors to better 
                  understand performance issues.
                </p>
                <Link href="https://docs.iroh.computer/iroh-online/metrics/endpoint" className="text-irohPurple-500 hover:underline font-medium">
                  Read more about endpoint metrics →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">How it Works</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-irohPurple-500 text-white flex items-center justify-center font-bold">1</span>
                    <div>
                      <p className="text-irohGray-600 dark:text-irohGray-300">
                        Once an iroh endpoint is integrated in your Rust program, add an <code className="text-irohPurple-500">iroh_n0des::Client</code> to 
                        begin sending metrics to the Iroh Online platform.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-irohPurple-500 text-white flex items-center justify-center font-bold">2</span>
                    <div>
                      <p className="text-irohGray-600 dark:text-irohGray-300">
                        The client will automatically detect any running iroh instance and begin sending 
                        metrics as long as the secret and SSH key match your project setup.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-irohPurple-500 text-white flex items-center justify-center font-bold">3</span>
                    <div>
                      <p className="text-irohGray-600 dark:text-irohGray-300">
                        Call <code className="text-irohPurple-500">endpoint.online().await</code> before creating the Client. 
                        The endpoint must be online before the client is instantiated to authenticate to the platform.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-irohPurple-500 text-white flex items-center justify-center font-bold">4</span>
                    <div>
                      <p className="text-irohGray-600 dark:text-irohGray-300">
                        Once authenticated, endpoints will start sending granular-level data about their 
                        behavior and connection status.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-irohPurple-500 text-white flex items-center justify-center font-bold">5</span>
                    <div>
                      <p className="text-irohGray-600 dark:text-irohGray-300">
                        Every 10 seconds, the Iroh Online platform will aggregate key project-level metrics 
                        which are visible in the project dashboard.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="p-6 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-800 dark:bg-irohGray-900">
                <pre className="text-sm text-irohGray-300 overflow-x-auto">
                  <code>{`use iroh::Endpoint;
use iroh_n0des::Client;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let endpoint = Endpoint::builder().bind().await?;
    endpoint.online().await;
    
    let client = Client::new(&endpoint, "YOUR_API_KEY").await?;
    
    // Report a custom metric
    client.metric("document_written", 1).await?;
    
    Ok(())
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Shield className="h-12 w-12 text-irohPurple-500 mb-4" />
                <h2 className="text-3xl font-bold mb-6">Privacy</h2>
                <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-6 leading-relaxed">
                  All metrics collected are anonymized and aggregated to ensure user privacy. 
                  No personally identifiable information (PII) is collected or stored. The focus 
                  is on overall network performance rather than individual user behavior.
                </p>
                <p className="text-irohGray-600 dark:text-irohGray-300">
                  If you have concerns about data collection, please refer to the{' '}
                  <Link href="/legal" className="text-irohPurple-500 hover:underline">
                    privacy policy
                  </Link>.
                </p>
              </div>
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <h3 className="text-xl font-bold mb-4">Metrics Retention</h3>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Project-level metrics are retained based on your events plan. Please refer to the{' '}
                  <Link href="https://n0des.iroh.computer" className="text-irohPurple-500 hover:underline">
                    pricing page
                  </Link>{' '}
                  for more details on plan features and benefits.
                </p>
                <p className="text-irohGray-600 dark:text-irohGray-300">
                  Endpoint level metrics are only available on Pro and Enterprise. For projects on these plans, 
                  the amount of endpoint-level raw data retained is calculated on your purchased metrics package.{' '}
                  <Link href="mailto:hello@iroh.computer" className="text-irohPurple-500 hover:underline">
                    Contact us
                  </Link>{' '}
                  if you need custom support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Start Monitoring Your Network
            </h2>
            <p className="text-lg text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
              Get started with free project-level metrics, or upgrade to Pro for detailed endpoint analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://n0des.iroh.computer">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="https://docs.iroh.computer">
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
