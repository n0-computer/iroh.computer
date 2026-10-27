#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Remove generated pages from earlier builds, including posts since marked draft.
rm -rf -- target/dx/iroh-computer/release/web/public

dx build --platform web --release --locked
cargo run --locked --example export_feeds -- target/dx/iroh-computer/release/web/public
cargo run --locked --example prerender -- target/dx/iroh-computer/release/web/public
test -s target/dx/iroh-computer/release/web/public/index.html
test -s target/dx/iroh-computer/release/web/public/rss.xml
test -s target/dx/iroh-computer/release/web/public/sitemap.xml
python3 scripts/check-feeds.py target/dx/iroh-computer/release/web/public
python3 scripts/check-html.py target/dx/iroh-computer/release/web/public
