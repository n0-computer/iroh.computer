+++
title = "Iroh and Kubo"
description = ""
template="docs/page.html"
[extra]
section="iroh"
+++

<div>
  <div id="table"></div>
  <script src="iroh-and-kubo/d3.v3.min.js"></script>
  <script type="text/javascript"charset="utf-8">
      d3.text("iroh-and-kubo/commands.csv", function(data) {
          var parsedCSV = d3.csv.parseRows(data);
          var container = d3.select("#table")
              .append("table")
              .selectAll("tr")
                  .data(parsedCSV).enter()
                  .append("tr")
              .selectAll("td")
                  .data(function(d) { return d; }).enter()
                  .append("td")
                  .text(function(d) { return d; });
      });
  </script>
</div>