+++
title = "Distributed Sloppy Hash Table"
description = ""
template="design/page.html"
[extra]
section="3."
+++

The Iroh distributed sloppy hash table (DSHT) is the primary source of _content routing_ within Iroh. The Hash Table functions as a _pointer machine_ linking content identifiers to provider network addresses who can fulfill requests using an out-of-band data transfer mechanism.

The Iroh DSHT is not a new technology, but rather a composition of prior research into DHTs, tailored to the content routing use case. The foundation of the Iroh DSHT is a Kademlia distributed hash table [1], which uses the exclusive-OR (XOR) distance metric. From there we make modifications to optimize for many writes, security, and performance, all of which is collaged from prior research.

# Introduction

- many writers: In a p2p file-sharing application, all content fetches have the potential to end in one or more writes back to the DHT in the event a node wishes to provide that content back to other nodes.
- natural inequality in compute & networking capabilities across peers
- Incredibly High Churn. End user platforms & devices like web browsers and mobile applications connect directly to the DSHT, often only long enough to get or write a record. This class of user represent the vast majority of nodes in the network, and are expected to churn from the network, ideally in less than one second. We employ stealth nodes to provide these nodes
- Higher security

# Iroh DSHT Overview

## Kademlia

Iroh DSHT uses a base *b* value of 256 bits, which co-mingles content keys and peer identifiers in the same keyspace. Content keys  are BLAKE3 hashes. Peer Identifiers (`peerID`s) are the public component of an ED2559 keypair. Storing unhashed `peerIDs` allows message validation without indirection beyond what is stored in the routing table. Buckets use a default **k** value of 8 but can grow to reduce hops, as discussed later.

We implement an _aggressive lookup strategy_ as seen in [3]: initial lookup parallelism *α* is set to 4, and max number of queries set when a response is received *β* is set to 3.

## Sloppy Storage

Iroh is a peer-2-peer file sharing service, which exhibits a write-on-read pattern. When operating normally, successful content retrieval ends with a new “provider record” written back to the DHST, signaling the peer is able to provide newly fetched content back to others. DHTs are originally designed around a single-writer, many-reader use case. To accommodate this difference we relax consistency guarantees for writes & reads to improve performance in the presence of a more even read/write ratio.

Iroh DSHT implements a *sloppy storage layer,* as described in [5]. Any key in the DSHT can store multiple values, and the API for `get(key)` need only return some subset of the values stored for a key. Nodes have a maximum number of values they will store for a key, and `put` requests that exceed this maximum are spread across multiple nodes.

Our implementation of `get(key)` returns an asynchronous channel of result messages, and provides a cancellation to interrupt further result traversal.

## Stealth & Service Nodes

We intend to use **one** system for all content routing within iroh, regardless of device capabilities or usage patterns. 

Acknowledging the natural disparity in peer capabilities, nodes are split into *stealth* and *service* types, as described in [7]. Service nodes are “servers” that remain online, while stealth nodes are “clients” that communicate through service nodes. Nodes participating in the network are able to assume either role. Nothing in practical terms should stop a low-power device like a phone from operating as a service node, given such a case is required.

All nodes begin as stealth nodes, and only “upgrade” themselves to being service nodes once a number of connectivity & uptime checks have been passed. As a result, the process of joining the DSHT starts

### Service Nodes

Service nodes are full participants in the DSHT. They store records and route requests, incurring the full maintenance and traffic overhead of DSHT participation. Service nodes also handle requests on behalf of stealth nodes.

For the rest of this paper “nodes” are assumed to be service nodes, unless specifically designated as a “stealth node”. 

### Stealth Nodes

Stealth nodes are able to publish and retrieve keys, but are not stored in routing tables, and cannot store values.

To join the network, stealth nodes perform the first half of the network joining procedure: using a  gathering addresses of available peers. Stealth nodes persist their routing tables locally between lookups to speed up network joins in the future.

### Node Connectivity Properties

Service nodes should be publicly dial-able on the open internet. Service node addresses should be *transitive*: for a service node A, node C can dial A with an address given to it by node B, which can also dial A. Service node addresses should also be *persistent:* for the duration the service node is running, connectivity properties should remain the same.

We do not use any form of Session Traversal Utilities for NAT (STUN) for service nodes. As described in [6], DHT messaging patterns involve a high number of very short messages, which makes tools like STUN an impractical overhead. Because stealth nodes only initiate requests, they are able to participate in the network without utilizing NAT traversal techniques.

STUN is, however, a completely acceptable pattern for establishing a connection to an address passed as a _value_ by the DSHT, which is beyond the scope of this paper. We intend to use STUN extensively for data transfer. To increase the utility of the network, we build on the assumption that all service nodes are publicly accessible, and incorporate the transport-reflexive addresses into DSHT PING message responses, effectively turning all service nodes into STUN servers.

### Variable K bucket size

The default _k_ value bucket size is 20. However, larger values of _k_ reduce the number of hops required at the cost of increased memory, and as demonstrated in [8]. To reduce hops, buckets are enlarged in proportion to the probability of being used in a lookup, with the first buckets holding 128, 64, and 32 nodes respectively. All remaining buckets hold the recommended default 20 values.

## Routing Table Management

We implement the NICE routing table refresh strategy as described in [3]: On a repeating interval (for example: every 10 seconds), a node selects a bucket and pings the most stale node in that bucket. If the bucket doesn’t respond, it is evicted.

We also include a bias toward nodes with low round-trip-times (RTTs). a newly discovered nodes that has a lower RTT than an existing node can replace it in the bucket. We have to exercise caution with this technique, however. From the S/Kademlia paper [2]:

> [Eclipse Attacks] can be prevented first, if a node can not choose its nodeId freely and secondly, when it is hard to influence the other nodes routing table. **Because Kademlia favors long-living nodes in its k-buckets and nodes are only added**, if a bucket is not already full, the latter is easy to achieve as soon as the network has bootstrapped 


## Security

All values stored in the Iroh DSHT must be signed by their authoring peerID. All messages must use a nonce value to prevent replay attacks. Nonces are an incrementing numerical counter, which double as a method of expiring prior messages with a lower nonce value.

### Service node crypto puzzle


<a class="next-page-button" href="/design/data-transfer">
Next: 4. Data Transfer
</a>


# References

1. **Kademlia: A Peer-to-peer Information System Based on the XOR Metric**
[https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
2. **S/Kademlia: A Practicable Approach Towards Secure Key-Based Routing**
[https://www.researchgate.net/publication/4319659_SKademlia_A_practicable_approach_towards_secure_key-based_routing](https://www.researchgate.net/publication/4319659_SKademlia_A_practicable_approach_towards_secure_key-based_routing)
3. **Sub-Second Lookups on a Large-Scale Kademlia-Based Overlay**
[https://www.diva-portal.org/smash/get/diva2:436670/FULLTEXT01.pdf](https://www.diva-portal.org/smash/get/diva2:436670/FULLTEXT01.pdf)
4. **Beehive: O(1) Lookup Performance for Power-Law Query Distributions
in Peer-to-Peer Overlays**
[http://www.cs.cornell.edu/people/egs/cs615-spring07/beehive-nsdi.pdf](http://www.cs.cornell.edu/people/egs/cs615-spring07/beehive-nsdi.pdf)
5. **Sloppy hashing and self-organizing clusters (Coral DSHT)**
[https://www.cs.princeton.edu/~mfreed/docs/coral-iptps03.pdf](https://www.cs.princeton.edu/~mfreed/docs/coral-iptps03.pdf)
    - our rundown: [https://www.youtube.com/watch?v=-OUUXIldZas](https://www.youtube.com/watch?v=-OUUXIldZas)
6. **Connectivity properties of Mainline BitTorrent DHT nodes**
[https://www.diva-portal.org/smash/get/diva2:398948/FULLTEXT01.pdf](https://www.diva-portal.org/smash/get/diva2:398948/FULLTEXT01.pdf)
7. **Stealth distributed hash table: a robust and flexible super-peered DHT**
[https://eprints.lancs.ac.uk/id/eprint/12362/1/conext.pdf-05f9305647726711c72eef5bc3f2ab19[1].pdf](https://eprints.lancs.ac.uk/id/eprint/12362/1/conext.pdf-05f9305647726711c72eef5bc3f2ab19%5B1%5D.pdf)
8. **Stutzbach. D: “Improving Lookup Performance over a Widely-Deployed DHT”, in INFOCOM. IEEEE, 2006**
[http://mirage.cs.uoregon.edu/pub/infocom06-kad.pdf](http://mirage.cs.uoregon.edu/pub/infocom06-kad.pdf)
9. **Balduf, L et al: “Monitoring Data Requests in Decentralized Data Storage Systems: A Case Study of IPFS”**
[https://arxiv.org/pdf/2104.09202.pdf](https://arxiv.org/pdf/2104.09202.pdf)
10. **O’Connor et al: “BLAKE3: one function, fast everywhere”**
[https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf](https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf)
11. **Bernstein et al: “High-speed high-security signatures - Ed25519”**
[https://ed25519.cr.yp.to/ed25519-20110926.pd](https://ed25519.cr.yp.to/ed25519-20110926.pd)
12. **IETF RFC 5389: Session Traversal Utilities for NAT (STUN)**
[https://datatracker.ietf.org/doc/rfc5389/](https://datatracker.ietf.org/doc/rfc5389/)
13. **libp2p Kademlia DHT specification**
[https://github.com/libp2p/specs/tree/master/kad-dht](https://github.com/libp2p/specs/tree/master/kad-dht)
14. **Chord/Pastry/Kademlia perf comparison:** [https://beei.org/index.php/EEI/article/download/1449/1044](https://beei.org/index.php/EEI/article/download/1449/1044)