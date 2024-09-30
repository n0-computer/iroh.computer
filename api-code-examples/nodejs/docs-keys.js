import { Iroh, Query } from '@number0/iroh'

// Create a node, author & document
const node = await Iroh.memory({ enableDocs: true })
const author = await node.authors.default();
const doc = await node.docs.create()

// Set 10 keys
for (let i = 0; i < 10; i++) {
  const key = Array.from(Buffer.from(`key/${i}`))
  const value = Array.from(Buffer.from(`value/${i}`))
  await doc.setBytes(author, key, value)
}

// Get  keys
const q = Query.all()
const entries = await doc.getMany(q)

for (const entry of entries) {
  console.log(`${Buffer.from(entry.key).toString()}\t${new Date(new Number(entry.timestamp))}`)
}
