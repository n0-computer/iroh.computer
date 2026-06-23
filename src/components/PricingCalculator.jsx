'use client'

import { useState } from 'react'

const PRO_BASE = 19
const INCLUDED_CONNECTIONS = 5000
const PER_ENDPOINT_RATE = 0.003
const MANAGED_RATE = 1
const RELAY_RATE = 199
const RELAY_CAPACITY = 60000

const relayOptions = [0, 1, 2, 3, 4, 5]
const peakConnectionOptions = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000]
const managedEndpointOptions = [0, 10, 50, 100, 500, 1000]

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
  const [peakConnections, setPeakConnections] = useState(500)
  const [managedEndpoints, setManagedEndpoints] = useState(0)

  const includedEndpoints = relays > 0 ? relays * RELAY_CAPACITY : INCLUDED_CONNECTIONS
  const extraConnections = Math.max(0, peakConnections - includedEndpoints)
  const connectionsCost = extraConnections * PER_ENDPOINT_RATE
  const managedCost = managedEndpoints * MANAGED_RATE
  const relayCost = relays * RELAY_RATE
  const total = PRO_BASE + connectionsCost + managedCost + relayCost

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
              description="Start multitenant; add dedicated relays as you scale"
              value={relays}
              onChange={setRelays}
              options={relayOptions}
              formatOption={(n) => (n === 0 ? 'Multitenant' : `${n} dedicated relay${n === 1 ? '' : 's'}`)}
            />
            <SelectInput
              label="Peak concurrent endpoints"
              description="Maximum endpoints connected at the same time"
              value={peakConnections}
              onChange={setPeakConnections}
              options={peakConnectionOptions}
            />
            <SelectInput
              label="Number of managed endpoints"
              description="Endpoints with full metrics & remote control — $1/mo each"
              value={managedEndpoints}
              onChange={setManagedEndpoints}
              options={managedEndpointOptions}
            />
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
                  {relays === 0 ? 'Multitenant (included)' : `${relays} × $${RELAY_RATE}/each`}
                </p>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Endpoints</span>
                  <span className="font-medium">{formatPrice(connectionsCost)}/mo</span>
                </div>
                <p className={`text-sm text-irohGray-500 dark:text-irohGray-400 mt-0.5 ${extraConnections === 0 ? 'italic' : ''}`}>
                  {extraConnections === 0
                    ? `${formatNumber(includedEndpoints)} included`
                    : `${formatNumber(extraConnections)} extra × $${PER_ENDPOINT_RATE}/endpoint`}
                </p>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Managed endpoints</span>
                  <span className="font-medium">{formatPrice(managedCost)}/mo</span>
                </div>
                <p className={`text-sm text-irohGray-500 dark:text-irohGray-400 mt-0.5 ${managedEndpoints === 0 ? 'italic' : ''}`}>
                  {managedEndpoints === 0
                    ? 'None selected'
                    : `${formatNumber(managedEndpoints)} × $${MANAGED_RATE}/mo`}
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
