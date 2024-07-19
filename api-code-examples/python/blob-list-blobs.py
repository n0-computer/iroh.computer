import iroh
import asyncio


async def main():
    # Create in memory iroh node
    node = await iroh.IrohNode.memory()

    # Define content and tag
    content = b"hello world!"

    # Add blob
    outcome = await node.blobs_add_bytes(content)
    print(f"Added blob {outcome.hash} ({outcome.size} bytes)")

    print("blobs list:")

    # List blobs
    blobs = await node.blobs_list()
    for hash in blobs:
        print("\t", hash)

# Output:
# Added blob bafkr4ib2uyoebh6xof6j3hddsibk6l5oi4ga55tjxz52fsxkk544wu2otu (12 bytes)
# blobs list:
# 	 bafkr4ib2uyoebh6xof6j3hddsibk6l5oi4ga55tjxz52fsxkk544wu2otu

asyncio.run(main())
