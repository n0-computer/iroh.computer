import { Iroh } from '@number0/iroh'

const node = await Iroh.memory({ enableDocs: true })
const nodeId = await node.net.nodeId()
console.log(`Started iroh node: ${nodeId}`)

const author = await node.authors.create()
console.log(`Created author: ${author.toString()}`)

const authors = await node.authors.list()
console.log('Authors:')
for (let author of authors) {
  console.log(`\t${author}`)
}
