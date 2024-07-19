import iroh
import asyncio


async def main():
    # Create in memory iroh node
    node = await iroh.IrohNode.memory()
    node_id = await node.node_id()
    print("Started Iroh node: {}".format(node_id))

    # you'll need to get a ticket from somewhere, see the `doc share` command documentation
    # for details. This ticket will fail to join, but is a valid ticket.
    TICKET = "docaaa7qg6afc6zupqzfxmu5uuueaoei5zlye7a4ahhrfhvzjfrfewozgybl5kkl6u6fqcnjxvdkoihq3nbsqczxeulfsqvatb2qh3bwheoyahacitior2ha4z2f4xxk43fgewtcltemvzhaltjojxwqltomv2ho33snmxc6biajjeteswek4ambkabzpcfoajganyabbz2zplaaaaaaaaaagrjyvlqcjqdoaaioowl2ygi2likyov62rofk4asma3qacdtvs6whqsdbizopsefrrkx"

    doc = await node.doc_join(TICKET)
    print("Joined doc: {}".format(doc.id()))

asyncio.run(main())
