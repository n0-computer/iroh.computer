//! Content for `/docs/concepts/endpoint`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsEndpoint() -> Element {
    rsx! {
        h1 { id: "endpoints", "Endpoints" }
        p {
            "An "
            em { "endpoint" }
            " is the main API interface to create connections to, and accept connections from other iroh endpoints. The connections are peer-to-peer and encrypted, a "
            a { href: "/docs/concepts/relay", "Relay" }
            " server is used to make the connections reliable. Endpoints have a "
            code { "EndpointID" }
            " (the public half of an Ed25519 keypair) and the private key used to sign and decrypt messages."
        }
        p {
            "Generally, an application will have a single endpoint instance. This ensures all the connections made share the same peer-to-peer connections to other iroh endpoints, while still remaining independent connections. This will result in more optimal network behaviour."
        }
        p { "Somewhere in a program that uses iroh for direct connections, you'll see code like this:" }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "Breaking that down, "
            code { "bind" }
            " creates the endpoint and starts listening for incoming connections, while the "
            code { "await" }
            " keyword is used to wait for the endpoint to be created in an asynchronous context."
        }
        p {
            "Once you have an endpoint, you can use it to create connections to other endpoints, or accept incoming connections from other endpoints."
        }
        h2 { id: "endpoint-identifiers", "Endpoint Identifiers" }
        p {
            "Each endpoint in iroh has a unique identifier ("
            code { "EndpointID" }
            ") created as a cryptographic key. This can be used to globally identify an endpoint. Because "
            code { "EndpointIDs" }
            " are cryptographic keys, they are also the mechanism by which all traffic is always encrypted for a specific endpoint only."
        }
        p {
            "See the "
            a { href: "https://docs.rs/iroh/latest/iroh/type.EndpointId.html", "EndpointID" }
            " documentation for more info."
        }
        h2 { id: "connections", "Connections" }
        p {
            "Because we're in a peer-2-peer context, either endpoint might be operating as the \"server\", so we use "
            code { "connect" }
            " and "
            code { "accept" }
            " to distinguish between the two. The "
            code { "connect" }
            " method is used to create a new connection to a remote endpoint, while "
            code { "accept" }
            " is used to accept incoming connections from a remote endpoint."
        }
        p {
            "Connections are full-fledged QUIC connections, giving you high-performance bidirectional and unidirectional streams."
        }
        aside { class: "note",
            p {
                "Due to the light-weight properties of QUIC streams a stream can only be accepted once the initiating peer has sent some data on it."
            }
        }
        h2 { id: "building-on-endpoints", "Building on Endpoints" }
        p {
            "Endpoints are a low-level primitive that iroh exposes on purpose. For some projects like "
            a { href: "https://dumbpipe.dev", "dumbpipe" }
            ", endpoints are 95% of what you need to connect any two devices on the planet. For others, like "
            a { href: "/proto/iroh-blobs", "iroh-blobs" }
            ", endpoints are the foundation that higher-level protocols are built on. Most projects will not work with endpoints beyond constructing one and feeding it to one or more "
            a { href: "/docs/concepts/protocol", "protocols" }
            "."
        }
    }
}
const EXAMPLE_1: &str = r###"use iroh::Endpoint;

#[tokio::main]
async fn main() {
    let endpoint = Endpoint::bind().await.unwrap();
    // ...
}
"###;
