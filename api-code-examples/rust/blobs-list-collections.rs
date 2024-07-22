#[tokio::main]
async fn main() -> anyhow::Result<()> {

// class AddCallback:
//     hash = None

//     async def progress(self, event):
//         if event.type() == AddProgressType.ALL_DONE:
//             all_done = event.as_all_done()
//             self.hash = all_done.hash


    // Create folder
    let tmpdir = tempfile::tempdir()?;
    let temp_path = tmpdir.path();
    println!("Created dir \"{}\"", temp_path.display());

    let file_names = ["foo", "bar", "bat"];
    // Create three files in the folder
    for file_name in file_names {
            file_path = os.path.join("tmp", file_name)
            with open(file_path, "w") as f:
                f.write(f"{file_name}")
                print(f"Created file {file_path}")
    }

    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    // Options
    let in_place = false
    let tag = SetTagOption.named(b'my_collection');
    let wrap = WrapOption.no_wrap();

    // Callback setup
    // callback = AddCallback();

    // Import the directory, creating one blob for each file, and one metadata
    // blob that stores the file names for each blob
    // also creates a 'collection' from the directory, grouping together the
    // blobs
    node.blobs().add_from_path(path, in_place, tag, wrap, callback).await?;

    let hash = callback.hash;
    println!("Added collection: {hash}");
    println!("collections list:");

    let mut coll_res = node.blobs().list_collections().await?;n
    while let Some(res) = coll_res.next().await {
        println!("\thash: {} tag: {}", res.hash, res.tag);
    }

    Ok(())
}
