package main

import (
	"fmt"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

func main() {
	node, err := iroh.NewIrohNode("iroh_data_dir")
	if err != nil {
		panic(err)
	}

	doc, err := node.DocCreate()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id().ToString())

	fmt.Println("List of docs and their capabilities (0-Read, 1-Write):")

	// returns an array of `iroh.NamespaceAndCapability`s
	// NamespaceId is the Doc's Id
	// and the Capability is whether you have read or write access to the doc
	ns, err := node.DocList()
	if err != nil {
		panic(err)
	}
	for i := 0; i < len(ns); i++ {
		fmt.Printf("\t%s\t%v\n", ns[i].Namespace.ToString(), ns[i].Capability)
	}

	err = node.DocDrop(doc.Id())
	if err != nil {
		panic(err)
	}
	fmt.Printf("Dropped document %s\n", doc.Id().ToString())

	fmt.Println("List of docs and their capabilities (0-Read, 1-Write):")
	ns, err = node.DocList()
	if err != nil {
		panic(err)
	}
	// list no longer contains the dropped doc
	for i := 0; i < len(ns); i++ {
		fmt.Printf("\t%s\t%v\n", ns[i].Namespace.ToString(), ns[i].Capability)
	}

	// Output
	// Created document cilxv6cnm3w3kjyh4iqacd374435f6h27tog7j3r77wdpb4fszha
	// List of docs and their capabilities (0-Read, 1-Write):
	//   cilxv6cnm3w3kjyh4iqacd374435f6h27tog7j3r77wdpb4fszha	1
	// Dropped document cilxv6cnm3w3kjyh4iqacd374435f6h27tog7j3r77wdpb4fszha
	// List of docs and their capabilities (0-Read, 1-Write):
}
