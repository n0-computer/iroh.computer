import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from "@/components/FooterMarketing"

export const metadata = {
  title: 'Legal | Iroh',
  description: 'Privacy policy and terms of service for Iroh and Iroh Services.',
}

export default function LegalPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl pt-12">
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight font-bold">Legal</h1>
            <p className="text-xl text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
              Privacy policy and terms of service for Iroh and Iroh Services.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Privacy Policy</h2>

            <div className="prose dark:prose-invert max-w-none text-irohGray-600 dark:text-irohGray-300 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Data Collection</h3>
                <p className="leading-relaxed">
                  Iroh Services collects aggregated metrics about network performance. This includes
                  connection counts, latency measurements, throughput statistics, and error rates.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">How We Use Data</h3>
                <p className="leading-relaxed">
                  Collected metrics are used solely to provide and improve the observability features of networks. 
                  Data is never sold to third parties and is not used for advertising purposes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Data Retention</h3>
                <p className="leading-relaxed">
                  Aggregated metrics are retained for the duration of your subscription. 
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Third-Party Services</h3>
                <p className="leading-relaxed">
                  We use Plausible Analytics for website analytics. Plausible does not use cookies and does not
                  collect personal data. We do not use any other third-party analytics or tracking services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Contact</h3>
                <p className="leading-relaxed">
                  For privacy-related questions, contact us at{' '}
                  <a href="mailto:hello@n0.computer" className="text-irohPurple-500 hover:underline">
                    hello@n0.computer
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms of Service */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Terms of Service</h2>

            <div className="prose dark:prose-invert max-w-none text-irohGray-600 dark:text-irohGray-300 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Acceptance</h3>
                <p className="leading-relaxed">
                  By using Iroh Services, you agree to these terms. If you do not agree, do not use the service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Use of Service</h3>
                <p className="leading-relaxed">
                  Iroh Services is provided for lawful use only. You may not use the service to transmit illegal
                  content, conduct denial-of-service attacks, or otherwise harm other users or the network.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Service Availability</h3>
                <p className="leading-relaxed">
                  We aim for high availability but do not guarantee uninterrupted service. Planned maintenance
                  will be communicated in advance where possible.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Limitation of Liability</h3>
                <p className="leading-relaxed">
                  Iroh Services is provided "as is." Number Zero is not liable for any damages arising from
                  use of the service, including loss of data or business interruption.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Changes to Terms</h3>
                <p className="leading-relaxed">
                  We may update these terms from time to time. Continued use of the service after changes
                  constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-irohGray-800 dark:text-irohGray-100 mb-3">Contact</h3>
                <p className="leading-relaxed">
                  Questions about these terms? Reach us at{' '}
                  <a href="mailto:hello@n0.computer" className="text-irohPurple-500 hover:underline">
                    hello@n0.computer
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterMarketing />
    </div>
  )
}
