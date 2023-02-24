+++
title = "concepts"
description = "common data types & concepts used throughout iroh"
template="design/page.html"
[extra]
section="design"
+++

# Concepts
IPFS intrduces a number of new terms & techniques. We outline some of the more prominent ones here for reference.

## Content IDentifier (CID)
Content IDentifiers look like this:

```
bafybeihjgu5w6wbbxqevdgccj5xm453dbzpkwmkyoepvs3vh6wft4uvf2q
```

A CID contains the _hash_ of it's contents, which is: the result of running the content through a hash function. The CID for different things will always be a different set of characters. Once content is in IPFS, we refer to it by the CID. A great tool for learning about CIDs is the [CID inspector](https://cid.ipfs.tech). Iroh only produces CIDs that use the BLAKE3 hashing function.