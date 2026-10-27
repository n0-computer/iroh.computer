//! Content for `/docs/concepts/discovery`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsDiscovery() -> Element {
    rsx! {
        h1 { id: "discovery", "Discovery" }
        p {
            "Discovery is the glue that connects a "
            a { href: "/docs/concepts/endpoint#endpoint-identifiers", "Endpoint Identifier" }
            " to something we can dial. Discovery services resolve EndpointIds to either a home Relay URL or direct-dialing information."
        }
        aside { class: "note",
            p {
                "More details on discovery in the discovery module "
                a { href: "https://docs.rs/iroh/latest/iroh/discovery/index.html",
                    "documentation"
                }
            }
        }
        p {
            "Endpoint discovery is an automated system for an "
            a { href: "/docs/concepts/endpoint", "Endpoint" }
            " to retrieve addressing information. Each iroh endpoint will automatically publish their own addressing information with configured discovery services. Usually this means publishing which "
            a { href: "/docs/concepts/relay#home-relay", "Home Relay" }
            " an endpoint is findable at, but they could also publish their direct addresses."
        }
        h2 { id: "discovery-services", "Discovery Services" }
        p {
            "There are four different implementations of the discovery service in iroh, all of which map EndpointIds to addresses:"
        }
        table {
            thead {
                tr {
                    th {}
                    th { "Discovery Implementation" }
                    th { "Description" }
                }
            }
            tbody {
                tr {
                    td { "1" }
                    td {
                        a { href: "#dns-discovery", "DNS" }
                    }
                    td { "uses a custom Domain Name System server" }
                }
                tr {
                    td { "2" }
                    td {
                        a { href: "#local-discovery", "Local" }
                    }
                    td { "uses an mDNS-like system to find endpoints on the local network" }
                }
                tr {
                    td { "3" }
                    td {
                        a { href: "#pkarr-discovery", "Pkarr" }
                    }
                    td { "uses Pkarr Servers over HTTP" }
                }
                tr {
                    td { "4" }
                    td {
                        a { href: "#dht-discovery", "DHT" }
                    }
                    td { "uses the BitTorrent Mainline DHT" }
                }
            }
        }
        p {
            "By Default, iroh uses the DNS discovery system to resolve EndpointIds to addresses. And can be configured to use any of the other discovery systems."
        }
        h2 { id: "dns-discovery", "DNS Discovery" }
        p {
            "DNS performs endpoint lookups via the standard DNS systems. To publish to this DNS server a PkarrPublisher is needed. Number 0 runs a public instance of the DNS discovery system"
        }
        aside { class: "note",
            p {
                "DNS Discovery has its own "
                a { href: "/blog/iroh-dns", "blog post" }
                "!"
            }
        }
        h2 { id: "local-discovery", "Local Discovery" }
        p {
            "Local discovery adds the ability to scan local networks for other iroh endpoints, using Local Swarm Discovery. This is useful for local networks, or for bootstrapping a network before a relay is available."
        }
        p {
            "Local Discovery is "
            em { "not" }
            " enabled by default, and must be enabled by the user. You'll need to add the "
            code { "discovery-local-network" }
            " feature flag to your "
            code { "Cargo.toml" }
            " to use it."
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "Then configure your endpoint to use local discovery concurrently with the default DNS discovery:"
        }
        pre {
            code { {EXAMPLE_2} }
        }
        h2 { id: "pkarr-discovery", "Pkarr Discovery" }
        p {
            "The Pkarr resolver can perform lookups from designated "
            a { href: "https://github.com/Pubky/pkarr#servers", "pkarr relay servers" }
            " using HTTP. Read more about the pkarr project "
            a { href: "https://github.com/Pubky/pkarr?tab=readme-ov-file#pkarr", "here" }
            "."
        }
        h2 { id: "dht-discovery", "DHT Discovery" }
        p {
            "DHT discovery uses the "
            a { href: "https://en.wikipedia.org/wiki/Mainline_DHT", "BitTorrent Mainline" }
            " distributed hash table (DHT) to publish & resolve EndpointIds."
        }
        p {
            "DHT Discovery is "
            em { "not" }
            " enabled by default, and must be enabled by the user. You'll need to add the "
            code { "discovery-pkarr-dht" }
            " feature flag to your "
            code { "Cargo.toml" }
            " to use it."
        }
        pre {
            code { {EXAMPLE_3} }
        }
        p {
            "Then configure your endpoint to use DHT discovery concurrently with mDNS discovery, but not with the default DNS discovery, use the "
            code { "Endpoint::empty_builder" }
            " method. This requires specifying a "
            code { "RelayMode" }
            ", which in this example we will keep default."
        }
        pre {
            code { {EXAMPLE_4} }
        }
    }
}
const EXAMPLE_1: &str = r###"[dependencies]
# Make sure to use the most recent version here instead of nn. (at the time of writing: 0.32)
iroh = { version = "0.nn", features = ["discovery-local-network"] }
"###;
const EXAMPLE_2: &str = r###"use iroh::Endpoint;

let mdns = iroh::discovery::mdns::MdnsDiscovery::builder();
let ep = Endpoint::builder()
    .discovery(mdns)
    .bind()
    .await?;
"###;
const EXAMPLE_3: &str = r###"[dependencies]
# Make sure to use the most recent version here instead of nn. (at the time of writing: 0.32)
iroh = { version = "0.nn", features = ["discovery-pkarr-dht"] }
"###;
const EXAMPLE_4: &str = r###"use iroh::Endpoint;

let dht_discovery = iroh::discovery::dht::DhtDiscovery::builder();
let mdns = iroh::discovery::mdns::MdnsDiscovery::builder();
let ep = Endpoint::empty_builder(iroh::RelayMode::Default)
    .discovery(dht_discovery)
    .discovery(mdns)
    .bind()
    .await?;
"###;
