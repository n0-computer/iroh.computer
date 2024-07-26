use iroh::{
    blobs::{provider::AddProgress, util::SetTagOption},
    client::blobs::WrapOption,
};

use futures_lite::StreamExt;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create folder
    let tmpdir = tempfile::tempdir()?;
    let temp_path = tmpdir.path();
    println!("Created dir \"{}\"", temp_path.display());

    let file_names = ["foo", "bar", "bat"];
    // Create three files in the folder
    for file_name in file_names {
        let file_path = temp_path.join(file_name);
        tokio::fs::write(&file_path, file_name).await?;
        println!("Created file {}", file_path.display());
    }

    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    // Options
    let in_place = false;
    let tag = SetTagOption::Named("my_collection".into());
    let wrap = WrapOption::NoWrap;

    // Import the directory, creating one blob for each file, and one metadata
    // blob that stores the file names for each blob
    // also creates a 'collection' from the directory, grouping together the
    // blobs
    let mut progress = node
        .blobs()
        .add_from_path(temp_path.into(), in_place, tag, wrap)
        .await?;

    let hash = loop {
        match progress.next().await {
            Some(Ok(AddProgress::AllDone { hash, .. })) => {
                break hash;
            }
            Some(Err(err)) => {
                return Err(err.into());
            }
            None => {
                panic!("progress ended early");
            }
            _ => {}
        }
    };

    println!("Added collection: {hash}");
    println!("collections list:");

    let mut coll_res = node.blobs().list_collections()?;
    while let Some(res) = coll_res.next().await {
        let res = res?;
        println!("\thash: {} tag: {}", res.hash, res.tag);
    }

    Ok(())
}
