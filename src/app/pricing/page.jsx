import { Fragment } from 'react'
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from '@/components/FooterMarketing'
import { PricingCalculator } from '@/components/PricingCalculator'
import { ContactTrigger } from '@/components/ContactButton'
import Link from 'next/link'
import { Check, Minus, BarChart3, Server, Headphones } from 'lucide-react'

export const metadata = {
  title: 'Pricing | Iroh',
  description: 'Plans and pricing for iroh services. Free for development, Pro for production, Enterprise for large-scale deployments.',
}

const SERVICES_URL = 'https://services.iroh.computer'

const plans = [
  {
    name: 'Community',
    description: 'Local development and testing on public infrastructure.',
    price: '$0',
    period: '/month',
    href: `${SERVICES_URL}?utm_source=website&utm_content=pricing-free`,
    buttonLabel: 'Get Started',
    features: [

      '1kb/sec rate limit',
      'Public relays only',
      '7 day metrics retention',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    description: 'Shipping your app to production on multi-tenant infrastructure.',
    price: '$19',
    period: '/month',
    popular: true,
    href: `${SERVICES_URL}?utm_source=website&utm_content=pricing-pro`,
    buttonLabel: 'Start free trial',
    features: [
      '1mb/sec rate limit',
      { label: '5,000 concurrent endpoints', note: 'then $0.003 per endpoint' },
      'Authentication',
      '30 day metrics retention',
      { label: '250GB egress', note: 'then $0.09 / GB' },
      'Email support',
    ]
  },
  {
    name: 'Dedicated',
    description: 'Scaling your network with limited interruption.',
    price: '$199',
    period: '/month',
    href: `${SERVICES_URL}?utm_source=website&utm_content=pricing-dedicated`,
    buttonLabel: 'Start free trial',
    inherits: 'Everything in Pro, plus',
    features: [
      'No rate limits',
      "Unlimited users",
      'Dedicated infrastructure',
      'Version locking',
      'Uptime SLAs available'
    ],
  },
  {
    name: 'Enterprise',
    description: 'For deployments that have unique requirements.',
    price: 'Custom',
    period: '',
    contact: true,
    buttonLabel: 'Get in touch',
    features: [
      'BYO Cloud supported',
      'Custom SLA & DPA',
      'Dedicated support engineer',
      'Extended support contracts',
      '24x7x365 premium support',
      'Private channel'
    ],
  },
]

const sectionIcons = {
  Networking: Server,
  'Endpoint Management & Observability': BarChart3,
  'Support & Compliance': Headphones,
}

const featureSections = [
  {
    name: 'Networking',
    features: [
      { name: 'Global relay network', community: true, pro: true, dedicated: true, enterprise: true },
      { name: 'Dedicated infrastructure', community: null, pro: null, dedicated: true, enterprise: true },
      { name: 'Multi-region deployment', community: null, pro: null, dedicated: true, enterprise: true },
      { name: 'Rate limits', community: '1 KB/s', pro: '1 MB/s', dedicated: 'None', enterprise: 'None' },
      { name: 'Peak concurrent endpoints', community: 'Shared', pro: '5,000', proNote: 'then $0.003 / ep', dedicated: 'Unlimited', enterprise: 'Custom' },
    ],
  },
  {
    name: 'Endpoint Management & Observability',
    features: [
      { name: 'Aggregated metrics', community: true, pro: true, dedicated: true, enterprise: true },
      { name: 'Full metrics', community: null, pro: 'Add-on', dedicated: 'Add-on', enterprise: 'Add-on' },
      { name: 'Log collection', community: null, pro: 'Add-on', dedicated: 'Add-on', enterprise: 'Add-on' },
      { name: 'Alerting', community: null, pro: 'Add-on', dedicated: 'Add-on', enterprise: 'Add-on' },
      { name: 'Network diagnostics', community: null, pro: 'Add-on', dedicated: 'Add-on', enterprise: true },
    ],
  },
  {
    name: 'Support & Compliance',
    features: [
      { name: 'Uptime SLA', community: null, pro: null, dedicated: 'Available', enterprise: true },
      { name: 'Priority support', community: null, pro: null, dedicated: true, enterprise: true },
      { name: 'Custom DPA / data residency', community: null, pro: null, dedicated: null, enterprise: true },
    ],
  },
]

function FeatureCell({ value, note }) {
  if (value === true) {
    return (
      <td className="px-6 py-4 text-center">
        <Check className="h-5 w-5 text-irohPurple-500 inline-block" />
      </td>
    )
  }
  if (value === null || value === undefined) {
    return (
      <td className="px-6 py-4 text-center">
        <Minus className="h-5 w-5 text-irohGray-400 inline-block" />
      </td>
    )
  }
  return (
    <td className="px-6 py-4 text-center">
      <div className="font-medium">{value}</div>
      {note && <p className="text-sm text-irohGray-500 dark:text-irohGray-400">{note}</p>}
    </td>
  )
}

export default function PricingPage() {
  return (
    <div>
      <HeaderSparse />

      <div className="min-h-screen transition-colors font-space bg-irohGray-50 dark:bg-irohGray-900 text-irohGray-700 dark:text-irohGray-100">
        {/* Hero */}
        <section className="py-24 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-4xl pt-12 text-center">
            <p className="text-base font-semibold leading-7 text-irohPurple-500">Plans and Pricing</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-bold leading-tight">
              Go to production with confidence.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-irohGray-600 dark:text-irohGray-300 leading-relaxed">
              Customized hosting and monitoring for iroh apps, with people that support you.
            </p>
          </div>
        </section>

        {/* Plan Cards */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-8 pb-12 rounded-lg border flex flex-col ${
                    plan.popular
                      ? 'border-irohPurple-500 shadow-lg'
                      : 'border-irohGray-300 dark:border-irohGray-700'
                  } bg-white dark:bg-irohGray-800`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-irohPurple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-irohPurple-500">{plan.name}</h2>
                  <p className="mt-2 text-sm text-irohGray-500 dark:text-irohGray-400">
                    {plan.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm font-semibold text-irohGray-500 dark:text-irohGray-400">
                        {plan.period}
                      </span>
                    )}
                  </p>
                  <div className="flex-1">
                    <div className="border-t border-irohGray-200 dark:border-irohGray-600 mt-6 pt-4" />
                    {plan.inherits && (
                      <p className="mb-3 text-sm font-semibold">{plan.inherits}</p>
                    )}
                    <ul className="mt-2 space-y-3 text-sm">
                      {plan.features.map((feature) => {
                        const label = typeof feature === 'string' ? feature : feature.label
                        const note = typeof feature === 'string' ? null : feature.note
                        return (
                          <li key={label} className="flex gap-x-3">
                            <Check className="h-5 w-5 flex-none text-irohPurple-500" />
                            <span>
                              {label}
                              {note && (
                                <span className="block text-xs text-irohGray-500 dark:text-irohGray-400">{note}</span>
                              )}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                    {plan.note && (
                      <p className="mt-4 pt-3 border-t border-irohGray-200 dark:border-irohGray-600 text-xs text-irohGray-500 dark:text-irohGray-400">
                        {plan.note}
                      </p>
                    )}
                  </div>
                  {plan.contact ? (
                    <ContactTrigger
                      source="pricing-enterprise"
                      className={`mt-8 block w-full rounded-md py-2.5 px-3 text-center text-sm font-semibold transition-colors cursor-pointer ${
                        plan.popular
                          ? 'bg-irohPurple-500 text-white hover:bg-irohPurple-400'
                          : 'border border-irohPurple-500 text-irohPurple-500 hover:bg-irohPurple-500/10'
                      }`}
                    >
                      {plan.buttonLabel}
                    </ContactTrigger>
                  ) : (
                    <Link
                      href={plan.href}
                      className={`mt-8 block rounded-md py-2.5 px-3 text-center text-sm font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-irohPurple-500 text-white hover:bg-irohPurple-400'
                          : 'border border-irohPurple-500 text-irohPurple-500 hover:bg-irohPurple-500/10'
                      }`}
                    >
                      {plan.buttonLabel}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Grid */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Compare plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-base min-w-[760px]">
                <thead>
                  <tr className="border-b border-irohGray-300 dark:border-irohGray-700">
                    <th className="pb-4 text-left" />
                    <th className="pb-4 px-6 text-center text-lg font-bold text-irohPurple-500">Community</th>
                    <th className="pb-4 px-6 text-center text-lg font-bold text-irohPurple-500">Pro</th>
                    <th className="pb-4 px-6 text-center text-lg font-bold text-irohPurple-500">Dedicated</th>
                    <th className="pb-4 px-6 text-center text-lg font-bold text-irohPurple-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureSections.map((section) => {
                    const Icon = sectionIcons[section.name]
                    return (
                      <Fragment key={section.name}>
                        <tr>
                          <td className="pt-8 pb-4 pl-2 font-bold text-xl border-b-2 border-irohPurple-500/30" colSpan={5}>
                            <span className="inline-flex items-center gap-3 text-irohPurple-500">
                              {Icon && <Icon className="h-5 w-5" />}
                              {section.name}
                            </span>
                          </td>
                        </tr>
                        {section.features.map((feature) => (
                          <tr key={feature.name} className="border-b border-dotted border-irohGray-300 dark:border-irohGray-700">
                            <td className="pl-2 pr-8 py-4 font-medium text-irohGray-600 dark:text-irohGray-300">
                              {feature.name}
                            </td>
                            <FeatureCell value={feature.community} />
                            <FeatureCell value={feature.pro} note={feature.proNote} />
                            <FeatureCell value={feature.dedicated} />
                            <FeatureCell value={feature.enterprise} />
                          </tr>
                        ))}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-20 px-6 border-b border-irohGray-300 dark:border-irohGray-800">
          <div className="container mx-auto max-w-5xl">
            <PricingCalculator />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-irohGray-600 dark:text-irohGray-300">
              Need hosting, support or development?{' '}
              <ContactTrigger source="pricing-footer" className="text-irohPurple-500 hover:underline cursor-pointer bg-transparent p-0 border-0">
                Book a meeting
              </ContactTrigger>
            </p>
          </div>
        </section>
      </div>

      <FooterMarketing />
    </div>
  )
}

