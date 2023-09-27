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

	doc, err := node.DocNew()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id())

	// TODO - sharing read-only tickets is not yet implemented. Coming soon!
	// readTicket, err := doc.ShareRead()
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println(readTicket.ToString())

	writeTicket, err := doc.ShareWrite()
	if err != nil {
		panic(err)
	}
	fmt.Println("Write-Access Ticket: %s", writeTicket.ToString())
	// Output:
	// Created document 7hgonoxdjzlwtuicfyou24l5nhv3bmvzhyeq6v2er66ekrpvhotq
	// Write-Access Ticket: sdx7wazju2rysqydgfpmhqkrluc5lbcuainravjipwmbl7r3k3uqcigncyopdcnooufnteu5vuatpzhoqrml35ifgyuozr6kwhjiz4jxyaaqcbiajbmsainmsmbqcjqaibavg5hiaaaaaaaaaaabad47sebqbqfiiqzkzeydadakqrckvsjqgajgabaecu3u5aaaaaaaaaaaaeagt6iqg
}
