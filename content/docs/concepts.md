+++
title = "concepts"
description = "common data types & concepts used throughout iroh"
template="docs/page.html"
[extra]
section="cloud"
+++

# Concepts
IPFS intrduces a number of new terms & techniques. We outline some of the more prominent ones here for reference.

## Content IDentifier (CID)
Content IDentifiers look like this:

```
bafybeihjgu5w6wbbxqevdgccj5xm453dbzpkwmkyoepvs3vh6wft4uvf2q
```

A CID contains the _hash_ of it's contents, which is: the result of running the content through a hash function. The CID for different things will always be a different set of characters. Once content is in IPFS, we refer to it by the CID.

Sometimes you may see a shorter form of CID that looks like this:

```
QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
```

These are older "v0" hashes. Iroh can read them, but does not produce them. IPFS evolved past this form because they don't work in case-insensitive DNS parts of URLs and some file systems.

A great tool for learning about CIDs is the [CID inspector](https://cid.ipfs.tech)

## Multiaddress
A multiaddress (often abbreviated `multiaddr`), is a convention for encoding multiple layers of addressing information into a single “future-proof” path structure. It [defines](https://github.com/multiformats/multiaddr) human-readable and machine-optimized encodings of common transport and overlay protocols and allows many layers of addressing to be combined and used together.

<!-- ## Autonat
A technique for traversing across Network Address Translation (NAT) layers in a peer-2-peer context. -->
