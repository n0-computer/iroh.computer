import { tmpdir } from 'node:os'
import path from 'node:path'
import { mkdtemp } from 'node:fs/promises'
import { Iroh } from '@number0/iroh'

// build an in-memory iroh node
const node = await Iroh.memory()
const nodeId = await node.net.nodeId()
console.log(`Started iroh node: ${nodeId}`)

// create a document
const doc = await node.docs.create()
console.log(`Created doc: ${doc.id()}`)

// use the default author to write
const author = await node.authors.default();

// set a value so we can export it in the next step
const key = Array.from(Buffer.from("hello.txt"))
const value = Array.from(Buffer.from("why hello there"))
await doc.setBytes(author, key, value)

// fetch the entry for the value
const entry = await doc.getExact(author, key, false)

// export the file to a temporary directory, using a callback to track export progress
const tmpDir = await mkdtemp(tmpdir())
const filePath = path.join(tmpDir, Buffer.from(key).toString())
await doc.exportFile(entry, filePath, (err, prog) => {
  if (err) {
    console.log(`export error: ${err}`)
    return
  }

  if (prog.found) { console.log(`writing ${prog.id} to ${prog.found.outpath}`) }
  else if (prog.progress) { console.log("export progress") }
  else if (prog.done) { console.log(`done writing ${prog.done.id}`) }
  else if (prog.allDone) { console.log("all done!") }
})