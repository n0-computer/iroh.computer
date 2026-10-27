use iroh_computer::prerender::{paths, render};

#[test]
fn every_canonical_route_renders_content_and_its_own_metadata() {
    for path in paths() {
        let page = render(&path);
        assert!(
            page.body.contains("id=\"content\""),
            "missing content: {path}"
        );
        assert!(page.body.contains("<h1"), "missing headline: {path}");
        assert!(
            !page.body.contains("404 / PEER NOT FOUND"),
            "unrendered route: {path}"
        );
        assert!(
            page.head
                .contains(&format!("href=\"https://iroh.computer{path}\"")),
            "wrong canonical: {path}"
        );
        assert!(page.head.contains("property=\"og:image\""));
        assert!(!page.head.contains("/api/og"));
        assert!(!page.head.contains("noindex"));
        assert!(
            page.styles.iter().any(|s| s.ends_with("/style.css")),
            "missing CSS: {path}"
        );
    }
}

#[test]
fn blog_html_contains_the_article_and_social_metadata_without_javascript() {
    let page = render("/blog/iroh-services-2-0");
    assert!(page.body.contains("post-header"));
    assert!(page.body.contains("class=\"prose\""));
    assert!(page.body.contains("data-article-body=\"/blog/iroh-services-2-0\""));
    assert!(page.body.contains("<!-- iroh-article:/blog/iroh-services-2-0 -->"));
    assert!(!page.body.contains("data-article-loading"));
    assert!(
        page.head
            .contains("property=\"og:type\" content=\"article\"")
    );
    assert!(page.head.contains("article:published_time"));
    assert_eq!(page.head.matches("<title>").count(), 1);
    assert_eq!(page.head.matches("name=\"description\"").count(), 1);
}

#[test]
fn unknown_routes_render_an_unindexable_error_without_a_homepage_canonical() {
    let page = render("/this-page-does-not-exist");
    assert!(page.body.contains("404 / PEER NOT FOUND"));
    assert!(page.head.contains("name=\"robots\" content=\"noindex\""));
    assert!(!page.head.contains("canonical"));
    assert!(!page.head.contains("og:url"));
}

#[test]
fn canonical_routes_exclude_drafts_and_host_redirects() {
    let paths = paths();
    for path in [
        "/docs",
        "/docs/quickstart",
        "/solutions/rave",
        "/blog/what-is-derp",
        "/proto/iroh-blobs",
    ] {
        assert!(
            !paths.iter().any(|p| p == path),
            "redirect exported: {path}"
        );
    }
    assert!(paths.iter().any(|p| p == "/solutions/video"));
}
