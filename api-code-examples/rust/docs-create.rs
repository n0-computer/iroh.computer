#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create in memory iroh node
    let node = iroh::node::Node::memory().enable_docs().spawn().await?;

    let node_id = node.net().node_id().await?;
    println!("Started Iroh node: {node_id}");

    let author = node.authors().default().await?;
    println!("Default author: {author}");

    let doc = node.docs().create().await?;
    println!("Created doc: {}", doc.id());
    Ok(())
}
