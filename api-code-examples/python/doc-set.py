import iroh
import asyncio


async def main():
    # Create in memory iroh node
    node = await iroh.IrohNode.memory()

    # Get default author
    author = await node.author_default()
    print(f"Default author {author}")

    # Create a document
    doc = await node.doc_create()
    print(f"Created document {doc.id()}")

    # Set content in the document
    key = b"python"
    hash = await doc.set_bytes(author, key, b"says hello")
    print(f"Inserted {hash}")

    # Get an entry from the document
    entry = await doc.get_exact(author, key, False)

    # Read content from the entry
    content = await entry.content_bytes(doc)
    print(f"Got content \"{content.decode('utf-8')}\"")

# Output:
# Created author huarctxgpvq2ucnifubjxvmac7c26evzudnynp5xrugkkm37ma7q
# Created document zmwwfsnnoxgij4q5bknfij5tpwbm2askypip3al3bahinucx65oq
# Inserted bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte
# Got content "says hello"

asyncio.run(main())
