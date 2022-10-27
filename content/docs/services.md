+++
title = "iroh services"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# Iroh Services
Services work together to fullfill requests:

<img src="/docs/diagrams/fig_1_iroh_cloud_gateway.svg" />


Services are designed to do as much work as they can when another

## storage
A database of IPFS content. The storage service

## p2p
_uses storage service_

peer-2-peer networking functionality

## gateway
_uses storage & p2p services_

bridge the IPFS network to HTTP

# Iroh CLI
_uses storage & p2p services_
While not technically a "service", the iroh command line interface also uses services to do nearly all of it's work.