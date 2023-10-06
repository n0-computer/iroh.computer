import iroh

IROH_DATA_DIR = "./iroh-data"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

author = node.author_new()
print("Created author: {}".format(author.to_string()))

doc = node.doc_new()
print("Created doc: {}".format(doc.id()))

hash = doc.set_bytes(author, bytes("foo", "utf8"), bytes("bar", "utf8"))
print("Inserted: {}".format(hash.to_string()))

# FIXME: this doesn't work yet
# content = doc.get_content_bytes(hash)
# print("Got content: {}".format(content.decode("utf8")))