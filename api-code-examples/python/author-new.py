import iroh

IROH_DATA_DIR = "./iroh_data_dir"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

author = node.author_create()
print("Created author: {}".format(author.to_string()))
