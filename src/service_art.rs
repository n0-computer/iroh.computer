//! Small, editable Dioxus illustrations for the service pages.
use dioxus::prelude::*;

#[component]
pub fn HostingArt() -> Element {
    rsx! {
        document::Stylesheet { href: asset!("/assets/service-art.css") }
        figure { class: "service-art hosting-art",
            "aria-label": "Two peers connect directly, with a managed relay available as a fallback",
            svg { class: "service-art-routes", view_box: "0 0 520 440", fill: "none", "aria-hidden": "true",
                path { class: "service-art-direct", d: "M110 145 C130 15 385 15 415 170" }
                path { class: "service-art-orbit", d: "M110 145 C15 290 125 380 265 330 C415 410 515 290 415 170" }
                circle { cx: "258", cy: "58", r: "6", class: "service-art-dot" }
            }
            span { class: "service-art-route-label", "Direct first" }
            div { class: "service-art-card hosting-art-app",
                span { class: "service-art-symbol", "aria-hidden": "true", "↗" }
                strong { "Your app" }
                small { "Going places" }
            }
            div { class: "service-art-card hosting-art-peer",
                span { class: "service-art-symbol", "aria-hidden": "true", "{{ }}" }
                strong { "Your peer" }
                small { "Hello from here" }
            }
            div { class: "service-art-card service-art-purple hosting-art-relay",
                span { class: "service-art-symbol", "aria-hidden": "true", "✳" }
                strong { "Managed relay" }
                small { "We’ve got this bit" }
            }
            figcaption { "Your devices go direct when they can. Relays forward encrypted traffic when they can't. Only your endpoints can read it." }
        }
    }
}

#[component]
pub fn ObservabilityArt() -> Element {
    rsx! {
        document::Stylesheet { href: asset!("/assets/service-art.css") }
        figure { class: "service-art observability-art",
            "aria-label": "Connection and latency signals come together in a view of your network",
            svg { class: "service-art-routes", view_box: "0 0 520 440", fill: "none", "aria-hidden": "true",
                path { class: "service-art-orbit", d: "M130 105 C165 0 490 65 435 225 C400 330 150 210 140 350 C130 430 390 465 400 350" }
                path { class: "service-art-orbit service-art-orbit-secondary", d: "M130 105 C10 210 50 390 245 370 C430 360 485 270 360 205" }
                circle { cx: "71", cy: "247", r: "6", class: "service-art-dot" }
            }
            div { class: "service-art-card observability-art-connections",
                svg { class: "service-art-mini", view_box: "0 0 150 48", fill: "none", "aria-hidden": "true",
                    path { d: "M20 25Q70-12 128 25M20 25Q70 62 128 25M20 25h108" }
                    circle { cx: "20", cy: "25", r: "7" }
                    circle { cx: "128", cy: "25", r: "7" }
                }
                strong { "Connections" }
                small { "See who’s connected" }
            }
            div { class: "service-art-card service-art-purple observability-art-dashboard",
                span { class: "service-art-symbol", "aria-hidden": "true", "✳" }
                strong { "Your network" }
                small { "A clearer picture" }
                div { class: "service-art-bars", "aria-hidden": "true",
                    span {} span {} span {} span {} span {} span {} span {}
                }
            }
            div { class: "service-art-card observability-art-latency",
                svg { class: "service-art-mini", view_box: "0 0 150 48", fill: "none", "aria-hidden": "true",
                    path { d: "M3 30h22l12-14 16 23 18-31 17 22 14-9 15 9h30" }
                }
                strong { "Latency" }
                small { "Follow the little details" }
            }
            figcaption { "Less guesswork. More of the whole picture." }
        }
    }
}
