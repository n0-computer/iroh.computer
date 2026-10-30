//! Content for `/docs/overview`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsOverview() -> Element {
    rsx! {
        h1 { id: "overview", "Overview" }
        p { {EXAMPLE_1} }
        h2 { id: "iroh-is-dial-by-public-key", "Iroh is \"dial by public key\"" }
        p {
            "In the iroh world, you dial another endpoint by its "
            code { "EndpointId" }
            {EXAMPLE_2}
            em { "always" }
            " end-to-end encrypt and authenticate connections."
        }
        h2 { id: "peer-to-peer", "Peer to peer" }
        p { "Iroh is built on peer-to-peer QUIC using both relays and holepunching." }
        p { {EXAMPLE_3} }
        p { {EXAMPLE_4} }
        p { {EXAMPLE_5} }
        h2 { id: "iroh-is-built-on-quic", "Iroh is built on QUIC" }
        p { "This gives iroh super-powers:" }
        ul {
            li { "encryption & authentication" }
            li {
                {EXAMPLE_6}
                ul {
                    li { "no head-of-line blocking issues" }
                    li { "stream priorities" }
                    li { "one shared congestion controller" }
                }
            }
            li { "an encrypted, unreliable datagram transport" }
            li {
                "zero round trip time connection establishment if you've connected to another endpoint before"
            }
        }
        p { "A single QUIC connection can power all of your protocol's complex interactions:" }
        ul {
            li {
                "Stream both video and audio without video packet loss affecting audio. Prioritize audio by increasing that stream's priority."
            }
            li {
                "Use the unreliable datagram transport for your game's state and input networking. Also re-use the same connection for streaming assets or real-time audio or video."
            }
            li {
                "Avoid unnecessary network round-trips when your phone comes back from suspension with zero round trip time connection establishment."
            }
        }
        h2 { id: "the-higher-level-give-your-users-agency-back",
            "The higher level: Give your users agency back"
        }
        p { {EXAMPLE_7} }
        p {
            "This gives users back power and agency to use their devices the way they want to."
            br {}
            {EXAMPLE_8}
            br {}
            {EXAMPLE_9}
            br {}
            {EXAMPLE_10}
            em { "baseline" }
            " feature: Encryption."
        }
        h2 { id: "want-to-see-where-iroh-s-headed", "Want to see where iroh's headed?" }
        p {
            "See "
            a { href: "/roadmap", "our roadmap" }
            " to find out what's planned."
        }
    }
}
const EXAMPLE_1: &str = r###"Iroh lets you establish direct peer-to-peer connections whenever possible, falling back to relay servers if necessary.
This gives you fast, reliable QUIC connections that are authenticated and encrypted end-to-end."###;
const EXAMPLE_2: &str = r###", a 32-byte ed25519 public key. Unlike IP addresses, this ID is globally unique, and instead of being assigned, you can cheaply generate as many as you want yourself. It also doesn't change when you change networks.
You won't have to think about NATs getting in your way, iroh traverses them for you.
Basing connections on asymmetric public keys is what allows iroh to "###;
const EXAMPLE_3: &str = r###"Peers must know the EndpointId of a peer before connecting to it.
They verify this EndpointId during the connection handshake to provide end-to-end encryption and authentication."###;
const EXAMPLE_4: &str = r###"Peer to peer connectivity is established with the help of a relay server.
On startup peers register their EndpointId with a home relay server.
The relay server provides assistance to traverse firewalls,
NATs or others alike.
If no direct connection can be established,
the connection is relayed via the server."###;
const EXAMPLE_5: &str = r###"Peers can also connect directly without using a relay server.
For this,
however,
the listening peer must be directly reachable by the connecting peer via one of it's addresses."###;
const EXAMPLE_6: &str = r###"stream multiplexing
"###;
const EXAMPLE_7: &str = r###"Iroh bootstraps a new internet: Your user's home computer is as inter-connected as a virtual private server.
There might not be a need for intermediaries if their powerful smartphone can accept incoming connections like any other service."###;
const EXAMPLE_8: &str = r###"
No need to fight for static IP addresses from your ISP."###;
const EXAMPLE_9: &str = r###"
No need to buy domain names to participate in the internet."###;
const EXAMPLE_10: &str = r###"
No need to set up complicated TLS certificates to get what should be a "###;
