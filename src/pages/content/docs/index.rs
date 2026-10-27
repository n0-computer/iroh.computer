//! Content for `/docs`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsIndex() -> Element {
    rsx! {
        h1 { id: "iroh-documentation", "Iroh Documentation" }
        p { {EXAMPLE_1} }
        div {
            a { href: "/docs/quickstart", class: "button", "Quickstart" }
        }
        h2 { id: "getting-started", "Getting started" }
        p {
            "The best place to start is by reading the overview, a high level look at the problems iroh solves."
        }
        div {
            a { href: "/docs/overview", class: "button", "Read the Overview" }
        }
        section {
            h2 { id: "resources", "Resources" }
            article {
                h3 { id: "protocol-registry",
                    a { href: "/proto", "Protocol Registry" }
                }
                p { "Iroh Protocols are pluggable extensions that build on direct connections." }
            }
            article {
                h3 { id: "awesome-list",
                    a { href: "https://github.com/n0-computer/awesome-iroh", "Awesome List" }
                }
                p { "Projects & resources building with iroh!" }
            }
            article {
                h3 { id: "faq",
                    a { href: "/docs/faq", "FAQ" }
                }
                p { "Frequently asked questions." }
            }
        }
    }
}
const EXAMPLE_1: &str = r###"Iroh lets you establish direct peer-to-peer connections whenever possible, falling back to relay servers if necessary.
This gives you fast, reliable connections that are authenticated and encrypted end-to-end using QUIC."###;
