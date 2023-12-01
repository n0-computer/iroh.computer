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

	author, err := node.AuthorNew()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created author %s\n", author.ToString())

	doc, err := node.DocNew()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id())

	hash, err := doc.SetBytes(author, []byte("go"), []byte("says hello"))
	if err != nil {
		panic(err)
	}
	fmt.Printf("Inserted %s\n", hash.ToString())

	content, err := doc.GetContentBytes(hash)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Got content %q\n", string(content))
}
