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
It writes ../public/blog/how-iroh-works/publish-relay.svg.
Keep the MDX <div> aspectRatio in sync with VB_W / VB_H.
"""

import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "blog", "how-iroh-works", "publish-relay.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK = "#6366f1", "#d97706", "#888", "#374151"
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


def phone(px0, py0, keytext):
    pw, ph = 48, 88
    cx = px0+pw/2
    return f'''    <rect x="{px0}" y="{py0}" width="{pw}" height="{ph}" rx="9" fill="#fff" stroke="{INDIGO}" stroke-width="1.5"/>
    <rect x="{px0+3}" y="{py0+3}" width="{pw-6}" height="{ph-6}" rx="6" fill="none" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="{cx}" cy="{py0+8}" r="1.6" fill="{GRAY}"/>
    <rect x="{px0+10}" y="{py0+26}" width="{pw-20}" height="16" rx="3" fill="none" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="{cx}" y="{py0+38}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">iroh</text>
    <text x="{cx}" y="{py0+58}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">🔑 {keytext}</text>'''


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
       f'    <rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="3" fill="#fff" stroke="{GRAY}" stroke-width="1.5"/>']
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
  <g font-family="{MONO}" font-size="11">
{chr(10).join(rec_lines)}
    <text x="{rec_x}" y="{ynew}" fill="{INK}" font-weight="bold" opacity="0">8e2b… → us-east{anim_opacity(rec_pts)}</text>
  </g>'''

# ============================ Alice (right, resolver) ============================
ax0, ay0 = 664, 296
acx = ax0+24
alice_pts = [(0, 0), (3.8, 0), (4.4, 1), (13.8, 1), (14.2, 0), (CYCLE, 0)]
result_pts = [(0, 0), (8.0, 0), (8.5, 1), (13.8, 1), (14.2, 0), (CYCLE, 0)]
alice = f'''  <!-- Alice (resolver) — appears after Bob's record is published -->
  <g opacity="0">
    {anim_opacity(alice_pts)}
{phone(ax0, ay0, "1a9c…")}
    <text x="{acx}" y="{ay0+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Alice</text>
  </g>
  <!-- resolved result, appears as the answer comes back -->
  <text x="{ax0-14}" y="{ay0+46}" text-anchor="end" font-family="{MONO}" font-size="11" fill="{INK}" opacity="0">8e2b… is at relay us-east{anim_opacity(result_pts)}</text>'''

# ============================ wires ============================
put_d = arc(bcx, by0, sx+18, sy+sh, k=0.18)            # Bob -> server
lookup_d = arc(sx+sw-18, sy+sh, acx, ay0, k=0.18)      # server -> Alice (answer direction)
put_wire_pts = [(0, 0), (0.6, 0), (1.0, 1), (4.0, 1), (4.5, 0), (CYCLE, 0)]
lookup_wire_pts = [(0, 0), (4.4, 0), (5.0, 1), (8.3, 1), (8.8, 0), (CYCLE, 0)]
wires = f'''  <path id="put-wire" d="{put_d}" fill="none" stroke="{BLUE}" stroke-width="1.5" opacity="0">{anim_opacity(put_wire_pts)}</path>
  <path id="lookup-wire" d="{lookup_d}" fill="none" stroke="{BLUE}" stroke-width="1.5" opacity="0">{anim_opacity(lookup_wire_pts)}</path>'''

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
    <rect x="40" y="150" width="200" height="70" rx="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
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
    <rect x="470" y="158" width="330" height="56" rx="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
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
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
