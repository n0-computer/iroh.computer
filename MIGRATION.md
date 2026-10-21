# Dioxus migration review

This branch imports the Dioxus site from `n0-computer/iroh-computer-two` at
`2cb4632`, on top of `n0-computer/iroh.computer` main at `f0e2176`.
It replaces the Next.js application, MDX runtime, and Node lint workflow with
Rust components, Markdown blog content, and Rust validation.

## Content retained from upstream

- All upstream public assets and artwork remain available at their existing paths.
- All published blog slugs are retained. The five newer published posts and four
  previously omitted drafts are converted from MDX to Markdown. The latest
  global content discovery edits are retained. Drafts remain
  excluded from the public blog and search index.
- Existing host redirects, including the docs migration and removed DERP post,
  are recorded in `deployment/redirects.json` in their original order.
- Social images use existing static files where available. Posts that used only
  the removed `/api/og` title-card service now use the supported text-only preview.

## Before production cutover

This is a review branch, not a production deployment configuration. Keep the PR
in draft until these hosting and rendering decisions have been addressed:

1. Replace the hosting project's Next.js build with the documented Dioxus build.
   Serve `target/dx/iroh-computer/release/web/public`, with WebAssembly MIME support
   and an index fallback for application routes. Static assets must take precedence.
2. Apply `deployment/redirects.json` at the host before the application fallback.
   These redirects are not implemented by the development server.
3. Decide on prerendering/server rendering for search indexing and link previews.
   This imported version renders page content and per-page metadata in the browser;
   non-JavaScript crawlers receive the shared application shell.
4. Restore generated `/rss.xml` and `/sitemap.xml`, which were Next.js server routes.
   The existing RSS link and robots sitemap declaration still expect those URLs.
5. Review desktop/mobile layouts, navigation, theme switching, search, and the
   HubSpot contact flow on the deployment preview. The local component checks and
   content tests do not cover a production hosting cutover.

## Validation

```sh
cargo check --locked --target wasm32-unknown-unknown
cargo test --locked --test blog --test contact --test highlight
# Dioxus CLI 0.7.10 and wasm32-unknown-unknown must be installed.
dx build --platform web --release
```
