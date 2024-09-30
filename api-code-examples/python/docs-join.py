import iroh
import asyncio


async def main():
    # Set options to enable docs
    options = iroh.NodeOptions()
    options.enable_docs = True

    # Create in memory iroh node
    node = await iroh.Iroh.memory_with_options(options)
    node_id = await node.net().node_id()
    print(f"Started Iroh node: {node_id}")

    # you'll need to get a ticket from somewhere, see the `doc share` command documentation
    # for details. This ticket will fail to join, but is a valid ticket.
    TICKET = iroh.DocTicket("docaaa7qg6afc6zupqzfxmu5uuueaoei5zlye7a4ahhrfhvzjfrfewozgybl5kkl6u6fqcnjxvdkoihq3nbsqczxeulfsqvatb2qh3bwheoyahacitior2ha4z2f4xxk43fgewtcltemvzhaltjojxwqltomv2ho33snmxc6biajjeteswek4ambkabzpcfoajganyabbz2zplaaaaaaaaaagrjyvlqcjqdoaaioowl2ygi2likyov62rofk4asma3qacdtvs6whqsdbizopsefrrkx")

    doc = await node.docs().join(TICKET)
    print(f"Joined doc: {doc.id()}")

asyncio.run(main())
