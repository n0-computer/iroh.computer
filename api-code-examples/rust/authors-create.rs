#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let node = iroh::node::Node::memory().spawn().await?;
    let node_id = node.net().node_id().await?;
    println!("Started Iroh node: {node_id}");

    let author = node.authors().create().await?;
    println!("Created author: {author}");

    Ok(())
}
