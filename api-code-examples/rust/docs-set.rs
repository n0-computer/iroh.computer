use anyhow::{anyhow, Result};

use iroh::docs::store::Query;

#[tokio::main]
async fn main() -> Result<()> {
    let node = iroh::node::Node::memory().enable_docs().spawn().await?;

    // create a document
    let author = node.authors().default().await?;
    let doc = node.docs().create().await?;

    // set the key "key" to "value"
    let key = b"key";
    let value = b"value";
    doc.set_bytes(author, key.to_vec(), value.to_vec()).await?;
    println!("key is set!");

    // read the value back
    let query = Query::key_exact(key);
    let entry = doc
        .get_one(query)
        .await?
        .ok_or_else(|| anyhow!("entry not found"))?;
    let content = entry.content_bytes(node.client()).await?;

    println!("value bytes: {:?}", content);

    Ok(())
}
