#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create in memory iroh node
    let node = iroh::node::Node::memory().spawn().await?;

    let node_id = node.node().node_id().await?;
    println!("Started Iroh node: {node_id}");

    // you'll need to get a ticket from somewhere, see the `doc share` command documentation
    // for details. This ticket will fail to join, but is a valid ticket.
    const TICKET: &str = "docaaa7qg6afc6zupqzfxmu5uuueaoei5zlye7a4ahhrfhvzjfrfewozgybl5kkl6u6fqcnjxvdkoihq3nbsqczxeulfsqvatb2qh3bwheoyahacitior2ha4z2f4xxk43fgewtcltemvzhaltjojxwqltomv2ho33snmxc6biajjeteswek4ambkabzpcfoajganyabbz2zplaaaaaaaaaagrjyvlqcjqdoaaioowl2ygi2likyov62rofk4asma3qacdtvs6whqsdbizopsefrrkx";

    let doc = node.docs().import(TICKET.parse()?).await?;
    println!("Joined doc: {}", doc.id());
    Ok(())
}
