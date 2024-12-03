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

    // transition from "components" to "protocols"
    // we'll likely want to use `/docs/layers` to explain the layers thing, so no redirect for the root:
    // { source: '/docs/layers', destination: '/docs/components', permanent: true, },
    { source: '/docs/components/documents', destination: '/docs/protocols/docs', permanent: true, },
    { source: '/docs/components/blobs', destination: '/docs/protocols/blobs', permanent: true, },
    { source: '/docs/components/gossip', destination: '/docs/protocols/gossip', permanent: true, },
    { source: '/docs/components/networking', destination: '/docs/protocols/net', permanent: true, },

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