+++
title = "install iroh"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# Installation

Iroh works on macOS & Linux. Our current release is for iroh cloud, a collection of four binaries with no external dependencies.

<aside>
🚧 <b>Windows Support</b><br />
We're actively working on supporting Windows in an upcoming release.
</aside>

## Installing iroh on your laptop
Run this script to get started:
```
curl -fsSL https://sh.iroh.computer/install_laptop.sh | sh
```

Running this script will put iroh cloud on your laptop. In our testing, iroh cloud works well on laptops, and we wholly recommend running it. The above script automatically configures iroh for the laptop environment. We set up a racing gateway so you can cache IPFS content locally, and leave p2p communication off until you explicitly turn it on. You can be on a zoom call with iroh cloud running in the background.

# Package Managers
We haven't yet begin to distribute iroh to package managers, but we're planning on it. More soon.

# Docker
We don't yet have official docker images for iroh. More soon.

## Building from Source
Information about how to build from source can be found in our repo's [Developer documentation](https://github.com/n0-computer).

## Removing Iroh
To remove iroh from your machine, delete the following directories:

### macOS
`~/Library/Application Support/iroh`

### Linux
`$XDG_CONFIG_HOME` or `$HOME/.config/iroh`
