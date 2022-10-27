+++
title = "Use Cases"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# Use Cases

While there are countless permutations of a data transfer protocol & concrete applications, some common use cases stand out a starting point for deploying iroh:

## HTTP Gateway

<img src="/docs/diagrams/fig_1_iroh_cloud_gateway.svg" />

Iroh Gateway is the bridge that connects the IPFS protocol to HTTP. It is compliant with IPFS gateway specifications and exposes data stored on IPFS over HTTP, making it great for web browsers, public APIs, and any app that doesn't support IPFS natively.

Iroh’s horizontal and vertical scaling make it the first cloud-native IPFS gateway. Making it the most resource-efficient IPFS implementation to date and delivering best-in-class performance.

Iroh integrated seamlessly with existing metrics pipelines, and all services come ready-to-wire to Prometheus.

## Device-in Content Delivery Network

Iroh builds Content Delivery Networks (CDNs) that include end user devices. This allows user devices to work together to enhance overall app experience by automatically content addressing application data and cutting down on redundant fetches, while complementing existing infrastructure.

## Mobile App Infrastructure

Iroh is a powerful tool for building custom applications. Its services form a perfect toolbox for building on top of P2P, storage, lite client backbones, and HTTP gateways. They are all broken out into discrete services. Each service is continuously evolving and being improved upon – and is backed by our solid and stable gRPC API.

We’ve chosen standard gRPC for communication. This means that you can write custom logic to control services via gRPC, or write middleware that wraps Iroh microservices. You can even write custom implementations of Iroh service APIs – like a version of Iroh Store that is backed entirely by Amazon S3.

Rust projects can import Iroh crates directly, which shortens development time. Other languages can call Rust code via a C-API to keep things super streamlined.