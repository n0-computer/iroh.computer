//! Content for `/docs/concepts/protocol`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsProtocol() -> Element {
    rsx! {
        h1 { id: "protocols", "Protocols" }
        p {
            "Iroh is organized into "
            em { "protocols" }
            ": Composable networking software built on iroh connections."
        }
        p {
            "The foundation of iroh is direct connections, which protocols use to extend up to higher-level functionality. When integrating iroh into an application you can use protocols to quickly add functionality, or write your own protocol(s) to maintain total control over how your application communicates."
        }
        h2 { id: "alpn-identifiers", "ALPN identifiers" }
        p {
            "Iroh builds on QUIC connections, and uses "
            a { href: "https://datatracker.ietf.org/doc/html/rfc7301",
                "application level protocol negotiation"
            }
            " (ALPN, a widely used and well specified TLS extension) to run multiple protocols on the same QUIC endpoint. An ALPN identifier is the string that identifies the protocol and is used for protocol negotiation between endpoints. For example, the "
            a { href: "/proto/iroh-blobs", "iroh-blobs" }
            " protocol ALPN is "
            a { href: "https://github.com/n0-computer/iroh-blobs/blob/124820698cd85691e0d72aeed6e1ac028886b34a/src/protocol.rs#L353",
                code { "/iroh-bytes/4" }
            }
            {EXAMPLE_1}
            a { href: "https://github.com/n0-computer/iroh/issues/2949", "In the future" }
            " you'll be able to use multiple ALPN identifiers when connecting as a way to negotiate e.g. protocol versions. For example, you would connect using "
            code { "/iroh-bytes/5" }
            " as well as "
            code { "/iroh-bytes/4" }
            ", and the other side could respond with "
            code { "/iroh-bytes/4" }
            " to indicating it doesn't have support for "
            code { "/iroh-bytes/5" }
            "."
        }
        h2 { id: "the-accept-loop", "The Accept Loop" }
        p {
            "The accept loop is the main loop of an iroh server. It listens for incoming connections, and then processes them. The accept loop is the entry point for all iroh protocols, and is where you can add your own protocol to the iroh stack."
        }
        p {
            "Coming from the world of HTTP servers, the accept loop is similar to the main loop of an HTTP server. The main difference is that the accept loop is more flexible, as it can run multiple protocols on the same endpoint. Normally HTTP servers hide the raw accept loop from you, and instead route to the correct handler based on the URL. In iroh, the accept loop is exposed to you, and you can use it to route to the correct protocol based on the ALPN."
        }
    }
}
const EXAMPLE_1: &str = r###".
This makes sure that an endpoint that accepts a connection can gracefully indicate whether it supports the requested protocol.
"###;
