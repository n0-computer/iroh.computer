#!/usr/bin/env python3
"""Generator for hole-punching-lan.svg ("Direct connections on the same network").

The easy, very common case: Alice and Bob are two devices on the *same* home
network, behind the *same* router. They still discover each other over the relay
(ADD_ADDRESS / REACH_OUT), but then the *local* candidate addresses are directly
reachable across the LAN — so the very first PATH_CHALLENGE to the local address
succeeds. No NAT hole to punch, no sacrificial probe, no public-address probes.

Layout is a "Y": the relay sits on top of the stem (the router's uplink), the
router is the junction, Alice and Bob hang off the two legs. Data first flows up
the stem to the relay and back; once the LAN path validates, the stem fades to
gray and the two legs (the direct LAN path) carry everything.

Same look as the other how-iroh-works figures.

Edit this script and run:  python3 hole-punching-lan.gen.py
Writes ../public/blog/how-iroh-works/hole-punching-lan.svg.
Keep the MDX <div> aspectRatio in sync with VB_W / VB_H.
"""

import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "blog", "how-iroh-works", "hole-punching-lan.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK, BLUE, RED, GREEN = "#6366f1", "#d97706", "#888", "#374151", "#2563eb", "#dc2626", "#15803d"
FADED = "#aab2bd"   # inactive/secondary connection — clearly lighter than the structure gray
CYCLE = 27.0
T_POPUP_FADE = 23.5   # popups fade a little after the LAN path is validated


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


def dot(color, opa_pts, mot_pts, wire):
    return f'''  <g opacity="0">
    <circle r="4" fill="{color}"/>
    {anim_opacity(opa_pts)}
    {anim_motion(wire, mot_pts)}
  </g>'''


def phone(px0, py0, keytext):
    pw, ph = 50, 92
    cx = px0+pw/2
    return f'''    <rect x="{px0}" y="{py0}" width="{pw}" height="{ph}" rx="9" fill="#fff" stroke="{INDIGO}" stroke-width="1.5"/>
    <rect x="{px0+3}" y="{py0+3}" width="{pw-6}" height="{ph-6}" rx="6" fill="none" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="{cx}" cy="{py0+8}" r="1.6" fill="{GRAY}"/>
    <rect x="{px0+11}" y="{py0+28}" width="{pw-22}" height="16" rx="3" fill="none" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="{cx}" y="{py0+40}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">iroh</text>
    <text x="{cx}" y="{py0+60}" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}">🔑 {keytext}</text>'''


def router_lan(cx, cy, lan_ip):
    # single home router; the stem (uplink to the relay) leaves the top center,
    # so the LAN gateway IP goes below and there is no label above.
    bx, by, bw, bh = cx-30, cy-20, 60, 40
    return f'''  <g font-family="{MONO}" font-size="10" fill="{GRAY}">
    <polyline points="{bx},{by+bh-5} {bx-10},{by+bh-5} {bx-10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx-10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <polyline points="{bx+bw},{by+bh-5} {bx+bw+10},{by+bh-5} {bx+bw+10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx+bw+10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="3" fill="#fff" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{cx+20}" cy="{by+bh-6}" r="1.5" fill="{AMBER}"/>
    <text x="{cx}" y="{by+bh+15}" text-anchor="middle">{lan_ip}</text>
  </g>'''


def relay(cx, cy, label):
    bx, by, bw, bh = cx-32, cy-9, 64, 18
    s = ['  <g>',
         f'    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="2" fill="#fff" stroke="{GRAY}" stroke-width="1.5"/>',
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


# ---- positions (a "Y": relay on top, router at the junction, phones on the legs) ----
RELAY = (440, 66)
ROUTER = (440, 200)
A_PH = (175, 312)    # Alice phone top-left
B_PH = (655, 312)    # Bob phone top-left
acx, bcx = 200, 680
PH = 92
JX, JY = 440, 220    # junction (router bottom center) where the legs meet the stem
RELAY_B = 78         # relay box bottom

# The legs curve: they leave each phone vertically and arrive at the router vertically
# (from below), so they flow smoothly into the vertical stem up to the relay.
DV, DV2 = 64, 88   # control-point offsets: vertical out of the phone / into the router
_legA = f"C {acx} {A_PH[1]-DV} {JX} {JY+DV2} {JX} {JY}"      # phone A -> junction
_legB = f"C {bcx} {B_PH[1]-DV} {JX} {JY+DV2} {JX} {JY}"      # phone B -> junction
_legA_r = f"C {JX} {JY+DV2} {acx} {A_PH[1]-DV} {acx} {A_PH[1]}"   # junction -> phone A
_legB_r = f"C {JX} {JY+DV2} {bcx} {B_PH[1]-DV} {bcx} {B_PH[1]}"   # junction -> phone B

# stem (uplink to the relay); lan path (Alice -> router -> Bob)
stem_d = f"M {JX} {JY} L {JX} {RELAY_B}"
lan_d = f"M {acx} {A_PH[1]} {_legA} {_legB_r}"
# relay round-trips: up the stem to the relay and back down (the latency made visible)
relay_b2a = f"M {bcx} {B_PH[1]} {_legB} L {JX} {RELAY_B} L {JX} {JY} {_legA_r}"
relay_a2b = f"M {acx} {A_PH[1]} {_legA} L {JX} {RELAY_B} L {JX} {JY} {_legB_r}"

alice_facts = facts(A_PH[0]+62, [
    (A_PH[1]+18, "EndpointId:", "1a9c…"),
    (A_PH[1]+36, "Addr:", "192.168.0.3:2104"),
    (A_PH[1]+54, "Addr:", "4.9.8.2:2104"),
    (A_PH[1]+72, "relay:", "us-east"),
])
bob_facts = facts(B_PH[0]+62, [
    (B_PH[1]+18, "EndpointId:", "8e2b…"),
    (B_PH[1]+36, "Addr:", "192.168.0.5:4153"),
    (B_PH[1]+54, "Addr:", "4.9.8.2:4153"),
    (B_PH[1]+72, "relay:", "us-east"),
])

# ---- beat 1: ADD_ADDRESS (Bob advertises his candidates to Alice, over the relay) ----
addaddr_pkt = dot(BLUE,
                  [(0, 0), (1.0, 0), (1.3, 1), (4.3, 1), (4.6, 0), (CYCLE, 0)],
                  [(0, 1), (1.0, 1), (4.5, 0), (CYCLE, 0)], "relay-b2a")
addaddr_co_pts = [(0, 0), (1.0, 0), (1.4, 1), (4.4, 1), (4.8, 0), (CYCLE, 0)]
addaddr_co = f'''  <g opacity="0">
    {anim_opacity(addaddr_co_pts)}
    <rect x="660" y="108" width="224" height="56" rx="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
    <text x="674" y="132" font-family="{MONO}" font-size="12" fill="{INK}"><tspan font-weight="bold">ADD_ADDRESS</tspan> 192.168.0.5:4153</text>
    <text x="674" y="152" font-family="{MONO}" font-size="12" fill="{INK}"><tspan font-weight="bold">ADD_ADDRESS</tspan> 4.9.8.2:4153</text>
  </g>'''

# Alice now knows Bob's candidates — ~2s popup beside Alice
ak_pts = [(0, 0), (4.4, 0), (4.7, 1), (6.6, 1), (6.9, 0), (CYCLE, 0)]
alice_knows = f'''  <g opacity="0">
    {anim_opacity(ak_pts)}
    <circle cx="234" cy="366" r="4" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="226" cy="358" r="3" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="219" cy="352" r="2" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <rect x="238" y="324" width="216" height="64" rx="16" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <text x="252" y="343" font-family="{MONO}" font-size="12" fill="{INDIGO}" font-weight="bold">Bob</text>
    <text x="252" y="362" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 192.168.0.5:4153</text>
    <text x="252" y="380" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 4.9.8.2:4153</text>
  </g>'''

# ---- beat 2: REACH_OUT (Alice -> Bob over the relay), carries Alice's candidates ----
reachout_pkt = dot(BLUE,
                   [(0, 0), (7.5, 0), (7.8, 1), (10.8, 1), (11.1, 0), (CYCLE, 0)],
                   [(0, 0), (7.5, 0), (11.0, 1), (CYCLE, 1)], "relay-a2b")
reachout_co_pts = [(0, 0), (7.5, 0), (7.9, 1), (10.9, 1), (11.2, 0), (CYCLE, 0)]
reachout_co = f'''  <g opacity="0">
    {anim_opacity(reachout_co_pts)}
    <rect x="56" y="108" width="216" height="56" rx="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
    <text x="72" y="132" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">REACH_OUT<tspan x="162" font-weight="normal">192.168.0.3:2104</tspan></text>
    <text x="72" y="152" font-family="{MONO}" font-size="12" fill="{INK}" font-weight="bold">REACH_OUT<tspan x="162" font-weight="normal">4.9.8.2:2104</tspan></text>
  </g>'''

# Bob now knows Alice's candidates — ~2s popup beside Bob
bk_pts = [(0, 0), (11.0, 0), (11.3, 1), (13.2, 1), (13.5, 0), (CYCLE, 0)]
bob_knows = f'''  <g opacity="0">
    {anim_opacity(bk_pts)}
    <circle cx="704" cy="366" r="4" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="698" cy="358" r="3" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <circle cx="692" cy="352" r="2" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <rect x="708" y="324" width="186" height="64" rx="16" fill="#eef2ff" stroke="{INDIGO}" stroke-width="1"/>
    <text x="722" y="343" font-family="{MONO}" font-size="12" fill="{INDIGO}" font-weight="bold">Alice</text>
    <text x="722" y="362" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 192.168.0.3:2104</text>
    <text x="722" y="380" font-family="{MONO}" font-size="11" fill="{INK}"><tspan font-weight="bold">Candidate:</tspan> 4.9.8.2:2104</text>
  </g>'''

# ============================ LAN hole punch (no NAT in the way) ============================
# Same subnet, so the local candidate is directly reachable: the first PATH_CHALLENGE to the
# local address gets through. No sacrificial probe, no public probes, no drops.
# Alice is the client → she probes first. Each step gets a clear window.
T_C1 = 14.2    # Alice PATH_CHALLENGE -> Bob (local) — gets through
T_C2 = 16.8    # Bob PATH_CHALLENGE + PATH_RESPONSE -> Alice
T_R = 19.4     # Alice PATH_RESPONSE -> Bob — both directions validated
T_BLUE = T_R + 2.2


def hp_pkt(t0, dur, kp0, kp1, color=BLUE):
    arr = t0 + dur
    return f'''  <g opacity="0">
    <circle r="4" fill="{color}"/>
    {anim_opacity([(0, 0), (t0, 0), (t0+0.15, 1), (arr-0.12, 1), (arr+0.06, 0), (CYCLE, 0)])}
    {anim_motion("lan", [(0, kp0), (t0, kp0), (arr, kp1), (CYCLE, kp1)])}
  </g>'''


def callout(side, lines, t0, t1, w=170):
    x = 232 if side == "L" else (648 - w)
    h = 18 + len(lines)*19
    pts = [(0, 0), (t0-0.3, 0), (t0, 1), (t1, 1), (t1+0.3, 0), (CYCLE, 0)]
    rows = "\n".join(
        f'    <text x="{x+12}" y="{157+i*19}" font-family="{MONO}" font-size="12" fill="{INK}"'
        f'{" font-weight=" + chr(34) + "bold" + chr(34) if bold else ""}>{txt}</text>'
        for i, (txt, bold) in enumerate(lines))
    return f'''  <g opacity="0">
    {anim_opacity(pts)}
    <rect x="{x}" y="136" width="{w}" height="{h}" rx="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
{rows}
  </g>'''


# beat 3 — Alice's PATH_CHALLENGE to Bob's local address: directly reachable, gets through
c1_pkt = hp_pkt(T_C1, 2.0, 0, 1)
c1_co = callout("L", [("PATH_CHALLENGE", True), ("192.168.0.5:4153", False)], T_C1-0.3, T_C1+2.1)

# beat 4 — Bob answers: PATH_RESPONSE (to Alice's challenge) + his own PATH_CHALLENGE
c2_pkt = hp_pkt(T_C2, 2.0, 1, 0)
c2_co = callout("R", [("PATH_RESPONSE", True), ("PATH_CHALLENGE", True), ("192.168.0.3:2104", False)], T_C2-0.3, T_C2+2.1)

# beat 5 — Alice's PATH_RESPONSE to Bob — both directions validated
r_pkt = hp_pkt(T_R, 2.0, 0, 1)
r_co = callout("L", [("PATH_RESPONSE", True)], T_R-0.3, T_R+2.1, w=150)

# the stem (relay uplink) is blue/active until the LAN path validates, then fades to gray
stem_stroke = (f'<animate attributeName="stroke" dur="{CYCLE}s" repeatCount="indefinite" '
               f'values="{BLUE};{BLUE};{FADED};{FADED}" '
               f'keyTimes="0;{T_BLUE/CYCLE:.4f};{(T_BLUE+1.0)/CYCLE:.4f};1"/>')

# "direct" confirmation appears when the path is validated
direct_pts = [(0, 0), (T_BLUE, 0), (T_BLUE+0.4, 1), (CYCLE, 1)]
direct_badge = f'''  <g opacity="0">
    {anim_opacity(direct_pts)}
    <polyline points="372,251 377,257 387,245" fill="none" stroke="{GREEN}" stroke-width="2"/>
    <text x="394" y="255" font-family="{MONO}" font-size="12" fill="{GREEN}" font-weight="bold">direct (LAN)</text>
  </g>'''

VB_X, VB_Y, VB_W, VB_H = 0, 30, 940, 430
svg = f'''<svg viewBox="{VB_X} {VB_Y} {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- stem: the router's uplink to the relay; fades to gray once the LAN path takes over -->
  <path id="stem" d="{stem_d}" fill="none" stroke="{BLUE}" stroke-width="1.5">{stem_stroke}</path>
  <!-- the LAN path (Alice <-> router <-> Bob): always the local link, always blue -->
  <path id="lan" d="{lan_d}" fill="none" stroke="{BLUE}" stroke-width="1.5"/>
  <!-- relay round-trip wires (invisible; the control packets ride them) -->
  <path id="relay-a2b" d="{relay_a2b}" fill="none" stroke="none"/>
  <path id="relay-b2a" d="{relay_b2a}" fill="none" stroke="none"/>

{relay(*RELAY, "relay")}

{router_lan(*ROUTER, "192.168.0.1")}

  <!-- Alice -->
  <g>
{phone(*A_PH, "1a9c…")}
    <text x="{acx}" y="{A_PH[1]+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Alice</text>
  </g>
{alice_facts}

  <!-- Bob -->
  <g>
{phone(*B_PH, "8e2b…")}
    <text x="{bcx}" y="{B_PH[1]+PH+16}" text-anchor="middle" font-family="{MONO}" font-size="13" fill="{INDIGO}">Bob</text>
  </g>
{bob_facts}

{addaddr_pkt}

{addaddr_co}

{alice_knows}

{reachout_pkt}

{reachout_co}

{bob_knows}

  <!-- LAN hole punch: packets first (behind the boxes), then callouts on top -->
{c1_pkt}
{c2_pkt}
{r_pkt}
{direct_badge}
{c1_co}
{c2_co}
{r_co}
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
