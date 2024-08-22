import assert from 'assert'
import { Iroh, Query } from '@number0/iroh'

// Create a node & 2 documents
const node = await Iroh.memory()
const doc1 = await node.docs.create()
const doc2 = await node.docs.create()

// List both documents
const docs = await node.docs.list();
assert.equal(docs.length, 2)

// Print out document IDs & show that this user has write
// capability on both docs
for (const doc of docs) {
  console.log(`ID: ${doc.namespace} ${doc.capability}`)
}

// Cleanup by closing document
doc1.closeMe()
doc2.closeMe()