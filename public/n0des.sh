#!/bin/sh
# Copyright 2025 n0. All rights reserved. Dual MIT/Apache license.

set -e

# Set tag from first argument or default to "latest"
if [ -n "$1" ]; then
    tag="${1:0:7}"
else
    tag="latest"
fi

# Get target from environment
if [ "$OS" = "Windows_NT" ]; then
    target="windows-x86_64"
else
    case $(uname -sm) in
    "Darwin x86_64") target="darwin-x86_64" ;;
    "Darwin arm64") target="darwin-aarch64" ;;
    "Linux arm64"|"Linux aarch64") target="linux-aarch64" ;;
    "Linux x86_64") target="linux-x86_64" ;;
    *) target="linux-x86_64" ;;
    esac
fi

# Skip unsupported targets
case "$target" in
  "darin-x68_64"|"linux-aarch64"|"windows-x86_64")
    echo "Platform $target is not yet supported. Please open an issue if you need support for this platform."
    exit 1
    ;;
esac

release_url="https://vorc.s3.us-east-2.amazonaws.com/n0des-${target}-${tag}"

echo "Downloading n0des for $target with tag $tag to ./n0des"
curl "$release_url" -f -o ./n0des
chmod a+x ./n0des
