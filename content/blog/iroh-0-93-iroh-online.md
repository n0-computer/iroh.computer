+++
title = "iroh 0.93.0 - 🟢 iroh services "
description = "Release of iroh v0.93"
date = "2025-10-09"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of `iroh`, a library for building direct connections between devices, putting more control in the hands of your users.

We’ve made a bunch of API changes in this release, mostly around the concept of being “online” and working with `NodeAddr`s, both getting them out from the `Endpoint` and passing them down to the `Endpoint`.

**Also, our `0.9X` public relay servers only support versions `0.92` and `0.93`, please upgrade to at least `0.92` if you want to relay on the n0 public relay servers!**

This does not effect the public relay servers that run version `0.35` .

## 🌐 `Endpoint::online` {#endpoint-online}

Before this release, it was annoying to understand whether or not your `Endpoint` was “online”, or able to be connected to from it’s peers on the internet.

We’ve added a method `Endpoint::online` that waits until your `Endpoint` has connected to a relay server and has at least one direct address.

In turn, we’ve removed `Endpoint::home_relay` and `Endpoint::direct_addresses`. The `Endpoint::node_addr` method is now infallible and instantaneous: as soon as the `Endpoint` is created it *at least* knows about it’s local addresses, so `Endpoint::node_addr` will immediately return with those addresses. But if you are still interested in understanding how your endpoint’s addresses change as it progresses, you can still watch for those changes using `Endpoint::watch_node_addr`, which returns a `Watcher` .

A few things to note when working with the `Endpoint::online` method:

-   If you are NOT expecting to be able to connect to a relay server, either because you have no relays in your `RelayMap` or maybe you are working in `RelayMode::Disabled`, then `Endpoint::online` will never return. It specifically is meant to cover the case where you want to be connected to a relay server. Also, in future a future release, you will be able to add and remove relays to and from your endpoint dynamically. In that case, once you add a relay you can connect to, the `Endpoint::online` method will return.
-   In production cases (so not an example or test), you will likely want to wrap the `Endpoint::online` in a timeout. We recommend having the timeout be around 5 seconds, as this is currently how long we wait for a net report to run. The net report is what we use to ensure we have connected to a preferred relay.
-   But, in general, if you were relying on `Endpoint::home_relay` previously, you can replace it with `Endpoint::online`, and then get your home relay by calling `Endpoint::node_addr` after, if needed.

## 🔍 Dynamically Add Discovery {#dynamically-add-discovery}

We’ve simplified the process for adding a discovery service to an `iroh` endpoint.

You can add the discovery service using the `Endpoint::Builder::add_discovery` method while building the endpoint OR add the discovery service once the endpoint as already been created by using `Endpoint::discovery().add` .

Discovery services should be clone-able, so you can keep a handle to the discovery service even after you add it to the endpoint.

This is especially helpful, for example, when using `MdnsDiscovery`. You can keep a handle to the `MdnsDiscovery` and subscribe to the stream of peers in your local network AND THEN add the service to the endpoint, so that `iroh` can use `MdnsDiscovery` like it would normally.

Another time you may want to keep a handle to your discovery service is when using a `StaticProvider` to feed your endpoint node information that you get out-of-band of a typical discovery process. This is especially helpful in tests, and is illustrated in the next section.

## 📝 How to add a `NodeAddr` to an endpoint now that `Endpoint::add_node_addr` has been removed {#how-to-add-a-nodeaddr-to-an-endpoint-now-that-endpoint-add-node-addr-has-been-removed}

Typically, if you want to connect to a peer and you have it’s `NodeAddr`, you can just pass the `NodeAddr` straight to `Endpoint::connect`.

However, there may be a case where you want to add a `NodeAddr` to an endpoint without immediately dialing it. In the `iroh` ecosystem, we typically learn about `NodeAddr`s using `Discovery`! This doesn’t change when it’s the user doing the discovery manually or out of band.

To handle this case, we use a `StaticProvider`. This is also very helpful in tests if you have a bunch of endpoints that you want to connect as part of the test setup.

This is also now much easier, since you can add `Discovery` services dynamically after you create an endpoint.

Here is a basic example:

```rust
use iroh::discovery::static_provider::StaticProvider;
use iroh::Endpoint;

// build endpoints
let ep1 = Endpoint::builder().bind().await?;
let ep2 = Endpoint::builder().bind().await?;
// wait until they are online
ep1.online().await?
ep2.online().await?
// get their node addrs
let addr1 = ep1.node_addr();
let addr2 = ep2.node_addr();

// create a static provider and add the address info
let static_provider = StaticProvider::new();
static_provider.add_node_info(addr1);
static_provider.add_node_info(addr2);

// add the static provider to your endpoints
ep1.discovery().add(static_provider.clone());
ep2.discovery().add(static_provider);

// you can dial by node_id because we have added the
// address information directly to the static_provider
let _ = ep1.connect(ep2.node_id()).await
```

## 🐢 🐇  `Endpoint::latency` {#endpoint-latency}

Along with removing `Endpoint::add_node_addr` we’ve also removed `Endpoint::remote_info` and `Endpoint::remote_info_iter`. This was the primary way to get information on your remote peers, if you didn’t have direct access to the connection.

In future refactors, we will be adding APIs to get your connection stats out from the endpoint, but those won’t settle until we convert to [QUIC multipath](https://www.iroh.computer/blog/iroh-on-QUIC-multipath).

So for now, we have added an `Endpoint::latency` method that takes a `NodeId`. It returns the latency of the current connection to that `NodeId` (if one exists).

## ⚠️ Breaking Changes {#breaking-changes}

-   iroh
    -   removed

        -   `MdnsDiscovery::new` is now private
        -   `MdnsDiscoveryBuilder::new` is now private
            -   Use `MdnsDiscovery::builder()` to create an `MdnsDiscoveryBuilder`
            -   Use `MdnsDiscoveryBuilder::default()` to create an `MdnsDiscoveryBuilder`
        -   `iroh::Endpoint::direct_addresses`
        -   `iroh::Endpoint::home_relay`
        -   `iroh::Endpoint::add_node_addr`
        -   `iroh::Endpoint::remote_info`
        -   `iroh::Endpoint::remote_info_iter`
        -   `iroh::RemoteInfo`
        -   `iroh::discovery::DiscoveryItem`
        -   “examples” feature is removed, you no longer need to include it in the list of features to run an example
    -   added

        -   `MdnsDiscoveryBuilder::service_name()`
        -   `iroh::Endpoint::online`
        -   `iroh::Endpoint::watch_node_addr`
    -   changed

        -   API Changes
            -   `iroh::Endpoint::node_addr` now returns synchronously the current addressing information

            -   `iroh::Endpoint::watch_node_addr` now returns a watchable for `NodeAddr` not `Option<NodeAddr>`

            -   `iroh::discovery::mdns::DiscoveryItem`

            -   `iroh::Endpoint::latency`

            -   `iroh::PublicKey::fmt_short` now returns a `impl Display` rather than a `String`

                To use it conveniently in `tracing` or `logging` precede the `fmt_short()` call with a `%`:

                ```
                tracing::info!(node_id = %node_id.fmt_short())
                ```

    -   *wire breaking changes*

        -   Default service name changed from `iroh.local.swarm` to `irohv1`
        -   Provenance field name in `DiscoveryItem` changed from `local.swarm.discovery` to `mdns`
        -   Switches to use `X-Iroh` headers for the captive portal challenges, this is currently backwards compatible and will remain so until the next release

### But wait, there's more! {#but-wait-there-s-more}

Many bugs were squashed, and smaller features were added. For all those details, check out the full changelog: [https://github.com/n0-computer/iroh/releases/tag/v0.93.0](https://github.com/n0-computer/iroh/releases/tag/v0.93.0).

If you want to know what is coming up, check out the [v0.94.0 milestone](https://github.com/n0-computer/iroh/milestone/48) and [v1.0.0 milestone](https://github.com/n0-computer/iroh/milestone/34), and if you have any wishes, let us know about the [issues](https://github.com/n0-computer/iroh/issues)! If you need help using iroh or just want to chat, please join us on [discord](https://discord.com/invite/DpmJgtU7cW)! And to keep up with all things iroh, check out our [Twitter](https://x.com/iroh_n0), [Mastodon](https://mastodon.social/@n0iroh), and [Bluesky](https://bsky.app/profile/iroh.computer).
