+++
title = "Relay outage: A post-mortem"
description = "Post mortem of our first outage"
date = "2024-11-19"
author = "Arqu"
social_image = ""
+++

## **Ensuring best practices** {#ensuring-best-practices}

At n0 we strive to be a great engineering company across our entire organisation. With that in mind, the time for our first post mortem has come! For over a year we had no outages on our publicly hosted infrastructure (`iroh-relay` & `iroh-dns-server`) outside of scheduled maintenance.

## **So what happened?** {#so-what-happened}

On November 5th ’24 we had a global outage on our relay nodes which started with degraded performance in some regions around 11:00 GMT and transitioned to a full outage by 17:00 GMT. The outage was discovered and reported internally by 22:50 GMT and resolved at 23:01 GMT. The outage affected establishing new connections where hole-punching was required, but did not affect existing connections between nodes or connections where a direct connection is possible without hole-punching.

The core issue: the outage was relayed (pun intended) very late to the team. And while we have engineers with significant SRE and Ops experience we had not yet prioritised setting up our own best practices.

## **Core challenges** {#core-challenges}

This incident highlighted several systemic vulnerabilities in our infrastructure:

-   Delayed Detection: The traffic spike wasn’t noticed for nearly 12 hours, a critical gap that could have mitigated the issue if addressed sooner.
-   Insufficient Capacity Planning/Management: The Asia node was underpowered, and there were no mechanisms to dynamically scale or shed load.
-   Inefficient Logging: Unbounded log growth caused cascading disk failures, exacerbating the outage.

## **Resolving the issue** {#resolving-the-issue}

**Immediate fixes:**

-   Scale Up Nodes: We quadrupled the capacity to make sure we have ample breathing room
-   Cleared Logs: Freed up disk space by deleting excessive logs and reducing verbosity.
-   Restarted services: The individual relays were restarted in series and observed as they ramped up connections

**Short-Term improvements:**

-   Re-enabled alerting on our public relays to provide early warnings for traffic spikes and node health.
-   Migrated the Asia node to a higher-capacity server.

## **What Went Well** {#what-went-well}

Despite the challenges, several positive outcomes emerged:

-   Our infrastructure handled a peak of 100,000 concurrent connections before failing.
-   We onboarded nearly 1 million new nodes during the event.
-   The team rallied quickly, stabilising the system in under 10 minutes once aware of the issue.
-   We started the good practice of doing post-mortems!

## **The Nitty Gritty** {#the-nitty-gritty}

While the top level report of what happened is accurate, the actual root cause was deeper. The exact cause of events was:

-   Load increased
-   Memory usage grew more than it should with the number of connections and never went down
-   Once getting to critical levels, connections started failing which produced excessive logging
-   Excessive logging filled up disk space and prevented further self-healing of the deployment

The excessive logging and disk space issues were a fairly easy fix, we limited the log size and put a more aggressive log rotation schedule in place. The memory issues were a much bigger problem as the memory kept accumulating and never got freed (😱 Rust’s memory safety guarantees do not mitigate memory leaks).

## **The Following 2 Weeks** {#the-following-2-weeks}

Our clean up work did not stop that day. We had a thorough session to evaluate next steps for handling the next 10x spike on our public infrastructure.

-   Made a plan to implement load shedding mechanics
-   Started mapping out a path on how to dynamically update relay maps
-   Onboarded more folks to the “ops side of things” at n0
-   Set up much more exhaustive metrics and alerting
-   Wrote a load simulation test and profiled our relays which helped uncovered not one but two places where we leaked `tokio` tasks and threads and fixed them promptly ([https://github.com/n0-computer/iroh/pull/2915](https://github.com/n0-computer/iroh/pull/2915) & [https://github.com/n0-computer/iroh/pull/2924](https://github.com/n0-computer/iroh/pull/2924))

## **Relay-ted thoughts** {#relay-ted-thoughts}

It’s scary how a small bump in traffic can have such a hard impact on your services. Another unnerving thing is how cascading failures happen in ways you didn’t anticipate. Nevertheless, the primary issue is fixed and we have protections in place to prevent them in the future. We now have alerts that cut through the noise of normal notifications to inform us about the status of our relays and can react preemptively. Finally, having proper load testing of our infrastructure is really important in understanding possible failure modes.
