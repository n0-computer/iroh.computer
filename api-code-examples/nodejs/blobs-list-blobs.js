import { Iroh } from '@number0/iroh'

const node = await Iroh.memory()

// Define content and tage
const content = Array.from(Buffer.from("hello world!"))

// Add blob
const outcome = await node.blobs.addBytes(content)
console.log(`Added blob ${outcome.hash} (${outcome.size} bytes)`)

console.log('blobs list:');

// List blobs
const blobs = await node.blobs.list()
for (let blob of blobs) {
  console.log(`\t${blob}`)
}
