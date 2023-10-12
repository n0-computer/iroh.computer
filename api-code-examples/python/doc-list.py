import iroh

IROH_DATA_DIR = "./iroh-data"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

# create a document
doc = node.doc_new()
print("Created doc: {}".format(doc.id()))

# create a second document
doc = node.doc_new()
print("Created doc: {}".format(doc.id()))

# list all your documents
docs = node.doc_list();
print("List all {} docs:".format(len(docs)))
for doc in docs:
    print("\t{}".format(doc.to_string()))
