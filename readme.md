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

For a production web build, run `dx build --platform web --release`.

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
- `src/pages/content/mod.rs`: page metadata for navigation and search.
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
`social_image` is optional. Omit it (or set it to `""`) for a text-only preview.
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
footnotes, and `> [!NOTE]` callouts are supported. Put images and diagrams in
`public/blog/<slug>/` and reference them with Markdown image syntax. Existing
theme-specific images and video embeds use small HTML media blocks where
Markdown has no equivalent. Legacy footnote links retain their HTML anchors;
new footnotes can use `[^name]` and `[^name]: Footnote text.` syntax.

Cargo rebuilds the blog when Markdown files change, including additions and
deletions. If the Dioxus watcher does not trigger a rebuild, press `r` in its
terminal or restart `cargo run`. Run `cargo test --test blog` to check the
renderer, every post's metadata, and social-card image references.

## Migration review

See [MIGRATION.md](MIGRATION.md) for the import source, preserved upstream content,
and hosting requirements before this replaces the production Next.js site.

Vercel previews use the branch-local `vercel.json` and `scripts/build-vercel.sh`.
The first build compiles the pinned Dioxus CLI for Vercel’s Linux environment;
subsequent builds can reuse the cached CLI. No project-wide framework override
is required.
