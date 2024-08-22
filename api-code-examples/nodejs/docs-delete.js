import assert from 'assert'
import { Iroh, Query } from '@number0/iroh'


const node = await Iroh.memory()
const nodeId = await node.net.nodeId()
console.log(`Started iroh node: ${nodeId}`)

// create a document
const doc = await node.docs.create()
console.log(`Created doc: ${doc.id()}`)

// use the default author to write
const author = await node.authors.default();

// set 10 values
for (let i = 0; i < 10; i++) {
  const key = Array.from(Buffer.from("key/" + i))
  const value = Array.from(Buffer.from("value/" + i))
  await doc.setBytes(author, key, value)
}

// fetch the 10 entries
const q = Query.keyPrefix(Array.from(Buffer.from("key/")))
let entries = await doc.getMany(q)
assert.equal(entries.length, 10)

// delete entries. This the deletion key will be set to the empty hash, which will tell iroh to 
// delete all values the "empty hash key" is a prefix of. Queries by default ignore keys who's 
// value is the empty hash
const deleted = await doc.delete(author, Array.from(Buffer.from("key")));
console.log(deleted, typeof deleted)
assert.equal(deleted, BigInt(10))

// getting many will show zero entries:
entries = await doc.getMany(q)
assert.equal(entries.length, 0)

// but we can get the empty value marker with `getExact`, by setting the `includeEmpty` argument
// to true:
const entry = await doc.getExact(author, Array.from(Buffer.from("key")), true)
// empty hash values will always be this:
assert.equal(entry.hash, "v4jutopv7gq2nicajxvdnxgjjgn4wjojvxarfn6mtkj4vza7gjra")