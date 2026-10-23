use dioxus::prelude::*;
mod contact;
mod contact_fields;
mod content;
mod enterprise;
mod highlight;
mod home;
mod hosting;
mod metadata;
mod network;
mod observability;
mod pages;
#[cfg(not(target_arch = "wasm32"))]
pub mod prerender;
mod pricing;
mod service_art;
mod solutions;
use home::Home;
use pages::{Blog, Content, Protocols};
use pricing::Pricing;
use solutions::Solutions;

#[derive(Clone, Routable, Debug, PartialEq)]
enum Route {
    #[layout(Shell)]
    #[route("/")]
    Home {},
    #[route("/blog")]
    Blog {},
    #[route("/proto")]
    Protocols {},
    #[route("/pricing")]
    Pricing {},
    #[route("/solutions")]
    Solutions {},
    #[route("/:..segments")]
    Content { segments: Vec<String> },
}

#[component]
pub fn App() -> Element {
    use_effect(|| {
        document::eval("window.iroh.activate()");
    });
    rsx! {
        document::Stylesheet { href: asset!("/assets/style.css") }
        document::Stylesheet { href: asset!("/assets/contact.css") }
        Router::<Route> {}
    }
}
#[component]
fn Shell() -> Element {
    let route = use_route::<Route>().to_string();
    let metadata = metadata::for_path(&route);
    use_effect(use_reactive((&metadata,), |(metadata,)| {
        document::eval(&format!(
            "window.iroh.setMetadata({})",
            serde_json::to_string(&metadata).unwrap()
        ));
    }));
    let mut search_open = use_signal(|| false);
    let contact = use_signal(|| None::<&'static str>);
    use_context_provider(|| contact);
    rsx! {
        a { class: "skip-link", href: "#content", "Skip to content" }
        header { class: "site-header",
            div { class: "nav-inner",
                Link { to: Route::Home {}, class: "wordmark", "aria-label": "iroh home",
                    img { src: "/img/logo/iroh-wordmark-purple.svg", alt: "iroh", width: 83, height: 32 }
                    span { class: "brand-cursor", "_" }
                }
                nav { class: "desktop-nav", "aria-label": "Main navigation",
                    details { summary { "Use cases" span { "⌄" } }
                        div { class: "nav-menu",
                            for (label, url) in [("Remote access","vpn"),("Distributed AI","distributed-ai"),("Video streaming","video"),("Data sync","data-sync"),("Payments & POS","pos"),("IoT & embedded","iot")] {
                                Link { to: format!("/solutions/{url}"), "{label}" span { "↗" } }
                            }
                        }
                    }
                    details { summary { "Services" span { "⌄" } }
                        div { class: "nav-menu",
                            for (label,url) in [("Hosting","hosting"),("Observability","observability"),("Enterprise","enterprise")] {
                                Link { to: format!("/services/{url}"), "{label}" span { "↗" } }
                            }
                        }
                    }
                    a { href: "https://docs.iroh.computer", "Docs" span { class: "external", "↗" } }
                    Link { to: Route::Blog {}, "Blog" }
                    Link { to: "/pricing", "Pricing" }
                }
                div { class: "nav-actions",
                    button { class: "icon-button search-trigger", title: "Search the site", "aria-label": "Search the site", onclick: move |_| search_open.set(true), Icon { name: "search" } }
                    a { class: "icon-button github-link", href: "https://github.com/n0-computer/iroh", "aria-label": "iroh on GitHub", Icon { name: "github" } }
                    button { class: "icon-button theme-toggle", title: "Switch color theme", "aria-label": "Switch color theme", onclick: |_| { document::eval("window.iroh.toggleTheme()"); },
                        span { class: "theme-dark", Icon { name: "sun" } }
                        span { class: "theme-light", Icon { name: "moon" } }
                    }
                    a { class: "button nav-cta", href: "https://services.iroh.computer?utm_source=website&utm_content=nav-signup", "Get started" span { "↗" } }
                    details { class: "mobile-nav",
                        summary { "aria-label": "Open navigation", Icon { name: "menu" } }
                        nav { class: "nav-menu", "aria-label": "Mobile navigation",
                            a { href: "/#solutions", "Use cases" }
                            Link { to: "/services/hosting", "Hosting" }
                            Link { to: "/services/observability", "Observability" }
                            Link { to: "/services/enterprise", "Enterprise" }
                            a { href: "https://docs.iroh.computer", "Documentation ↗" }
                            Link { to: Route::Blog {}, "Blog" }
                            Link { to: "/pricing", "Pricing" }
                            Link { to: Route::Protocols {}, "Protocols" }
                        }
                    }
                }
            }
        }
        Outlet::<Route> {}
        Footer {}
        if search_open() { SearchDialog { onclose: move |_| search_open.set(false) } }
        if let Some(source) = contact() { contact::ContactDialog { source } }
    }
}
#[component]
fn Icon(name: &'static str) -> Element {
    let path = match name {
        "sun" => {
            "M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.7.7m11.4 11.4.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        }
        "moon" => "M20.5 14A8.6 8.6 0 0 1 10 3.5 8.6 8.6 0 1 0 20.5 14Z",
        "search" => "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
        "menu" => "M4 7h16M4 12h16M4 17h16",
        "github" => {
            "M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-1.5-.5-2 3-.3 6-1.5 6-6a5 5 0 0 0-1.3-3.5 4.5 4.5 0 0 0-.1-3.5s-1.1-.4-3.6 1.3a12 12 0 0 0-6.5 0C6.5 2.6 5.4 3 5.4 3a4.5 4.5 0 0 0-.1 3.5A5 5 0 0 0 4 10c0 4.5 3 5.7 6 6-.6.5-.6 1.5-.6 2v4"
        }
        _ => "M5 12h14m-6-6 6 6-6 6",
    };
    rsx! { svg { width: 20, height: 20, view_box: "0 0 24 24", fill: "none", stroke: "currentColor", stroke_width: "1.5", stroke_linecap: "round", stroke_linejoin: "round", "aria-hidden": "true", path { d: path } } }
}
#[component]
fn Footer() -> Element {
    rsx! {
        footer { class: "site-footer",
            div { class: "footer-main wrap",
                div { class: "footer-brand",
                    Link { to: Route::Home {}, class: "wordmark", img { src: "/img/logo/iroh-wordmark-purple.svg", alt: "iroh", width: 94 } }
                    p { "Less net work for networks." }
                    a { class: "mono footer-made", href: "https://n0.computer", "A project by n0.computer ↗" }
                }
                div { h3 { "Build" } a { href: "https://docs.iroh.computer", "Documentation ↗" } a { href: "https://github.com/n0-computer/iroh", "GitHub ↗" } Link { to: Route::Protocols {}, "Protocols" } Link { to: "/roadmap", "Roadmap" } }
                div { h3 { "Learn" } Link { to: Route::Blog {}, "Blog" } a { href: "/docs/examples", "Examples" } a { href: "https://dumbpipe.dev", "dumbpipe ↗" } Link { to: "/sendme", "sendme" } Link { to: "/changelog", "Changelog" } }
                div { h3 { "Connect" } a { href: "https://iroh.computer/discord", "Discord ↗" } a { href: "https://github.com/n0-computer/iroh/discussions", "Discussion ↗" } a { href: "https://twitter.com/iroh_n0", "Twitter ↗" } a { href: "https://bsky.app/profile/iroh.computer", "Bluesky ↗" } a { href: "https://mastodon.social/@n0iroh", "Mastodon ↗" } a { href: "https://www.youtube.com/@n0computer", "YouTube ↗" } }
            }
            div { class: "footer-bottom wrap mono", span { "© 2026 n0, inc." } span { class: "footer-status", i { class: "status-dot" } "Built in the open." } Link { to: "/legal", "Privacy & terms ↗" } }
        }
    }
}
#[component]
fn SearchDialog(onclose: EventHandler<()>) -> Element {
    let mut query = use_signal(String::new);
    let needle = query().to_lowercase();
    let results: Vec<_> = content::pages()
        .iter()
        .filter(|p| {
            p.path != "/"
                && (p.title.to_lowercase().contains(&needle)
                    || p.description.to_lowercase().contains(&needle))
        })
        .take(12)
        .collect();
    rsx! {
        dialog { class: "search-dialog", "aria-label": "Search iroh", onmounted: |_| {document::eval("const d=document.querySelector('.search-dialog');d.showModal();d.querySelector('input').focus()");}, oncancel: move |_| onclose.call(()),
            div { class: "search-head", Icon { name: "search" } input { placeholder: "Search articles, docs, and more…", "aria-label": "Search content", value: query, oninput: move |e| query.set(e.value()) } button { class: "icon-button", onclick: move |_| onclose.call(()), "aria-label": "Close search", "×" } }
            div { class: "search-results",
                if results.is_empty() { p { "No results. Try another search." } }
                for page in results {
                    a { href: page.path.clone(), span { class: "mono", "{page.path}" } strong { "{page.title}" } }
                }
            }
        }
    }
}
