//! Content for `/docs/concepts/relay`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsRelay() -> Element {
    rsx! {
        h1 { id: "relays", "Relays" }
        p { "Relays are servers that help establish connections between devices." }
        p {
            "Relays temporarily route encrypted traffic until a direct, P2P connection is feasible. Once this direct path is set up, the relay server steps back, and the data flows directly between devices. This approach allows Iroh to maintain a secure, low-latency connection, even in challenging network situations."
        }
        aside { class: "note",
            p {
                "Relays are also open source! You can run your own relay server, or use one of the public relays. Code is "
                a { href: "https://github.com/n0-computer/iroh/tree/main/iroh-relay",
                    "here"
                }
                ", and we build relay binaries for most platforms with each iroh "
                a { href: "https://github.com/n0-computer/iroh/releases", "release" }
            }
        }
        p {
            "There are situations where a direct connection "
            em { "can't" }
            " be established, and in those cases traffic falls back to running through the relay. Relay servers "
            strong { "do not" }
            " have access to the data being transmitted, as it's encrypted end-to-end."
        }
        aside { class: "note",
            p {
                "We're working on formally collecting the direct connection rate from production iroh networks. Anecdotal evidence points to the holepunching rate being around 90%, meaning 9 out of 10 times, a direct connection is established."
            }
        }
        h2 { id: "connection-changes", "Connection Changes" }
        p {
            "During the lifespan of a connection, networking conditions can change, for example when a user switched from 5G to WiFi, plugs in an ethernet cable, or a sysadmin modifies router configurations. The connection may change from direct to relayed, or even a mixed combination of the two. Iroh will automatically switch between direct and relayed connections as needed, without any action required from the application."
        }
        h2 { id: "home-relay", "Home Relay" }
        p {
            "All iroh endpoints will maintain a single home relay server that they're reachable at. On startup iroh will probe its configured relays & choose the one with the lowest latency."
        }
        p {
            "You can see this in action with "
            a { href: "https://github.com/n0-computer/iroh-doctor", "iroh doctor" }
            ":"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "The above output shows that the endpoint is using the "
            code { "use1-1.relay.iroh.network" }
            " relay, and that it has a latency of 10ms. This is the relay that the endpoint will use to establish connections with other endpoints."
        }
        h2 { id: "number-0-public-relays", "number 0 public relays" }
        p {
            "number 0 provides a set of public relays that are free to use, and are configured by default. You're more than welcome to run production systems using the public relays if you find performance acceptable. The public relays do rate-limit traffic that flows through the relay. This is to prevent abuse, and ensure the relays are available to everyone. If you need more capacity, you can run your own relay server, or "
            a { href: "https://n0.computer/n0ps/", "contact us about a custom relay setup" }
            "."
        }
        h2 { id: "local-discovery", "Local Discovery" }
        p {
            "Relays aren't the only way to find other iroh endpoint. Iroh also supports local "
            a { href: "/docs/concepts/discovery", "discovery" }
            ", where endpoints on the same local network can find each other & exchange dialing information without a relay using mDNS. This is useful for local networks, or for bootstrapping a network before a relay is available. For more info on configuring local discovery, see the "
            a { href: "https://docs.rs/iroh/latest/iroh/discovery/mdns/index.html",
                "local discovery docs"
            }
            "."
        }
    }
}
const EXAMPLE_1: &str = r###"$ iroh-doctor report
getting report using relay map RelayMap {
    nodes: {
        RelayUrl(
            "https://aps1-1.relay.iroh.network./",
        ): RelayNode {
            url: RelayUrl(
                "https://aps1-1.relay.iroh.network./",
            ),
            stun_only: false,
            stun_port: 3478,
        },
        ...
    },
}
Report {
    udp: true,
    ipv6: true,
    ipv4: true,
    ipv6_can_send: true,
    ipv4_can_send: true,
    os_has_ipv6: true,
    icmpv4: None,
    icmpv6: None,
    mapping_varies_by_dest_ip: Some(false),
    mapping_varies_by_dest_ipv6: Some(false),
    hair_pinning: Some(false),
    portmap_probe: Some(
        ProbeOutput {
            upnp: false,
            pcp: false,
            nat_pmp: false,
        },
    ),
    preferred_relay: Some(
        RelayUrl(
            "https://use1-1.relay.iroh.network./",
        ),
    ),
    relay_latency: RelayLatencies(
        {
            RelayUrl(
                "https://aps1-1.relay.iroh.network./",
            ): 229.446041ms,
            RelayUrl(
                "https://euw1-1.relay.iroh.network./",
            ): 98.979167ms,
            RelayUrl(
                "https://use1-1.relay.iroh.network./",
            ): 10.133208ms,
        },
    ),
    relay_v4_latency: RelayLatencies(
        {
            RelayUrl(
                "https://aps1-1.relay.iroh.network./",
            ): 229.446041ms,
            ...
        },
    ),
    relay_v6_latency: RelayLatencies(
        {
            RelayUrl(
                "https://aps1-1.relay.iroh.network./",
            ): 238.579417ms,
            ...
        },
    ),
    global_v4: Some(72.**.**.**:54696),
    global_v6: Some([2600:**:**:***::100b]:53549),
    captive_portal: None,
}
"###;
