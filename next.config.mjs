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
    
    // removed old SDK landing pages due to lack of use, redirect to SDK page
    { source: '/docs/sdks/python', destination: '/docs/sdks', permanent: false },
    { source: '/docs/sdks/swift', destination: '/docs/sdks', permanent: false },
    { source: '/docs/sdks/rust', destination: '/docs/sdks', permanent: false },

    // api section used to be called "commands" 
    { source: '/docs/commands', destination: '/docs/api', permanent: true },
    { source: '/docs/commands/author-list', destination: '/docs/api/author-list', permanent: true },
    { source: '/docs/commands/author-new', destination: '/docs/api/author-new', permanent: true },
    { source: '/docs/commands/author-switch', destination: '/docs/api/author-switch', permanent: true },
    { source: '/docs/commands/blob-add', destination: '/docs/api/blob-add', permanent: true },
    { source: '/docs/commands/blob-list-blobs', destination: '/docs/api/blob-list-blobs', permanent: true },
    { source: '/docs/commands/blob-list-collections', destination: '/docs/api/blob-list-collections', permanent: true },
    { source: '/docs/commands/blob-list-incomplete-blobs', destination: '/docs/api/blob-list-incomplete-blobs', permanent: true },
    { source: '/docs/commands/blob-share', destination: '/docs/api/blob-share', permanent: true },
    { source: '/docs/commands/blob-validate', destination: '/docs/api/blob-validate', permanent: true },
    { source: '/docs/commands/doc-get', destination: '/docs/api/doc-get', permanent: true },
    { source: '/docs/commands/doc-join', destination: '/docs/api/doc-join', permanent: true },
    { source: '/docs/commands/doc-keys', destination: '/docs/api/doc-keys', permanent: true },
    { source: '/docs/commands/doc-list', destination: '/docs/api/doc-list', permanent: true },
    { source: '/docs/commands/doc-new', destination: '/docs/api/doc-new', permanent: true },
    { source: '/docs/commands/doc-set', destination: '/docs/api/doc-set', permanent: true },
    { source: '/docs/commands/doc-share', destination: '/docs/api/doc-share', permanent: true },
    { source: '/docs/commands/doc-switch', destination: '/docs/api/doc-switch', permanent: true },

    // old design section
    { source: '/design', destination: '/docs/overview', permanent: true, },
    { source: '/design/content-addressing', destination: '/docs/layers/blobs', permanent: true, },
    { source: '/design/data-transfer', destination: '/docs/layers/blobs', permanent: true, },
    { source: '/design/dsht', destination: '/docs/layers/documents', permanent: true, },

    // old docs section
    { source: '/docs/beetle', destination: '/docs/ipfs', permanent: true,},

    // we renamed connections -> networking
    { source: '/docs/connections', destination: '/docs/networking', permanent: true, },
    { source: '/docs/layers/connections', destination: '/docs/layers/networking', permanent: true, },

    // complete the transition from "layers" to "components"
    // we'll likely want to use `/docs/layers` to explain the layers thing, so no redirect for the root:
    // { source: '/docs/layers', destination: '/docs/components', permanent: true, },
    { source: '/docs/layers/documents', destination: '/docs/components/docs', permanent: true, },
    { source: '/docs/layers/blobs', destination: '/docs/components/blobs', permanent: true, },
    { source: '/docs/layers/gossip', destination: '/docs/components/gossip', permanent: true, },
    { source: '/docs/layers/networking', destination: '/docs/components/net', permanent: true, },

    // transition from "components" to "protocols"
    // we'll likely want to use `/docs/layers` to explain the layers thing, so no redirect for the root:
    // { source: '/docs/layers', destination: '/docs/components', permanent: true, },
    { source: '/docs/components/documents', destination: '/docs/protocols/docs', permanent: true, },
    { source: '/docs/components/blobs', destination: '/docs/protocols/blobs', permanent: true, },
    { source: '/docs/components/gossip', destination: '/docs/protocols/gossip', permanent: true, },
    { source: '/docs/components/networking', destination: '/docs/protocols/net', permanent: true, },
  ]
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  redirects,
}

export default withSearch(withMDX(nextConfig))