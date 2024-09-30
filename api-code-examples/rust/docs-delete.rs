use futures_lite::StreamExt;
use iroh::docs::store::Query;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create in memory iroh node
    let node = iroh::node::Node::memory().enable_docs().spawn().await?;

    let author = node.authors().create().await?;
    println!("Created author {author}");

    let doc = node.docs().create().await?;
    println!("Created document {}", doc.id());

    let key = b"python";
    let hash = doc.set_bytes(author, &key[..], &b"says hello"[..]).await?;
    println!("Inserted {hash}");

    // Get all the entries with default filtering and sorting
    let query = Query::all().build();
    let entries = doc.get_many(query.clone()).await?.collect::<Vec<_>>().await;

    println!("Keys:");
    for entry in entries {
        let entry = entry?;
        let key = entry.key();
        let hash = entry.content_hash();
        let content = entry.content_bytes(node.client()).await?;
        println!(
            "{} : {} (hash: {hash})",
            std::str::from_utf8(key).unwrap(),
            std::str::from_utf8(&content).unwrap(),
        );

        println!(
            "Removing entry for author {author} and prefix {}.",
            std::str::from_utf8(key).unwrap(),
        );
    }

    // Removes all entries from that author and with the prefix "key"
    let num_removed = doc.del(author, &key[..]).await?;
    println!("Removed {num_removed} entry");

    let entries = doc.get_many(query).await?.collect::<Vec<_>>().await;

    println!("Keys:");
    for entry in entries {
        let entry = entry?;
        let key = entry.key();
        let hash = entry.content_hash();
        let content = entry.content_bytes(node.client()).await?;
        println!(
            "{} : {} (hash: {hash})",
            std::str::from_utf8(key).unwrap(),
            std::str::from_utf8(&content).unwrap(),
        );
    }
    Ok(())
}

// Output:
// Created author ybkptbq4imifxaj544hl5etyszhecuepp66qlezov7sdzm3hqk4a
// Created document ipqqeughovjrvcxl5sji3hlwycheqqgiajq5hgnf6vtqp6qigm6q
// Inserted bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte
// Keys:
// python : says hello (hash: bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte)
// Removing entry for author ybkptbq4imifxaj544hl5etyszhecuepp66qlezov7sdzm3hqk4a and prefix python.
// Removed 1 entry
// Keys:
