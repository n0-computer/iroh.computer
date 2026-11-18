+++
title = "iroh 1.4.2 - Security Fixes for Relays and Endpoints"
description = "Release of iroh v1.4.2"
date = "2026-11-21"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of `iroh`, a modular networking stack in Rust, for building direct connections between devices.

`iroh` 1.4.2 is a security release. It fixes several issues in `iroh-relay`, and a few in `iroh` itself. If you run your own relays, upgrade them. If you ship an application built on `iroh`, upgrade that too. There are no new features and no API changes you need to act on, so upgrading from 1.4.x should be a drop-in change.

## 🚨 Fixes in `iroh-relay`: Upgrade Your Relays

If you run your own relay, upgrade to `iroh-relay` 1.4.2, either by rebuilding from source or by switching to the release binaries. The n0 public relays are already patched.

- **An empty datagram could disconnect another client.** The relay accepted a datagram frame with an empty payload from a client, but refused to forward it, and that refusal closed the *recipient's* connection rather than the sender's. Any client could use this to knock another client off the relay, as long as it knew the target's `EndpointId`. The relay now forwards empty datagrams like any other, and `iroh` endpoints ignore them. Thanks to contributor [mattyg][mattyg] for reporting and fixing this. See [PR #4646] and advisory xxx.
- **A too-large frame could disconnect another client.** Because of an off-by-one in the relay's frame size check, it accepted a datagram frame one byte larger than it could forward. When delivery failed, the relay again closed the recipient's connection. The relay now checks the full frame length and rejects an oversized frame on receipt, closing the sender's connection instead. Any other packet the relay can't forward is dropped and counted in the `send_packets_dropped` metric, and the recipient stays connected. Thanks to [AnthonyKrupko][ak] and [vincentkoc][vk] for reporting this. See [PR #4694] and advisory xxx.
- **Connections could leak during the relay handshake.** A client could get around the establish timeout during the handshake and hold a connection open on the relay. Every stage of the handshake is now covered by a timeout, configurable with the new `RelayServiceWithNotify::with_timeout` (default 30 seconds). See [PR #4621].
- **Proxy credentials in the debug log.** When the relay client dialed through an HTTP proxy with a username and password in the URL, the password ended up in debug-level logs. It's now masked as `***`. Thanks to contributor [fluffypony][fp] for reporting it and sending the fix. See [PR #4653].
- **WebSocket ping floods.** A peer that kept sending WebSocket pings without reading the replies could make the other side queue pongs without limit until it ran out of memory. This worked in both directions: a client against a relay, or a relay against a connected endpoint. Now neither side reads the next frame until the pong for the last ping is written, and a peer that won't read is dropped by the existing timeouts.
- **Stuck client connections on the relay.** A client that stopped reading could hold its relay connection, and the memory behind it, open forever, and could keep the relay from shutting down. Every write and flush to a client is now bounded by a timeout.

## 🚨 Fixes in `iroh`: Upgrade Your Endpoints

Not every fix is in the relay. We also fixed problems in `iroh` itself. Please upgrade your applications to `iroh` 1.4.2 as soon as you can.

- **A bad relay URL could stop all relay traffic.** If an application dialed an address containing a relay URL that couldn't be turned into a WebSocket URL, for example from a ticket or a published address record, the relay actor for that URL stopped processing control messages. After enough retries or network changes, the endpoint stopped sending anything through any relay, its home relay included. The actor now handles messages while it backs off, and exits once it's been idle long enough.
- **A misbehaving relay could stop all relay traffic.** A relay that ignored the WebSocket close and kept the connection open could leave the endpoint's connection to it stuck in the closing state, which eventually blocked sends through every relay. Closing now gives up after a second.
- **WebSocket ping floods**, described above, also affected endpoints, so a malicious relay could exhaust an endpoint's memory.

## What's Next?

`iroh` 1.5.0 is coming right behind this release, with stream affinity and all of the fixes above. See the [1.5.0 post](/blog/iroh-1-5-0) for details.

As always, the full set of changes is in the [changelog](https://github.com/n0-computer/iroh/releases/tag/v1.4.2).

See you at the next release, and keep [filing](https://github.com/n0-computer/iroh/issues) those bugs!

[PR #4621]: https://github.com/n0-computer/iroh/pull/4621
[PR #4646]: https://github.com/n0-computer/iroh/pull/4646
[PR #4653]: https://github.com/n0-computer/iroh/pull/4653
[PR #4694]: https://github.com/n0-computer/iroh/pull/4694
[mattyg]: https://github.com/mattyg
[fp]: https://github.com/fluffypony
[ak]: https://github.com/AnthonyKrupko
[vk]: https://github.com/vincentkoc
