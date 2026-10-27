use crate::{Page, Protocol};
use serde::Deserialize;
use std::collections::BTreeMap;
use std::fmt::Write;
use time::{Date, Month, format_description::well_known::Rfc2822};

pub const SITE_URL: &str = "https://iroh.computer";

#[derive(Deserialize)]
pub struct Redirect {
    pub source: String,
}

/// These listing routes have no entry in the content-page metadata.
const LISTINGS: &[&str] = &["/", "/blog", "/proto"];

pub fn rss(pages: &[Page]) -> String {
    let mut posts: Vec<_> = pages
        .iter()
        .filter(|p| p.path.starts_with("/blog/"))
        .collect();
    posts.sort_by(|a, b| b.date.cmp(&a.date).then_with(|| a.path.cmp(&b.path)));
    let mut xml = String::from(
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n<channel>\n",
    );
    element(&mut xml, "title", "Blog posts | RSS Feed");
    element(&mut xml, "description", "Welcome to Iroh!");
    element(&mut xml, "link", SITE_URL);
    writeln!(
        xml,
        "<atom:link href=\"{SITE_URL}/rss.xml\" rel=\"self\" type=\"application/rss+xml\" />"
    )
    .unwrap();
    if let Some(latest) = posts.first() {
        element(&mut xml, "lastBuildDate", &rss_date(&latest.date));
    }
    for post in posts {
        let url = format!("{SITE_URL}{}", post.path);
        xml.push_str("<item>\n");
        element(&mut xml, "title", &post.title);
        element(&mut xml, "description", &post.description);
        element(&mut xml, "link", &url);
        // Match the old feed exactly so existing subscriptions keep their read history.
        writeln!(xml, "<guid isPermaLink=\"true\">{}</guid>", escape(&url)).unwrap();
        element(&mut xml, "pubDate", &rss_date(&post.date));
        xml.push_str("</item>\n");
    }
    xml.push_str("</channel>\n</rss>\n");
    xml
}

pub fn routes(
    pages: &[Page],
    protocols: &[Protocol],
    redirects: &[Redirect],
) -> BTreeMap<String, String> {
    let mut routes = BTreeMap::new();
    for path in LISTINGS {
        routes.insert(path.to_string(), String::new());
    }
    for page in pages {
        routes.insert(page.path.clone(), page.date.clone());
    }
    for protocol in protocols {
        routes.insert(format!("/proto/{}", protocol.slug), String::new());
    }
    routes.retain(|path, _| !redirects.iter().any(|r| redirect_matches(&r.source, path)));
    routes
}

pub fn sitemap(pages: &[Page], protocols: &[Protocol], redirects: &[Redirect]) -> String {
    let mut xml = String::from(
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n",
    );
    for (path, date) in routes(pages, protocols, redirects) {
        xml.push_str("<url>\n");
        element(&mut xml, "loc", &format!("{SITE_URL}{path}"));
        if !date.is_empty() {
            element(&mut xml, "lastmod", &date);
        }
        xml.push_str("</url>\n");
    }
    xml.push_str("</urlset>\n");
    xml
}

// The deployment map uses exact paths, single-segment parameters, and :path* tails.
pub fn redirect_matches(source: &str, path: &str) -> bool {
    let mut path_parts = path.trim_matches('/').split('/');
    for segment in source.trim_matches('/').split('/') {
        if segment.starts_with(':') && segment.ends_with('*') {
            return true;
        }
        let Some(part) = path_parts.next() else {
            return false;
        };
        if !segment.starts_with(':') && segment != part {
            return false;
        }
    }
    path_parts.next().is_none()
}

fn rss_date(value: &str) -> String {
    let mut parts = value.split('-');
    let year = parts.next().unwrap().parse().unwrap();
    let month = Month::try_from(parts.next().unwrap().parse::<u8>().unwrap()).unwrap();
    let day = parts.next().unwrap().parse().unwrap();
    Date::from_calendar_date(year, month, day)
        .expect("validated blog date")
        .midnight()
        .assume_utc()
        .format(&Rfc2822)
        .expect("RSS date must be representable as RFC 2822")
}

fn element(xml: &mut String, name: &str, value: &str) {
    writeln!(xml, "<{name}>{}</{name}>", escape(value)).unwrap();
}

fn escape(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&apos;")
}
