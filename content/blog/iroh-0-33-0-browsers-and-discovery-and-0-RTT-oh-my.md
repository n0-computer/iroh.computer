+++
title = "iroh 0.33.0 - Browsers and Discovery and 0-RTT, oh my!"
description = "Iroh 0.33 release"
date = "2025-02-25"
author = "ramfox, matheus23"
social_image = ""
+++

Welcome to a new release of `iroh`, a library for building on direct connections between devices, putting more control in the hands of your users.

We’ve got some exciting features for you this round! Iroh `v0.33` compiles to Wasm and can be used in the browser, `Discovery` now includes a way to pass in user-defined data, `iroh::Endpoint`’s now allow you to subscribe to a stream that updates with every newly discovered node, and we’ve enabled 0-RTT QUIC connections.

## 🖥️ Browsers, now in `iroh` {#browsers-now-in-iroh}

Iroh `v0.33` compiles to Wasm and can be used in the browser!

Not only that, but [`iroh-gossip`](https://github.com/n0-computer/iroh-gossip), too!

Can’t believe it? See these two examples we’ve cooked up:

-   An [iroh echo server in the browser](https://github.com/n0-computer/iroh-examples/tree/main/browser-echo). Check it out [in action](https://n0-computer.github.io/iroh-examples/main/browser-echo/index.html)!
-   An [browser chat room UI](https://github.com/n0-computer/iroh-examples/tree/main/browser-chat) based on the [iroh gossip chat example](https://iroh.computer/docs/examples/gossip-chat). Check it out [in action](https://n0-computer.github.io/iroh-examples/main/browser-chat/index.html)!

We’ve had this on the roadmap for some time and are extremely excited to have reached this milestone. Keep in mind there are **some limitations** for `iroh` in the browser, such as not being able to establish direct connections right now.

There is a lot to cover here, so for further info [take a look at the new page on our website](https://iroh.computer/docs/wasm-browser-support) that describes the features, limitations, and future plans for browser/Wasm work in `iroh`. Also, take a [look at the troubleshooting discussion](https://github.com/n0-computer/iroh/discussions/3200) on our github for fixes to typical issues that come up when compiling `iroh` to WebAssembly.

## 🌐 Discovery Changes {#discovery-changes}

We’ve implemented two new features involving `Discovery` for this release! First, allowing users to publish and discover user-defined data. Second, creating easier APIs for users to track all of the nodes that have been discovered by `iroh`.

### 🦾 User-Defined Data {#user-defined-data}

Folks have been asking for this feature for a while and we are thrilled to finally have it: you can now add user-defined data to be published and resolved during `Discovery`!

The original ask from our users was to be able to receive information about what ALPNs the nodes they have discovered speak. Or, to be able to put in a special “application specific” string, that would help the app developer understand if a node they have discovered is useful in their network. But you can use it any way you want.

This data is totally opaque and never read by `iroh`. As long as it can be encoded/represented by UTF-8 string of 245 bytes (so it can fit into a DNS TXT record), you can put in whatever you need!

Check out PR [https://github.com/n0-computer/iroh/pull/3176](https://github.com/n0-computer/iroh/pull/3176) for more details.

### 🌊 subscription stream {#subscription-stream}

We do not maintain or keep around any sort of address book in `iroh`. If an `iroh` node is shutdown, it doesn’t contain any records of the nodes it discovered or communicated with once it has been spun back up.

We give ways for folks to export any connection information for themselves (`iroh::Endpoint::remote_info_iter`) before shutting down, but this specifically does not include the user-defined data that we discover during `Discovery` (since `iroh` does not read or store this information). We now offer a new method `iroh::Endpoint::discovery_stream` that returns a stream of `DiscoveryItem`s. All information that `iroh` has discovered will be passed along on that stream, that way our users can build up their own address books if that information is important for them to keep around!

Check out PR [https://github.com/n0-computer/iroh/pull/3181](https://github.com/n0-computer/iroh/pull/3181) for more details!

## ⚡ 0-RTT {#0-rtt}

0-RTT allows you to skip a round-trip if you have connected to the given endpoint before and and stored the TLS session ticket from the previous session.

Iroh `v0.33`, by default, will cache up to 8 session tickets per endpoint you connect to, and remember up to 32 endpoints maximum.

This cache only lives in-memory. We might add customization to the `EndpointBuilder` in the future to allow for customizing this cache (allowing you to persist it), but that obviously has security implications, so will need careful consideration.

You can enable 0-RTT via the `Endpoint::connect_with_opts` function, which - unlike `Endpoint::connect` - returns a `Connecting`, a state prior to a full `Connection`. By calling `Connecting::into_0rtt` you can attempt to turn this connection into a full 0-RTT connection. However, security caveats apply. See that function's documentation for details.

Checkout PR [https://github.com/n0-computer/iroh/pull/3163](https://github.com/n0-computer/iroh/pull/3163) for more!

## ⚠️ Breaking Changes {#breaking-changes}

-   iroh
    -   removed
        -   `iroh::test_utils::create_dns_resolver` is removed, use `iroh::dns::DnsResolver::new` instead
        -   `iroh::dns::resolver` and `iroh::dns::default_resolver` are removed. There is no static, global DNS resolver anymore. If you want to share a DNS resolver between endpoints, create the resolver yourself with `iroh::dns::DnsResolver::new` and clone it into the endpoint builders (in `EndpointBuilder::dns_resolver`). If you want to reuse the DNS resolver from an endpoint, you can access it with `Endpoint::dns_resolver` and clone it to wherever you need it.
        -   `iroh::dns::node_info::{IrohAttr, TxtAttrs, node_id_from_hickory_name}` are no longer public. Use `iroh::dns::DnsResolver::lookup_node_by_id` or `iroh::dns::DnsResolver::lookup_node_by_domain_name` to lookup node info from DNS.
        -   `iroh::dns::node_info::{to_z32, from_z32}`are removed. Use the methods on `iroh::dns::node_info::NodeIdExt` trait instead.
        -   `iroh::dns::ResolverExt` is removed. Use the methods on `iroh::dns::DnsResolver` instead.
        -   `iroh::discovery::Discovery::publish` now takes `data: &NodeData` as its single argument. `iroh::discovery::NodeData` is a re-export of `iroh_relay::dns::node_info::NodeData`, and contains relay URL and direct addresses. See docs for `NodeData` for details.
        -   `iroh::Endpoint::connect_with` was removed, use `iroh::Endpoint::connect_with_opts` instead
    -   changed
        -   `iroh::dns::DnsResolver` used to be a type alias and now is a reexport of `iroh_relay::dns::DnsResolver` struct
        -   `iroh::dns::node_info` module is now a reexport of `iroh_relay::dns::node_info`
        -   `iroh::discovery::dns::{N0_DNS_NODE_ORIGIN_PROD, N0_DNS_NODE_ORIGIN_STAGING}` are now reexports of `iroh_relay::dns::{N0_DNS_NODE_ORIGIN_PROD, N0_DNS_NODE_ORIGIN_STAGING}`
        -   The methods in `iroh::dns::DnsResolver` now take an `impl ToString` instead of `impl hickory_proto::rr::domain::IntoName` for their `host` argument
        -   `iroh::discovery::DiscoveryItem` no longer has any public fields. There are now getters for the contained data, and constructors for createing a `DiscoveryItem` from a `NodeInfo`.
        -   `iroh_relay::dns::node_info::NodeInfo` is changed.
            -   `NodeInfo::new` now has a single `NodeId` argument. Use `NodeInfo::with_direct_addresses` and `NodeInfo::with_relay_url` to set addresses and relay URL. Alternatively, use `NodeInfo::from_parts` and pass a `NodeData` struct.
            -   `NodeInfo` now has two public fields `node_id: NodeId` and `data: NodeData`, and setter and getter methods for the relay URL and direct addresses.
        -   `iroh::discovery::pkarr::PkarrPublisher::update_addr_info` now takes a `NodeData` argument
        -   `iroh::endpoint::Connection::into_0rtt` now returns `iroh::endpoint::ZeroRttAccepted`, instead of `iroh_quinn::ZeroRttAccepted`

### But wait, there's more! {#but-wait-there-s-more}

Many bugs were squashed, and smaller features were added. For all those details, check out the full changelog: [https://github.com/n0-computer/iroh/releases/tag/v0.33.0](https://github.com/n0-computer/iroh/releases/tag/v0.33.0).

If you want to know what is coming up, check out the [v0.34.0 milestone](https://github.com/n0-computer/iroh/milestone/41), and if you have any wishes, let us know about the [issues](https://github.com/n0-computer/iroh/issues)! If you need help using iroh or just want to chat, please join us on [discord](https://discord.com/invite/DpmJgtU7cW)! And to keep up with all things iroh, check out our [Twitter](https://x.com/iroh_n0).
