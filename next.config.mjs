import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

const redirects = async () => {
  return [
    // LETS GO DISCORD WAHOO
    { source: '/discord', destination: 'https://discord.gg/DpmJgtU7cW', basePath: false, permanent: false, },

    // Redirect all /docs pages to new docs site at docs.iroh.computer
    // Main docs pages
    { source: '/docs', destination: 'https://docs.iroh.computer', permanent: true },
    { source: '/docs/what-is-iroh', destination: 'https://docs.iroh.computer/what-is-iroh', permanent: true },
    { source: '/docs/quickstart', destination: 'https://docs.iroh.computer/quickstart', permanent: true },

    // Getting Started - What is pages
    { source: '/docs/overview', destination: 'https://docs.iroh.computer/what-is-iroh', permanent: true },

    // Examples
    { source: '/docs/examples', destination: 'https://docs.iroh.computer/examples/examples', permanent: true },
    { source: '/docs/examples/examples', destination: 'https://docs.iroh.computer/examples/examples', permanent: true },
    { source: '/docs/examples/chat', destination: 'https://docs.iroh.computer/examples/chat', permanent: true },
    { source: '/docs/examples/todos', destination: 'https://docs.iroh.computer/examples/examples', permanent: true },
    { source: '/docs/examples/gossip-chat', destination: 'https://docs.iroh.computer/examples/chat', permanent: true },

    // Concepts
    { source: '/docs/concepts', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/concepts/endpoints', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/concepts/endpoint', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/concepts/endpoint-addr', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/concepts/tickets', destination: 'https://docs.iroh.computer/concepts/tickets', permanent: true },
    { source: '/docs/concepts/discovery', destination: 'https://docs.iroh.computer/concepts/discovery', permanent: true },
    { source: '/docs/concepts/relays', destination: 'https://docs.iroh.computer/concepts/relays', permanent: true },
    { source: '/docs/concepts/relay', destination: 'https://docs.iroh.computer/concepts/relays', permanent: true },
    { source: '/docs/concepts/holepunching', destination: 'https://docs.iroh.computer/concepts/holepunching', permanent: true },
    { source: '/docs/concepts/protocols', destination: 'https://docs.iroh.computer/concepts/protocols', permanent: true },
    { source: '/docs/concepts/protocol', destination: 'https://docs.iroh.computer/concepts/protocols', permanent: true },
    { source: '/docs/concepts/router', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },

    // Protocols/Building your App
    { source: '/docs/protocols/kv-crdts', destination: 'https://docs.iroh.computer/protocols/kv-crdts', permanent: true },
    { source: '/docs/protocols/blobs', destination: 'https://docs.iroh.computer/protocols/blobs', permanent: true },
    { source: '/docs/protocols/rpc', destination: 'https://docs.iroh.computer/protocols/rpc', permanent: true },
    { source: '/docs/protocols/automerge', destination: 'https://docs.iroh.computer/protocols/automerge', permanent: true },
    { source: '/docs/protocols/streaming', destination: 'https://docs.iroh.computer/protocols/streaming', permanent: true },
    { source: '/docs/protocols/writing', destination: 'https://docs.iroh.computer/protocols/writing-a-protocol', permanent: true },
    { source: '/docs/protocols/docs', destination: 'https://docs.iroh.computer/protocols/kv-crdts', permanent: true },
    { source: '/docs/protocols/gossip', destination: 'https://docs.iroh.computer/connecting/gossip', permanent: true },
    { source: '/docs/protocols/net', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/protocols/net/holepunching', destination: 'https://docs.iroh.computer/concepts/holepunching', permanent: true },

    // WASM Browser Support (was at root level in old docs)
    { source: '/docs/wasm-browser-support', destination: 'https://docs.iroh.computer/deployment/wasm-browser-support', permanent: true },

    // About
    { source: '/docs/about/changelog', destination: 'https://docs.iroh.computer/about/changelog', permanent: true },
    { source: '/docs/about/roadmap', destination: 'https://docs.iroh.computer/about/roadmap', permanent: true },
    { source: '/docs/about/faq', destination: 'https://docs.iroh.computer/about/faq', permanent: true },
    { source: '/docs/faq', destination: 'https://docs.iroh.computer/about/faq', permanent: true },

    // Tour pages (redirect to appropriate concept pages)
    { source: '/docs/tour', destination: 'https://docs.iroh.computer/what-is-iroh', permanent: true },
    { source: '/docs/tour/1-endpoints', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/tour/2-relays', destination: 'https://docs.iroh.computer/concepts/relays', permanent: true },
    { source: '/docs/tour/3-discovery', destination: 'https://docs.iroh.computer/concepts/discovery', permanent: true },
    { source: '/docs/tour/4-protocols', destination: 'https://docs.iroh.computer/concepts/protocols', permanent: true },
    { source: '/docs/tour/5-routers', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/tour/6-conclusion', destination: 'https://docs.iroh.computer/what-is-iroh', permanent: true },

    // Reference pages
    { source: '/docs/reference/glossary', destination: 'https://docs.iroh.computer/about/faq', permanent: true },

    // Overview and other misc pages
    { source: '/docs/overview', destination: 'https://docs.iroh.computer/what-is-iroh', permanent: true },
    { source: '/docs/ipfs', destination: 'https://docs.iroh.computer/what-is-iroh', permanent: true },

    // API and SDK redirects
    { source: '/docs/api', destination: 'https://docs.iroh.computer', permanent: true },
    { source: '/docs/api/:slug', destination: 'https://docs.iroh.computer', permanent: true },
    { source: '/docs/sdks', destination: 'https://docs.iroh.computer', permanent: true },

    // Install page redirect
    { source: '/docs/install', destination: 'https://docs.iroh.computer', permanent: true },

    // Legacy redirects (keeping for backwards compatibility)
    { source: '/docs/components/networking', destination: 'https://docs.iroh.computer/what-is-iroh', permanent: true },
    { source: '/docs/components/net', destination: 'https://docs.iroh.computer/concepts/endpoints', permanent: true },
    { source: '/docs/layers/blobs', destination: 'https://docs.iroh.computer/protocols/blobs', permanent: true },
    { source: '/docs/layers/gossip', destination: 'https://docs.iroh.computer/connecting/gossip', permanent: true },
    { source: '/docs/layers/documents', destination: 'https://docs.iroh.computer/protocols/kv-crdts', permanent: true },

    // Proto/Protocol Registry redirects
    { source: '/proto/iroh-blobs', destination: 'https://docs.iroh.computer/protocols/blobs', permanent: true },
    { source: '/proto/iroh-gossip', destination: 'https://docs.iroh.computer/connecting/gossip', permanent: true },
    { source: '/proto/iroh-docs', destination: 'https://docs.iroh.computer/protocols/kv-crdts', permanent: true },

    // Catch-all for any other /docs paths
    { source: '/docs/:path*', destination: 'https://docs.iroh.computer/', permanent: true },
  ]
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  redirects,
}

export default withSearch(withMDX(nextConfig))