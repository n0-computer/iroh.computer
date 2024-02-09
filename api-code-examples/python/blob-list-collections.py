import os
import shutil

from iroh import IrohNode, Tag, SetTagOption, WrapOption, AddProgressType

class AddCallback:
    hash = None

    def progress(self, event):
        if event.type() == AddProgressType.ALL_DONE:
            all_done = event.as_all_done()
            self.hash = all_done.hash

# Create folder
os.mkdir("tmp")
try:
    path = os.path.abspath(os.path.join("tmp"))
    print("Created dir \"tmp\"")

    file_names = ["foo", "bar", "bat"]
    # Create three files in the folder
    for file_name in file_names:
        file_path = os.path.join("tmp", file_name)
        with open(file_path, "w") as f:
            f.write(f"{file_name}")
        print(f"Created file {file_path}")

    # Create an Iroh node
    node = IrohNode("iroh_data_dir")

    # Options
    in_place = False
    tag = SetTagOption.named(b'my_collection')
    wrap = WrapOption.no_wrap()

    # Callback setup
    callback = AddCallback()

    # Import the directory, creating one blob for each file, and one metadata
    # blob that stores the file names for each blob
    # also creates a 'collection' from the directory, grouping together the
    # blobs
    node.blobs_add_from_path(path, in_place, tag, wrap, callback)

    hash = callback.hash

    print("Added collection", hash.to_string())

    print("collections list:")

    coll_res = node.blobs_list_collections()
    for res in coll_res:
        print(f"\thash: {res.hash.to_string()} tag: {res.tag}")

except Exception as e:
    print("error: ", e)

# cleanup dir
shutil.rmtree("tmp")

# Output:
# Created dir "tmp"
# Created file tmp/foo
# Created file tmp/bar
# Created file tmp/bat
# Added collection bafkr4iaotzhxuiak7eusnngngnwsqdu4crf4lmdxzkbhuebunevecjzkim
# collections list:
# 	hash: bafkr4iaotzhxuiak7eusnngngnwsqdu4crf4lmdxzkbhuebunevecjzkim tag: "my_collection"

