#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let node = iroh::node::Node::memory().spawn().await?;

    let data = "hello world".as_bytes();
    let res = node.blobs.add_bytes(data).await?;

    println!(
        "created blob! hash: {:?} size: {} bytes",
        res.hash, res.size
    );

    let blob = node.blobs.read_to_bytes(res.hash).await?;
    assert_eq!(blob, data);

    Ok(())
}
