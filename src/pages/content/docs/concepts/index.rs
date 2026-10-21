//! Content for `/docs/concepts`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsIndex() -> Element {
    rsx! {
        h1 { id: "concepts", "Concepts" }
        section {
            h2 { id: "iroh-protocols", "iroh protocols" }
            article {
                h3 { id: "documents",
                    a { href: "/docs/protocols/documents", "Documents" }
                }
                p { "Documents are portable, syncable key-value stores" }
            }
            article {
                h3 { id: "sdks",
                    a { href: "/docs/protocols/blobs", "SDKs" }
                }
                p { "Content-addressable storage & transfer of any-sized binary data" }
            }
            article {
                h3 { id: "todos-example",
                    a { href: "/docs/protocols/net", "Todos Example" }
                }
                p { "Connect to any device by endpoint ID" }
            }
        }
    }
}
