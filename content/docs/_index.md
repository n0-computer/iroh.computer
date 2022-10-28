+++
title = "iroh docs"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# What is iroh?

Iroh is a next-generation implementation of the Interplanetary File System ([IPFS](https://ipfs.io)) for Cloud, Mobile & Desktop platforms. IPFS is a networking protocol for exchanging content-addressed blocks of immutable data. _content-addressed_ means referring to data by the [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of it’s content, which makes the reference both unique and verifiable. These two properties make it possible to get data from *any* node in the network that speaks the IPFS protocol, including IPFS content being served by other implementations of the protocol.

We announced the start of work on iroh at [IPFS þing 2022](https://2022.ipfs-thing.io/):


## Platforms

Iroh uses a common-core codebase to ship three purpose-built distributions:

| Platform | Description |
| --- | --- |
| iroh cloud | iroh split into configurable microservices, optimized for running at datacenter scale. |
| iroh mobile | iOS & Android libraries that bring efficient data distribution to apps |
| iroh one | iroh as a single binary aimed at desktop & simplified deployment setups. |

## Iroh Cloud

Iroh cloud is intended for teams deploying into trusted distributed environments like data centers & containerized environments. Logically grouped subsystems of iroh are broken out into services connected via remote procedure calls (RPC), which can be scaled horizontally.

## Iroh Mobile

Iroh mobile is intended for teams shipping native apps on iOS & Android that want to add iroh to their stack. Iroh mobile ships as a library that developers bring into their project, giving every device running their app new capabilities for exchanging content addressed data.

Production deployments of iroh mobile are intended to be paired with an iroh cloud deployment, supporting the capabilities of mobile devices. Mobile developers can point their applications either at privately hosted iroh cloud deployments, or public infrastructure, including infra run by number zero (the company behind iroh).
