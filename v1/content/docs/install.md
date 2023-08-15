+++
title = "install iroh"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# Installation

Iroh works on macOS, Windows & Linux.

## Installing Iroh
Run this script to get started:
```
curl -fsSL https://sh.iroh.computer/install.sh | sh
```

# Package Managers

Iroh is available on [tea](https://tea.xyz/) for macOS and Linux. To install, run:

```
$ curl tea.xyz | sh
# ^^ installs the tea package manager

$ iroh --help
# ^^ tea installs iroh automagically!
```

# Docker
We don't yet have official docker images for iroh.

# Building from Source
Information about how to build from source can be found in our repo's [Developer documentation](https://github.com/n0-computer/iroh).

# Removing Iroh
Iroh only caches data in `/tmp` directories, which are automatically purged when you restart your computer. To remove Iroh, remove the CLI binary.
