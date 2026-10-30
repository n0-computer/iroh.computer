+++
title = "How Strada built peer-to-peer media workflows with iroh"
description = "Strada built peer-to-peer media workflows to give customers an economic advantage. In July 2026, 90.7% of transfer volume stayed off central servers."
date = "2026-09-30"
author = "Rae McKelvey"
social_image = "/blog/strada-direct-file-transfer/strada-finder.webp"
draft = false
+++

Strada helps creative teams access and edit media stored on remote drives. From
the outset, the team chose to build peer-to-peer because of the economics it
could offer customers: large files could move directly between devices, without
making central-server bandwidth a cost of every transfer. That was Strada's
product vision. They chose iroh to help execute it.

Strada's July 2026 production workload shows the advantage of that decision.
Of **150 TB** of transfer volume, **13.9 TB** crossed centralized infrastructure.
The other **90.7%** stayed off central servers.

## Peer-to-peer as a product decision

Media professionals work with files spread across local and remote drives.
Strada lets them mount remote storage as a virtual drive, so they can browse,
preview, and work with media without first uploading an entire library to a
cloud service.

A centralized design would put a data center between the devices exchanging
those files, even when a direct connection is possible. Every transfer would
then consume central-server bandwidth. Strada chose a different foundation:
let the devices holding and using the media exchange it directly, and use
centralized services where they add value.

That choice connects the product experience to its economics. Customers can
work with remote media while most of the file traffic stays between their
devices. Strada designed for that advantage and selected iroh as the networking
layer to build on.

## Iroh helps Strada deliver the connection

Iroh establishes an end-to-end encrypted connection between the two devices
and attempts to connect them directly, including across NATs and firewalls.
When network conditions prevent a direct connection, a relay forwards the
encrypted traffic so the transfer can continue. Relays cannot read the file
contents, and Strada runs discovery under its own domain.

Each layer has a distinct role:

- Strada provides the media workflow and remote-drive experience.
- The endpoints hold and exchange the large media files.
- Iroh finds and maintains an encrypted path between those endpoints.
- Relays preserve connectivity when a direct path is unavailable.

This gives Strada a networking foundation for the peer-to-peer product it set
out to build, including connectivity when a direct connection isn't possible.

## What 90.7% off the central path means

In July 2026, Strada handled **150 TB** of transfer volume while **13.9 TB**
crossed centralized infrastructure. A design that routed every byte through
central servers would have carried all 150 TB there. That all-centralized
scenario is a comparison for the same workload; it was never Strada's previous
central-server traffic.

The table below models the bandwidth-cost difference using a fixed set of AWS
egress rates as a benchmark. Both cost columns are estimates, not Strada's
actual bills.

| Metric | Hypothetical all-centralized design | Strada's peer-to-peer design | Difference between designs |
| --- | ---: | ---: | ---: |
| July traffic through central servers | 150 TB | 13.9 TB | 136.1 TB (90.7%) |
| Modeled monthly egress cost | $11,571.20 | $1,261.06 | $10,310.14 |
| Modeled annual cost at that monthly volume | $138,854.40 | $15,132.72 | $123,721.68 |

For that workload, **136.1 TB traveled without crossing centralized
infrastructure**. At the benchmark rates, the two designs differ by about
**$10,310 in monthly egress cost**. Holding the same volume for twelve months
would put the modeled annual difference at about **$123,700**.

This illustrates the economic advantage Strada chose to build into its
product: most media traffic can move without incurring central-server egress
costs.

## Building for the economics you want

Strada's approach makes peer-to-peer part of the product's competitive
advantage. In an all-centralized design, each additional file transfer adds
its full volume to central-server traffic. With Strada's design, most of that
traffic moves between the devices already sending and receiving it.

The same architectural choice is relevant to backup, synchronization, remote
access, dataset distribution, and other products that move large amounts of
data. Central infrastructure can coordinate that movement without carrying
every payload.

Strada brought the vision for a peer-to-peer media product and the customer
economics behind it. Iroh supplies the connection layer that helps the team
put that vision into practice. July's workload shows the result: creative
teams accessing remote media, with 90.7% of transfer volume staying off central
servers.

[Visit Strada](https://strada.tech) or read more about [how iroh connects
devices directly](https://docs.iroh.computer/what-is-iroh).

*Benchmark assumptions: 1 TB equals 1,024 GB. The model applies $0.09/GB to the
first 10 TB, $0.085/GB to the next 40 TB, and $0.07/GB to the next 100 TB. It
excludes taxes, negotiated discounts, credits, and the 100 GB monthly free
allowance. Annual figures multiply the monthly estimate by twelve; they are
not a forecast. These are bandwidth-only estimates, not Strada's actual bills,
and do not imply that Strada uses AWS.*
