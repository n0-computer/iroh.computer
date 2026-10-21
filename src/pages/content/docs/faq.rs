//! Content for `/docs/faq`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsFaq() -> Element {
    rsx! {
        h1 { id: "frequently-asked-questions", "Frequently Asked Questions" }
        p {
            "You asked and we answer! This is a curated collection of answers to some of the most frequent questions we get."
        }
        h2 { id: "does-iroh-use-relay-servers", "Does iroh use relay servers?" }
        p {
            {EXAMPLE_1}
            a { href: "https://en.wikipedia.org/wiki/Hole_punching_(networking)",
                "hole-punching"
            }
            {EXAMPLE_2}
        }
        h2 { id: "can-relays-read-the-traffic-they-route", "Can relays read the traffic they route?" }
        p {
            strong { "No, all connections in iroh are end-to-end encrypted." }
            {EXAMPLE_3}
        }
        h2 { id: "how-secure-is-iroh-s-end-to-end-encryption",
            "How secure is iroh's end-to-end encryption?"
        }
        p {
            {EXAMPLE_4}
            a { href: "https://github.com/libp2p/specs/blob/master/tls/tls.md",
                "the libp2p handshake specification"
            }
            {EXAMPLE_5}
            a { href: "https://datatracker.ietf.org/doc/html/rfc7250",
                "raw public key TLS certificate type"
            }
            {EXAMPLE_6}
            a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Connecting.html#method.into_0rtt",
                "opt-in 0-RTT feature"
            }
            "."
        }
        h2 { id: "what-if-number-0-stops-running-relay-servers",
            "What if number 0 stops running relay servers?"
        }
        p {
            "The relay servers we run in production "
            a { href: "https://github.com/n0-computer/iroh/tree/main/iroh-relay",
                "are open-source"
            }
            {EXAMPLE_7}
            a { href: "https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment",
                "ACME"
            }
            {EXAMPLE_8}
            a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Builder.html#method.relay_mode",
                code { "RelayMap" }
            }
            {EXAMPLE_9}
        }
        h2 { id: "is-establishing-a-connection-without-relays-or-when-offline-possible",
            "Is establishing a connection without relays or when offline possible?"
        }
        p {
            {EXAMPLE_10}
            code { "EndpointAddr" }
            {EXAMPLE_11}
            a { href: "https://docs.rs/iroh/latest/iroh/endpoint/struct.Builder.html#method.discovery_local_network",
                "local network discovery"
            }
            " to help establish connections in LANs even when the "
            code { "EndpointAddr" }
            " doesn't contain direct addresses."
        }
        h2 { id: "how-can-i-control-which-relay-servers-iroh-connects-to",
            "How can I control which relay servers iroh connects to?"
        }
        p {
            {EXAMPLE_12}
            a { href: "https://docs.rs/iroh/latest/iroh/defaults/prod/index.html",
                "default "
                code { "RelayMap" }
            }
            {EXAMPLE_13}
            code { "Discovery" }
            " service, you gain control over the relay URLs iroh can discover."
        }
        h2 { id: "what-is-discovery-in-iroh-and-which-one-should-i-enable",
            "What is \"Discovery\" in iroh and which one should I enable?"
        }
        p {
            "For most usage, using the services that are enabled by default in the "
            code { "iroh::Endpoint::builder" }
            {EXAMPLE_14}
            a { href: "https://docs.rs/iroh/latest/iroh/discovery/index.html", "discovery module" }
            {EXAMPLE_15}
        }
        h2 { id: "how-is-iroh-development-funded", "How is iroh development funded?" }
        p {
            {EXAMPLE_16}
            a { href: "https://n0.computer/n0ps", "https://n0.computer/n0ps" }
            {EXAMPLE_17}
        }
        h2 { id: "how-do-iroh-and-libp2p-compare", "How do iroh and libp2p compare?" }
        p {
            "Generally, we've put a lot of effort into making iroh \"peer to peer connections that "
            em { "just work" }
            {EXAMPLE_18}
            a { href: "https://en.wikipedia.org/wiki/QUIC", "QUIC" }
            {EXAMPLE_19}
            em { "protocols" }
            " on top, see for example "
            a { href: "https://github.com/n0-computer/iroh-gossip/", "iroh-gossip" }
            {EXAMPLE_20}
            em { "does" }
            {EXAMPLE_21}
        }
        h2 { id: "is-iroh-post-quantum-secure", "Is iroh post-quantum-secure?" }
        p {
            {EXAMPLE_22}
            em { "today" }
            {EXAMPLE_23}
        }
    }
}
const EXAMPLE_1: &str = r###"Iroh uses relay servers to support establishing direct connections, to speed up initial connection times, and to provide a fallback should direct connections between two endpoints fail or be impossible otherwise.
By default iroh is configured with three relay servers run by number 0.
One in the US, one in Europe and one in Asia.
We can afford to run these servers for free, because "###;
const EXAMPLE_2: &str = r###" rates with iroh are really high.
Still, to prevent abuse, we rate-limit throughput through our public relays."###;
const EXAMPLE_3: &str = r###"
We use QUIC which is based on TLS 1.3.
From the perspective of our QUIC implementation, the relay is "just another UDP socket" for sending encrypted packets around.
Because the relays are relaying traffic, they theoretically know that Endpoint ID X talks to Endpoint ID Y and how many bytes are sent this way, but only for as long as these endpoints haven't established a direct connection yet.
However, we don't record this data on our relays."###;
const EXAMPLE_4: &str = r###"Iroh provides a secure, encrypted, forward and backward-secret, authenticated data channel between you and the recipient and protects you both from eavesdroppers.
This assumes the Endpoint ID you're connecting to was exchanged securely, e.g. via scanning a QR code, sharing a link with the Endpoint ID in an encrypted chat app or using a trusted server and the corresponding secret keys haven't been compromised.
The established connection is a QUIC connection, which together with TLS 1.3 specifies how it's encrypted.
This specification is widely used, for example as part of the latest generation of HTTP, HTTP3.
Instead of PKI-based certificates, at the moment iroh uses self-signed certificates with Endpoint IDs to authenticate both ends of the connection, borrowing "###;
const EXAMPLE_5: &str = r###".
In the future, we plan on switching to the "###;
const EXAMPLE_6: &str = r###" instead.
To make use of this end-to-end encryption, no additional setup in iroh is required, it is always enabled.
Be aware of security caveats to forward secrecy when using the "###;
const EXAMPLE_7: &str = r###", and we highly encourage you to run your own!
You need a server with a public IP address and a DNS name that points to that IP address.
Automatic TLS setup via "###;
const EXAMPLE_8: &str = r###" is built into the iroh-relay code.
Use the configured DNS name to add your relay to the "###;
const EXAMPLE_9: &str = r###" you configure your iroh endpoint with.
Running a custom relay server doesn't prevent you from connecting to others connected to other relay servers."###;
const EXAMPLE_10: &str = r###"Yes.
When you share a "###;
const EXAMPLE_11: &str = r###"s with "direct addresses", then iroh will try to use these addresses to establish a connection with or without a relay.
If you're in a local network together you can enable "###;
const EXAMPLE_12: &str = r###"Iroh will only talk to relay servers that it knows URLs for.
By default iroh is configured with 3 relay servers from the "###;
const EXAMPLE_13: &str = r###".
If you do not disable the default discovery services or other discovery services, then iroh might connect to relay servers discovered that way.
By changing iroh's relay mode or relay map you can control the home relay the endpoint connects to, and by wrapping or writing your own "###;
const EXAMPLE_14: &str = r###" is the best default.
Discovery helps iroh find ways to connect to a specific Endpoint ID.
The Endpoint ID on its own can only be used to identify if you're talking to the right recipient, but doesn't tell how to address the recipient on its own.
Via configured discovery mechanisms, iroh resolves an Endpoint ID to IP addresses and relay URLs that help to actually attempt a connection.
For more information on available discovery mechanisms, take a look at the "###;
const EXAMPLE_15: &str = r###".
It's also possible to combine multiple discovery mechanisms at once, or write your own.
We think it's particularly helpful to write application-specific discovery mechanisms that are tailored to an application's need."###;
const EXAMPLE_16: &str = r###"The company behind iroh is number 0.
It is partly venture capital and partly founder backed (as in: founders have invested their own money).
Number 0 is healthy and has investors we actually think are a value-add.
We earn revenue from customers today through "###;
const EXAMPLE_17: &str = r###", and are re-launching an “AWS for iroh  protocols” in 2025.
While it will be a service you can pay for, it won’t have special treatment beyond being convenient.
We rely on iroh remaining open source, and are committed to keeping it that way, including server-side code for relays and DNS discovery."###;
const EXAMPLE_18: &str = r###"".
This means we've kept the scope small: There's no DHT, swarm, or gossipsub.
Instead, what you get are reliable direct "###;
const EXAMPLE_19: &str = r###" connections between iroh endpoints.
On top of these, some of said libp2p features can be implemented as "###;
const EXAMPLE_20: &str = r###" which provides gossipsub-like functionality.
While there are some features in libp2p like a DHT implementation based on kademlia that don't exist in the iroh ecosystem yet, we believe the features iroh "###;
const EXAMPLE_21: &str = r###" have work better.
The iroh project was founded by developers who were deeply involved with libp2p, and wanted to build a more focused library with less configuration that would be easier to deploy and use with high reliability."###;
const EXAMPLE_22: &str = r###"No.
Iroh uses Ed25519 for signing and X25519/P-256 for ECDH.
These algorithms are not post-quantum-secure.
Adopting the current best post-quantum-secure algorithm, for example Xyber, would incur a very significant network overhead:
A Xyber public key is 37x larger than an Ed25519 public key.
This has implications for connection establishment speed:
For example, the initial handshake for a connection wouldn't fit into a normal UDP packet anymore.
It also means DNS packets used for DNS discovery at the moment might get fragmented, etc.
It would also mean Endpoint IDs would be exactly 37x as big.
To support post-quantum-cryptography, we would need to trade off usability with the risk should a sufficiently powerful quantum computers would become real.
We believe it is much more important to serve existing use cases efficiently, so they have encryption "###;
const EXAMPLE_23: &str = r###".
We fully believe the work on post-quantum-cryptography is good and important and follow developments closely."###;
