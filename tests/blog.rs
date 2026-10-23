#[path = "../build_support/blog.rs"]
mod blog;

use std::{fs, path::Path};

const FRONT_MATTER: &str = "+++\ntitle = \"A post\"\ndescription = \"A description\"\ndate = \"2024-02-29\"\nauthor = \"A writer\"\nsocial_image = \"/blog/example/social.png\"\n+++\n";

#[test]
fn renders_markdown_features_and_preserves_explicit_anchors() {
    let source = format!(
        "{FRONT_MATTER}\n# Hello `world`\n\n# Hello world\n\n## Old anchor {{#existing-anchor}}\n\n```rust\nlet a = \"<tag>\";\n```\n\n| Plan | Price |\n| --- | --- |\n| Free | $0 |\n\n> [!NOTE]\n> Keep **this**.\n\n[Link](/blog/example#existing-anchor)\n\n![Diagram](/blog/example/diagram.svg)\n\n~~Removed~~\n\n- [x] Done\n\nA footnote[^one].\n\n[^one]: Footnote text.\n"
    );
    let post = blog::compile_post("example", &source).unwrap();
    assert_eq!(post.metadata.title, "A post");
    assert_eq!(post.metadata.description, "A description");
    assert_eq!(post.metadata.author, "A writer");
    assert_eq!(post.metadata.date, "2024-02-29");
    assert!(!post.metadata.draft);
    for expected in [
        "id=\"hello-world\"",
        "id=\"hello-world-2\"",
        "id=\"existing-anchor\"",
        "class=\"language-rust\"",
        "&lt;tag&gt;",
        "<table>",
        "<strong>this</strong>",
        "href=\"/blog/example#existing-anchor\"",
        "src=\"/blog/example/diagram.svg\"",
        "<del>Removed</del>",
        "type=\"checkbox\"",
        "Footnote text.",
    ] {
        assert!(
            post.html.contains(expected),
            "missing {expected}: {}",
            post.html
        );
    }
}

#[test]
fn rejects_invalid_front_matter_and_empty_posts() {
    assert!(blog::compile_post("example", "# Missing metadata").is_err());
    assert!(blog::compile_post("example", FRONT_MATTER).is_err());
    for date in [
        "2025-02-29",
        "2024-13-01",
        "2024-04-31",
        "+024-01-01",
        "yesterday",
    ] {
        let source = format!("{}\nContent", FRONT_MATTER.replace("2024-02-29", date));
        assert!(
            blog::compile_post("example", &source).is_err(),
            "accepted {date}"
        );
    }
    let empty_title = format!("{}\nContent", FRONT_MATTER.replace("A post", ""));
    assert!(blog::compile_post("example", &empty_title).is_err());
    assert!(blog::compile_post("../example", &format!("{FRONT_MATTER}\nContent")).is_err());
}

#[test]
fn every_post_has_valid_metadata_and_existing_local_images() {
    let root = Path::new(env!("CARGO_MANIFEST_DIR"));
    assert!(!root.join("content/pages.json").exists());
    assert!(!root.join("content/home.json").exists());
    let mut published = 0;
    for entry in fs::read_dir(root.join("content/blog")).unwrap() {
        let path = entry.unwrap().path();
        if path.extension().is_none_or(|ext| ext != "md") {
            continue;
        }
        let source = fs::read_to_string(&path).unwrap();
        let post = blog::compile_post(path.file_stem().unwrap().to_str().unwrap(), &source)
            .unwrap_or_else(|error| panic!("{}: {error}", path.display()));
        assert!(!post.html.is_empty());
        if let Some(image) = post.metadata.social_image.strip_prefix('/') {
            assert!(
                root.join("public")
                    .join(image.split(['?', '#']).next().unwrap())
                    .is_file(),
                "{}: missing social card {}",
                path.display(),
                image
            );
        }
        if !post.metadata.draft {
            published += 1;
        }
    }
    assert!(published > 0);
}

#[test]
fn reads_draft_flag() {
    let source = format!(
        "{}\nContent",
        FRONT_MATTER.replace("author =", "draft = true\nauthor =")
    );
    assert!(
        blog::compile_post("draft-post", &source)
            .unwrap()
            .metadata
            .draft
    );
}

#[test]
fn validates_social_cards_and_allows_text_only_posts() {
    let no_card = FRONT_MATTER.replace("social_image = \"/blog/example/social.png\"\n", "");
    assert!(
        blog::compile_post("example", &format!("{no_card}\nContent"))
            .unwrap()
            .metadata
            .social_image
            .is_empty()
    );
    for invalid in [
        "   ",
        "javascript:alert(1)",
        "//example.com/card.png",
        "/../card.png",
    ] {
        let source = FRONT_MATTER.replace("/blog/example/social.png", invalid);
        assert!(
            blog::compile_post("example", &format!("{source}\nContent")).is_err(),
            "accepted {invalid}"
        );
    }
    for image in [
        "",
        "/blog/example/social.png",
        "https://www.iroh.computer/api/og?title=Blog&subtitle=Hello%20world",
    ] {
        let source = FRONT_MATTER.replace("/blog/example/social.png", image);
        let post = blog::compile_post("example", &format!("{source}\nContent")).unwrap();
        assert_eq!(post.metadata.social_image, image);
    }
}
