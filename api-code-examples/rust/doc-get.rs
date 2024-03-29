#![cfg(feature = "mem-db")]

use anyhow::{anyhow, Result};
use futures::StreamExt;

use iroh::{bytes::util::runtime, collection::IrohCollectionParser, node::Node};

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

    // create a document
    let doc_0 = client.create_doc().await?;
    let doc_1 = client.create_doc().await?;

    println!("List all docs:");
    let doc_ids = client.doc_list().await?;
    for doc_id in doc_ids.into_iter() {
        println!("\t{doc_id}");
    }

    Ok(())
}
