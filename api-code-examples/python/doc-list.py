import iroh

IROH_DATA_DIR = "./iroh_data_dir"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

# create a document
doc = node.doc_create()
print("Created doc: {}".format(doc.id()))

# create a second document
doc = node.doc_create()
print("Created doc: {}".format(doc.id()))

# list all your documents
docs = node.doc_list();
print("List all {} docs:".format(len(docs)))
# doc ids are also called "namespace ids"
for namespace_and_capability in docs:
    print("\t{}".format(namespace_and_capability.namespace))

# Output:
# Started Iroh node: jplmb4cgk2pxw3dwjehk7oes7ddphftlh3vdiib4e5bwhq2nnokq
# Created doc: mr42ra4f6n63kkd6kmqghgonsanqqtpv5cvkgcu7bpg2zaauimrq
# Created doc: n4w6eip5cgxlv33dl3nln544km76t4gt2etpml6kc6qpo6sqmdua
# List all 2 docs:
# 	mr42ra4f6n63kkd6kmqghgonsanqqtpv5cvkgcu7bpg2zaauimrq
# 	n4w6eip5cgxlv33dl3nln544km76t4gt2etpml6kc6qpo6sqmdua

