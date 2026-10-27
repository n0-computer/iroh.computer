#[path = "build_support/blog.rs"]
mod blog;
#[path = "build_support/feeds.rs"]
mod feeds;
#[path = "src/content/models.rs"]
#[allow(dead_code)]
mod models;
#[path = "src/content/page_metadata.rs"]
mod page_metadata;
#[path = "src/content/protocols.rs"]
mod protocols;

use models::{Page, Protocol};

use std::{env, fs, path::PathBuf};

fn main() {
    println!("cargo:rerun-if-changed=content/blog");
    println!("cargo:rerun-if-changed=build_support/blog.rs");
    for path in [
        "build_support/feeds.rs",
        "src/content/models.rs",
        "src/content/page_metadata.rs",
        "src/content/protocols.rs",
        "vercel.json",
        "deployment/redirects.json",
    ] {
        println!("cargo:rerun-if-changed={path}");
    }
    let root = PathBuf::from(env::var_os("CARGO_MANIFEST_DIR").unwrap());
    let output = PathBuf::from(env::var_os("OUT_DIR").unwrap());
    let mut files: Vec<_> = fs::read_dir(root.join("content/blog"))
        .expect("read content/blog")
        .map(|entry| entry.expect("read blog entry").path())
        .filter(|path| path.extension().is_some_and(|extension| extension == "md"))
        .collect();
    files.sort();

    let mut generated = String::from("vec![\n");
    let mut article_assets = String::from("match path {\n");
    let mut pages = page_metadata::metadata();
    for file in files {
        let slug = file.file_stem().unwrap().to_str().expect("UTF-8 blog slug");
        let source = fs::read_to_string(&file).expect("read Markdown post");
        let post = blog::compile_post(slug, &source)
            .unwrap_or_else(|error| panic!("{}: {error}", file.display()));
        if post.metadata.draft {
            continue;
        }
        if let Some(local_path) = post.metadata.social_image.strip_prefix('/') {
            let local_path = local_path.split(['?', '#']).next().unwrap();
            assert!(
                root.join("public").join(local_path).is_file(),
                "{}: social_image does not exist in public/: {}",
                file.display(),
                local_path
            );
        }
        // A plain-text asset avoids HTML clean-URL redirects. Manganis copies
        // and hashes it for both dx serve and production, without embedding its
        // contents in the WebAssembly module.
        let html_path = output.join(format!("blog-{slug}.txt"));
        fs::write(
            &html_path,
            format!("<!-- iroh-article:/blog/{slug} -->\n{}", post.html),
        )
        .expect("write rendered blog post");
        article_assets.push_str(&format!(
            "{:?} => dioxus::prelude::asset!({:?}).to_string(),\n",
            format!("/blog/{slug}"),
            html_path.strip_prefix(&root).expect("article assets require a target directory inside the project")
        ));
        generated.push_str(&format!(
            "Page {{ path: {:?}.into(), title: {:?}.into(), description: {:?}.into(), date: {:?}.into(), author: {:?}.into(), social_image: {:?}.into(), html: {{ #[cfg(not(target_arch = \"wasm32\"))] {{ include_str!({:?}).into() }} #[cfg(target_arch = \"wasm32\")] {{ String::new() }} }} }},\n",
            format!("/blog/{slug}"), post.metadata.title, post.metadata.description,
            post.metadata.date, post.metadata.author, post.metadata.social_image, html_path,
        ));
        pages.push(Page {
            path: format!("/blog/{slug}"),
            title: post.metadata.title,
            description: post.metadata.description,
            date: post.metadata.date,
            author: post.metadata.author,
            social_image: post.metadata.social_image,
            html: String::new(),
        });
    }
    generated.push_str("]\n");
    fs::write(output.join("blog.rs"), generated).expect("write blog index");
    article_assets.push_str("_ => panic!(\"unknown article\"),\n}\n");
    fs::write(output.join("article_assets.rs"), article_assets).expect("write article asset index");
    let config: serde_json::Value =
        serde_json::from_str(&fs::read_to_string(root.join("vercel.json")).unwrap()).unwrap();
    let redirect_map: serde_json::Value =
        serde_json::from_str(&fs::read_to_string(root.join("deployment/redirects.json")).unwrap())
            .unwrap();
    assert_eq!(
        config["redirects"], redirect_map,
        "Vercel redirects must match deployment/redirects.json"
    );
    let redirects: Vec<feeds::Redirect> = serde_json::from_value(redirect_map).unwrap();
    fs::write(
        output.join("routes.json"),
        serde_json::to_string(
            &feeds::routes(&pages, &protocols::load(), &redirects)
                .keys()
                .collect::<Vec<_>>(),
        )
        .unwrap(),
    )
    .unwrap();
    fs::write(output.join("rss.xml"), feeds::rss(&pages)).expect("write RSS feed");
    fs::write(
        output.join("sitemap.xml"),
        feeds::sitemap(&pages, &protocols::load(), &redirects),
    )
    .expect("write sitemap");
}
