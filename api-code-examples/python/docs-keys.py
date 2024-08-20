import iroh
import asyncio


async def main():
    # Create in memory iroh node
    node = await iroh.Iroh.memory()

    node_id = await node.net().node_id()
    print(f"Started Iroh node: {node_id}")

    author = await node.authors().default()

    doc = await node.docs().create()
    print(f"Created doc: {doc.id()}")

    for i, key in enumerate(['a', 'b', 'c']):
        await doc.set_bytes(author, bytes(key, "utf8"), bytes(str(i), "utf8"))

    # get all the entries with default filtering and sorting
    query = iroh.Query.all(None)
    entries = await doc.get_many(query)
    print("Keys:")
    for entry in entries:
        key = entry.key()
        hash = entry.content_hash()
        content = await entry.content_bytes(doc)
        print("{} : {} (hash: {})".format(key, content.decode("utf8"), hash))

# Output:
# Started Iroh node: f5seybgjqa4yrnqbhcibxyckykzile76ygfnpqhslpjzlztssrlq
# Created doc: sqsx7kn3nfvjhziwhcjnoa47fpisbqtox4363nf4uxzhxwehxnba
# Keys:
# b'a' : 0 (hash: bafkr4icnazyvhldstjfh5arazf4tl752m5ehqygvqkmm52zdqzbwtbt5t4)
# b'b' : 1 (hash: bafkr4igwhpm2qjvpsha75i3rszngjyi64ihrhzdll5jmlgibcntalm5eq4)
# b'c' : 2 (hash: bafkr4iebh2nxfekb47zyll5aulin6ptmg6e6ij774sxo6vtkkzn4r4x6hu)


asyncio.run(main())
