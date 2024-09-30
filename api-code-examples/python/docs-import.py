import os
import shutil
import asyncio

from iroh import Iroh, Query, path_to_key


async def main():
    # Create folder
    os.mkdir("tmp")

    try:
        root = os.path.abspath(os.path.join("tmp"))
        print("Created dir \"tmp\"")

        file_names = ["foo", "bar", "bat"]
        # Create three files in the folder
        for file_name in file_names:
            file_path = os.path.join("tmp", file_name)
            with open(file_path, "w") as f:
                f.write(f"{file_name}")
            print(f"Created file {file_path}")

        # Set options to enable docs
        options = iroh.NodeOptions()
        options.enable_docs = True

        # Create in memory iroh node
        node = await iroh.Iroh.memory_with_options(options)

        # Create author and document
        author = await node.authors().create()
        print(f"Created author {author}")

        doc = await node.docs().create()
        print(f"Created document {doc.id()}")

        prefix = "import-example"
        # Import the files
        for file_name in file_names:
            path = os.path.abspath(os.path.join("tmp", file_name))
            # create a key from the path, use the `iroh.PathToKey` function to ensure
            # that we strip the root correctly, and add any prefix we want to add for
            # organizational purposes
            key = path_to_key(path, prefix, root)
            await doc.import_file(author, key, path, False, None)

        # Get all the entries with default filtering and sorting
        query = Query.all(None)
        entries = await doc.get_many(query)

        print("One entry for each file:")
        for entry in entries:
            key = entry.key()
            hash = entry.content_hash()
            content = await entry.content_bytes(doc)
            print(f"{key.decode('utf-8')}: {content.decode('utf-8')} (hash: {hash})")

    except Exception as e:
        print("error: ", e)

    # cleanup dir
    shutil.rmtree("tmp")

# Output:
# Created dir "tmp"
# Created file tmp/foo
# Created file tmp/bar
# Created file tmp/bat
# Created author kpksn2yl2c3nlppjtnpxa2h2utmu2fdnutuwptybenr3gxdlrkiq
# Created document af7klzttoegn6kvr7p6j7tgw6tz2w54n5bfzqvpcfmy2mrkk3pgq
# One entry for each file:
# import-examplebar: bar (hash: bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu)
# import-examplebat: bat (hash: bafkr4iabccdb2eyeu764xoewbcqv62sjaggxibtmxx5tnmwer3wp3rquq4)
# import-examplefoo: foo (hash: bafkr4iae4c5tt4yldi76xcpvg3etxykqkvec352im5fqbutolj2xo5yc5e)

asyncio.run(main())
