const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const source = readFileSync(require('node:path').join(__dirname, '../public/article-content.js'), 'utf8');
const { createArticleLoader, validateArticleBody } = runInNewContext(
  source + '\n({ createArticleLoader, validateArticleBody })',
);

test('direct visits reuse prerendered text without a request', async () => {
  const load = createArticleLoader(() => assert.fail('unnecessary request'), {
    path: '/blog/initial', html: '<p>Already readable</p>',
  });
  assert.equal(await load('/blog/initial', '/assets/initial.txt'), '<p>Already readable</p>');
});

test('navigation fetches only the requested asset and caches repeated visits', async () => {
  const requests = [];
  const load = createArticleLoader(async (path, url) => {
    requests.push([path, url]);
    return `<p>${path}</p>`;
  });
  assert.equal(await load('/blog/one', '/assets/one-hash.txt'), '<p>/blog/one</p>');
  await load('/blog/one', '/assets/one-hash.txt');
  assert.deepEqual(requests, [['/blog/one', '/assets/one-hash.txt']]);
});

test('concurrent requests deduplicate; out-of-order articles stay separate', async () => {
  const finish = new Map();
  const load = createArticleLoader(path => new Promise(resolve => {
    assert.ok(!finish.has(path), 'duplicate request');
    finish.set(path, resolve);
  }));
  const one = load('/blog/one', '/one');
  const duplicate = load('/blog/one', '/one');
  const two = load('/blog/two', '/two');
  await Promise.resolve();
  finish.get('/blog/two')('<p>Second</p>');
  assert.equal(await two, '<p>Second</p>');
  finish.get('/blog/one')('<p>First</p>');
  assert.deepEqual(await Promise.all([one, duplicate]), ['<p>First</p>', '<p>First</p>']);
  assert.equal(await load('/blog/two', '/two'), '<p>Second</p>');
});

test('failed and empty responses can be retried', async () => {
  let attempts = 0;
  const load = createArticleLoader(async () => {
    attempts++;
    if (attempts === 1) throw new Error('offline');
    return attempts === 2 ? '' : '<p>Recovered</p>';
  });
  await assert.rejects(load('/blog/one', '/one'), /offline/);
  await assert.rejects(load('/blog/one', '/one'), /Missing article/);
  assert.equal(await load('/blog/one', '/one'), '<p>Recovered</p>');
  assert.equal(attempts, 3);
});

test('cache evicts least recently used articles', async () => {
  const requests = [];
  const load = createArticleLoader(async path => {
    requests.push(path);
    return path;
  }, null, 2);
  for (const slug of ['one', 'two', 'one', 'three', 'one', 'two']) {
    await load(`/blog/${slug}`, `/${slug}`);
  }
  assert.deepEqual(requests, ['/blog/one', '/blog/two', '/blog/three', '/blog/two']);
});

test('invalid routes never fetch', async () => {
  const load = createArticleLoader(() => assert.fail('invalid request'));
  for (const path of ['/services/hosting', '/blog/../secret', 'https://example.com/blog/a']) {
    await assert.rejects(load(path, '/asset'), /Invalid article path/);
  }
});

test('response identity rejects fallback pages and the wrong article', () => {
  const html = '<!-- iroh-article:/blog/one -->\n<p>Article</p>';
  assert.equal(validateArticleBody('/blog/one', html), html);
  assert.throws(() => validateArticleBody('/blog/two', html), /Unexpected article/);
  assert.throws(() => validateArticleBody('/blog/one', '<!doctype html><h1>404</h1>'), /Unexpected article/);
});
