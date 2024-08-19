import { Iroh } from '@number0/iroh'

const node = await Iroh.memory()

// Typically only happens if you have not finished syncing or interrupted
// a download

// List incomplete blobs
console.log('Incomplete blobs:')

const blobs = await node.blobs.listIncomplete()
for (let blob of blobs) {
  console.log(`\thash: ${blob.hash} size ${blob.size} expected size: ${blob.expectedSize}`)
}
