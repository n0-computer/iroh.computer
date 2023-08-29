import iroh

node = iroh.node()
author = node.create_author()
doc = node.create_doc()

doc.set_bytes(author, bytes("foo", "utf8"), bytes("bar", "utf8"))

doc.get_bytes(bytes("foo", "utf8"))