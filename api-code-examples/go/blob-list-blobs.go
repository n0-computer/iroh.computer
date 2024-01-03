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

	b := []byte("hello world!")
	tag := iroh.SetTagOptionAuto()

	// add blob
	outcome, err := node.BlobsAddBytes(b, tag)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Added blob %s (%d bytes)\n", outcome.Hash.ToString(), outcome.Size)

	fmt.Println("blobs list:")

	blobs, err := node.BlobsList()
	if err != nil {
		panic(err)
	}

	for _, hash := range blobs {
		fmt.Println("\t", hash.ToString())
	}

	// Output:
	// Added blob bafkr4ib2uyoebh6xof6j3hddsibk6l5oi4ga55tjxz52fsxkk544wu2otu (12 bytes)
	// blobs list:
	//  bafkr4ib2uyoebh6xof6j3hddsibk6l5oi4ga55tjxz52fsxkk544wu2otu
	//
	//  (may contain additional hashes if you have previously added content to your node)
}
