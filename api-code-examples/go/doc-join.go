package main

import (
	"fmt"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

// you'll need to get a ticket from somewhere, see the `doc share` command documentation
// for details.

const ticketString = "docaaa7qg6afc6zupqzfxmu5uuueaoei5zlye7a4ahhrfhvzjfrfewozgybl5kkl6u6fqcnjxvdkoihq3nbsqczxeulfsqvatb2qh3bwheoyahacitior2ha4z2f4xxk43fgewtcltemvzhaltjojxwqltomv2ho33snmxc6biajjeteswek4ambkabzpcfoajganyabbz2zplaaaaaaaaaagrjyvlqcjqdoaaioowl2ygi2likyov62rofk4asma3qacdtvs6whqsdbizopsefrrkx"

func main() {
	node, err := iroh.NewIrohNode("iroh_data_dir")
	if err != nil {
		panic(err)
	}

	ticket, err := iroh.DocTicketFromString(ticketString)
	if err != nil {
		panic(err)
	}

	doc, err := node.DocJoin(ticket)
	if err != nil {
		panic(err)
	}

	fmt.Println("Joined doc:", doc.Id().ToString())
}
