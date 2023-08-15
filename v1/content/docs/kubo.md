+++
title = "kubo compatibility"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

If you currently use [kubo](https://github.com/ipfs/kubo), or are building a system that interacts with kubo, here's what you need to know about Iroh:

## Iroh is an IPFS system

We call Iroh IPFS because we're trying to iterate on an improved design of IPFS, not an "IPFS-like-thing". Iroh is fully content-addressed, uses CIDs, verifies hashes on transfer, is built as a peer-2-peer system, and will contain a content routing solution to resolve any hash. Our core belief is we can create _more_ IPFS users with an implementation that focuses on new use cases like mobile devices. We've made numerous different design decisions under the hood to build on lessons we've learned after numerous years of work within the community. We're trying to grow the IPFS pie, **not** create a fork.

## Iroh is **not** currently compatible with kubo

If you add something to Iroh, you can't plug the resulting CID into [ipfs.io](https://ipfs.io). It will fail, because [kubo](https://github.com/ipfs/kubo) doesn't currently integrate with Iroh.

The divide between Iroh & Kubo is a huge barrier that we are working hard to address. We're doing our best to balance our belief that we need to keep Iroh as a small tool that does one thing well with real world user concerns, like the need to, you know, get IPFS stuff with an IPFS implementation. Long term, we want to end in a place that is both performant and compatible, it's just going to take time. We need to stablize Iroh, get it specified, and work with the kubo team to chart a path forward for interop.

## Kubo and Iroh can be bridged today

Then again "integrating" can be simple: take the content you get from Iroh & add it to kubo, or vice-versa. The answer may not be satisfying, but it is practical. You will end up with two different hash representations for the same content, and yeah, that part could be way better. Working on it!

Our next step is to get moving on a set of utility crates & CLI tools that help close the gap. We're planning a set of use-case-driven examples at [tea shop](https://github.com/n0-computer/tea-shop), which will showcase different ways to combine Iroh & kubo to solve real problems. If you have an integration question or use case, please reach out on our [github discussion](https://github.com/n0-computer/iroh/discussions).


