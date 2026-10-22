use dioxus::prelude::*;

#[component]
pub fn Hosting() -> Element {
    rsx! {
        document::Title { "Hosting — iroh" }
        document::Stylesheet { href: asset!("/assets/hosting.css") }
        main { id: "content", class: "hosting-page wrap",
            header { class: "hosting-hero",
                div {
                    p { class: "hosting-kicker", "Managed relay hosting" }
                    h1 { "Your relays." br {} span { "Our problem." } }
                    p { class: "hosting-lede", "Running relay infrastructure is a pain. Deployments, updates, keeping it online. Pay us to deal with that. Go build your app." }
                    div { class: "hosting-actions",
                        a { class: "button primary", href: "https://services.iroh.computer?utm_source=website&utm_content=hosting-hero", "Start free trial" span { "↗" } }
                        a { class: "text-link", href: "/pricing", "Compare plans" span { "→" } }
                    }
                }
                crate::service_art::HostingArt {}
            }

            HostingOptions {}

            section { class: "hosting-included", "aria-labelledby": "hosting-included-heading",
                h2 { id: "hosting-included-heading", "Off your to-do list." }
                div { class: "hosting-feature-grid",
                    article { span { class: "hosting-kicker", "Access" } h3 { "Your endpoints." } p { "Use authenticated connections to control access to your managed relays." } }
                    article { span { class: "hosting-kicker", "Visibility" } h3 { "Know what’s happening." } p { "See connection health and usage with hosted metrics." } a { href: "/services/observability", "Explore observability →" } }
                    article { span { class: "hosting-kicker", "Deployment" } h3 { "Choose your regions." } p { "Dedicated relays add custom regions and version locking." } a { href: "/services/enterprise", "Discuss your deployment →" } }
                }
            }
        }
    }
}

#[component]
pub(crate) fn HostingOptions(#[props(default)] playful: bool) -> Element {
    rsx! {
        section { class: "hosting-options", "aria-labelledby": "hosting-options-heading",
            div { class: "hosting-section-heading",
                div {
                    h2 { id: "hosting-options-heading", if playful { "Make yourself at home." } else { "Who’s on relay duty?" } }
                    p { "Use the public network, pay us to manage your relays, or run your own." }
                }
                a { class: "text-link", href: "https://docs.iroh.computer/concepts/relays", "How relays work ↗" }
            }
            div { class: "hosting-option-grid",
                article { class: "hosting-option",
                    if playful { HostingDoodle { kind: "public" } }
                    p { class: "hosting-kicker", "For getting started" }
                    h3 { "Public relays" }
                    p { class: "hosting-option-owner", "We run them. Everyone shares them." }
                    div { class: "hosting-option-price",
                        strong { "Free" }
                        small { "No hosting bill." }
                    }
                    ul {
                        li { "Public access, with rate limits" }
                        li { "No uptime guarantee" }
                    }
                    a { class: "text-link", href: "https://docs.iroh.computer/quickstart", "Use the free network" span { "↗" } }
                }
                article { class: "hosting-option hosting-managed",
                    if playful { HostingDoodle { kind: "managed" } }
                    p { class: "hosting-kicker", "For getting on with your app" }
                    h3 { "Managed relays" }
                    p { class: "hosting-option-owner", "We handle deployment and upkeep." }
                    div { class: "hosting-option-price",
                        strong { "$19" span { "/month" } }
                        small { "Plus usage beyond included limits." }
                    }
                    ul {
                        li { "Authenticated shared relays & support" }
                        li { "Dedicated relays available as an add-on" }
                    }
                    a { class: "text-link", href: "/pricing", "See managed plans" span { "→" } }
                }
                article { class: "hosting-option",
                    if playful { HostingDoodle { kind: "self" } }
                    p { class: "hosting-kicker", "For doing it your way" }
                    h3 { "Self-hosted relays" }
                    p { class: "hosting-option-owner", "You deploy them. You keep them running." }
                    div { class: "hosting-option-price",
                        strong { "Your server bill" }
                        small { "The relay software is free." }
                    }
                    ul {
                        li { "Your servers, regions, and configuration" }
                        li { "You handle updates and monitoring" }
                    }
                    a { class: "text-link", href: "https://docs.iroh.computer/iroh-services/relays/self-hosted", "Set up your own relay" span { "↗" } }
                }
            }
        }
    }
}

#[component]
fn HostingDoodle(kind: &'static str) -> Element {
    rsx! {
        svg { class: "hosting-doodle", view_box: "0 0 80 72", fill: "none", stroke: "currentColor", stroke_width: "2.5", stroke_linecap: "round", stroke_linejoin: "round", "aria-hidden": "true",
            if kind == "public" {
                path { d: "M40 23C18 1 11 27 27 33C3 38 19 58 32 47C31 72 56 65 51 48C72 60 80 35 57 33C75 16 51 5 46 24" }
                circle { cx: "40", cy: "36", r: "10" }
                path { d: "M36 37Q40 43 45 36" }
            } else if kind == "managed" {
                path { d: "M20 51C3 49 7 29 21 30C16 9 46 5 51 25C68 17 80 41 64 50C54 56 31 53 20 51Z" }
                path { d: "M31 34L31 36M47 34L47 36M34 43Q40 49 46 42M18 62L23 60M59 63L64 61" }
            } else {
                path { d: "M13 34L39 12L67 33M21 29L19 60L59 61L60 28M33 60L34 43L46 43L47 61M50 19L51 10L60 11L60 27" }
                circle { cx: "39", cy: "31", r: "4" }
                path { d: "M8 48L4 50M69 44L75 46M67 9L70 5" }
            }
        }
    }
}
