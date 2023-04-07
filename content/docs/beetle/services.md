+++
title = "iroh services"
description = ""
template="docs/page.html"
[extra]
section="beetle"
+++

# Beetle Services
Services work together to fulfill requests:

<img src="/docs/beetle/diagrams/fig_1_iroh_cloud_gateway.svg" />


Services are designed to do as much work as they can when another service is down.

## storage
A database of IPFS content. The storage service.

## p2p
_uses storage service_

Peer-2-peer networking functionality.

## gateway
_uses storage & p2p services_

Bridge the IPFS network to HTTP.

# Beetle CLI
_uses storage & p2p services_
While not technically a "service", the beetle command line interface also uses services to do nearly all of it's work.
