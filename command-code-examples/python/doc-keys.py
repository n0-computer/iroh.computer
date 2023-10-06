import iroh

IROH_DATA_DIR = "./iroh-data"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

author = node.author_new()
print("Created author: {}".format(author.to_string()))

doc = node.doc_new()
print("Created doc: {}".format(doc.id()))

for i, key in enumerate(['a', 'b', 'c']):
    doc.set_bytes(author, bytes(key, "utf8"), bytes(str(i), "utf8"))

keys = doc.keys()
print("Keys:")
for key in keys:
    content = doc.get_content_bytes(key)
    print("{} : {} (hash: {})".format(key.key(), content.decode("utf8"), key.hash().to_string()))