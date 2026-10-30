//! Content for `/docs/concepts/tickets`. Edit this Dioxus component directly.
use dioxus::prelude::*;
#[component]
pub(super) fn DocsConceptsTickets() -> Element {
    rsx! {
        h1 { id: "tickets", "Tickets" }
        p {
            "Tickets are a way to share dialing information between iroh endpoints. They're a single token that contains everything needed to connect to another endpoint, or to fetch a blob or document."
        }
        p {
            "You can use the default iroh endpoint tickets or build your own tickets using the "
            code { "iroh-tickets" }
            " crate."
        }
        aside { class: "note",
            p {
                "Have a ticket? Try pasting it into the "
                a { href: "https://ticket.iroh.computer", "iroh ticket explorer" }
                " to break it down! Here's an "
                a { href: "https://ticket.iroh.computer?ticket=docaaacarwhmusoqf362j3jpzrehzkw3bqamcp2mmbhn3fmag3mzzfjp4beahj2v7aezhojvfqi5wltr4vxymgzqnctryyup327ct7iy4s5noxy6aaa",
                    "example"
                }
            }
        }
        p {
            "Tickets are a single serialized token containing everything needed to kick off an interaction with another endpoint running iroh. Here's an example of one:"
        }
        pre {
            code { {EXAMPLE_1} }
        }
        p { "Yes, they're long." }
        p {
            "They're also very powerful. Tickets combine a piece of info with "
            em { "dialing information for the endpoint to fetch from" }
            ". We've seen numerous content-addressed systems force users to copy and paste long hashes around, and we figure if you're going to have to copy and paste something, it might as well contain both the hash and a hint about where to find the data. Tickets also work very well in QR codes!"
        }
        p {
            "In practice this is a "
            em { "massive" }
            " speed pickup for iroh. When you're given a ticket, you have everything you need to construct a request"
        }
        h2 { id: "kinds-of-tickets", "Kinds of Tickets" }
        p { "Currently, there are three kinds of tickets:" }
        table {
            thead {
                tr {
                    th { "Type" }
                    th { "Description" }
                    th { "Contents" }
                }
            }
            tbody {
                tr {
                    td {
                        code { "endpoint" }
                    }
                    td { "A token for connecting to an iroh endpoint" }
                    td {
                        code { "Endpoint Address" }
                    }
                }
                tr {
                    td {
                        code { "blob" }
                    }
                    td {
                        "A token for fetching a "
                        a { href: "/docs/layers/blobs", "blob" }
                        " or "
                        a { href: "/docs/layers/blobs#collections", "collection" }
                    }
                    td {
                        code { "Hash" }
                        ", "
                        code { "HashOrCollection" }
                        ", "
                        code { "Endpoint Address" }
                    }
                }
                tr {
                    td {
                        code { "document" }
                    }
                    td {
                        "A read/write access token to a "
                        a { href: "/proto/iroh-docs", "document" }
                        ", plus an endpoint address"
                    }
                    td {
                        code { "DocID" }
                        ", "
                        code { "Read/Write Capability" }
                        ", "
                        code { "[Endpoint Address]" }
                    }
                }
            }
        }
        p {
            "Tickets always start with an ascii string that describes the type of ticket (eg: "
            code { "blob" }
            "), followed by a base32-lowercase-encoded payload. The payload is "
            a { href: "https://postcard.jamesmunns.com/wire-format.html", "postcard-encoded data" }
            " that contains the information needed to use the ticket. We chose postcard because it's extremely succinct."
        }
        h2 { id: "tickets-are-sensitive", "Tickets are sensitive" }
        p {
            "When you create a ticket, it embeds the IP addresses of the machines you're using to create the ticket. This means that if you share a ticket with someone, they can use it to connect to your machine. This is a feature, not a bug. It's a way to bootstrap connections between peers without needing a central server. It also means you should be careful about sharing tickets with people you don't want to have your IP address."
        }
        p {
            "It's worth pointing out this setup is considerably better than full peer-2-peer systems, which "
            em { "broadcast" }
            " your IP to peers. Instead in iroh, we use tickets to form a \"cozy network\" between peers you explicitly want to connect with. It's possible to go \"full p2p\" & configure your app to broadcast dialing details, but we think tickets represent a better middle-ground default."
        }
        h2 { id: "document-tickets-are-secrets",
            "Document Tickets are "
            em { "secrets" }
        }
        p {
            "When you create a document ticket, you're creating a secret that allows someone to read or write to a document. This means that you should be careful about sharing document tickets with people you don't trust. What's more, someone who has a document ticket can use it to create new tickets for the same document. This means that if you share a document ticket with someone, they can use it to create new tickets for the same document, and share those tickets with others."
        }
        h2 { id: "tickets-in-apps", "Tickets in Apps" }
        p {
            "Using tickets in your app comes down to what you're trying to accomplish. For short-lived sessions where both devices are online at the same time, tickets are an incredibly powerful way to bootstrap connections, and require no additional servers for coordination."
        }
        p {
            "If you have any means of automating (like, a central database or server to bootstrap from) we recommend you "
            em { "do not" }
            " use tickets in your app, and instead program around the idea that you can "
            em { "dial by EndpointID" }
            ". Tickets can contain information that can go stale quickly. instead focus on caching "
            code { "endpointIDs" }
            ", and letting iroh transparently resolve dialing details at runtime."
        }
    }
}
const EXAMPLE_1: &str = r###"docaaacarwhmusoqf362j3jpzrehzkw3bqamcp2mmbhn3fmag3mzzfjp4beahj2v7aezhojvfqi5wltr4vxymgzqnctryyup327ct7iy4s5noxy6aaa
"###;
