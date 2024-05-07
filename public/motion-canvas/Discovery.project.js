import { M as MetaFile, P as PolynomialSegment, a as Polynomial2D, V as Vector2, q as quadraticCurveTo, l as lazy, g as getDefaultExportFromCjs, L as LineSegment, C as CubicBezierSegment, A as ArcSegment, c as clamp, b as Curve, d as createSignal, B as BBox, i as isReactive, e as createCurveProfileLerp, t as tween, f as drawPivot, h as drawLine, s as signal, j as computed, k as threadable, m as initial, R as Rect, n as jsx, o as Label, p as Layout, r as palette, u as colorSignal, v as Line, w as createRef, H as Heading, x as waitFor, y as all, z as makeScene2D, N as Node, S as Server, D as MobilePhone, E as categoricalPalette, F as ValueDispatcher, G as makeProject, I as bootstrap, J as plugin0, K as settings } from "./_virtual_settings-6986020f.js";
let meta$1;
meta$1 ?? (meta$1 = new MetaFile("Discovery.project", false));
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
var __decorate$1 = globalThis && globalThis.__decorate || function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class QuadBezierSegment extends PolynomialSegment {
  get points() {
    return [this.p0, this.p1, this.p2];
  }
  constructor(p0, p1, p2) {
    super(new Polynomial2D(
      p0,
      // 2*(-p0+p1)
      p0.flipped.add(p1).scale(2),
      // p0-2*p1+p2
      p0.sub(p1.scale(2)).add(p2)
    ), QuadBezierSegment.getLength(p0, p1, p2));
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
  }
  split(t) {
    const a = new Vector2(this.p0.x + (this.p1.x - this.p0.x) * t, this.p0.y + (this.p1.y - this.p0.y) * t);
    const b = new Vector2(this.p1.x + (this.p2.x - this.p1.x) * t, this.p1.y + (this.p2.y - this.p1.y) * t);
    const p = new Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    const left = new QuadBezierSegment(this.p0, a, p);
    const right = new QuadBezierSegment(p, b, this.p2);
    return [left, right];
  }
  static getLength(p0, p1, p2) {
    QuadBezierSegment.el.setAttribute("d", `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`);
    return QuadBezierSegment.el.getTotalLength();
  }
  doDraw(context) {
    quadraticCurveTo(context, this.p1, this.p2);
  }
}
__decorate$1([
  lazy(() => document.createElementNS("http://www.w3.org/2000/svg", "path"))
], QuadBezierSegment, "el", void 0);
var parseSvgPath = parse;
var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };
var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
function parse(path) {
  var data = [];
  path.replace(segment, function(_, command, args) {
    var type = command.toLowerCase();
    args = parseValues(args);
    if (type == "m" && args.length > 2) {
      data.push([command].concat(args.splice(0, 2)));
      type = "l";
      command = command == "m" ? "l" : "L";
    }
    while (true) {
      if (args.length == length[type]) {
        args.unshift(command);
        return data.push(args);
      }
      if (args.length < length[type])
        throw new Error("malformed path data");
      data.push([command].concat(args.splice(0, length[type])));
    }
  });
  return data;
}
var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
function parseValues(args) {
  var numbers = args.match(number);
  return numbers ? numbers.map(Number) : [];
}
const parse$1 = /* @__PURE__ */ getDefaultExportFromCjs(parseSvgPath);
function addSegmentToProfile(profile, segment2) {
  profile.segments.push(segment2);
  profile.arcLength += segment2.arcLength;
}
function getArg(command, argumentIndex) {
  return command[argumentIndex + 1];
}
function getVector2(command, argumentIndex) {
  return new Vector2(command[argumentIndex + 1], command[argumentIndex + 2]);
}
function getPoint(command, argumentIndex, isRelative, currentPoint) {
  const point = getVector2(command, argumentIndex);
  return isRelative ? currentPoint.add(point) : point;
}
function reflectControlPoint(control, currentPoint) {
  return currentPoint.add(currentPoint.sub(control));
}
function updateMinSin(profile) {
  for (let i = 0; i < profile.segments.length; i++) {
    const segmentA = profile.segments[i];
    const segmentB = profile.segments[(i + 1) % profile.segments.length];
    const startVector = segmentA.getPoint(1).tangent.scale(-1);
    const endVector = segmentB.getPoint(0).tangent;
    const dot = startVector.dot(endVector);
    const angleBetween = Math.acos(clamp(-1, 1, dot));
    const angleSin = Math.sin(angleBetween / 2);
    profile.minSin = Math.min(profile.minSin, Math.abs(angleSin));
  }
}
function getPathProfile(data) {
  const profile = {
    segments: [],
    arcLength: 0,
    minSin: 1
  };
  const segments = parse$1(data);
  let currentPoint = new Vector2(0, 0);
  let firstPoint = null;
  for (const segment2 of segments) {
    const command = segment2[0].toLowerCase();
    const isRelative = segment2[0] === command;
    if (command === "m") {
      currentPoint = getPoint(segment2, 0, isRelative, currentPoint);
      firstPoint = currentPoint;
    } else if (command === "l") {
      const nextPoint = getPoint(segment2, 0, isRelative, currentPoint);
      addSegmentToProfile(profile, new LineSegment(currentPoint, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "h") {
      const x = getArg(segment2, 0);
      const nextPoint = isRelative ? currentPoint.addX(x) : new Vector2(x, currentPoint.y);
      addSegmentToProfile(profile, new LineSegment(currentPoint, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "v") {
      const y = getArg(segment2, 0);
      const nextPoint = isRelative ? currentPoint.addY(y) : new Vector2(currentPoint.x, y);
      addSegmentToProfile(profile, new LineSegment(currentPoint, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "q") {
      const controlPoint = getPoint(segment2, 0, isRelative, currentPoint);
      const nextPoint = getPoint(segment2, 2, isRelative, currentPoint);
      addSegmentToProfile(profile, new QuadBezierSegment(currentPoint, controlPoint, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "t") {
      const lastSegment = profile.segments.at(-1);
      const controlPoint = lastSegment instanceof QuadBezierSegment ? reflectControlPoint(lastSegment.p1, currentPoint) : currentPoint;
      const nextPoint = getPoint(segment2, 0, isRelative, currentPoint);
      addSegmentToProfile(profile, new QuadBezierSegment(currentPoint, controlPoint, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "c") {
      const startControlPoint = getPoint(segment2, 0, isRelative, currentPoint);
      const endControlPoint = getPoint(segment2, 2, isRelative, currentPoint);
      const nextPoint = getPoint(segment2, 4, isRelative, currentPoint);
      addSegmentToProfile(profile, new CubicBezierSegment(currentPoint, startControlPoint, endControlPoint, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "s") {
      const lastSegment = profile.segments.at(-1);
      const startControlPoint = lastSegment instanceof CubicBezierSegment ? reflectControlPoint(lastSegment.p2, currentPoint) : currentPoint;
      const endControlPoint = getPoint(segment2, 0, isRelative, currentPoint);
      const nextPoint = getPoint(segment2, 2, isRelative, currentPoint);
      addSegmentToProfile(profile, new CubicBezierSegment(currentPoint, startControlPoint, endControlPoint, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "a") {
      const radius = getVector2(segment2, 0);
      const angle = getArg(segment2, 2);
      const largeArcFlag = getArg(segment2, 3);
      const sweepFlag = getArg(segment2, 4);
      const nextPoint = getPoint(segment2, 5, isRelative, currentPoint);
      addSegmentToProfile(profile, new ArcSegment(currentPoint, radius, angle, largeArcFlag, sweepFlag, nextPoint));
      currentPoint = nextPoint;
    } else if (command === "z") {
      if (!firstPoint)
        continue;
      if (currentPoint.equals(firstPoint))
        continue;
      addSegmentToProfile(profile, new LineSegment(currentPoint, firstPoint));
      currentPoint = firstPoint;
    }
  }
  updateMinSin(profile);
  return profile;
}
var __decorate = globalThis && globalThis.__decorate || function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Path extends Curve {
  constructor(props) {
    super(props);
    this.currentProfile = createSignal(null);
    this.canHaveSubpath = true;
  }
  profile() {
    return this.currentProfile() ?? getPathProfile(this.data());
  }
  childrenBBox() {
    const points = this.profile().segments.flatMap((segment2) => segment2.points);
    return BBox.fromPoints(...points);
  }
  lineWidthCoefficient() {
    const join = this.lineJoin();
    let coefficient = super.lineWidthCoefficient();
    if (join === "miter") {
      const { minSin } = this.profile();
      if (minSin > 0) {
        coefficient = Math.max(coefficient, 0.5 / minSin);
      }
    }
    return coefficient;
  }
  processSubpath(path, startPoint, endPoint) {
    if (startPoint && endPoint && startPoint.equals(endPoint)) {
      path.closePath();
    }
  }
  *tweenData(newPath, time, timingFunction) {
    const fromProfile = this.profile();
    const toProfile = getPathProfile(isReactive(newPath) ? newPath() : newPath);
    const interpolator = createCurveProfileLerp(fromProfile, toProfile);
    this.currentProfile(fromProfile);
    yield* tween(time, (value) => {
      const progress = timingFunction(value);
      this.currentProfile(interpolator(progress));
    }, () => {
      this.currentProfile(null);
      this.data(newPath);
    });
  }
  drawOverlay(context, matrix) {
    const box = this.childrenBBox().transformCorners(matrix);
    const size = this.computedSize();
    const offset = size.mul(this.offset()).scale(0.5).transformAsPoint(matrix);
    const segments = this.profile().segments;
    context.lineWidth = 1;
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.save();
    context.setTransform(matrix);
    let endPoint = null;
    let path = new Path2D();
    for (const segment2 of segments) {
      if (endPoint && !segment2.getPoint(0).position.equals(endPoint)) {
        context.stroke(path);
        path = new Path2D();
        endPoint = null;
      }
      const [, end] = segment2.draw(path, 0, 1, endPoint == null);
      endPoint = end.position;
    }
    context.stroke(path);
    context.restore();
    context.beginPath();
    drawPivot(context, offset);
    context.stroke();
    context.beginPath();
    drawLine(context, box);
    context.closePath();
    context.stroke();
  }
}
__decorate([
  signal()
], Path.prototype, "data", void 0);
__decorate([
  computed()
], Path.prototype, "profile", null);
__decorate([
  threadable()
], Path.prototype, "tweenData", null);
let meta;
meta ?? (meta = new MetaFile("Discovery", false));
meta.loadData({
  "version": 0,
  "timeEvents": [],
  "seed": 4032315185
});
const metaFile = meta;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
class Laptop extends Rect {
  constructor(props) {
    let stroke = palette.light;
    if (typeof (props == null ? void 0 : props.dim) === "number") {
      stroke = palette.light700;
    } else if (typeof (props == null ? void 0 : props.dim) === "function" && props.dim()) {
      stroke = palette.light700;
    }
    super({
      width: 200,
      height: 120,
      ...props
    });
    this.add(
      /* @__PURE__ */ jsx(Layout, { layout: false, x: -100, y: -60, children: [
        /* @__PURE__ */ jsx(Path, { lineWidth: 2, stroke, data: "m13.14,116.61V4.43c0-1.43,1.16-2.6,2.6-2.6h172.19c1.43,0,2.6,1.16,2.6,2.6v112.18" }),
        this.label() && /* @__PURE__ */ jsx(Label, { textAlign: "center", x: 100, y: 60, text: this.label() }),
        /* @__PURE__ */ jsx(Path, { lineWidth: 2, stroke, data: "m1.83,115.72h200v4.93c0,1.66-1.35,3.01-3.01,3.01H4.84c-1.66,0-3.01-1.35-3.01-3.01v-4.93h0Z" })
      ] })
    );
  }
}
__decorateClass$1([
  initial(1),
  signal()
], Laptop.prototype, "dim", 2);
__decorateClass$1([
  initial(""),
  signal()
], Laptop.prototype, "label", 2);
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
class ReqResPair extends Line {
  constructor(props) {
    super({
      stroke: props.accent,
      lineWidth: 4,
      endArrow: true,
      arrowSize: 10,
      end: 0,
      ...props
    });
    this.labelContainer = createRef();
    this.label = createRef();
    this.add(
      /* @__PURE__ */ jsx(
        Rect,
        {
          ref: this.labelContainer,
          layout: true,
          fill: palette.dark,
          position: this.labelPosition(),
          opacity: 0,
          padding: 5,
          children: /* @__PURE__ */ jsx(
            Heading,
            {
              ref: this.label,
              level: 6,
              text: () => this.reqLabel(),
              fill: () => this.accent()
            }
          )
        }
      )
    );
  }
  *request(start, pause, complete) {
    yield* this.requestStart(start);
    yield* waitFor(pause);
    yield* this.requestComplete(complete);
  }
  *response(start, pause, complete) {
    yield* this.responseStart(start);
    yield* waitFor(pause);
    yield* this.responseComplete(complete);
  }
  *requestStart(duration) {
    yield* all(
      this.end(1, duration * 0.5),
      this.labelContainer().opacity(1, duration * 0.7)
    );
  }
  *requestComplete(duration) {
    yield* all(
      this.start(1, duration * 0.5),
      this.labelContainer().opacity(0, duration * 0.5)
    );
    this.endArrow(false);
    this.startArrow(true);
    this.label().text(this.resLabel());
  }
  *responseStart(duration) {
    yield* all(
      this.start(0, duration * 0.5),
      this.labelContainer().opacity(1, duration * 0.5)
    );
  }
  *responseComplete(duration) {
    yield* all(
      this.end(0, duration * 0.5),
      this.labelContainer().opacity(0, duration * 0.5)
    );
    this.endArrow(true);
    this.startArrow(false);
    this.label().text(this.reqLabel());
  }
}
__decorateClass([
  initial(""),
  signal()
], ReqResPair.prototype, "reqLabel", 2);
__decorateClass([
  initial(""),
  signal()
], ReqResPair.prototype, "resLabel", 2);
__decorateClass([
  initial(palette.light),
  colorSignal()
], ReqResPair.prototype, "accent", 2);
__decorateClass([
  initial(void 0),
  signal()
], ReqResPair.prototype, "labelPosition", 2);
const timeBase = 1;
const aliceNodeId = "2ovpybgj3snjmchns44pfn6dbwmdiu4ogfd66xyu72ghexllv6hq";
const aliceNodeIdTrunc = aliceNodeId.slice(0, 8);
const bobNodeId = "2luekswh7o3a5tz4enymovsoksgnpb2qpmxlvifp6ywwjnacihya";
const bobNodeIdTrunc = bobNodeId.slice(0, 8);
const relayUrl = "https://us-1.iroh.network";
const dnsUrl = "dns.iroh.link";
const description = makeScene2D(function* (view) {
  const page = {
    container: createRef(),
    relayServer: createRef(),
    dnsServer: createRef(),
    alice: createRef(),
    bob: createRef(),
    connectRequest: createRef(),
    connectRequestText: createRef(),
    bobDnsRequest: createRef(),
    bobToRelay: createRef(),
    relayToAlice: createRef(),
    bobAliceConn: createRef()
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
      /* @__PURE__ */ jsx(Rect, { layout: true, direction: "column", gap: 10, ref: page.dnsServer, opacity: 0, x: 300, y: layout.row1, children: [
        /* @__PURE__ */ jsx(Server, {}),
        /* @__PURE__ */ jsx(Label, { text: "DNS Server" }),
        /* @__PURE__ */ jsx(Heading, { level: 6, text: dnsUrl })
      ] }),
      /* @__PURE__ */ jsx(Rect, { layout: true, direction: "column", gap: 20, ref: page.alice, opacity: 0, x: -550, y: layout.row2, children: [
        /* @__PURE__ */ jsx(MobilePhone, {}),
        /* @__PURE__ */ jsx(Label, { text: "Alice" }),
        /* @__PURE__ */ jsx(Heading, { level: 6, text: `NodeID: ${aliceNodeIdTrunc}...` })
      ] }),
      /* @__PURE__ */ jsx(Rect, { layout: true, direction: "column", gap: 20, ref: page.connectRequest, x: 390, y: layout.row2 + 150, opacity: 0, children: /* @__PURE__ */ jsx(Label, { ref: page.connectRequestText, text: `connect: ${aliceNodeIdTrunc} (alice)`, fill: categoricalPalette[4] }) }),
      /* @__PURE__ */ jsx(Rect, { ref: page.bob, x: 300, y: layout.row2, layout: true, direction: "column", gap: 20, opacity: 0, padding: 20, children: [
        /* @__PURE__ */ jsx(Laptop, {}),
        /* @__PURE__ */ jsx(Label, { text: "Bob" }),
        /* @__PURE__ */ jsx(Heading, { level: 6, text: `NodeID: ${bobNodeIdTrunc}...` })
      ] }),
      /* @__PURE__ */ jsx(
        ReqResPair,
        {
          ref: page.bobDnsRequest,
          reqLabel: `DNS: _iroh.${aliceNodeIdTrunc}.${dnsUrl} TXT`,
          resLabel: `relay=${relayUrl}`,
          accent: categoricalPalette[0],
          points: () => [
            [page.bob().top().x - 200, page.bob().top().y],
            [page.dnsServer().bottom().x - page.dnsServer().width() / 2, page.dnsServer().bottom().y]
          ],
          labelPosition: [200, 0],
          x: 200,
          y: 0
        }
      ),
      /* @__PURE__ */ jsx(
        ReqResPair,
        {
          ref: page.bobToRelay,
          reqLabel: `ADDRs ${relayUrl}`,
          resLabel: `addrs=[223.456.789.1:1234]`,
          accent: categoricalPalette[1],
          points: () => [
            page.bob().top(),
            page.relayServer().right()
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        ReqResPair,
        {
          ref: page.relayToAlice,
          reqLabel: `ADDRs ${aliceNodeIdTrunc}`,
          resLabel: `addrs=[223.456.789.1:1234]`,
          accent: categoricalPalette[1],
          labelPosition: [-500, 0],
          points: () => [
            page.relayServer().bottom(),
            page.alice().top()
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          ref: page.bobAliceConn,
          points: () => [
            page.bob().left(),
            [page.alice().right().x - 150, page.alice().right().y]
          ],
          stroke: palette.light,
          lineWidth: 4,
          arrowSize: 10,
          endArrow: true,
          startArrow: true,
          end: 0
        }
      )
    ] })
  );
  yield* all(
    page.alice().opacity(1, timeBase * 0.5),
    page.bob().opacity(1, timeBase * 0.6),
    page.relayServer().opacity(1, timeBase * 0.75),
    page.dnsServer().opacity(1, timeBase)
  );
  yield* page.connectRequest().opacity(1, timeBase);
  yield* waitFor(timeBase * 0.5);
  yield* page.bobDnsRequest().request(timeBase * 0.75, timeBase, timeBase * 0.5);
  yield* page.bobDnsRequest().response(timeBase * 0.75, timeBase, timeBase * 0.5);
  yield* page.bobToRelay().request(timeBase * 0.75, timeBase * 0.2, timeBase * 0.5);
  yield* page.relayToAlice().request(timeBase * 0.75, timeBase * 0.2, timeBase * 0.5);
  yield* page.relayToAlice().response(timeBase * 0.75, timeBase * 0.2, timeBase * 0.5);
  yield* page.bobToRelay().response(timeBase * 0.75, timeBase * 0.2, timeBase * 0.5);
  yield* page.bobAliceConn().end(1, timeBase);
  yield* page.connectRequestText().text(`connected! ${aliceNodeIdTrunc}`, timeBase * 0.2);
  yield* waitFor(3);
  yield* page.container().opacity(0, timeBase);
});
description.name = "Discovery";
metaFile.attach(description.meta);
description.onReplaced ?? (description.onReplaced = new ValueDispatcher(description.config));
const config = makeProject({
  scenes: [
    description
  ]
});
const Discovery_project = bootstrap(
  "Discovery.project",
  { "core": "3.15.2", "two": "3.15.2", "ui": "3.15.2", "vitePlugin": "3.15.1" },
  [plugin0()],
  config,
  metaFile$1,
  settings
);
export {
  Discovery_project as default
};
