#!/bin/sh
# Copyright 2025 n0. All rights reserved. Dual MIT/Apache license.

set -e

# Set tag from first argument or default to "latest"
if [ -n "$1" ]; then
    tag="${1:0:7}"
else
    tag="latest"
fi

target="linux-amd64"

release_url="https://vorc.s3.us-east-2.amazonaws.com/n0des-${target}-${tag}"


echo "Downloading n0des for $target with tag $tag to ./n0des"
curl "$release_url" -o ./n0des
