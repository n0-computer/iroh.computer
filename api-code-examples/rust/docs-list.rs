use anyhow::Result;
use futures_lite::stream::StreamExt;

#[tokio::main]
async fn main() -> Result<()> {
    let node = iroh::node::Node::memory().enable_docs().spawn().await?;

    // create a document
    let _doc_0 = node.docs().create().await?;
    let _doc_1 = node.docs().create().await?;

    println!("List all docs:");
    let mut doc_ids = node.docs().list().await?;
    while let Some(doc_id) = doc_ids.next().await {
        let (doc_id, kind) = doc_id?;
        println!("\t{doc_id}: {kind}");
    }

    Ok(())
}
