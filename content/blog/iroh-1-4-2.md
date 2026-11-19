+++
title = "iroh 1.4.2 - Security Fixes for Relays and Endpoints"
description = "Release of iroh v1.4.2"
date = "2026-11-18"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of `iroh`, a modular networking stack in Rust, for building direct connections between devices.

`iroh` 1.4.2 is a security release. It fixes several issues in `iroh-relay`, and a few in `iroh` itself. If you run your own relays, upgrade them. If you ship an application built on `iroh`, upgrade that too:

`cargo update -p iroh -p iroh-relay`

## 🚨 Fixes in `iroh-relay`: Upgrade Your Relays

If you run your own relay, upgrade to `iroh-relay` 1.4.2, either by rebuilding from source or by switching to the release binaries. The n0 public relays are already patched.

- **An empty datagram could disconnect another client.** The relay refused to forward empty datagrams, and closed the *recipient's* connection instead of the sender's. It now forwards them. Thanks to contributor [mattyg][mattyg] for reporting and fixing this. See [PR #4646] and [GHSA-5c6r-mh39-9998].
- **A too-large frame could disconnect another client.** An off-by-one in the frame size check let the relay accept a frame it couldn't forward, which again closed the recipient's connection. The relay now rejects oversized frames from the sender, and drops packets it can't forward. Thanks to [AnthonyKrupko][ak] and [vincentkoc][vk] for reporting this. See [PR #4694] and [GHSA-9mgr-cc4j-g7qv].
- **WebSocket ping floods.** A peer sending pings without reading the replies could make the other side run out of memory, in either direction. Each side now writes the pong before reading on. Found by Anthropic's OSS Scanner. See [GHSA-rqw2-29g8-jwxw].
- **Stuck client connections on the relay.** A client that stopped reading could hold its connection open forever and block relay shutdown. Writes to clients now time out. Found by Anthropic's OSS Scanner. See [GHSA-2gf7-pq49-93p2].

## 🚨 Fixes in `iroh`: Upgrade Your Endpoints

Not every fix is in the relay. We also fixed problems in `iroh` itself. Please upgrade your applications to `iroh` 1.4.2 as soon as you can.

- **A bad relay URL could stop all relay traffic.** Dialing an address with an invalid relay URL could eventually stop the endpoint from sending through any relay. Found by Anthropic's OSS Scanner.
- **A misbehaving relay could stop all relay traffic.** A relay that ignored the WebSocket close could block sends through every relay. Closing now times out. Found by Anthropic's OSS Scanner. See [GHSA-9cgq-f6jg-g7w6].
- **WebSocket ping floods**, described above, also let a malicious relay exhaust an endpoint's memory.

## Dependency Updates

1.4.2 also picks up security fixes in its dependencies:

- `tokio` 1.54.1, for [RUSTSEC-2026-0386].
- `ctutils` 0.4.6, for [RUSTSEC-2026-0385].
- Fixes in our own crates: `portmapper` and `netwatch` 0.20.2, `n0-dns-resolver` 0.1.1, `n0-watcher` 1.0.1 and `iroh-metrics` 1.0.3. `iroh` now requires `portmapper` and `netwatch` 0.20, but none of their types are in `iroh`'s public API, so this doesn't affect your code.

## What's Next?

`iroh` 1.5.0 is coming right behind this release, with stream affinity and all of the fixes above. See the [1.5.0 post](/blog/iroh-1-5-0) for details.

As always, the full set of changes is in the [changelog](https://github.com/n0-computer/iroh/releases/tag/v1.4.2).

See you at the next release, and keep [filing](https://github.com/n0-computer/iroh/issues) those bugs!

[PR #4646]: https://github.com/n0-computer/iroh/pull/4646
[PR #4694]: https://github.com/n0-computer/iroh/pull/4694
[mattyg]: https://github.com/mattyg
[ak]: https://github.com/AnthonyKrupko
[vk]: https://github.com/vincentkoc
[RUSTSEC-2026-0385]: https://rustsec.org/advisories/RUSTSEC-2026-0385
[RUSTSEC-2026-0386]: https://rustsec.org/advisories/RUSTSEC-2026-0386
[GHSA-5c6r-mh39-9998]: https://github.com/n0-computer/iroh/security/advisories/GHSA-5c6r-mh39-9998
[GHSA-9mgr-cc4j-g7qv]: https://github.com/n0-computer/iroh/security/advisories/GHSA-9mgr-cc4j-g7qv
[GHSA-rqw2-29g8-jwxw]: https://github.com/n0-computer/iroh/security/advisories/GHSA-rqw2-29g8-jwxw
[GHSA-2gf7-pq49-93p2]: https://github.com/n0-computer/iroh/security/advisories/GHSA-2gf7-pq49-93p2
[GHSA-9cgq-f6jg-g7w6]: https://github.com/n0-computer/iroh/security/advisories/GHSA-9cgq-f6jg-g7w6
