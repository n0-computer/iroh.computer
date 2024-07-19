import iroh
import asyncio


async def main():
    node = await iroh.IrohNode.memory()
    node_id = await node.node_id()
    print("Started Iroh node: {}".format(node_id))

    author = await node.author_create()
    print("Created author: {}".format(author))

asyncio.run(main())
