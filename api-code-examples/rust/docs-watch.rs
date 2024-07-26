use futures_lite::StreamExt;
use iroh::client::docs::LiveEvent;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    // Create  document
    let author = node.authors().default().await?;

    let doc = node.docs().create().await?;
    println!("Created document {}", doc.id());

    let mut sub = doc.subscribe().await?;
    let handle = tokio::task::spawn(async move {
        let mut insert = None;
        while let Some(event) = sub.next().await {
            let event = event?;
            match event {
                LiveEvent::InsertLocal { entry } => {
                    println!(
                        "LiveEvent - InsertLocal: entry hash {}",
                        entry.content_hash()
                    );
                    insert = Some(entry.content_hash());
                    break;
                }
                LiveEvent::InsertRemote {
                    from,
                    entry,
                    content_status,
                } => {
                    println!("LiveEvent - InsertRemote:\n\tfrom: {}\n\tentry hash:\n\t{}\n\tcontent_status: {:?}", from, entry.content_hash(), content_status);
                    println!("Insert Remove events will be eventually followed by the ContentReady event");
                }
                LiveEvent::ContentReady { hash } => {
                    println!("LiveEvent - ContentReady: hash {hash}");
                }
                LiveEvent::NeighborUp(node_id) => {
                    println!("LiveEvent - NeighborUp: node id {node_id}");
                }
                LiveEvent::NeighborDown(node_id) => {
                    println!("LiveEvent - NeighborDown: node id {node_id}");
                }
                LiveEvent::PendingContentReady => {
                    println!("LiveEvent - PendingContent Ready");
                }
                LiveEvent::SyncFinished(sync_event) => {
                    println!(
                        "Live Event - SyncFinished: synced peer: {}",
                        sync_event.peer
                    );
                    break;
                }
            }
        }
        anyhow::Ok(insert)
    });

    let key = b"watch-me";
    let h = doc
        .set_bytes(
            author,
            &key[..],
            &b"I'm going to trigger an InsertLocal event."[..],
        )
        .await?;

    let hash = handle.await??;
    assert_eq!(hash, Some(h));

    println!("Done!");
    Ok(())
}

// Output:
// Created document 3h6ea3d6ucs3iicwn2hzovpwhh3lpchs7b6nt5byoci3aqt6amfa
// LiveEvent - InsertLocal: entry hash bafkr4ic24i3eenzjflowjva7e2tyw24yafro5kvve6p6ziwics5kc2id5e
// Done!
