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

	author, err := node.AuthorCreate()
	if err != nil {
		panic(err)
	}
	fmt.Println("Created author:", author.ToString())

	authors, err := node.AuthorList()
	if err != nil {
		panic(err)
	}

	fmt.Println("Authors:")
	for _, author := range authors {
		fmt.Println("\t", author.ToString())
	}
}
