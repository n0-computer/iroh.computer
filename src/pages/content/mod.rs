//! Page metadata for search and native Dioxus page components.
use crate::content::Page;
use dioxus::prelude::*;
#[path = "changelog.rs"]
mod changelog;
#[path = "docs/concepts/discovery.rs"]
mod docs_concepts_discovery;
#[path = "docs/concepts/endpoint.rs"]
mod docs_concepts_endpoint;
#[path = "docs/concepts/endpoint_addr.rs"]
mod docs_concepts_endpoint_addr;
#[path = "docs/concepts/index.rs"]
mod docs_concepts_index;
#[path = "docs/concepts/protocol.rs"]
mod docs_concepts_protocol;
#[path = "docs/concepts/relay.rs"]
mod docs_concepts_relay;
#[path = "docs/concepts/router.rs"]
mod docs_concepts_router;
#[path = "docs/concepts/tickets.rs"]
mod docs_concepts_tickets;
#[path = "docs/examples/gossip_chat.rs"]
mod docs_examples_gossip_chat;
#[path = "docs/examples/index.rs"]
mod docs_examples_index;
#[path = "docs/examples/todos.rs"]
mod docs_examples_todos;
#[path = "docs/faq.rs"]
mod docs_faq;
#[path = "docs/ipfs.rs"]
mod docs_ipfs;
#[path = "docs/overview.rs"]
mod docs_overview;
#[path = "docs/index.rs"]
mod docs_index;
#[path = "docs/protocols/docs.rs"]
mod docs_protocols_docs;
#[path = "docs/protocols/gossip.rs"]
mod docs_protocols_gossip;
#[path = "docs/protocols/net/holepunching.rs"]
mod docs_protocols_net_holepunching;
#[path = "docs/protocols/net.rs"]
mod docs_protocols_net;
#[path = "docs/protocols/writing.rs"]
mod docs_protocols_writing;
#[path = "docs/quickstart.rs"]
mod docs_quickstart;
#[path = "docs/reference/glossary.rs"]
mod docs_reference_glossary;
#[path = "docs/tour/1_endpoints.rs"]
mod docs_tour_1_endpoints;
#[path = "docs/tour/2_relays.rs"]
mod docs_tour_2_relays;
#[path = "docs/tour/3_discovery.rs"]
mod docs_tour_3_discovery;
#[path = "docs/tour/4_protocols.rs"]
mod docs_tour_4_protocols;
#[path = "docs/tour/5_routers.rs"]
mod docs_tour_5_routers;
#[path = "docs/tour/6_conclusion.rs"]
mod docs_tour_6_conclusion;
#[path = "docs/tour/index.rs"]
mod docs_tour_index;
#[path = "docs/wasm_browser_support.rs"]
mod docs_wasm_browser_support;
#[path = "legal.rs"]
mod legal;
#[path = "roadmap.rs"]
mod roadmap;
#[path = "sendme.rs"]
mod sendme;
#[path = "services/observability.rs"]
mod services_observability;
pub(crate) fn render(path: &str) -> Element {
    match path {
        "/changelog" => {
            rsx! {
                changelog::Changelog {}
            }
        }
        "/docs/concepts/discovery" => {
            rsx! {
                docs_concepts_discovery::DocsConceptsDiscovery {}
            }
        }
        "/docs/concepts/endpoint" => {
            rsx! {
                docs_concepts_endpoint::DocsConceptsEndpoint {}
            }
        }
        "/docs/concepts/endpoint-addr" => {
            rsx! {
                docs_concepts_endpoint_addr::DocsConceptsEndpointAddr {}
            }
        }
        "/docs/concepts" => {
            rsx! {
                docs_concepts_index::DocsConceptsIndex {}
            }
        }
        "/docs/concepts/protocol" => {
            rsx! {
                docs_concepts_protocol::DocsConceptsProtocol {}
            }
        }
        "/docs/concepts/relay" => {
            rsx! {
                docs_concepts_relay::DocsConceptsRelay {}
            }
        }
        "/docs/concepts/router" => {
            rsx! {
                docs_concepts_router::DocsConceptsRouter {}
            }
        }
        "/docs/concepts/tickets" => {
            rsx! {
                docs_concepts_tickets::DocsConceptsTickets {}
            }
        }
        "/docs/examples/gossip-chat" => {
            rsx! {
                docs_examples_gossip_chat::DocsExamplesGossipChat {}
            }
        }
        "/docs/examples" => {
            rsx! {
                docs_examples_index::DocsExamplesIndex {}
            }
        }
        "/docs/examples/todos" => {
            rsx! {
                docs_examples_todos::DocsExamplesTodos {}
            }
        }
        "/docs/faq" => {
            rsx! {
                docs_faq::DocsFaq {}
            }
        }
        "/docs/ipfs" => {
            rsx! {
                docs_ipfs::DocsIpfs {}
            }
        }
        "/docs/overview" => {
            rsx! {
                docs_overview::DocsOverview {}
            }
        }
        "/docs" => {
            rsx! {
                docs_index::DocsIndex {}
            }
        }
        "/docs/protocols/docs" => {
            rsx! {
                docs_protocols_docs::DocsProtocolsDocs {}
            }
        }
        "/docs/protocols/gossip" => {
            rsx! {
                docs_protocols_gossip::DocsProtocolsGossip {}
            }
        }
        "/docs/protocols/net/holepunching" => {
            rsx! {
                docs_protocols_net_holepunching::DocsProtocolsNetHolepunching {}
            }
        }
        "/docs/protocols/net" => {
            rsx! {
                docs_protocols_net::DocsProtocolsNet {}
            }
        }
        "/docs/protocols/writing" => {
            rsx! {
                docs_protocols_writing::DocsProtocolsWriting {}
            }
        }
        "/docs/quickstart" => {
            rsx! {
                docs_quickstart::DocsQuickstart {}
            }
        }
        "/docs/reference/glossary" => {
            rsx! {
                docs_reference_glossary::DocsReferenceGlossary {}
            }
        }
        "/docs/tour/1-endpoints" => {
            rsx! {
                docs_tour_1_endpoints::DocsTour1Endpoints {}
            }
        }
        "/docs/tour/2-relays" => {
            rsx! {
                docs_tour_2_relays::DocsTour2Relays {}
            }
        }
        "/docs/tour/3-discovery" => {
            rsx! {
                docs_tour_3_discovery::DocsTour3Discovery {}
            }
        }
        "/docs/tour/4-protocols" => {
            rsx! {
                docs_tour_4_protocols::DocsTour4Protocols {}
            }
        }
        "/docs/tour/5-routers" => {
            rsx! {
                docs_tour_5_routers::DocsTour5Routers {}
            }
        }
        "/docs/tour/6-conclusion" => {
            rsx! {
                docs_tour_6_conclusion::DocsTour6Conclusion {}
            }
        }
        "/docs/tour" => {
            rsx! {
                docs_tour_index::DocsTourIndex {}
            }
        }
        "/docs/wasm-browser-support" => {
            rsx! {
                docs_wasm_browser_support::DocsWasmBrowserSupport {}
            }
        }
        "/legal" => {
            rsx! {
                legal::Legal {}
            }
        }
        "/roadmap" => {
            rsx! {
                roadmap::Roadmap {}
            }
        }
        "/sendme" => {
            rsx! {
                sendme::Sendme {}
            }
        }
        "/services/observability" => {
            rsx! {
                services_observability::ServicesObservability {}
            }
        }
        _ => VNode::empty(),
    }
}
pub(crate) fn metadata() -> Vec<Page> {
    vec![
        Page {
            path: "/changelog".into(),
            title: "Changelog".into(),
            description: "Iroh Release History".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts/discovery".into(),
            title: "Discovery".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts/endpoint".into(),
            title: "Endpoints".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts/endpoint-addr".into(),
            title: "Endpoint Addresses".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts".into(),
            title: "Concepts".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts/protocol".into(),
            title: "Protocols".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts/relay".into(),
            title: "Relays".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts/router".into(),
            title: "Router".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/concepts/tickets".into(),
            title: "Tickets".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/examples/gossip-chat".into(),
            title: "Building a Peer-to-Peer Chat Application in Rust".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/examples".into(),
            title: "Examples".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/examples/todos".into(),
            title: "TODOs example".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/faq".into(),
            title: "Frequently Asked Questions".into(),
            description: "A curated set of answers to frequent questions we've gotten over time"
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/ipfs".into(),
            title: "iroh & IPFS".into(),
            description: "Iroh is an IPFS system".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/overview".into(),
            title: "Overview".into(),
            description: "A high-level description of what iroh is".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs".into(),
            title: "Documentation".into(),
            description: "Learn about Iroh and how to integrate into your own project."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/protocols/docs".into(),
            title: "Documents".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/protocols/gossip".into(),
            title: "gossip".into(),
            description: "iroh-gossip, a message broadcast protocol. Send messages to all endpoints in a swarm"
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/protocols/net/holepunching".into(),
            title: "Hole Punching".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/protocols/net".into(),
            title: "networking".into(),
            description: "the networking layer is the foundation of iroh. any peer can connect to any other peer using the networking layer."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/protocols/writing".into(),
            title: "Writing your own Protocol".into(),
            description: "A guide on how to implement your own Protocol with iroh"
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/quickstart".into(),
            title: "Quickstart".into(),
            description: "Transfer a file peer-to-peer between endpoints".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/reference/glossary".into(),
            title: "Glossary".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/tour/1-endpoints".into(),
            title: "1. Endpoints".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/tour/2-relays".into(),
            title: "2. Relays".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/tour/3-discovery".into(),
            title: "3. Discovery".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/tour/4-protocols".into(),
            title: "4. Protocols".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/tour/5-routers".into(),
            title: "5. Routers".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/tour/6-conclusion".into(),
            title: "6. Things iroh doesn’t do out of the box".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/tour".into(),
            title: "A Tour of iroh".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/docs/wasm-browser-support".into(),
            title: "Wasm/Browser Support".into(),
            description: "What to know about browser and WebAssembly support in Iroh: Limitations, Troubleshooting and Future Plans"
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/legal".into(),
            title: "Legal".into(),
            description: "Privacy policy and terms of service for Iroh and Iroh Services."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/pricing".into(),
            title: "Pricing".into(),
            description: "Plans and pricing for iroh services. Start free, then choose shared or dedicated relays as you grow."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/roadmap".into(),
            title: "iroh 1.0 roadmap".into(),
            description: "".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/sendme".into(),
            title: "Sendme".into(),
            description: "send files over the internet".into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/services/enterprise".into(),
            title: "Enterprise".into(),
            description: "Defeat connection anxiety in production. Custom health metrics, network diagnostics, and direct access to the core iroh team."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/services/hosting".into(),
            title: "Hosting".into(),
            description: "Keep your endpoints connected. Free public relays for development, dedicated relays for production."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/services/observability".into(),
            title: "Metrics".into(),
            description: "Monitor your network with comprehensive metrics collection. Track connections, latency, throughput, and custom application metrics."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/solutions/data-sync".into(),
            title: "Real-time Sync - Use Case".into(),
            description: "How Strada and Delta Chat build new workflows with direct access to remote files, private transfers, and connected apps."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/solutions/distributed-ai".into(),
            title: "Distributed AI - Use Case".into(),
            description: "How Nous and Mesh LLM use iroh to train foundation LLMs and pool GPUs across machines, with compute distributed around the world instead of centralized in one data center."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/solutions/iot".into(),
            title: "Iroh for IoT & Embedded Devices".into(),
            description: "Connect embedded devices directly with iroh. No servers, no gateways."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/solutions".into(),
            title: "Solutions".into(),
            description: "See how companies use iroh to build fast, reliable, distributed applications."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/solutions/pos".into(),
            title: "Iroh for Payments".into(),
            description: "Connect payment terminals directly to point of sale systems over Bluetooth, LAN, or Wi-Fi with iroh. No servers, no brokers, no complexity."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/solutions/video".into(),
            title: "Video Streaming with MoQ - Solutions".into(),
            description: "How iroh and Media over QUIC (MoQ) are changing the game for video streaming—and how Rave uses it to reach millions of devices worldwide."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
        Page {
            path: "/solutions/vpn".into(),
            title: "Iroh as a VPN Alternative".into(),
            description: "How teams use iroh in place of Tailscale, WireGuard, and reverse SSH tunnels to reach devices directly."
                .into(),
            date: "".into(),
            author: "".into(),
            social_image: String::new(),
            html: String::new(),
        },
    ]
}
