use iroh::{base::node_addr::AddrInfoOptions, client::docs::ShareMode};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create in memory iroh node
    let node = iroh::node::Node::memory().enable_docs().spawn().await?;

    let node_id = node.net().node_id().await?;
    println!("Started Iroh node: {node_id}");

    let doc = node.docs().create().await?;
    println!("Created doc: {}", doc.id());

    let ticket = doc.share(ShareMode::Read, AddrInfoOptions::Id).await?;
    println!("Read-Access Ticket: {ticket}");

    let ticket = doc.share(ShareMode::Write, AddrInfoOptions::Id).await?;
    println!("Write-Access Ticket: {ticket}");

    Ok(())
}
// Output:
// Started Iroh node: rwgutd2wazt756h5awh6x576jejizai6w2l6ae5gxsv7tpswmopq
// Created doc: ijgvnoxfgkkgze3cyb7rwjywfqvfzy2pzilo2tn5wf64fgm7nxkq
// Read-Access Ticket: docafbe2vv24uzji3etmlah6gzhcywcuxhdj7fbn3knxwyx3quzt5w5kajarwgutd2wazt756h5awh6x576jejizai6w2l6ae5gxsv7tpswmopqcaifabfesmskyrlqbqfiahf4ivybeybxaaehhlf5maaaaaaaaaa2fhcvoajganyabbz2zplazdjnblb2x3kfyvlqcjqdoaaioowl2zctm6q34dlgzp6fk4
// Write-Access Ticket: docaaqo2dtt7udula5vvevfwjenux3tk3l3lfpefugeu6r6v55pwusvc5qbecgy2smpkydgp7xy7ucy727x7zerfdebd23jpyatu26kx6n6kzrz6aibauaeusjsjlcfoagavaa4xrcxaetag4aaq45mxvqaaaaaaaaadiu4kvybeybxaaehhlf5mdenfufmhk7nixcvoajganyabbz2zpleknt2dpqnm3f7yvlq
