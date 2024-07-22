import iroh
import asyncio


async def main():
    # Create in memory iroh node
    node = await iroh.Iroh.memory()

    # Create document
    doc = await node.docs().create()
    print(f"Created document {doc.id()}")

    print("List of docs and their capabilities (0-Read, 1-Write):")

    # Returns an array of `iroh.NamespaceAndCapability`s
    # NamespaceId is the Doc's Id
    # and the Capability is whether you have read or write access to the doc
    ns = await node.docs().list()
    for entry in ns:
        print(f"\t{entry.namespace}\t{entry.capability}")

    # Drop document
    await node.docs().drop_doc(doc.id())
    print(f"Dropped document {doc.id()}")

    print("List of docs and their capabilities (0-Read, 1-Write):")
    ns = await node.docs().list()
    # List no longer contains the dropped doc
    for entry in ns:
        print(f"\t{entry.namespace}\t{entry.capability}")

# Output:
# Created document zdv4ciupnlhxzvydn3f227k7tkq3pdljie7de6gtsesghmuu6tyq
# List of docs and their capabilities:
# 	zdv4ciupnlhxzvydn3f227k7tkq3pdljie7de6gtsesghmuu6tyq	CapabilityKind.WRITE
# Dropped document zdv4ciupnlhxzvydn3f227k7tkq3pdljie7de6gtsesghmuu6tyq
# List of docs and their capabilities:

asyncio.run(main())
