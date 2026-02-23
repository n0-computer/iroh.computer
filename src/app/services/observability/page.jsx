import { Button } from "@/components/Button"
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"
import { MetricsIllustration } from "@/components/MetricsIllustration"
import Link from "next/link"
import { BarChart3, Activity, Shield } from "lucide-react"

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
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">
                Observability
              </h1>
              <p className="text-xl text-irohGray-600 dark:text-irohGray-300 mb-8 leading-relaxed">
                Monitor the health of your network with comprehensive metrics collection. Track connections, 
                latency, throughput, and custom application-specific metrics.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="https://n0des.iroh.computer?utm_source=website&utm_content=observability-hero">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                    Start 30 Day Trial
                  </Button>
                </Link>
                <Link href="https://docs.iroh.computer/iroh-services/metrics">
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
                  the web dashboard.
                </p>

                <p className="text-sm text-irohGray-600 dark:text-irohGray-400 mb-4">
                  For a list of all metrics, see the{' '}
                  <Link href="https://docs.iroh.computer/iroh-online/metrics/glossary" className="text-irohPurple-500 hover:underline">
                    metrics glossary
                  </Link>.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <MetricsIllustration className="w-full max-w-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Metrics Option */}
        <section className="py-20 px-6 border-t border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Scales with you</h2>
              <p className="text-lg text-irohGray-600 dark:text-irohGray-300 max-w-2xl mx-auto">
                Start for free, and then grow as your application needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Project Metrics */}
              <div className="p-8 rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800">
                <BarChart3 className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Project Metrics</h3>
                <p className="text-2xl font-bold text-irohPurple-500 mb-3">Free</p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Iroh aggregates metrics at the project level, to provide insights into 
                  overall network performance. This aggregated data helps in understanding trends and 
                  patterns without exposing individual endpoint details.
                </p>
                <ul className="text-irohGray-600 dark:text-irohGray-300 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Network-wide insights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> No setup required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Connections, latency, and throughput
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Custom metrics support
                  </li>
                </ul>
                    <Link href="https://n0des.iroh.computer?utm_source=website&utm_content=observability-project"className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 font-medium">
                    Sign up →
                </Link>
              </div>

              {/* Granular Metrics */}
              <div className="p-8 rounded-lg border border-irohPurple-500 bg-irohGray-100 dark:bg-irohGray-800">
                <Activity className="h-10 w-10 text-irohPurple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Granular Metrics</h3>
                <p className="text-2xl font-bold text-irohPurple-500 mb-3">$19<span className="text-base font-normal text-irohGray-500">/month and up</span></p>
                <p className="text-irohGray-600 dark:text-irohGray-300 mb-4">
                  Detailed metrics are available for each relay or endpoint added to the
                  network. These metrics are available at a more granular level, so
                  you can drill down into specific behaviors to better 
                  understand performance issues.
                </p>
                <ul className="text-irohGray-600 dark:text-irohGray-300 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Per-relay and per-endpoint analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Direct Data Rate, Error Reports, and more
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Drill down into specific behaviors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-irohPurple-500">✓</span> Extended data retention plans available
                  </li>
                </ul>
                                <Link href="https://n0des.iroh.computer?utm_source=website&utm_content=observability-granular">
                  <Button arrow="none" className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-6 py-2 text-sm font-medium cursor-pointer">
                    Start 30 Day Trial
                  </Button>
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
                        begin sending metrics to the platform.
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
                        Every 10 seconds, the platform will aggregate key project-level metrics 
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
              <Link href="https://n0des.iroh.computer?utm_source=website&utm_content=observability-cta">
                <Button
                  arrow="none"
                  className="bg-irohGray-800 hover:bg-irohGray-700 text-irohPurple-500 px-8 py-3"
                >
                  Start 30 Day Trial
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
