+++
title = "data locations"
description = "Where Iroh stores data on your system"
template="docs/page.html"
[extra]
section="cloud"
+++

# Where Iroh writes data

# Iroh cloud follows operating system conventions for storing data
Each iroh cloud service follows the same 

| platform | configuration | application data |
| -------- | ------------- | ---------------- |
| Linux    | `$XDG_CONFIG_HOME/iroh` or `$HOME/.config/iroh` | `$XDG_DATA_HOME/iroh` or `$HOME/.local/share/iroh` |
| Windows  | `{FOLDERID_RoamingAppData}/iroh` | `{FOLDERID_RoamingAppData}/iroh` |
| MacOS    | `$HOME/Library/Application Support/iroh` | `$HOME/Library/Application Support/iroh` |

## Removing Iroh Data

## Private Keys
