import { M as MetaFile, m as initial, s as signal, R as Rect, x as createRef, d as createSignal, n as jsx, r as palette, H as Heading, D as categoricalPalette, o as Label, u as makeScene2D, v as all, w as waitFor, N as Node, S as Server, y as Line, z as MobilePhone, E as ValueDispatcher, F as makeProject, G as bootstrap, I as plugin0, J as settings } from "./_virtual_settings-140a9a08.js";
let meta$1;
meta$1 ?? (meta$1 = new MetaFile("Publishing.project", false));
meta$1.loadData({
  "version": 0,
  "shared": {
    "background": "rgb(15,17,25)",
    "range": [
      0,
      null
    ],
    "size": {
      "x": 1920,
      "y": 1080
    },
    "audioOffset": 0
  },
  "preview": {
    "fps": 30,
    "resolutionScale": 1
  },
  "rendering": {
    "fps": 60,
    "resolutionScale": 1,
    "colorSpace": "srgb",
    "exporter": {
      "name": "@motion-canvas/core/image-sequence",
      "options": {
        "fileType": "image/png",
        "quality": 100,
        "groupByScene": false
      }
    }
  }
});
const metaFile$1 = meta$1;
let meta;
meta ?? (meta = new MetaFile("Publishing", false));
meta.loadData({
  "version": 0,
  "timeEvents": [],
  "seed": 2552423395
});
const metaFile = meta;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
class PkarrPacket extends Rect {
  constructor(props) {
    super({
      ...props
    });
    this.container = createRef();
    this.signature = createSignal();
    this.add(
      /* @__PURE__ */ jsx(
        Rect,
        {
          ref: this.container,
          layout: true,
          direction: "column",
          padding: 20,
          gap: 10,
          stroke: palette.light,
          lineWidth: 1,
          children: [
            /* @__PURE__ */ jsx(Heading, { level: 5, text: "PKARR Packet" }),
            /* @__PURE__ */ jsx(Heading, { level: 6, text: this.nodeId().slice(0, 8) + "..." }),
            /* @__PURE__ */ jsx(Rect, { padding: 10, stroke: categoricalPalette[0], lineWidth: 2, layout: true, direction: "column", marginTop: 15, children: [
              /* @__PURE__ */ jsx(Heading, { level: 6, fill: categoricalPalette[0], text: "RECORDS:" }),
              /* @__PURE__ */ jsx(Heading, { level: 6, text: () => this.records() })
            ] }),
            /* @__PURE__ */ jsx(Rect, { ref: this.signature, padding: 30, stroke: categoricalPalette[1], lineWidth: 2, opacity: 0, marginTop: 15, children: /* @__PURE__ */ jsx(Label, { text: "signature(RECORDS)" }) })
          ]
        }
      )
    );
  }
  *sign() {
    yield* this.signature().opacity(1, 1);
  }
}
__decorateClass([
  initial("2ovpybgj3snjmchns44pfn6dbwmdiu4ogfd66xyu72ghexllv6hq"),
  signal()
], PkarrPacket.prototype, "nodeId", 2);
__decorateClass([
  initial(""),
  signal()
], PkarrPacket.prototype, "records", 2);
const timeBase = 1;
const aliceNodeId = "2ovpybgj3snjmchns44pfn6dbwmdiu4ogfd66xyu72ghexllv6hq";
const aliceNodeIdTrunc = aliceNodeId.slice(0, 8);
const relayUrl = "https://us-1.iroh.network";
const dnsAddr = "dns.iroh.link";
const description = makeScene2D(function* (view) {
  const page = {
    container: createRef(),
    relayServer: createRef(),
    dnsServer: createRef(),
    alice: createRef(),
    relayServerConn: createRef(),
    phoneToPacket: createRef(),
    pkarrPacket: createRef(),
    packetToDns: createRef(),
    dnsRecords: createRef()
  };
  const layout = {
    row1: -150,
    row2: 200
  };
  view.add(
    /* @__PURE__ */ jsx(Node, { scale: 1.2, ref: page.container, children: [
      /* @__PURE__ */ jsx(Rect, { layout: true, direction: "column", gap: 10, ref: page.relayServer, opacity: 0, x: -500, y: layout.row1, children: [
        /* @__PURE__ */ jsx(Server, {}),
        /* @__PURE__ */ jsx(Label, { text: "Relay Server" }),
        /* @__PURE__ */ jsx(Heading, { level: 6, text: relayUrl })
      ] }),
      /* @__PURE__ */ jsx(Rect, { ref: page.dnsRecords, opacity: 0, x: 980, y: layout.row1 + 250, layout: true, direction: "column", gap: 10, children: [
        /* @__PURE__ */ jsx(Heading, { level: 4, text: "DNS Records", fill: categoricalPalette[0] }),
        /* @__PURE__ */ jsx(Label, { text: "..." }),
        /* @__PURE__ */ jsx(Label, { text: `_iroh.${aliceNodeIdTrunc}.dns.iroh.link TXT relay=${relayUrl}`, fill: categoricalPalette[0] }),
        /* @__PURE__ */ jsx(Label, { text: "..." })
      ] }),
      /* @__PURE__ */ jsx(Rect, { layout: true, direction: "column", gap: 10, ref: page.dnsServer, opacity: 0, x: 500, y: layout.row1, children: [
        /* @__PURE__ */ jsx(Server, {}),
        /* @__PURE__ */ jsx(Label, { text: "DNS Server" }),
        /* @__PURE__ */ jsx(Heading, { level: 6, text: dnsAddr })
      ] }),
      /* @__PURE__ */ jsx(
        Line,
        {
          ref: page.relayServerConn,
          points: () => [
            page.alice().top(),
            page.relayServer().bottom()
          ],
          stroke: palette.light,
          lineWidth: 4,
          endArrow: true,
          arrowSize: 10,
          end: 0
        }
      ),
      /* @__PURE__ */ jsx(Rect, { layout: true, direction: "column", gap: 20, ref: page.alice, opacity: 0, x: -550, y: layout.row2, children: [
        /* @__PURE__ */ jsx(MobilePhone, {}),
        /* @__PURE__ */ jsx(Label, { text: "Alice" }),
        /* @__PURE__ */ jsx(Heading, { level: 6, text: `NodeID: ${aliceNodeIdTrunc}...` })
      ] }),
      /* @__PURE__ */ jsx(
        Line,
        {
          ref: page.phoneToPacket,
          points: () => [
            page.alice().right(),
            [page.pkarrPacket().left().x - 320, page.pkarrPacket().left().y]
          ],
          stroke: palette.light,
          lineWidth: 4,
          arrowSize: 10,
          end: 0
        }
      ),
      /* @__PURE__ */ jsx(
        PkarrPacket,
        {
          ref: page.pkarrPacket,
          opacity: 0,
          y: layout.row2,
          nodeId: aliceNodeId
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          ref: page.packetToDns,
          points: () => [
            [page.pkarrPacket().right().x + 320, page.pkarrPacket().right().y],
            [500, layout.row2],
            page.dnsServer().bottom()
          ],
          stroke: palette.light,
          lineWidth: 4,
          arrowSize: 10,
          endArrow: true,
          end: 0
        }
      )
    ] })
  );
  yield* all(
    page.alice().opacity(1, timeBase * 0.5),
    page.relayServer().opacity(1, timeBase * 0.75),
    page.dnsServer().opacity(1, timeBase)
  );
  yield* waitFor(2);
  yield* page.relayServerConn().end(1, timeBase * 0.5);
  yield* page.relayServerConn().start(1, timeBase * 0.5);
  page.relayServerConn().startArrow(true);
  page.relayServerConn().endArrow(false);
  yield* page.relayServerConn().start(0, timeBase * 0.5);
  yield* page.relayServerConn().end(0, timeBase * 0.5);
  yield* page.phoneToPacket().end(1, timeBase);
  yield* page.pkarrPacket().opacity(1, timeBase);
  yield* page.pkarrPacket().records(`relay=${relayUrl}`, timeBase);
  yield* page.pkarrPacket().sign();
  yield* page.packetToDns().end(1, timeBase);
  yield* waitFor(1);
  yield* page.phoneToPacket().start(1, timeBase);
  yield* all(
    page.pkarrPacket().opacity(0, timeBase * 0.5),
    page.packetToDns().start(1, timeBase * 0.7)
  );
  yield* all(
    page.container().x(-1200, timeBase),
    page.dnsRecords().opacity(1, timeBase)
  );
  yield* waitFor(2);
  yield* page.container().opacity(0, timeBase);
});
description.name = "Publishing";
metaFile.attach(description.meta);
description.onReplaced ?? (description.onReplaced = new ValueDispatcher(description.config));
const config = makeProject({
  scenes: [
    description
  ]
});
const Publishing_project = bootstrap(
  "Publishing.project",
  { "core": "3.15.2", "two": "3.15.2", "ui": "3.15.2", "vitePlugin": "3.15.1" },
  [plugin0()],
  config,
  metaFile$1,
  settings
);
export {
  Publishing_project as default
};
