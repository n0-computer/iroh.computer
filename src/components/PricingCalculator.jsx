'use client'

import { useState } from 'react'

const SHARED_BASE = 19
const SHARED_INCLUDED_ENDPOINTS = 10000
const DEDICATED_INCLUDED_ENDPOINTS = 60000
const INCLUDED_DPM = 10000
const INCLUDED_EGRESS_GB = 100
const METRICS_PER_ENDPOINT = 87
const ENDPOINT_MONTHLY_RATE = 0.003
const METRICS_RATE = 1.49
const EGRESS_RATE = 0.09
const DEDICATED_RELAY_RATE = 199

const relayOptions = [0, 1, 2, 3, 4, 5]
const peakConnectionOptions = [1000, 5000, 10000, 25000, 50000, 100000, 250000]
const metricsEndpointOptions = [10, 100, 250, 500, 750, 1000, 5000]
const egressOptions = [50, 100, 250, 500, 1000, 2500, 5000]

const frequencyOptions = [
  { label: 'Every minute', value: '1', factor: 1 },
  { label: 'Every 5 minutes', value: '0.2', factor: 0.2 },
  { label: 'Every hour', value: '0.0167', factor: 1 / 60 },
  { label: 'Every day', value: '0.0007', factor: 1 / 1440 },
]

function formatPrice(n) {
  return `$${n.toFixed(2)}`
}

function formatNumber(n) {
  return n.toLocaleString()
}

function SelectInput({ label, description, value, onChange, options, formatOption }) {
  return (
    <div className="space-y-2">
      <label className="text-base font-medium text-irohGray-800 dark:text-irohGray-100">{label}</label>
      <p className="text-sm text-irohGray-500 dark:text-irohGray-400">{description}</p>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-40 rounded-md border border-irohGray-300 dark:border-irohGray-600 bg-white dark:bg-irohGray-800 text-irohGray-800 dark:text-irohGray-100 px-3 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {formatOption ? formatOption(opt) : formatNumber(opt)}
          </option>
        ))}
      </select>
    </div>
  )
}

export function PricingCalculator() {
  const [relays, setRelays] = useState(0)
  const [peakConnections, setPeakConnections] = useState(5000)
  const [egressGb, setEgressGb] = useState(100)
  const [metricsEndpoints, setMetricsEndpoints] = useState(100)
  const [frequency, setFrequency] = useState('1')

  const includedEndpoints = relays > 0 ? relays * DEDICATED_INCLUDED_ENDPOINTS : SHARED_INCLUDED_ENDPOINTS
  const freq = frequencyOptions.find((f) => f.value === frequency)?.factor ?? 1
  const dpm = metricsEndpoints * METRICS_PER_ENDPOINT * freq
  const extraConnections = Math.max(0, peakConnections - includedEndpoints)
  const connectionsCost = extraConnections * ENDPOINT_MONTHLY_RATE
  const extraDpm = Math.max(0, dpm - INCLUDED_DPM)
  const metricsCost = (extraDpm / 1000) * METRICS_RATE
  const extraEgress = Math.max(0, egressGb - INCLUDED_EGRESS_GB)
  const egressCost = extraEgress * EGRESS_RATE
  const relayCost = relays * DEDICATED_RELAY_RATE
  const relayTotal = SHARED_BASE + connectionsCost + egressCost + relayCost
  const monthlyTotal = relayTotal + metricsCost

  return (
    <div className="mt-16 mb-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Estimate your monthly cost</h2>
      <p className="text-center text-irohGray-500 dark:text-irohGray-400 mb-8">
        Adjust usage to estimate hosting and metrics.
      </p>
      <div className="rounded-lg border border-irohGray-300 dark:border-irohGray-700 overflow-hidden">
        <section className="p-6">
          <h3 className="text-xl font-bold mb-5">Hosting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <SelectInput
                label="Dedicated relays"
                description="One includes 60,000 endpoints"
                value={relays}
                onChange={setRelays}
                options={relayOptions}
              />
              <SelectInput
                label="Peak concurrent endpoints"
                description={
                  relays > 0
                    ? `${relays} × ${formatNumber(DEDICATED_INCLUDED_ENDPOINTS)} = ${formatNumber(includedEndpoints)} included`
                    : `${formatNumber(includedEndpoints)} included`
                }
                value={peakConnections}
                onChange={setPeakConnections}
                options={peakConnectionOptions}
              />
              <SelectInput
                label="Monthly egress"
                description="Relayed traffic in GB"
                value={egressGb}
                onChange={setEgressGb}
                options={egressOptions}
                formatOption={(opt) => `${formatNumber(opt)} GB`}
              />
            </div>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 rounded-md p-5 space-y-4 text-base">
              <div className="flex justify-between">
                <span>Pro base</span>
                <span className="font-medium">{formatPrice(SHARED_BASE)}</span>
              </div>
              <div className="flex justify-between">
                <span>Dedicated relays</span>
                <span className="font-medium">{formatPrice(relayCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Endpoint overage</span>
                <span className="font-medium">{formatPrice(connectionsCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Egress overage</span>
                <span className="font-medium">{formatPrice(egressCost)}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-irohGray-300 dark:border-irohGray-700 p-6">
          <h3 className="text-xl font-bold mb-1">Metrics</h3>
          <p className="text-sm text-irohGray-500 dark:text-irohGray-400 mb-5">Assumes 87 metrics per endpoint.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <SelectInput
                label="Reporting endpoints"
                description="Endpoints pushing metrics"
                value={metricsEndpoints}
                onChange={setMetricsEndpoints}
                options={metricsEndpointOptions}
              />
              <div className="space-y-2">
                <label className="text-base font-medium text-irohGray-800 dark:text-irohGray-100">Push frequency</label>
                <p className="text-sm text-irohGray-500 dark:text-irohGray-400">
                  Changes DPM and cost.{' '}
                  <a
                    href="https://docs.rs/iroh-services/latest/iroh_services/struct.ClientBuilder.html#method.metrics_interval"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-irohPurple-500 hover:underline"
                  >
                    Configure in Rust.
                  </a>
                </p>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-40 rounded-md border border-irohGray-300 dark:border-irohGray-600 bg-white dark:bg-irohGray-800 text-irohGray-800 dark:text-irohGray-100 px-3 py-2 text-sm"
                >
                  {frequencyOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-irohGray-100 dark:bg-irohGray-800 rounded-md p-5 space-y-4 text-base">
              <div className="flex justify-between">
                <span>Calculated DPM</span>
                <span className="font-medium">{formatNumber(Math.round(dpm))}</span>
              </div>
              <div className="flex justify-between">
                <span>Included DPM</span>
                <span className="font-medium">{formatNumber(INCLUDED_DPM)}</span>
              </div>
              <div className="flex justify-between">
                <span>DPM overage</span>
                <span className="font-medium">{formatPrice(metricsCost)}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-irohGray-300 dark:border-irohGray-700 bg-irohPurple-500/5 p-6">
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span>Hosting</span>
              <span className="font-medium">{formatPrice(relayTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Metrics</span>
              <span className="font-medium">{formatPrice(metricsCost)}</span>
            </div>
            <div className="border-t border-irohGray-300 dark:border-irohGray-600 pt-4 mt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Estimated monthly cost</span>
                <span>{formatPrice(monthlyTotal)}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
