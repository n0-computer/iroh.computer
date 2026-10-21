//! Content for `/docs/concepts/router`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsRouter() -> Element {
    rsx! {
        h1 { id: "router", "Router" }
        p {
            "To make composing protocols easier, iroh includes a "
            em { "router" }
            " for composing together multiple protocols."
        }
        p {
            "The router implements the "
            a { href: "/docs/concepts/protocol#the-accept-loop", "accept loop" }
            " on your behalf, and routes incoming connections to the correct protocol based on the "
            a { href: "/docs/concepts/protocol#alpns", "ALPN" }
            ". We recommend using the router to compose protocols, as it makes it easier to add new protocols to your application."
        }
        p {
            "We use the term "
            em { "router" }
            " because it mimics what an HTTP server would do with an URL-based router."
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "You can add whatever protocols you need to the router, multiplexing them all over the same endpoint."
        }
    }
}
const EXAMPLE_1: &str = r###"use anyhow::Result;
use iroh::protocol::Router;
use iroh::Endpoint;
use iroh_blobs::{store::mem::MemStore, BlobsProtocol};


#[tokio::main]
async fn main() -> Result<()> {
    // Build an endpoint, defaulting to the public n0 relay network
    let endpoint = Endpoint::bind().await?;

    // We initialize an in-memory backing store for iroh-blobs
    let store = MemStore::new();

    // Then we initialize a struct that can accept blobs requests over iroh connections
    let blobs = BlobsProtocol::new(&store, None);

    // Build our router and add the blobs protocol,
    // identified by its ALPN. Spawn the router to start listening.
    let router = Router::builder(endpoint)
        .accept(iroh_blobs::ALPN, blobs)
        .spawn();

    // get our own address. At this point we have a running router
    // that's ready to accept connections.
    let addr = router.endpoint().addr();

    // Wait for exit
    tokio::signal::ctrl_c().await?;

    // Gracefully close the endpoint & protocols.
    // This makes sure that remote endpoints are notified about possibly still open connections
    // and any data is written to disk fully (or any other shutdown procedure for protocols).
    router.shutdown().await?;

    Ok(())
}
"###;
