package main

import (
	"fmt"

	"github.com/n0-computer/iroh-ffi/iroh"
)

// you'll need to get a ticket from somewhere, see the `doc share` command documentation
// for details. This ticket will fail to join, but is a valid ticket.
const ticketString = "sdx7wazju2rysqydgfpmhqkrluc5lbcuainravjipwmbl7r3k3uqcigncyopdcnooufnteu5vuatpzhoqrml35ifgyuozr6kwhjiz4jxyaaqcbiajbmsainmsmbqcjqaibavg5hiaaaaaaaaaaabad47sebqbqfiiqzkzeydadakqrckvsjqgajgabaecu3u5aaaaaaaaaaaaeagt6iqg"

func main() {
	node, err := iroh.NewIrohNode()
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

	fmt.Println("Joined doc: %s", doc.Id())
}
