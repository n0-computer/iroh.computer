import iroh
import asyncio


async def main():
    # Set options to enable docs
    options = iroh.NodeOptions()
    options.enable_docs = True

    # Create in memory iroh node
    node = await iroh.Iroh.memory_with_options(options)

    # Get default author
    author = await node.authors().default()

    # Create a document
    doc = await node.docs().create()
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
