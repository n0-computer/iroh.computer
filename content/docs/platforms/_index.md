+++
title = "Platforms"
description = "run an HTTP gateway with iroh cloud"
template="docs/page.html"
[extra]
section="platforms"
+++

# Platforms
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