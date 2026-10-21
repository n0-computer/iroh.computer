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
  are applied by `vercel.json` and recorded in `deployment/redirects.json`
  in their original order.
- Social images use existing static files where available. Posts that used only
  the removed `/api/og` title-card service now use the supported text-only preview.

## Vercel previews

The branch's `vercel.json` overrides the project framework with Other, skips
Node dependency installation, and runs `scripts/build-vercel.sh`. The script
installs Rust 1.95.0, the WebAssembly target, and Dioxus CLI 0.7.10 as needed,
then builds the website in release mode. The CLI is compiled from source because
the official Linux binary requires a newer glibc than Vercel's build image.
Its binary is kept under `node_modules/.cache/iroh` for build-cache reuse.

Vercel serves `target/dx/iroh-computer/release/web/public`. Existing redirects run
before the extensionless application-route fallback, and `.wasm` files have an
explicit WebAssembly content type. Keep the redirect entries in `vercel.json`
and `deployment/redirects.json` in sync. These host redirects are not implemented
by `dx serve`.

These settings apply to deployments of this branch. Production on `main` keeps
its existing Next.js configuration until the migration is merged.

## Before production cutover

Keep the PR in draft until these rendering and preview checks are addressed:

1. Decide on prerendering/server rendering for search indexing and link previews.
   This imported version renders page content and per-page metadata in the browser;
   non-JavaScript crawlers receive the shared application shell.
2. Restore generated `/rss.xml` and `/sitemap.xml`, which were Next.js server routes.
   The existing RSS link and robots sitemap declaration still expect those URLs.
3. Review desktop/mobile layouts, navigation, theme switching, search, and the
   HubSpot contact flow on the deployment preview. The local component checks and
   content tests do not cover a production hosting cutover.

## Validation

```sh
cargo check --locked --target wasm32-unknown-unknown
cargo test --locked --test blog --test contact --test highlight
# Dioxus CLI 0.7.10 and wasm32-unknown-unknown must be installed.
dx build --platform web --release
```
