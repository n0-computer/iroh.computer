import iroh
import asyncio

async def main():
    # Create in memory iroh node
    node = await iroh.Iroh.memory()
    node_id = await node.node().node_id()
    print(f"Started Iroh node: {node_id}")

    doc = await node.docs().create()
    print(f"Created doc: {doc.id()}")

    ticket = await doc.share(iroh.ShareMode.READ, iroh.AddrInfoOptions.ID)
    print(f"Read-Access Ticket: {ticket}")

    ticket = await doc.share(iroh.ShareMode.WRITE, iroh.AddrInfoOptions.ID)
    print(f"Write-Access Ticket: {ticket}")

# Output:
# Started Iroh node: rwgutd2wazt756h5awh6x576jejizai6w2l6ae5gxsv7tpswmopq
# Created doc: ijgvnoxfgkkgze3cyb7rwjywfqvfzy2pzilo2tn5wf64fgm7nxkq
# Read-Access Ticket: docafbe2vv24uzji3etmlah6gzhcywcuxhdj7fbn3knxwyx3quzt5w5kajarwgutd2wazt756h5awh6x576jejizai6w2l6ae5gxsv7tpswmopqcaifabfesmskyrlqbqfiahf4ivybeybxaaehhlf5maaaaaaaaaa2fhcvoajganyabbz2zplazdjnblb2x3kfyvlqcjqdoaaioowl2zctm6q34dlgzp6fk4
# Write-Access Ticket: docaaqo2dtt7udula5vvevfwjenux3tk3l3lfpefugeu6r6v55pwusvc5qbecgy2smpkydgp7xy7ucy727x7zerfdebd23jpyatu26kx6n6kzrz6aibauaeusjsjlcfoagavaa4xrcxaetag4aaq45mxvqaaaaaaaaadiu4kvybeybxaaehhlf5mdenfufmhk7nixcvoajganyabbz2zpleknt2dpqnm3f7yvlq

asyncio.run(main())
