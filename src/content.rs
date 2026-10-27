mod models;
mod page_metadata;
mod protocols;
mod snippets;

use std::sync::OnceLock;

pub use models::{Page, Protocol, Snippet};

pub fn pages() -> &'static Vec<Page> {
    static PAGES: OnceLock<Vec<Page>> = OnceLock::new();
    PAGES.get_or_init(|| {
        let mut pages = page_metadata::metadata();
        let posts: Vec<Page> = include!(concat!(env!("OUT_DIR"), "/blog.rs"));
        pages.extend(posts);
        pages
    })
}
pub fn snippets() -> &'static Vec<Snippet> {
    static SNIPPETS: OnceLock<Vec<Snippet>> = OnceLock::new();
    SNIPPETS.get_or_init(snippets::load)
}
pub fn protocols() -> &'static Vec<Protocol> {
    static PROTOCOLS: OnceLock<Vec<Protocol>> = OnceLock::new();
    PROTOCOLS.get_or_init(protocols::load)
}
pub fn posts() -> Vec<&'static Page> {
    let mut posts: Vec<_> = pages()
        .iter()
        .filter(|p| p.path.starts_with("/blog/"))
        .collect();
    posts.sort_by(|a, b| b.date.cmp(&a.date));
    posts
}

#[cfg(target_arch = "wasm32")]
pub fn article_body_url(path: &str) -> String {
    use dioxus::prelude::manganis;
    include!(concat!(env!("OUT_DIR"), "/article_assets.rs"))
}
