import os
import shutil
import iroh
import asyncio

from iroh import SetTagOption, WrapOption, AddProgressType

class AddCallback:
    hash = None

    async def progress(self, event):
        if event.type() == AddProgressType.ALL_DONE:
            all_done = event.as_all_done()
            self.hash = all_done.hash

async def main():
    # setup event loop, to ensure async callbacks work
    iroh.iroh_ffi.uniffi_set_event_loop(asyncio.get_running_loop())

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


        # Create in memory iroh node
        node = await iroh.Iroh.memory()

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
        await node.blobs().add_from_path(path, in_place, tag, wrap, callback)

        hash = callback.hash

        print("Added collection", hash)

        print("collections list:")

        coll_res = await node.blobs().list_collections()
        for res in coll_res:
            print(f"\thash: {res.hash} tag: {res.tag}")

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


asyncio.run(main())
