+++
title = "data locations"
description = "Where iroh stores data"
template="docs/page.html"
[extra]
section="iroh"
+++

# Data Locations

Iroh follows operating system conventions for storing files & folders, using an `iroh` directory as a common wrapper for iroh data, regardless of platform.

| platform | configuration files | application files |
| -------- | ------------- | ---------------- |
| Linux    | `$XDG_CONFIG_HOME/iroh` or `$HOME/.config/iroh` | `$XDG_DATA_HOME/iroh` or `$HOME/.local/share/iroh` |
| MacOS    | `$HOME/Library/Application Support/iroh` | `$HOME/Library/Application Support/iroh` |
| Windows  | `{FOLDERID_RoamingAppData}/iroh` | `{FOLDERID_RoamingAppData}/iroh` |
| iOS      | N/A: Configured via code | app-local rocksDB instance |
| Android  | N/A: Configured via code | app-local rocksDB instance |

Under the hood our approach follows the [dirs.dev](https://dirs.dev/) approach, aiming to respect supported operating system rules for config, cache files, and other application data.

# Configuration files

Configuration files are stored in the configuration directory, and follow a `${service_name}.config.toml` convention. Configuration files are not required, and will resort to default configuration when not present. For more info see [configuration](/docs/configuration).

| service | configuration filename |
| ------- | ---------------------- |
| iroh cloud p2p | `p2p.config.toml` |
| iroh cloud store | `store.config.toml` |
| iroh cloud gateway | `gateway.config.toml` |
| iroh one | `one.config.toml` |


# Private Keys

Private keys are considered configuration data. Each key is storead as a separate file using the same naming conventions as [`OpenSSH`](https://www.openssh.com/). Examining a common iroh config directory will look like this:

```
$ tree .
iroh
├── id_p2p_ed25519_0
├── store.config.toml
├── gateway.config.toml
└── p2p.config.toml
```

In this case, `id_p2p_ed25519_0` will be used by p2p services as the basis for peer identity.
