+++
title = "iroh 0.20.0 - More ways to connect"
description = "Iroh 0.20.0 release"
date = "2024-07-09"
author = "ramfox"
social_image = ""
+++

Welcome to a new release of iroh, the open-source distributed systems toolkit with tools for connecting devices directly, moving data, and syncing state.

We have been focused on making connecting to other nodes in the iroh network simpler and more reliable. We are also on a quest to get iroh into as many different environments as possible. Both of these goals really show up in iroh v0.20.0: we’ve added an mDNS-like capability to iroh to let you dial by NodeID (even if you don’t have access to the internet). We’ve added websocket support for our relay clients and servers to pave the road toward iroh in the browser. We’ve also added docker images to run iroh in a containerized environment. All that, and a whole lot more!

## 🕸️ Find you in my local network {#find-you-in-my-local-network}

In iroh release [v0.14.0](https://github.com/n0-computer/iroh/pull/2404), we introduced dialing by NodeID. We went from requiring you to pass both a NodeID and a relay URL (or a NodeID and direct addresses) to needing only the NodeID to connect to other nodes on the network.

But what happens if you want to dial by NodeID on a local network that doesn’t have access to the rest of the Internet? Before v0.20.0, this wasn’t possible: having access to a relay URL was necessary to be able to dial by NodeID.

Not anymore! We’ve added a discovery service that uses a variation of mDNS called [`swarm-discovery`](https://github.com/n0-computer/iroh/pull/2404) to find other nodes on the local network. So now: no internet? No problem! Nodes in your local network are dialable by NodeID.

This new `LocalSwarmDiscovery` service is now enabled by default in iroh. If you don’t need it you can disable it by passing a `DiscoveryConfig::Custom` variant to the iroh node `Builder::node_discovery` method.

Checkout [PR #2376](https://github.com/n0-computer/iroh/pull/2376) for more details.

## 🧦 Do you want some websockets in your life? {#do-you-want-some-websockets-in-your-life}

This one should excite everyone asking for iroh in the browser. Adding websocket support to our relays is the first step to making that possible!

Previously, the only way to talk to our relay servers was through HTTP/HTTPS. Our relay clients can now connect to relay servers with websockets, running the relay protocol over websocket `Binary` msgs.

The road to iroh in the browser is long, but we are now well on our way. Read our full roadmap in this [blog post](https://iroh.computer/blog/iroh-and-the-web).

Checkout [PR #2387](https://github.com/n0-computer/iroh/pull/2387) for more details

## 📣 Did you hear about the new gossip API? {#did-you-hear-about-the-new-gossip-api}

Using `iroh-gossip` is now easier than ever. No need to build your own setup anymore, you can just use an iroh node directly:

```rust
// build iroh node
let node = iroh::node::Builder::memory()
    .spawn()?;

// create a topic
let topic = TopicId::from([0u8; 32]);

// add a NodeAddr of a node in the gossip network that is subscribed to that topic
node.add_node_addr(node_addr.clone()).await?;

// get a stream of events from the topic and a sink to send messages to
let (mut sink, mut stream) = node.gossip().subscribe(topic, [node_addr.node_id]).await?;

// send a message to all connected nodes
sink.send(Command::Broadcast("hello".into())).await?;

// receive a gossip event
let msg = stream.next().await?
```

Checkout [PR #2258](https://github.com/n0-computer/iroh/pull/2258) for more details.

## 🐶 Asyncify my FFI {#asyncify-my-ffi}

If you have been using the Python, Swift, or Kotlin SDKs that we provide through our `iroh-ffi` repo, there has been a significant change! The `iroh-ffi` API is now async in all the places where it is async in the rust iroh API.

Not only does this bring our SDKs closer to the functionality of the rust iroh repo, but this refactor also makes it simpler for us to add iroh methods, structs, etc., to the `iroh-ffi` repo in the future.

```kotlin
// kotlin:
// Before
val node = IrohNode("iroh-dir")
val doc = node.docCreate()

// After
val node = IrohNode.persistent("iroh-dir")
val doc = node.docCreate()
```

```python
# python:
# Before
node = IrohNode("iroh-dir")
doc = node.doc_create()

# After
node = await IrohNode.persistent("iroh-dir")
doc = await node.doc_create()
```

If you encounter any issues, please let us know in the [`iroh-ffi`](https://github.com/n0-computer/iroh-ffi) repo.

Checkout [PR #151](https://github.com/n0-computer/iroh-ffi/pull/151) for more details.

## 📦 Shipping a docker container {#shipping-a-docker-container}

We now provide docker images to run iroh in a containerized environment easily! You can build images for `iroh`, `iroh-relay`, and `iroh-dns-server` , using `docker builder` and the `docker/Dockerfile` in the iroh repo.

For instructions on how to build the docker images, take a look at the [repo](https://github.com/n0-computer/iroh/tree/main/docker).

Checkout [PR #2404](https://github.com/n0-computer/iroh/pull/2404) for more details.

## ➡️ Pkarr publishing direct addresses {#pkarr-publishing-direct-addresses}

We now have additional functionality when using our Pkarr/DNS publishing for `Discovery`. If you have relay access disabled on your iroh node, the Pkarr DNS publisher will now publish your direct addresses instead of your (non-existent) relay URL.

These addresses must be public because disabling access to relay nodes means you cannot hole-punch.

Checkout [PR#2417](https://github.com/n0-computer/iroh/pull/2417) for more details.

## ⚠️ Breaking Changes {#breaking-changes}

### Protocol Changes {#protocol-changes}

None!

### API Changes {#api-changes}

-   `iroh-net`

    -   Add `must_use` to `utils::AbortingJoinHandle`
    -   renamed `pkarr_publish` -> `pkarr`
    -   removed `relay::http::server::Protocol::from_url_scheme`
    -   removed `relay::http::ServerBuilder::relay_endpoint`
    -   `iroh_net::defaults` is now split into `prod` and `staging`
    -   `iroh_net::discovery::dns::N0_DNS_NODE_ORIGIN` is now `N0_DNS_NODE_ORIGIN_PROD`
    -   `iroh_net::discovery::pkarr::N0_DNS_PKARR_RELAY` is now `N0_DNS_PKARR_RELAY_PROD`
-   `iroh`

    -   rename `client::Iroh::my_relay` -> `home_relay`
    -   rename `client::Iroh::my_addr` -> `node_addr`
    -   rename `node::Node::my_relay` -> `home_relay`

### But wait, there's more! {#but-wait-there-s-more}

Many bugs were squashed, and smaller features were added. For all those details, check out the full changelog: [https://github.com/n0-computer/iroh/releases/tag/v0.20.0](https://github.com/n0-computer/iroh/releases/tag/v0.20.0).

If you want to know what is coming up, check out the [0.21.0 milestone](https://github.com/n0-computer/iroh/milestone/27), and if you have any wishes, let us know about the [issues](https://github.com/n0-computer/iroh/issues)! If you need help using iroh or just want to chat, please join us on [discord](https://discord.com/invite/DpmJgtU7cW)! And to keep up with all things iroh, check out our [Twitter](https://x.com/iroh_n0).
