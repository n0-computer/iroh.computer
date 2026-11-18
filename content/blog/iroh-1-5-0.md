+++
title = "iroh 1.5.0 - Stream Affinity, Then Heads Down"
description = "Release of iroh v1.5.0, alongside noq v1.5.0"
date = "2026-11-21"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of `iroh`, a modular networking stack in Rust, for building direct connections between devices.

`iroh` 1.5.0 brings the feature we promised in the [1.4.0 post](/blog/iroh-1-4-0): stream affinity, which lets you choose which path a stream's data travels over. It also includes all of the security fixes from [`iroh` 1.4.2](/blog/iroh-1-4-2). If you haven't upgraded your relays and applications yet, please do.

This is also our last feature release of 2026. More on that below.

## Stream Affinity

`iroh` connections can have several paths at once, usually one through a relay and one or more direct paths. Until now, `noq` decided which path each stream's data went over, and you couldn't tell it otherwise.

That's a problem when some data must never go through a relay, or must stay on a particular path. Now you can set an affinity on a `SendStream`. The kinds of affinities you can set are as follows:

- `StreamAffinity::Any`: the default. The connection picks the path, as before.
- `StreamAffinity::Sticky(path_id)`: send this stream's data only on this path.
- `StreamAffinity::Block`: don't send this stream's data on any path for now.

For example, to keep a stream on a direct path, wait for one to appear before opening the stream:

```rust
let mut paths = conn.paths_stream();
let direct_path = loop {
    let paths = paths.next().await.expect("path watcher stopped");
    if let Some(direct) = paths.iter().find(|p| p.is_ip()) {
        break direct.id();
    }
};

let mut send_stream = conn.open_uni().await?;
send_stream.set_affinity(StreamAffinity::Sticky(direct_path))?;
```

If that path closes, you choose what happens next: stick to another direct path, or `Block` the stream until one comes back. Use `Block` judiciously. Data written to a blocked stream still uses up the connection's send window, so it's best to wait to open the stream until the path you want exists, rather than opening it blocked and writing ahead.

The [`stream_affinity_direct`][example] example shows the whole thing, including watching for path changes mid-transfer.

See [PR #4654], [PR #4667] and [noq PR #881] for more details.

## Relay URLs with a Path Prefix

Previously, a relay URL like `https://example.com/prefix/` didn't work. `iroh` always talked to `/relay` and `/ping` at the root of the host. Now those paths are joined onto the relay URL, so you can run a relay behind a reverse proxy under a path prefix. A trailing `/` is added if it's missing.

`RELAY_PATH` and `RELAY_PROBE_PATH` are deprecated, use `RELAY_RELATIVE_PATH` and `RELAY_PROBE_RELATIVE_PATH` instead. Relay URLs without a path behave as before.

Thanks to contributor [meiyasan][meiyasan] for fixing this long-standing issue. See [PR #4617].

## Heads Down for the Rest of 2026

1.5 is our last feature release this year. From now until January, we're not adding features to `iroh`. We're spending that time on:

- fixing bugs, especially around connection reliability and the relay
- security fixes and dependency updates.

We'll keep shipping patch releases as fixes land, so expect 1.5.x versions over the next few weeks.

### If Your Feature Request Is Waiting on a Reply

If you've opened a feature request on GitHub recently and haven't heard back, this is why. We're reading them, but we won't triage, discuss or label new feature work until the new year. Please don't read the silence as a no.

The same goes for feature PRs. As our [contributor][] guide says, PRs need to be discussed in an issue and given the "ready-for-pr" label first, and we won't be handing out that label for feature work until January.

Bug reports are the opposite: we want them more than ever. If something is broken, panics, leaks or stalls, please [file an issue](https://github.com/n0-computer/iroh/issues) with as much detail as you can, ideally logs and a way to reproduce it. If you'd like to fix a bug yourself, start with our [contributor guide][contributor].

## What's Next?

Patch releases with bug and security fixes until the end of the year. We'll pick feature requests back up in January.

As always, the full set of changes is in the [changelog](https://github.com/n0-computer/iroh/releases/tag/v1.5.0).

See you at the next release, and keep [filing](https://github.com/n0-computer/iroh/issues) those bugs!

[PR #4617]: https://github.com/n0-computer/iroh/pull/4617
[PR #4654]: https://github.com/n0-computer/iroh/pull/4654
[PR #4667]: https://github.com/n0-computer/iroh/pull/4667
[noq PR #881]: https://github.com/n0-computer/noq/pull/881
[example]: https://github.com/n0-computer/iroh/blob/main/iroh/examples/stream_affinity_direct.rs
[meiyasan]: https://github.com/meiyasan
[contributor]: https://github.com/n0-computer/iroh/blob/main/CONTRIBUTING.md
