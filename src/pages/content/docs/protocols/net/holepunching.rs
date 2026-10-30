//! Content for `/docs/protocols/net/holepunching`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsProtocolsNetHolepunching() -> Element {
    rsx! {
        h1 { id: "hole-punching", "Hole Punching" }
        p {
            "Our plan was to take the open source protocols from Tailscale®, but implement them in Rust over QUIC rather than WireGuard. Specifically, taking Tailscale®’s philosophy of having all of the hole punching happen in a “"
            em { "MagicSocket" }
            "” and using the "
            em { "DERP" }
            " (”Designated Encrypted Relay for Packets”) protocol for packet relays, and the "
            em { "Disco" }
            " (”discovery”) protocol for hole punching."
        }
        p {
            "However, we additionally need the ability to dial using PublicKey, which makes for a tricky dance with the "
            code { "quinn::Endpoint" }
            " and "
            code { "MagicSock" }
            ", since there is no concept of dialing via a public key in QUIC."
        }
        h2 { id: "main-goals", "Main goals" }
        ul {
            li { "Send data as soon as possible" }
            li {
                "Get as close to 100% connection rate as possible (even if that means falling back to a relayed connection)"
            }
        }
        h2 { id: "magicsock", "MagicSock" }
        p {
            "The API is centered around the “MagicSocket” or "
            code { "MagicSock" }
            ". Iroh creates a "
            code { "MagicSock" }
            " and uses that socket as an "
            code { "AsycnUdpSocket" }
            " in a "
            code { "quinn::Endpoint" }
            ". All the connection/hole punching work happens inside of the "
            code { "MagicSock" }
            ". As far as QUIC is concerned, all of the packets going in and out of the "
            code { "quinn::Endpoint" }
            " are being sent over UDP."
        }
        p {
            "In reality, the "
            code { "Magicsock" }
            " binds an IPv4 and IPv6 UDP socket. It also spins up a DERP Client for each DERP server we are configured to connect with over HTTP/HTTPS. You need to be connected to at least one Derper (DERP + STUN server) in order to do any hole punching."
        }
        p {
            "To dial a peer, you must first add the peer to "
            code { "MagicSock" }
            " explicitly via its public key (and any known addresses) and get a “mapped address” in return, which is an IPv6 Unique Local Address with a fixed Global ID and Subnet ID to easily identify it as such. This mapped address is what you pass to the quinn::Endpoint in order to dial that per. This ensures we are able to dial via a public key."
        }
        p {
            "Each time you send packets to a particular peer, the "
            code { "MagicSock" }
            " will request the "
            code { "best_addr" }
            " from its internal peer address book. This means the address and socket on which we send the latest packet may be different from the one we sent previously."
        }
        p {
            "We are also listening for incoming packets on all of these sockets, and pass up any QUIC packets back up to the "
            code { "quinn::Endpoint" }
        }
        h2 { id: "finding-the-best-addr", "Finding the “best addr”" }
        p {
            "When we first create a "
            code { "MagicSock" }
            ", our first step to connectivity is to understand our own networking situation. We do an investigation into all of our own network interfaces and capabilities."
        }
        p {
            "Then, we start a  netcheck report, which attempts to figure out all of our public facing details by doing:"
        }
        ul {
            li { "A STUN requests sent to the Derper (IPv4 & IPv6)" }
            li { "Hair pinning probe" }
            li { "Port mapping probe" }
            li { "Captive portal discovery" }
        }
        p { "Once we’ve gathered all the appropriate information, we are ready to connect." }
        p {
            "To connect to another peer, we at minimum need to know it’s public key and its DERP node. A DERP node is a server that helps establish connections and relays packets over HTTPS as a fallback. Each iroh node is expected to be connected to at least one DERP node, if it wants to attempt any holepunching."
        }
        p {
            "If we have a list of possible addresses for the node to which we want to connect, that’s even better!"
        }
        p {
            "We add those addresses, and the peer’s PublicKey, to the "
            code { "MagicSock" }
            " peer address book. When we attempt to send packets to that peer, we assess the options in the address book for the "
            code { "best_addr" }
            " (UDP address) to send the packets on. An address is a viable "
            code { "best_addr" }
            " if we have sent a ping on that address, and received a pong in return. This lets us know that we can actually communicate on that address and the latency when using that address. The "
            code { "best_addr" }
            " has the lowest latency. If there is no "
            code { "best_addr" }
            " (because we have not received a pong, or because the latency has “expired”) we also send all packets to the peer’s home DERP node to ensure that the packets go through."
        }
        p {
            "If we don’t have a "
            code { "best_addr" }
            " , we start the "
            code { "Disco" }
            " process and try to hole punch."
        }
        h2 { id: "derp-disco", "DERP & Disco" }
        p {
            "If we have not attempted to hole punch to that peer, it’s been a while since we’ve last attempted, or we only have a DERP address and no direct UDP address, we do the hole punching dance, which in our world is referred to as a "
            code { "Disco::CallMeMaybe" }
            " request."
        }
        ul {
            li {
                "Disco messages are encrypted. You must have the PublicKey of the remote peer in order to send a Disco message."
            }
            li {
                "A "
                code { "Disco::CallMeMaybe" }
                " request includes a list of your own public addresses, that you want the remote peer to attempt to dial."
            }
            li {
                code { "Disco::CallMeMaybe" }
                " requests are only ever sent over the DERP relay servers"
            }
            li {
                "At the same time as the "
                code { "Disco::CallMeMaybe" }
                " message is sent, we also send "
                code { "Disco::Ping" }
                " messages to any known UDP addresses of the remote peer"
            }
            li {
                "If the remote server is able to receive any of the "
                code { "Disco::Ping" }
                " messages, it sends a return "
                code { "Disco::Pong" }
                ", telling the node that that particular address is a viable address to communicate over UDP"
            }
            li {
                "When the remote server gets a "
                code { "Disco::CallMeMaybe" }
                " request, it can choose to respond to it with its own "
                code { "Disco::CallMeMaybe" }
                " and "
                code { "Disco::Pings" }
                " on all the given addresses. It will not respond if it has never encountered this "
                code { "PublicKey" }
                " before."
            }
            li {
                "These "
                code { "ping" }
                " / "
                code { "pong" }
                "messages are what do the actual hole punching, and the "
                code { "CallMeMaybe" }
                " messages are what coordinates them."
            }
        }
        p {
            "If at any time during our transmission of packets, we receive a "
            code { "Pong" }
            " from the remote peer, our internal record of the addresses and endpoints for that peer is updated with the new latency information. The next time we request the “best address” for that remote peer, we can switch to sending packets on a different address, with the better latency."
        }
        p {
            "We check latency (by sending new "
            code { "Disco::Ping" }
            " messages) about once a minute."
        }
        p {
            "If no hole punching ever occurs, we continue to use the fallback of relaying the packets over the DERP servers."
        }
    }
}
