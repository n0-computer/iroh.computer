+++
title = "iroh 1.5.0 - Stream Affinity, Then Heads Down"
description = "Release of iroh v1.5.0, alongside noq v1.5.0"
date = "2026-11-18"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of `iroh`, a modular networking stack in Rust, for building direct connections between devices.

`iroh` 1.5.0 brings the feature we promised in the [1.4.0 post](/blog/iroh-1-4-0): stream affinity, which lets you choose which path a stream's data travels over. It also includes all of the security fixes from [`iroh` 1.4.2](/blog/iroh-1-4-2). If you haven't upgraded your relays and applications yet, please do.

This is also our last feature release of 2026. More on that below.

## 🚨 Two More Security Fixes

On top of everything in 1.4.2, 1.5.0 fixes two more issues:

- **Connections could leak during the relay handshake.** A client could get around the establish timeout and hold a connection open on the relay. The whole handshake is now covered by a timeout, which you can configure with the new `RelayServiceWithNotify::with_timeout` (default 30 seconds). See [PR #4621].
- **Proxy credentials in the debug log.** Proxy passwords showed up in the relay client's debug-level logs. They're now masked. Thanks to contributor [fluffypony][fp] for reporting it and sending the fix. See [PR #4653] and [GHSA-9v2v-w4v3-3qqq].

## Stream Affinity

`iroh` connections can have several paths at once, usually one through a relay and one or more direct paths. Until now, you could not specify which path your stream data went over.

That's a problem when some data must never go through a relay due to egress cost, or you want to prefer a specific path in particular. Now you can set an affinity on a `SendStream`. The kinds of affinities you can set are as follows:

- `StreamAffinity::Any`: the default. The connection picks the path, as before.
- `StreamAffinity::Sticky(path_id)`: send this stream's data only on this path.
- `StreamAffinity::Block`: don't send this stream's data on any path for now.

One thing to note: setting an affinity affects which path your application data takes, it does not prevent other kinds of QUIC packets, such as ACKs, from flowing on whatever open path `noq` chooses.

For example, to keep a stream on a direct path, wait for one to appear before opening the stream:

```rust
let mut paths = conn.paths_stream();
let mut direct_path = paths
    .wait_any(|p| p.is_ip())
    .await
    .expect("connection closed")
    .id();

let mut send_stream = conn.open_uni().await?;
send_stream.set_affinity(StreamAffinity::Sticky(direct_path))?;
```

If that path closes, you choose what happens next: stick to another direct path, or `Block` the stream until one comes back:

```rust
while let Some(list) = paths.wait_closed(direct_path).await {
    direct_path = if let Some(path) = list.iter().find(|p| p.is_ip()) {
        // Another direct path is already open. Use it.
        path.id()
    } else {
        // No direct path left. Block the stream until one comes back.
        send_stream.set_affinity(StreamAffinity::Block)?;
        paths.wait_any(|p| p.is_ip()).await.expect("connection closed").id()
    };
    send_stream.set_affinity(StreamAffinity::Sticky(direct_path))?;
}
```

Use `Block` judiciously. Data written to a blocked stream still uses up the connection's send window, so it's best to wait to open the stream until the path you want exists, rather than opening it blocked and writing ahead.

The [`stream_affinity_direct`][example] example shows the whole thing, running the path watcher in its own task while the data is sent.

## Waiting on Paths

The snippets above use new helpers on the `PathListStream` you get from `Connection::paths_stream`. Before, you had to loop over every snapshot of the path list and check it yourself. Now you can wait for the change you care about directly:

- `wait_any(condition)` waits until any open path matches the condition, and returns that path.
- `wait_none(condition)` waits until no open path matches the condition.
- `wait_closed(path_id)` waits until a specific path closes.

Each one checks the current paths first, so it returns right away if the condition already holds. They return `None` once the connection closes.

See [PR #4654], [PR #4667], [PR #4672] and [noq PR #881] for more details.

## Relay URLs with a Path Prefix

Previously, a relay URL like `https://example.com/prefix/` didn't work. `iroh` always talked to `/relay` and `/ping` at the root of the host. Now those paths are joined onto the relay URL, so you can run a relay behind a reverse proxy under a path prefix. A trailing `/` is added if it's missing.

`RELAY_PATH` and `RELAY_PROBE_PATH` are deprecated, use `RELAY_RELATIVE_PATH` and `RELAY_PROBE_RELATIVE_PATH` instead. Relay URLs without a path behave as before.

Thanks to contributor [meiyasan][meiyasan] for fixing this long-standing issue. See [PR #4617].

## Heads Down for the Rest of 2026

1.5 is our last feature release this year. From now until January, we're not adding features to `iroh`. We're spending that time responding to the new security landscape and ensuring that `iroh` can stand up to AI bug-finding scrutiny.

We'll keep shipping patch releases as fixes land, so expect 1.5.x versions over the next few weeks.

### If Your Feature Request Is Waiting on a Reply

If you've opened a feature request on GitHub recently and haven't heard back, this is why. We're reading them, but we won't triage, discuss or label new feature work until the new year. Please don't read the silence as a no.

The same goes for feature PRs. As our [contributor] guide says, PRs need to be discussed in an issue and given the "ready-for-pr" label first, and we won't be handing out that label for feature work until January.

## What's Next?

Patch releases with bug and security fixes until the end of the year. We'll pick feature requests back up in January.

As always, the full set of changes is in the [changelog](https://github.com/n0-computer/iroh/releases/tag/v1.5.0).

See you at the next release, and keep [filing](https://github.com/n0-computer/iroh/issues) those bugs!

[PR #4617]: https://github.com/n0-computer/iroh/pull/4617
[PR #4621]: https://github.com/n0-computer/iroh/pull/4621
[PR #4653]: https://github.com/n0-computer/iroh/pull/4653
[GHSA-9v2v-w4v3-3qqq]: https://github.com/n0-computer/iroh/security/advisories/GHSA-9v2v-w4v3-3qqq
[PR #4654]: https://github.com/n0-computer/iroh/pull/4654
[PR #4667]: https://github.com/n0-computer/iroh/pull/4667
[PR #4672]: https://github.com/n0-computer/iroh/pull/4672
[noq PR #881]: https://github.com/n0-computer/noq/pull/881
[example]: https://github.com/n0-computer/iroh/blob/main/iroh/examples/stream_affinity_direct.rs
[meiyasan]: https://github.com/meiyasan
[fp]: https://github.com/fluffypony
[contributor]: https://github.com/n0-computer/iroh/blob/main/CONTRIBUTING.md
