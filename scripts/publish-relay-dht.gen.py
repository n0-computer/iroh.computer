#!/usr/bin/env python3
"""Generator for publish-relay-dht.svg ("Mainline DHT based address lookup").

The fully peer-to-peer variant of the DNS discovery figure. Instead of one
server (dns.iroh.link) there is a cloud (the Mainline DHT) holding many nodes.
Bob publishes his signed record to several random DHT nodes (green); Alice
resolves it by querying several random nodes (blue).

All dots travel at the same speed, so they reach their nodes (and return) at
different times depending on distance. No arrowheads — the moving dots show the
direction. The answer is revealed as soon as the FIRST query response returns.

One master SMIL loop (CYCLE seconds): publish -> Alice resolves -> arrows fade
out -> final state holds ~10s -> loop.

Edit this script and run:  python3 publish-relay-dht.gen.py
Writes ../public/blog/how-iroh-works/publish-relay-dht.svg.
Keep the MDX <div> aspectRatio in sync with VB_W / VB_H.
"""

import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "blog", "how-iroh-works", "publish-relay-dht.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK = "#6366f1", "#d97706", "#888", "#111"
GREEN, BLUE, RED = "#15803d", "#2563eb", "#dc2626"
SPEED = 150.0   # px/second — same for every dot


def arc(x1, y1, x2, y2, k=0.16):
    mx, my = (x1+x2)/2, (y1+y2)/2
    dx, dy = x2-x1, y2-y1
    L = math.hypot(dx, dy)
    px, py = -dy/L, dx/L
    if py > 0:
        px, py = -px, -py
    cx, cy = mx+px*k*L, my+py*k*L
    d = f"M {x1:.0f} {y1:.0f} Q {cx:.0f} {cy:.0f} {x2:.0f} {y2:.0f}"
    def q(t, a, b, c): return (1-t)**2*a + 2*(1-t)*t*b + t**2*c
    N, length, prev = 50, 0.0, (x1, y1)
    for i in range(1, N+1):
        t = i/N
        cur = (q(t, x1, cx, x2), q(t, y1, cy, y2))
        length += math.hypot(cur[0]-prev[0], cur[1]-prev[1])
        prev = cur
    return d, length


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


# ============================ geometry ============================
# DHT cloud (soft, fill-only overlapping circles)
cloud_circles = [(320, 150, 56), (392, 124, 62), (462, 130, 58), (524, 156, 50),
                 (360, 172, 56), (442, 178, 56), (292, 174, 40), (548, 182, 38)]
nodes = [(320, 162), (376, 138), (432, 172), (484, 142), (528, 168), (402, 196)]
pub_nodes = nodes[0:5]      # Bob publishes to these
look_nodes = nodes[1:6]     # Alice queries these

bx0, by0 = 96, 296
bcx = bx0+24
PH = 88
bob_top = (bcx, by0)

ax0, ay0 = 664, 296
acx = ax0+24
alice_top = (acx, ay0)

# ============================ timeline (constant speed) ============================
PUB_LAUNCH = 1.5
pub = []  # (path_d, arrival_time)
for n in pub_nodes:
    d, L = arc(bob_top[0], bob_top[1], n[0], n[1], k=0.16)
    pub.append((d, PUB_LAUNCH + L/SPEED))
PUB_DONE = max(t for _, t in pub)

ALICE_IN = PUB_DONE + 0.3
LOOK_LAUNCH = ALICE_IN + 1.2
look = []  # (path_d, reach_node_time, back_at_alice_time, has_data)
for n in look_nodes:
    d, L = arc(n[0], n[1], alice_top[0], alice_top[1], k=0.16)
    half = L/SPEED
    look.append((d, LOOK_LAUNCH + half, LOOK_LAUNCH + 2*half, n in pub_nodes))
FIRST_VALID = min(b for _, _, b, ok in look if ok)   # first node that actually has the data
LAST_RETURN = max(b for _, _, b, _ in look)

HOLD = 5.0
ARROWS_GONE = LAST_RETURN + 0.6
CYCLE = ARROWS_GONE + HOLD + 0.6
OUT0, OUT1 = CYCLE - 0.6, CYCLE - 0.2   # persistent elements fade out before loop


def anim_opacity(points):
    times = ";".join(f"{t/CYCLE:.4f}" for t, _ in points)
    vals = ";".join(str(v) for _, v in points)
    return (f'<animate attributeName="opacity" dur="{CYCLE:.2f}s" repeatCount="indefinite" '
            f'calcMode="linear" values="{vals}" keyTimes="{times}"/>')


def anim_motion(wire_id, points):
    times = ";".join(f"{t/CYCLE:.4f}" for t, _ in points)
    kp = ";".join(str(k) for _, k in points)
    return (f'<animateMotion dur="{CYCLE:.2f}s" repeatCount="indefinite" calcMode="linear" '
            f'keyPoints="{kp}" keyTimes="{times}"><mpath href="#{wire_id}"/></animateMotion>')


def dot(wire_id, color, opa_pts, mot_pts):
    return f'''  <g opacity="0">
    <circle r="4" fill="{color}"/>
    {anim_opacity(opa_pts)}
    {anim_motion(wire_id, mot_pts)}
  </g>'''


def answer_dot(wire_id, color_down, launch, reach, back):
    # query goes up blue, answer comes back coloured (green=valid, red=no data)
    up = [(0, 0), (launch, 0), (launch+0.15, 1), (reach-0.05, 1), (reach, 0), (CYCLE, 0)]
    down = [(0, 0), (reach, 0), (reach+0.05, 1), (back-0.05, 1), (back+0.1, 0), (CYCLE, 0)]
    mot = [(0, 1), (launch, 1), (reach, 0), (back, 1), (CYCLE, 1)]
    return f'''  <g>
    {anim_motion(wire_id, mot)}
    <circle r="4" fill="{BLUE}" opacity="0">{anim_opacity(up)}</circle>
    <circle r="4" fill="{color_down}" opacity="0">{anim_opacity(down)}</circle>
  </g>'''


# ============================ static backdrop ============================
cloud = ['  <!-- Mainline DHT cloud -->', '  <g>']
for cx, cy, r in cloud_circles:
    cloud.append(f'    <circle cx="{cx}" cy="{cy}" r="{r}" fill="#d1d5db"/>')
cloud.append(f'    <text x="418" y="104" text-anchor="middle" font-family="{MONO}" font-size="15" fill="{INK}">Mainline DHT</text>')
cloud.append('  </g>')
cloud = "\n".join(cloud)

# nodes are black; a published node turns green when its message arrives (one is never reached)
nd = ['  <!-- DHT nodes (black; turn green when Bob\'s record arrives) -->', '  <g>']
for x, y in nodes:
    nd.append(f'    <circle cx="{x}" cy="{y}" r="4.5" fill="#111"/>')
for i, (x, y) in enumerate(pub_nodes):
    arr = pub[i][1]
    g_pts = [(0, 0), (arr, 0), (arr+0.3, 1), (OUT0, 1), (OUT1, 0), (CYCLE, 0)]
    nd.append(f'    <circle cx="{x}" cy="{y}" r="4.5" fill="{GREEN}" opacity="0">{anim_opacity(g_pts)}</circle>')
nd.append('  </g>')
node_dots = "\n".join(nd)

bob = f'''  <!-- Bob (publisher) -->
  <g>
{phone(bx0, by0, "8e2b…")}
    <text x="{bcx}" y="{by0+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Bob</text>
  </g>
  <g font-family="{MONO}" font-size="11" fill="{GRAY}">
    <text x="{bx0+66}" y="{by0+30}"><tspan font-weight="bold">NodeId:</tspan> 8e2b…</text>
    <text x="{bx0+66}" y="{by0+50}"><tspan font-weight="bold">Home relay:</tspan> us-east</text>
  </g>'''

alice_pts = [(0, 0), (ALICE_IN, 0), (ALICE_IN+0.6, 1), (OUT0, 1), (OUT1, 0), (CYCLE, 0)]
result_pts = [(0, 0), (FIRST_VALID, 0), (FIRST_VALID+0.5, 1), (OUT0, 1), (OUT1, 0), (CYCLE, 0)]
alice = f'''  <!-- Alice (resolver) -->
  <g opacity="0">
    {anim_opacity(alice_pts)}
{phone(ax0, ay0, "1a9c…", iphone=True)}
    <text x="{acx}" y="{ay0+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Alice</text>
  </g>
  <text x="{ax0-14}" y="{ay0+46}" text-anchor="end" font-family="{MONO}" font-size="11" fill="{INK}" opacity="0">8e2b… is at relay us-east{anim_opacity(result_pts)}</text>'''

# ============================ wires + dots ============================
pub_wire_pts = [(0, 0), (0.6, 0), (1.0, 1), (PUB_DONE, 1), (PUB_DONE+0.5, 0), (CYCLE, 0)]
look_wire_pts = [(0, 0), (LOOK_LAUNCH-0.6, 0), (LOOK_LAUNCH, 1), (LAST_RETURN, 1), (LAST_RETURN+0.6, 0), (CYCLE, 0)]
wires, packets = [], []
for i, (d, arr) in enumerate(pub):
    wires.append(f'  <path id="pw{i}" d="{d}" fill="none" stroke="#b4bac4" stroke-width="1.5" opacity="0">{anim_opacity(pub_wire_pts)}</path>')
    opa = [(0, 0), (PUB_LAUNCH, 0), (PUB_LAUNCH+0.15, 1), (arr-0.05, 1), (arr+0.1, 0), (CYCLE, 0)]
    mot = [(0, 0), (PUB_LAUNCH, 0), (arr, 1), (CYCLE, 1)]
    packets.append(dot(f"pw{i}", BLUE, opa, mot))
for i, (d, reach, back, ok) in enumerate(look):
    wires.append(f'  <path id="lw{i}" d="{d}" fill="none" stroke="#b4bac4" stroke-width="1.5" opacity="0">{anim_opacity(look_wire_pts)}</path>')
    packets.append(answer_dot(f"lw{i}", GREEN if ok else RED, LOOK_LAUNCH, reach, back))
wires = "\n".join(wires)
packets = "\n".join(packets)

# ============================ callouts ============================
pub_co_pts = [(0, 0), (1.6, 0), (2.0, 1), (PUB_DONE, 1), (PUB_DONE+0.5, 0), (CYCLE, 0)]
pub_co = f'''  <!-- DHT put callout (write) -->
  <g opacity="0">
    {anim_opacity(pub_co_pts)}
    <rect x="40" y="150" width="216" height="70" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="54" y="172" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">DHT put</text>
    <text x="54" y="192" font-family="{MONO}" font-size="12" fill="{INK}">8e2b…</text>
    <text x="54" y="210" font-family="{MONO}" font-size="12" fill="{INK}"><tspan font-weight="bold">Relay:</tspan> us-east</text>
  </g>'''

# DHT get callout (read request) — same box as the answer, shown until the answer arrives
read_pts = [(0, 0), (LOOK_LAUNCH-0.3, 0), (LOOK_LAUNCH+0.1, 1), (FIRST_VALID-0.1, 1), (FIRST_VALID+0.3, 0), (CYCLE, 0)]
read_co = f'''  <!-- DHT get callout (read request) -->
  <g opacity="0">
    {anim_opacity(read_pts)}
    <rect x="452" y="236" width="300" height="54" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="466" y="258" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">DHT get</text>
    <text x="466" y="278" font-family="{MONO}" font-size="12" fill="{INK}">8e2b…</text>
  </g>'''

# answer popup is visible while the dots are still travelling, then vanishes
ans_pts = [(0, 0), (FIRST_VALID, 0), (FIRST_VALID+0.4, 1), (LAST_RETURN, 1), (LAST_RETURN+0.6, 0), (CYCLE, 0)]
ans_co = f'''  <!-- ANSWER SECTION callout (shown on first valid response) -->
  <g opacity="0">
    {anim_opacity(ans_pts)}
    <rect x="452" y="236" width="300" height="54" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="466" y="258" font-family="{MONO}" font-size="12" fill="{INK}">;; ANSWER SECTION:</text>
    <text x="466" y="278" font-family="{MONO}" font-size="12" fill="{BLUE}" font-weight="bold">TXT "relay=https://us-east"</text>
  </g>'''

VB_X, VB_Y, VB_W, VB_H = 0, 44, 820, 376
svg = f'''<svg viewBox="{VB_X} {VB_Y} {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>
{cloud}

{wires}

{node_dots}

{bob}

{alice}

{packets}

{pub_co}

{read_co}

{ans_co}

  <!-- Timer bar (position in loop) -->
  <rect x="0" y="416" width="0" height="3" fill="#9ca3af">
    <animate attributeName="width" from="0" to="820" dur="{CYCLE:.2f}s" repeatCount="indefinite"/>
  </rect>
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}  (CYCLE={CYCLE:.1f}s, first valid answer at {FIRST_VALID:.1f}s)")
