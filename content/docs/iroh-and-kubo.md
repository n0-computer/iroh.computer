+++
title = "Iroh and Kubo"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

# Kubo Command Comparison

[kubo](https://github.com/ipfs/kubo) is the reference implementation for the IPFS protocol. The following table maps commands within kubo to their corresponding support in iroh flavors:

<div>
  <div id="commands_table"></div>
  <script type="text/javascript"charset="utf-8">
    const csvFields = ["command name", "group", "iroh core support", "iroh mobile support"]
    window.addEventListener("load", function() {
        d3.csv(
            "/docs/iroh-and-kubo.csv",
            (d) => csvFields.map((f) => d[f]),
        )
        .then((parsedCSV) => {
            console.log(parsedCSV);
            var container = d3.select("#commands_table")
              .append("table")
              .selectAll("tr")
                  .data([csvFields].concat(parsedCSV)).enter()
                  .append("tr")
              .selectAll("td")
                  .data(function(d) { return d; }).enter()
                  .append("td")
                  .text(function(d) { return d; });
        })
      });
  </script>
</div>