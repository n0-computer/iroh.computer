#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

dx build --platform web --release --locked
cargo run --locked --example export_feeds -- target/dx/iroh-computer/release/web/public
test -s target/dx/iroh-computer/release/web/public/index.html
test -s target/dx/iroh-computer/release/web/public/rss.xml
test -s target/dx/iroh-computer/release/web/public/sitemap.xml
