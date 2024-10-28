import { getAllPages } from "@/lib/pages"

const priorities = {
  "": 1,
  "roadmap": 0.8,
  "docs": 0.8,
  "blog": 0.5,
}

// see: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
export default async function sitemap() {
  const pages = await getAllPages();

  return pages.map(page => ({
    url: `https://iroh.computer/${page.slug}`,
    lastModified: page.date,
    changeFrequency: 'monthly',
    priority: priorities[page.slug] || 0.6,
  }));
}