//! Copy Cargo's generated XML into the static deployment directory after dx build.
use std::{env, fs, path::PathBuf};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut args = env::args_os().skip(1);
    let output = PathBuf::from(args.next().ok_or("usage: export_feeds OUTPUT_DIRECTORY")?);
    if args.next().is_some() {
        return Err("usage: export_feeds OUTPUT_DIRECTORY".into());
    }
    fs::create_dir_all(&output)?;
    for (name, contents) in [
        (
            "rss.xml",
            include_str!(concat!(env!("OUT_DIR"), "/rss.xml")),
        ),
        (
            "sitemap.xml",
            include_str!(concat!(env!("OUT_DIR"), "/sitemap.xml")),
        ),
    ] {
        fs::write(output.join(name), contents)?;
        println!("Generated {}", output.join(name).display());
    }
    Ok(())
}
