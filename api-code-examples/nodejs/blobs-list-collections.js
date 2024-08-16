import { tmpdir } from 'os';

import path from 'node:path'
import { mkdtemp, writeFile, readFile } from 'node:fs/promises'

import { Iroh, SetTagOption } from '@number0/iroh'

// Create folder
const dir = await mkdtemp(tmpdir());
const fileNames = ['foo', 'bar', 'bat']

// Create three files in the folder
for (let file of fileNames) {
  let filePath = path.join(dir, file)
  await writeFile(filePath, file)
  console.log(`Created file ${filePath}`)
}

// Create in memory iroh node
const node = await Iroh.memory()

// Options
const inPlace = false;
const tag = SetTagOption.named(Array.from(Buffer.from('my_collection')))
const wrap = { wrap: false }

// Import the directory, creating one blob for each file, and one metadata
// blob that stores the file names for each blob
// also creates a 'collection' from the directory, grouping together the
// blobs

// Do not use Promise.withResovlers it is buggy
let resolve;
let reject;
const promise = new Promise((res, rej) => {
  resolve = res
  reject = rej;
});

await node.blobs.addFromPath(dir, inPlace, tag, wrap, (err, progress) => {
  if (err != null) {
    return reject(err);
  }
  if (progress.allDone != null) {
    resolve(progress.allDone)
  }
})

const done = await promise
const hash = done.hash

console.log(`Added collection: ${hash}`)

console.log('collections list:')

const collections = await node.blobs.listCollections()

for (let collection of collections) {
  const tag = Buffer.from(collection.tag)
  console.log(`\thash: ${collection.hash} tag: ${tag.toString()}`)
}
