+++
title = "iroh docs"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# What is iroh?
Starting with v0.3.0, Iroh is a ground-up reimagination of the InterPlanetary File System (IPFS) focused on performance.

Iroh v0.3.0 is an early proof-of concept for sending hash-verified data from one point to another. It contains basic implementations of [content addressed blobs](/design/iroh/#content-addressed-blobs), [collections](/design/iroh/#collections), and a point-to-point [data transfer protocol](/design/iroh/#data-transfer).

## Beetle
Prior to version 0.3.0, Iroh was been built as an implementation of the InterPlanetary File System (IPFS) focused on interoperability with Kubo, the reference implementation of IPFS. We've  Our rationale is outlined in this [blog post](https://www.n0.computer/blog/a-new-direction-for-iroh/). Rather than delete the IPFS implementation we’ve built so far we have renamed "interop iroh" to [Beetle](https://iroh.computer/docs/beetle), and put it into maintenance mode.

