mod protocols;
mod snippets;

use serde::Deserialize;
use std::sync::OnceLock;

#[derive(Clone, Deserialize, PartialEq)]
pub struct Page {
    pub path: String,
    pub title: String,
    pub description: String,
    pub date: String,
    pub author: String,
    pub social_image: String,
    pub html: String,
}
#[derive(Clone, Deserialize, PartialEq)]
pub struct Snippet {
    pub title: String,
    pub label: String,
    pub language: String,
    pub code: String,
}
#[derive(Clone, Deserialize, PartialEq)]
pub struct Protocol {
    pub title: String,
    pub tagline: String,
    pub slug: String,
    pub repository: String,
    pub href: String,
    pub documentation: String,
}
pub fn pages() -> &'static Vec<Page> {
    static PAGES: OnceLock<Vec<Page>> = OnceLock::new();
    PAGES.get_or_init(|| {
        let mut pages = crate::pages::content::metadata();
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
