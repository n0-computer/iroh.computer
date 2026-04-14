'use client'

import { useState } from 'react'

const PRO_BASE = 19
const INCLUDED_ENDPOINTS = 100
const INCLUDED_DPM = 10000
const ENDPOINT_RATE = 0.50
const METRICS_RATE = 1.49
const RELAY_RATE = 199

const relayOptions = [0, 1, 2, 3, 4, 5]
const peakConnectionOptions = [100, 200, 300, 500, 1000, 2000, 5000, 10000]
const avgConnectionOptions = [1, 10, 50, 100, 250, 500, 1000, 2000, 5000]
const metricsPerNodeOptions = [87, 90, 100, 110]

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
  const [relays, setRelays] = useState(1)
  const [peakConnections, setPeakConnections] = useState(500)
  const [avgConnections, setAvgConnections] = useState(100)
  const [metricsPerNode, setMetricsPerNode] = useState(87)
  const [frequency, setFrequency] = useState('1')

  const freq = frequencyOptions.find((f) => f.value === frequency)?.factor ?? 1
  const dpm = avgConnections * metricsPerNode * freq

  const extraConnections = Math.max(0, peakConnections - INCLUDED_ENDPOINTS)
  const connectionsCost = (extraConnections / 100) * ENDPOINT_RATE
  const extraDpm = Math.max(0, dpm - INCLUDED_DPM)
  const metricsCost = (extraDpm / 1000) * METRICS_RATE
  const relayCost = relays * RELAY_RATE
  const total = PRO_BASE + connectionsCost + metricsCost + relayCost

  return (
    <div className="mt-16 mb-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Estimate your monthly cost</h2>
      <p className="text-center text-irohGray-500 dark:text-irohGray-400 mb-8">
        Adjust the values to see what Pro would cost for your workload.
      </p>
      <div className="rounded-lg border border-irohGray-300 dark:border-irohGray-700 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <SelectInput
              label="Number of relays"
              description="Dedicated relay servers for your application"
              value={relays}
              onChange={setRelays}
              options={relayOptions}
            />
            <SelectInput
              label="Peak concurrent endpoints"
              description="Maximum endpoints sending metrics at the same time"
              value={peakConnections}
              onChange={setPeakConnections}
              options={peakConnectionOptions}
            />
            <SelectInput
              label="Average endpoints"
              description="Average number of connected endpoints"
              value={avgConnections}
              onChange={setAvgConnections}
              options={avgConnectionOptions}
            />
            <SelectInput
              label="Metrics per endpoint"
              description="Number of metric series each endpoint reports"
              value={metricsPerNode}
              onChange={setMetricsPerNode}
              options={metricsPerNodeOptions}
            />
            <div className="space-y-2">
              <label className="text-base font-medium text-irohGray-800 dark:text-irohGray-100">Push frequency</label>
              <p className="text-sm text-irohGray-500 dark:text-irohGray-400">
                How often each endpoint pushes metrics
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
            <p className="text-base text-irohGray-500 dark:text-irohGray-400">
              Calculated DPM:{' '}
              <span className="font-medium text-irohGray-800 dark:text-irohGray-100">
                {formatNumber(Math.round(dpm))}
              </span>
            </p>
          </div>

          {/* Cost breakdown */}
          <div className="rounded-lg border border-irohGray-300 dark:border-irohGray-700 bg-irohGray-100 dark:bg-irohGray-800 p-6">
            <h3 className="text-xl font-bold mb-6">Cost breakdown</h3>
            <div className="space-y-4 text-base">
              <div className="flex justify-between">
                <span>Pro plan base</span>
                <span className="font-medium">{formatPrice(PRO_BASE)}/mo</span>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Relays</span>
                  <span className="font-medium">{formatPrice(relayCost)}/mo</span>
                </div>
                <p className="text-sm text-irohGray-500 dark:text-irohGray-400 mt-0.5">
                  {relays} &times; ${RELAY_RATE}/each
                </p>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Connections</span>
                  <span className="font-medium">{formatPrice(connectionsCost)}/mo</span>
                </div>
                <p className={`text-sm text-irohGray-500 dark:text-irohGray-400 mt-0.5 ${extraConnections === 0 ? 'italic' : ''}`}>
                  {extraConnections === 0
                    ? 'Included in base plan'
                    : `${formatNumber(extraConnections)} extra \u00d7 $${ENDPOINT_RATE}/100`}
                </p>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Metrics DPM</span>
                  <span className="font-medium">{formatPrice(metricsCost)}/mo</span>
                </div>
                <p className={`text-sm text-irohGray-500 dark:text-irohGray-400 mt-0.5 ${extraDpm === 0 ? 'italic' : ''}`}>
                  {extraDpm === 0
                    ? 'Included in base plan'
                    : `${formatNumber(Math.round(extraDpm))} extra DPM \u00d7 $${METRICS_RATE}/1K`}
                </p>
              </div>

              <div className="border-t border-irohGray-300 dark:border-irohGray-600 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated total</span>
                  <span>{formatPrice(total)}/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
