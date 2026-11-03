+++
title = "How Strada built peer-to-peer media workflows with iroh"
description = "Strada built peer-to-peer media workflows to give customers an economic advantage. In July 2026, 90.7% of transfer volume stayed off central servers."
date = "2026-09-30"
author = "Rae McKelvey"
social_image = "/blog/strada-direct-file-transfer/strada-finder.webp"
draft = false
+++

Strada helps creative teams access and edit media stored on remote drives. From
the beginning, the team chose to build peer-to-peer because of the latency & economics it
could offer: large files could move directly between devices, without
making a central server the bottleneck of every transfer.

Strada's July 2026 production workload shows the advantage of that decision.
Of **150 TB** of transfer volume, **13.9 TB** crossed centralized infrastructure.
The other **90.7%** stayed off central servers.

## Peer-to-peer as a product decision

Media professionals work with files spread across local and remote drives.
Strada lets them mount remote storage as a virtual drive, so they can browse,
preview, and work with media without first uploading an entire library to a
cloud service. Users can work with remote media while most of the file traffic stays between their
devices. Strada selected iroh as the networking layer to build on to have that competitive edge in latency, user experience, and overall cost of operation compared to it's competitors. And it's working. 

Founded by brothers Michael and Peter Cioni in 2023, Strada uses a distributed architecture built on peer-to-peer connectivity rather than centralised cloud infrastructure. It has been downloaded by more than 12,000 users since launch and serves both independent creators and media teams at Fortune 500 companies.

## Why iorh?

Iroh establishes an end-to-end encrypted connection between the two devices
and attempts to connect them directly, including across NATs and firewalls.
When network conditions prevent a direct connection, a relay forwards the
encrypted traffic so the transfer can continue. Relays cannot read the file
contents, and Strada runs discovery under its own domain.

The relays help when direct connections cannot be established. This ensures that
at a minimum, the product continues working without interruption even in flaky
networking conditions.

Each layer has a distinct role:

- Strada provides the media workflow and remote-drive experience.
- The endpoints hold and exchange the large media files.
- Iroh finds and maintains an encrypted path between those endpoints.
- Relays preserve connectivity when a direct path is unavailable.


## What 90.7% off the central path means

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

## Building for the experience you want

The same architectural choice is relevant to backup, synchronization, remote
access, dataset distribution, and other products that move large amounts of
data. Central infrastructure can coordinate that movement without carrying
every payload across servers, which makes a slower user experience and a higher bill.

[Visit Strada](https://strada.tech) or read more about [how iroh connects
devices directly](https://docs.iroh.computer/what-is-iroh).

*Benchmark assumptions: 1 TB equals 1,024 GB. The model applies $0.09/GB to the
first 10 TB, $0.085/GB to the next 40 TB, and $0.07/GB to the next 100 TB. It
excludes taxes, negotiated discounts, credits, and the 100 GB monthly free
allowance. Annual figures multiply the monthly estimate by twelve; they are
not a forecast. These are bandwidth-only estimates, not Strada's actual bills,
and do not imply that Strada uses AWS.*
