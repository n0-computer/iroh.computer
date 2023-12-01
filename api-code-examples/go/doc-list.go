package main

import (
	"fmt"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

func main() {
	node, err := iroh.NewIrohNode("iroh_data_dir")
	if err != nil {
		// real programs handle errors!
		panic(err)
	}

	// create one document
	doc, err := node.DocCreate()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id().ToString())

	// create a second document
	doc, err = node.DocCreate()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id().ToString())

	// list all your documents
	docs, err := node.DocList()
	if err != nil {
		panic(err)
	}

	fmt.Printf("Listing all %d documents:\n", len(docs))
	// doc ids are also called "NamespaceIds"
	for _, namespaceAndCapability := range docs {
		fmt.Printf("\t%s\n", namespaceAndCapability.Namespace.ToString())
	}
}
