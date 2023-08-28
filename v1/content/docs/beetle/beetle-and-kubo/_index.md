+++
title = "Beetle and Kubo"
description = ""
template="docs/page.html"
[extra]
section="Beetle"
+++

# Feature Support

[Beetle](https://iroh.computer) & [Kubo](https://docs.ipfs.tech) (formerly go-ipfs) are both implementations of [IPFS](https://ipfs.io).

|  | Kubo | Beetle |
| --- | --- | --- |
| Language | go | rust |
| License | dual MIT/Apache-2.0 | dual MIT/Apache-2.0 |
| Project Start | Feb 2015 | April 2022 |

[kubo](https://github.com/ipfs/kubo) is the reference implementation for the IPFS protocol. Beetle doesn’t aim to implement all features that kubo supports. Instead Beetle focuses on the most-used parts of the protocol that can be integrated into a performance sensitive context.

# Hash compatibility

UnixFS content created with kubo can be read by Beetle, and vice versa. However, **content added to Beetle will not output the same hash as the same content created with kubo.** This is because Beetle uses different defaults for adding content.

# HTTP Gateway

What started as the [Kubo HTTP Gateway](https://docs.ipfs.tech/reference/http/gateway/) has been codified into a [specification](https://github.com/ipfs/specs/tree/main/http-gateways) which both Beetle and kubo support. Beetle has the following caveats:

- iroh does not yet support [subdomain gateways](https://github.com/ipfs/specs/blob/main/http-gateways/SUBDOMAIN_GATEWAY.md)
- HTML templates for items like UnixFS directories will differ when rendered with Beetle.

# Kubo RPC API

The [Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/) provides an HTTP an interface for controlling a kubo node. Beetle does not have the same API and instead uses the `beetle` command line client to issue requests that control Beetle services.

# Detailed command comparison

The following table maps commands within kubo to their corresponding support in iroh:

<div>
  <div id="commands_table"></div>
  <!-- <script type="text/javascript" src="/docs/iroh-and-kubo/d3.v3.min.js"></script> -->
  <script type="text/javascript" charset="utf-8">
    const csvFields = ["command name", "iroh support", "group", "description"]
    window.addEventListener("load", function() {
        d3.csv(
            "/docs/beetle/beetle-and-kubo/beetle-and-kubo.csv",
            (d) => csvFields.map((f) => d[f]),
        )
        .then((parsedCSV) => {
            var container = d3.select("#commands_table")
              .append("table")
              .selectAll("tr")
                  .data([csvFields].concat(parsedCSV)).enter()
                  .append("tr")
              .selectAll("td")
                  .data(function(d) { return d; }).enter()
                  .append("td")
                  .attr("class", function(d, i){
                      if (i === 1) {
                        switch (d) {
                          case "full":
                            return "support-full"
                          case "partial":
                            return "support-partial"
                          case "no":
                            return "support-none"
                        }
                      }
                      return ""
                  })
                  .text(function(d) { return d; });
        })
      });
  </script>
</div>