from iroh import IrohNode, Query

 # Create an Iroh node
node = IrohNode("iroh_data_dir")

# Real programs handle errors!
author = node.author_create()
print(f"Created author {author.to_string()}")

doc = node.doc_create()
print(f"Created document {doc.id().to_string()}")

key = b"python"
hash = doc.set_bytes(author, key, b"says hello")
print(f"Inserted {hash.to_string()}")

# Get all the entries with default filtering and sorting
query = Query.all(None)
entries = doc.get_many(query)

print("Keys:")
for entry in entries:
    key = entry.key()
    hash = entry.content_hash()
    content = doc.read_to_bytes(entry)
    print(f'{key.decode("utf-8")} : {content.decode("utf-8")} (hash: {hash.to_string()})')

print(f"Removing entry for author {author.to_string()} and prefix {key.decode('utf-8')}.")
# Removes all entries from that author and with the prefix "key"
num_removed = doc.delete(author, key)
print(f"Removed {num_removed} entry")

entries = doc.get_many(query)

print("Keys:")
for entry in entries:
    key = entry.key()
    hash = entry.content_hash()
    content = doc.read_to_bytes(entry)
    print(f'{key.decode("utf-8")} : {content.decode("utf-8")} (hash: {hash.to_string()})')

# Output:
# Created author ybkptbq4imifxaj544hl5etyszhecuepp66qlezov7sdzm3hqk4a
# Created document ipqqeughovjrvcxl5sji3hlwycheqqgiajq5hgnf6vtqp6qigm6q
# Inserted bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte
# Keys:
# python : says hello (hash: bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte)
# Removing entry for author ybkptbq4imifxaj544hl5etyszhecuepp66qlezov7sdzm3hqk4a and prefix python.
# Removed 1 entry
# Keys:
