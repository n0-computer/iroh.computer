import iroh
import asyncio

async def main():
    # Create in memory iroh node
    node = await iroh.IrohNode.memory()

    # Typically only happens if you have not finished syncing or interrupted
    # a download
    incompletes = await node.blobs_list_incomplete()

    print("Incomplete blobs:")
    for res in incompletes:
        print(f"\thash: {res.hash} size: {res.size} expected size: {res.expected_size}")

# Output:
# Incomplete blobs:

asyncio.run(main())
