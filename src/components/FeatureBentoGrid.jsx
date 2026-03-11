import React from "react"
import Link from "next/link"

export function FeatureBentoGrid() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-10 grid gap-6 sm:mt-16 grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  Save cloud costs
                </p>
                <p className="mt-3 text-lg text-irohGray-600 dark:text-irohGray-400">
                  Direct connections bypass NATs and firewalls. <a href="https://docs.iroh.computer/iroh-services/relays" className="text-irohPurple-500 hover:underline">Relays</a> keep you connected when they can&apos;t.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
          </div>
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  Sync anything, anywhere
                </p>
                <p className="mt-3 text-lg text-irohGray-600 dark:text-irohGray-400">
                  <a href="https://docs.iroh.computer/protocols/blobs" className="text-irohPurple-500 hover:underline">Files</a>, <a href="https://docs.iroh.computer/protocols/kv-crdts" className="text-irohPurple-500 hover:underline">structured data</a>, <a href="https://docs.iroh.computer/protocols/writing-a-protocol" className="text-irohPurple-500 hover:underline">video</a>, <a href="https://docs.iroh.computer/protocols/rpc" className="text-irohPurple-500 hover:underline">RPC</a> — or write your own protocol.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
          </div>
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  E2E Encrypted, Always
                </p>
                <p className="mt-3 text-lg text-irohGray-600 dark:text-irohGray-400">
                  Every connection is <a href="https://docs.iroh.computer" className="text-irohPurple-500 hover:underline">end-to-end encrypted</a> over <a href="https://github.com/n0-computer/quinn" className="text-irohPurple-500 hover:underline">QUIC</a>.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
          </div>
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  Deploy a dedicated relay
                </p>
                <p className="mt-3 text-lg text-irohGray-600 dark:text-irohGray-400">
                  <a href="/services/hosting" className="text-irohPurple-500 hover:underline">Self-host</a> or use our managed infrastructure across multiple regions.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
          </div>
        </div>
      </div>
    </section>
  )
}
