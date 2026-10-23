use dioxus::prelude::*;

#[component]
pub fn Hosting() -> Element {
    rsx! {
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
pub(crate) fn HostingOptions(#[props(default)] homepage: bool) -> Element {
    rsx! {
        section { class: "hosting-options", "aria-labelledby": "hosting-options-heading",
            if homepage {
                div { class: "home-hosting-intro",
                    div {
                        h2 { id: "hosting-options-heading", "Hosting, your way." }
                        p { "Start on the free network. When you need more, we’ll handle the relays so you can get on with your app." }
                        Link { class: "text-link", to: "/services/hosting", "Explore managed hosting" span { "↗" } }
                    }
                    crate::service_art::HostingArt {}
                }
            } else {
                div { class: "hosting-section-heading",
                    div {
                        h2 { id: "hosting-options-heading", "Who’s on relay duty?" }
                        p { "Use the public network, pay us to manage your relays, or run your own." }
                    }
                    a { class: "text-link", href: "https://docs.iroh.computer/concepts/relays", "How relays work ↗" }
                }
            }
            div { class: "hosting-option-grid",
                article { class: "hosting-option",
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
                if !homepage {
                    article { class: "hosting-option",
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
            if homepage {
                p { class: "home-hosting-self",
                    "Prefer to self-host? "
                    a { href: "https://docs.iroh.computer/iroh-services/relays/self-hosted", "The relay software is free ↗" }
                }
            }
        }
    }
}
