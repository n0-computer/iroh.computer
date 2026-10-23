//! Content for `/docs/tour/4-protocols`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsTour4Protocols() -> Element {
    rsx! {
        h1 { id: "4-protocols", "4. Protocols" }
        p {
            "At this point, we’re connected, yay! Now we just have to… do something… with that connection. That’s where protocols come in."
        }
        p {
            "Protocols are modules you compose together to add functionality to connections. Protocols exist for file transfer, game server sync, message broadcasting, document collaboration, all kinds of stuff. You can use off-the-shelf protocols to quickly add functionality, work directly with QUIC streams & build a fully custom protocol that does exactly what you want, or fork an existing protocol to get what you need."
        }
        p {
            "Coming from the world of HTTP client/server models, protocols are kinda like request handlers, but they can go beyond request/response creating multiple streams of data and usually code up both initiating & accepting protocol connections in the same."
        }
        p {
            "Protocols are an ever-growing topic, but to give you a basic idea, let's add the "
            a { href: "/proto/iroh-blobs", "blobs" }
            " protocol. First we need to add it to our dependencies:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p { "then adjust our code:" }
        pre {
            code { {EXAMPLE_2} }
        }
        aside { class: "note",
            p {
                "This code doesn't actually "
                em { "do" }
                " anything with the blobs protocol. For a real-world example, check out "
                a { href: "https://github.com/n0-computer/sendme", "sendme" }
            }
        }
        p {
            "This code sets up everything we need to both provide data we have locally when others request it, and ask other endpoints that run the blobs protocol for data. Starting at the top, we first construct the endpoint, then we construct an instance of the blobs protocol, then add a "
            em { "router" }
            " (more on that in a minute) that listens for blobs protocol connections."
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
const EXAMPLE_1: &str = r###"cargo add iroh-blobs
"###;
const EXAMPLE_2: &str = r###"use iroh::{protocol::Router, Endpoint};
use iroh_blobs::{store::mem::MemStore, BlobsProtocol};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let endpoint = Endpoint::bind().await?;

    let store = MemStore::new();

    let blobs = BlobsProtocol::new(&store, None);

    // build the router
    let router = Router::builder(endpoint)
        .accept(iroh_blobs::ALPN, blobs)
        .spawn();

    router.shutdown().await?;

    Ok(())
}
"###;
