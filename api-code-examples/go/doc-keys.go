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

	doc, err := node.DocCreate()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id().ToString())

	for i, key := range []string{"a", "b", "c"} {
		if _, err := doc.SetBytes(author, []byte(key), []byte(fmt.Sprintf("%d", i))); err != nil {
			panic(err)
		}
	}

	// get all the entries with default filtering and sorting
	query := iroh.QueryAll(nil)
	entries, err := doc.GetMany(query)
	if err != nil {
		panic(err)
	}

	fmt.Println("Keys:")
	for _, entry := range entries {
		key := entry.Key()
		hash := entry.ContentHash()
		content, err := doc.ReadToBytes(entry)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%q : %q (hash: %s)\n", string(key), string(content), hash.ToString())
	}
	// Output:
	// Created document 7hgonoxdjzlwtuicfyou24l5nhv3bmvzhyeq6v2er66ekrpvhotq
	// Keys:
	// "a" : "0" (hash: bafkr4icnazyvhldstjfh5arazf4tl752m5ehqygvqkmm52zdqzbwtbt5t4)
	// "b" : "1" (hash: bafkr4igwhpm2qjvpsha75i3rszngjyi64ihrhzdll5jmlgibcntalm5eq4)
	// "c" : "2" (hash: bafkr4iebh2nxfekb47zyll5aulin6ptmg6e6ij774sxo6vtkkzn4r4x6hu)
}
