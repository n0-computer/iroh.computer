package main

import (
	"fmt"

	"github.com/n0-computer/iroh-ffi/iroh-go/iroh"
)

// you'll need to get a ticket from somewhere, see the `doc share` command documentation
// for details.

const ticketString = "docaaqjjfgbzx2ry4zpaoujdppvqktgvfvpxgqubkghiialqovv7z4wosqbebpvjjp2tywajvg6unjza6dnugkalg4srmwkcucmhka7mgy4r3aa4aibayaeusjsjlcfoagavaa4xrcxaetag4aaq45mxvqaaaaaaaaadiu4kvybeybxaaehhlf5mdenfufmhk7nixcvoajganyabbz2zplgbno2vsnuvtkpyvlqcjqdoaaioowl22k3fc26qjx4ot6fk4"

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
