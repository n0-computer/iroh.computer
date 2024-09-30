import iroh
import asyncio

async def main():
    # Set options to enable docs
    options = iroh.NodeOptions()
    options.enable_docs = True

    # Create in memory iroh node
    node = await iroh.Iroh.memory_with_options(options)
    node_id = await node.net().node_id()
    print(f"Started Iroh node: {node_id}")

    # create a document
    doc = await node.docs().create()
    print(f"Created doc: {doc.id()}")

    # create a second document
    doc = await node.docs().create()
    print(f"Created doc: {doc.id()}")

    # list all your documents
    docs = await node.docs().list()
    print(f"List all {len(docs)} docs:")
    # doc ids are also called "namespace ids"
    for namespace_and_capability in docs:
        print(f"\t{namespace_and_capability.namespace}")

# Output:
# Started Iroh node: jplmb4cgk2pxw3dwjehk7oes7ddphftlh3vdiib4e5bwhq2nnokq
# Created doc: mr42ra4f6n63kkd6kmqghgonsanqqtpv5cvkgcu7bpg2zaauimrq
# Created doc: n4w6eip5cgxlv33dl3nln544km76t4gt2etpml6kc6qpo6sqmdua
# List all 2 docs:
# 	mr42ra4f6n63kkd6kmqghgonsanqqtpv5cvkgcu7bpg2zaauimrq
# 	n4w6eip5cgxlv33dl3nln544km76t4gt2etpml6kc6qpo6sqmdua

asyncio.run(main())
