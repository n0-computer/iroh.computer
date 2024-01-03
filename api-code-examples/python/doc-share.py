import iroh

IROH_DATA_DIR = "./iroh_data_dir"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

author = node.author_create()
print("Created author: {}".format(author.to_string()))

doc = node.doc_create()
print("Created doc: {}".format(doc.id().to_string()))

ticket = doc.share(iroh.ShareMode.READ)
print("Read-Access Ticket: {}".format(ticket.to_string()))

ticket = doc.share(iroh.ShareMode.WRITE)
print("Write-Access Ticket: {}".format(ticket.to_string()))

# Output:
# Started Iroh node: rwgutd2wazt756h5awh6x576jejizai6w2l6ae5gxsv7tpswmopq
# Created author: ivn4qsyq3utro5px6k5k5hnbpp6eqh6l5u667hpkgbsglpadfowq
# Created doc: ijgvnoxfgkkgze3cyb7rwjywfqvfzy2pzilo2tn5wf64fgm7nxkq
# Read-Access Ticket: docafbe2vv24uzji3etmlah6gzhcywcuxhdj7fbn3knxwyx3quzt5w5kajarwgutd2wazt756h5awh6x576jejizai6w2l6ae5gxsv7tpswmopqcaifabfesmskyrlqbqfiahf4ivybeybxaaehhlf5maaaaaaaaaa2fhcvoajganyabbz2zplazdjnblb2x3kfyvlqcjqdoaaioowl2zctm6q34dlgzp6fk4
# Write-Access Ticket: docaaqo2dtt7udula5vvevfwjenux3tk3l3lfpefugeu6r6v55pwusvc5qbecgy2smpkydgp7xy7ucy727x7zerfdebd23jpyatu26kx6n6kzrz6aibauaeusjsjlcfoagavaa4xrcxaetag4aaq45mxvqaaaaaaaaadiu4kvybeybxaaehhlf5mdenfufmhk7nixcvoajganyabbz2zpleknt2dpqnm3f7yvlq
