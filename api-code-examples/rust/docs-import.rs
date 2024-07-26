use futures_lite::StreamExt;
use iroh::{docs::store::Query, util::fs::path_to_key};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let tmpdir = tempfile::tempdir()?;
    let root = tmpdir.path();

    let file_names = ["foo", "bar", "bat"];
    // Create three files in the folder
    for file_name in file_names {
        let file_path = root.join(file_name);
        tokio::fs::write(&file_path, file_name).await?;
        println!("Created file {}", file_path.display());
    }

    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    // Create author and document
    let author = node.authors().create().await?;
    println!("Created author {}", author);

    let doc = node.docs().create().await?;
    println!("Created document {}", doc.id());

    let prefix = "import-example";
    // Import the files
    for file_name in file_names {
        let path = root.join(file_name);
        // create a key from the path, use the `iroh.PathToKey` function to ensure
        // that we strip the root correctly, and add any prefix we want to add for
        // organizational purposes
        let key = path_to_key(&path, Some(prefix.into()), Some(root.into()))?;
        doc.import_file(author, key, path, false)
            .await?
            .collect::<Vec<_>>()
            .await;
    }

    // Get all the entries with default filtering and sorting
    let query = Query::all().build();
    let entries = doc.get_many(query).await?.collect::<Vec<_>>().await;

    println!("One entry for each file:");
    for entry in entries {
        let entry = entry?;
        let key = entry.key();
        let hash = entry.content_hash();
        let content = entry.content_bytes(node.client()).await?;
        println!(
            "{}: {} (hash: {hash})",
            std::str::from_utf8(key)?,
            std::str::from_utf8(&content)?
        );
    }
    Ok(())
}

// Output:
// Created file <tmp>/foo
// Created file <tmp>/bar
// Created file <tmp>/bat
// Created author kpksn2yl2c3nlppjtnpxa2h2utmu2fdnutuwptybenr3gxdlrkiq
// Created document af7klzttoegn6kvr7p6j7tgw6tz2w54n5bfzqvpcfmy2mrkk3pgq
// One entry for each file:
// import-examplebar: bar (hash: bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu)
// import-examplebat: bat (hash: bafkr4iabccdb2eyeu764xoewbcqv62sjaggxibtmxx5tnmwer3wp3rquq4)
// import-examplefoo: foo (hash: bafkr4iae4c5tt4yldi76xcpvg3etxykqkvec352im5fqbutolj2xo5yc5e)
