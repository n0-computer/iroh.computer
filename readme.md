# iroh-computer

A Dioxus web application.

## Local development

Install the Dioxus 0.7 CLI and Rust's WebAssembly target:

```sh
cargo install dioxus-cli --version 0.7.10 --locked
rustup target add wasm32-unknown-unknown
```

If `dx` is already installed, update it to match this project's Dioxus version:

```sh
dx self-update --version v0.7.10
dx --version
```

The CLI should report `0.7.10`. Stop any older development server before
starting a new one on the same port.

Start the development server:

```sh
cargo run
```

On native targets, this launches `dx serve --platform web`. The application
itself runs as WebAssembly in the browser; launching the web renderer as a
native executable would panic. You can also run `dx serve --platform web`
directly.

Pass server options after `--`, for example:

```sh
cargo run -- --port 8080 --open false
```

For a complete production build, including prerendered pages, RSS, and sitemap, run
`bash scripts/build-static.sh`. A plain `dx build --platform web --release`
builds only the interactive app; it does not export pages or XML.

## Editing the website

Page layouts and copy live in native Dioxus components. Edit the Rust source
directly; there is no HTML-in-JSON content layer or import step.

- `src/home.rs`: homepage layout, headings, links, and blog previews.
- `src/home/sections.rs`: homepage copy, customer logos, quotes, and feature lists.
- `src/network.rs`: the two animated network illustrations.
- `src/service_art.rs`: hosting and observability illustrations, styled in `assets/service-art.css`.
- `src/observability.rs`: observability hero; its remaining content is in `src/pages/content/services/observability.rs`.
- `src/contact.rs`: shared Dioxus contact dialog connected to the existing HubSpot form.
- `src/enterprise.rs`, `src/hosting.rs`, `src/pricing.rs`, `src/solutions.rs`: dedicated marketing pages.
- `src/pages/content/`: remaining pages, organized by route, including documentation.
- `src/content/page_metadata.rs`: page metadata shared by search and sitemap generation.
- `src/content/snippets.rs` and `src/content/protocols.rs`: code examples and protocol listings.
- `assets/`: stylesheets. Homepage and enterprise styles are in `home.css` and `enterprise.css`.

The former JSON content files and Next.js importer have been removed. Blog
bodies remain Markdown; the blog listing and page layout are Dioxus in `src/pages.rs`.

## Blog posts

Posts live in `content/blog/<slug>.md`. The filename determines the URL:
`content/blog/my-post.md` becomes `/blog/my-post`. Keep existing filenames to
preserve published links, including their capitalization.

Each post starts with TOML front matter:

```markdown
+++
title = "My post"
description = "A short summary for the blog index and search."
date = "2026-10-01"
author = "Your name"
social_image = "/blog/my-post/social.png"
draft = false
+++

## A heading

Write the post in Markdown, with **bold text**, [links](https://iroh.computer),
lists, tables, and fenced code blocks.
```

`draft` is optional and defaults to `false`; drafts are excluded from the app.
`social_image` is optional. Omit it (or set it to `""`) for a text-only listing; social sharing uses the default iroh card.
Use a path relative to `public/` (starting with `/`)
or an HTTPS image URL. For example, the value above points to
`public/blog/my-post/social.png`. The homepage and blog listing use this image.
Choose a card that reads well at small sizes; a 1200 × 630 image fits the preview.
The build validates image references when present and rejects missing local images.
The pull request template includes a social-card checklist, and CI validates posts.
Use `YYYY-MM-DD` dates. The build validates metadata and renders Markdown to
HTML in Cargo's ignored output directory. There is no generated blog JSON or
HTML to edit or check in, and adding a post needs no manual index update.
The blog listing, homepage, and site search all use this generated index.

Headings get automatic anchors. Use `## Heading {#existing-anchor}` when an
anchor must stay stable. GitHub-style tables, task lists, strikethrough,
footnotes, and `> [!NOTE]` callouts are supported. Fenced code blocks with a recognized
language (for example, `rust`, `python`, or `bash`) get syntax highlighting
during the content build, with colors for both site themes. Unlabelled output
and unknown languages remain plain text. No highlighting engine is loaded in
the browser. Put images and diagrams in
`public/blog/<slug>/` and reference them with Markdown image syntax. Existing
theme-specific images and video embeds use small HTML media blocks where
Markdown has no equivalent. Legacy footnote links retain their HTML anchors;
new footnotes can use `[^name]` and `[^name]: Footnote text.` syntax.

Cargo rebuilds the blog when Markdown files change, including additions and
deletions. If the Dioxus watcher does not trigger a rebuild, press `r` in its
terminal or restart `cargo run`. Run `cargo test --test blog` to check the
renderer, every post's metadata, and social-card image references.

## RSS and sitemap

`build.rs` generates `/rss.xml` and `/sitemap.xml` from the same metadata as the
app. Draft posts are excluded. RSS keeps the production feed's URL-based GUIDs,
publication dates, and newest-first order. The sitemap includes the homepage,
listings, published posts, content pages, and protocol pages, excluding routes
redirected by Vercel. Undated pages omit `lastmod` instead of claiming every build
changed them. Both files always use `https://iroh.computer` URLs, including previews.

The complete build command above exports the XML after Dioxus finishes copying
static assets. Vercel runs this same command. XML is generated into ignored build
output; do not edit it or commit generated copies into `public/`.

To regenerate and validate just the XML:

```sh
cargo run --locked --example export_feeds -- target/feed-check
python3 scripts/check-feeds.py target/feed-check
cargo test --locked --test feeds
```

Keep `deployment/redirects.json` and `vercel.json` synchronized; the build checks
their parity. CI validates XML structure, dates, GUIDs, draft exclusion, and
sitemap coverage.

## Static HTML and metadata

The complete build renders every canonical route with the existing Dioxus
components, using `dioxus-ssr` and an in-memory router. Stylesheet URLs come from
the web build manifest. All page content, canonical links, Open Graph/Twitter
metadata, and article dates are present before JavaScript runs. Posts without a
custom social image use the existing iroh artwork.

The browser mounts the interactive app separately and swaps it into view once
ready, preserving the reader's scroll position. This is a static snapshot plus
client mounting, not Dioxus hydration. Without WebAssembly, the rendered content
and ordinary navigation links remain available; search, dialogs, and animations
require the app. Client navigation updates the same metadata model.

Vercel's `cleanUrls` serves generated HTML at extensionless routes. There is no
catch-all rewrite; unknown URLs return the branded `404.html` with HTTP 404.
The build clears its generated output first so deleted or newly drafted posts
cannot remain published from an earlier build.

```sh
cargo test --locked --test prerender
bash scripts/build-static.sh
# The build also runs both output validators:
python3 scripts/check-html.py target/dx/iroh-computer/release/web/public
```

## Migration review

See [MIGRATION.md](MIGRATION.md) for the import source, preserved upstream content,
and hosting requirements before this replaces the production Next.js site.

Vercel previews use the branch-local `vercel.json` and `scripts/build-vercel.sh`.
The first build compiles the pinned Dioxus CLI for Vercel’s Linux environment;
subsequent builds can reuse the cached CLI. No project-wide framework override
is required.
