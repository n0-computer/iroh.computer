use std::{fs, path::PathBuf};

fn main() {
    let output = PathBuf::from(
        std::env::args_os()
            .nth(1)
            .expect("usage: prerender OUTPUT_DIRECTORY"),
    );
    let template = fs::read_to_string(output.join("index.html")).expect("run dx build first");
    let paths = iroh_computer::prerender::paths();
    for path in paths
        .iter()
        .map(String::as_str)
        .chain(std::iter::once("/404"))
    {
        let file = if path == "/" {
            output.join("index.html")
        } else {
            output.join(format!("{}.html", path.trim_start_matches('/')))
        };
        fs::create_dir_all(file.parent().unwrap()).unwrap();
        fs::write(
            file,
            iroh_computer::prerender::html(&template, path, &output),
        )
        .unwrap();
    }
    println!(
        "Prerendered {} canonical pages and the 404 page",
        paths.len()
    );
}
