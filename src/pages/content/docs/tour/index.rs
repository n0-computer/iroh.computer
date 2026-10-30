//! Content for `/docs/tour`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsTourIndex() -> Element {
    rsx! {
        h1 { id: "a-tour-of-iroh", "A Tour of iroh" }
        p {
            "Let's take a tour of iroh! This tutorial will touch on 5 core concepts and a few supporting ideas that will get you familiar with what iroh does and how it works."
        }
        p {
            "We're going to do this tutorial in rust, so the first thing we'll need to do is confirm you have a working rust environment. If you don't, you can install it by following the instructions at "
            a { href: "https://www.rust-lang.org/tools/install",
                "https://www.rust-lang.org/tools/install"
            }
            " for your operating system."
        }
        p {
            "Once you're up & running, let's create a new rust project by running the following command in your terminal:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p {
            "This will create an empty rust project in a new directory called "
            code { "iroh-tour" }
            ". Change into that directory and open it in your favorite code editor. You should be able to run it from the project root, run it with "
            code { "cargo run" }
            " and see something like this:"
        }
        pre {
            code { {EXAMPLE_2} }
        }
        h2 { id: "overview", "Overview" }
        p { "Here's a high level overview of how everything fits together:" }
        p {
            "Iroh is a library for establishing the most direct QUIC connection possible between two devices. Every "
            em { "endpoint" }
            " uses the public half of a cryptographic keypair to identify itself. Assuming at least one configured "
            em { "relay server" }
            " is reachable, an endpoint keeps exactly one TCP connection to a “home relay” that other endpoints use for connection establishment, and as a fallback transport. Iroh uses a suite of "
            em { "discovery services" }
            " to resolve home relays & endpoint IDs. Connections between endpoints use QUIC ALPNs to distinguish between "
            em { "protocols" }
            ", while "
            em { "routers" }
            " automate the endpoint accept loop for protocol multiplexing."
        }
        p { "This paragraph touches on five key points worth understanding in iroh:" }
        ul {
            li {
                a { href: "/docs/tour/1-endpoints", "Endpoints" }
            }
            li {
                a { href: "/docs/tour/2-relays", "Relays" }
            }
            li {
                a { href: "/docs/tour/3-discovery", "Discovery" }
            }
            li {
                a { href: "/docs/tour/4-protocols", "Protocols" }
            }
            li {
                a { href: "/docs/tour/5-routers", "Routers" }
            }
        }
        p {
            "We'll touch on each of these on the tour, and by the end you should have a good understanding of how they all fit together. The code we'll be writing here will build & execute, but it won't "
            em { "do" }
            " much. We'll link to examples and other resources along the way so you can explore further."
        }
        a { href: "/docs/tour/1-endpoints", class: "button",
            p { "Begin the Tour" }
        }
    }
}
const EXAMPLE_1: &str = r###"cargo new iroh-tour
"###;
const EXAMPLE_2: &str = r###"$ cargo run
   Compiling iroh-tour v0.1.0 (/Users/b5/code/iroh-tour)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.69s
     Running `/Users/b5/.cargo/build/debug/iroh-tour`
Hello, world!
"###;
