use futures_lite::StreamExt;
use iroh::{
    blobs::store::ExportMode,
    util::fs::{key_to_path, path_to_key},
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create folder
    let tmpdir = tempfile::tempdir()?;
    let temp_path = tmpdir.path();

    let root = temp_path.join("import");
    let export_path = temp_path.join("export");

    tokio::fs::create_dir_all(&root).await?;
    tokio::fs::create_dir_all(&export_path).await?;

    // Create file
    tokio::fs::write(root.join("hello_world"), "Hello World!").await?;
    println!("Created file \"hello_world\"");

    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    // Create author and document
    let author = node.authors().create().await?;
    println!("Created author {author}");

    let doc = node.docs().create().await?;
    println!("Created document {}", doc.id());

    let prefix = "import-example";

    // Import the file
    let path = root.join("hello_world");
    let key = path_to_key(&path, Some(prefix.into()), Some(root.into()))?;
    println!("key: {}", std::str::from_utf8(&key).unwrap());
    doc.import_file(author, key.clone(), path, false)
        .await?
        .collect::<Vec<_>>()
        .await;

    // Export the file
    // Get the entry via an exact author and key
    let entry = doc.get_exact(author, key.clone(), false).await?.unwrap();

    println!("root: {}", export_path.display());

    // Create the export path from the key, prefix, and directory location
    let export_path = key_to_path(key, Some(prefix.into()), Some(export_path))?;

    // Export the entry
    doc.export_file(entry, &export_path, ExportMode::Copy)
        .await?
        .collect::<Vec<_>>()
        .await;

    // Open the exported file and print the contents
    let content = tokio::fs::read_to_string(&export_path).await?;
    println!("file {}: {content}", export_path.display());
    Ok(())
}

// Output:
// Created dir $HOME/tmp
// Created file "hello_world"
// Created author 2bgy4eozp5mcrhzqm6fylwpqsm2mddqogg4yphunegll2gxtmh4q
// Created document mu65dqhxcchrfkfm6meyllitrpayljdra4qrqy54s4sgfwlgr2tq
// key: import-examplehello_world
// root: $HOME/export
// file $HOME/export/hello_world: Hello World!
