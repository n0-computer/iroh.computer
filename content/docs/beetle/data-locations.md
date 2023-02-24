+++
title = "data locations"
description = "Where beetle stores data"
template="docs/page.html"
[extra]
section="beetle"
+++

# Data Locations

Beetle follows operating system conventions for storing files & folders, using an `beetle` directory as a common wrapper for beetle data, regardless of platform.

| platform | configuration files | application files |
| -------- | ------------- | ---------------- |
| Linux    | `$XDG_CONFIG_HOME/beetle` or `$HOME/.config/beetle` | `$XDG_DATA_HOME/beetle` or `$HOME/.local/share/beetle` |
| MacOS    | `$HOME/Library/Application Support/beetle` | `$HOME/Library/Application Support/beetle` |
| Windows  | `{FOLDERID_RoamingAppData}/beetle` | `{FOLDERID_RoamingAppData}/beetle` |
| iOS      | N/A: Configured via code | app-local rocksDB instance |
| Android  | N/A: Configured via code | app-local rocksDB instance |

Under the hood our approach follows the [dirs.dev](https://dirs.dev/) approach, aiming to respect supported operating system rules for config, cache files, and other application data.

# Configuration files

Configuration files are stored in the configuration directory, and follow a `${service_name}.config.toml` convention. Configuration files are not required, and will resort to default configuration when not present. For more info see [configuration](/docs/configuration).

| service | configuration filename |
| ------- | ---------------------- |
| beetle cloud p2p | `p2p.config.toml` |
| beetle cloud store | `store.config.toml` |
| beetle cloud gateway | `gateway.config.toml` |
| beetle one | `one.config.toml` |


# Private Keys

Private keys are considered configuration data. Each key is storead as a separate file using the same naming conventions as [`OpenSSH`](https://www.openssh.com/). Examining a common beetle config directory will look like this:

```
$ tree .
beetle
├── id_p2p_ed25519_0
├── store.config.toml
├── gateway.config.toml
└── p2p.config.toml
```

In this case, `id_p2p_ed25519_0` will be used by p2p services as the basis for peer identity.
