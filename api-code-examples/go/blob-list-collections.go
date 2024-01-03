package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

type addCallback struct {
	hashCh chan iroh.Hash
}

func (a addCallback) Progress(event *iroh.AddProgress) *iroh.IrohError {
	if event.Type() == iroh.AddProgressTypeAllDone {
		allDone := event.AsAllDone()
		a.hashCh <- *allDone.Hash
	}
	return nil
}

func main() {
	// create folder
	if err := os.Mkdir("tmp", os.ModePerm); err != nil {
		panic(err)
	}
	defer func() {
		os.RemoveAll("tmp")
		fmt.Println("Removed dir 'tmp'")
	}()

	path, err := filepath.Abs(filepath.Join("tmp"))
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

	// when `inPlace` is true, iroh will NOT copy over the files into its
	// internal database. Only use this option when you know the file will never
	// move or change
	inPlace := false
	// iroh blobs can be "tagged" with human readable names, this creates a tag
	// automatically
	tag := iroh.SetTagOptionNamed(iroh.TagFromString("my_collection"))
	// when adding a single file, if you use `iroh.WrapOptionWrap`, you will turn
	// the single file into a collection with one entry
	wrap := iroh.WrapOptionNoWrap()
	// you can use this callback to react to progress updates
	hashCh := make(chan iroh.Hash, 1)
	callback := addCallback{hashCh}

	// import the directory, creating one blob for each file, and one metadata
	// blob that stores the file names for each blob
	// also creates a 'collection' from the directory, grouping together the
	// blobs

	err = node.BlobsAddFromPath(path, inPlace, tag, wrap, callback)
	if err != nil {
		panic(err)
	}

	hash := <-hashCh

	fmt.Println("Added collection", hash.ToString())

	fmt.Println("collections list:")

	collRes, err := node.BlobsListCollections()
	if err != nil {
		panic(err)
	}

	for _, res := range collRes {
		fmt.Printf("\thash: %s tag: %s\n", res.Hash.ToString(), res.Tag.ToString())
	}

	// Output:
	// Created dir "tmp"
	// Created file "tmp/foo"
	// Created file "tmp/bar"
	// Created file "tmp/bat"
	// AllDone
	// Added collection bafkr4iaotzhxuiak7eusnngngnwsqdu4crf4lmdxzkbhuebunevecjzkim
	// collections list:
	// 	hash:bafkr4iaotzhxuiak7eusnngngnwsqdu4crf4lmdxzkbhuebunevecjzkim tag:"my_collection"
	// Removed dir 'tmp'
	//
	// (may contain additional collections if you have previously added content to your node)
}
