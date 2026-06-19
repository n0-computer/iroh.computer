#!/usr/bin/env python3
"""Generator for endpoint-startup.svg (the "Endpoint startup" figure in how-iroh-works).

This SVG is generated, not hand-edited. To change it, edit this script and run:

    python3 endpoint-startup.gen.py

It reads the projected land outline from endpoint-startup.land.txt (Natural Earth
110m coastline, plate carrée with standard parallel 45°, clipped to a US + Europe
window) and writes ../public/blog/how-iroh-works/endpoint-startup.svg.

NOTE: this lives in scripts/, not in src/app/, because anything under the Next.js
app router directory gets bundled by webpack (which chokes on .py files).

The animation: the three relay wires fade in at 2s, then an equal-speed probe
packet round-trips Bob -> relay -> Bob on each wire. Because speed is constant and
distance differs, us-east returns first, then us-west, then eu-west. A readout to
the right of the phone gains a line each time a packet returns.
"""

import math
import os

CYCLE = 14.0   # one loop; everything resets afterwards

HERE = os.path.dirname(os.path.abspath(__file__))
LAND_PATH = os.path.join(HERE, "endpoint-startup.land.txt")
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..",
    "public", "blog", "how-iroh-works", "endpoint-startup.svg"))

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


land = open(LAND_PATH).read()

# ---- projection: plate carrée, standard parallel 45°, US + Europe window ----
lon0, lon1 = -130, 42
lat0, lat1 = 16, 72
cosp = math.cos(math.radians(45))
scale = 820.0 / ((lon1 - lon0) * cosp)
def proj(lon, lat):
    return ((lon - lon0) * cosp * scale, (lat1 - lat) * scale)

# city coordinates (lon, lat)
seattle   = (-122.33, 47.61)
delaware  = (-75.55, 39.16)   # Dover/Wilmington area
frankfurt = (8.68, 50.11)
florida   = (-80.2, 25.8)     # Miami area


def relay(cx, cy, label, ip):
    # pizzabox 1U server icon centered horizontally on cx, sitting above the location dot
    bx, by, bw, bh = cx-23, cy-30, 46, 15
    s = []
    s.append(f'  <!-- relay: {label} ({ip}) -->')
    s.append(f'  <g>')
    s.append(f'    <text x="{cx}" y="{by-5}" text-anchor="middle" font-family="\'Space Mono\', monospace" font-size="11" fill="#888">{label}</text>')
    # connector from box bottom to dot
    s.append(f'    <line x1="{cx}" y1="{by+bh}" x2="{cx}" y2="{cy-2}" stroke="#888" stroke-width="1"/>')
    # location dot
    s.append(f'    <circle cx="{cx}" cy="{cy}" r="2.5" fill="#888"/>')
    # pizzabox body
    s.append(f'    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="2" fill="#eee" stroke="#888" stroke-width="1.5"/>')
    # front bezel split line
    s.append(f'    <line x1="{bx+13}" y1="{by+2.5}" x2="{bx+13}" y2="{by+bh-2.5}" stroke="#888" stroke-width="1"/>')
    # LEDs
    s.append(f'    <circle cx="{bx+5}" cy="{by+5}" r="1.5" fill="#d97706"/>')
    s.append(f'    <circle cx="{bx+5}" cy="{by+10}" r="1.5" fill="#888"/>')
    # vent slits on the right
    for i in range(5):
        vx = bx+22+i*4
        s.append(f'    <line x1="{vx}" y1="{by+3}" x2="{vx}" y2="{by+bh-3}" stroke="#888" stroke-width="1"/>')
    # public IPv4 below the location dot
    s.append(f'    <text x="{cx}" y="{cy+15}" text-anchor="middle" font-family="\'Space Mono\', monospace" font-size="10" fill="#888">{ip}</text>')
    s.append(f'  </g>')
    return "\n".join(s)


def arc(x1, y1, x2, y2, k=0.16):
    # great-circle-style curved wire: quadratic bezier bowing "up" (toward the top).
    # Returns (path_d, arc_length). Larger k => more northern bow.
    mx, my = (x1+x2)/2, (y1+y2)/2
    dx, dy = x2-x1, y2-y1
    L = math.hypot(dx, dy)
    px, py = -dy/L, dx/L
    if py > 0:  # always bow upward
        px, py = -px, -py
    off = k*L
    cx, cy = mx+px*off, my+py*off
    d = f"M {x1:.0f} {y1:.0f} Q {cx:.0f} {cy:.0f} {x2:.0f} {y2:.0f}"
    def q(t, a, b, c): return (1-t)**2*a + 2*(1-t)*t*b + t**2*c
    N, length, prev = 60, 0.0, (x1, y1)
    for i in range(1, N+1):
        t = i/N
        cur = (q(t, x1, cx, x2), q(t, y1, cy, y2))
        length += math.hypot(cur[0]-prev[0], cur[1]-prev[1])
        prev = cur
    return d, length


# ---- Bob: small Android phone in the Atlantic, leader line to his FL location ----
bx0, by0 = 300, 244   # phone top-left
bw, bh = 48, 88
bcx, bcy = bx0+bw/2, by0+bh/2
flx, fly = proj(*florida)
bob = f'''  <!-- Bob's FL position indicator + leader line to his phone -->
  <g>
    <line x1="{flx:.0f}" y1="{fly:.0f}" x2="{bx0}" y2="{bcy:.0f}" stroke="#6366f1" stroke-width="1" stroke-dasharray="3 3"/>
    <circle cx="{flx:.0f}" cy="{fly:.0f}" r="6" fill="none" stroke="#6366f1" stroke-width="1.2"/>
    <circle cx="{flx:.0f}" cy="{fly:.0f}" r="2.5" fill="#6366f1"/>
  </g>
  <!-- Bob (small Android phone) -->
  <g>
    <rect x="{bx0}" y="{by0}" width="{bw}" height="{bh}" rx="9" fill="#eee" stroke="#6366f1" stroke-width="1.5"/>
    <rect x="{bx0+3}" y="{by0+3}" width="{bw-6}" height="{bh-6}" rx="6" fill="#eee" stroke="#6366f1" stroke-width="1"/>
    <circle cx="{bcx}" cy="{by0+8}" r="1.6" fill="#888"/>
    <rect x="{bx0+10}" y="{by0+26}" width="{bw-20}" height="16" rx="3" fill="#eee" stroke="#d97706" stroke-width="1.5"/>
    <text x="{bcx}" y="{by0+38}" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8" fill="#d97706">iroh</text>
    {key_label(bcx, by0+58, "8e2b…", 8, "#d97706")}
  </g>'''

uwx, uwy = round(proj(*seattle)[0]), round(proj(*seattle)[1])
uex, uey = round(proj(*delaware)[0]), round(proj(*delaware)[1])
ewx, ewy = round(proj(*frankfurt)[0]), round(proj(*frankfurt)[1])
bx_, by_ = round(flx), round(fly)   # Bob's location dot

# made-up public IPv4 addresses for the relays
ip_uw, ip_ue, ip_ew = "52.10.18.7", "44.208.61.5", "18.196.142.9"
# Bob's public IP — reflected back by the first relay to respond
ip_bob = "73.118.42.9"

# wire paths (us-east kept nearly straight); keep lengths for equal-speed packets
d_uw, L_uw = arc(bx_, by_, uwx, uwy, k=0.16)
d_ue, L_ue = arc(bx_, by_, uex, uey, k=0.05)
d_ew, L_ew = arc(bx_, by_, ewx, ewy, k=0.10)

wires = f'''  <!-- ========== Connections (wires) — light gray curved routes, fade in after 2s ========== -->
  <g class="wires" fill="none" stroke="#b4bac4" stroke-width="1.5">
    <path id="w-uw" d="{d_uw}"/>
    <path id="w-ue" d="{d_ue}"/>
    <path id="w-ew" d="{d_ew}"/>
  </g>'''

# Equal-speed probe packets: round-trip Bob -> relay -> Bob.
# Duration is proportional to path length so speed is constant => us-east returns first.
SPEED = 120.0       # px per second (slow enough that the short us-east hop is still watchable)
START = 3.0         # packets launch after the wires have faded in
def packet(wid, length):
    dur = 2*length/SPEED   # there and back
    t0 = START / CYCLE
    t1 = (START + dur*0.04) / CYCLE
    tmid = (START + dur*0.5) / CYCLE
    t2 = (START + dur*0.96) / CYCLE
    t3 = (START + dur) / CYCLE
    opa = f'values="0;0;1;1;1;0;0" keyTimes="0;{t0:.4f};{t1:.4f};{tmid:.4f};{t2:.4f};{t3:.4f};1"'
    mot = f'keyTimes="0;{t0:.4f};{tmid:.4f};{t3:.4f};1" keyPoints="0;0;1;0;0"'
    return f'''    <circle r="4" fill="#6366f1" opacity="0">
      <animate attributeName="opacity" begin="0s" dur="{CYCLE}s" repeatCount="indefinite" {opa}/>
      <animateMotion begin="0s" dur="{CYCLE}s" repeatCount="indefinite" calcMode="linear" {mot}>
        <mpath href="#{wid}"/>
      </animateMotion>
    </circle>'''

packets = f'''  <!-- ========== Probe packets — equal speed, so us-east returns first, then us-west, then eu-west ========== -->
  <g>
{packet("w-uw", L_uw)}
{packet("w-ue", L_ue)}
{packet("w-ew", L_ew)}
  </g>'''

# Latency readout, right of the phone: one line appears each time a packet returns.
def ret_time(length):
    return START + 2*length/SPEED   # packet is back at Bob at START + round-trip dur
def readline(y, label, ms, begin):
    t0 = begin / CYCLE
    t1 = (begin + 0.4) / CYCLE
    return (f'    <text x="372" y="{y}" font-family="\'Space Mono\', monospace" font-size="12" fill="#111" opacity="0">'
            f'{label}: <tspan fill="#6366f1">{ms} ms</tspan>'
            f'<animate attributeName="opacity" begin="0s" dur="{CYCLE}s" repeatCount="indefinite" '
            f'values="0;0;1;1" keyTimes="0;{t0:.4f};{t1:.4f};1"/></text>')
readout = f'''  <!-- ========== Latency readout — a line fades in as each packet returns ========== -->
  <g>
    <rect class="wires" x="360" y="248" width="126" height="90" rx="6" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>
{readline(268, "us-east", 19, ret_time(L_ue))}
{readline(294, "us-west", 71, ret_time(L_uw))}
{readline(320, "eu-west", 102, ret_time(L_ew))}
    <line x1="372" y1="271" x2="422" y2="271" stroke="#6366f1" stroke-width="1" opacity="0">
      <animate attributeName="opacity" begin="0s" dur="{CYCLE}s" repeatCount="indefinite"
               values="0;0;1;1" keyTimes="0;{ret_time(L_ew)/CYCLE:.4f};{(ret_time(L_ew)+0.5)/CYCLE:.4f};1"/>
    </line>
  </g>'''

# When the last response is in, us-east wins: overlay its wire in connection-blue,
# then keep it gently pulsing to show the persistent home-relay connection.
_rt = ret_time(L_ew)
home = f'''  <!-- us-east chosen as home relay: blue stroke fades in once all latencies are known; gentle pulse fits into the remaining time -->
  <path d="{d_ue}" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0">
    <animate attributeName="opacity" begin="0s" dur="{CYCLE}s" repeatCount="indefinite"
             values="0;0;1;0.35;1;1" keyTimes="0;{_rt/CYCLE:.4f};{(_rt+0.5)/CYCLE:.4f};{(_rt+1.1)/CYCLE:.4f};{(_rt+1.7)/CYCLE:.4f};1"/>
  </path>'''

# The endpoint's public IP appears just below the phone on the first response.
_pt0 = ret_time(L_ue) / CYCLE
_pt1 = (ret_time(L_ue) + 0.4) / CYCLE
phone_ip = f'''  <!-- endpoint public IP, learned from the first relay to respond -->
  <text x="{bcx}" y="{by0+bh+16}" text-anchor="middle" font-family="'Space Mono', monospace" font-size="10" fill="#888" opacity="0">{ip_bob}<animate attributeName="opacity" begin="0s" dur="{CYCLE}s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;{_pt0:.4f};{_pt1:.4f};1"/></text>'''

# Cropped viewport: trim the empty Arctic (top) and eastern Europe (right) so the
# relevant US <-> western-Europe band fills the frame. The land path is unchanged;
# this just clips it. Keep the MDX <div> aspectRatio in sync with VB_W / VB_H.
VB_X, VB_Y, VB_W, VB_H = 0, 92, 705, 280
svg = f'''<svg viewBox="{VB_X} {VB_Y} {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>
  <defs>
    <style><![CDATA[
      .wires {{ opacity: 0; animation: wires-in 14s linear infinite; }}
      @keyframes wires-in {{
        0%, 14.29% {{ opacity: 0; }}
        21.43%, 100% {{ opacity: 1; }}
      }}
    ]]></style>
  </defs>

  <!-- ========== Land (Natural Earth 110m, plate carrée std parallel 45°, US + Europe window) ========== -->
  <path d="{land}" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/>

{wires}

{packets}

{relay(uwx, uwy, "us-west", ip_uw)}

{relay(uex, uey, "us-east", ip_ue)}

{relay(ewx, ewy, "eu-west", ip_ew)}

{bob}

{phone_ip}

{home}

{readout}

  <!-- Timer bar (position in loop) -->
  <rect x="0" y="368" width="0" height="3" fill="#9ca3af">
    <animate attributeName="width" from="0" to="705" dur="14s" repeatCount="indefinite"/>
  </rect>
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
