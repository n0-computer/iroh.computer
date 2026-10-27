#[path = "../build_support/blog.rs"]
mod blog;
#[path = "../build_support/feeds.rs"]
mod feeds;
#[path = "../src/content/models.rs"]
#[allow(dead_code)]
mod models;
#[path = "../src/content/page_metadata.rs"]
mod page_metadata;
#[path = "../src/content/protocols.rs"]
mod protocols;

use models::{Page, Protocol};
use std::{fs, path::Path};

fn page(path: &str, date: &str) -> Page {
    Page {
        path: path.into(),
        date: date.into(),
        title: "QUIC & <friends> \"hello\" 'world' — café".into(),
        description: "Use <b> & share".into(),
        author: String::new(),
        social_image: String::new(),
        html: String::new(),
    }
}

#[test]
fn rss_escapes_text_sorts_dates_and_preserves_url_guids() {
    let posts = [
        page("/blog/older", "2024-02-29"),
        page("/pricing", ""),
        page("/blog/newer", "2026-10-19"),
    ];
    let rss = feeds::rss(&posts);
    assert!(rss.contains("QUIC &amp; &lt;friends&gt; &quot;hello&quot; &apos;world&apos; — café"));
    assert!(rss.contains("<description>Use &lt;b&gt; &amp; share</description>"));
    assert!(rss.contains("<pubDate>Thu, 29 Feb 2024 00:00:00 +0000</pubDate>"));
    assert!(rss.contains("<guid isPermaLink=\"true\">https://iroh.computer/blog/newer</guid>"));
    assert!(rss.find("/blog/newer").unwrap() < rss.find("/blog/older").unwrap());
    assert!(!rss.contains("/pricing"));
    assert_eq!(rss.matches("<item>").count(), 2);
    assert_eq!(rss, feeds::rss(&posts));
}

#[test]
fn sitemap_omits_redirects_deduplicates_routes_and_uses_only_known_dates() {
    let pages = [
        page("/pricing", ""),
        page("/pricing", ""),
        page("/docs", ""),
        page("/docs/example", ""),
        page("/blog/old", "2024-02-29"),
        page("/blog/current", "2026-10-19"),
    ];
    let redirects = [
        feeds::Redirect {
            source: "/docs/:path*".into(),
        },
        feeds::Redirect {
            source: "/blog/old".into(),
        },
    ];
    let xml = feeds::sitemap(&pages, &[], &redirects);
    assert_eq!(
        xml.matches("<loc>https://iroh.computer/pricing</loc>")
            .count(),
        1
    );
    assert!(xml.contains("<loc>https://iroh.computer/</loc>"));
    assert!(!xml.contains("/docs"));
    assert!(!xml.contains("/blog/old"));
    assert_eq!(xml.matches("<lastmod>").count(), 1);
    assert!(xml.contains("<lastmod>2026-10-19</lastmod>"));
    assert!(feeds::redirect_matches("/docs/:path*", "/docs/a/b"));
    assert!(feeds::redirect_matches("/docs/:slug", "/docs/a"));
    assert!(!feeds::redirect_matches("/docs/:slug", "/docs/a/b"));
    assert!(!feeds::redirect_matches("/docs/:path*", "/docs-other"));
}

#[test]
fn generated_files_cover_the_catalog_without_drafts_or_redirected_sitemap_urls() {
    let root = Path::new(env!("CARGO_MANIFEST_DIR"));
    let rss = include_str!(concat!(env!("OUT_DIR"), "/rss.xml"));
    let sitemap = include_str!(concat!(env!("OUT_DIR"), "/sitemap.xml"));
    let redirects: Vec<feeds::Redirect> =
        serde_json::from_str(&fs::read_to_string(root.join("deployment/redirects.json")).unwrap())
            .unwrap();
    let mut published = 0;
    let mut pages = page_metadata::metadata();
    for entry in fs::read_dir(root.join("content/blog")).unwrap() {
        let path = entry.unwrap().path();
        if path.extension().is_none_or(|ext| ext != "md") {
            continue;
        }
        let slug = path.file_stem().unwrap().to_str().unwrap();
        let post = blog::compile_post(slug, &fs::read_to_string(&path).unwrap()).unwrap();
        let route = format!("/blog/{slug}");
        let guid = format!(
            "<guid isPermaLink=\"true\">{}{route}</guid>",
            feeds::SITE_URL
        );
        if post.metadata.draft {
            assert!(!rss.contains(&guid), "draft leaked into RSS: {slug}");
            assert!(
                !sitemap.contains(&format!("<loc>{}{route}</loc>", feeds::SITE_URL)),
                "draft leaked into sitemap: {slug}"
            );
        } else {
            published += 1;
            assert!(rss.contains(&guid), "post missing from RSS: {slug}");
            pages.push(page(&route, &post.metadata.date));
        }
    }
    assert_eq!(rss.matches("<item>").count(), published);
    assert_eq!(
        sitemap,
        feeds::sitemap(&pages, &protocols::load(), &redirects)
    );
    assert!(!sitemap.contains("/docs/"));
    assert!(!sitemap.contains("/proto/iroh-blobs</loc>"));
    assert!(sitemap.contains("/proto/iroh-roq</loc>"));
}
