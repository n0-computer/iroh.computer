//! Content for `/docs/tour/5-routers`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsTour5Routers() -> Element {
    rsx! {
        h1 { id: "5-routers", "5. Routers" }
        p {
            "Most apps will use more than one protocol. A router let’s you stack protocols on top of iroh's peer-to-peer connections. Routers handle the "
            em { "accept" }
            " side of an iroh endpoint, but the connection initiation side is still handled by the protocol instance itself."
        }
        p {
            "Since we've already set up a router when adding iroh blobs, we can add another protocol to the router with a few lines of code. Let's add iroh gossip, first by installing the dependency:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p { "Then we can setup gossip & add it to our router:" }
        pre {
            code { {EXAMPLE_2} }
        }
        p {
            "The amount of code is small, but the conceptual shift is a nice-to-have, wrapping an endpoint in a router makes the design intent of iroh clear: set up an endpoint, pull in protocols, feed them to the router, and bind your way to glory."
        }
        div {
            div {
                a {}
            }
            div {
                a {}
            }
        }
    }
}
const EXAMPLE_1: &str = r###"cargo add iroh-gossip
"###;
const EXAMPLE_2: &str = r###"use iroh::{protocol::Router, Endpoint};
use iroh_blobs::{store::mem::MemStore, BlobsProtocol};
use iroh_gossip::Gossip;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let endpoint = Endpoint::bind().await?;
    let store = MemStore::new();
    let blobs = BlobsProtocol::new(&store,None);

    let gossip = Gossip::builder().spawn(endpoint.clone());


    //build the router
    let router = Router::builder(endpoint)
        .accept(iroh_blobs::ALPN, blobs)
        .accept(iroh_gossip::ALPN, gossip)
        .spawn();

    router.shutdown().await?;

    Ok(())
}
"###;
