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

	doc, err := node.DocCreate()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created document %s\n", doc.Id().ToString())

	readTicket, err := doc.Share(iroh.ShareModeRead)
	if err != nil {
		panic(err)
	}
	fmt.Println("Read-Access Ticket:", readTicket.ToString())

	writeTicket, err := doc.Share(iroh.ShareModeWrite)
	if err != nil {
		panic(err)
	}
	fmt.Println("Write-Access Ticket:", writeTicket.ToString())
	// Output:
	// Created document 7hgonoxdjzlwtuicfyou24l5nhv3bmvzhyeq6v2er66ekrpvhotq
	// Read-Access Ticket: docahabhyiz37wlugkwb6cj424qparg6tz5ujmxpr6ac3rkbkvgjys3qajabdmaailylilvvj5ejqcaaa5gkz6pehua4vbu26bbjit2h7axb3lacaidaafakaacyrlqbooyzfgmivyaycuacioek4
	// Write-Access Ticket: docaaqbt3lfrlih4yncth3rdwta4doendvv7e3fqtt27l6lf5tsfs6mqsibeaenqabbpbnbowvhurgaiaaduzlhz4q6qdsugtlyeffcpi74c4hnmaibamaaubiaalcfoafz3deuzrcxadakqajbyrlq
}
