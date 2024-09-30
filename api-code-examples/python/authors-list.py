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

    authors = await node.authors().list()
    print("Authors:")
    for auth in authors:
        print(f"\t{auth}")

# Output:
# Started Iroh node: wbwpkauwmitrwwhmw534w3u6sxyhvbivuepcdze5jd3zeqpgxyfa
# Created author: z2h3f3tozgz67g3ewvu7yxj5vtoddwoohzi2jgyrtgfl7tzocpda
# Authors:
#	fllmuelqe7lrzmlwmmydtperpafnyd6vkzukqh2l7xqg6cvjstia
#	x2ckktvt4ftjcmrb4xxmlajs7vcidkdsmxcsbd5vejezpcu6653a

asyncio.run(main())
