import { AddrInfoOptions, Iroh, ShareMode } from '@number0/iroh'

// Setup Alice
const alice = await Iroh.memory()
const aliceId = await alice.net.nodeId()
console.log(`Started alice: ${aliceId}`)

// Setup Bob
const bob = await Iroh.memory()
const bobId = await bob.net.nodeId()
console.log(`Started bob: ${bobId}`)

// Alice creates a document
const aliceDoc = await alice.docs.create()
console.log(`Alice created doc: ${aliceDoc.id()}`)

// Create a ticket to share with Bob
const ticket = await aliceDoc.share(ShareMode.Read, AddrInfoOptions.RelayAndAddresses)

// Bob joins the doc from the ticket:
const bobDoc = await bob.docs.joinAndSubscribe(ticket, (err, progress) => {
  if (err) {
    console.log(`doc error: ${error}`)
    return
  }

  if (progress.insertLocal) { console.log(`insertLocal event`) }
  else if (progress.insertRemote) { console.log(`insertRemote event`) }
  else if (progress.neighborUp) { console.log(`neighborUp event`) }
  else if (progress.neighborDown) { console.log(`neighborDown event`) }
  else if (progress.contentReady) { console.log(`contentReady event`) }
  else if (progress.pendingContentReady) { console.log(`pendingContentReady event`) }
  else if (progress.syncFinished) { console.log(`syncFinished event`) }
  else { console.log(`unrecognized doc event: ${progress}`) }
})

await aliceDoc.closeMe()
await bobDoc.closeMe()