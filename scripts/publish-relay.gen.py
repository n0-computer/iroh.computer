#!/usr/bin/env python3
"""Generator for publish-relay.svg (the "Publishing the home relay" figure).

Adapted from rklaehn's "DNS discovery" slide, restyled to match the other
how-iroh-works figures. No map. Our device "Bob" (left) publishes its current
home relay to the vanilla DNS server dns.iroh.link with a signed DNS packet sent
as an HTTPS PUT (green). Alice (right) resolves it with a DNS lookup (blue).
Continues the endpoint-startup story (Bob's home relay = us-east, key 8e2b...).

One master loop (CYCLE seconds), driven entirely by SMIL so every element stays
in sync: publish once -> record added -> Alice resolves once -> arrows fade out
-> final state holds ~10s -> loop.

To change it, edit this script and run:  python3 publish-relay.gen.py
It writes ../public/animations/publish-relay.svg.
The page embeds this via <object>/<img src=... style='width:100%'/>; the
intrinsic aspect ratio comes from the SVG viewBox (VB_W x VB_H).
"""

import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "animations", "publish-relay.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK = "#6366f1", "#d97706", "#888", "#111"
GREEN, BLUE = "#15803d", "#2563eb"

CYCLE = 14.5  # seconds for one full loop (~5s static hold)


def anim_opacity(points):
    times = ";".join(f"{t/CYCLE:.4f}" for t, _ in points)
    vals = ";".join(str(v) for _, v in points)
    return (f'<animate attributeName="opacity" dur="{CYCLE}s" repeatCount="indefinite" '
            f'calcMode="linear" values="{vals}" keyTimes="{times}"/>')


def anim_motion(wire_id, points):
    times = ";".join(f"{t/CYCLE:.4f}" for t, _ in points)
    kp = ";".join(str(k) for _, k in points)
    return (f'<animateMotion dur="{CYCLE}s" repeatCount="indefinite" calcMode="linear" '
            f'keyPoints="{kp}" keyTimes="{times}"><mpath href="#{wire_id}"/></animateMotion>')


def arc(x1, y1, x2, y2, k=0.16):
    mx, my = (x1+x2)/2, (y1+y2)/2
    dx, dy = x2-x1, y2-y1
    L = math.hypot(dx, dy)
    px, py = -dy/L, dx/L
    if py > 0:
        px, py = -px, -py
    cx, cy = mx+px*k*L, my+py*k*L
    return f"M {x1:.0f} {y1:.0f} Q {cx:.0f} {cy:.0f} {x2:.0f} {y2:.0f}"


def key_label(cx, y, text, size, color):
    """A tiny drawn gold key (bow + shaft + teeth) + monospace label, centered on cx
    (replaces the 🔑 emoji, which no pure-vector renderer can draw)."""
    s = size
    gold = "#eab308"
    w = s * 1.3            # key glyph width
    gap = s * 0.3
    xl = cx - (w + gap + s * 0.6 * len(text)) / 2
    cy = y - s * 0.30
    rb, rh = s * 0.34, s * 0.15        # bow outer / hole radius
    bx = xl + rb                       # bow center x
    hs = s * 0.18                      # shaft thickness
    xr = xl + w                        # right end
    top, bot = cy - hs / 2, cy + hs / 2
    tw = s * 0.13                      # tooth width
    mono = "'Space Mono', monospace"
    return (
        f'<path d="M {bx - rb:.2f} {cy:.2f} a {rb:.2f} {rb:.2f} 0 1 0 {2 * rb:.2f} 0 '
        f'a {rb:.2f} {rb:.2f} 0 1 0 {-2 * rb:.2f} 0 Z '
        f'M {bx - rh:.2f} {cy:.2f} a {rh:.2f} {rh:.2f} 0 1 0 {2 * rh:.2f} 0 '
        f'a {rh:.2f} {rh:.2f} 0 1 0 {-2 * rh:.2f} 0 Z" fill="{gold}" fill-rule="evenodd"/>'
        f'<rect x="{bx:.2f}" y="{top:.2f}" width="{xr - bx:.2f}" height="{hs:.2f}" fill="{gold}"/>'
        f'<rect x="{xr - tw:.2f}" y="{bot:.2f}" width="{tw:.2f}" height="{s * 0.30:.2f}" fill="{gold}"/>'
        f'<rect x="{xr - tw - s * 0.30:.2f}" y="{bot:.2f}" width="{tw:.2f}" height="{s * 0.20:.2f}" fill="{gold}"/>'
        f'<text x="{xl + w + gap:.2f}" y="{y}" text-anchor="start" font-family="{mono}" font-size="{size}" fill="{color}">{text}</text>'
    )


def iphone_screen(px0, py0, pw, ph, indigo):
    """iPhone-style screen outline path (with notch) sized to fit inside an outer body of pw x ph."""
    sx0, sx1 = px0+3, px0+pw-3
    sy0, sy1 = py0+3, py0+ph-3
    cx = px0 + pw/2
    no = 7   # outer notch half-width
    ni = 4   # inner notch half-width
    nd = 5   # notch depth
    ny = sy0 + nd
    r = 6    # screen corner radius
    return (
        f'<path d="M {sx0+r} {sy0} '
        f'L {cx-no} {sy0} Q {cx-no+2} {sy0} {cx-no+2} {sy0+2} '
        f'L {cx-no+2} {sy0+3} Q {cx-no+2} {ny} {cx-ni} {ny} '
        f'L {cx+ni} {ny} Q {cx+no-2} {ny} {cx+no-2} {sy0+3} '
        f'L {cx+no-2} {sy0+2} Q {cx+no-2} {sy0} {cx+no} {sy0} '
        f'L {sx1-r} {sy0} A {r} {r} 0 0 1 {sx1} {sy0+r} '
        f'L {sx1} {sy1-r} A {r} {r} 0 0 1 {sx1-r} {sy1} '
        f'L {sx0+r} {sy1} A {r} {r} 0 0 1 {sx0} {sy1-r} '
        f'L {sx0} {sy0+r} A {r} {r} 0 0 1 {sx0+r} {sy0} Z" '
        f'fill="none" stroke="{indigo}" stroke-width="1"/>'
    )

def phone(px0, py0, keytext, iphone=False):
    pw, ph = 48, 88
    cx = px0+pw/2
    if iphone:
        screen = iphone_screen(px0, py0, pw, ph, INDIGO)
    else:
        screen = f'<rect x="{px0+3}" y="{py0+3}" width="{pw-6}" height="{ph-6}" rx="6" fill="#eee" stroke="{INDIGO}" stroke-width="1"/>\n    <circle cx="{cx}" cy="{py0+8}" r="1.6" fill="{GRAY}"/>'
    return f'''    <rect x="{px0}" y="{py0}" width="{pw}" height="{ph}" rx="9" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>
    {screen}
    <rect x="{px0+10}" y="{py0+26}" width="{pw-20}" height="16" rx="3" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="{cx}" y="{py0+38}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">iroh</text>
    {key_label(cx, py0+58, keytext, 8, AMBER)}'''


def doc_packet(wire_id, color, opa_pts, mot_pts):
    # a simple dot riding a wire (the popup explains what the request is)
    return f'''  <g opacity="0">
    <circle r="4" fill="{color}"/>
    {anim_opacity(opa_pts)}
    {anim_motion(wire_id, mot_pts)}
  </g>'''


# ============================ static backdrop ============================

# dns.iroh.link server, top-center (vanilla 3U rack, gray LEDs)
sx, sy, sw, sh = 378, 56, 64, 66
scx = sx+sw/2
srv = ['  <!-- dns.iroh.link server (vanilla) -->', '  <g>',
       f'    <rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="3" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>']
for i in range(3):
    ry = sy + 4 + i*21
    srv.append(f'    <circle cx="{sx+8}" cy="{ry+8}" r="1.6" fill="{GRAY}"/>')
    srv.append(f'    <circle cx="{sx+14}" cy="{ry+8}" r="1.6" fill="{GRAY}"/>')
    for j in range(6):
        vx = sx+24+j*5
        srv.append(f'    <line x1="{vx}" y1="{ry+3}" x2="{vx}" y2="{ry+13}" stroke="{GRAY}" stroke-width="1"/>')
    if i < 2:
        yy = sy+4+(i+1)*21-2
        srv.append(f'    <line x1="{sx+2}" y1="{yy}" x2="{sx+sw-2}" y2="{yy}" stroke="{GRAY}" stroke-width="1"/>')
srv.append(f'    <text x="{scx}" y="{sy+sh+22}" text-anchor="middle" font-family="{MONO}" font-size="14" fill="{INK}">dns.iroh.link</text>')
srv.append('  </g>')
server = "\n".join(srv)

# Bob (left, publisher) — always present
bx0, by0 = 96, 296
bcx = bx0+24
PH = 88
bob = f'''  <!-- Bob (publisher) -->
  <g>
{phone(bx0, by0, "8e2b…")}
    <text x="{bcx}" y="{by0+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Bob</text>
  </g>
  <g font-family="{MONO}" font-size="11" fill="{GRAY}">
    <text x="{bx0+66}" y="{by0+30}"><tspan font-weight="bold">NodeId:</tspan> 8e2b…</text>
    <text x="{bx0+66}" y="{by0+50}"><tspan font-weight="bold">Home relay:</tspan> us-east</text>
  </g>'''

# ============================ records on the server ============================
rec_x = sx+sw+30
existing = [("1f3a…", "eu-west"), ("7c0e…", "us-west"),
            ("b48d…", "us-east"), ("2a91…", "eu-west")]
rlh, ry0 = 16, 60
rec_lines = [f'    <text x="{rec_x}" y="{ry0+i*rlh}" fill="{GRAY}">{k} → {r}</text>'
             for i, (k, r) in enumerate(existing)]
ynew = ry0 + len(existing)*rlh
rec_pts = [(0, 0), (3.5, 0), (4.0, 1), (13.8, 1), (14.2, 0), (CYCLE, 0)]
record = f'''  <!-- server records; Bob's entry is added when his PUT arrives, removed on loop -->
  <rect x="{rec_x-10}" y="{ry0-14}" width="150" height="{(len(existing)+1)*rlh + 6}" rx="4" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
  <g font-family="{MONO}" font-size="11">
{chr(10).join(rec_lines)}
    <text x="{rec_x}" y="{ynew}" fill="{INK}" font-weight="bold" opacity="0">8e2b… → us-east{anim_opacity(rec_pts)}</text>
  </g>'''

# ============================ Alice (right, resolver) ============================
ax0, ay0 = 664, 296
acx = ax0+24
alice_pts = [(0, 0), (3.8, 0), (4.4, 1), (13.8, 1), (14.2, 0), (CYCLE, 0)]
result_pts = [(0, 0), (8.0, 0), (8.5, 1), (13.8, 1), (14.2, 0), (CYCLE, 0)]
RES_LABEL = "8e2b… is at relay us-east"
res_w = len(RES_LABEL) * 11 * 0.6   # Space Mono advance ≈ 0.6em at 11px
res_xr, res_yb = ax0 - 14, ay0 + 46  # right edge / baseline of the result text
alice = f'''  <!-- Alice (resolver) — appears after Bob's record is published -->
  <g opacity="0">
    {anim_opacity(alice_pts)}
{phone(ax0, ay0, "1a9c…", iphone=True)}
    <text x="{acx}" y="{ay0+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Alice</text>
  </g>
  <!-- resolved result; boxed so the dark ink stays readable in dark mode -->
  <g opacity="0">
    {anim_opacity(result_pts)}
    <rect x="{res_xr - res_w - 7:.1f}" y="{res_yb - 13}" width="{res_w + 14:.1f}" height="18" rx="4" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="{res_xr}" y="{res_yb}" text-anchor="end" font-family="{MONO}" font-size="11" fill="{INK}">{RES_LABEL}</text>
  </g>'''

# ============================ wires ============================
put_d = arc(bcx, by0, sx+18, sy+sh, k=0.18)            # Bob -> server
lookup_d = arc(sx+sw-18, sy+sh, acx, ay0, k=0.18)      # server -> Alice (answer direction)
put_wire_pts = [(0, 0), (0.6, 0), (1.0, 1), (4.0, 1), (4.5, 0), (CYCLE, 0)]
lookup_wire_pts = [(0, 0), (4.4, 0), (5.0, 1), (8.3, 1), (8.8, 0), (CYCLE, 0)]
wires = f'''  <path id="put-wire" d="{put_d}" fill="none" stroke="#b4bac4" stroke-width="1.5" opacity="0">{anim_opacity(put_wire_pts)}</path>
  <path id="lookup-wire" d="{lookup_d}" fill="none" stroke="#b4bac4" stroke-width="1.5" opacity="0">{anim_opacity(lookup_wire_pts)}</path>'''

# ============================ packets ============================
# PUT: Bob(0) -> server(1), fades out as it lands (~3.5s)
put_pkt = doc_packet("put-wire", BLUE,
                     [(0, 0), (1.5, 0), (1.7, 1), (3.4, 1), (3.6, 0), (CYCLE, 0)],
                     [(0, 0), (1.5, 0), (3.5, 1), (CYCLE, 1)])
# LOOKUP: on lookup-wire 0=server,1=Alice. Query Alice(1)->server(0), answer server(0)->Alice(1).
lookup_pkt = doc_packet("lookup-wire", BLUE,
                        [(0, 0), (5.0, 0), (5.2, 1), (7.9, 1), (8.1, 0), (CYCLE, 0)],
                        [(0, 1), (5.0, 1), (6.5, 0), (8.0, 1), (CYCLE, 1)])

# ============================ callouts ============================
put_co_pts = [(0, 0), (1.6, 0), (2.0, 1), (4.0, 1), (4.5, 0), (CYCLE, 0)]
put_co = f'''  <!-- HTTPS PUT callout -->
  <g opacity="0">
    {anim_opacity(put_co_pts)}
    <rect x="40" y="150" width="200" height="70" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="54" y="172" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">HTTPS PUT</text>
    <text x="54" y="192" font-family="{MONO}" font-size="12" fill="{INK}"><tspan font-weight="bold">Relay:</tspan> us-east</text>
    <text x="54" y="210" font-family="{MONO}" font-size="12" fill="{INK}"><tspan font-weight="bold">Signed by:</tspan> 8e2b…</text>
  </g>'''

lookup_co_pts = [(0, 0), (4.6, 0), (5.0, 1), (8.3, 1), (8.8, 0), (CYCLE, 0)]
# the query content is shown on the way up, then replaced by the answer as the dot heads back (~6.5s)
query_pts = [(0, 0), (4.6, 0), (5.0, 1), (6.3, 1), (6.6, 0), (CYCLE, 0)]
answer_pts = [(0, 0), (6.4, 0), (6.7, 1), (8.3, 1), (8.7, 0), (CYCLE, 0)]
lookup_co = f'''  <!-- DNS LOOKUP callout: query is replaced by the answer as the response returns -->
  <g opacity="0">
    {anim_opacity(lookup_co_pts)}
    <rect x="470" y="158" width="330" height="56" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <g opacity="0">
      {anim_opacity(query_pts)}
      <text x="484" y="182" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">DNS LOOKUP</text>
      <text x="484" y="202" font-family="{MONO}" font-size="11" fill="{INK}">TXT _iroh.8e2b….dns.iroh.link</text>
    </g>
    <g opacity="0">
      {anim_opacity(answer_pts)}
      <text x="484" y="182" font-family="{MONO}" font-size="12" fill="{INK}">;; ANSWER SECTION:</text>
      <text x="484" y="202" font-family="{MONO}" font-size="12" fill="{BLUE}" font-weight="bold">TXT "relay=https://us-east"</text>
    </g>
  </g>'''

VB_X, VB_Y, VB_W, VB_H = 0, 44, 820, 376
svg = f'''<svg viewBox="{VB_X} {VB_Y} {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>
  <defs>
    <marker id="put-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{GREEN}"/>
    </marker>
    <marker id="lookup-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{BLUE}"/>
    </marker>
  </defs>

{wires}

{server}

{record}

{bob}

{alice}

{put_pkt}
{lookup_pkt}

{put_co}

{lookup_co}

  <!-- Timer bar (position in loop) -->
  <rect x="0" y="416" width="0" height="3" fill="#9ca3af">
    <animate attributeName="width" from="0" to="820" dur="{CYCLE}s" repeatCount="indefinite"/>
  </rect>
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
