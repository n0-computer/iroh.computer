pub(crate) mod content;
use dioxus::prelude::*;
use crate::{content as site_content, Route};
#[component]
pub fn Blog() -> Element {
    let mut query = use_signal(String::new);
    let needle = query().to_lowercase();
    let posts: Vec<_> = site_content::posts()
        .into_iter()
        .filter(|p| {
            p.title.to_lowercase().contains(&needle)
                || p.description.to_lowercase().contains(&needle)
        })
        .collect();
    rsx! {
        main { id: "content", class: "wrap listing-page blog-listing",
            p { class: "eyebrow", "THE IROH JOURNAL / FIELD NOTES" }
            div { class: "listing-header",
                div {
                    h1 {
                        "All things iroh"
                        br {}
                        em { "& development." }
                    }
                    p { "Articles related to iroh use & development." }
                }
                label { class: "search-field",
                    span { class: "mono", "SEARCH THE JOURNAL" }
                    input {
                        r#type: "search",
                        placeholder: "QUIC, releases, experiments…",
                        value: query,
                        oninput: move | e
                                | query.set(e.value()),
                    }
                }
            }
            div { class: "listing-count mono",
                "{posts.len()} ARTICLES"
                span { "RESEARCH, RELEASES & THINGS WE'RE BUILDING" }
            }
            if posts.is_empty() {
                p { class: "empty-state", "No articles match that search. Try another term." }
            }
            div { class: "article-list",
                for p in posts {
                    Link { to: p.path.clone(), class: "article-row",
                        if !p.social_image.is_empty() {
                            img {
                                class: "blog-social-image",
                                src: p.social_image.clone(),
                                alt: "",
                                loading: "lazy",
                                width: 1200,
                                height: 630,
                            }
                        }
                        div {
                            time { datetime: p.date.clone(), "{p.date}" }
                            h2 { "{p.title}" }
                            p { "{p.description}" }
                        }
                        span { class: "row-arrow", "↗" }
                    }
                }
            }
        }
    }
}
#[component]
pub fn Protocols() -> Element {
    rsx! {
        main { id: "content", class: "wrap listing-page",
            p { class: "eyebrow", "THE IROH ECOSYSTEM" }
            h1 {
                "Small pieces."
                br {}
                em { "Big possibilities." }
            }
            p { class: "listing-description",
                "Iroh Protocols are pluggable extensions that build on direct connections. Like HTTP server middleware on steroids! Mix & match for fast, flexible, functionality."
            }
            div { class: "hero-actions",
                a {
                    class: "button primary",
                    href: "https://docs.iroh.computer/concepts/protocols",
                    "Protocols overview ↗"
                }
                a {
                    class: "text-link",
                    href: "https://docs.iroh.computer/protocols/writing-a-protocol",
                    "Write a protocol ↗"
                }
            }
            div { class: "registry-grid",
                for p in site_content::protocols() {
                    article {
                        h2 { "{p.title}" }
                        p { "{p.tagline}" }
                        div {
                            a { href: p.repository.clone(), "Source ↗" }
                            a { href: p.documentation.clone(), "API docs ↗" }
                            a { href: p
                                        .href.clone(), "Learn more ↗" }
                        }
                    }
                }
            }
        }
    }
}
#[component]
pub fn Content(segments: Vec<String>) -> Element {
    let path = format!("/{}", segments.join("/"));
    let path = match path.trim_end_matches('/') {
        "/solutions/rave" => "/solutions/video",
        "/solutions/delta-chat" => "/solutions/data-sync",
        p => p,
    }
        .to_string();
    if path == "/pricing" {
        return rsx! {
            crate::pricing::Pricing {}
        };
    }
    if path == "/services/hosting" {
        return rsx! {
            crate::hosting::Hosting {}
        };
    }
    if path == "/services/observability" {
        return rsx! {
            crate::observability::Observability { body: content::render(&path) }
        };
    }
    if path == "/services/enterprise" {
        return rsx! {
            crate::enterprise::Enterprise {}
        };
    }
    if path == "/solutions" {
        return rsx! {
            crate::solutions::Solutions {}
        };
    }
    if let Some(solution) = path
        .strip_prefix("/solutions/")
        .and_then(crate::solutions::find)
    {
        return rsx! {
            crate::solutions::SolutionPage { solution }
        };
    }
    if let Some(p) = site_content::protocols()
        .iter()
        .find(|p| path == format!("/proto/{}", p.slug))
    {
        return rsx! {
            main { id: "content", class: "wrap listing-page",
                Link { to: Route::Protocols {}, class: "text-link", "← All protocols" }
                h1 { "{p.title}" }
                p { class: "listing-description", "{p.tagline}" }
                div { class: "hero-actions",
                    a { class: "button primary", href: p.repository.clone(), "View source ↗" }
                    a { class: "text-link", href: p.documentation.clone(), "API documentation ↗" }
                    a { class: "text-link", href: p.href.clone(), "Learn more ↗" }
                }
            }
        };
    }
    let Some(page) = site_content::pages().iter().find(|p| p.path == path) else {
        return rsx! {
            main { id: "content", class: "wrap not-found",
                p { class: "eyebrow", "404 / PEER NOT FOUND" }
                h1 {
                    "This path"
                    br {}
                    em { "doesn't connect." }
                }
                p { "The page may have moved. Let's get you back on the network." }
                Link { to: Route::Home {}, class: "button primary", "Back to home ↗" }
                Link { to: Route::Blog {}, class: "text-link", "Explore the blog" }
            }
        };
    };
    let is_blog = path.starts_with("/blog/");
    let is_docs = path.starts_with("/docs");
    let category = if is_blog {
        "FIELD NOTES"
    } else if is_docs {
        "DOCUMENTATION"
    } else {
        "IROH / EXPLORE"
    };
    rsx! {
        main {
            id: "content",
            class: if is_docs { "wrap content-page docs-page" } else if is_blog { "wrap content-page blog-post" } else { "wrap content-page marketing-page" },
            div { class: "content-breadcrumb mono",
                Link { to: Route::Home {}, "IROH" }
                span { "/" }
                if is_blog {
                    Link { to: Route::Blog {}, "JOURNAL" }
                } else {
                    span { "{category}" }
                }
            }
            div { class: "content-layout",
                if is_docs {
                    aside { class: "docs-sidebar", "aria-label": "Documentation",
                        p { class: "eyebrow", "DOCUMENTATION" }
                        a {
                            class: "docs-current",
                            href: "https://docs.iroh.computer",
                            "Current docs ↗"
                        }
                        for p in site_content::pages().iter().filter(|p| p.path.starts_with("/docs")) {
                            Link {
                                to: p.path.clone(),
                                class: if p.path == path { "active" } else { "" },
                                "{p.title}"
                            }
                        }
                    }
                }
                article {
                    if is_blog {
                        header { class: "post-header",
                            p { class: "eyebrow", "{page.date} / {page.author}" }
                            h1 { "{page.title}" }
                            p { class: "post-description", "{page.description}" }
                        }
                    }
                    div { class: "prose",
                        if is_blog {
                            ArticleBody { key: "{page.path}", path: page.path.clone() }
                        } else {
                            { content::render(&
                                    path) }
                        }
                    }
                    if is_blog {
                        div { class: "post-end",
                            Link { to: Route::Blog {}, class: "text-link", "← Back to all articles" }
                            a {
                                href: "https://iroh.computer/discord",
                                class: "text-link",
                                "Join the conversation ↗"
                            }
                        }
                    }
                }
            }
        }
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[component]
fn ArticleBody(path: String) -> Element {
    let page = site_content::pages().iter().find(|p| p.path == path).expect("published article");
    rsx! { div { "data-article-body": path, dangerous_inner_html: page.html.clone() } }
}

#[cfg(target_arch = "wasm32")]
#[component]
fn ArticleBody(path: String) -> Element {
    let mut body = use_resource(use_reactive((&path,), |(path,)| async move {
        let url = site_content::article_body_url(&path);
        let mut request = document::eval(&format!(
            "try {{ dioxus.send(await window.iroh.loadArticle({}, {})); }} catch (_) {{ dioxus.send(null); }}",
            serde_json::to_string(&path).unwrap(), serde_json::to_string(&url).unwrap()
        ));
        request.recv::<Option<String>>().await.ok().flatten()
    }));
    match &*body.read_unchecked() {
        Some(Some(html)) => rsx! {
            div {
                "data-article-body": path.clone(),
                dangerous_inner_html: html.clone(),
                onmounted: move |_| {
                    document::eval(&format!("window.iroh.articleReady({})", serde_json::to_string(&path).unwrap()));
                },
            }
        },
        Some(None) => rsx! {
            div { "data-article-error": "", role: "alert",
                p { "The article couldn’t load. Check your connection and try again." }
                button { class: "button", onclick: move |_| body.restart(), "Try again" }
                a { class: "text-link", href: path, "Reload this page ↗" }
            }
        },
        None => rsx! { p { "data-article-loading": "", role: "status", "Loading article…" } },
    }
}
