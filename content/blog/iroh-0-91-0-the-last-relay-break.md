+++
title = "iroh 0.91.0 - Making relays use established standards 🎆"
description = "Release of iroh v0.91.0"
date = "2025-08-01"
author = "ramfox, matheus23"
social_image = ""
+++

Welcome to a new release of `iroh`, a library for building on direct connections between devices, putting more control in the hands of your users.

We have some minor API improvements headed your way with `iroh` v0.91.0, but the biggest changes in this latest release are around the `iroh-relay` servers. We’ve introduced our final relay wire-level breaking change! This change not only simplifies our code, but also allows us to build some kind of congestion control into our relay connections in the future.

## 👓 Watcher API {#watcher-api}

For many of us, our first foray into working with `iroh` looked something like this: create an endpoint, check to see what the home relay server is or `NodeAddr` of our node is. So, many of you will recognize the APIs that have changed in this release. From v0.35 to v0.90, these APIs already went through a big change, using `Watcher`s, from the `n0_watcher` crate.

We’ve made some small but useful quality-of-life improvements to the `Watcher` API, namely simplifying the return values to remove unnecessary `Result`s.

-   `endpoint.node_addr().initialized().await?`  is now `endpoint.node_addr().initialized().await` (no `?` needed anymore) and similarly for `endpoint.home_relay()` and other uses of `Watcher`s.
-   `endpoint.node_addr().get()?` is now `endpoint.node_addr().get()` and similarly for `endpoint.home_relay()` and other uses of `Watcher`s.

For other API changes take a look at the [breaking changes](#breaking-changes) section below.

## ⛓️ Relay Changes {#relay-changes}

We told you that the canary series may have breaking wire-level changes any time and boy are we keeping our word.

However, we are happy to say that after this release, barring some unforeseen issues, **this will be the last wire-level breaking change to the relay servers and relay protocol**.

Previously, there were two options for connecting to the relay servers, using raw TCP streams or using WebSockets. We’ve narrowed that down to one option: you can now only communicate to the relay servers using WebSockets. This doubles down on our quest to make iroh use more established standards!

Well, if we’ve always been able to use WebSockets to connect to the relays, why is this a wire-level breaking change? Great question.

## 🤝 New protocols {#new-protocols}

We’ve split our general “relay protocol” into two distinct parts: the handshake protocol and messaging protocol. We’ve cleaned up frames we no longer use and use better encoding for messages, in general, but we’ve also:

-   made changes to the handshake protocol to tighten up security and potentially remove a round-trip
-   and made changes to the messaging protocol to allow us to do better queue management for relay messages in the future.

### 🔐 Better security {#better-security}

Previously, during the relay handshake, the server would verify the client by looking at the `ClientInfo` frame, which was signed. However, this frame didn’t include randomness controlled by the verifier, thus it was susceptible to replay attacks - an attack where a third-party observes the signed message the client sent and uses that same message to pretend to be the client.

This wasn’t really an issue, as the signature was never exchanged in plain text (only via HTTPS to the relays), and the most important authentication (from iroh-endpoint to iroh-endpoint) was still protected with TLS. But it could have been a problem in the future if a malicious relay operator took this data and pretended to be an authenticated client to another relay.

In any case, we fixed this shortcoming by adding a random challenge to sign provided by the server for the clients to sign.

### ⌛Fewer round trips {#fewer-round-trips}

This extra challenge would in theory add another round trip to the relay connection: instead of sending a signed `ClientInfo` frame right away, a client would have to wait for the server to send the challenge first.

To mitigate this, we’ve borrowed ideas from a fairly new RFC, the [HTTP Concealed Authentication Scheme](https://datatracker.ietf.org/doc/rfc9729/) (RFC 9729. Most TLS connections nowadays support a feature called [“TLS Keying Material Exporters”](https://datatracker.ietf.org/doc/html/rfc5705) (RFC 5705), which allows both ends of an established TLS connection to extract keying material (random-looking bytes) that will be the same on both ends of the connection, but different for different connections. We sign those bytes as the challenge and send it immediately via HTTP header, saving us a round-trip that would otherwise happen after the WebSocket was established.

However, since browsers don’t have APIs for this TLS feature ([yet?](https://github.com/w3c/webtransport/issues/411)), we fall back to a normal extra round-trip in case such a header isn’t present.

### ECN Byte {#ecn-byte}

`iroh`’s direct connections are QUIC connections. QUIC connections have congestion controllers, that regulate how much data they send across the connection in an attempt to send as much as possible without getting high packet loss.

If you cannot get a direct connection to another node (likely due to strict NAT or firewall conditions), `iroh` will fall back to using the relay servers as a proxy to send your data through to the other node. This proxy will tunnel those QUIC packets over the server, but the proxy connection is a WebSocket connection, not a QUIC connection (with its built-in congestion control).

We strive to make our relay servers as unobtrusive as possible. We don’t keep track of who is talking to whom, nor can we read any of the messages on the relay server, as the connections are end-to-end encrypted. So, previously, we had no way of handling a situation where one side was unable to process messages as fast as they were being sent (for example), except for dropping those packets on the floor.

Here comes the ECN byte. ECN stands for “Explicit Congestion Notification”, and the two bits used for ECN allow routers to do [active queue management](https://en.wikipedia.org/wiki/Active_queue_management) (AQM) and communicate congestion without dropping packets. In the future, we can use the ECN byte to allow a relay server to communicate that it is experiencing congestion.

Our relay protocol now expects the ECN byte in every datagram sent to the relay, thus breaking with our old relay protocol.

## ⚙️ Wait… what relay URLs should I be using? {#wait-what-relay-urls-should-i-be-using}

If you’ve been coming along the `iroh` canary journey with us, you might be a little confused right now.

Last release, for v0.90.0, we added new relay servers with new relays URLs (containing the characters `iroh-canary`). Maybe you’ve *just* got around to upgrading to v0.90.0 and you don’t want to do another upgrade so fast. But now, we’re telling you that there is ANOTHER breaking change on the relays. **Will there be public relays available for me if I want to stay on v0.90 for a bit?**

Yes, there will be.

The relays that use the `iroh-canary` URLs (which are the default URLs in v0.90), will **stay on v0.90 until the v0.92 release**. At the v0.92 release the `iroh-canary` relay servers will be upgraded to v0.92 and will no longer be compatible with v0.90.

The default URLs that we shipped with v0.91 point to special relays that we are only provisioning for this release. Once the v0.92 release comes around, we will point those URLs to the `iroh-canary` relays. The v0.91 and v0.92 relays should be perfectly compatible. However, we give no promises that those URLs will be maintained forever, so you should upgrade to v0.92 as soon as you can.

What about the relays for v0.35? Those have remained on v0.35 and will be available until the v1.0 release and likely for some time after, so that folks have time to migrate to 1.0.

## ⚠️ Breaking Changes {#breaking-changes}

-   `iroh`

    -   changed
        -   edition is now set to `edition2024`

        -   The relay wire protocol changed: All relayed messages now contain at least an additional ECN byte.

            They *might* be accidentally compatible when GSO is not enabled, but they're likely not.

            This means this version of iroh can't connect to older relays or older clients on newer relays.

            -   `ClientToRelayMsg::SendPacket` was removed in favor of `ClientToRelayMsg::Datagrams`
            -   `RelayToClientMsg::ReceivedPacket` was removed in favor of `RelayToClientMsg::Datagrams`
            -   `FrameType` has changed variants:
                -   `SendPacket` and `RecvPacket` were removed
                -   `ClientToRelayDatagram` and `ClientToRelayDatagramBatch` were added
                -   `RelayToClientDatagram` and `RelayToClientDatagramBatch` were added
        -   The default relay URLs have changed. We are still maintaining relay URLs for version `0.90.0`, those will be phased out next release.

        -   Updated `n0-watcher` from version `0.2` to `0.3`

            -   Migration guide for users:
                -   `endpoint.node_addr().initialized().await?` -> `endpoint.node_addr().initialized().await` (no `?` needed anymore) and similarly for `endpoint.home_relay()` and other uses of `Watcher`s.
                -   `endpoint.node_addr().get()?` -> `endpoint.node_addr().get()` and similarly for `endpoint.home_relay()` and other uses of `Watcher`s.
                -   If all you have is a `&impl Watcher` but you need the current value, then you can't call `Watcher::get` anymore, as that now takes a `&mut self` instead of `&self`. You can work around this by `.clone()`ing to an intermediate watcher:`watcher_ref.get()` -> `watcher_ref.clone().get()`
    -   removed
        -   Removed `iroh::discovery::pkarr::dht::Builder::initial_publish_delay`
        -   Removed `iroh::endpoint::Builder::relay_conn_protocol`. It's now always websockets
        -   Removed the `iroh::RelayProtocol` re-export (the type was removed in `iroh-relay`)
-   `iroh-relay`

    -   removed
        -   Removed `iroh_relay::client::SendMessage` and `iroh_relay::client::ReceivedMessage` in favor of `ClientToRelayMsg` and `RelayToClientMsg` respectively.
        -   Removed `ClientBuilder::is_prober`
        -   Removed `ClientBuilder::protocol`
        -   Removed `http::Protocol` type
        -   Removed `relay_accepts` and `websocket_accepts` metrics
    -   changed
        -   `impl Stream for Client` now produces `RelayToClientMsg` instead of `ReceivedMessage`
        -   `Client` now `impl Sink<ClientToRelayMsg>` instead of `impl Sink<SendMessage>`
        -   Moved `protos::relay::FrameType` to `protos::common::FrameType` and adjusted frame types to those of the current set of protocols
        -   Renamed `frames_rx_ratelimited_total` metric to `bytes_rx_ratelimited_total`, which now tracks bytes not frames

### But wait, there's more! {#but-wait-there-s-more}

Many bugs were squashed, and smaller features were added. For all those details, check out the full changelog: [https://github.com/n0-computer/iroh/releases/tag/v0.91.0](https://github.com/n0-computer/iroh/releases/tag/v0.91.0).

If you want to know what is coming up, check out the [v0.99.0 milestone](https://github.com/n0-computer/iroh/milestone/34), and if you have any wishes, let us know about the [issues](https://github.com/n0-computer/iroh/issues)! If you need help using iroh or just want to chat, please join us on [discord](https://discord.com/invite/DpmJgtU7cW)! And to keep up with all things iroh, check out our [Twitter](https://x.com/iroh_n0).
