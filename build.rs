#[path = "build_support/blog.rs"]
mod blog;

use std::{env, fs, path::PathBuf};

fn main() {
    println!("cargo:rerun-if-changed=content/blog");
    println!("cargo:rerun-if-changed=build_support/blog.rs");
    let root = PathBuf::from(env::var_os("CARGO_MANIFEST_DIR").unwrap());
    let output = PathBuf::from(env::var_os("OUT_DIR").unwrap());
    let mut files: Vec<_> = fs::read_dir(root.join("content/blog"))
        .expect("read content/blog")
        .map(|entry| entry.expect("read blog entry").path())
        .filter(|path| path.extension().is_some_and(|extension| extension == "md"))
        .collect();
    files.sort();

    let mut generated = String::from("vec![\n");
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
        let html_path = output.join(format!("blog-{slug}.html"));
        fs::write(&html_path, post.html).expect("write rendered blog post");
        generated.push_str(&format!(
            "Page {{ path: {:?}.into(), title: {:?}.into(), description: {:?}.into(), date: {:?}.into(), author: {:?}.into(), social_image: {:?}.into(), html: include_str!({:?}).into() }},\n",
            format!("/blog/{slug}"), post.metadata.title, post.metadata.description,
            post.metadata.date, post.metadata.author, post.metadata.social_image, html_path,
        ));
    }
    generated.push_str("]\n");
    fs::write(output.join("blog.rs"), generated).expect("write blog index");
}
