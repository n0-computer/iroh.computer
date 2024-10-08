import asyncio
import queue
import iroh
from iroh import Iroh, LiveEventType

class Watch:
    def __init__(self, queue):
        self.queue = queue

    async def event(self, e):
        t = e.type()
        if t == LiveEventType.INSERT_LOCAL:
            entry = e.as_insert_local()
            print(f"LiveEvent - InsertLocal: entry hash {entry.content_hash()}")
            self.queue.put(True)
        elif t == LiveEventType.INSERT_REMOTE:
            insert_remove_event = e.as_insert_remote()
            print(f"LiveEvent - InsertRemote:\n\tfrom: {insert_remove_event.from_}\n\tentry hash:\n\t{insert_remove_event.entry.content_hash()}\n\tcontent_status: {insert_remove_event.content_status}")
            print("Insert Remove events will be eventually followed by the ContentReady event")
        elif t == LiveEventType.CONTENT_READY:
            hash_val = e.as_content_ready()
            print(f"LiveEvent - ContentReady: hash {hash_val}")
        elif t == LiveEventType.NEIGHBOR_UP:
            node_id = e.as_neighbor_up()
            print(f"LiveEvent - NeighborUp: node id {node_id}")
        elif t == LiveEventType.NEIGHBOR_DOWN:
            node_id = e.as_neighbor_down()
            print(f"LiveEvent - NeighborDown: node id {node_id}")
        elif t == LiveEventType.SYNC_FINISHED:
            sync_event = e.as_sync_finished()
            print(f"Live Event - SyncFinished: synced peer: {sync_event.peer}")
        else:
            raise Exception("unknown LiveEventType")

async def main():
    # setup event loop, to ensure async callbacks work
    iroh.iroh_ffi.uniffi_set_event_loop(asyncio.get_running_loop())

    # Set options to enable docs
    options = iroh.NodeOptions()
    options.enable_docs = True

    # Create in memory iroh node
    node = await iroh.Iroh.memory_with_options(options)

    # Create  document
    author = await node.authors().default()

    doc = await node.docs().create()
    print(f"Created document {doc.id()}")

    # Create a queue for synchronization
    event_queue = queue.Queue()

    callback = Watch(event_queue)
    await doc.subscribe(callback)

    key = b"watch-me"
    await doc.set_bytes(author, key, b"I'm going to trigger an InsertLocal event.")

    # Wait for the watcher to get the insert local event
    event_queue.get()

    print("Done!")

# Output:
# Created document 3h6ea3d6ucs3iicwn2hzovpwhh3lpchs7b6nt5byoci3aqt6amfa
# LiveEvent - InsertLocal: entry hash bafkr4ic24i3eenzjflowjva7e2tyw24yafro5kvve6p6ziwics5kc2id5e
# Done!

asyncio.run(main())
