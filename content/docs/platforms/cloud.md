+++
title = "Iroh Cloud"
description = "run an HTTP gateway with iroh cloud"
template="docs/page.html"
[extra]
section="cloud"
+++

# Iroh Cloud

Iroh Cloud is an IPFS implementation purpose-built for running at scale on datacenter-grade infrastructure. It implements the IPFS protocol as composable services that speak to each other via remote procedure calls (RPC), which are intended to be connected in a low-latency trusted networking envrionment.

A common iroh cloud setup looks something like this:

<img src="/img/diagram/fig_1_iroh_cloud_gateway.svg" />

# Key features

##### **Horizontal & vertical scalability**
Separate storage, p2p, and gateway processes divvy up operational concerns into distinct services

##### **Increased performance**
Achieve higher throughput than existing IPFS solutions, make better use of cloud hardware & software.

##### **Play well with cloud-native tooling**
Design each service to work with load balancers, caching tools, other databases, etc.

##### **Cloud-specific configuration**
Cache retention, rate-limiting, CID deny lists, provide configuration geared toward running a high-throughput system.

##### **Rich, uniform metrics**
Metrics connected throughout each service provide customizable monitoring & reporting via industry-standard tools like Grafana & Prometheus.
