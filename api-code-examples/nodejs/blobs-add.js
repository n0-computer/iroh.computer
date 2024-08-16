import { Iroh } from '@number0/iroh'

const node = await Iroh.memory()

const data = Array.from(Buffer.from("hello world"))
const res = await node.blobs.addBytes(data)

console.log(`created blob! hash: ${res.hash} size: ${res.size} bytes`)

const blob = await node.blobs.readToBytes(res.hash)

if (Buffer.from(blob).toString() !== Buffer.from(data).toString()) {
  throw new Error("invalid data")
}
