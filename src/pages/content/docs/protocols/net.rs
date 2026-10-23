//! Content for `/docs/protocols/net`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsProtocolsNet() -> Element {
    rsx! {
        h1 { id: "networking", "Networking" }
        p {
            "At the core of iroh is the ability to connect "
            em { "any" }
            " two devices, no matter where they are."
        }
        h2 { id: "nodes", "Nodes" }
        p {
            "The primary functionality of the networking is to establish connections between two nodes, regardless of where they are located. To make this feasible the nodes are addressed by "
            em { "NodeId" }
            " rather than by IP address and port. The "
            em { "NodeId" }
            " is created from the public portion of a cryptographic keypair use for signing messages."
        }
        p {
            "A node still needs to bind to an IP address and port to be reachable, and IP addresses are still part of the addressing, though not the primary addressing mechanism. Multiple nodes can run on the same machine, but not share the same port."
        }
        aside { class: "note",
            p {
                a { href: "/blog/iroh-dns", "This blog post" }
                " outlines how we resolve raw "
                code { "nodeID" }
                "s to IP addresses and ports."
            }
        }
        p {
            "Networking nodes are created and controlled by the "
            a { href: "https://docs.rs/iroh/latest/iroh/net/struct.Endpoint.html",
                "Endpoint"
            }
            " struct in the "
            code { "iroh-net" }
            {EXAMPLE_1}
            a { href: "https://docs.rs/iroh/latest/iroh/node/struct.Node.html", "Node" }
            {EXAMPLE_2}
        }
        p {
            "On layer 0 an iroh network is a collection of nodes. By default an node does "
            strong { "not" }
            {EXAMPLE_3}
        }
        h2 { id: "connections", "Connections" }
        p {
            "An iroh connection uses "
            a { href: "https://en.wikipedia.org/wiki/QUIC", "QUIC" }
            " as the transport protocol, exposing a full QUIC API to application developers. QUIC is a modern transport protocol that provides a reliable, encrypted, multiplexed connection between two nodes. QUIC is build on top of UDP, and is designed to deal with a wider variety of network situations than TCP."
        }
        p {
            "Iroh integrates with QUIC and the UDP transport to create direct connections between nodes. It dynamically routes the QUIC UDP packets via the best path to the peer, regularly performing latency probes to find the best path between nodes. Typically a connection starts relayed to ensure immediate connectivity. Iroh then coordinates "
            a { href: "https://en.wikipedia.org/wiki/Hole_punching_(networking)",
                "holepunching"
            }
            {EXAMPLE_4}
        }
        p {
            "For connections where no holepunching is needed iroh can establish a connection without a relay server. For this the application can explicitly provide IP addressing information for a peer node, or rely on a pluggable discovery mechanism."
        }
        h2 { id: "relays", "Relays" }
        p {
            "The relay server is an important component to ensure a connection can be established swiftly between any two iroh nodes, regardless of their location. It helps when strict firewall rules or NAT configurations are on the network path. As the relay server is publicly reachable by all nodes it can pass UDP packets between nodes until they manage to establish a direct connection. It also plays a vital role in the "
            a { href: "https://en.wikipedia.org/wiki/Hole_punching_(networking)",
                "holepunching"
            }
            " by informing nodes of their networking situation and coordinating between nodes."
        }
        p {
            "Since all traffic between nodes is encrypted for the destination node only, relay servers have very little knowledge and "
            em { "cannot" }
            " inspect the contents of forwarded packets."
        }
        h2 { id: "api-docs", "API docs" }
        p {
            "See the "
            a { href: "https://docs.rs/iroh/latest/iroh/net/index.html", "reference documentation" }
            " for more technical details and the API provided."
        }
    }
}
const EXAMPLE_1: &str = r###" library.
Often wrapped in the higher abstraction provided by "###;
const EXAMPLE_2: &str = r###",
when using multiple of iroh's layers together."###;
const EXAMPLE_3: &str = r###" dial out to
other nodes, but waits for incoming connections. Instead actions like joining a document or
subscribing to a gossip topic will kick off connections to nodes in the same document or topic."###;
const EXAMPLE_4: &str = r###" to establish a direct connection between peers,
once the direct connection exists the QUIC connection is seamlessly routed over it. When the network situation changes iroh quickly adapts to the new routes and seamlessly moves the connection over."###;
