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
  the removed `/api/og` title-card service now use the existing default iroh artwork for sharing.

## Vercel previews

The branch's `vercel.json` overrides the project framework with Other, skips
Node dependency installation, and runs `scripts/build-vercel.sh`. The script
installs Rust 1.95.0, the WebAssembly target, and Dioxus CLI 0.7.10 as needed,
then builds the website in release mode. The CLI is compiled from source because
the official Linux binary requires a newer glibc than Vercel's build image.
Its binary is kept under `node_modules/.cache/iroh` for build-cache reuse.

Vercel serves `target/dx/iroh-computer/release/web/public`. Existing redirects run
before static routes. `cleanUrls` serves prerendered HTML, and `.wasm` files have an
explicit WebAssembly content type. Keep the redirect entries in `vercel.json`
and `deployment/redirects.json` in sync. These host redirects are not implemented
by `dx serve`.

These settings apply to deployments of this branch. Production on `main` keeps
its existing Next.js configuration until the migration is merged.

## Static rendering and HTTP status

All 114 canonical routes are rendered at build time from the existing Dioxus
components. Initial HTML contains page content, stylesheets, canonical URLs,
Open Graph/Twitter tags, and article publication dates. The interactive client
mounts after this readable snapshot and updates metadata on navigation.

The blanket app-shell rewrite is removed. Vercel serves generated clean URLs
and a branded `404.html` for missing pages. Legacy redirects remain in place,
including the former Delta Chat use-case alias. Search links use normal navigation
so legacy documentation URLs reach their host redirects.

## Before production cutover

Keep the PR in draft for the final review of this full-site replacement. Verify
preview layouts, navigation, theme switching, search, and contact-dialog validation.
The live HubSpot submission and receipt must be checked with an authorized real
inquiry before cutover; automated validation does not send test leads.

## RSS and sitemap restored

`build.rs` generates RSS and sitemap from shared page, protocol, and blog metadata.
`bash scripts/build-static.sh` builds the app and exports both XML files into the
static output; Vercel uses this same pipeline. RSS preserves existing item GUIDs
and publication dates. Drafts are excluded, and the sitemap omits redirected
routes. CI validates the generated XML and catalog coverage.

## Validation

```sh
cargo check --locked --target wasm32-unknown-unknown
cargo test --locked --test blog --test contact --test highlight --test feeds --test prerender
# Dioxus CLI 0.7.10 and wasm32-unknown-unknown must be installed.
bash scripts/build-static.sh
python3 scripts/check-feeds.py target/dx/iroh-computer/release/web/public
```

The static build validates the generated HTML, metadata, stylesheet/bootstrap
assets, 404 page, RSS, and sitemap before deployment.
