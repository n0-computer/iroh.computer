import iroh
import asyncio


async def main():
    node = await iroh.IrohNode.memory()
    node_id = await node.node_id()
    print(f"Started Iroh node: {node_id}")

    author = await node.author_create()
    print(f"Created author: {author}")

asyncio.run(main())
