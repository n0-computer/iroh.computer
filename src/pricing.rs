use crate::contact::ContactButton;
use dioxus::prelude::*;

#[component]
pub fn Pricing() -> Element {
    rsx! {
        document::Stylesheet { href: asset!("/assets/pricing.css") }
        main { id: "content", class: "wrap pricing-page",
            header { class: "pricing-intro",
                div { class: "pricing-kicker", "Good connections. Sensible bills." }
                div { class: "pricing-intro-grid",
                    h1 { "Start for free." br {} span { "Scale on your terms." } }
                    div { class: "pricing-intro-note",
                        p { "From your first connection to your own infrastructure. Hosting, metrics, and support for whatever you’re building." }
                        a { href: "#estimate-your-monthly-cost", "Estimate your monthly cost" span { "↓" } }
                    }
                }
            }

            section { class: "pricing-plans", "aria-label": "Pricing plans",
                div { class: "pricing-section-rule", span { "Find your fit" } span { "USD · billed monthly" } }
                div { class: "pricing-plan-grid",
                    PlanCard {
                        symbol: "↗", name: "Community", tag: "For your first connection",
                        description: "For your first connection.",
                        price: "$0", period: "/ month", note: "Free to get started",
                        includes: "The essentials",
                        features: vec!["Public relays in US, EU, Singapore", "7 day metrics retention", "No auth, public only", "Rate-limited traffic", "No uptime guarantees"],
                        cta: "Get started", href: "https://services.iroh.computer?utm_source=website&utm_content=pricing-community",
                    }
                    PlanCard {
                        symbol: "✳", name: "Pro", tag: "A little room to grow", featured: true,
                        description: "For small projects becoming something bigger.",
                        price: "$19", period: "/ month", note: "Plus usage beyond included limits",
                        includes: "Room to grow",
                        features: vec!["10,000 concurrent connections", "30 day metrics retention", "Authenticated connections", "5 MB/s rate limit", "100 GB egress", "Support tickets"],
                        cta: "Start a free trial", href: "https://services.iroh.computer?utm_source=website&utm_content=pricing-pro",
                    }
                    PlanCard {
                        symbol: "{{ }}", name: "Dedicated", tag: "A place of your own",
                        description: "Your own relay. Your region. More control.",
                        price: "+$199", period: "/ month / region", note: "Add-on to Pro · $19/month base",
                        includes: "Everything in Pro, plus",
                        features: vec!["Custom regions for lowest latency", "60,000 concurrent connections", "Version locking", "No rate limits", "250 GB egress", "Custom DNS"],
                        cta: "Deploy a relay", href: "https://services.iroh.computer/?utm_source=website&utm_content=pricing-dedicated",
                    }
                }
                div { class: "pricing-enterprise", id: "enterprise",
                    div { class: "pricing-enterprise-heading",
                        span { class: "pricing-index", "Something a bit bigger?" }
                        h2 { "Enterprise" }
                        p { "A bigger network. A setup that fits." }
                    }
                    ul {
                        for feature in ["Volume discounts", "BYOC, on-prem & multi-cloud", "SLAs available", "Support engineer"] {
                            li { span { "aria-hidden": "true", "+" } "{feature}" }
                        }
                    }
                    ContactButton { class: "button", source: "pricing-enterprise", "Let’s talk" span { "↗" } }
                }
            }

            PlanComparison {}
            PricingCalculator {}

            section { class: "pricing-contact",
                div { span { class: "pricing-index", "Humans on the other end" } h2 { "Let’s figure it out together." } }
                div { p { "Need hosting, support, or development? Talk to the team building iroh." } ContactButton { class: "text-link", source: "pricing-footer", "Book a meeting" span { "↗" } } }
            }
        }
    }
}

#[component]
fn PlanCard(
    symbol: &'static str,
    name: &'static str,
    tag: &'static str,
    description: &'static str,
    price: &'static str,
    period: &'static str,
    note: &'static str,
    includes: &'static str,
    features: Vec<&'static str>,
    cta: &'static str,
    href: &'static str,
    #[props(default)] featured: bool,
) -> Element {
    rsx! {
        article { class: if featured { "pricing-plan pricing-plan-featured" } else { "pricing-plan" },
            div { class: "pricing-plan-meta", span { class: "pricing-plan-symbol", "aria-hidden": "true", "{symbol}" } span { "{tag}" } }
            h2 { "{name}" }
            p { class: "pricing-plan-description", "{description}" }
            div { class: "pricing-plan-amount", strong { "{price}" } span { "{period}" } }
            p { class: "pricing-plan-note", "{note}" }
            a { class: if featured { "button primary" } else { "button" }, href, "{cta}" span { "↗" } }
            div { class: "pricing-plan-features",
                p { "{includes}" }
                ul { for feature in features { li { span { "aria-hidden": "true", "+" } "{feature}" } } }
            }
        }
    }
}

#[component]
fn PlanComparison() -> Element {
    let groups = [
        (
            "Hosting",
            vec![
                (
                    "Concurrent connections",
                    [
                        "Rate limited",
                        "10,000|then $0.003/endpoint",
                        "60,000",
                        "Custom",
                    ],
                ),
                ("Relays", ["Public", "Shared", "Dedicated", "Custom"]),
                ("Rate limit", ["Variable", "5 MB/s", "Unlimited", "Custom"]),
                (
                    "Egress",
                    [
                        "Variable",
                        "100 GB|then $0.09/GB",
                        "250 GB|then $0.09/GB",
                        "Custom",
                    ],
                ),
                ("Authenticated", ["—", "Yes", "Yes", "Yes"]),
                ("Custom DNS", ["—", "—", "Yes", "Yes"]),
                ("Custom regions", ["—", "—", "Yes", "Yes"]),
                ("Version locking", ["—", "—", "Yes", "Yes"]),
                ("Multi-cloud", ["—", "—", "—", "Yes"]),
                ("Bring your own cloud", ["—", "—", "—", "Yes"]),
            ],
        ),
        (
            "Metrics",
            vec![
                ("Diagnostic reports", ["3", "10", "10", "Unlimited"]),
                (
                    "Data points / minute",
                    [
                        "1,000",
                        "10,000|then $1.49/1k DPM",
                        "10,000|then $1.49/1k DPM",
                        "Custom",
                    ],
                ),
                (
                    "Metrics retention",
                    ["7 days", "30 days", "30 days", "Custom"],
                ),
            ],
        ),
        (
            "Support",
            vec![
                ("Community support", ["Yes", "Yes", "Yes", "Yes"]),
                ("Support tickets", ["—", "Yes", "Yes", "Yes"]),
                ("SLAs", ["—", "—", "—", "Available"]),
                ("Support engineer", ["—", "—", "—", "Yes"]),
            ],
        ),
    ];
    rsx! {
        section { class: "pricing-comparison", id: "compare-plans", "aria-labelledby": "comparison-title",
            div { class: "pricing-section-rule", span { "The details, if you’re curious" } a { href: "#estimate-your-monthly-cost", "Try the estimator ↓" } }
            div { class: "pricing-section-heading",
                h2 { id: "comparison-title", "Every detail. In the open." }
                p { "Compare what’s included at every stage." }
            }
            p { class: "pricing-scroll-hint", "Scroll to compare all plans →" }
            div { class: "pricing-table-scroll", role: "region", "aria-label": "Plan comparison, scroll horizontally to see all plans", tabindex: "0",
                table { class: "pricing-table",
                    caption { class: "pricing-sr-only", "Hosting, metrics, and support included in each iroh plan" }
                    thead { tr {
                        th { scope: "col", "What’s included" }
                        for plan in ["Community", "Pro", "Dedicated", "Enterprise"] { th { scope: "col", "{plan}" } }
                    } }
                    for (group, rows) in groups {
                        tbody {
                            tr { class: "pricing-table-group", th { scope: "rowgroup", colspan: "5", "{group}" } }
                            for (label, values) in rows {
                                tr {
                                    th { scope: "row", "{label}" }
                                    for value in values {
                                        td {
                                            if value == "Yes" {
                                                span { class: "pricing-included", "aria-label": "Included", "✓" }
                                            } else if value == "—" {
                                                span { class: "pricing-unavailable", "aria-label": "Not included", "—" }
                                            } else {
                                                "{value.split('|').next().unwrap_or_default()}"
                                                if let Some(detail) = value.split('|').nth(1) { small { "{detail}" } }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

#[component]
fn PricingCalculator() -> Element {
    let mut relays = use_signal(|| 0u32);
    let mut endpoints = use_signal(|| 5000u32);
    let mut egress = use_signal(|| 100u32);
    let mut metrics = use_signal(|| 100u32);
    let mut frequency = use_signal(|| 1.0f64);
    let included = if relays() > 0 {
        relays() * 60000
    } else {
        10000
    };
    let connection_cost = endpoints().saturating_sub(included) as f64 * 0.003;
    let relay_cost = relays() as f64 * 199.0;
    let egress_cost = egress().saturating_sub(100) as f64 * 0.09;
    let metrics_cost = (metrics() as f64 * 87.0 * frequency() - 10000.0).max(0.0) / 1000.0 * 1.49;
    let total = 19.0 + connection_cost + relay_cost + egress_cost + metrics_cost;
    rsx! {
        section { class: "pricing-estimator", id: "estimate-your-monthly-cost", "aria-labelledby": "estimator-title",
            div { class: "pricing-section-rule", span { "Let’s work it out" } span { "A little what-if" } }
            div { class: "pricing-section-heading",
                h2 { id: "estimator-title", "What would your setup cost?" }
                p { "Slide things around, or type your numbers. We’ll do the math." }
            }
            div { class: "pricing-console",
                div { class: "pricing-console-bar", span { "Your setup" } span { "Pro + what you use" } }
                div { class: "pricing-console-body",
                    div { class: "pricing-config",
                        fieldset {
                            legend { "Hosting" }
                            div { class: "pricing-fields",
                                UsageControl {
                                    id: "estimate-relays", label: "Dedicated relays",
                                    hint: if relays() == 0 { "Using shared hosting".to_string() } else { "60,000 endpoints per relay".to_string() },
                                    value: relays(), max: 5, unit: "relays",
                                    onchange: move |value| relays.set(value),
                                }
                                UsageControl {
                                    id: "estimate-endpoints", label: "Concurrent endpoints",
                                    hint: format!("{} included", grouped_number(included)),
                                    value: endpoints(), max: 250000, unit: "endpoints",
                                    onchange: move |value| endpoints.set(value),
                                }
                                UsageControl {
                                    id: "estimate-egress", label: "Monthly egress",
                                    hint: "Traffic sent through relays".to_string(),
                                    value: egress(), max: 5000, unit: "GB",
                                    onchange: move |value| egress.set(value),
                                }
                            }
                        }
                        fieldset {
                            legend { "Metrics" }
                            div { class: "pricing-fields",
                                UsageControl {
                                    id: "estimate-metrics", label: "Metrics endpoints",
                                    hint: "87 metrics per endpoint".to_string(),
                                    value: metrics(), max: 5000, unit: "endpoints",
                                    onchange: move |value| metrics.set(value),
                                }
                            }
                            fieldset { class: "pricing-frequency",
                                legend { "How often should they report?" }
                                div { class: "pricing-frequency-options",
                                    for (label, interval) in [("Every minute", 1.0), ("Every 5 minutes", 0.2), ("Hourly", 1.0 / 60.0), ("Daily", 1.0 / 1440.0)] {
                                        label {
                                            input {
                                                r#type: "radio", name: "reporting-frequency", value: "{interval}",
                                                checked: frequency() == interval,
                                                onchange: move |_| frequency.set(interval),
                                            }
                                            span { "{label}" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    div { class: "pricing-receipt",
                        p { class: "pricing-index", "Your estimated monthly bill" }
                        div { class: "pricing-live-total", "aria-live": "polite", "aria-atomic": "true", strong { "${total:.2}" } span { "/ month" } }
                        dl {
                            for (label, cost) in [("Pro base",19.0),("Dedicated relays",relay_cost),("Endpoint overage",connection_cost),("Egress overage",egress_cost),("Metrics overage",metrics_cost)] {
                                div { dt { "{label}" } dd { "${cost:.2}" } }
                            }
                        }
                        p { class: "pricing-estimate-note", "Estimate only. Actual costs depend on usage." }
                        a { class: "button primary", href: "https://services.iroh.computer", "Build with iroh" span { "↗" } }
                    }
                }
            }
        }
    }
}


// Keep numbers readable in slider labels while the editable field stays numeric.
fn grouped_number(value: u32) -> String {
    let digits = value.to_string();
    let mut result = String::new();
    for (index, digit) in digits.chars().enumerate() {
        if index > 0 && (digits.len() - index) % 3 == 0 {
            result.push(',');
        }
        result.push(digit);
    }
    result
}

#[component]
fn UsageControl(
    id: &'static str,
    label: &'static str,
    hint: String,
    value: u32,
    max: u32,
    unit: &'static str,
    onchange: EventHandler<u32>,
) -> Element {
    let mut draft = use_signal(|| value.to_string());
    rsx! {
        div { class: "pricing-usage-control",
            label { r#for: id, "{label}" }
            p { id: "{id}-hint", "{hint}" }
            div { class: "pricing-value-field",
                input {
                    id, r#type: "number", min: "0", max: "{max}", step: "1",
                    value: "{draft}", inputmode: "numeric", "aria-describedby": "{id}-hint",
                    oninput: move |event| {
                        draft.set(event.value());
                        if let Ok(next) = event.value().parse::<u32>() {
                            if next > max { draft.set(max.to_string()); }
                            onchange.call(next.min(max));
                        }
                    },
                    onblur: move |_| draft.set(value.to_string()),
                }
                span { "{unit}" }
            }
            input {
                class: "pricing-usage-slider", r#type: "range", min: "0", max: "{max}", step: "1", value: "{value}",
                "aria-label": "{label} slider", "aria-describedby": "{id}-hint",
                "aria-valuetext": format!("{} {}", grouped_number(value), unit),
                oninput: move |event| {
                    if let Ok(next) = event.value().parse::<u32>() {
                        draft.set(next.min(max).to_string());
                        onchange.call(next.min(max));
                    }
                },
            }
            div { class: "pricing-slider-limits", "aria-hidden": "true", span { "0" } span { "{grouped_number(max)}" } }
        }
    }
}
