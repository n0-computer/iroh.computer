+++
title = "Introduction"
description = ""
template="design/page.html"
[extra]
section="0."
+++

# Design Documents

These _design documents_ describe at a high level how we are building Iroh. Think of them as a constantly evolving whitepaper: Design documents should help you reason about how iroh might work one day.

**These design documents are a work in progress. They change often, integrating feedback & research as we go.** Each document ends with a changelog. A fine-grained history is available [on github](https://github.com/n0-computer/iroh.compute). Our goal with design documents is to present a single source of truth for our research. We gather feedback from numerous places ([github discussions](https://github.com/n0-computer/iroh/discussions), [twitter](https://twitter.com/n0computer), [meetings](https://www.youtube.com/watch?v=XMLiq9d50Fs), [chats](https://discord.com/invite/ipfs), etc.) and integreate them here.

## These are not specs

We're reserving the word _specs_ for finished, detailed descriptions of how Iroh actually works. You should be able to write an interoperable implementation of Iroh from specs. Iroh is currently pre-1.0 sofware, and has no formalized specs. 

## These are not docs

Our [docs](/docs) describe released versions of Iroh. If you want an accurate description of actual working software, head there.


## Discussion

The best way to influence these documents is to share your views on the Iroh [github discussion](https://github.com/n0-computer/iroh) forum. Numerous conversations are already in progress there, please search before posting a new topic.

## Evaluation

The only way to know if this design works is to build it, test it, put it into production and measure the results. We work hard to take a measurements-focused approach to designing distributed systems. **Our [perf suite](https://perf.iroh.computer) is the primary set of figures we use to evalaute designs.** The results we gather from continual experimentation directly impacts these design documents.


<a class="next-page-button" href="/design/iroh">
Next: 1. Iroh
</a>