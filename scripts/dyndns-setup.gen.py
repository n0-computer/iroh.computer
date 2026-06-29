#!/usr/bin/env python3
"""Generator for dyndns-setup.svg (the "traditional way" figure in the Pigeons post).

A *static* diagram (no animation for now) showing everything you have to set up to
SSH into a home server the old-fashioned way: a DynDNS provider mapping a stable name
to your changing public IP, a DDNS client pushing updates, and a manual port-forward
on the router — none of which works at all behind CGNAT.

Same visual vocabulary as the how-iroh-works figures (Space Mono, the router icon,
indigo endpoints, gray infrastructure).

Edit this script and run:  python3 dyndns-setup.gen.py
Writes ../public/blog/pigeons/dyndns-setup.svg.
"""

import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "blog", "pigeons", "dyndns-setup.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK, BLUE, RED, GREEN = "#6366f1", "#d97706", "#888", "#374151", "#2563eb", "#dc2626", "#15803d"
TINT = "#808080"   # theme-agnostic translucent fill — subtle on both light and dark backgrounds


def router(cx, cy, pub_ip, lan_ip):
    bx, by, bw, bh = cx-30, cy-20, 60, 40
    return f'''  <g font-family="{MONO}" font-size="10" fill="{GRAY}">
    <text x="{cx}" y="{by-8}" text-anchor="middle">{pub_ip}</text>
    <polyline points="{bx},{by+bh-5} {bx-10},{by+bh-5} {bx-10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx-10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <polyline points="{bx+bw},{by+bh-5} {bx+bw+10},{by+bh-5} {bx+bw+10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx+bw+10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="3" fill="{TINT}" fill-opacity="0.1" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{cx+20}" cy="{by+bh-6}" r="1.5" fill="{AMBER}"/>
    <text x="{cx}" y="{by+bh+15}" text-anchor="middle">{lan_ip}</text>
  </g>'''


def laptop(cx, cy, label):
    sw, sh = 64, 40
    sx, sy = cx-sw/2, cy-sh/2-4
    bb = sy+sh
    return f'''  <g>
    <rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="3" fill="{TINT}" fill-opacity="0.1" stroke="{INDIGO}" stroke-width="1.5"/>
    <rect x="{sx+4}" y="{sy+4}" width="{sw-8}" height="{sh-8}" rx="2" fill="none" stroke="{INDIGO}" stroke-width="0.8"/>
    <text x="{cx}" y="{sy+sh/2+4}" text-anchor="middle" font-family="{MONO}" font-size="11" fill="{INDIGO}">$ ssh</text>
    <polygon points="{cx-38},{bb} {cx+38},{bb} {cx+47},{bb+9} {cx-47},{bb+9}" fill="{TINT}" fill-opacity="0.1" stroke="{INDIGO}" stroke-width="1.5"/>
    <text x="{cx}" y="{bb+27}" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{INDIGO}">{label}</text>
  </g>'''


def server(cx, cy, label, ip):
    w, h = 46, 72
    x, y = cx-w/2, cy-h/2
    return f'''  <g>
    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{TINT}" fill-opacity="0.1" stroke="{INDIGO}" stroke-width="1.5"/>
    <line x1="{x+8}" y1="{y+12}" x2="{x+w-8}" y2="{y+12}" stroke="{INDIGO}" stroke-width="0.8"/>
    <line x1="{x+8}" y1="{y+18}" x2="{x+w-8}" y2="{y+18}" stroke="{INDIGO}" stroke-width="0.8"/>
    <circle cx="{x+w-11}" cy="{y+9}" r="1.6" fill="{AMBER}"/>
    <rect x="{x+8}" y="{cy-6}" width="{w-16}" height="16" rx="3" fill="none" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="{cx}" y="{cy+6}" text-anchor="middle" font-family="{MONO}" font-size="9" fill="{AMBER}">sshd</text>
    <text x="{cx}" y="{y+h+15}" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{INDIGO}">{label}</text>
    <text x="{cx}" y="{y+h+29}" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}">{ip}</text>
  </g>'''


def dyndns(cx, cy):
    w, h = 210, 64
    x, y = cx-w/2, cy-h/2
    return f'''  <g>
    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{TINT}" fill-opacity="0.1" stroke="{GRAY}" stroke-width="1.5"/>
    <text x="{cx}" y="{y+19}" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{GRAY}" font-weight="bold">DynDNS provider</text>
    <text x="{cx}" y="{y+38}" text-anchor="middle" font-family="{MONO}" font-size="11" fill="{GRAY}">myserver.dyndns.org</text>
    <text x="{cx}" y="{y+54}" text-anchor="middle" font-family="{MONO}" font-size="11" fill="{GRAY}">&#8594; 203.0.113.7</text>
  </g>'''


def cloud(cx, cy, label):
    return f'''  <g>
    <ellipse cx="{cx}" cy="{cy}" rx="86" ry="40" fill="{TINT}" fill-opacity="0.1" stroke="{GRAY}" stroke-width="1.2" stroke-dasharray="4 4"/>
    <text x="{cx}" y="{cy+4}" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{GRAY}">{label}</text>
  </g>'''


def arrow(x1, y1, x2, y2, color, marker, dash=False, both=False):
    d = ' stroke-dasharray="5 4"' if dash else ''
    ms = f' marker-start="url(#{marker})"' if both else ''
    return (f'  <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="1.6"'
            f'{d} marker-end="url(#{marker})"{ms}/>')


def label(cx, cy, text, color, size=11, weight="normal", anchor="middle"):
    fw = f' font-weight="{weight}"' if weight != "normal" else ''
    return f'  <text x="{cx}" y="{cy}" text-anchor="{anchor}" font-family="{MONO}" font-size="{size}" fill="{color}"{fw}>{text}</text>'


def step(x, y, n):
    return (f'  <circle cx="{x}" cy="{y}" r="9" fill="{BLUE}"/>'
            f'<text x="{x}" y="{y+3.6}" text-anchor="middle" font-family="{MONO}" font-size="11" fill="{TINT}" fill-opacity="0.1" font-weight="bold">{n}</text>')


def tag(cx, top, lines, color):
    w = max(len(l) for l in lines) * 6.3 + 24
    h = 9 + len(lines) * 15
    x = cx - w/2
    out = [f'  <g>',
           f'    <rect x="{x:.1f}" y="{top}" width="{w:.1f}" height="{h}" rx="4" fill="{TINT}" fill-opacity="0.12" stroke="{color}" stroke-width="1"/>',
           f'    <rect x="{x+6:.1f}" y="{top+h/2-3.5:.1f}" width="3" height="7" fill="{color}"/>']
    for i, l in enumerate(lines):
        out.append(f'    <text x="{cx+5:.1f}" y="{top+16+i*15}" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{color}">{l}</text>')
    out.append('  </g>')
    return "\n".join(out)


# ---- positions ----
LAPTOP = (96, 290)
DYNDNS = (340, 92)
INET = (340, 292)
ROUTER = (610, 300)
SERVER = (842, 300)
HX0, HY0, HX1, HY1 = 498, 198, 916, 404

VB_W, VB_H = 940, 470
svg = f'''<svg viewBox="0 0 {VB_W} {VB_H}" style="background:transparent" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ahb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="{BLUE}"/></marker>
    <marker id="ahg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="{GRAY}"/></marker>
  </defs>

  <!-- home network boundary -->
  <rect x="{HX0}" y="{HY0}" width="{HX1-HX0}" height="{HY1-HY0}" rx="10" fill="{TINT}" fill-opacity="0.05" stroke="{GRAY}" stroke-width="1" stroke-dasharray="6 5"/>
  <text x="{HX0+14}" y="{HY0+20}" font-family="{MONO}" font-size="11" fill="{GRAY}">home network</text>

  <!-- internet -->
{cloud(*INET, "Internet")}

  <!-- ssh data path: laptop -> router public IP (through the internet) -->
{arrow(150, 288, 575, 296, BLUE, "ahb")}
{label(360, 272, "ssh 203.0.113.7:22", BLUE)}
{step(212, 272, "2")}

  <!-- port forward: router -> server -->
{arrow(645, 300, 814, 300, BLUE, "ahb")}
{label(745, 290, ":22 &#8594; :22", BLUE)}
{step(690, 286, "3")}

  <!-- DNS lookup: laptop <-> dyndns -->
{arrow(118, 262, 270, 128, GRAY, "ahg", dash=True, both=True)}
{label(150, 200, "resolve", GRAY, size=10, anchor="start")}
{label(150, 213, "the name", GRAY, size=10, anchor="start")}
{step(196, 178, "1")}

  <!-- DDNS updater: router -> dyndns -->
{arrow(632, 268, 446, 120, GRAY, "ahg", dash=True)}
{label(545, 166, "push current IP", GRAY, size=10)}

{dyndns(*DYNDNS)}

{laptop(*LAPTOP, "Work laptop")}

{router(*ROUTER, "203.0.113.7", "192.168.1.1")}

{server(*SERVER, "home server", "192.168.1.10")}

  <!-- "changes" note on the public IP -->
{label(610, 256, "(IP keeps changing)", GRAY, size=9)}

  <!-- config burden tags -->
{tag(345, 150, ["account + DDNS client", "to push your IP on change"], AMBER)}
{tag(700, 334, ["manual port-forward rule", "on the router"], AMBER)}
{tag(610, 420, ["needs a real public IP", "— impossible behind CGNAT"], RED)}
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
