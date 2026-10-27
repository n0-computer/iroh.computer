//! Content for `/docs/tour/1-endpoints`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsTour1Endpoints() -> Element {
    rsx! {
        h1 { id: "1-endpoints", "1. Endpoints" }
        p {
            "The journey of a connection starts with an endpoint. An endpoint is one of the two termination points for a connection. It’s one of the tin cans that the wire is connected to. Because this is peer-2-peer, endpoints both "
            em { "initiate" }
            " "
            em { "and" }
            " "
            em { "accept" }
            " connections. The endpoint handles both."
        }
        p {
            "Let's first add iroh to our project. From the project root run "
            code { "cargo add iroh" }
            " to install the latest version:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p { "We're also going to need a few supporting libraries so let's add those as well:" }
        pre {
            code { {EXAMPLE_2} }
        }
        p {
            "In the end your "
            code { "Cargo.toml" }
            " file's "
            code { "[dependencies]" }
            " section should look something like this. It's ok if the version numbers are slightly different:"
        }
        pre {
            code { {EXAMPLE_3} }
        }
        h2 { id: "starting-an-endpoint", "Starting an Endpoint" }
        p {
            "With our dependencies added, open up "
            code { "src/main.rs" }
            " and add the following code:"
        }
        pre {
            code { {EXAMPLE_4} }
        }
        p {
            "Then save and run your program with "
            code { "cargo run" }
            ". You should see output similar to this:"
        }
        pre {
            code { {EXAMPLE_5} }
        }
        aside { class: "note",
            p {
                "This code just prints its ID & exits. For a more complete example, check out the "
                a { href: "https://github.com/n0-computer/iroh/blob/main/iroh/examples/connect.rs",
                    "connect example"
                }
            }
        }
        p {
            "The non-setup part of this program adds up to 3 lines of code, and one of them is a print statement! The first line constructs an endpoint. 99% of apps will have a single endpoint in the entire app, so you’ll build the endpoint once, and refer to it a bunch. Then we call "
            em { "bind" }
            " to ask the operating system for a networking port. This calling bind will kick off work in the background that we’ll talk about in a bit."
        }
        p {
            "Those three lines are the beating heart of adding iroh to an app. Once the endpoint ID prints we have an active endpoint that's ready to connect & (if configured to) accept connections. Everything else builds up from here."
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
const EXAMPLE_1: &str = r###"$ cargo add iroh
    Updating crates.io index
      Adding iroh v0.32.1 to dependencies
             Features:
             + metrics
             - discovery-pkarr-dht
             - discovery-local-network
             - examples
             - test-utils
    Updating crates.io index
     Locking 432 packages to latest compatible versions
"###;
const EXAMPLE_2: &str = r###"cargo add tokio anyhow rand
"###;
const EXAMPLE_3: &str = r###"[dependencies]
anyhow = "1.0.95"
iroh = "0.32.1"
rand = "0.8.5"
tokio = "1.43.0"
"###;
const EXAMPLE_4: &str = r###"#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create an endpoint
    let builder = iroh::Endpoint::builder();

    // bind it to a socket
    let endpoint = builder.bind().await?;

    // print this endpoint's id
    println!("endpoint id: {:?}", endpoint.id());

    // exit the program
    Ok(())
}
"###;
const EXAMPLE_5: &str = r###"b5 at number-0 in ~/code/iroh-tour (main●)
$ cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.80s
     Running `/Users/b5/.cargo/build/debug/iroh-tour`
endpoint id: PublicKey(95224c92856163add8a9cb68a81183aa5d9881c4def58625a9f4266a0743b479)
"###;
