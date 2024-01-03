from iroh import IrohNode
import os

# Create a new Iroh node
node = IrohNode("iroh_data_dir")

# Create an author
author = node.author_create()
print(f"Created author {author.to_string()}")

# Create a document
doc = node.doc_create()
print(f"Created document {doc.id().to_string()}")

# Set content in the document
key = b"python"
hash = doc.set_bytes(author, key, b"says hello")
print(f"Inserted {hash.to_string()}")

# Get an entry from the document
entry = doc.get_exact(author, key, False)

# Read content from the entry
content = entry.content_bytes(doc)
print(f"Got content \"{content.decode('utf-8')}\"")

# Output:
# Created author huarctxgpvq2ucnifubjxvmac7c26evzudnynp5xrugkkm37ma7q
# Created document zmwwfsnnoxgij4q5bknfij5tpwbm2askypip3al3bahinucx65oq
# Inserted bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte
# Got content "says hello"
