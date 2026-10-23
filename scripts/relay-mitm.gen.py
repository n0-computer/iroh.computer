"""Generate a themed diagram of an on-path attacker on Alice's Wi-Fi router intercepting the relay connection.

Device drawings (phone, router, relay) are copied from hole-punching.gen.py.
"""
from pathlib import Path
from svg_themes import write_themes

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, INK, BLUE, GREEN = "#6366f1", "#d97706", "#888", "#111", "#2563eb", "#15803d"


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


def router(cx, cy, pub_ip, lan_ip, stroke=GRAY):
    # same design as the "Guaranteed connections" diagram: public IP above,
    # L-shaped antennas, body, LAN IP below
    bx, by, bw, bh = cx-30, cy-20, 60, 40
    return f'''  <g font-family="{MONO}" font-size="10" fill="{GRAY}">
    <text x="{cx}" y="{by-8}" text-anchor="middle">{pub_ip}</text>
    <polyline points="{bx},{by+bh-5} {bx-10},{by+bh-5} {bx-10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx-10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <polyline points="{bx+bw},{by+bh-5} {bx+bw+10},{by+bh-5} {bx+bw+10},{by-8}" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="{bx+bw+10}" cy="{by-10}" r="1.5" fill="{GRAY}"/>
    <rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="3" fill="#eee" stroke="{stroke}" stroke-width="1.5"/>
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



# ---- positions (same layout as hole-punching.gen.py) ----
RELAY = (440, 66)
R1 = (200, 250)      # Alice's router, the attacker
R2 = (680, 250)      # Bob's router
A_PH = (175, 312)    # Alice phone top-left
B_PH = (655, 312)    # Bob phone top-left
acx, bcx = 200, 680
rx, ry = RELAY

# The relay path, split where TLS is terminated: Alice's TLS ends at her router (forged
# certificate), the attacker opens its own TLS to the relay, the relay talks TLS to Bob.
up_a = f"M {acx} {A_PH[1]} L {acx} {R1[1]-20}"
arc = (f"M {acx} {R1[1]-20} C {acx} 120 {rx-160} {ry} {rx-32} {ry} "
       f"L {rx+32} {ry} "
       f"C {rx+160} {ry} {bcx} 120 {bcx} {R2[1]-20} "
       f"L {bcx} {B_PH[1]}")


def tube(d, color, opacity=0.3):
    return f'  <path d="{d}" fill="none" stroke="{color}" stroke-width="12" stroke-opacity="{opacity}" stroke-linecap="round"/>'


def callout(x, y, w, title, lines, color):
    out = [f'  <rect x="{x}" y="{y}" width="{w}" height="{32 + 20 * len(lines)}" rx="6" fill="#eee" stroke="{color}" stroke-width="1.5"/>',
           f'  <g font-family="{MONO}" font-size="12">',
           f'    <text x="{x + 12}" y="{y + 20}" fill="{color}" font-weight="bold">{title}</text>']
    for i, line in enumerate(lines):
        out.append(f'    <text x="{x + 12}" y="{y + 40 + 20 * i}" fill="{INK}">{line}</text>')
    out.append('  </g>')
    return "\n".join(out)


svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 470" role="img" aria-labelledby="title desc">
  <title id="title">An attacker on the Wi-Fi router intercepts the relay connection</title>
  <desc id="desc">Alice and Bob are connected through a relay. Alice's Wi-Fi router is an on-path attacker with a forged certificate: it terminates Alice's TLS connection to the relay and opens its own. Inside the TLS connections runs an end-to-end QUIC connection between Alice and Bob, authenticated by their Ed25519 keys, which passes through the attacker and the relay unchanged. The attacker sees which endpoint ids talk, packet sizes and timing. It cannot read or change payloads, or impersonate Alice or Bob.</desc>
{tube(up_a, AMBER, 0.5)}
{tube(arc, BLUE)}
  <path d="{up_a} {arc[arc.index('C'):]}" fill="none" stroke="{GREEN}" stroke-width="2.5"/>
{relay(rx, ry, "relay")}
{router(R1[0], R1[1], "", "", stroke=AMBER)}
{router(R2[0], R2[1], "", "")}
  <g font-family="{MONO}" font-size="12" text-anchor="end">
    <text x="{R1[0] - 50}" y="{R1[1] - 4}" fill="{INK}">Wi-Fi router</text>
    <text x="{R1[0] - 50}" y="{R1[1] + 14}" fill="{AMBER}">forged cert</text>
  </g>
  <text x="{R2[0] + 50}" y="{R2[1] + 4}" font-family="{MONO}" font-size="12" fill="{INK}">Wi-Fi router</text>
{phone(A_PH[0], A_PH[1], "1a9c…", iphone=True)}
{phone(B_PH[0], B_PH[1], "8e2b…")}
  <g font-family="{MONO}" font-size="14" fill="{INDIGO}" text-anchor="middle">
    <text x="{acx}" y="{A_PH[1] + 112}">Alice</text>
    <text x="{bcx}" y="{B_PH[1] + 112}">Bob</text>
  </g>
{callout(310, 168, 260, "attacker sees", ["which endpoint ids talk", "packet sizes and timing"], AMBER)}
{callout(310, 262, 260, "attacker can't", ["read or change payloads", "impersonate Alice or Bob"], GREEN)}
  <g font-family="{MONO}" font-size="11" fill="{GRAY}">
    <line x1="318" y1="356" x2="348" y2="356" stroke="{AMBER}" stroke-width="12" stroke-opacity="0.5"/>
    <text x="358" y="360">TLS to the attacker (forged cert)</text>
    <line x1="318" y1="380" x2="348" y2="380" stroke="{BLUE}" stroke-width="12" stroke-opacity="0.3"/>
    <text x="358" y="384">TLS to the relay (Web PKI)</text>
    <line x1="318" y1="404" x2="348" y2="404" stroke="{GREEN}" stroke-width="2.5"/>
    <text x="358" y="408">end-to-end QUIC (Ed25519 keys)</text>
  </g>
</svg>
'''
write_themes(Path(__file__).resolve().parents[1] / 'public/blog/iroh-and-the-number-4/relay-mitm.svg', svg)
