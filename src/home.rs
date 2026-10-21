use dioxus::prelude::*;
use crate::{content, Icon, Route};
use crate::network::{AdaptivePaths, Network};
mod sections;
use sections::*;
#[component]
pub fn Home() -> Element {
    let latest = content::posts()[0];
    rsx! {
        document::Title { "iroh — Less net work for networks" }
        document::Stylesheet { href: asset!("/assets/home.css") }
        main { id: "content", class: "home-page",
            section { class: "hero wrap",
                div { class: "hero-copy",
                    Link { class: "release-note", to: latest.path.clone(),
                        span { class: "release-tag", "New" }
                        "iroh 1.3 is here"
                        span { "↗" }
                    }
                    p { class: "eyebrow hero-eyebrow",
                        span { class: "tiny-cross", "+" }
                        "Less net work for networks"
                    }
                    h1 {
                        "IP addresses"
                        br {}
                        span { class: "break-word", "break," }
                        br {}
                        " dial keys "
                        span { class: "instead",
                            "instead"
                            span { class: "heading-dot", "." }
                        }
                    }
                    p { class: "hero-description",
                        "Add encrypted peer-to-peer connectivity to your app, agent, or workflow."
                    }
                    div { class: "hero-actions",
                        a {
                            class: "button primary",
                            href: "https://services.iroh.computer?utm_source=website&utm_content=hero-signup",
                            "Sign up"
                            Icon { name: "arrow" }
                        }
                        a {
                            class: "text-link",
                            href: "https://docs.iroh.computer/quickstart",
                            "Read the docs"
                            span { "↗" }
                        }
                    }
                    p { class: "hero-footnote",
                        span { class: "status-dot" }
                        "Open source. Encrypted. Forever."
                    }
                }
                Network {}
            }
            section {
                class: "customers wrap",
                "aria-label": "Teams building with iroh",
                div { class: "logo-track", CustomerLogos {} }
            }
            section { class: "intro-section wrap section-space", id: "how-it-works",
                div { class: "section-heading",
                    h2 {
                        "Connectivity without"
                        br {}
                        em { "the complications." }
                    }
                }
                div { class: "resilience-grid",
                    AdaptivePaths {}
                    ul { class: "feature-list", ConnectionFeatures {} }
                }
            }
            section { class: "quotes-section",
                div { class: "wrap quotes-grid", Testimonials {} }
            }
            section { class: "platform-section",
                div { class: "wrap",
                    div { class: "platform-heading",
                        div {
                            p { class: "eyebrow", "Same API everywhere, one codebase, peer-to-peer." }
                            h2 { "Runs everywhere QUIC" }
                        }
                        span { class: "platform-spark", "aria-hidden": "true", "✳" }
                    }
                    div { class: "platform-grid",
                        for (label, file) in [
                            ("Raspberry Pi", "RaspberryPi"),
                            ("Espressif", "Espressif"),
                            ("Linux", "Linux"),
                            ("Windows", "Windows"),
                            ("Apple", "Apple"),
                            ("Android", "Android"),
                            ("Browser", "Browser"),
                            ("Serverless", "Serverless"),
                        ]
                        {
                            div {
                                span {
                                    class: "platform-icon",
                                    "aria-hidden": "true",
                                    style: "mask-image: url('/img/platform-logos/{file}.svg')",
                                }
                                span { "{label}" }
                            }
                        }
                    }
                }
            }
            section { class: "savings-section section-space",
                div { class: "savings-content wrap", SavingsContent {} }
            }
            section { class: "open-section",
                div { class: "open-content wrap",
                    div {
                        p { class: "eyebrow", "Made to be shared" }
                        h2 {
                            "Open source."
                            br {}
                            em { "Forever." }
                        }
                    }
                    p { OpenSourceCopy {} }
                }
            }
            section {
                class: "solutions-section wrap section-space",
                id: "solutions",
                div { class: "section-label", "What will you build?" }
                div { class: "section-heading",
                    h2 {
                        "How are people"
                        br {}
                        em { "using iroh?" }
                    }
                    Link { class: "text-link", to: "/solutions",
                        "Explore use cases"
                        span { "↗" }
                    }
                }
                div { class: "solutions-grid", UseCaseCards {} }
            }
            section { class: "production-section",
                div { class: "wrap",
                    div { class: "section-label", "Ready when you are" }
                    div { class: "section-heading",
                        h2 {
                            "Ready for"
                            br {}
                            em { "production." }
                        }
                        Link { class: "button primary", to: "/services/enterprise",
                            "Get help from the pros"
                            Icon { name: "arrow" }
                        }
                    }
                    ul { class: "production-grid feature-list", ProductionFeatures {} }
                }
            }
            CodeExamples {}
            section { class: "protocol-section wrap section-space",
                div { class: "section-label", "Better together" }
                div { class: "section-heading",
                    div {
                        h2 { "Modular toolkit." }
                        p {
                            "Dozens of open-source, composable protocols built on top of iroh. Mix & match to get the feature set you need."
                        }
                    }
                    Link { to: Route::Protocols {}, class: "text-link",
                        "All protocols"
                        span { "↗" }
                    }
                }
                div { class: "protocol-grid",
                    for (i, p) in content::protocols().iter().take(3).enumerate() {
                        a { href: p.href.clone(),
                            span { class: "protocol-symbol",
                                if i == 0 {
                                    "▧"
                                } else if i == 1 {
                                    "⁙"
                                } else {
                                    "▤"
                                }
                            }
                            span { class: "card-arrow", "↗" }
                            h3 { "{p.title}" }
                            p { "{p.tagline}" }
                        }
                    }
                }
            }
            section { class: "blog-section wrap section-space",
                div { class: "section-label", "Notes from the team" }
                div { class: "section-heading",
                    h2 { "From the blog." }
                    Link { to: Route::Blog {}, class: "text-link",
                        "All articles"
                        span { "↗" }
                    }
                }
                div { class: "blog-grid",
                    for post in content::posts().iter().take(3) {
                        Link { class: "blog-card", to: post.path
                                    .clone(),
                            if !post.social_image.is_empty() {
                                img {
                                    class: "blog-social-image",
                                    src: post.social_image.clone(),
                                    alt: "",
                                    loading: "lazy",
                                    width: 1200,
                                    height: 630,
                                }
                            }
                            div { class: "blog-card-meta",
                                "{post.date}"
                                span { "↗" }
                            }
                            h3 { "{post.title}" }
                            p { "{post.description}" }
                        }
                    }
                }
            }
            section { class: "closing wrap",
                p { class: "eyebrow", "Less net work. More possibilities." }
                h2 {
                    "Go make"
                    br {}
                    em { "a connection." }
                }
                a {
                    class: "button primary",
                    href: "https://docs.iroh.computer/quickstart",
                    "Start building"
                    Icon { name: "arrow" }
                }
                span { class: "closing-star", "✳" }
            }
        }
    }
}
#[component]
fn CodeExamples() -> Element {
    let mut active = use_signal(|| 1usize);
    let mut copied = use_signal(|| String::from("Copy"));
    let snippet = &content::snippets()[active()];
    let highlighted = crate::highlight::highlight(&snippet.code, &snippet.language);
    rsx! {
        section { class: "code-section wrap section-space", id: "start-building",
            div { class: "code-layout",
                div { class: "code-copy",
                    p { class: "eyebrow", "Pick your language. Say hello." }
                    h2 {
                        "Start"
                        br {}
                        em { "building." }
                    }
                    p {
                        "From a public key to a direct connection. Pick your language and make it happen."
                    }
                    a {
                        class: "text-link",
                        href: "https://docs.iroh.computer/what-is-iroh",
                        "Read the docs"
                        span { "↗" }
                    }
                    div { class: "language-logos",
                        for (name, file) in [
                            ("Swift", "swift"),
                            ("Rust", "rust"),
                            ("JavaScript", "node"),
                            ("Kotlin", "kotlin"),
                            ("Python", "python"),
                            ("Go", "go"),
                            ("C", "c"),
                        ]
                        {
                            a {
                                href: format!("https://docs.iroh.computer/languages/{}", name.to_lowercase()),
                                title: name,
                                img {
                                    src: "/language-logos/{file}.svg",
                                    alt: name,
                                    width: 28,
                                    height: 28,
                                }
                            }
                        }
                    }
                }
                div { class: "code-window",
                    div {
                        class: "code-tabs",
                        role: "tablist",
                        "aria-label": "Example language",
                        for (i, s) in content::snippets().iter().enumerate() {
                            button {
                                role: "tab",
                                id: "code-tab-{i}",
                                "aria-controls": "code-panel",
                                "aria-selected": active() == i,
                                class: if active() == i { "active" } else { "" },
                                onclick: move |_| {
                                    active.set(i);
                                    copied.set("Copy".into());
                                },
                                "{s.title}"
                            }
                        }
                    }
                    div { class: "code-title mono",
                        span { "{snippet.label}" }
                        button {
                            onclick: move |_| async move {
                                let json = serde_json::to_string(&content::snippets()[active()].code).unwrap();
                                let mut eval = document::eval(
                                    &format!("dioxus.send(await window.iroh.copy({json}))"),
                                );
                                let ok = eval.recv::<bool>().await.unwrap_or(false);
                                copied.set(if ok { "Copied ✓" } else { "Select code to copy" }.into());
                            },
                            "{copied}"
                        }
                    }
                    pre {
                        id: "code-panel",
                        role: "tabpanel",
                        "aria-labelledby": "code-tab-{active}",
                        tabindex: "0",
                        code {
                            for (n, tokens) in highlighted.iter().enumerate() {
                                span { class: "code-line",
                                    span {
                                        class: "line-number",
                                        "aria-hidden": "true",
                                        "{n+1:02}"
                                    }
                                    span {
                                        for token in tokens {
                                            span { class: token.class, "{token.text}" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    div { class: "code-status",
                        span {
                            i { class: "status-dot" }
                            "Peer to peer. Just between you."
                        }
                        span { "UTF-8" }
                    }
                }
            }
        }
    }
}
