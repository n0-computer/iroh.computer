+++
title = "A new iroh-gossip release and the road to 1.0"
description = "iroh-gossip 0.102 fixes a lot of bugs, and a roadmap for iroh-gossip 1.0"
date = "2026-10-30"
author = "Franz Heinzmann (Frando)"
social_image = ""
+++

iroh-gossip is a protocol to broadcast messages to a swarm of peers, without central coordination. It is one of the most used iroh protocols, and often forms the backbone for real-time communication across online endpoints of apps.

Now that iroh 1.0 is out of the door, we finally have more capacity to work on our protocols again. And today we released iroh-gossip version 0.102.0, which fixes many long-standing bugs and increases reliability and efficiency of iroh-gossip considerably.

This is also the last release on the current wire protocol. For the upcoming iroh-gossip 1.0 release, we have a couple of changes planned that need a wire protocol. The second half of this post describes our plans, to which we welcome your feedback!

### So many fixes

While iroh-gossip fared rather well in production already, we had a number of long-standing bugs around connection lifecycle management, recovery, and dealing with slow or stalled peers in the swarm. We're happy to report that this release fixes many of them, and we're quite confident that this is the best iroh-gossip release yet :)

#### Slow peers no longer block a node

Before 0.102, a node sent to each peer through a queue of 64 messages, and waited when that queue was full. So one peer that read slowly, or stopped reading, stopped every topic on the node. Messages from all other peers stopped too.

Now each peer has its own queue of 1 MiB, and the node never waits on it. When a message does not fit, the node drops it for that peer and announces it again later. The peer can then fetch it while the message is still cached. A publisher waits only when the queues to all its eager neighbors are half full, because then its own uplink is most likely the limit. It waits at most 100 ms at a time. ([#185])

We measured this with [patchbay]. The lab has 10 nodes, and the slow ones are on 1 Mbit/s links. The publisher sends 1 KB messages for 60 s. Each cell is the median of three runs, as 0.101 → 0.102.

| Scenario | Messages sent | Received per slow node | p99 latency of healthy nodes |
|---|---|---|---|
| 1 slow node, 250 msg/s | 5870 → 15001 | 3106 → 3550 | 29 s → 90 ms |
| 8 slow nodes, 250 msg/s | 4480 → 15001 | 4115 → 5414 | 44 s → 10 ms |
| 1 slow node, 3 publishers on 2 topics | 7141 → 15001 | 3925 → 3496 | 32 s → 230 ms |
| 3 slow nodes, 100 msg/s | 4638 → 6001 | 4187 → 3927 | 21 s → 20 ms |

With 0.101, the slow nodes set the pace for everyone: the publisher got out between 30 and 77 % of its messages. With 0.102, the publisher keeps its rate, and the healthy nodes keep their latency. The slow nodes receive about as many messages as before, because their link is the limit. They miss the rest.

One case is still weak. With eight slow nodes out of ten, the one healthy node receives data only through slow relays. In one run, it received 37.7 % of the messages.

0.102 also fixes two other cases that blocked a node. A publisher that always had a message ready starved everything else. A peer that sent half a stream header blocked the other streams of its connection. ([#186])

#### Correctness fixes and regression tests

Both papers report how their protocol behaves in simulation, for example how fast a swarm recovers after half its nodes fail. We turned these claims into tests that run in our simulator. At first, 10 of these tests failed. With the fixes below, all of them pass on 50 random seeds. ([#191])

- A node that lost all its neighbors did not look for new ones. It stayed alone until the app joined again. Now it joins again through the peers that the app joined with. It also tries one of its recent neighbors, in case those peers are gone. ([#192])
- A node now looks for new neighbors before it has none left, also after a failed dial.
- The first shuffle fills the list of backup peers. It now runs one second after a join instead of after one minute.
- Late messages from a former neighbor no longer add it back to the tree.

#### Other fixes

- **Memory leaks.** Several maps kept entries for peers that left, so the memory of long-running nodes grew without limit. ([#161])
- **Unused connections.** A connection stayed open forever, even when no topic used the peer anymore. Now it closes five seconds after it becomes unused. ([#178], [#195])
- **Restarted peers.** A peer that restarted and joined again quickly could get no reply to its join. ([#161])
- **Lost peers.** When a connection to a peer closed before the peer became a neighbor, the node never dialed that peer again. ([#178])
- **Oversized messages.** `broadcast` returned `Ok` for a message over the size limit. The node then dropped the message without notice. ([#187])
- **Shutdown.** Shutting down the tokio runtime no longer makes the gossip actor panic. ([#183])
- [TODO, if merged before the release] **Fewer dials in a full swarm.** A node with too few neighbors asked every full peer for a slot every five seconds, each time on a new connection. Now it asks at most three peers at a time, and waits longer after each round, up to one minute. ([#196])

### Swarms with old and new nodes

You can run 0.102 nodes and older nodes in the same swarm, and update one node at a time.

This needed extra work. Nodes up to 0.101 have a bug ([#155]). When the connection to a peer that is not their neighbor closes, they keep a dead handle for that peer. They lose all later messages to it, until the peer dials them again. Because 0.102 closes unused connections, old nodes would hit this bug often.

So a 0.102 node adds a flag to its stream headers. The flag says "I can handle closed connections", and old nodes ignore it. A new node closes an unused connection only after the peer sent this flag. Connections to old nodes stay open as before, so for them the leak stays until they update. ([#189])

### Thanks

Several of these fixes build on pull requests and issues from the community:

- @drlukeangel, @caiogondim, and @jgrund worked on the leaks ([#145], [#146], [#147], [#154]).
- @adiibanez and @javruben reported and worked on slow peers ([#47], [#143]).
- @TapGhoul found the dead handle bug ([#155]).

Thank you!

### Next: iroh-gossip 1.0

Our plan is to change the wire protocol in the next release, and to release it as iroh-gossip 1.0. We know that wire changes are hard for gossip users, because every node of a swarm has to update. But the features that users ask for most need them. After 1.0, we want to stop changing the wire. So we are writing the new protocol down as a specification first. [TODO: link to the draft.]

Here is what the current draft contains. All of it can still change.

#### Authorized topics

Today, anyone who knows the topic id and one online member can join a swarm. A secret topic id is the only access control. To remove someone, you have to move everyone to a new topic id.

We plan to let a node present a token when it opens a topic on a connection. The receiving node would pass the token to a verifier that the app provides, and the app would accept or reject the peer. The default verifier would accept everyone, so apps without this need would change nothing.

iroh-gossip would treat the token as opaque bytes, so the app decides what it means. It can be a shared secret or a signed capability, for example. Until the app accepts a peer, the node would send it only membership messages and no data. A node would never forward a token to other peers.

We want to publish examples for shared secrets and for capability tokens. One rule will matter for all of them: bind the token to the endpoint id of its holder. Otherwise a peer that saw your token can use it as its own.

### One broadcast tree per sender

Today, all senders of a topic share one Plumtree tree. When a node gets a message twice, it makes the link of the duplicate lazy. This removes a cycle from the tree, and with one sender it works well.

When several nodes send at the same time, their duplicates arrive on different links of the same cycle. The cycle then loses more than one link, and the tree splits. Most messages then arrive only after a lazy neighbor asks for them, and each request adds a timeout. In a simulation of 100 nodes, two concurrent senders reach half as many nodes through the tree as one sender. Five senders reach a tenth.

The Plumtree paper already recommends a tree per sender, and that is our plan for 1.0. Every message would name the tree of its sender, and each node would keep its eager and lazy links per tree. In our prototype, a tree costs a node about 1.4 KB. Nodes would cap the number of trees, and drop the trees they have not used for a while. A dropped tree costs one flood of the next message of that sender. In a first test with four senders on one machine, the prototype moved about eight times more messages per second.

#### A clear model for connections

Much of the work in 0.102 went into connections. The hardest part is a restarted peer, because the current protocol cannot tell it apart from a late connection of its previous run.

Our plan is a random session id that each node picks for each peer, and sends with every stream. A node would then see at once when a peer restarted, and drop the state of the old run. A node would send on one connection per peer. When any connection to the peer ends, both sides would end the session and clean up once, and the app would get one clear signal. The compatibility rules of 0.102 would go away, and every unused connection would close.

We also want to give each topic a separate stream for membership messages. A membership message would then never wait behind a megabyte of data, and a leave and a rejoin would keep their order. In 0.102, a peer can still read a `Join` before an earlier `Disconnect`, and then drop a neighbor that just joined.

#### Migration

The draft uses a new protocol name (ALPN), so 0.102 and 1.0 nodes will not talk to each other. We don't plan to add backwards compatibility. This means that once you want to move to iroh-gossip 1.0, you will either have to update all your users at the same time, or ship both iroh-gossip 0.102 and 1.0 in your app for a while. While not ideal, this is what it is, and shipping two versions for a while is not too bad. Be assured that this will be the last breaking change for a long time. We are designing the new wire protocol such that we can add extensions over time without breaking old clients.

We want your feedback on the design before we finish it. [TODO: link to the wire draft or tracking issue.]

Please try 0.102 and tell us how it works for you, on [GitHub] or on Discord.

## The changes in detail

#### Breaking changes

- The event and command enums in `api` and `proto` are now `#[non_exhaustive]`. Add a wildcard arm to your matches. ([#198])
- `metrics::Metrics` is now `#[non_exhaustive]`. Create it with `Metrics::default()`, not with a struct literal. ([#198])

#### Behavior changes

These are not semver-breaking, but your app may notice them:

- A broadcast can wait, for at most 100 ms at a time, while the queues to all eager neighbors of its topic are half full. ([#185])
- A full send queue drops data for that peer. A membership message that does not fit, or a write that stalls for 60 s, closes the connection. ([#185])
- `broadcast` and `broadcast_neighbors` return `ApiError::TooLarge` for content over `max_content_size`. ([#187])
- A connection closes five seconds after no topic uses the peer, also a connection that the app passed to `Gossip::handle_connection`. ([#178])
- `Gossip::handle_connection` expects an accepted, server-side connection. ([#185])
- A rejoin can dial a peer that the app did not name: one of the recent neighbors of the node. ([#192])

#### New features

- [#187] `GossipSender::max_content_size` and `GossipTopic::max_content_size` return the largest content that a broadcast takes. An RPC client asks its server once.
- [#185] `Builder::send_queue` and `QueueOptions` set the size of the send queue to each peer. The new metrics `msgs_dropped` and `peers_send_queue_full` count the messages that a full queue dropped, and the connections that it closed.
- [#192] A node with no neighbors and no backup peers also rejoins through one of its last eight neighbors.
- [#191] `proto::Ttl` and `proto::Round` are now public. Four public config fields used these types before.

#### Fixes

- [#185] A peer that read slowly, or not at all, stalled the gossip actor. Every topic and every other peer stopped with it.
- [#186] A publisher with a command always ready starved the actor, and half a stream header blocked all streams of a connection.
- [#161] State for departed peers leaked, and a topic could close a connection that another topic still used.
- [#178] Unused connections never closed. A connection that closed before the peer became a neighbor left a dead handle, and later messages to that peer were lost.
- [#189] A node closes unused connections only to peers that handle it, so nodes up to 0.101 keep working.
- [#195] A node also closes a connection on which neither side ever sent.
- [#191] A node rejoins when it has no neighbors left, refills its neighbors before it runs out, and shuffles soon after a join.
- [#187] `broadcast` of an oversized message returned `Ok`, and the node dropped the message later without notice.
- [#183] Shutting down the tokio runtime made the actor panic.
- [#201] The log shows a duplicate message with its short hash.

[HyParView]: https://asc.di.fct.unl.pt/~jleitao/pdf/dsn07-leitao.pdf
[Plumtree]: https://asc.di.fct.unl.pt/~jleitao/pdf/srds07-leitao.pdf
[patchbay]: https://github.com/n0-computer/patchbay
[GitHub]: https://github.com/n0-computer/iroh-gossip
[#47]: https://github.com/n0-computer/iroh-gossip/issues/47
[#143]: https://github.com/n0-computer/iroh-gossip/pull/143
[#145]: https://github.com/n0-computer/iroh-gossip/issues/145
[#146]: https://github.com/n0-computer/iroh-gossip/pull/146
[#147]: https://github.com/n0-computer/iroh-gossip/pull/147
[#154]: https://github.com/n0-computer/iroh-gossip/pull/154
[#155]: https://github.com/n0-computer/iroh-gossip/issues/155
[#161]: https://github.com/n0-computer/iroh-gossip/pull/161
[#178]: https://github.com/n0-computer/iroh-gossip/pull/178
[#183]: https://github.com/n0-computer/iroh-gossip/pull/183
[#185]: https://github.com/n0-computer/iroh-gossip/pull/185
[#186]: https://github.com/n0-computer/iroh-gossip/pull/186
[#187]: https://github.com/n0-computer/iroh-gossip/pull/187
[#189]: https://github.com/n0-computer/iroh-gossip/pull/189
[#191]: https://github.com/n0-computer/iroh-gossip/pull/191
[#192]: https://github.com/n0-computer/iroh-gossip/pull/192
[#195]: https://github.com/n0-computer/iroh-gossip/pull/195
[#196]: https://github.com/n0-computer/iroh-gossip/pull/196
[#198]: https://github.com/n0-computer/iroh-gossip/pull/198
[#201]: https://github.com/n0-computer/iroh-gossip/pull/201
