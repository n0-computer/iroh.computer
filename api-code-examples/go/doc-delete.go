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

	fmt.Printf("Removing entry for author %s and prefix %s.\n", author.ToString(), string(key))
	// removes all entries from that author and with the prefix "key"
	num_removed, err := doc.Delete(author, key)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Removed %d entry\n", num_removed)

	// get all the entries with default filtering and sorting
	entries, err = doc.GetMany(query)
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
	// Created author x2xi6sosy2yafpj3xx6zzocvfxzzdrwlkhaqew5v4pcccg2rtesa
	// Created document bq3ioxh7licvicknhuxl2in24qagzlewoaotgvm3xbr6nxwrv7ea
	// Inserted bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte
	// Keys:
	// "go" : "says hello" (hash: bafkr4ihasgdyqs6onufsjrmk5h5vcg2ud75u2iaokavwiulyg7wfno6fte)
	// Removing entry for author x2xi6sosy2yafpj3xx6zzocvfxzzdrwlkhaqew5v4pcccg2rtesa and prefix go.
	// Removed 1 entry
	// Keys:
}
