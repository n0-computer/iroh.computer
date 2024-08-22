import assert from 'assert'
import { Iroh } from '@number0/iroh'

const node = await Iroh.memory()
const nodeId = await node.net.nodeId()
console.log(`Started iroh node: ${nodeId}`)

// create a doc
const doc = await node.docs.create()
console.log(`Created doc: ${doc.id()}`)

// we have one document
let docs = await node.docs.list()
assert.equal(docs.length, 1)

// delete the document
await node.docs.dropDoc(doc.id())

// we have zero documents
docs = await node.docs.list()
assert.equal(docs.length, 0)