import iroh

IROH_DATA_DIR = "./iroh-data"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

author = node.author_new()
print("Created author: {}".format(author.to_string()))

authors = node.author_list()
for auth in authors:
    print("Author: {}".format(auth.to_string()))
