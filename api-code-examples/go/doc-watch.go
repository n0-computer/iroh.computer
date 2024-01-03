package main

import (
	"fmt"
	"sync"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

type watch struct {
	wg *sync.WaitGroup
}

func (w watch) Event(e *iroh.LiveEvent) *iroh.IrohError {
	switch t := e.Type(); t {
	case iroh.LiveEventTypeInsertLocal:
		// returns the entry from the InsertLocal event
		entry := e.AsInsertLocal()
		fmt.Println("LiveEvent - InsertLocal: entry hash", entry.ContentHash().ToString())
		w.wg.Done()
	case iroh.LiveEventTypeInsertRemote:
		insertRemoveEvent := e.AsInsertRemote()
		fmt.Printf("LiveEvent - InsertRemote:\n\tfrom: %s\n\tentry hash:\n\tcontent_status: %v\n", insertRemoveEvent.From, insertRemoveEvent.Entry.ContentHash().ToString(), insertRemoveEvent.ContentStatus)
		fmt.Println("Insert Remove events will be eventually followed by the ContentReady event")
	case iroh.LiveEventTypeContentReady:
		hash := e.AsContentReady()
		fmt.Println("LiveEvent - ContentReady: hash", hash.ToString())
	case iroh.LiveEventTypeNeighborUp:
		nodeId := e.AsNeighborUp()
		fmt.Println("LiveEvent - NeighborUp: node id", nodeId.ToString())
	case iroh.LiveEventTypeNeighborDown:
		nodeId := e.AsNeighborDown()
		fmt.Println("LiveEvent - NeighborDown: node id", nodeId.ToString())
	case iroh.LiveEventTypeSyncFinished:
		syncEvent := e.AsSyncFinished()
		fmt.Println("Live Event - SyncFinished: synced peer:", syncEvent.Peer.ToString())
	default:
		return &iroh.IrohError{}
	}
	return nil
}

func main() {
	node, err := iroh.NewIrohNode("iroh_data_dir")
	if err != nil {
		panic(err)
	}

	author, err := node.AuthorCreate()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created author %s\n", author.ToString())

	doc, err := node.DocCreate()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id().ToString())

	var wg sync.WaitGroup
	wg.Add(1)
	callback := watch{wg: &wg}

	err = doc.Subscribe(callback)

	key := []byte("watch-me")
	_, err = doc.SetBytes(author, key, []byte("I'm going to trigger an InsertLocal event."))
	if err != nil {
		panic(err)
	}

	// wait for the watcher to get the insert local event
	wg.Wait()
	fmt.Println("Done!")
}
