import iroh
import asyncio


async def main():
    node = await iroh.IrohNode.memory()

    # Real programs handle errors!
    author = await node.author_create()
    print(f"Created author {author}")

    doc = await node.doc_create()
    print(f"Created document {doc.id()}")

    key = b"python"
    hash = await doc.set_bytes(author, key, b"says hello")
    print(f"Inserted {hash}")

    # Get all the entries with default filtering and sorting
    query = iroh.Query.all(None)
    entries = await doc.get_many(query)

    print("Keys:")
    for entry in entries:
        key = entry.key()
        hash = entry.content_hash()
        content = await entry.content_bytes(doc)
        print(f'{key.decode("utf-8")} : {content.decode("utf-8")} (hash: {hash})')

        print(f"Removing entry for author {author} and prefix {key.decode('utf-8')}.")

    # Removes all entries from that author and with the prefix "key"
    # TODO: Currently Broken
    # num_removed = doc.del(author, key)
    # print(f"Removed {num_removed} entry")

    entries = await doc.get_many(query)

    print("Keys:")
    for entry in entries:
        key = entry.key()
        hash = entry.content_hash()
        content = await entry.content_bytes(doc)
        print(f'{key.decode("utf-8")} : {content.decode("utf-8")} (hash: {hash})')

# Output:
# Created author ybkptbq4imifxaj544hl5etyszhecuepp66qlezov7sdzm3hqk4a
# Created document ipqqeughovjrvcxl5sji3hlwycheqqgiajq5hgnf6vtqp6qigm6q
# Inserted bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte
# Keys:
# python : says hello (hash: bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte)
# Removing entry for author ybkptbq4imifxaj544hl5etyszhecuepp66qlezov7sdzm3hqk4a and prefix python.
# Removed 1 entry
# Keys:

asyncio.run(main())
