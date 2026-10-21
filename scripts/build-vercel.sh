#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

rust_version=1.95.0
dx_version=0.7.10
tool_dir="$PWD/node_modules/.cache/iroh/dioxus-$dx_version"
export PATH="$tool_dir/bin:${CARGO_HOME:-$HOME/.cargo}/bin:$PATH"

if ! command -v rustup >/dev/null 2>&1; then
    installer="$(mktemp)"
    curl --proto '=https' --tlsv1.2 -fsSL --retry 3 https://sh.rustup.rs -o "$installer"
    sh "$installer" -y --profile minimal --default-toolchain "$rust_version" --no-modify-path
    rm -f "$installer"
fi

if ! rustc --version | grep -q "^rustc $rust_version "; then
    rustup toolchain install "$rust_version" --profile minimal
    export RUSTUP_TOOLCHAIN="$rust_version"
fi
rustup target add wasm32-unknown-unknown

if ! command -v dx >/dev/null 2>&1 || ! dx --version | grep -q "^dioxus $dx_version "; then
    # The upstream Linux binary requires glibc 2.39; Vercel uses Amazon Linux.
    # Compile the CLI here for compatibility. Debug mode avoids optimizing the
    # build tool itself; the website below still gets a release build.
    CARGO_PROFILE_DEV_DEBUG=0 cargo install dioxus-cli \
        --version "=$dx_version" --locked --debug --root "$tool_dir"
fi

dx build --platform web --release --locked
test -s target/dx/iroh-computer/release/web/public/index.html
