import iroh
import asyncio


async def main():
    # Create in memory iroh node
    node = await iroh.IrohNode.memory()
    node_id = await node.node_id()
    print("Started Iroh node: {}".format(node_id))

    author = await node.author_default()
    print("Default author: {}".format(author))

    doc = await node.doc_create()
    print("Created doc: {}".format(doc.id()))

asyncio.run(main())
