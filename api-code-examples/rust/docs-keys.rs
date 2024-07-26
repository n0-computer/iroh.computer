use iroh::docs::store::Query;

use futures_lite::StreamExt;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    let node_id = node.node().node_id().await?;
    println!("Started Iroh node: {node_id}");

    let author = node.authors().default().await?;

    let doc = node.docs().create().await?;
    println!("Created doc: {}", doc.id());

    for (i, key) in ['a', 'b', 'c'].into_iter().enumerate() {
        let key = key.to_string();
        let value = i.to_string();
        doc.set_bytes(author, key, value).await?;
    }

    // get all the entries with default filtering and sorting
    let query = Query::all().build();
    let entries = doc.get_many(query).await?.collect::<Vec<_>>().await;

    println!("Keys:");
    for entry in entries {
        let entry = entry?;
        let key = entry.key();
        let hash = entry.content_hash();
        let content = entry.content_bytes(node.client()).await?;
        println!(
            "{} : {} (hash: {})",
            std::str::from_utf8(key)?,
            std::str::from_utf8(&content)?,
            hash
        );
    }
    Ok(())
}

// Output:
// Started Iroh node: f5seybgjqa4yrnqbhcibxyckykzile76ygfnpqhslpjzlztssrlq
// Created doc: sqsx7kn3nfvjhziwhcjnoa47fpisbqtox4363nf4uxzhxwehxnba
// Keys:
// b'a' : 0 (hash: bafkr4icnazyvhldstjfh5arazf4tl752m5ehqygvqkmm52zdqzbwtbt5t4)
// b'b' : 1 (hash: bafkr4igwhpm2qjvpsha75i3rszngjyi64ihrhzdll5jmlgibcntalm5eq4)
// b'c' : 2 (hash: bafkr4iebh2nxfekb47zyll5aulin6ptmg6e6ij774sxo6vtkkzn4r4x6hu)
