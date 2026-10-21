//! Content for `/docs/tour/3-discovery`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsTour3Discovery() -> Element {
    rsx! {
        h1 { id: "3-discovery", "3. Discovery" }
        p {
            "Discovery is the glue that connects a "
            a { href: "/docs/concepts/endpoint#endpoint-identifiers", "Endpoint Identifier" }
            " to something we can dial. There are a few different types of discovery services, but for all of them you put a "
            code { "EndpointID" }
            " in, and get back either the home relay of that endpoint, or IP addresses to dial."
        }
        p {
            "There are different implementations of the discovery service in iroh, the most popular of which are DNS & Local Discovery. DNS uses the same domain name system that connects \"example.com\" to an IP address to map endpoint ids to relay servers, and local discovery uses your local network to find endpoints to talk to on local WiFi, even if that WiFi network doesn’t have a wider internet connection."
        }
        h3 { id: "dns-discovery", "DNS Discovery" }
        p {
            "Iroh endpoints come with some defaults that include using our public infrastructure to enable discovery:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "Now when this endpoint boots up, it will list itself on the n0 DNS service. From here we can pass along the endpoint identifier, and other endpoints can use the n0 DNS service to find the home relay of this endpoint."
        }
        h3 { id: "local-discovery", "Local Discovery" }
        p {
            "Local discovery has the extra trick of being able to actually find new endpoints on the local network. Before we can do that, we need to add the "
            code { "discovery-local-network" }
            " feature to our "
            code { "Cargo.toml" }
            " file:"
        }
        pre {
            code { {EXAMPLE_2} }
        }
        p {
            "This will change our "
            code { "Cargo.toml" }
            " file "
            code { "[dependencies]" }
            " section to look like this:"
        }
        pre {
            code { {EXAMPLE_3} }
        }
        p { "And with that we can set up local discovery, alongside our default discovery:" }
        pre {
            code { {EXAMPLE_4} }
        }
        p {
            "Here we’ve added discovery to the endpoint constructor, passing in our two default and one custom discovery services, and that’s it, iroh will now use these three services to get something it can dial for a given endpoint ID."
        }
        aside { class: "note",
            p {
                "For an example of this in action, check out the "
                a { href: "https://github.com/n0-computer/iroh/blob/main/iroh/examples/locally-discovered-nodes.rs",
                    "local discovery example"
                }
                "."
            }
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
const EXAMPLE_1: &str = r###"use iroh::Endpoint;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let endpoint = Endpoint::bind().await?;

    println!("endpoint id: {:?}", endpoint.id());
    Ok(())
}
"###;
const EXAMPLE_2: &str = r###"cargo add iroh --features discovery-local-network
"###;
const EXAMPLE_3: &str = r###"[dependencies]
anyhow = "1.0.95"
iroh = { version = "0.32.1", features = ["discovery-local-network"] }
rand = "0.8.5"
tokio = "1.43.0"
"###;
const EXAMPLE_4: &str = r###"use iroh::Endpoint;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let mdns = iroh::discovery::mdns::MdnsDiscovery::builder();
    let builder = Endpoint::builder()
        .discovery(mdns);

    let endpoint = builder.bind().await?;
    println!("endpoint id: {:?}", endpoint.id());
    Ok(())
}
"###;
