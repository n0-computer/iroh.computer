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
    {
      source: '/discord',
      destination: 'https://discord.gg/jDg6mWXt',
      basePath: false,
      permanent: false,
    },

    // api section used to be called "commands" 
    {
      source: '/docs/commands',
      destination: '/docs/api',
      permanent: true,
    },

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
    {
      source: '/design',
      destination: '/docs/overview',
      permanent: true,
    },
    {
      source: '/design/content-addressing',
      destination: '/docs/layers/blobs',
      permanent: true,
    },
    {
      source: '/design/data-transfer',
      destination: '/docs/layers/blobs',
      permanent: true,
    },
    {
      source: '/design/dsht',
      destination: '/docs/layers/documents',
      permanent: true,
    },

    // old docs section
    {
      source: '/docs/beetle',
      destination: '/docs/ipfs',
      permanent: true,
    },
  ]
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  redirects,
}

export default withSearch(withMDX(nextConfig))