use futures_lite::StreamExt;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let node = iroh::node::Node::memory().spawn().await?;

    // Define content and tag
    let content = "hello world!";

    // Add blob
    let outcome = node.blobs().add_bytes(content).await?;
    println!("Added blob {} ({} bytes)", outcome.hash, outcome.size);

    println!("blobs list:");

    // List blobs
    let mut blobs = node.blobs().list().await?;
    while let Some(info) = blobs.next().await {
        let info = info?;
        println!("\t{}", info.hash);
    }

    Ok(())
}
