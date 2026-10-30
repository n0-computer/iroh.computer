//! Content for `/services/observability`. Edit this Dioxus component directly.
use dioxus::prelude::*;
use crate::contact::ContactButton;

#[component]
pub(super) fn ServicesObservability() -> Element {
    rsx! {
        section { class: "observability-overview observability-section",
            div {
                p { class: "observability-kicker", "Yes, there are graphs" }
                h2 { id: "overview", "Your network, at a glance." }
                p { "See who’s online, how much traffic is moving, and how much goes direct. Find out what happens outside your Wi-Fi." }
                a { class: "text-link", href: "https://docs.iroh.computer/iroh-services/metrics/glossary", "Explore the metrics" span { "↗" } }
            }
            MetricsPicture {}
        }
        section { class: "observability-section observability-scale",
            div { class: "observability-section-heading",
                h2 { id: "scales-with-you", "Scales with you." }
                p { "Start free. Get nosy when you need to." }
            }
            div { class: "observability-plan-grid",
                article { class: "observability-plan",
                    div { class: "observability-plan-top",
                        span { class: "observability-plan-symbol", "aria-hidden": "true", "⁙" }
                        span { class: "observability-plan-label", "Project metrics · Free" }
                    }
                    h3 { id: "project-metrics", "The big picture." }
                    p { "Your whole network in one view: online endpoints, direct data rate, and traffic." }
                    a { class: "text-link", href: "https://services.iroh.computer?utm_source=website&utm_content=observability-project", "Start exploring" span { "↗" } }
                }
                article { class: "observability-plan observability-plan-detail",
                    div { class: "observability-plan-top",
                        span { class: "observability-plan-symbol", "aria-hidden": "true",
                            svg { view_box: "0 0 32 32", fill: "none", stroke: "currentColor", stroke_width: "1.5",
                                circle { cx: "13", cy: "13", r: "8" }
                                path { d: "m19 19 9 9M9 13h8M13 9v8" }
                            }
                        }
                        span { class: "observability-plan-label", "Endpoint metrics · Enterprise" }
                    }
                    h3 { id: "granular-metrics", "Find the weird bit." }
                    p { "Zoom into individual endpoints. Explore latency, errors, and throughput over time." }
                    ContactButton { class: "text-link", source: "observability-granular", "Talk to us" span { "↗" } }
                }
            }
        }
        section { class: "observability-section observability-setup",
            p { class: "observability-kicker", "How it works" }
            h2 { id: "how-it-works", "Hook it up. See what’s up." }
            ol { class: "observability-steps",
                li {
                    span { class: "observability-step-number", "1" }
                    h3 { "Grab a key." }
                    p { "Create an API key in your Iroh Services project." }
                }
                li {
                    span { class: "observability-step-number", "2" }
                    h3 { "Plug in the client." }
                    p { "Connect your endpoint with the Services client and opt in to metrics." }
                }
                li {
                    span { class: "observability-step-number", "3" }
                    h3 { "Get your graphs." }
                    p { "Open your dashboard to follow traffic and connection health." }
                }
            }
            a { class: "text-link", href: "https://docs.iroh.computer/iroh-services/quickstart", "Follow the quickstart" span { "↗" } }
        }
        section { class: "observability-section observability-privacy",
            h2 { id: "privacy", "Privacy" }
            div {
                p { "All metrics collected are anonymized and aggregated to ensure user privacy. No personally identifiable information (PII) is collected or stored. The focus is on overall network performance rather than individual user behavior." }
                p { "If you have concerns about data collection, please refer to the " a { href: "/legal", "privacy policy" } "." }
            }
        }
        section { class: "observability-closing",
            div {
                p { class: "observability-kicker", "Your network has stories" }
                h2 { id: "start-monitoring-your-network", "Go see what it’s up to." }
                a { class: "button primary", href: "https://services.iroh.computer?utm_source=website&utm_content=observability-cta", "Start 30 day trial" span { "↗" } }
            }
            span { class: "observability-closing-symbol", "aria-hidden": "true", "✳" }
        }
    }
}

#[component]
fn MetricsPicture() -> Element {
    rsx! {
        figure { class: "metrics-picture", "aria-label": "Metrics from your endpoints come together in your network dashboard",
            div { class: "metrics-picture-heading", span { "Little signals. A bigger picture." } small { "Illustration" } }
            div { class: "metrics-picture-scene",
                svg { class: "metrics-picture-lines", view_box: "0 0 560 280", fill: "none", "aria-hidden": "true",
                    path { d: "M100 55C230 55 155 140 295 140M100 140H295M100 225C230 225 155 140 295 140" }
                    circle { cx: "243", cy: "140", r: "18" }
                    path { class: "metrics-picture-spark", d: "M235 140h16m-8-8v16m-6-14 12 12m0-12-12 12" }
                }
                div { class: "metrics-picture-endpoints", "aria-hidden": "true",
                    span { "↗" small { "Your app" } }
                    span { "{{ }}" small { "A peer" } }
                    span { "✳" small { "Another peer" } }
                }
                div { class: "metrics-picture-dashboard",
                    div { class: "metrics-picture-dashboard-title", span { class: "status-dot" } "Your network" }
                    div { class: "metrics-picture-metric",
                        span { "Online endpoints" }
                        svg { view_box: "0 0 180 34", fill: "none", "aria-hidden": "true", path { d: "M2 28H30V20H65V24H98V12H133V5H178" } }
                    }
                    div { class: "metrics-picture-metric",
                        span { "Direct data rate" }
                        svg { view_box: "0 0 180 34", fill: "none", "aria-hidden": "true", path { d: "M2 27Q20 5 40 18T80 14T120 9T178 5" } }
                    }
                    div { class: "metrics-picture-metric",
                        span { "Traffic sent & received" }
                        svg { view_box: "0 0 180 34", fill: "none", "aria-hidden": "true", path { d: "M2 27L20 19 36 25 59 7 76 15 92 9 113 23 135 12 154 18 178 5" } }
                    }
                }
            }
            figcaption { "From individual endpoints to a shared view." }
        }
    }
}
