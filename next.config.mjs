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

    // transition from protocols in docs section to protocols registry
    { source: '/docs/protocols/docs', destination: '/proto/iroh-docs', permanent: true, },
    { source: '/docs/protocols/blobs', destination: '/proto/iroh-blobs', permanent: true, },
    { source: '/docs/protocols/gossip', destination: '/proto/iroh-gossip', permanent: true, },
    { source: '/docs/protocols/net', destination: '/docs/overview', permanent: true, },

    { source: '/docs/api', destination: '/docs/sdks', permanent: true, },
    { source: '/docs/api/:slug', destination: '/docs/sdks', permanent: true, },
  ]
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  redirects,
}

export default withSearch(withMDX(nextConfig))