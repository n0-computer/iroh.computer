package main

import (
	"fmt"
	"io/ioutil"
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

	fmt.Println("Created dir", root)

	// create file
	path := filepath.Join("tmp", "hello_world")
	f, err := os.Create(path)
	if err != nil {
		panic(err)
	}
	_, err = f.WriteString("Hello World!")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created file \"hello_world\"\n")

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

	// import the file
	path, err = filepath.Abs(filepath.Join("tmp", "hello_world"))
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
	fmt.Printf("key: %s\n", key)
	err = doc.ImportFile(author, key, path, false, nil)
	if err != nil {
		panic(err)
	}

	// export the file
	// get the entry via an exact author and key
	entry, err := doc.GetExact(author, key, false)
	if err != nil {
		panic(err)
	}
	// create an export directory
	if err := os.Mkdir("export", os.ModePerm); err != nil {
		panic(err)
	}
	defer func() {
		os.RemoveAll("export")
		fmt.Println("Removed dir 'export'")
	}()
	root, err = filepath.Abs(filepath.Join("export"))
	if err != nil {
		panic(err)
	}
	fmt.Println("root:", root)

	// create the export path from the key, prefix, and directory location
	// this allows you to strip whatever prefix you have added to the key, and
	// add the absolute path to the relative path we used to create the key.
	// KeyToPath is the inverse of PathToKey
	exportPath, err := iroh.KeyToPath(key, &prefix, &root)
	if err != nil {
		panic(err)
	}
	// export the entry
	err = doc.ExportFile(*entry, exportPath, nil)
	if err != nil {
		panic(err)
	}

	// open the exported file & print the contents
	content, err := ioutil.ReadFile(exportPath)
	if err != nil {
		panic(err)
	}
	fmt.Printf("file %s: %q\n", exportPath, content)

	// Output:
	// Created $HOME/tmp
	// Created file "hello_world"
	// Created author hr6p3rrvp6ywlsitgd4djxzz67uhrb7eg2gho4zogb4e5rkpan5a
	// Created document in66kpmbqedchn6rkzvq3ri4omren5mkid3cecjmakj23ofefpqa
	// key: import-examplehello_world
	// root: $HOME/export
	// file $HOME/export/hello_world: "Hello World!"
	// Removed dir 'export'
	// Removed dir 'tmp'
}
