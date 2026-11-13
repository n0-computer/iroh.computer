//! Unlisted product introduction. Keep this out of the public content catalog.
use crate::{Icon, contact::ContactButton};
use dioxus::prelude::*;

#[component]
pub fn IrohAuth() -> Element {
    rsx! {
        document::Stylesheet { href: asset!("/assets/auth.css") }
        main { id: "content", class: "iroh-auth-page",
            section { class: "iroh-auth-hero wrap",
                div { class: "iroh-auth-hero-copy",
                    p { class: "iroh-auth-intro", span { class: "iroh-auth-wordmark", "iroh auth" } span { class: "iroh-auth-status mono", "COMING SOON" } }
                    h1 { "Secrets, in" br {} em { "the right hands." } }
                    p { class: "iroh-auth-lede",
                        "Secrets and encryption management built for iroh networks. Control and manage endpoint auth without stress."
                    }
                    div { class: "iroh-auth-actions",
                        ContactButton { class: "button primary", source: "iroh-auth-hero",
                            "Get early access" Icon { name: "arrow" }
                        }
                        a { class: "text-link", href: "#how-iroh-auth-works", "Meet iroh auth" span { "↓" } }
                    }
                    p { class: "iroh-auth-footnote", "From the team behind iroh." }
                }
                DelegationIllustration {}
            }
            section { class: "iroh-auth-capabilities wrap", "aria-label": "What iroh auth does",
                for (number, title, description) in [
                    ("01", "Keep your secrets.", "Store API keys, passwords, and other sensitive values with version history. Secrets are encrypted before they reach storage."),
                    ("02", "Put your keys to work.", "Encrypt, decrypt, and sign data. Your encryption and signing keys stay inside the service."),
                    ("03", "Give just enough access.", "Grant specific operations on specific paths. Delegate narrower permissions to a job or device, with an expiry on every grant."),
                ] {
                    article {
                        span { class: "iroh-auth-number mono", "{number}" }
                        h2 { "{title}" }
                        p { "{description}" }
                    }
                }
            }
            section { class: "iroh-auth-detail wrap", id: "how-iroh-auth-works",
                div {
                    h2 { "Delegation at every step" br {} em { "Signed and encrypted." } }
                    p { class: "iroh-auth-detail-lede",
                        "iroh auth manages cryptographic material using a delegation chain: a signed list of grants that leads from a root key to the key of the client making the request."
                    }
                }
                ol { class: "iroh-auth-steps",
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
                        div { h3 { "Keep a handle on access." } p { "iroh auth checks permissions, expiry, and revocation on every request, and records requests and responses in its audit log." } }
                    }
                }
            }
            section { class: "iroh-auth-closing wrap",
                div {
                    p { class: "iroh-auth-label mono", "LET’S BUILD WITH IROH AUTH" }
                    h2 { "Your next secret" br {} "starts here." }
                    p { "Bring your use case. We’ll be in touch about early access." }
                }
                ContactButton { class: "button primary", source: "iroh-auth-footer",
                    "Get early access" Icon { name: "arrow" }
                }
            }
        }
    }
}

#[component]
fn DelegationIllustration() -> Element {
    rsx! {
        figure { class: "iroh-auth-illustration", "aria-labelledby": "iroh-auth-diagram-caption",
            div { class: "iroh-auth-diagram-heading mono", span { "A LITTLE LESS, AT EVERY STEP" } span { "↘" } }
            div { class: "iroh-auth-grant iroh-auth-grant-team",
                div { class: "iroh-auth-grant-title", span { "Your team" } span { class: "iroh-auth-key", "⌘" } }
                p { "Set the scope." }
                div { class: "iroh-auth-permissions mono", span { "read" } span { "write" } span { "list" } }
                code { "secret/app/" }
            }
            div { class: "iroh-auth-grant iroh-auth-grant-app",
                div { class: "iroh-auth-grant-title", span { "Your app" } span { class: "iroh-auth-key", "↳" } }
                p { "Pass on only what’s needed." }
                div { class: "iroh-auth-permissions mono", span { "read" } span { "list" } }
                code { "secret/app/" }
            }
            div { class: "iroh-auth-grant iroh-auth-grant-job",
                div { class: "iroh-auth-grant-title", span { "One job" } span { class: "iroh-auth-key", "↳" } }
                p { "One secret. One hour." }
                div { class: "iroh-auth-permissions mono", span { "read" } span { class: "iroh-auth-expiry", "expires in 1h" } }
                code { "secret/app/api-key" }
            }
            figcaption { id: "iroh-auth-diagram-caption", "An example delegation. Access only gets narrower." }
        }
    }
}
