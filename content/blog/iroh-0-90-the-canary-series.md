+++
title = "iroh v0.90 - The Canary Series 🐥"
description = "Introducing the Canary Series of releases leading up to 1.0"
date = "2025-06-27"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of `iroh`, a library for building on direct connections between devices, putting more control in the hands of your users.

**TL;DR: We’re jumping to v0.90 as the *canary* release series leading to 1.0. If you’re cool working on the bleeding edge, use 0.90. If you want to wait for 1.0, stick with v0.35.x until we cut 1.0 toward the end of the year.**

Last time we published a release blog, we said our next release would be our release candidate for `1.0`. But, while working through all of our breaking changes and updates, we realized that waiting until we had everything worked through and finished before releasing was *not* actually the best way for us to get a stable release into the hands of our users.

In the pre 1.0 era, we’d found that three-week release cycles were the sweet spot for our team. Not only did three-week cycles help our working cadence, but it also made sure we got user feedback quickly, and allowed us to move forward with confidence. We want that confidence more than ever going into 1.0.

So, we’ve decided that along with maintaining the `0.35` release (as well as the public infrastructure that supports `0.35`), we will be doing a series of releases that we will refer to as “canary” releases. They will be versioned releases starting with `0.90`, and continuing up until we are ready for our `1.0-rc`.

The biggest difference between the way we are thinking about our new series of releases is, starting with `0.90`, we are not guaranteeing network/protocol level stability until we make it to `1.0-rc`.

So for those who:

-   are starting fresh with iroh
-   want to be on the cutting edge
-   do not need worry about backwards-compatibility for their networks
-   are still in the prototyping stage, or have small, easily updated deployments

We **highly** recommend coming along with us on our `0.90` canary journey. Our `0.90` release, for example, already includes performance improvements, and we want you to benefit from these kinds of changes ASAP.

But, if your network cannot tolerate multiple breaking changes over a short period of time (on the order of months), then stay on the `0.35` series until we have a release candidate.

We appreciate your patience as we figure out the best way to get to a stable `1.0` as soon as possible!

There are MANY breaking changes in this release, please do check out the “Breaking Changes” section below to see what those changes are in detail. Below are the highlights:

## 💥 Concrete Errors 💥 {#concrete-errors}

All of our APIs now return concrete errors!

This is going to be most obvious for those of you who have implemented versions of Discovery Services, or written your own protocols on `iroh`.

**PLEASE** [give us feedback](https://github.com/n0-computer/iroh/issues/3352) on our new concrete errors. This was a large change that touched most of the codebase and we are still lacking some documentation. But we want to make sure that this change works for you.

## 🚧 TLS x509 certificate option removed 🚧 {#tls-x509-certificate-option-removed}

As described in our [last release blog post](/blog/iroh-0-35-prepping-for-1-0#release-candidate-logistics), we no longer support `x509` TLS certifications in `iroh` . We have removed the `iroh::endpoint::Builder::tls_x509` and the `iroh::endpoint::Builder::tls_raw_public_keys` endpoint builder options, since we now default to using raw public keys.

## 😯 iroh-relays no longer support STUN 😯 {#iroh-relays-no-longer-support-stun}

`iroh` no longer uses the STUN protocol to learn about our external addresses. We now rely on QUIC address discovery to do that. To that effect, the `iroh-relay`s starting from `0.90` no longer support the STUN protocol. Our `iroh` configuration has also changed, as the `RelayNode` now only has `quic` configuration options.

## 👀 `n0-watcher` crate and the `Watcher` trait 👀 {#n0-watcher-crate-and-the-watcher-trait}

Many of our APIs now return `impl Watcher`, like the `Endpoint::node_addr` method. Knowing all of the details of your node’s `NodeAddr` may take a few milliseconds.. Something like the local address may be almost instant, but knowing its home `RelayUrl` or its publicly available addresses may take more time, since it needs to do some external probing to discover.

Returning a `Watcher` here allows our users to “wait” for the `NodeAddr` in the way that is most useful for them. If you just want the earliest value, let's say because you know you are on an local network, call `initialize` to get the first value that appears.

If you want updates, let's say because you need to know the `RelayUrl` or public facing addresses, you can call `stream` to get updates when new information comes in.

```rust
use iroh::Endpoint;
use n0_watcher::Watcher;

let endpoint = Endpoint::builder()
    .alpns(vec![b"my-alpn".to_vec()])
    .bind()
    .await?;
let node_addr = endpoint.node_addr().initialized().await?;
let stream = endpoint.node_addr().stream();
```

Take a look at the [n0-watcher](https://docs.rs/n0-watcher/0.2.0/n0_watcher/) crate docs for more info, but just know that the `Watcher` trait is re-exported in `iroh`, so if you want to use the `Endpoint::node_addr` or `Endpoint::home_relay` methods in `iroh`, you will also need to import the `iroh::Watcher` trait.

## ❗ Subtle expectation changes around `Endpoint::node_addr` and `Endpoint::home_relay` ❗ {#subtle-expectation-changes-around-endpoint-node-addr-and-endpoint-home-relay}

With some shifting of internals, two specific methods have changed in a subtle way, without changing names.

`Endpoint::node_addr` used to wait until a full net-report ran, so the first update to `node_addr` would usually include a `RelayUrl`. Now, `node_addr` returns whatever direct addresses we know about ASAP, without waiting for a `relay_url`. If you had code that relied on the existence of a `RelayUrl` in the `NodeAddr`, you must now listen for updates to check for its existence, or just use the `Endpoint::home_relay` method.

Also, previously the `home_relay` and `node_addr` updated at the same time, which means that previously you could use the existence of one to imply the existence of the other. This is no longer the case, so make sure that your code does not rely on this logic.

## ⚠️ Breaking Changes {#breaking-changes}

-   iroh
    -   removed

        -   `iroh::endpoint::Builder:: tls_x509` removed, this is the tls mechanism that has been removed
        -   `iroh::endpoint::Builder:: tls_raw_public_keys`  removed, this is the default mechanism now, so not needed anymore
        -   `Display` implementation was removed for `SecretKey`, use `.to_bytes()` and encode as hex to get the previous bytes explicitly, for example:

        ```
        let encoded_key = data_encoding::HEXLOWER.encode(&secret_key.to_bytes())
        ```

        -   removed `iroh_relay::protos::stun::StunError`
        -   removed `iroh_relay::server::testing::stun_config`
        -   removed `iroh_relay::protos::stun`
        -   removed `iroh_relay::quic::QuicClient::get_addr_and_latency`
        -   removed `DEFAULT_STUN_PORT`
        -   Removed `iroh::discovery::dns::DnsDiscovery::new`, use `DnsDiscovery::builder` instead
        -   Removed `iroh::discovery::pkarr::PkarrPublisher::new`, use `PkarrPublisher::builder` instead
        -   Removed `iroh::discovery::pkarr::PkarrPublisher::with_options`, use `PkarrPublisher::builder` instead
        -   Removed `iroh::discovery::pkarr::PkarrResolver::new`, use `PkarrResolver::builder` instead
    -   changed

        -   all public APIs return concrete error types, rather than `anyhow::Error`
        -   `iroh::protocol::ProtocolHandler` methods now return `impl Future` instead of `BoxFuture`. You can simply remove the `Box::pin(async move {})` from the implementations and instead implement the methods as `async fn`. See the updated documentation for the `iroh::protocol` module for an example.
        -   `iroh::protocol::ProtocolHandler` is no longer dyn-compatible. If you need a dyn-compatible version, you need to build your own dyn-compatible wrapper trait. See the (non-public) `DynProtocolHandler` in `iroh::protocol` as an example.
        -   `iroh::watcher` is now its own crate `n0-watcher`, but the `Watcher` trait is still a top level export in `iroh`
        -   `iroh::endpoint::Endpoint::node_addr` now returns `impl Watcher<Value = Option<NodeAddr>>`
        -   `iroh::endpoint::Endpoint::home_relay` now returns `impl Watcher<Value = Vec<RelayUrl>>`
        -   `iroh::endpoint::Endpoint::bound_sockets` now returns `Vec<SocketAddr>`
        -   `iroh-quinn` is updated to `0.14.0`
        -   `iroh::protocol::RouterBuilder::accept` now takes `impl Into<Box<dyn DynProtocolHandler>>` instead of `impl ProtocolHandler`. Because of a blanket `From` impl this change does not need any changes by users: you can still pass any `impl ProtocolHandler` to `accept`. Additionally, if you have your own builder struct upstream, you can now also pass a `Box<dyn DynProtocolHandler>` to `accept`, which wasn't possible previously.
        -   `iroh::discovery::Lagged` changed from a tuple to a struct
        -   `iroh::watcher::Disconnected` is changed from a tuple to a struct
        -   `iroh::watcher::Disconnected` is no longer `UnwindSafe` or `RefUnwindSafe`
        -   `iroh::watcher::InitializedFut` is no longer `RefUnwindSafeiroh-base`
        -   `iroh::endpoint::Builder::add_discovery` now takes an `impl iroh::discovery::IntoDiscovery` argument instead of a closure that returns a `Discovery`. You can implement that on a builder struct, and any `T: Discovery` has an auto-impl of `IntoDiscovery`.
        -   `iroh::discovery::Discovery::resolve` no longer gets a `&Endpoint` argument. If you need an endpoint in your discovery service, add a builder struct and implement `IntoDiscovery` for it, which gives you an endpoint that you can clone into your service
        -   `iroh::discovery::pkarr::PkarrPublisher::n0_dns` now takes no arguments and returns a `PkarrPublisherBuilder`. The secret key is set on `PkarrPublisherBuilder::build` instead.
-   `iroh-base`
    -   `changed`
        -   `iroh_base::ticket::Error` is renamed to `iroh_base::ticket::ParseError`
        -   `iroh_base::key::KeyParsingError` has changed from a `thiserror` error to a `snafu` error`iroh-relay`
-   `iroh-relay`
    -   `changed`
        -   `iroh_relay::node_info::MaxLengthExceededError` is no longer `UnwindSafe` or `RefUnwindSafe`
        -   `iroh_relay::node_info::MaxLengthExceededError` was changed from a `thiserror` to a `snafu` error
        -   `iroh_relay::client::ConnSendError` is now `iroh_relay::client::SendError`
        -   `iroh_relay::protos::stun::Error` is now `iroh_relay::protos::stun::StunError`

### But wait, there's more! {#but-wait-there-s-more}

Many bugs were squashed, and smaller features were added. For all those details, check out the full changelog: [https://github.com/n0-computer/iroh/releases/tag/v0.90.0](https://github.com/n0-computer/iroh/releases/tag/v0.90.0).

If you want to know what is coming up, check out the [v0.99.0 milestone](https://github.com/n0-computer/iroh/milestone/34), and if you have any wishes, let us know about the [issues](https://github.com/n0-computer/iroh/issues)! If you need help using iroh or just want to chat, please join us on [discord](https://discord.com/invite/DpmJgtU7cW)! And to keep up with all things iroh, check out our [Twitter](https://x.com/iroh_n0).
