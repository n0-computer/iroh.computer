import React from "react"
import Link from "next/link"

export function FeatureBentoGrid() {
  return (
    <section className="max-w-6xl mx-auto border-l border-r border-irohGray-300 dark:border-irohGray-800 py-16 px-4">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="mx-auto mt-2 max-w-2xl text-balance text-center text-4xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100 sm:text-5xl">
          Fast, reliable, and efficient connections
        </p>
        <div className="mt-10 grid gap-6 sm:mt-16 grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="mt-2 text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  Save cloud costs worldwide
                </p>
                <p className="mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400">
                  Bypass NATs and firewalls to secure direct connections between
                  devices when possible using{" "}
                  <a
                    href="https://docs.iroh.computer"
                    className="text-irohPurple-500 hover:underline"
                  >
                    iroh
                  </a>
                  , a modular networking stack in Rust.
                   When a direct connection
                  isn't possible,{" "}
                  <a
                    href="https://docs.iroh.computer/iroh-online/relays"
                    className="text-irohPurple-500 hover:underline"
                  >
                    relays
                  </a>{" "}
                  keep your app running smoothly.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
          </div>
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="mt-2 text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  Sync anything, anywhere
                </p>
                <p className="mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400">
                  Build APIs that are flexible and modular. Supports{" "}
                  <a
                    href="https://docs.iroh.computer/protocols/blobs"
                    className="text-irohPurple-500 hover:underline"
                  >
                    files
                  </a>
                  ,{" "}
                  <a
                    href="https://docs.iroh.computer/protocols/kv-crdts"
                    className="text-irohPurple-500 hover:underline"
                  >
                    structured data
                  </a>
                  ,{" "}
                  <a
                    href="https://docs.iroh.computer/protocols/writing-a-protocol"
                    className="text-irohPurple-500 hover:underline"
                  >
                    video streaming
                  </a>
                  , and{" "}
                  <a
                    href="https://docs.iroh.computer/protocols/rpc"
                    className="text-irohPurple-500 hover:underline"
                  >
                    RPC
                  </a>{" "}
                  between cloud and edge &mdash; or{" "}
                  <a
                    href="https://docs.iroh.computer/protocols/writing-a-protocol"
                    className="text-irohPurple-500 hover:underline"
                  >
                    write your own protocol
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
          </div>
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="mt-2 text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  E2E Encrypted, Always
                </p>
                <p className="mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400">
                  All connections are{" "}
                  <a
                    href="https://docs.iroh.computer"
                    className="text-irohPurple-500 hover:underline"
                  >
                    end-to-end encrypted
                  </a>
                  , with an access control layer that builds up from public keys
                  over{" "}
                  <a
                    href="https://github.com/n0-computer/quinn"
                    className="text-irohPurple-500 hover:underline"
                  >
                    QUIC connections
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
          </div>
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-irohPurple-500/10 to-irohGray-100 dark:to-irohGray-800 border border-irohPurple-500/20" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
                <p className="mt-2 text-3xl font-bold tracking-tight text-irohGray-900 dark:text-irohGray-100">
                  Deploy a dedicated relay
                </p>
                <p className="mt-4 text-xl font-medium text-irohGray-600 dark:text-irohGray-400">
                  Run your own{" "}
                  <a
                    href="https://n0des.iroh.computer"
                    className="text-irohPurple-500 hover:underline"
                  >
                    relay server
                  </a>{" "}
                  for guaranteed availability and lower latency. Self-host anywhere or use our managed relay infrastructure across multiple regions.
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
