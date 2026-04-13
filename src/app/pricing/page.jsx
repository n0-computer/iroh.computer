import { Fragment } from 'react'
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from '@/components/FooterMarketing'
import { PricingCalculator } from '@/components/PricingCalculator'
import Link from 'next/link'
import { Check, Minus, Activity, BarChart3, Server, Headphones } from 'lucide-react'

export const metadata = {
  title: 'Pricing | Iroh',
  description: 'Plans and pricing for iroh services. Free for development, Pro for production, Enterprise for large-scale deployments.',
}

const SERVICES_URL = 'https://services.iroh.computer'
const CAL_URL = 'https://cal.com/team/number-0/iroh-services'

const plans = [
  {
    name: 'Free',
    description: 'For local development and testing.',
    price: '$0',
    period: '/month',
    href: `${SERVICES_URL}?utm_source=website&utm_content=pricing-free`,
    buttonLabel: 'Get Started',
    features: [
      'All features in Pro, limited',
      '1 day retention',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    description: 'For shipping your app to prod.',
    price: '$19',
    period: '/month',
    popular: true,
    href: `${SERVICES_URL}?utm_source=website&utm_content=pricing-pro`,
    buttonLabel: 'Free trial',
    features: [
      'Pay as you go pricing',
      '7 day retention',
      '8x5 support tickets',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large-scale deployments.',
    price: 'Contact Us',
    period: '',
    href: CAL_URL,
    buttonLabel: "Let's Chat",
    features: [
      'On-prem and multi-cloud',
      'Custom retention',
      'SLAs',
      'Support Engineer',
    ],
  },
]

const sectionIcons = {
  Platform: Activity,
  Metrics: BarChart3,
  Hosting: Server,
  Support: Headphones,
}

const featureSections = [
  {
    name: 'Platform',
    features: [
      { name: 'Collaborators', free: 'One user', pro: 'Unlimited users', enterprise: 'Unlimited users' },
      { name: 'Network Diagnostics', free: '3 reports', pro: '10 reports', proNote: 'then pay as you go', enterprise: 'Custom', enterpriseNote: 'Volume discounts' },
    ],
  },
  {
    name: 'Metrics',
    features: [
      { name: 'Data Points per Minute', free: '1K DPM', freeNote: '100 metrics \u00d7 10 endpoints', pro: '10K DPM', proNote: 'then $1.49/1K DPM', enterprise: 'Custom', enterpriseNote: 'Volume discounts' },
      { name: 'Retention', free: '1 day', pro: '7 days', enterprise: 'Custom' },
      { name: 'Concurrent Endpoints', free: '10', pro: '100', proNote: 'then $0.50/100 endpoints', enterprise: 'Custom' },
    ],
  },
  {
    name: 'Hosting',
    features: [
      { name: 'Relays', free: 'Public', freeNote: 'Multi-tenant', pro: 'Cloud', proNote: '$199/relay', enterprise: 'Custom' },
      { name: 'Connections per Relay', free: 'Variable', freeNote: 'Rate-limited', pro: '60k', enterprise: 'Custom' },
      { name: 'Multi-region', free: null, pro: true, enterprise: 'Custom' },
      { name: 'Multi-cloud', free: null, pro: null, enterprise: true },
      { name: 'Dedicated DNS', free: null, pro: null, enterprise: true },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Community (Github & Discord)', free: true, pro: true, enterprise: true },
      { name: 'SLAs', free: null, pro: null, enterprise: 'Custom' },
      { name: 'Dedicated Support Engineer', free: null, pro: null, enterprise: true },
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
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <ul className="mt-2 space-y-3 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <Check className="h-5 w-5 flex-none text-irohPurple-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
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
              <table className="w-full text-base min-w-[600px]">
                <thead>
                  <tr className="border-b border-irohGray-300 dark:border-irohGray-700">
                    <th className="pb-4 text-left" />
                    <th className="pb-4 px-6 text-center text-lg font-bold text-irohPurple-500">Free</th>
                    <th className="pb-4 px-6 text-center text-lg font-bold text-irohPurple-500">Pro</th>
                    <th className="pb-4 px-6 text-center text-lg font-bold text-irohPurple-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureSections.map((section) => {
                    const Icon = sectionIcons[section.name]
                    return (
                      <Fragment key={section.name}>
                        <tr>
                          <td className="pt-8 pb-4 pl-2 font-bold text-xl border-b-2 border-irohPurple-500/30" colSpan={4}>
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
                            <FeatureCell value={feature.free} note={feature.freeNote} />
                            <FeatureCell value={feature.pro} note={feature.proNote} />
                            <FeatureCell value={feature.enterprise} note={feature.enterpriseNote} />
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
              <a
                href={CAL_URL}
                className="text-irohPurple-500 hover:underline"
              >
                Book a meeting
              </a>
            </p>
          </div>
        </section>
      </div>

      <FooterMarketing />
    </div>
  )
}

