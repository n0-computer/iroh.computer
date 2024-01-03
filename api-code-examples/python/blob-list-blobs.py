from iroh import IrohNode, SetTagOption
# Create an Iroh node
node = IrohNode("iroh_data_dir")

# Define content and tag
content = b"hello world!"
tag = SetTagOption.auto()

# Add blob
outcome = node.blobs_add_bytes(content, tag)
print(f"Added blob {outcome.hash.to_string()} ({outcome.size} bytes)")

print("blobs list:")

# List blobs
blobs = node.blobs_list()
for hash in blobs:
    print("\t", hash.to_string())

# Output:
# Added blob bafkr4ib2uyoebh6xof6j3hddsibk6l5oi4ga55tjxz52fsxkk544wu2otu (12 bytes)
# blobs list:
# 	 bafkr4ib2uyoebh6xof6j3hddsibk6l5oi4ga55tjxz52fsxkk544wu2otu
