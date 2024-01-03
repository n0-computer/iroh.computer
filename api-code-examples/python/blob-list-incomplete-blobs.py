from iroh import IrohNode

# Create an Iroh node
node = IrohNode("iroh_data_dir")

# Typically only happens if you have not finished syncing or interrupted
# a download
incompletes = node.blobs_list_incomplete()

print("Incomplete blobs:")
for res in incompletes:
    print(f"\thash: {res.hash.to_string()} size: {res.size} expected size: {res.expected_size}")

# Output:
# Incomplete blobs:
