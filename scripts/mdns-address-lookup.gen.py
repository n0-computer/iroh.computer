#!/usr/bin/env python3
"""Generator for mdns-address-lookup.svg ("Local address lookup over mDNS").

The purely-local discovery method: three devices on the *same* network (an
iPhone, an Android phone and an embedded device) behind one router. There is no
server and no relay — each device periodically multicasts an mDNS announcement
(its EndpointId + local address) to 224.0.0.251:5353. The router fans the packet
out to the other devices, and each device's "knows" panel grows as the
announcements arrive. After every device has announced once, all three know each
other and a direct LAN connection is possible.

The devices are deliberately unnamed: they are identified only by their short
key id (gold key glyph) and their local address, the same things mDNS carries.

One master SMIL loop (CYCLE seconds), constant packet speed (SPEED px/s) so the
multicast dots reach the nearer device first and the farther device a moment
later. SMIL only (no CSS keyframes) so the animation survives the production CSP
(`default-src 'none'`) and Mintlify's <img> embedding on docs.iroh.computer.

Edit this script and run:  python3 mdns-address-lookup.gen.py
Writes ../public/animations/mdns-address-lookup.svg.
The page embeds this via <object>/<img src=... style='width:100%'/>; the
intrinsic aspect ratio comes from the SVG viewBox (VB_W x VB_H).
"""

import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "animations", "mdns-address-lookup.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK, BLUE = "#6366f1", "#d97706", "#888", "#111", "#2563eb"
GOLD = "#eab308"

# ============================ geometry ============================
CX = [150, 410, 670]          # device centers (iPhone, Android, embedded)
KIND = ["iphone", "android", "embedded"]
IDS = ["a4f7…", "8e2b…", "c1d9…"]
ADDRS = ["192.168.0.3", "192.168.0.5", "192.168.0.7"]
DEV_TOP = 250                 # device body top
PH = 92                       # device body height
JX, JY = 410, 115             # router box bottom center
SPEED = 200.0                 # px/second — every multicast dot travels at this speed

ENTRY = [JX - 16, JX, JX + 16]  # distinct router entry x per device (3 separate wires)
DV, DV2 = 60, 72                # bezier control offsets: vertical at the device / at the router
JH = (JX, JY - 10)              # hidden hand-off point inside the router box (where dots split)


def cubic_len(p0, p1, p2, p3, n=64):
    """Numeric arc length of a cubic bezier (for constant-speed packet timing)."""
    total, prev = 0.0, p0
    for i in range(1, n + 1):
        t = i / n
        u = 1 - t
        x = u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0]
        y = u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]
        total += math.hypot(x - prev[0], y - prev[1])
        prev = (x, y)
    return total


def leg_pts(i):
    """Control points for device i's curved leg: leaves the device vertically,
    enters the router vertically at the device's own offset entry point."""
    cx, ex = CX[i], ENTRY[i]
    return ((cx, DEV_TOP), (cx, DEV_TOP - DV), (ex, JY + DV2), (ex, JY))


def leg_d(i):
    p0, p1, p2, p3 = leg_pts(i)
    return f"M {p0[0]} {p0[1]} C {p1[0]} {p1[1]} {p2[0]} {p2[1]} {p3[0]} {p3[1]}"


def packet_d(a, r):
    """Multicast dot path: up the announcer's leg to its entry, across to the
    hidden hand-off point, then down the receiver's leg."""
    pa, pr = leg_pts(a), leg_pts(r)
    return (f"M {pa[0][0]} {pa[0][1]} C {pa[1][0]} {pa[1][1]} {pa[2][0]} {pa[2][1]} {pa[3][0]} {pa[3][1]} "
            f"L {JH[0]} {JH[1]} L {pr[3][0]} {pr[3][1]} "
            f"C {pr[2][0]} {pr[2][1]} {pr[1][0]} {pr[1][1]} {pr[0][0]} {pr[0][1]}")


def leglen(i):
    return cubic_len(*leg_pts(i))


def total_len(a, r):
    return (leglen(a)
            + math.hypot(ENTRY[a] - JH[0], JY - JH[1])
            + math.hypot(JH[0] - ENTRY[r], JH[1] - JY)
            + leglen(r))


# ============================ timeline ============================
# Round-robin: each device announces once; the other two learn it.
rounds = []          # (announcer, launch, receivers, {receiver: arrival})
launch = 1.8
for ai in range(3):
    recs = [i for i in range(3) if i != ai]
    arrs = {ri: launch + total_len(ai, ri) / SPEED for ri in recs}
    rounds.append((ai, launch, recs, arrs))
    launch = max(arrs.values()) + 1.0

LAST_ARR = max(max(a.values()) for *_, a in rounds)
HOLD = 4.0
OUT0 = LAST_ARR + HOLD       # persistent rows fade out before the loop restarts
OUT1 = OUT0 + 0.7
CYCLE = OUT1 + 0.6

# What each device learns and when (sorted so its panel fills top-down).
learned = {i: [] for i in range(3)}
for ai, _, recs, arrs in rounds:
    for ri in recs:
        learned[ri].append((ai, arrs[ri] + 0.15))
for i in learned:
    learned[i].sort(key=lambda t: t[1])


# ============================ SMIL helpers ============================
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


# ============================ key glyphs ============================
def _key_paths(xl, cy, s):
    """The little gold key glyph (bow + shaft + teeth) starting at left edge xl."""
    rb, rh = s * 0.34, s * 0.15
    bx = xl + rb
    hs = s * 0.18
    xr = xl + s * 1.3
    top, bot = cy - hs / 2, cy + hs / 2
    tw = s * 0.13
    return (
        f'<path d="M {bx - rb:.2f} {cy:.2f} a {rb:.2f} {rb:.2f} 0 1 0 {2 * rb:.2f} 0 '
        f'a {rb:.2f} {rb:.2f} 0 1 0 {-2 * rb:.2f} 0 Z '
        f'M {bx - rh:.2f} {cy:.2f} a {rh:.2f} {rh:.2f} 0 1 0 {2 * rh:.2f} 0 '
        f'a {rh:.2f} {rh:.2f} 0 1 0 {-2 * rh:.2f} 0 Z" fill="{GOLD}" fill-rule="evenodd"/>'
        f'<rect x="{bx:.2f}" y="{top:.2f}" width="{xr - bx:.2f}" height="{hs:.2f}" fill="{GOLD}"/>'
        f'<rect x="{xr - tw:.2f}" y="{bot:.2f}" width="{tw:.2f}" height="{s * 0.30:.2f}" fill="{GOLD}"/>'
        f'<rect x="{xr - tw - s * 0.30:.2f}" y="{bot:.2f}" width="{tw:.2f}" height="{s * 0.20:.2f}" fill="{GOLD}"/>'
    )


def key_label(cx, y, text, size, color):
    """Centered: gold key glyph + monospace label (the iroh identity on a device)."""
    s = size
    w, gap = s * 1.3, s * 0.3
    xl = cx - (w + gap + s * 0.6 * len(text)) / 2
    return (_key_paths(xl, y - s * 0.30, s) +
            f'<text x="{xl + w + gap:.2f}" y="{y}" text-anchor="start" '
            f'font-family="{MONO}" font-size="{size}" fill="{color}">{text}</text>')


def key_row(x, y, text, size, color=INK):
    """Left-aligned: gold key glyph at x + monospace label (a learned-peer row)."""
    s = size
    w, gap = s * 1.3, s * 0.3
    return (_key_paths(x, y - s * 0.30, s) +
            f'<text x="{x + w + gap:.2f}" y="{y}" text-anchor="start" '
            f'font-family="{MONO}" font-size="{size}" fill="{color}">{text}</text>')


# ============================ device drawings ============================
def iphone_screen(px0, py0, pw, ph):
    sx0, sx1 = px0 + 3, px0 + pw - 3
    sy0, sy1 = py0 + 3, py0 + ph - 3
    cx = px0 + pw / 2
    no, ni, nd, r = 7, 4, 5, 6
    ny = sy0 + nd
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
        f'fill="none" stroke="{INDIGO}" stroke-width="1"/>'
    )


def phone(cx, keytext, iphone=False):
    pw, ph = 50, PH
    px0 = cx - pw / 2
    if iphone:
        screen = iphone_screen(px0, DEV_TOP, pw, ph)
    else:
        screen = (f'<rect x="{px0+3}" y="{DEV_TOP+3}" width="{pw-6}" height="{ph-6}" rx="6" '
                  f'fill="#eee" stroke="{INDIGO}" stroke-width="1"/>'
                  f'<circle cx="{cx}" cy="{DEV_TOP+8}" r="1.6" fill="{GRAY}"/>')
    return f'''    <rect x="{px0}" y="{DEV_TOP}" width="{pw}" height="{ph}" rx="9" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>
    {screen}
    <rect x="{px0+11}" y="{DEV_TOP+28}" width="{pw-22}" height="16" rx="3" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="{cx}" y="{DEV_TOP+40}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">iroh</text>
    {key_label(cx, DEV_TOP+60, keytext, 8, AMBER)}'''


def embedded(cx, keytext):
    bw, bh = 60, PH
    bx0 = cx - bw / 2
    n = 6
    pins = []
    for i in range(n):
        yy = DEV_TOP + 14 + i * (bh - 28) / (n - 1)
        pins.append(f'<line x1="{bx0-8}" y1="{yy:.1f}" x2="{bx0}" y2="{yy:.1f}" stroke="{GRAY}" stroke-width="1.5"/>')
        pins.append(f'<line x1="{bx0+bw}" y1="{yy:.1f}" x2="{bx0+bw+8}" y2="{yy:.1f}" stroke="{GRAY}" stroke-width="1.5"/>')
    pins_s = "\n    ".join(pins)
    return f'''    {pins_s}
    <rect x="{bx0}" y="{DEV_TOP}" width="{bw}" height="{bh}" rx="3" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>
    <circle cx="{bx0+7}" cy="{DEV_TOP+7}" r="1.6" fill="{GRAY}"/>
    <rect x="{cx-20}" y="{DEV_TOP+28}" width="40" height="16" rx="3" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="{cx}" y="{DEV_TOP+40}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">iroh</text>
    {key_label(cx, DEV_TOP+60, keytext, 8, AMBER)}'''


def device(i):
    if KIND[i] == "iphone":
        body = phone(CX[i], IDS[i], iphone=True)
    elif KIND[i] == "android":
        body = phone(CX[i], IDS[i], iphone=False)
    else:
        body = embedded(CX[i], IDS[i])
    return f'''  <g>
{body}
    <text x="{CX[i]}" y="{DEV_TOP+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="11" fill="{GRAY}">{ADDRS[i]}</text>
  </g>'''


def router(cx, cy):
    """Home router with two side antennas — the exact design used in
    hole-punching-lan.svg (router_lan), minus its gateway-IP label (the network
    is already named by the multicast caption above)."""
    bx, by, bw, bh = cx - 30, cy - 20, 60, 40
    return f'''  <g>
    <polyline points="{bx},{by+bh-5} {bx-10},{by+bh-5} {bx-10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx-10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <polyline points="{bx+bw},{by+bh-5} {bx+bw+10},{by+bh-5} {bx+bw+10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx+bw+10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="3" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{cx+20}" cy="{by+bh-6}" r="1.5" fill="{AMBER}"/>
  </g>'''


# ============================ knowledge panels ============================
def panel(i):
    cx = CX[i]
    w, x, y, h = 168, CX[i] - 84, 364, 64
    rows = [f'    <text x="{x+12}" y="{y+19}" font-family="{MONO}" font-size="11" '
            f'fill="{INDIGO}" font-weight="bold">local knowledge</text>']
    for j, (ai, lt) in enumerate(learned[i]):
        rowy = y + 38 + j * 20
        pts = [(0, 0), (lt, 0), (lt + 0.4, 1), (OUT0, 1), (OUT1, 0), (CYCLE, 0)]
        rows.append(
            f'    <g opacity="0">{anim_opacity(pts)}'
            f'{key_row(x + 14, rowy, f"{IDS[ai]}  {ADDRS[ai]}", 10)}</g>')
    body = "\n".join(rows)
    return f'''  <g>
    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
{body}
  </g>'''


# ============================ multicast packets ============================
wires, packets = [], []
for ai, lnch, recs, arrs in rounds:
    for ri in recs:
        wid = f"mw{ai}{ri}"
        wires.append(f'  <path id="{wid}" d="{packet_d(ai, ri)}" fill="none" stroke="none"/>')
        arr = arrs[ri]
        opa = [(0, 0), (lnch, 0), (lnch + 0.12, 1), (arr - 0.1, 1), (arr + 0.05, 0), (CYCLE, 0)]
        mot = [(0, 0), (lnch, 0), (arr, 1), (CYCLE, 1)]
        packets.append(f'''  <g opacity="0">
    <circle r="4" fill="{BLUE}"/>
    {anim_opacity(opa)}
    {anim_motion(wid, mot)}
  </g>''')
wires = "\n".join(wires)
packets = "\n".join(packets)

# ============================ announce callouts ============================
callouts = []
for ai, lnch, recs, arrs in rounds:
    t0, t1 = lnch - 0.3, max(arrs.values()) + 0.4
    pts = [(0, 0), (t0 - 0.3, 0), (t0, 1), (t1, 1), (t1 + 0.3, 0), (CYCLE, 0)]
    w, h = 176, 44
    x, y = CX[ai] - w / 2, 198
    callouts.append(f'''  <g opacity="0">
    {anim_opacity(pts)}
    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="{x+12}" y="{y+18}" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">mDNS announce</text>
    <text x="{x+12}" y="{y+35}" font-family="{MONO}" font-size="12" fill="{INK}">{IDS[ai]} @ {ADDRS[ai]}</text>
  </g>''')
callouts = "\n".join(callouts)

# ============================ static backdrop ============================
legs = "\n".join(
    f'  <path d="{leg_d(i)}" fill="none" stroke="#b4bac4" stroke-width="1.5"/>'
    for i in range(3))
devices = "\n".join(device(i) for i in range(3))
panels = "\n".join(panel(i) for i in range(3))

VB_X, VB_Y, VB_W, VB_H = 0, 26, 820, 439
svg = f'''<svg viewBox="{VB_X} {VB_Y} {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>

  <!-- multicast group label (two lines) -->
  <text x="{JX}" y="44" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{GRAY}">mDNS multicast</text>
  <text x="{JX}" y="59" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{GRAY}">224.0.0.251:5353</text>

  <!-- LAN legs (device <-> router) -->
{legs}

  <!-- invisible motion paths for the multicast dots -->
{wires}

{router(JX, 95)}

  <!-- devices (no names; identified by key id + local address) -->
{devices}

  <!-- knowledge panels -->
{panels}

  <!-- multicast packets (drawn before callouts so boxes sit on top) -->
{packets}

  <!-- announce callouts -->
{callouts}

  <!-- Timer bar (position in loop) -->
  <rect x="0" y="452" width="0" height="3" fill="#9ca3af">
    <animate attributeName="width" from="0" to="{VB_W}" dur="{CYCLE:.2f}s" repeatCount="indefinite"/>
  </rect>
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}  (CYCLE={CYCLE:.1f}s, last arrival at {LAST_ARR:.1f}s)")
