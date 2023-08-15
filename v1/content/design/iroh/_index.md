+++
title = "Iroh: IPFS Reimagined"
description = ""
template="design/page.html"
[extra]
section="1."
+++

Iroh is a networking protocol for caching and distributing arbitrary blobs of data in networks with _high churn_. Iroh aims unlock the scaling potential of millions of tiny edge devices. Applications embed Iroh to become a network that grows network power with device count, even when individual devices are only online for seconds at a time, and only provide compute & network resources associated with typical web browsing.

At the technical level, Iroh is an experimental re-implementation of IPFS object storage [1] focused on improving performance, reliability, scalability, and network efficiency. Like IPFS, Iroh is a content addressed system. It uses hashes as identifiers for all data free authority over data from locality, allowing data to originate anywhere, propagate verifiably, and replicate ubiquitously.

Iroh assumes users provide some external solution for ensuring data is available, for example by leaving at least one computer connected to the network, or using a high-availability backing service, similar to [9]. This is distinct from networks like BitTorrent [7], which go to great lengths to preserve content availability, at the expense of saturating resources like uplink capacity. Instead Iroh attempts to effectively diffuse object replication across a network where providers and getters are joining and leaving the network on the order of seconds.

A network that can diffuse work at this timescale brings power law scaling to common internet workloads. The utility of this approach inversely correlates with object size: bigger stuff will work better, because it necessitates longer transfer times that benefit more from request parallelism. We broaden the utility of this approach with _collections_ which aggregate objects.

# Iroh Overview

<img src="/design/iroh/iroh_fig_1_system_overview.svg" />

## Content Addressing

Iroh _hashes_ an object by calculating the BLAKE3 hash of byte contents. Iroh stores the root hash as a _content identifier_ and the intermediate hash as metadata for incremental verification during data transfer. See [2. Content Addressing](/design/content-addressing) for details.

## Content Routing

Iroh uses a Distributed Sloppy Hash Table as a *sloppy pointer machine* that connects content identifiers with available providers of that content. The DSHT is described in [3. DSHT](/design/dsht).


## Data Transfer

Iroh supports a custom multi-peer data transfer protocol and HTTP fetching + whole-object checksumming. See [4. Data Transfer](/design/data-transfer) for more.

<a class="next-page-button" href="/design/content-addressing">
Next: 2. Content Addressing
</a>

---

# References

1. **J. Benet, “IPFS - Content Addressed, Versioned, P2P File System”**<br />
[https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf](https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf)
2. **Trautwein, D. et al: “Design and Evaluation of IPFS: A Storage Layer for the Decentralized Web”**<br />
[https://ipfs.io/ipfs/bafybeid6doxhzck3me366265u3ony6rbuzv7dze7pjuptxeln24b2qvur4?filename=trautwein2022a.pdf](https://ipfs.io/ipfs/bafybeid6doxhzck3me366265u3ony6rbuzv7dze7pjuptxeln24b2qvur4?filename=trautwein2022a.pdf)
3. **blake3**<br />
[https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf](https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf)
4. **bao**<br />
[https://github.com/oconnor663/bao](https://github.com/oconnor663/bao)
5. **CID (Content IDentifier): Self-describing content-addressed identifiers for distributed systems**<br />
[https://github.com/multiformats/cid](https://github.com/multiformats/cid)
6. **WNFS**<br />
[https://whitepaper.fission.codes/file-system/file-system-basics](https://whitepaper.fission.codes/file-system/file-system-basics)
7. **BitTorrent**<br />
[https://www.bittorrent.org/beps/bep_0003.html](https://www.bittorrent.org/beps/bep_0003.html)
8. **multihashes**<br />
[https://multiformats.io/multihash/](https://multiformats.io/multihash/)
9. **Kraken: a P2P-powered Docker registry that focuses on scalability and availability.**<br />
[https://github.com/uber/kraken](https://github.com/uber/kraken)