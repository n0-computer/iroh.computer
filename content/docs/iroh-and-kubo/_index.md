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
  <!-- <script type="text/javascript" src="/docs/iroh-and-kubo/d3.v3.min.js"></script> -->
  <script type="text/javascript" charset="utf-8">
    const csvFields = ["command name", "iroh support", "group", "description"]
    window.addEventListener("load", function() {
        d3.csv(
            "/docs/iroh-and-kubo/iroh-and-kubo.csv",
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