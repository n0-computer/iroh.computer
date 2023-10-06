import iroh

IROH_DATA_DIR = "./iroh-data"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

author = node.author_new()
print("Created author: {}".format(author.to_string()))

doc = node.doc_new()
print("Created doc: {}".format(doc.id()))

ticket = doc.share_write()
print("Write-Access Ticket: {}".format(ticket.to_string()))