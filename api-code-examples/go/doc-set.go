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

	key := []byte("go")
	hash, err := doc.SetBytes(author, key, []byte("says hello"))
	if err != nil {
		panic(err)
	}
	fmt.Printf("Inserted %s\n", hash.ToString())

	// returns a pointer to an entry
	entry, err := doc.GetExact(author, key, false)
	if err != nil {
		panic(err)
	}

	// dereference the pointer to the entry once you know doc.GetExact did not
	// return an error
	content, err := doc.ReadToBytes(*entry)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Got content %q\n", string(content))
}
