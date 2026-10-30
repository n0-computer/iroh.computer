// A small, bounded cache shared by direct visits and client-side navigation.
// fetchBody returns only the requested article, never a site-wide content bundle.
function createArticleLoader(fetchBody, initialArticle = null, capacity = 8) {
  const cache = new Map();
  const pending = new Map();
  const remember = (path, html) => {
    cache.delete(path);
    cache.set(path, html);
    while (cache.size > capacity) cache.delete(cache.keys().next().value);
    return html;
  };
  if (initialArticle) remember(initialArticle.path, initialArticle.html);
  return async function loadArticle(path, url) {
    if (!/^\/blog\/[a-zA-Z0-9_-]+$/.test(path)) throw new Error('Invalid article path');
    if (cache.has(path)) return remember(path, cache.get(path));
    if (pending.has(path)) return pending.get(path);
    const request = Promise.resolve().then(() => fetchBody(path, url)).then(html => {
      if (typeof html !== 'string' || !html.trim()) throw new Error('Missing article body');
      return remember(path, html);
    }).finally(() => pending.delete(path));
    pending.set(path, request);
    return request;
  };
}

function validateArticleBody(path, html) {
  if (!html.startsWith(`<!-- iroh-article:${path} -->\n`)) {
    throw new Error('Unexpected article response');
  }
  return html;
}

