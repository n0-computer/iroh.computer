import iroh

IROH_DATA_DIR = "./iroh_data_dir"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

author = node.author_create()
print("Created author: {}".format(author.to_string()))

authors = node.author_list()
print("Authors:")
for auth in authors:
    print("\t{}".format(auth.to_string()))

# Output:
# Started Iroh node: wbwpkauwmitrwwhmw534w3u6sxyhvbivuepcdze5jd3zeqpgxyfa
# Created author: z2h3f3tozgz67g3ewvu7yxj5vtoddwoohzi2jgyrtgfl7tzocpda
# Authors:
#   z2h3f3tozgz67g3ewvu7yxj5vtoddwoohzi2jgyrtgfl7tzocpd
