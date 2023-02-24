+++
title = "install Beetle"
description = ""
template="docs/page.html"
[extra]
section="beetle"
+++

# Installation

Beetle works on macOS & Linux. Beetle is released as a collection of four binaries with no external dependencies.

## Installing beetle on your laptop
Run this script to get started:
```
curl -fsSL https://sh.iroh.computer/install_laptop.sh | sh
```

Running this script will put beetle on your laptop. The installer script automatically configures beetle for the laptop environment. We set up a racing gateway so you can cache IPFS content locally, and leave p2p communication off until you explicitly turn it on. You can be on a zoom call with iroh cloud running in the background.

# Package Managers
Beetle is not available on major package managers.

# Docker
We don't yet have official docker images for Beetle.

## Building from Source
Information about how to build from source can be found in our repo's [Developer documentation](https://github.com/n0-computer/beetle).

## Removing Beetle
To remove Beetle from your machine, delete the following directories:

### macOS
`~/Library/Application Support/iroh`

### Linux
`$XDG_CONFIG_HOME` or `$HOME/.config/iroh`
