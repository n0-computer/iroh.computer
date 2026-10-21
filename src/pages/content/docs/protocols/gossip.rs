//! Content for `/docs/protocols/gossip`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsProtocolsGossip() -> Element {
    rsx! {
        h1 { id: "iroh-gossip", "iroh-gossip" }
        p { "Gossip broadcasts messages to a network of live devices." }
        img {
            src: "/diagrams/gossip_swarm_light.svg",
            alt: "a diagram of 24 cell phones in an iroh-gossip swarm, where each peer is actively connected to 3 peers, and passively connected to 5 peers",
            width: "800",
            height: "600",
            class: "theme-light",
        }
        img {
            src: "/diagrams/gossip_swarm_dark.svg",
            alt: "a diagram of 24 cell phones in an iroh-gossip swarm, where each peer is actively connected to 3 peers, and passively connected to 5 peers",
            width: "800",
            height: "600",
            class: "theme-dark",
        }
        h2 { id: "overview", "Overview" }
        p {
            "”network” here is as few as 2 devices, and theoretically up to hundreds of thousands. Any endpoint in a gossip network can send a message, and it will be sent to all devices that are online."
        }
        p {
            "Iroh-gossip caps the number of active connections to around 5 per device, and routes messages around network, even as some endpoints join and leave. With iroh-gossip you can build dynamic networks of devices that can communicate with a high-level broadcast-oriented API."
        }
        h2 { id: "hyparview-and-plumtree", "HyParView and PlumTree" }
        p {
            "The iroh-gossip protocol is made up from two parts: A swarm membership protocol, based on "
            a { href: "https://asc.di.fct.unl.pt/~jleitao/pdf/dsn07-leitao.pdf", "HyParView" }
            ", and a gossip broadcasting protocol, based on "
            a { href: "https://asc.di.fct.unl.pt/~jleitao/pdf/srds07-leitao.pdf",
                "PlumTree"
            }
            "."
        }
        p {
            "The "
            em { "membership protocol" }
            " is a cluster protocol where each peer maintains a partial view of all endpoints in the swarm. A peer joins the swarm for a topic by connecting to any known peer that is a member of this topic's swarm. Obtaining this initial contact info happens out of band. The peer then sends a "
            code { "Join" }
            " message to that initial peer. All peers maintain a list of "
            code { "active" }
            " and "
            code { "passive" }
            " peers. Active peers are those that you maintain active connections to."
        }
        p {
            "Passive peers is an addressbook of additional peers. If an active peers goes offline, its slot is filled with a random peer from the passive set. In the default configuration, the active view has a size of 5 and the passive view a size of 30. The HyParView protocol ensures that active connections are always bidirectional, and regularly exchanges endpoints for the passive view in a "
            code { "Shuffle" }
            " operation. Thus, this protocol exposes a high degree of reliability and auto-recovery in the case of endpoint failures."
        }
        p {
            "The "
            em { "gossip protocol" }
            " builds upon the membership protocol. It exposes a method to broadcast messages to all peers in the swarm. On each endpoint, it maintains two sets of peers: An "
            code { "eager" }
            " set and a "
            code { "lazy" }
            " set. Both are subsets of the "
            code { "active" }
            " view from the membership protocol. When broadcasting a message from the local endpoint, or upon receiving a broadcast message, the message is pushed to all peers in the eager set. Additionally, the hash of the message (which uniquely identifies it), but not the message content, is lazily pushed to all peers  in the "
            code { "lazy" }
            " set. When receiving such lazy pushes (called "
            code { "Ihaves" }
            {EXAMPLE_1}
        }
        h2 { id: "gossip-topics", "Gossip Topics" }
        p {
            "All protocol messages are namespaced by a ["
            code { "TopicId" }
            "], a 32 byte identifier. Topics are separate swarms and broadcast scopes. The HyParView and PlumTree algorithms both work in the scope of a single topic. Thus, joining multiple topics increases the number of open connections to peers and the size of the local routing table."
        }
        hr {}
        h2 { id: "references", "References" }
        ol {
            li {
                strong { "HyParView" }
                br {}
                a { href: "https://asc.di.fct.unl.pt/~jleitao/pdf/dsn07-leitao.pdf",
                    "https://asc.di.fct.unl.pt/~jleitao/pdf/dsn07-leitao.pdf"
                }
            }
            li {
                strong { "PlumTree" }
                br {}
                a { href: "https://asc.di.fct.unl.pt/~jleitao/pdf/srds07-leitao.pdf",
                    "https://asc.di.fct.unl.pt/~jleitao/pdf/srds07-leitao.pdf"
                }
            }
        }
    }
}
const EXAMPLE_1: &str = r###"), those peers may request the message content after a timeout if they didn't receive the message by one of their eager peers before. When requesting a message from a currently-lazy peer, this peer is also upgraded to be an eager peer from that moment on. This strategy self-optimizes the messaging graph by latency. Note however that this optimization will work best if the messaging paths are stable, i.e. if it's always the same peer that broadcasts. If not, the relative
message redundancy will grow and the ideal messaging graph might change frequently."###;
