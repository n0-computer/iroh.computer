import { Iroh } from '@number0/iroh'

const node = await Iroh.memory()
const nodeId = await node.node.nodeId()
console.log(`Started iroh node: ${nodeId}`)

const author = await node.authors.create()
console.log(`Created author: ${author.toString()}`)
