//! Content for `/docs/concepts/endpoint-addr`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsEndpointAddr() -> Element {
    rsx! {
        h1 { id: "endpoint-addresses", "Endpoint Addresses" }
        p {
            "Endpoint Addresses or "
            a { href: "https://docs.rs/iroh/latest/iroh/struct.EndpointAddr.html",
                code { "EndpointAddrs" }
            }
            " are a common struct you'll interact when working with iroh to tell iroh what & where to dial. In rust they look like this:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "You'll interact with "
            code { "EndpointAddr" }
            "s a fair amount when working with iroh. It's also quite normal to construct addresses manually from, say, endpoint identifiers stored in your application database."
        }
        p {
            "When we call "
            a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Endpoint.html#method.connect",
                code { "connect" }
            }
            " on an "
            a { href: "https://www.iroh.computer/docs/concepts/endpoint", "Endpoint" }
            ", we need to pass either a "
            code { "EndpointAddr" }
            ", or something that can turn into a "
            code { "EndpointAddr" }
            ". In iroh "
            code { "Endpoint" }
            "s will have different fields populated depending on where they came from, and the discovery services you've configured your endpoint with."
        }
        h3 { id: "interaction-with-discovery", "Interaction with discovery" }
        p {
            "From the above struct, the only "
            em { "required" }
            " field is the "
            code { "id" }
            ". And because of this, there's an implementation of "
            code { "From" }
            " that can turn "
            code { "EndpointIDs" }
            " directly into EndpointAddrs. "
            em {
                "but this will only work if you have a discovery service that can resolve EndpointIDs enabled"
            }
            ". Thankfully, we enable discovery by default:"
        }
        pre {
            code { {EXAMPLE_2} }
        }
        p {
            "This is why we actively encourage configuring a discovery service, and DNS is the most common one we recommend. Because we're in p2p land dialing details & even home relays for an endpoint can change on very short notice, making this data go stale quickly. Endpoint Identifiers are a practical source of stability that counteracts this."
        }
        h3 { id: "when-to-provide-full-details", "When to provide full details" }
        p {
            "If you have full dialing details, it's well worth providing them as part of a "
            code { "EndpointAddr" }
            " passed to "
            code { "connect" }
            ". Iroh can use this to skip the network roundtrip required to either do initial address discovery, or update cached addresses. So if you have a source of up to date home relay & dialing info, provide it!"
        }
        h3 { id: "don-t-store-relay-url-direct-addresses-values",
            "Don't store relay_url & direct_addresses values"
        }
        p {
            "If you're persisting the contents of "
            code { "EndpointAddrs" }
            " in your app, it's probably not worth keeping the "
            code { "relay_url" }
            " and "
            code { "direct_address" }
            " fields, unless you "
            em { "know" }
            " these details are unlikely to change. Providing stale details to the endpoint can slow down connection construction."
        }
    }
}
const EXAMPLE_1: &str = r###"pub struct Addr {
    pub id: PublicKey,
    pub addrs: BTreeSet<TransportAddr>,
}
"###;
const EXAMPLE_2: &str = r###"use iroh::Endpoint;

// enables dialing by EndpointAddrs that only have EndpointIDs by default:
let ep = Endpoint::builder()
    .bind()
    .await?;
"###;
