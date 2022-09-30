+++
title = "iroh docs"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# What is iroh?

Iroh is a next-generation implementation the Interplanetary File System ([IPFS](https://ipfs.io)) for Cloud & Mobile platforms. IPFS is a networking protocol for exchanging content-addressed blocks of immutable data. _content-addressed_ means referring to data by the [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of it’s content, which makes the reference both unique and verifiable. These two properties make it possible to get data from *any* node in the network that speaks the IPFS protocol, including IPFS content being served by other implementations of the protocol.

We announced the start of work on iroh at [IPFS þing 2022](https://2022.ipfs-thing.io/):

<iframe width="560" height="315" src="https://www.youtube.com/embed/qPBR2K2X6cs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br />
<aside>
🚧 <b>Under Construction</b><br />
We’re working iroh towards a first stable release, which we expect will happen around <a href="https://github.com/n0-computer/iroh/milestone/2">October 25th</a>
</aside>

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

Iroh mobile is intended for teams shipping native apps on iOS & Android that want to add Iroh to their stack. Iroh mobile ships as a library that developers bring into their project, giving every device running their app new capabilities for exchanging content addressed data.

Production deployments of iroh mobile are intended to be paired with an iroh cloud deployment, supporting the capabilities of mobile devices. mobile developers can point their applications either at privately hosted iroh cloud deployments, or public infrastructure, including infra run by number zero (the company behind iroh).

# Use Cases

While there are countless permutations of a data transfer protocol & concrete applications, some common use cases stand out a starting point for deploying iroh:

## HTTP Gateway

![fig_1_iroh_cloud_gateway.svg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2f63165-eef4-4e66-9394-87e7a12e8104/fig_1_iroh_cloud_gateway.svg)

Iroh Gateway is the bridge that connects the IPFS protocol to HTTP. It is compliant with IPFS gateway specifications and exposes data stored on IPFS over HTTP, making it great for web browsers, public APIs, and any app that doesn't support IPFS natively.

Iroh’s horizontal and vertical scaling make it the first cloud-native IPFS gateway. Making it the most resource-efficient IPFS implementation to date and delivering best-in-class performance.

Iroh integrated seamlessly with existing metrics pipelines, and all services come ready-to-wire to Prometheus.

## Device-in Content Delivery Network

Iroh builds Content Delivery Networks (CDNs) that include end user devices. This allows user devices to work together to enhance overall app experience by automatically content addressing application data and cutting down on redundant fetches, while complementing existing infrastructure.

## Mobile App Infrastructure

Iroh is a powerful tool for building custom applications. Its services form a perfect toolbox for building on top of P2P, storage, lite client backbones, and HTTP gateways. They are all broken out into discrete services. Each service is continuously evolving and being improved upon – and is backed by our solid and stable gRPC API.

We’ve chosen standard gRPC for communication. This means that you can write custom logic to control services via gRPC, or write middleware that wraps Iroh microservices. You can even write custom implementations of Iroh service APIs – like a version of Iroh Store that is backed entirely by Amazon S3.

Rust projects can import Iroh crates directly, which shortens development time. Other languages can call Rust code via a C-API to keep things super streamlined.