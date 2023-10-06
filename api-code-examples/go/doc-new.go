package main

import (
	"fmt"

	"github.com/n0-computer/iroh-ffi/iroh"
)

func main() {
	node, err := iroh.NewIrohNode()
	if err != nil {
		// real programs handle errors!
		panic(err)
	}

	doc, err := node.DocNew()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id())
}
