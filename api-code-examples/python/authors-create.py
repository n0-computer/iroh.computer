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

    author = await node.authors().create()
    print(f"Created author: {author}")

asyncio.run(main())
