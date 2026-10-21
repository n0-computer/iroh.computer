use dioxus::prelude::*;

#[component]
pub fn Observability(body: Element) -> Element {
    rsx! {
        document::Title { "Observability — iroh" }
        document::Stylesheet { href: asset!("/assets/observability.css") }
        main { id: "content", class: "observability-page wrap",
            header { class: "observability-hero",
                div {
                    p { class: "observability-kicker", "Network observability" }
                    h1 { id: "observability", "Is it the network?" br {} em { "Let’s find out." } }
                    p { class: "observability-lede", "Something’s slow. Could be the network, a relay, or one grumpy endpoint. Get the metrics to stop guessing." }
                    div { class: "observability-actions",
                        a { class: "button primary", href: "https://services.iroh.computer?utm_source=website&utm_content=observability-hero", "Start 30 day trial" span { "↗" } }
                        a { class: "text-link", href: "https://docs.iroh.computer/iroh-services/metrics", "Read the docs" span { "↗" } }
                    }
                }
                crate::service_art::ObservabilityArt {}
            }
            div { class: "observability-content", {body} }
        }
    }
}
