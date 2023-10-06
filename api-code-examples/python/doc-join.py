import iroh

IROH_DATA_DIR = "./iroh-data"

# you'll need to get a ticket from somewhere, see the `doc share` command documentation
# for details. This ticket will fail to join, but is a valid ticket.
TICKET_STRING = "sdx7wazju2rysqydgfpmhqkrluc5lbcuainravjipwmbl7r3k3uqcigncyopdcnooufnteu5vuatpzhoqrml35ifgyuozr6kwhjiz4jxyaaqcbiajbmsainmsmbqcjqaibavg5hiaaaaaaaaaaabad47sebqbqfiiqzkzeydadakqrckvsjqgajgabaecu3u5aaaaaaaaaaaaeagt6iqg"

node = iroh.IrohNode(IROH_DATA_DIR)
print("Started Iroh node: {}".format(node.node_id()))

doc_ticket = iroh.DocTicket.from_string(TICKET_STRING)
doc = node.doc_join(doc_ticket)
print("Joined doc: {}".format(doc.id()))