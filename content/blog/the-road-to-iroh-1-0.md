+++
title = "The road to iroh 1.0"
description = ""
date = "2026-07-09"
author = "Rüdiger Klaehn"
social_image = ""
+++

It is done. After four years of work and various pivots we have released iroh 1.0.

## A trip down github memory lane {#a-trip-down-github-memory-lane}

We have an expanding web site describing *how* iroh works under the hood, but we think it is important to also understand *why* we made the decisions that led to the current iroh. So here is a trip down memory lane / our commit history which highlights major turning points and design decisions.

Perhaps more importantly, this post also covers some things we considered but ended up **not doing**.

<object data="/blog/the-road-to-iroh-1-0/timeline.svg" type="image/svg+xml"><img src="/blog/the-road-to-iroh-1-0/timeline.svg" alt="Timeline of major iroh decisions from 2022 to 2026"></object>

## The early days {#the-early-days}

Iroh started as a rust implementation of [ipfs](https://ipfs.tech/). We got pretty far implementing various ipfs protocols and had interop with existing ipfs implementations working. Our goal with iroh was to target lightweight and resource constrained devices such as mobile phones.

One area where we were unhappy with existing protocols was blob transfer. We started a working group within the ipfs community to come up with a new protocol, called the [move the bytes working group](https://www.youtube.com/playlist?list=PLuhRWgmPaHtQ--aQ5GlgCyKkQYXUfQpVf).

## First steps with QUIC {#first-steps-with-quic}

For that working group, we worked on a proposal for new blob transfer protocol. We wrote a small library called [krakensync](https://github.com/n0-computer/krakensync). Krakensync used [BLAKE3](https://github.com/BLAKE3-team/BLAKE3) exclusively for content addressing because BLAKE3 supports verified incremental streaming of large blobs.

After a few days we had a bare algorithm, and wanted to add networking to it to make the demo feel more real. We had only two days before the next meeting, and adding networking via [rust-libp2p](https://docs.rs/libp2p) seemed impossible (Remember that this was before LLM coding assistants!).

> [!NOTE]
> I had a tiny bit of previous experience with [QUIC](https://www.rfc-editor.org/rfc/rfc9000.html), and remembered from a project of a friend of mine, [quinn-noise](https://docs.rs/quinn-noise) that [quinn](https://docs.rs/quinn) is both hackable and has a simple idiomatic rust API. So I tried to add networking via quinn and found it *an absolute joy* to work with.

## A real world use case {#a-real-world-use-case}

In parallel to working on the ipfs compatible iroh, we worked on a side project to implement a single narrow real world use case: transfer of [deltachat](https://delta.chat/) chat history when provisioning a new device. The technical task was to transfer a single large blob of backup data to a new device. There were hard constraints regarding disk and network usage. And the transfer had to be resumable.

We found that *we could not* implement this very narrow use case with our ipfs based iroh implementation. Doing so would have had less than optimal network performance, and would have pulled in a very large dependency tree.

So we started writing a lightweight sync library from scratch, using QUIC as the networking layer and BLAKE3 verified streaming for large blob transfer.

## Abstraction fatigue {#abstraction-fatigue}

Despite our best efforts, our main project was still far away from the theoretical limits. Meanwhile our sync side project showed what is possible. So we [made the decision](/blog/a-new-direction-for-iroh) to no longer pursue the goal of staying compatible with existing ipfs implementations.

Instead of [multiaddrs](https://github.com/multiformats/multiaddr), endpoints were identified by an [Ed25519](https://www.rfc-editor.org/rfc/rfc8032.html) public key.\
Instead of [multihashes](https://github.com/multiformats/multihash), we had BLAKE3.\
And instead of multiple transport protocols we had just QUIC.

The new iroh was just QUIC based networking using [quinn](https://docs.rs/quinn) and blob transfer using BLAKE3 verified streaming. Compared to the previous version, the functionality was anemic. But the single thing it did, it did with close to optimal performance. It was a lightweight enough dependency that [deltachat could justify including it into their rust code base](https://github.com/chatmail/core/commit/24856f3050be9a7705f9df736ab575fd856454d5). And suddenly we had both networking and sync deployed in a real app used by thousands of people across various platforms (windows, linux, iOS, android). The old code lives on in [beetle](https://github.com/n0-computer/beetle).

## TLS or noise {#tls-or-noise}

We decided to use just QUIC. But QUIC as specified in RFC 9000 has clear client and server roles, where the server is identified by a certificate chain. At the time we had to add a somewhat Rube Goldberg construction on top to make QUIC work for peer-to-peer connections, [a self-signed certificate carrying the real public key in a custom X.509 extension](https://github.com/libp2p/specs/blob/master/tls/tls.md), with a signature binding the two.

Also, rustls is a heavy dependency, and its default crypto provider is a C dependency. So there was a temptation to replace the entire TLS encryption scheme with a protocol based on [noise](https://noiseprotocol.org/) that is made for peer-to-peer connections from the start.

We ended up sticking with TLS as the industry standard. Without using TLS iroh would not really be QUIC, just reuse some of its parts. But we were still unhappy about the self-signed cert.

Thankfully right around the time when we were discussing this [raw public keys](https://www.rfc-editor.org/rfc/rfc7250.html) in TLS support was [merged into rustls](https://github.com/rustls/rustls/pull/2062). So we didn't waste any time and switched to [raw public keys in TLS](/blog/iroh-0-34-0-raw-public-keys) soon after.

## Hole punching {#hole-punching}

One thing we were not yet happy with: for the deltachat chat history transfer to work, both devices had to be in the same network. Ideally this should work in all cases where the two devices are *somehow* connected to the internet. We also wanted these transfers to be *fast*. So what we needed was [hole punching](https://en.wikipedia.org/wiki/Hole_punching_(networking)). We looked at various systems that implement hole punching. Our goal was to get holepunching to work reliably, even at the expense of compromising p2p purity. If we would need a small server to help, so be it.

Of all the existing open source implementations of holepunching, we found the [tailscale](https://tailscale.com/) approach best suited to our requirements. So we implemented something that was initially very similar, with good results. This was a [huge effort](https://github.com/n0-computer/iroh/pull/830), but once we merged it we had hole punch rates to be proud of. In most normal circumstances we punched holes almost immediately, and in the few corporate networks where hole punching was impossible, at least we could still transfer data via relays. It **just worked**.

## Iroh as a batteries included p2p application toolkit {#iroh-as-a-batteries-included-p2p-application-toolkit}

We achieved our goal of having a simple p2p library that just worked. But the API was still anemic. It was something that experienced rust teams such as deltachat could include, but not yet attractive to p2p application developers. So we decided to gradually add more functionality. One of the first things we did was extending the blob related API to expose more functionality for BLAKE3 verified streaming. In parallel we also optimized the verified streaming by implementing some advanced features such as [BLAKE3 chunk groups](https://github.com/n0-computer/iroh/pull/798).

But even with blobs included, it was not enough. We had very useful functionality for experienced rust teams, but at the time that wasn't exactly a large group. So we decided to add a [document abstraction](https://github.com/n0-computer/iroh/pull/1333) that would make iroh viable as a batteries included p2p application development framework, where ideally you would only need to add application specific code.

## Bindings {#bindings}

As part of the push to make iroh approachable to more developers, we started to publish language bindings to almost all major languages. This worked well and was frequently used, but turned out to be a lot of work for us because of the frequent API changes on the road to 1.0.

## Protocol negotiation {#protocol-negotiation}

As we were adding protocols we also had to solve protocol *negotiation*.

One common pattern is to add a [little handshake protocol](https://github.com/multiformats/multistream-select) on each stream where one side can propose a protocol and the other side can either accept or reject. But that would add overhead for *every single stream* and take us further away from just peer-to-peer QUIC.

> [!NOTE]
> We found that complex schemes for protocol evolution are often a mirage. Truly evolving a protocol in a backwards compatible way leads to a combinatorial explosion of variants that have to be tested. It is really hard to get this right.

So we decided to keep things simple and use the [ALPN TLS extension](https://www.rfc-editor.org/rfc/rfc7301.html). The connecting side proposes a list of ALPNs, and the server side either chooses one of the ALPNs or refuses the handshake. This happens directly during the QUIC handshake, so it has no overhead other than the raw bytes of the ALPN string.

All in all we are very happy with this decision. Projects like [Media over QUIC](https://datatracker.ietf.org/group/moq/about/) use QUIC streams extensively in [a very creative way](https://moq-wg.github.io/moq-transport/draft-ietf-moq-transport.html#name-data-streams-and-datagrams), and since we provide just raw QUIC streams we can support these approaches out of the box.

It is not entirely without downsides. The `ClientHello` containing the ALPN is unencrypted, so on-path observers can see which protocol is used by decoding `ClientHello`s. One way to work around this is to use a common ALPN such as `h3` and then just negotiate the actual protocol later. In a future version of iroh we might support [encrypted client hello](https://datatracker.ietf.org/doc/draft-ietf-tls-esni/).

Another consequence of the decision to use ALPNs is that two iroh endpoints talking multiple protocols will have not one but *multiple* connections open (A QUIC connection is always for *exactly one* ALPN). We share some internal state for these connections so that e.g. hole punching doesn't have to start from zero.

### Sendme and dumbpipe {#sendme-and-dumbpipe}

[![sendme](/svg/sendme_icon.svg)](/sendme)[![dumbpipe](/svg/dumbpipe_icon.svg)](https://www.dumbpipe.dev/)

To show off iroh, we published two small tools: [sendme](/sendme) and [dumbpipe](https://www.dumbpipe.dev/). These were meant to just show off different iroh capabilities, but also be useful on their own.

To this day we use sendme every day to send logs around. And there are a large number of popular sendme clones: [Lightning P2P](https://github.com/Kerim-Sabic/lightning-p2p), [alt-sendme](https://github.com/tonyantony300/alt-sendme), [ARK Drop Desktop](https://github.com/ARK-Builders/ARK-Drop-Desktop), [DataBeam](https://github.com/vinay-winai/DataBeam), [sendme-egui](https://github.com/zignig/sendme-egui), and [iroh-send](https://github.com/thiswillbeyourgithub/iroh-send).

Dumbpipe also inspired a number of projects: [pai-sho](https://github.com/cablehead/pai-sho), [iroh-ssh](https://github.com/rustonbsd/iroh-ssh), [do-ssh](https://github.com/doEggi/do-ssh), and [iroh-ssh-android](https://github.com/futpib/iroh-ssh-android). But more importantly it showed **how useful** just direct connections by endpoint id are a building block.

## Address lookup {#address-lookup}

For a long time we did not have the ability to dial an iroh endpoint by endpoint id only. You needed the id of course, but you also needed an additional piece of info: either an ip address or a relay url. Sendme works like this to this day.

But the additional information is not stable. An iroh endpoint can frequently change its public IP address, e.g. when the ISP assigns a new public IP address. It can also change its home relay when it moves to another geographic region. In addition, dealing with tickets is cumbersome for large scale systems where you work with a large number of peers.

In many peer-to-peer projects the mechanism to implement such discovery is a distributed hash table. But our previous experience with DHTs was somewhat traumatic. We deciced very quickly that we did not have the resources to implement a DHT and *get adoption for it*. So just like with the relays, we compromised a bit on peer-to-peer purity. We explored various centralized options such as cloudflare workers.

But right at this time we discovered an emerging project that would allow us to have our cake and eat it too. [Pkarr](https://github.com/pubky/pkarr) is the incredibly simple idea of storing signed DNS records on the [bittorrent mainline DHT](https://en.wikipedia.org/wiki/Mainline_DHT). We ended up using the pkarr format for our centralized address lookup service, but also giving iroh users the option to [use the mainline dht directly](https://docs.rs/iroh-mainline-address-lookup) to get a fully decentralized address lookup system.

> [!NOTE]
> Mainline has some unfortunate limitations that are unlikely to go away any time soon. So [I started writing a DHT](/blog/lets-write-a-dht-1), using on iroh [0-rtt](/blog/0rtt-api) connections. But as of now this is strictly an experiment that pushes the limits for iroh connections, not a production tool.

## Iroh as just connections {#iroh-as-just-connections}

After working on iroh as a batteries included toolkit for some time, the API surface was increasing substantially. And we could not guarantee the same level of quality for all parts of the API. In addition, we noticed that each of our users was using a different subset of the API. The one thing everybody had in common was that they needed dial by endpoint id and connections that reliably hole punch. So we [made the decision](/blog/smaller-is-better) to narrow the scope of what iroh is significantly. From now on iroh would be just direct connections dialed by endpoint id. The other functionality, that several teams depend on, was [moved into separate crates](/blog/iroh-0-28-let-them-have-crates).

## A long term stable release, and the canary series {#a-long-term-stable-release-and-the-canary-series}

We were now at the enviable position that several important projects depended on iroh. But we needed freedom to evolve iroh, and did not want to do so on a feature branch due to previous bad experiences with this approach. So we made our first long term stable release, [0.35](/blog/iroh-0-35-prepping-for-1-0) and started the [canary series](/blog/iroh-0-90-the-canary-series) for people that wanted to stay on the bleeding edge on the way to 1.0.

> [!NOTE]
> In retrospect it would have been fine to call this iroh 1.0. It is a rock solid version of iroh that many projects depend on even today. But we are happy with the decision to develop on main and let people follow along.

## Naming is hard {#naming-is-hard}

In addition to various functionality changes we also spent quite some time thinking about naming. For example, the identity of an iroh endpoint used to be called `NodeId`. Back when iroh came as a large binary with several different built in protocols, this made a lot of sense. Also what is now known as address lookup used to be called just `Discovery`. But we found that discovery isn't really a good name for the process of finding relay or ip addresses for an existing endpoint id. After all you don't *discover* the endpoint id, you just look up additional data for it.

> [!NOTE]
> There are some address lookup providers such as mDNS that *actually* discover new endpoints. But this is not covered by the [AddressLookup trait](https://docs.rs/iroh/latest/iroh/address_lookup/trait.AddressLookup.html).

## Multipath {#multipath}

Iroh was working just fine in most cases. But there were some dark clouds on the horizon. To get one of the main features of iroh, seamless migration of the underlying transport, to work reliably, we had to do some [not so nice hacks](https://github.com/n0-computer/iroh/pull/2835). In the short term this wasn't really a big problem. But we knew that the current approach would limit us substantially in the future.

So we [made the decision](/blog/iroh-on-QUIC-multipath) to fundamentally rework how iroh works under the hood. We were already using multiple paths of course, but QUIC was unaware of all of this. Which was the root cause for various problems.

## Forking quinn {#forking-quinn}

So far we had used quinn and contributed a few improvements. But now we were doing something fundamentally new: extending quinn to support multipath. For a long time we worked with the assumption that we would upstream our changes, but as the diff grew this became increasingly unlikely. So we [decided to fork quinn](/blog/noq-announcement) and maintain our own QUIC implementation, [noq](https://docs.rs/noq).

## Things that didn't make it into 1.0 {#things-that-didn-t-make-it-into-1-0}

### Configurable key algorithms {#configurable-key-algorithms}

A frequent request for iroh was to use key algorithms other than Ed25519. We ended up deciding against it. Many of our current systems such as pkarr address lookup are only ever going to work with Ed25519 keys. So while an iroh version with support for e.g. secp256k1 or P-256 would technically be straightforward, it would make iroh more complex. Our [key encoding](https://www.rfc-editor.org/rfc/rfc7250.html#section-3) for the TLS handshake is already key agnostic, so we can likely add support for additional key algorithms without breaking the wire format.

### Post quantum signatures {#post-quantum-signatures}

Currently standardized post quantum signature algorithms have very large public key sizes. So supporting them would require us to change from the endpoint id *being* the public key to the endpoint id being something *derived from* the public key to keep the size manageable.

> [!NOTE]
> We do support optional [post quantum key exchange](/blog/iroh-post-quantum-handshakes) in iroh 1.0

### Encrypted ClientHello {#encrypted-clienthello}

Encrypted ClientHello has [recently been standardized](https://www.rfc-editor.org/rfc/rfc9849.html). We might want to use it or a very similar mechanism to hide handshake metadata such as the ALPN.

## The road goes ever on and on {#the-road-goes-ever-on-and-on}

In the four years we have been working on iroh we have written a lot of code, without any LLM assistance. We have thrown away almost as much code. What remains is a minimal library that heavily relies on existing standards and gives you authenticated, encrypted, direct connections to any endpoint, addressed by nothing but its public key.

The road to 1.0 was anything but straight, but certainly extremely exciting and interesting. And we are not at the end. Iroh 1.0 just means that the wire format and API are stable. But there are various extension points both in the wire format and in the API, and we continue to improve things under the hood.

Meanwhile we can't wait to see what you build on iroh.
