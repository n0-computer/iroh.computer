import iroh
import asyncio


async def main():
    node = await iroh.IrohNode.memory()
    node_id = await node.node_id()
    print("Started Iroh node: {}".format(node_id))

    author = await node.author_create()
    print("Created author: {}".format(author))

    authors = await node.author_list()
    print("Authors:")
    for auth in authors:
        print("\t{}".format(auth))

# Output:
# Started Iroh node: wbwpkauwmitrwwhmw534w3u6sxyhvbivuepcdze5jd3zeqpgxyfa
# Created author: z2h3f3tozgz67g3ewvu7yxj5vtoddwoohzi2jgyrtgfl7tzocpda
# Authors:
#	fllmuelqe7lrzmlwmmydtperpafnyd6vkzukqh2l7xqg6cvjstia
#	x2ckktvt4ftjcmrb4xxmlajs7vcidkdsmxcsbd5vejezpcu6653a

asyncio.run(main())
