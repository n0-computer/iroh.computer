package main

import (
	"fmt"

	"github.com/n0-computer/iroh-ffi/iroh"
)

func main() {
	node, err := iroh.NewIrohNode()
	if err != nil {
		panic(err)
	}

	if _, err := node.AuthorNew(); err != nil {
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
