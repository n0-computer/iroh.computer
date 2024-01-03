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

	// typically only happens if you have not finished syncing or interrupted
	// a download
	incompletes, err := node.BlobsListIncomplete()
	if err != nil {
		panic(err)
	}

	fmt.Println("Incomplete blobs:")
	for _, res := range incompletes {
		fmt.Printf("\thash: %s size: %s expected size: %d\n", res.Hash.ToString(), res.Size, res.ExpectedSize)
	}

	// Output:
	// Incomplete blobs:
}
