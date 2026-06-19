#!/usr/bin/env python3
"""Generator for connect-by-key.svg.

Alice and Bob each get an iroh endpoint identified by a stable cryptographic
key (gold key glyph + short hex prefix). Bob's IP changes 4 times during the
loop — strikethrough on the old IP as it rotates — while the connection
between the keys (unidirectional → bidirectional after the handshake) stays
up. The point: iroh dials keys, not addresses.

14s loop. CSS-driven keyframes (single clock, no SMIL/CSS mixing).

To change it, edit this script and run:  python3 connect-by-key.gen.py
It writes ../public/blog/how-iroh-works/connect-by-key.svg.
Keep the MDX <div> aspectRatio in sync with VB_W / VB_H.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "blog", "how-iroh-works", "connect-by-key.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY, RED = "#6366f1", "#d97706", "#888", "#dc2626"
GOLD = "#eab308"
CYCLE = 14  # seconds
VB_W, VB_H = 800, 320


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


def ip_animation_css():
    lines = []
    for i, (vis_from, vis_to) in enumerate(TEXT_KEYFRAMES, start=1):
        cls = f'bob-ip{i}-t'
        if i == 1:
            lines.append(f'      .{cls} {{ animation: {cls} {CYCLE}s infinite linear; }}')
        else:
            lines.append(f'      .{cls} {{ animation: {cls} {CYCLE}s infinite linear; opacity: 0; }}')
    for i, kf in enumerate(LINE_KEYFRAMES, start=1):
        if kf is None: continue
        cls = f'bob-ip{i}-l'
        lines.append(f'      .{cls} {{ animation: {cls} {CYCLE}s infinite linear; opacity: 0; }}')
    lines.append('')
    for i, (vis_from, vis_to) in enumerate(TEXT_KEYFRAMES, start=1):
        if i == 1:
            # Start visible, fade out at end of slot 1
            lines.append(f'      @keyframes bob-ip{i}-t {{ 0%, {vis_to}% {{ opacity: 1; }} {vis_to + 2}%, 100% {{ opacity: 0; }} }}')
        elif i < len(TEXT_KEYFRAMES):
            lines.append(f'      @keyframes bob-ip{i}-t {{ 0%, {vis_from - 2}% {{ opacity: 0; }} {vis_from}%, {vis_to}% {{ opacity: 1; }} {vis_to + 2}%, 100% {{ opacity: 0; }} }}')
        else:
            # Final IP — stay visible to end
            lines.append(f'      @keyframes bob-ip{i}-t {{ 0%, {vis_from - 2}% {{ opacity: 0; }} {vis_from}%, 100% {{ opacity: 1; }} }}')
    for i, kf in enumerate(LINE_KEYFRAMES, start=1):
        if kf is None: continue
        sf, st = kf
        vis_from, vis_to = TEXT_KEYFRAMES[i - 1]
        lines.append(f'      @keyframes bob-ip{i}-l {{ 0%, {sf - 2}% {{ opacity: 0; }} {sf}%, {st}% {{ opacity: 1; }} {st + 2}%, 100% {{ opacity: 0; }} }}')
    return "\n".join(lines)


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
        f'  <g class="keys">{key_label(200, 208, "a4f7c0…", 11, AMBER)}</g>'
    )


def bob_android():
    """Bob's Android phone (large)."""
    return (
        f'  <rect x="540" y="60" width="120" height="220" rx="22" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>\n'
        f'  <rect x="544" y="64" width="112" height="212" rx="18" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>\n'
        f'  <circle cx="600" cy="76" r="3" fill="{GRAY}"/>\n'
        f'  <rect x="570" y="150" width="60" height="40" rx="4" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>\n'
        f'  <text x="600" y="176" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{AMBER}">iroh</text>\n'
        f'  <g class="keys">{key_label(600, 208, "8e2b1d…", 11, AMBER)}</g>'
    )


# ============================ assemble ============================
ip_rows = []
for i, (text, lx0, lx1) in enumerate(BOB_IPS, start=1):
    ip_rows.append(f'  <text class="bob-ip{i}-t" x="600" y="30" text-anchor="middle" font-family="{MONO}" font-size="12" fill="{GRAY}">{text}</text>')
    if lx0 is not None:
        ip_rows.append(f'  <line class="bob-ip{i}-l" x1="{lx0}" y1="26" x2="{lx1}" y2="26" stroke="{RED}" stroke-width="1.5"/>')

svg = f'''<svg viewBox="0 0 {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>
  <defs>
    <style><![CDATA[
      /* {CYCLE}s loop:
         0-1s   IP1 valid
         1-2s   IP1 struck
         2-3s   IP2 valid
         3-4s   IP2 struck
         4-5s   IP3 valid
         5-6s   keys appear, "connect" label + unidirectional arrow
         6s     arrow becomes bidirectional, "connect" label vanishes
         7-8s   IP3 struck (network change while connected)
         8-14s  IP4 valid, connection stays bidirectional */

{ip_animation_css()}

      .keys    {{ animation: keys    {CYCLE}s infinite linear; opacity: 0; }}
      .uni-arr {{ animation: uni-arr {CYCLE}s infinite linear; opacity: 0; }}
      .bi-arr  {{ animation: bi-arr  {CYCLE}s infinite linear; opacity: 0; }}

      /* Keys appear at 5s and stay */
      @keyframes keys    {{ 0%, 35% {{ opacity: 0; }} 37%, 100% {{ opacity: 1; }} }}
      /* Unidirectional arrow + "connect" label: only 5–6s */
      @keyframes uni-arr {{ 0%, 35% {{ opacity: 0; }} 37%, 42% {{ opacity: 1; }} 44%, 100% {{ opacity: 0; }} }}
      /* Bidirectional arrow: 6s onwards */
      @keyframes bi-arr  {{ 0%, 42% {{ opacity: 0; }} 44%, 100% {{ opacity: 1; }} }}

      .timer-fill {{ animation: timer-fill {CYCLE}s infinite linear; transform-origin: left; transform: scaleX(0); }}
      @keyframes timer-fill {{ to {{ transform: scaleX(1); }} }}
    ]]></style>

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
  <g class="uni-arr">
    <line x1="230" y1="170" x2="570" y2="170" stroke="{INDIGO}" stroke-width="1.5" marker-end="url(#arr)"/>
    <text x="400" y="161" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{INDIGO}">connect</text>
  </g>

  <!-- ========== Bidirectional arrow (6s onwards) ========== -->
  <line class="bi-arr" x1="230" y1="170" x2="570" y2="170" stroke="{INDIGO}" stroke-width="1.5" marker-start="url(#arr)" marker-end="url(#arr)"/>

  <!-- Timer bar (position in loop) -->
  <g>
    <rect class="timer-fill" x="0" y="316" width="{VB_W}" height="3" fill="#9ca3af"/>
  </g>
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
