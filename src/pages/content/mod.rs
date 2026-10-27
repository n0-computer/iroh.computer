//! Native Dioxus page components.
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
