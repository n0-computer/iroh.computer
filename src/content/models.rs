//! Shared content types for the app and static publishing tools.
use serde::Deserialize;

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
