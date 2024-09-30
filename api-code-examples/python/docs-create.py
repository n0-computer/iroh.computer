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

    author = await node.authors().default()
    print(f"Default author: {author}")

    doc = await node.docs().create()
    print(f"Created doc: {doc.id()}")

asyncio.run(main())
