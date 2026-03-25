#!/bin/sh
# Copyright 2023 n0. All rights reserved. Dual MIT/Apache license.
# Windows support provided by neuralpain.

set -e

repo="n0-computer/sendme"
release_url="https://api.github.com/repos/$repo/releases/latest"

if [ "$OS" = "Windows_NT" ]; then
    target="windows-x86_64"
else
    case $(uname -sm) in
    "Darwin x86_64") target="darwin-x86_64" ;;
    "Darwin arm64") target="darwin-aarch64" ;;
    "Linux x86_64") target="linux-x86_64" ;;
    "Linux arm64"|"Linux aarch64") target="linux-aarch64" ;;
    *) target="linux-x86_64" ;;
    esac
fi

echo "Downloading $repo for $target"
release_target_url=$(
    curl -s "$release_url" |
    grep '"browser_download_url":' |
    grep -- "-$target." |
    sed -re 's/^.+: "([^"]+)"$/\1/'
)

if [ -z "$release_target_url" ]; then
    echo "Error: No release found for target $target"
    exit 1
fi

echo "Extracting ${release_target_url##*/} to current directory"
case "$release_target_url" in
    *.zip)
        release_archive="${release_target_url##*/}"
        curl -sL "$release_target_url" -o "$release_archive"
        unzip -o "$release_archive"
        rm -f -- "$release_archive"
        ;;
    *)
        curl -sL "$release_target_url" | tar vxz -f -
        ;;
esac
