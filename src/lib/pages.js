import glob from 'fast-glob'

async function importMdxPage(postFilename) {
  let { post } = await import(`../app/${postFilename}`)

  return {
    slug: postFilename.replace(/(\/page)?\.mdx$/, ''),
    ...post,
  }
}

async function importJsxPage(postFilename) {
  let { post } = await import(`../app/${postFilename}`)

  return {
    slug: postFilename.replace(/(\/page)?\.jsx$/, ''),
    ...post,
  }
}

export async function getAllPages() {
  let postFilenames = await glob('**/page.mdx', {
    cwd: './src/app',
  })
  let pages = await Promise.all(postFilenames.map(importMdxPage))

  postFilenames = await glob('**/page.jsx', {
    cwd: './src/app',
  })
  // filter out pages like [slug].jsx
  postFilenames = postFilenames.filter((filename) => !filename.includes('['))
  let jsPages = await (await Promise.all(postFilenames.map(importJsxPage)))
  pages = pages.concat(jsPages)
  return pages.filter(p => !p.draft).sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
