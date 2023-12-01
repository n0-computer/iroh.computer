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

	if _, err := node.AuthorCreate(); err != nil {
		panic(err)
	}

	authors, err := node.AuthorList()
	if err != nil {
		panic(err)
	}

	for _, author := range authors {
		fmt.Println(author.ToString())
	}
}
