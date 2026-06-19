#!/usr/bin/env python3
"""Generator for hole-punching.svg ("Establishing direct connections").

Initial state of the hole-punching story: Alice and Bob, each behind a normal
home router, are connected *through the relay* (us-east) — all data flows up to
the relay and back down. Later steps (CallMeMaybe, address discovery, the ping,
and the direct path) build on this.

Continues the discovery story: Bob = 8e2b…, home relay us-east; Alice = 1a9c….
Same look as the other how-iroh-works figures; all connections blue.

Edit this script and run:  python3 hole-punching.gen.py
Writes ../public/blog/how-iroh-works/hole-punching.svg.
Keep the MDX <div> aspectRatio in sync with VB_W / VB_H.
"""

import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "blog", "how-iroh-works", "hole-punching.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK, BLUE, RED, GREEN = "#6366f1", "#d97706", "#888", "#111", "#2563eb", "#dc2626", "#15803d"
FADED = "#aab2bd"   # inactive/secondary connection — clearly lighter than the structure gray
CYCLE = 39.0   # one loop; popups fade after both checks are green, then the direct path stands alone
T_POPUP_FADE = 29.5   # NAT bubbles fade out here (a few seconds after both mappings are validated)


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


def dot(color, opa_pts, mot_pts, wire="relay-path"):
    return f'''  <g opacity="0">
    <circle r="4" fill="{color}"/>
    {anim_opacity(opa_pts)}
    {anim_motion(wire, mot_pts)}
  </g>'''


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
    pw, ph = 50, 92
    cx = px0+pw/2
    if iphone:
        screen = iphone_screen(px0, py0, pw, ph, INDIGO)
    else:
        screen = f'<rect x="{px0+3}" y="{py0+3}" width="{pw-6}" height="{ph-6}" rx="6" fill="#eee" stroke="{INDIGO}" stroke-width="1"/>\n    <circle cx="{cx}" cy="{py0+8}" r="1.6" fill="{GRAY}"/>'
    return f'''    <rect x="{px0}" y="{py0}" width="{pw}" height="{ph}" rx="9" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>
    {screen}
    <rect x="{px0+11}" y="{py0+28}" width="{pw-22}" height="16" rx="3" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="{cx}" y="{py0+40}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">iroh</text>
    {key_label(cx, py0+60, keytext, 8, AMBER)}'''


def router(cx, cy, pub_ip, lan_ip):
    # same design as the "Guaranteed connections" diagram: public IP above,
    # L-shaped antennas, body, LAN IP below
    bx, by, bw, bh = cx-30, cy-20, 60, 40
    return f'''  <g font-family="{MONO}" font-size="10" fill="{GRAY}">
    <text x="{cx}" y="{by-8}" text-anchor="middle">{pub_ip}</text>
    <polyline points="{bx},{by+bh-5} {bx-10},{by+bh-5} {bx-10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx-10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <polyline points="{bx+bw},{by+bh-5} {bx+bw+10},{by+bh-5} {bx+bw+10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx+bw+10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="3" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{cx+20}" cy="{by+bh-6}" r="1.5" fill="{AMBER}"/>
    <text x="{cx}" y="{by+bh+15}" text-anchor="middle">{lan_ip}</text>
  </g>'''


def relay(cx, cy, label):
    bx, by, bw, bh = cx-32, cy-9, 64, 18
    s = ['  <g>',
         f'    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="2" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>',
         f'    <line x1="{bx+16}" y1="{by+3}" x2="{bx+16}" y2="{by+bh-3}" stroke="{GRAY}" stroke-width="1"/>',
         f'    <circle cx="{bx+6}" cy="{by+6}" r="1.5" fill="{AMBER}"/>',
         f'    <circle cx="{bx+6}" cy="{by+12}" r="1.5" fill="{GRAY}"/>']
    for i in range(6):
        vx = bx+24+i*5
        s.append(f'    <line x1="{vx}" y1="{by+4}" x2="{vx}" y2="{by+bh-4}" stroke="{GRAY}" stroke-width="1"/>')
    s.append(f'    <text x="{cx}" y="{by+bh+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INK}">{label}</text>')
    s.append('  </g>')
    return "\n".join(s)


def facts(x, lines, anchor="start"):
    out = [f'  <g font-family="{MONO}" font-size="11" fill="{GRAY}" text-anchor="{anchor}">']
    for y, label, val in lines:
        out.append(f'    <text x="{x}" y="{y}"><tspan font-weight="bold">{label}</tspan> {val}</text>')
    out.append('  </g>')
    return "\n".join(out)


# ---- positions ----
RELAY = (440, 66)
R1 = (200, 250)      # Alice's router
R2 = (680, 250)      # Bob's router
A_PH = (175, 312)    # Alice phone top-left
B_PH = (655, 312)    # Bob phone top-left
acx, bcx = 200, 680
PH = 92

# relay legs: Alice <-> relay (attach left of box) and relay <-> Bob (attach right of box),
# so the "relay" label below the box stays clear
# one continuous relay pipe: rises through each router, flattens and passes
# horizontally *through* the relay (in the left edge, out the right), then drops.
# The relay clearly sits on the pipe; the "relay" label stays clear below it.
rx, ry = RELAY
relay_d = (f"M {acx} {A_PH[1]} L {acx} {R1[1]-20} "
           f"C {acx} 120 {rx-160} {ry} {rx-32} {ry} "
           f"L {rx+32} {ry} "
           f"C {rx+160} {ry} {bcx} 120 {bcx} {R2[1]-20} "
           f"L {bcx} {B_PH[1]}")

alice_facts = facts(A_PH[0]+62, [
    (A_PH[1]+18, "EndpointId:", "1a9c…"),
    (A_PH[1]+36, "Addr:", "10.0.0.3:2104"),
    (A_PH[1]+54, "Addr:", "8.3.1.9:2104"),
    (A_PH[1]+72, "relay:", "us-west"),
])
bob_facts = facts(B_PH[0]+62, [
    (B_PH[1]+18, "EndpointId:", "8e2b…"),
    (B_PH[1]+36, "Addr:", "192.168.0.3:4153"),
    (B_PH[1]+54, "Addr:", "4.9.8.2:4153"),
    (B_PH[1]+72, "relay:", "us-east"),
])

# ---- beat 1: ADD_ADDRESS (Bob advertises his candidate addresses to Alice, over the relay) ----
# one packet carrying both ADD_ADDRESS frames travels Bob -> relay -> Alice. Not time-critical,
# and it does nothing to the routers' forwarding tables.
addaddr_pkt = dot(BLUE,
                  [(0, 0), (1.0, 0), (1.3, 1), (3.9, 1), (4.2, 0), (CYCLE, 0)],
                  [(0, 1), (1.0, 1), (4.0, 0), (CYCLE, 0)])
addaddr_co_pts = [(0, 0), (1.0, 0), (1.4, 1), (4.0, 1), (4.4, 0), (CYCLE, 0)]
addaddr_co = f'''  <g opacity="0">
    {anim_opacity(addaddr_co_pts)}
    <rect x="432" y="150" width="224" height="56" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="446" y="174" font-family="{MONO}" font-size="12" fill="{INK}"><tspan font-weight="bold">ADD_ADDRESS</tspan> 192.168.0.3:4153</text>
    <text x="446" y="194" font-family="{MONO}" font-size="12" fill="{INK}"><tspan font-weight="bold">ADD_ADDRESS</tspan> 4.9.8.2:4153</text>
  </g>'''

# when the ADD_ADDRESS packet lands, Alice now knows Bob's candidates — ~2s popup
# beside Alice (briefly covering her own info panel)
ak_pts = [(0, 0), (4.0, 0), (4.3, 1), (6.2, 1), (6.5, 0), (CYCLE, 0)]
alice_knows = f'''  <g opacity="0">
    {anim_opacity(ak_pts)}
    <circle cx="234" cy="366" r="4" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="226" cy="358" r="3" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="219" cy="352" r="2" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <rect x="238" y="324" width="216" height="64" rx="16" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <text x="252" y="343" font-family="{MONO}" font-size="12" fill="{INDIGO}" font-weight="bold">Bob</text>
    <text x="252" y="362" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 192.168.0.3:4153</text>
    <text x="252" y="380" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 4.9.8.2:4153</text>
  </g>'''

# ---- beat 2: REACH_OUT (Alice -> Bob over the relay) — carries Alice's candidate addresses
# and is the trigger that starts probing; shown here decoupled from the probes for clarity ----
reachout_pkt = dot(BLUE,
                   [(0, 0), (6.8, 0), (7.1, 1), (9.2, 1), (9.4, 0), (CYCLE, 0)],
                   [(0, 0), (6.8, 0), (9.3, 1), (CYCLE, 1)])
reachout_co_pts = [(0, 0), (6.8, 0), (7.1, 1), (9.3, 1), (9.6, 0), (CYCLE, 0)]
reachout_co = f'''  <g opacity="0">
    {anim_opacity(reachout_co_pts)}
    <rect x="246" y="150" width="216" height="56" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
    <text x="262" y="174" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">REACH_OUT<tspan x="352" font-weight="normal">10.0.0.3:2104</tspan></text>
    <text x="262" y="194" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">REACH_OUT<tspan x="352" font-weight="normal">8.3.1.9:2104</tspan></text>
  </g>'''

# Bob now knows Alice's candidates — ~2s popup beside Bob (toward center)
bk_pts = [(0, 0), (9.3, 0), (9.6, 1), (11.6, 1), (11.9, 0), (CYCLE, 0)]
bob_knows = f'''  <g opacity="0">
    {anim_opacity(bk_pts)}
    <circle cx="704" cy="366" r="4" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="698" cy="358" r="3" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="692" cy="352" r="2" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <rect x="708" y="324" width="186" height="86" rx="16" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <text x="722" y="343" font-family="{MONO}" font-size="12" fill="{INDIGO}" font-weight="bold">Alice</text>
    <text x="722" y="362" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 10.0.0.3:2104</text>
    <text x="722" y="380" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 8.3.1.9:2104</text>
    <text x="722" y="401" font-family="Georgia, serif" font-style="italic" font-size="13" fill="{INDIGO}">I need to reach out</text>
  </g>'''

# ============================ hole punch (Alice is the client → she probes first) ============================
# Locals fail (not routable). Then the public chain on ONE shared direct route: Alice's sacrificial
# probe opens her hole but is rejected at Bob's NAT; Bob's probe opens his hole and gets through;
# Alice replies PATH_RESPONSE+PATH_CHALLENGE; Bob replies PATH_RESPONSE → both paths validated.
# No timeouts. Each step gets a clear window before the next.
T_AL, T_BL = 12.4, 14.6      # local probes (fail)
T_AP = 16.9                  # Alice public — sacrificial
T_BP = 19.9                  # Bob public — succeeds
T_AR = 22.9                  # Alice reply: PATH_RESPONSE + PATH_CHALLENGE
T_BR = 25.7                  # Bob reply: PATH_RESPONSE → validated
T_BLUE = T_BR + 2.4          # direct path turns blue once the response validates it

DROP_A, DROP_B = (acx, 200), (bcx, 200)   # local drops — straight up above each router (no bend toward the other side, which read as if the packet was trying to reach the peer)
probe_local_a_d = f"M {acx} {A_PH[1]} L {acx} {DROP_A[1]}"
probe_local_b_d = f"M {bcx} {B_PH[1]} L {bcx} {DROP_B[1]}"

# the one direct (internet) route, Alice(0) -> Bob(1). Every public packet rides it.
ARC = 158
direct_d = f"M {acx} {A_PH[1]} L {acx} {R1[1]-20} C {acx} {ARC} {bcx} {ARC} {bcx} {R2[1]-20} L {bcx} {B_PH[1]}"


def cubic_len(p0, p1, p2, p3, n=120):
    def b(t, a, bb, c, d): return (1-t)**3*a + 3*(1-t)**2*t*bb + 3*(1-t)*t*t*c + t**3*d
    prev, L = p0, 0.0
    for i in range(1, n+1):
        t = i/n
        cur = (b(t, p0[0], p1[0], p2[0], p3[0]), b(t, p0[1], p1[1], p2[1], p3[1]))
        L += ((cur[0]-prev[0])**2 + (cur[1]-prev[1])**2)**0.5
        prev = cur
    return L


_seg = A_PH[1] - (R1[1]-20)
_arc = cubic_len((acx, R1[1]-20), (acx, ARC), (bcx, ARC), (bcx, R2[1]-20))
F_BR = (_seg + _arc) / (_seg + _arc + _seg)   # fraction at Bob's router — where the sacrificial bounces
REJECT = (bcx, R2[1]-20)   # Bob's router WAN — sacrificial probe rejected here


def hp_pkt(wire, t0, dur, kp0=0, kp1=1, color=BLUE):
    arr = t0 + dur
    return f'''  <g opacity="0">
    <circle r="4" fill="{color}"/>
    {anim_opacity([(0, 0), (t0, 0), (t0+0.15, 1), (arr-0.12, 1), (arr+0.06, 0), (CYCLE, 0)])}
    {anim_motion(wire, [(0, kp0), (t0, kp0), (arr, kp1), (CYCLE, kp1)])}
  </g>'''


def drop_x(p, t_arr, label, hold=1.9, dx=0):
    pts = [(0, 0), (t_arr-0.05, 0), (t_arr+0.15, 1), (t_arr+hold, 1), (t_arr+hold+0.3, 0), (CYCLE, 0)]
    if dx:   # label to the side instead of below
        lbl = f'<text x="{p[0]+dx}" y="{p[1]+4}" text-anchor="start" font-family="{MONO}" font-size="10" fill="{RED}">{label}</text>'
    else:
        lbl = f'<text x="{p[0]}" y="{p[1]+22}" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{RED}">{label}</text>'
    return f'''  <g opacity="0">
    {anim_opacity(pts)}
    <line x1="{p[0]-6}" y1="{p[1]-6}" x2="{p[0]+6}" y2="{p[1]+6}" stroke="{RED}" stroke-width="2"/>
    <line x1="{p[0]-6}" y1="{p[1]+6}" x2="{p[0]+6}" y2="{p[1]-6}" stroke="{RED}" stroke-width="2"/>
    {lbl}
  </g>'''


def callout(side, lines, t0, t1, w=164):
    x = 240 if side == "L" else (656 - w)
    h = 18 + len(lines)*19
    pts = [(0, 0), (t0-0.3, 0), (t0, 1), (t1, 1), (t1+0.3, 0), (CYCLE, 0)]
    rows = "\n".join(
        f'    <text x="{x+12}" y="{157+i*19}" font-family="{MONO}" font-size="12" fill="{INK}"'
        f'{" font-weight=" + chr(34) + "bold" + chr(34) if bold else ""}>{txt}</text>'
        for i, (txt, bold) in enumerate(lines))
    return f'''  <g opacity="0">
    {anim_opacity(pts)}
    <rect x="{x}" y="136" width="{w}" height="{h}" rx="5" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
{rows}
  </g>'''


def pc_co(side, addr, t0, t1):
    return callout(side, [("PATH_CHALLENGE", True), (addr, False)], t0, t1)


def nat_bubble(side, l1, l2, t_on, t_used):
    # thinking bubble on a router: the NAT mapping (remote public -> local private). A green
    # check appears next to the mapping the moment a packet actually uses it.
    out0, out1 = T_POPUP_FADE, T_POPUP_FADE+1.0
    pts = [(0, 0), (t_on, 0), (t_on+0.4, 1), (out0, 1), (out1, 0), (CYCLE, 0)]
    hg_pts = [(0, 0), (t_on+0.4, 0), (t_on+0.7, 1), (t_used, 1), (t_used+0.3, 0), (CYCLE, 0)]   # hourglass: created, temporary
    chk_pts = [(0, 0), (t_used, 0), (t_used+0.3, 1), (CYCLE, 1)]                                # check: used / validated
    if side == "a":      # to the right of Alice's router, trail back to it
        bx, trail = 240, [(236, 251, 3), (231, 250, 2.5), (227, 249, 2)]
    else:                # to the right of Bob's router
        bx, trail = 720, [(716, 251, 3), (711, 250, 2.5), (707, 249, 2)]
    dots = "\n".join(f'    <circle cx="{c[0]}" cy="{c[1]}" r="{c[2]}" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>' for c in trail)
    cx = bx+138
    return f'''  <g opacity="0">
    {anim_opacity(pts)}
{dots}
    <rect x="{bx}" y="230" width="160" height="46" rx="14" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <text x="{bx+12}" y="250" font-family="{MONO}" font-size="11" fill="{INK}">{l1}</text>
    <text x="{bx+12}" y="267" font-family="{MONO}" font-size="11" fill="{INK}">{l2}</text>
    <g opacity="0">
      <line x1="{cx-1}" y1="258" x2="{cx+11}" y2="258" stroke="{GRAY}" stroke-width="1.5"/>
      <line x1="{cx-1}" y1="270" x2="{cx+11}" y2="270" stroke="{GRAY}" stroke-width="1.5"/>
      <polygon points="{cx+1},259 {cx+9},259 {cx+5},263.5" fill="{AMBER}" stroke="none"/>
      <polygon points="{cx},258 {cx+10},258 {cx+5},264 {cx+10},270 {cx},270 {cx+5},264" fill="#eee" stroke="{GRAY}" stroke-width="1.3"/>
      {anim_opacity(hg_pts)}
    </g>
    <g opacity="0">
      <polyline points="{cx},264 {cx+4},269 {cx+11},259" fill="none" stroke="{GREEN}" stroke-width="2"/>
      {anim_opacity(chk_pts)}
    </g>
  </g>'''


# beat 3 — sequential locals (Alice first), not routable
loc_a_pkt = hp_pkt("probe-local-a", T_AL, 1.4)
loc_b_pkt = hp_pkt("probe-local-b", T_BL, 1.4)
loc_a_drop = drop_x(DROP_A, T_AL+1.4, "not routable", hold=0.5)
loc_b_drop = drop_x(DROP_B, T_BL+1.4, "not routable", hold=0.5)
loc_a_co = pc_co("L", "192.168.0.3:4153", T_AL-0.3, T_AL+1.5)
loc_b_co = pc_co("R", "10.0.0.3:2104", T_BL-0.3, T_BL+1.5)

# beat 4 — Alice's sacrificial public probe: opens her hole, rejected at Bob's NAT (bounces)
pub_a_pkt = hp_pkt("direct", T_AP, 2.0, kp0=0, kp1=F_BR)
pub_a_drop = drop_x(REJECT, T_AP+2.0, "no mapping", hold=0.6, dx=16)
pub_a_co = pc_co("L", "4.9.8.2:4153", T_AP-0.3, T_AP+2.1)
nat_a = nat_bubble("a", "4.9.8.2:4153 →", "10.0.0.3:2104", T_AP+0.6, t_used=21.9)

# beat 5 — Bob's public probe: opens his hole, through Alice's hole, reaches Alice (success)
pub_b_pkt = hp_pkt("direct", T_BP, 2.2, kp0=1, kp1=0)
pub_b_co = pc_co("R", "8.3.1.9:2104", T_BP-0.3, T_BP+2.3)
nat_b = nat_bubble("b", "8.3.1.9:2104 →", "192.168.0.3:4153", T_BP+0.6, t_used=24.9)

# beat 6 — Alice's bundled reply (PATH_RESPONSE + PATH_CHALLENGE) → Bob
reply_pkt = hp_pkt("direct", T_AR, 2.2, kp0=0, kp1=1)
reply_co = callout("L", [("PATH_RESPONSE", True), ("PATH_CHALLENGE", True)], T_AR-0.3, T_AR+2.3, w=164)

# beat 7 — Bob's PATH_RESPONSE → Alice; both directions validated
resp_pkt = hp_pkt("direct", T_BR, 2.2, kp0=1, kp1=0)
resp_co = callout("R", [("PATH_RESPONSE", True)], T_BR-0.3, T_BR+2.3, w=150)

# the direct path itself: appears faded-gray as Bob's packet goes through, turns blue once validated
direct_opa = [(0, 0), (T_BP, 0), (T_BP+0.3, 1), (CYCLE-0.5, 1), (CYCLE-0.2, 0), (CYCLE, 0)]
direct_stroke = (f'<animate attributeName="stroke" dur="{CYCLE}s" repeatCount="indefinite" '
                 f'values="{FADED};{FADED};{BLUE};{BLUE}" '
                 f'keyTimes="0;{T_BLUE/CYCLE:.4f};{(T_BLUE+0.6)/CYCLE:.4f};1"/>')
direct_path = (f'  <path id="direct" d="{direct_d}" fill="none" stroke="{FADED}" stroke-width="1.5" opacity="0">'
               f'{anim_opacity(direct_opa)}{direct_stroke}</path>')

# the relay stays blue/active (user data flows over it during hole punching) and only fades to
# gray at the moment the direct path becomes blue — i.e. when the handover happens
relay_stroke = (f'<animate attributeName="stroke" dur="{CYCLE}s" repeatCount="indefinite" '
                f'values="{BLUE};{BLUE};{FADED};{FADED}" '
                f'keyTimes="0;{T_BLUE/CYCLE:.4f};{(T_BLUE+1.0)/CYCLE:.4f};1"/>')

VB_X, VB_Y, VB_W, VB_H = 0, 30, 940, 430
svg = f'''<svg viewBox="{VB_X} {VB_Y} {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>
  <!-- relay pipe (Alice <-> relay <-> Bob); fades blue->gray once the direct path takes over -->
  <path id="relay-path" d="{relay_d}" fill="none" stroke="{BLUE}" stroke-width="1.5">{relay_stroke}</path>
  <!-- the direct path: gray as the first packet goes through, blue once validated -->
{direct_path}
  <!-- local links (phone <-> router) — always blue, drawn AFTER the relay path so the phone↔router segment stays blue even while the relay leg fades to gray -->
  <line x1="{acx}" y1="{A_PH[1]}" x2="{acx}" y2="{R1[1]-20}" stroke="{BLUE}" stroke-width="1.5"/>
  <line x1="{bcx}" y1="{B_PH[1]}" x2="{bcx}" y2="{R2[1]-20}" stroke="{BLUE}" stroke-width="1.5"/>
  <!-- local probe trajectories (invisible; the packets ride them) -->
  <path id="probe-local-a" d="{probe_local_a_d}" fill="none" stroke="none"/>
  <path id="probe-local-b" d="{probe_local_b_d}" fill="none" stroke="none"/>

{relay(*RELAY, "relay")}

{router(*R1, "8.3.1.9", "10.0.0.1")}

{router(*R2, "4.9.8.2", "192.168.0.1")}

  <!-- Alice -->
  <g>
{phone(*A_PH, "1a9c…", iphone=True)}
    <text x="{acx}" y="{A_PH[1]+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Alice</text>
  </g>
{alice_facts}

  <!-- Bob -->
  <g>
{phone(*B_PH, "8e2b…")}
    <text x="{bcx}" y="{B_PH[1]+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Bob</text>
  </g>
{bob_facts}

  <!-- All packets first so they pass behind the info boxes -->
{addaddr_pkt}
{reachout_pkt}
{loc_a_pkt}
{loc_b_pkt}
{pub_a_pkt}
{pub_b_pkt}
{reply_pkt}
{resp_pkt}
{loc_a_drop}
{loc_b_drop}
{pub_a_drop}
{nat_a}
{nat_b}

  <!-- Callouts/boxes drawn last so they sit on top of paths and packets -->
{addaddr_co}
{alice_knows}
{reachout_co}
{bob_knows}
{loc_a_co}
{loc_b_co}
{pub_a_co}
{pub_b_co}
{reply_co}
{resp_co}

  <!-- Timer bar (position in loop) -->
  <rect x="0" y="456" width="0" height="3" fill="#9ca3af">
    <animate attributeName="width" from="0" to="940" dur="{CYCLE}s" repeatCount="indefinite"/>
  </rect>
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
