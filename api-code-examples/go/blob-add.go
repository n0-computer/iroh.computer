package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

type addCallback struct {
}

func (a addCallback) Progress(event *iroh.AddProgress) *iroh.IrohError {
	switch t := event.Type(); t {
	case iroh.AddProgressTypeFound:
		fmt.Println("AddProgress - Found:")
		found := event.AsFound()
		fmt.Printf("\tid: %d, name: %s, size: %d\n", found.Id, found.Name, found.Size)
	case iroh.AddProgressTypeProgress:
		fmt.Println("AddProgress - Progress:")
		progress := event.AsProgress()
		fmt.Printf("\tid: %d, offset: %d\n", progress.Id, progress.Offset)
	case iroh.AddProgressTypeDone:
		fmt.Println("AddProgress - Done:")
		done := event.AsDone()
		fmt.Printf("\tid: %d, hash: %s\n", done.Id, done.Hash.ToString())
	case iroh.AddProgressTypeAllDone:
		fmt.Println("AddProgress - AllDone:")
		allDone := event.AsAllDone()
		fmt.Printf("\thash: %s, format: %v, tag: %s\n", allDone.Hash.ToString(), allDone.Format, allDone.Tag.ToString())
	case iroh.AddProgressTypeAbort:
		fmt.Println("AddProgress - Abort:")
		abort := event.AsAbort()
		fmt.Printf("\terror: %s", abort.Error)
	default:
		fmt.Println("Unknown AddProgress event: %v", event)
		return &iroh.IrohError{}
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
	tag := iroh.SetTagOptionAuto()
	// when adding a single file, if you use `iroh.WrapOptionWrap`, you will turn
	// the single file into a collection with one entry
	wrap := iroh.WrapOptionNoWrap()
	// you can use this callback to react to progress updates
	callback := addCallback{}

	// import the directory, creating one blob for each file, and one metadata
	// blob that stores the file names for each blob
	// also creates a 'collection' from the directory, grouping together the
	// blobs

	err = node.BlobsAddFromPath(path, inPlace, tag, wrap, callback)
	if err != nil {
		panic(err)
	}

	// Output:
	// Created dir "tmp"
	// Created file "tmp/foo"
	// Created file "tmp/bar"
	// Created file "tmp/bat"
	// AddProgress - Found:
	//    id: 2, name: $HOME/tmp/bar, size: 3
	// AddProgress - Found:
	//		id: 0, name: $HOME/tmp/foo, size: 3
	// AddProgress - Found:
	//		id: 1, name: $HOME/tmp/bat, size: 3
	// AddProgress - Progress:
	//		id: 1, offset: 3
	// AddProgress - Done:
	//		id: 1, hash: bafkr4iabccdb2eyeu764xoewbcqv62sjaggxibtmxx5tnmwer3wp3rquq4
	// AddProgress - Progress:
	//		id: 2, offset: 3
	// AddProgress - Progress:
	//		id: 0, offset: 3
	// AddProgress - Done:
	//		id: 2, hash: bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu
	// AddProgress - Done:
	//		id: 0, hash: bafkr4iae4c5tt4yldi76xcpvg3etxykqkvec352im5fqbutolj2xo5yc5e
	// AddProgress - AllDone:
	//		hash: bafkr4iaotzhxuiak7eusnngngnwsqdu4crf4lmdxzkbhuebunevecjzkim, format: 2, tag: "auto-2023-12-09T17:37:42.432Z"
	// Removed dir 'tmp'
}
