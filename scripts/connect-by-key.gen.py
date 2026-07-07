#!/usr/bin/env python3
"""Generator for connect-by-key.svg.

Alice and Bob each get an iroh endpoint identified by a stable cryptographic
key (gold key glyph + short hex prefix). Bob's IP changes 4 times during the
loop — strikethrough on the old IP as it rotates — while the connection
between the keys (unidirectional → bidirectional after the handshake) stays
up. The point: iroh dials keys, not addresses.

14s loop. SMIL-driven (<animate>/<animateTransform>), single clock — no CSS
keyframes. SMIL keeps everything (opacity here, motion-along-paths elsewhere)
on one clock, co-located with the geometry, so the file animates under any host
or embedding. These diagrams are also consumed cross-site by
docs.iroh.computer, where self-contained SMIL is what survives.

To change it, edit this script and run:  python3 connect-by-key.gen.py
It writes ../public/animations/connect-by-key.svg.
The page embeds this via <object>/<img src=... style='width:100%'/>; the
intrinsic aspect ratio comes from the SVG viewBox (VB_W x VB_H).
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "animations", "connect-by-key.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, RED = "#6366f1", "#d97706", "#888", "#dc2626"
GOLD = "#eab308"
CYCLE = 14  # seconds
VB_W, VB_H = 800, 320


def fmt_kt(pct):
    """Percentage (0-100) of the loop -> SMIL keyTimes fraction string."""
    if pct <= 0:
        return "0"
    if pct >= 100:
        return "1"
    return f"{pct / 100:.4f}".rstrip("0").rstrip(".")


def opacity_anim(stops):
    """SMIL <animate> on opacity. `stops` is a list of (percent, opacity)
    matching what a CSS @keyframes block would express; the first stop's value
    is also the element's resting opacity (set it as the opacity attribute)."""
    keytimes = ";".join(fmt_kt(p) for p, _ in stops)
    values = ";".join(str(v) for _, v in stops)
    return (f'<animate attributeName="opacity" dur="{CYCLE}s" '
            f'repeatCount="indefinite" calcMode="linear" '
            f'keyTimes="{keytimes}" values="{values}"/>')


def key_label(cx, y, text, size, color):
    """Tiny drawn gold key glyph + monospace text, replacing the 🔑 emoji."""
    s = size
    w = s * 1.3
    gap = s * 0.3
    xl = cx - (w + gap + s * 0.6 * len(text)) / 2
    cy = y - s * 0.30
    rb, rh = s * 0.34, s * 0.15
    bx = xl + rb
    hs = s * 0.18
    xr = xl + w
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
        f'<text x="{xl + w + gap:.2f}" y="{y}" text-anchor="start" font-family="{MONO}" font-size="{size}" fill="{color}">{text}</text>'
    )


# Bob's IP rotation (text + strikethrough). Each (text, line_x0, line_x1).
BOB_IPS = [
    ("192.168.1.7",   560, 640),
    ("203.0.113.15",  555, 645),
    ("172.20.4.88",   560, 640),
    ("192.168.10.55", None, None),  # final IP — no strikethrough
]

# Keyframes per IP slot (text shows; line strikes through about halfway). Times in %.
# 14s loop. Slot 1 ~ 0-2s, slot 2 ~ 2-4s, slot 3 ~ 4-8s (struck at 7s), slot 4 ~ 8-14s.
TEXT_KEYFRAMES = [
    # (visible-from%, visible-to%) for each IP
    (0,  13),
    (15, 28),
    (30, 56),
    (58, 100),
]
LINE_KEYFRAMES = [
    # (struck-from%, struck-to%) — None means no strike
    (8,  13),
    (22, 28),
    (51, 56),
    None,
]


def text_stops(i):
    """Opacity stops for IP-text slot i (1-indexed), matching the old CSS."""
    vis_from, vis_to = TEXT_KEYFRAMES[i - 1]
    if i == 1:
        # Start visible, fade out at end of slot 1.
        return [(0, 1), (vis_to, 1), (vis_to + 2, 0), (100, 0)]
    if i < len(TEXT_KEYFRAMES):
        return [(0, 0), (vis_from - 2, 0), (vis_from, 1), (vis_to, 1), (vis_to + 2, 0), (100, 0)]
    # Final IP — stay visible to end.
    return [(0, 0), (vis_from - 2, 0), (vis_from, 1), (100, 1)]


def line_stops(i):
    """Opacity stops for the strikethrough line of slot i (1-indexed)."""
    sf, st = LINE_KEYFRAMES[i - 1]
    return [(0, 0), (sf - 2, 0), (sf, 1), (st, 1), (st + 2, 0), (100, 0)]


# Keys appear at ~5s and stay; "connect" arrow shows 5–6s; bidirectional from 6s.
KEYS_ANIM = opacity_anim([(0, 0), (35, 0), (37, 1), (100, 1)])
UNI_ANIM = opacity_anim([(0, 0), (35, 0), (37, 1), (42, 1), (44, 0), (100, 0)])
BI_ANIM = opacity_anim([(0, 0), (42, 0), (44, 1), (100, 1)])


def alice_iphone():
    """Alice's iPhone (large, with notch)."""
    return (
        f'  <rect x="140" y="60" width="120" height="220" rx="22" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>\n'
        f'  <path d="M 162 64\n'
        f'           L 177 64\n'
        f'           Q 180 64 180 67\n'
        f'           L 180 70\n'
        f'           Q 180 75 185 75\n'
        f'           L 215 75\n'
        f'           Q 220 75 220 70\n'
        f'           L 220 67\n'
        f'           Q 220 64 223 64\n'
        f'           L 238 64\n'
        f'           A 18 18 0 0 1 256 82\n'
        f'           L 256 258\n'
        f'           A 18 18 0 0 1 238 276\n'
        f'           L 162 276\n'
        f'           A 18 18 0 0 1 144 258\n'
        f'           L 144 82\n'
        f'           A 18 18 0 0 1 162 64 Z"\n'
        f'        fill="none" stroke="{INDIGO}" stroke-width="1.5"/>\n'
        f'  <rect x="170" y="150" width="60" height="40" rx="4" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>\n'
        f'  <text x="200" y="176" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{AMBER}">iroh</text>\n'
        f'  <g opacity="0">{KEYS_ANIM}{key_label(200, 208, "a4f7c0…", 11, AMBER)}</g>'
    )


def bob_android():
    """Bob's Android phone (large)."""
    return (
        f'  <rect x="540" y="60" width="120" height="220" rx="22" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>\n'
        f'  <rect x="544" y="64" width="112" height="212" rx="18" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>\n'
        f'  <circle cx="600" cy="76" r="3" fill="{GRAY}"/>\n'
        f'  <rect x="570" y="150" width="60" height="40" rx="4" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>\n'
        f'  <text x="600" y="176" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{AMBER}">iroh</text>\n'
        f'  <g opacity="0">{KEYS_ANIM}{key_label(600, 208, "8e2b1d…", 11, AMBER)}</g>'
    )


# ============================ assemble ============================
ip_rows = []
for i, (text, lx0, lx1) in enumerate(BOB_IPS, start=1):
    t_stops = text_stops(i)
    init = t_stops[0][1]
    ip_rows.append(
        f'  <text x="600" y="30" text-anchor="middle" font-family="{MONO}" font-size="12" '
        f'fill="{GRAY}" opacity="{init}">{text}{opacity_anim(t_stops)}</text>')
    if lx0 is not None:
        ip_rows.append(
            f'  <line x1="{lx0}" y1="26" x2="{lx1}" y2="26" stroke="{RED}" stroke-width="1.5" '
            f'opacity="0">{opacity_anim(line_stops(i))}</line>')

svg = f'''<svg viewBox="0 0 {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>
  <!-- {CYCLE}s loop (SMIL):
       0-1s   IP1 valid
       1-2s   IP1 struck
       2-3s   IP2 valid
       3-4s   IP2 struck
       4-5s   IP3 valid
       5-6s   keys appear, "connect" label + unidirectional arrow
       6s     arrow becomes bidirectional, "connect" label vanishes
       7-8s   IP3 struck (network change while connected)
       8-14s  IP4 valid, connection stays bidirectional -->
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{INDIGO}"/>
    </marker>
  </defs>

  <!-- ========== IPs at top row ========== -->
  <text x="200" y="30" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{GRAY}">10.0.0.42</text>

{chr(10).join(ip_rows)}

  <!-- ========== Alice (iPhone) ========== -->
{alice_iphone()}

  <!-- ========== Bob (Android) ========== -->
{bob_android()}

  <!-- ========== User labels ========== -->
  <text x="200" y="305" text-anchor="middle" font-family="{MONO}" font-size="16" fill="{INDIGO}">Alice</text>
  <text x="600" y="305" text-anchor="middle" font-family="{MONO}" font-size="16" fill="{INDIGO}">Bob</text>

  <!-- ========== Unidirectional arrow (5-6s) — Alice → Bob with "connect" label ========== -->
  <g opacity="0">
    {UNI_ANIM}
    <line x1="230" y1="170" x2="570" y2="170" stroke="{INDIGO}" stroke-width="1.5" marker-end="url(#arr)"/>
    <text x="400" y="161" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{INDIGO}">connect</text>
  </g>

  <!-- ========== Bidirectional arrow (6s onwards) ========== -->
  <line x1="230" y1="170" x2="570" y2="170" stroke="{INDIGO}" stroke-width="1.5" marker-start="url(#arr)" marker-end="url(#arr)" opacity="0">{BI_ANIM}</line>

  <!-- Timer bar (position in loop) -->
  <rect x="0" y="316" width="{VB_W}" height="3" fill="#9ca3af" transform="scale(0 1)">
    <animateTransform attributeName="transform" type="scale" dur="{CYCLE}s" repeatCount="indefinite" calcMode="linear" keyTimes="0;1" values="0 1;1 1"/>
  </rect>
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
