import iroh
import asyncio


async def main():
    # Create in memory iroh node
    node = await iroh.IrohNode.memory()
    node_id = await node.node_id()
    print(f"Started Iroh node: {node_id}")

    author = await node.author_default()
    print(f"Default author: {author}")

    doc = await node.doc_create()
    print(f"Created doc: {doc.id()}")

asyncio.run(main())
