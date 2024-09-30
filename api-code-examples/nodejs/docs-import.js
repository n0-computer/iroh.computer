import assert from 'assert'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os';
import path from 'node:path'

import { Iroh } from '@number0/iroh'

// Create a file on the local filesystem that we can import
const dir = await mkdtemp(tmpdir());
const filePath = path.join(dir, "hello.txt")
await writeFile(filePath, "oh hi there!")

// Create in memory iroh node
const node = await Iroh.memory({ enableDocs: true })

// Create a document
const doc = await node.docs.create()
console.log(`Created doc: ${doc.id()}`)

// Use the default author
const author = await node.authors.default()

// Import the file `inPlace`: true, which creates a reference to the file and does not copy any
// data into the iroh cache
const key = Array.from(Buffer.from("hello_in_place"))
await doc.importFile(author, key, filePath, true, (error, progress) => {
  if (error) {
    console.log(`Import error: ${error}`)
    return
  }

  if (progress.found) { console.log(`writing ${progress.id} to ${progress.found.outpath}`) }
  else if (progress.progress) { console.log("import progress") }
  else if (progress.done) { console.log(`done writing ${progress.done.id}`) }
  else if (progress.allDone) { console.log("all done!") }
})

const entry = await doc.getExact(author, key, false)
const fromDocument = await node.blobs.readToBytes(entry.hash)

// Prove that doc contents matches imported file contents
assert.equal("oh hi there!", Buffer.from(fromDocument).toString())
