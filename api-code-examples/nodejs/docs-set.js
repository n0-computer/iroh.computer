import assert from 'node:assert'
import { Iroh } from '@number0/iroh'

// Create a node
const node = await Iroh.memory()
const nodeId = await node.net.nodeId()
console.log(`Started iroh node: ${nodeId}`)

// Create a document
const doc = await node.docs.create()
console.log(`Created doc: ${doc.id()}`)

// Use the default author to write
const author = await node.authors.default();

// set a value in the document
const key = Array.from(Buffer.from("key"))
const value = Array.from(Buffer.from("value!"))
await doc.setBytes(author, key, value)

// get a key
const entry = await doc.getExact(author, key, false)

// read the value back
const res = await node.blobs.readToBytes(entry.hash)

// returned value matches the original
assert.deepEqual(value, res)

console.log(`Got value: ${Buffer.from(res).toString()}`)