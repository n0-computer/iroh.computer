import os
import shutil
import asyncio
from iroh import Iroh, key_to_path, path_to_key


async def main():
    # Create folder
    os.mkdir("tmp")

    # Create an export directory
    os.mkdir("export")

    try:
        root = os.path.abspath(os.path.join("tmp"))
        print(f"Created dir {root}")

        # Create file
        path = os.path.join("tmp", "hello_world")
        with open(path, "w") as f:
            f.write("Hello World!")
        print("Created file \"hello_world\"")

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

        # Import the file
        path = os.path.abspath(os.path.join("tmp", "hello_world"))
        key = path_to_key(path, prefix, root)
        print(f"key: {key.decode('utf-8')}")
        await doc.import_file(author, key, path, False, None)

        # Export the file
        # Get the entry via an exact author and key
        entry = await doc.get_exact(author, key, False)

        root = os.path.abspath(os.path.join("export"))
        print(f"root: {root}")

        # Create the export path from the key, prefix, and directory location
        export_path = key_to_path(key, prefix, root)

        # Export the entry
        await doc.export_file(entry, export_path, None)

        # Open the exported file and print the contents
        with open(export_path, "r") as f:
            content = f.read()
            print(f"file {export_path}: {content}")

    except Exception as e:
        print("error: ", e)

    # cleanup dir
    shutil.rmtree("tmp")
    # cleanup export dir
    shutil.rmtree("export")

# Output:
# Created dir $HOME/tmp
# Created file "hello_world"
# Created author 2bgy4eozp5mcrhzqm6fylwpqsm2mddqogg4yphunegll2gxtmh4q
# Created document mu65dqhxcchrfkfm6meyllitrpayljdra4qrqy54s4sgfwlgr2tq
# key: import-examplehello_world
# root: $HOME/export
# file $HOME/export/hello_world: Hello World!

asyncio.run(main())
