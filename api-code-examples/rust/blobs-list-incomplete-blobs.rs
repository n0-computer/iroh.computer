use futures_lite::StreamExt;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    // Typically only happens if you have not finished syncing or interrupted
    // a download
    let mut incompletes = node.blobs().list_incomplete().await?;

    println!("Incomplete blobs:");
    while let Some(res) = incompletes.next().await {
        let res = res?;
        println!(
            "\thash: {} size: {} expected size: {}",
            res.hash, res.size, res.expected_size
        );
    }

    Ok(())
}
