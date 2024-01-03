import iroh

IROH_DATA_DIR = "./iroh_data_dir"

# you'll need to get a ticket from somewhere, see the `doc share` command documentation
# for details. This ticket will fail to join, but is a valid ticket.
TICKET_STRING = "docaaa7qg6afc6zupqzfxmu5uuueaoei5zlye7a4ahhrfhvzjfrfewozgybl5kkl6u6fqcnjxvdkoihq3nbsqczxeulfsqvatb2qh3bwheoyahacitior2ha4z2f4xxk43fgewtcltemvzhaltjojxwqltomv2ho33snmxc6biajjeteswek4ambkabzpcfoajganyabbz2zplaaaaaaaaaagrjyvlqcjqdoaaioowl2ygi2likyov62rofk4asma3qacdtvs6whqsdbizopsefrrkx"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

doc_ticket = iroh.DocTicket.from_string(TICKET_STRING)
doc = node.doc_join(doc_ticket)
print("Joined doc: {}".format(doc.id().to_string()))
