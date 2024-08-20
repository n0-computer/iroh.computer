import iroh
import asyncio


async def main():
    node = await iroh.Iroh.memory()
    node_id = await node.net().node_id()
    print(f"Started Iroh node: {node_id}")

    author = await node.authors().create()
    print(f"Created author: {author}")

asyncio.run(main())
