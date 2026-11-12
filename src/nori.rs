//! Unlisted product introduction. Keep this out of the public content catalog.
use crate::{Icon, contact::ContactButton};
use dioxus::prelude::*;

#[component]
pub fn Nori() -> Element {
    rsx! {
        document::Stylesheet { href: asset!("/assets/nori.css") }
        main { id: "content", class: "nori-page",
            section { class: "nori-hero wrap",
                div { class: "nori-hero-copy",
                    p { class: "nori-intro", span { class: "nori-wordmark", "nori" } span { class: "nori-status mono", "COMING SOON" } }
                    h1 { "Secrets, in" br {} em { "the right hands." } }
                    p { class: "nori-lede",
                        "Secrets and encryption management built for iroh networks. Control and manage endpoint auth without stress."
                    }
                    div { class: "nori-actions",
                        ContactButton { class: "button primary", source: "nori-hero",
                            "Get early access" Icon { name: "arrow" }
                        }
                        a { class: "text-link", href: "#how-nori-works", "Meet Nori" span { "↓" } }
                    }
                    p { class: "nori-footnote", "From the team behind iroh." }
                }
                DelegationIllustration {}
            }
            section { class: "nori-capabilities wrap", "aria-label": "What Nori does",
                for (number, title, description) in [
                    ("01", "Keep your secrets.", "Store API keys, passwords, and other sensitive values with version history. Secrets are encrypted before they reach storage."),
                    ("02", "Put your keys to work.", "Encrypt, decrypt, and sign data. Your encryption and signing keys stay inside the service."),
                    ("03", "Give just enough access.", "Grant specific operations on specific paths. Delegate narrower permissions to a job or device, with an expiry on every grant."),
                ] {
                    article {
                        span { class: "nori-number mono", "{number}" }
                        h2 { "{title}" }
                        p { "{description}" }
                    }
                }
            }
            section { class: "nori-detail wrap", id: "how-nori-works",
                div {
                    h2 { "Delegation at every step" br {} em { "Signed and encrypted." } }
                    p { class: "nori-detail-lede",
                        "Nori manages cryptographic material using a delegation chain: a signed list of grants that leads from a root key to the key of the client making the request."
                    }
                }
                ol { class: "nori-steps",
                    li {
                        span { class: "mono", "01" }
                        div { h3 { "Connect with an identity." } p { "Apps and devices connect over iroh using their own keys. Access is bound to that identity." } }
                    }
                    li {
                        span { class: "mono", "02" }
                        div { h3 { "Pass on a little less." } p { "Signed delegation chains say what each caller can do. Create a narrower grant offline if needed." } }
                    }
                    li {
                        span { class: "mono", "03" }
                        div { h3 { "Keep a handle on access." } p { "Nori checks permissions, expiry, and revocation on every request, and records requests and responses in its audit log." } }
                    }
                }
            }
            section { class: "nori-closing wrap",
                div {
                    p { class: "nori-label mono", "LET’S BUILD WITH NORI" }
                    h2 { "Your next secret" br {} "starts here." }
                    p { "Bring your use case. We’ll be in touch about early access." }
                }
                ContactButton { class: "button primary", source: "nori-footer",
                    "Get early access" Icon { name: "arrow" }
                }
            }
        }
    }
}

#[component]
fn DelegationIllustration() -> Element {
    rsx! {
        figure { class: "nori-illustration", "aria-labelledby": "nori-diagram-caption",
            div { class: "nori-diagram-heading mono", span { "A LITTLE LESS, AT EVERY STEP" } span { "↘" } }
            div { class: "nori-grant nori-grant-team",
                div { class: "nori-grant-title", span { "Your team" } span { class: "nori-key", "⌘" } }
                p { "Set the scope." }
                div { class: "nori-permissions mono", span { "read" } span { "write" } span { "list" } }
                code { "secret/app/" }
            }
            div { class: "nori-grant nori-grant-app",
                div { class: "nori-grant-title", span { "Your app" } span { class: "nori-key", "↳" } }
                p { "Pass on only what’s needed." }
                div { class: "nori-permissions mono", span { "read" } span { "list" } }
                code { "secret/app/" }
            }
            div { class: "nori-grant nori-grant-job",
                div { class: "nori-grant-title", span { "One job" } span { class: "nori-key", "↳" } }
                p { "One secret. One hour." }
                div { class: "nori-permissions mono", span { "read" } span { class: "nori-expiry", "expires in 1h" } }
                code { "secret/app/api-key" }
            }
            figcaption { id: "nori-diagram-caption", "An example delegation. Access only gets narrower." }
        }
    }
}
