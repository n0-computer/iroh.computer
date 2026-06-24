#!/usr/bin/env python3
"""Generator for layer-stack.svg (the "How the pieces stack together" figure).

A *static* architecture diagram in the same style as the animated how-iroh-works
SVGs (Space Mono, light boxes on a transparent canvas, mid-tone accents so it
reads in light and dark mode).

The framing: iroh is a library *embedded in your application*. So the app is one
big container box, and the iroh components (Protocols, Router, Endpoint, QUIC,
Transport) are borderless boxes nested inside it. Below the app, the physical
media the transport runs over fan out: an RJ45/ethernet plug and a Wi-Fi router
(the two default UDP paths) plus a Tor onion (a swappable alternative).

No animation: a layer stack reads best held still. All text is either dark ink on
a light box or a mid-tone accent, so nothing vanishes on a dark background.

To change it, edit this script and run:  python3 layer-stack.gen.py
It writes ../public/animations/layer-stack.svg.
The page embeds this via <object>/<img src=... style='width:100%'/>; the
intrinsic aspect ratio comes from the SVG viewBox (VB_W x VB_H).
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "animations", "layer-stack.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK, GOLD = "#6366f1", "#d97706", "#888", "#111", "#eab308"
BLUE = "#2563eb"  # connection-blue, matching the other diagrams
TOR = "#7e4798"
BOX_FILL, BOX_STROKE, CABLE = "#e5e7eb", "#9ca3af", "#cbd0d8"

VB_W, VB_H = 680, 465

# ---- app container ----
APP_X, APP_Y, APP_W = 70, 24, 540
APP_CX = APP_X + APP_W / 2  # 340, the spine

# ---- iroh box: one rounded box, layers touch with square internal dividers ----
IX, IW = APP_X + 18, APP_W - 36   # 88, 504
ITOP, IBH = APP_Y + 48, 46
IROH = [
    ("Protocols",      "blobs · gossip · yours"),
    ("Router",         "dispatches connections by ALPN"),
    ("Endpoint",       "identity · address lookup · NAT · relay"),
    ("QUIC + TLS 1.3", "encryption · auth · stream mux"),
    ("Transport",      "UDP and relay by default · swappable"),
]
IROH_H = len(IROH) * IBH
TRANSPORT_BOTTOM = ITOP + IROH_H   # bottom edge of the Transport layer (= iroh box bottom)
APP_BOTTOM = ITOP + IROH_H + 16
APP_H = APP_BOTTOM - APP_Y

# ---- transport media row ----
LAN_CX, WIFI_CX, TOR_CX = 200, 340, 480
EXIT_XS = (APP_CX - 28, APP_CX, APP_CX + 28)  # 3 separate wire exits, close together at the Transport box
ICON_TOP = APP_BOTTOM + 52
LABEL_Y = ICON_TOP + 64


def iroh_box():
    """One rounded box; the layers touch, separated by thin square dividers."""
    parts = [f'  <rect x="{IX}" y="{ITOP}" width="{IW}" height="{IROH_H}" rx="8" fill="{BOX_FILL}"/>']
    for i, (title, subtitle) in enumerate(IROH):
        y = ITOP + i * IBH
        if i:  # divider above every layer but the first
            parts.append(f'  <line x1="{IX}" y1="{y}" x2="{IX+IW}" y2="{y}" stroke="{CABLE}" stroke-width="1"/>')
        parts.append(f'  <text x="{APP_CX}" y="{y+19}" text-anchor="middle" font-family="{MONO}" '
                     f'font-size="14" font-weight="bold" fill="{INK}">{title}</text>')
        parts.append(f'  <text x="{APP_CX}" y="{y+35}" text-anchor="middle" font-family="{MONO}" '
                     f'font-size="10.5" fill="{GRAY}">{subtitle}</text>')
    return "\n".join(parts)


# ============================ transport media icons ============================

def rj45(cx, top):
    """RJ45 / CAT6 ethernet plug — 8 gold contacts, latch, boot, cable."""
    pins = "".join(
        f'<line x1="{cx-15.4+j*4.4:.2f}" y1="{top+4}" x2="{cx-15.4+j*4.4:.2f}" y2="{top+10}" '
        f'stroke="{GOLD}" stroke-width="1.5"/>'
        for j in range(8))
    return (
        f'  <!-- ethernet (LAN) -->\n'
        f'  <rect x="{cx-5}" y="{top+30}" width="10" height="15" rx="3" fill="{CABLE}" stroke="{GRAY}" stroke-width="1"/>\n'
        f'  <path d="M {cx-9} {top+22} L {cx-5} {top+30} L {cx+5} {top+30} L {cx+9} {top+22} Z" fill="#eee" stroke="{GRAY}" stroke-width="1.2"/>\n'
        f'  <rect x="{cx-19}" y="{top}" width="38" height="22" rx="2.5" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>\n'
        f'  <rect x="{cx-5}" y="{top-4}" width="10" height="5" rx="1.5" fill="#eee" stroke="{GRAY}" stroke-width="1.2"/>\n'
        f'  {pins}\n'
        f'  <text x="{cx}" y="{LABEL_Y}" text-anchor="middle" font-family="{MONO}" font-size="12" font-weight="bold" fill="{GRAY}">Ethernet</text>\n'
        f'  <text x="{cx}" y="{LABEL_Y+15}" text-anchor="middle" font-family="{MONO}" font-size="9" fill="{GRAY}">LAN · UDP</text>'
    )


def router(cx, cy):
    """Wi-Fi router — body with two L-shaped side antennas, matching the
    home-router design used in the other how-iroh-works diagrams."""
    bw, bh = 46, 26
    bx, by = cx - bw / 2, cy - bh / 2
    return (
        f'  <!-- wifi router -->\n'
        f'  <polyline points="{bx},{by+bh-5} {bx-9},{by+bh-5} {bx-9},{by-9}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>\n'
        f'  <circle cx="{bx-9}" cy="{by-11}" r="1.6" fill="{GRAY}"/>\n'
        f'  <polyline points="{bx+bw},{by+bh-5} {bx+bw+9},{by+bh-5} {bx+bw+9},{by-9}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>\n'
        f'  <circle cx="{bx+bw+9}" cy="{by-11}" r="1.6" fill="{GRAY}"/>\n'
        f'  <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="4" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>\n'
        f'  <circle cx="{cx-12}" cy="{by+bh-7}" r="2" fill="{INDIGO}"/>\n'
        f'  <circle cx="{cx-4}" cy="{by+bh-7}" r="2" fill="{GRAY}"/>\n'
        f'  <circle cx="{cx+4}" cy="{by+bh-7}" r="2" fill="{GRAY}"/>\n'
        f'  <text x="{cx}" y="{LABEL_Y}" text-anchor="middle" font-family="{MONO}" font-size="12" font-weight="bold" fill="{GRAY}">Wi-Fi</text>\n'
        f'  <text x="{cx}" y="{LABEL_Y+15}" text-anchor="middle" font-family="{MONO}" font-size="9" fill="{GRAY}">UDP</text>'
    )


def tor(cx, cy):
    """Tor onion: concentric layers + a little sprout."""
    return (
        f'  <!-- tor onion -->\n'
        f'  <path d="M {cx} {cy-20} q -2 -8 -8 -10" fill="none" stroke="{TOR}" stroke-width="1.5"/>\n'
        f'  <path d="M {cx} {cy-20} q 2 -8 8 -10" fill="none" stroke="{TOR}" stroke-width="1.5"/>\n'
        f'  <ellipse cx="{cx}" cy="{cy}" rx="17" ry="21" fill="#f0e9f5" stroke="{TOR}" stroke-width="1.5"/>\n'
        f'  <ellipse cx="{cx}" cy="{cy}" rx="11" ry="14" fill="none" stroke="{TOR}" stroke-width="1"/>\n'
        f'  <ellipse cx="{cx}" cy="{cy}" rx="5" ry="7" fill="none" stroke="{TOR}" stroke-width="1"/>\n'
        f'  <text x="{cx}" y="{LABEL_Y}" text-anchor="middle" font-family="{MONO}" font-size="12" font-weight="bold" fill="{TOR}">Tor</text>\n'
        f'  <text x="{cx}" y="{LABEL_Y+15}" text-anchor="middle" font-family="{MONO}" font-size="9" fill="{GRAY}">onion routing</text>'
    )


# ============================ assemble ============================
# Three separate wires: vertical out of the Transport box, rounded across, vertical into each device.
_sy, _ay = TRANSPORT_BOTTOM, ICON_TOP - 2
_k = (_ay - _sy) * 0.55  # control-handle length → vertical tangents at both ends
fan = "\n".join(
    f'  <path d="M {ex} {_sy} C {ex} {_sy+_k:.0f} {dx} {_ay-_k:.0f} {dx} {_ay}" '
    f'fill="none" stroke="{BLUE}" stroke-width="1.5"/>'
    for ex, dx in zip(EXIT_XS, (LAN_CX, WIFI_CX, TOR_CX))
)

svg = f'''<svg viewBox="0 0 {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>

  <!-- ========== your application (container) ========== -->
  <rect x="{APP_X}" y="{APP_Y}" width="{APP_W}" height="{APP_H}" rx="12" fill="none" stroke="{BOX_STROKE}" stroke-width="2"/>
  <text x="{IX}" y="{APP_Y+30}" font-family="{MONO}" font-size="16" font-weight="bold" fill="{AMBER}">Your application</text>
  <text x="{IX+IW}" y="{APP_Y+30}" text-anchor="end" font-family="{MONO}" font-size="12" fill="{INDIGO}">iroh — embedded library</text>

  <!-- ========== iroh box: one rounded box, layers touch ========== -->
{iroh_box()}

  <!-- ========== transport media fan-out ========== -->
{fan}
{rj45(LAN_CX, ICON_TOP)}
{router(WIFI_CX, ICON_TOP + 13)}
{tor(TOR_CX, ICON_TOP + 13)}
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
