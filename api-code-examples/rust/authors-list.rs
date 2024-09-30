use futures_lite::StreamExt;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let node = iroh::node::Node::memory().enable_docs().spawn().await?;
    let node_id = node.net().node_id().await?;
    println!("Started Iroh node: {node_id}");

    let author = node.authors().create().await?;
    println!("Created author: {author}");

    let mut authors = node.authors().list().await?;
    println!("Authors:");
    while let Some(author) = authors.next().await {
        let author = author?;
        println!("\t{author}");
    }

    Ok(())
}
