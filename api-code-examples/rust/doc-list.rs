#![cfg(feature = "mem-db")]

use anyhow::{anyhow, Result};
use futures::StreamExt;

use iroh::{bytes::util::runtime, collection::IrohCollectionParser, node::Node};
use iroh_sync::store::GetFilter;

#[tokio::main]
async fn main() -> Result<()> {
    // build the node
    let rt = runtime::Handle::from_currrent(1).unwrap();
    let db = iroh::baomap::mem::Store::new(rt.clone());
    let store = iroh_sync::store::memory::Store::default();
    let node = Node::builder(db, store)
        .collection_parser(IrohCollectionParser)
        .runtime(&rt)
        .bind_addr("127.0.0.1:0".parse()?);

    // start the node & create a client
    let node = node.spawn().await?;
    let client = node.client();

    // create a document & author
    let author = client.create_author().await?;
    let doc = client.create_doc().await?;

    // set the key "key" to "value"
    let key = b"key";
    let value = b"value";
    doc.set_bytes(author, key.to_vec(), value.to_vec()).await?;
    println!("key is set!");

    // read the value back
    let filter = GetFilter::latest().with_key(key);
    let entry = doc
        .get(filter)
        .await?
        .next()
        .await
        .ok_or_else(|| anyhow!("entry not found"))??;
    let content = doc.get_content_bytes(&entry).await?;

    println!("value bytes: {:?}", content);

    Ok(())
}
