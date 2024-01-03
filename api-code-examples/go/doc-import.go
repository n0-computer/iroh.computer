package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

func main() {
	// create folder
	if err := os.Mkdir("tmp", os.ModePerm); err != nil {
		panic(err)
	}
	defer func() {
		os.RemoveAll("tmp")
		fmt.Println("Removed dir 'tmp'")
	}()

	root, err := filepath.Abs(filepath.Join("tmp"))
	if err != nil {
		panic(err)
	}

	fmt.Println("Created dir \"tmp\"")

	fileNames := []string{"foo", "bar", "bat"}
	// create three files in the folder
	for _, fileName := range fileNames {
		path := filepath.Join("tmp", fileName)
		f, err := os.Create(path)
		if err != nil {
			panic(err)
		}
		_, err = f.WriteString(fmt.Sprintf("%s", fileName))
		if err != nil {
			panic(err)
		}
		fmt.Printf("Created file %q\n", path)
	}

	node, err := iroh.NewIrohNode("iroh_data_dir")
	if err != nil {
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

	prefix := "import-example"
	// import the files
	for _, fileName := range fileNames {
		path, err := filepath.Abs(filepath.Join("tmp", fileName))
		if err != nil {
			panic(err)
		}
		// create a key from the path, use the `iroh.PathToKey` function to ensure
		// that we strip the root correctly, and add any prefix we want to add for
		// organizational purposes
		key, err := iroh.PathToKey(path, &prefix, &root)
		if err != nil {
			panic(err)
		}

		doc.ImportFile(author, key, path, false, nil)
	}

	// get all the entries with default filtering and sorting
	query := iroh.QueryAll(nil)
	entries, err := doc.GetMany(query)
	if err != nil {
		panic(err)
	}

	fmt.Println("One entry for each file:")
	for _, entry := range entries {
		key := entry.Key()
		hash := entry.ContentHash()
		content, err := entry.ContentBytes(doc)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s: %q (hash: %s)\n", string(key), string(content), hash.ToString())
	}

	// Output:
	// Created dir "tmp"
	// Created file "tmp/foo"Created file "tmp/bar"Created file "tmp/bat"Created author kup6o2nnubm67rupuzo4mxjjwafpo6fbvhjjfjxdmvvm337i2txq
	// Created document rezwubpa2pxt5ikvrwr65oifq5csnz6h3eeq7l2yrkfewo6dji2a
	// One entry for each file:
	// import-examplebar: "bar" (hash: bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu)
	// import-examplebat: "bat" (hash: bafkr4iabccdb2eyeu764xoewbcqv62sjaggxibtmxx5tnmwer3wp3rquq4)
	// import-examplefoo: "foo" (hash: bafkr4iae4c5tt4yldi76xcpvg3etxykqkvec352im5fqbutolj2xo5yc5e)
	// Removed dir 'tmp'
}
