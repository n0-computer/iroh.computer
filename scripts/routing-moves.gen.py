#!/usr/bin/env python3
"""Generator for routing-moves.svg.

Bob's commute story: home wifi (R1) → cellular (R2, cell tower) → in-flight
(R3, Starlink ground station). Alice stays put; the connection follows Bob.
20s loop, all SMIL so every element shares one timeline (no CSS/SMIL drift).

To change it, edit this script and run:  python3 routing-moves.gen.py
It writes ../public/blog/how-iroh-works/routing-moves.svg.
Keep the MDX <div> aspectRatio in sync with VB_W / VB_H.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.normpath(os.path.join(
    HERE, "..", "public", "blog", "how-iroh-works", "routing-moves.svg"))

MONO = "'Space Mono', monospace"
INDIGO, AMBER, GRAY = "#6366f1", "#d97706", "#888"
CYCLE = 20  # seconds

VB_W, VB_H = 800, 380

# Animation thresholds (fractions of the cycle):
#   0.25 — Bob starts moving (and R2 fades in)
#   0.30 — single-bend path swaps to multi R1→R2
#   0.55 — R2 + multi R1→R2 fade out
#   0.57 — R3 + multi R1→R3 fade in
#   0.75 — Bob reaches final position


def key_label(cx, y, text, size, color):
    """Tiny drawn key glyph + monospace text, replacing the 🔑 emoji."""
    s = size
    gold = "#eab308"
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
        f'a {rh:.2f} {rh:.2f} 0 1 0 {-2 * rh:.2f} 0 Z" fill="{gold}" fill-rule="evenodd"/>'
        f'<rect x="{bx:.2f}" y="{top:.2f}" width="{xr - bx:.2f}" height="{hs:.2f}" fill="{gold}"/>'
        f'<rect x="{xr - tw:.2f}" y="{bot:.2f}" width="{tw:.2f}" height="{s * 0.30:.2f}" fill="{gold}"/>'
        f'<rect x="{xr - tw - s * 0.30:.2f}" y="{bot:.2f}" width="{tw:.2f}" height="{s * 0.20:.2f}" fill="{gold}"/>'
        f'<text x="{xl + w + gap:.2f}" y="{y}" text-anchor="start" font-family="{MONO}" font-size="{size}" fill="{color}">{text}</text>'
    )


def iphone_outline(cx, top, bottom):
    """iPhone outer body + screen path with notch in the top. Centered at cx, body height = bottom-top."""
    bx0 = cx - 45                            # body 90 wide
    sx0, sx1 = cx - 42, cx + 42              # screen 84 wide
    sy0, sy1 = top + 3, bottom - 3           # screen y span
    # Notch geometry (matches the original hand-tuned shape):
    #   outer corners at (cx-15, sy0) and (cx+15, sy0) — 30px wide
    #   inner notch bottom at (cx-9 .. cx+9) at y = sy0 + 9
    n_outer_l, n_outer_r = cx - 15, cx + 15
    n_inner_l, n_inner_r = cx - 9, cx + 9
    n_bottom = sy0 + 9
    body = f'<rect x="{bx0}" y="{top}" width="90" height="{bottom - top}" rx="14" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>'
    path = (
        f'<path d="M {sx0 + 10} {sy0}\n'
        f'             L {n_outer_l} {sy0}\n'
        f'             Q {n_outer_l + 3} {sy0} {n_outer_l + 3} {sy0 + 3}\n'
        f'             L {n_outer_l + 3} {sy0 + 6}\n'
        f'             Q {n_outer_l + 3} {n_bottom} {n_inner_l} {n_bottom}\n'
        f'             L {n_inner_r} {n_bottom}\n'
        f'             Q {n_outer_r - 3} {n_bottom} {n_outer_r - 3} {sy0 + 6}\n'
        f'             L {n_outer_r - 3} {sy0 + 3}\n'
        f'             Q {n_outer_r - 3} {sy0} {n_outer_r} {sy0}\n'
        f'             L {sx1 - 10} {sy0}\n'
        f'             A 10 10 0 0 1 {sx1} {sy0 + 10}\n'
        f'             L {sx1} {sy1 - 10}\n'
        f'             A 10 10 0 0 1 {sx1 - 10} {sy1}\n'
        f'             L {sx0 + 10} {sy1}\n'
        f'             A 10 10 0 0 1 {sx0} {sy1 - 10}\n'
        f'             L {sx0} {sy0 + 10}\n'
        f'             A 10 10 0 0 1 {sx0 + 10} {sy0} Z"\n'
        f'          fill="none" stroke="{INDIGO}" stroke-width="1.5"/>'
    )
    return body + "\n    " + path


def phone_iphone(cx, top, key, label, *, ip_text=None, animated_ips=None):
    """Static iPhone — used for Alice."""
    lines = [f'  <g>']
    if ip_text is not None:
        lines.append(f'    <text x="{cx}" y="{top - 10}" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}">{ip_text}</text>')
    if animated_ips:
        for ip in animated_ips:
            lines.append(ip)
    lines += [
        f'    {iphone_outline(cx, top, top + 150)}',
        f'    <rect x="{cx - 25}" y="{top + 50}" width="50" height="30" rx="3" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>',
        f'    <text x="{cx}" y="{top + 69}" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{AMBER}">iroh</text>',
        f'    {key_label(cx, top + 95, key, 10, AMBER)}',
        f'    <text x="{cx}" y="{top + 175}" text-anchor="middle" font-family="{MONO}" font-size="14" fill="{INDIGO}">{label}</text>',
        f'  </g>',
    ]
    return "\n".join(lines)


def phone_android(cx, top, key, label, *, animated_ips=None):
    """Android phone — used for Bob (with movement and IP changes)."""
    bx0 = cx - 45
    sx0 = cx - 42
    lines = ['  <g>']
    lines.append(f'    <animateTransform attributeName="transform" type="translate"\n'
                 f'                      values="0 0;0 0;480 0;480 0" keyTimes="0;0.25;0.75;1"\n'
                 f'                      dur="{CYCLE}s" repeatCount="indefinite"/>')
    if animated_ips:
        for ip in animated_ips:
            lines.append('    ' + ip)
    lines += [
        f'    <rect x="{bx0}" y="{top}" width="90" height="150" rx="14" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>',
        f'    <rect x="{sx0}" y="{top + 3}" width="84" height="144" rx="11" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>',
        f'    <circle cx="{cx}" cy="{top + 11}" r="2" fill="{GRAY}"/>',
        f'    <rect x="{cx - 25}" y="{top + 50}" width="50" height="30" rx="3" fill="#eee" stroke="{AMBER}" stroke-width="1.5"/>',
        f'    <text x="{cx}" y="{top + 69}" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{AMBER}">iroh</text>',
        f'    {key_label(cx, top + 95, key, 10, AMBER)}',
        f'    <text x="{cx}" y="{top + 175}" text-anchor="middle" font-family="{MONO}" font-size="14" fill="{INDIGO}">{label}</text>',
        '  </g>',
    ]
    return "\n".join(lines)


def bob_ip(text, key_times, vals, *, initial_opacity=None):
    extra = '' if initial_opacity is None else f' opacity="{initial_opacity}"'
    return (
        f'<text x="240" y="180" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}"{extra}>'
        f'{text}<animate attributeName="opacity" values="{vals}" keyTimes="{key_times}" dur="{CYCLE}s" repeatCount="indefinite"/>'
        f'</text>'
    )


def morph_path(d0, mid_d, k_mid_start, k_mid_end, stroke_attrs):
    """Path with d-morph animation between two shapes."""
    return (
        f'  <path d="{d0}"\n'
        f'        fill="none" stroke="{INDIGO}" stroke-width="1.5"\n'
        f'        {stroke_attrs}>\n'
        f'    <animate attributeName="d"\n'
        f'             values="{d0};\n'
        f'                     {d0};\n'
        f'                     {mid_d};\n'
        f'                     {mid_d}"\n'
        f'             keyTimes="0; {k_mid_start}; {k_mid_end}; 1"\n'
        f'             dur="{CYCLE}s"\n'
        f'             repeatCount="indefinite"/>\n'
    )


# ============================ Alice (static iPhone) ============================
alice_block = phone_iphone(120, 190, "a4f7c0…", "Alice", ip_text="10.0.0.42")

# ============================ Bob (Android, moves) ============================
bob_ips = [
    bob_ip("10.0.0.7",    "0;0.29;0.31;1",           "1;1;0;0"),
    bob_ip("192.168.1.7", "0;0.29;0.31;0.55;0.57;1", "0;0;1;1;0;0", initial_opacity="0"),
    bob_ip("172.16.0.7",  "0;0.55;0.57;1",           "0;0;1;1",     initial_opacity="0"),
]
bob_block = phone_android(240, 190, "8e2b1d…", "Bob", animated_ips=bob_ips)

# ============================ Connection paths ============================
single_d = "M 120 240 Q 120 161 180 161 Q 240 161 240 240"
single_d2 = "M 120 240 Q 120 161 180 161 Q 285 161 285 240"
single_path = (
    f'  <!-- Single-bend connection (R1 only) -->\n'
    f'  <path d="{single_d}"\n'
    f'        fill="none" stroke="{INDIGO}" stroke-width="1.5"\n'
    f'        marker-start="url(#arr)" marker-end="url(#arr)">\n'
    f'    <animate attributeName="d"\n'
    f'             values="{single_d};\n'
    f'                     {single_d};\n'
    f'                     {single_d2};\n'
    f'                     {single_d2}"\n'
    f'             keyTimes="0; 0.25; 0.3; 1"\n'
    f'             dur="{CYCLE}s"\n'
    f'             repeatCount="indefinite"/>\n'
    f'    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.29;0.31;1" dur="{CYCLE}s" repeatCount="indefinite"/>\n'
    f'  </path>\n'
)

multi_r1r2_d = "M 120 240 C 120 170 180 200 180 130 L 180 90 C 180 30 420 30 420 90 L 420 130 C 420 200 285 170 285 240"
multi_r1r2_d2 = "M 120 240 C 120 170 180 200 180 130 L 180 90 C 180 30 420 30 420 90 L 420 130 C 420 200 528 170 528 240"
multi_r1r2_path = (
    f'  <!-- Multi-router R1 → R2 (visible 31% → 55%) -->\n'
    f'  <path d="{multi_r1r2_d}"\n'
    f'        fill="none" stroke="{INDIGO}" stroke-width="1.5"\n'
    f'        marker-start="url(#arr)" marker-end="url(#arr)" opacity="0">\n'
    f'    <animate attributeName="d"\n'
    f'             values="{multi_r1r2_d};\n'
    f'                     {multi_r1r2_d};\n'
    f'                     {multi_r1r2_d2};\n'
    f'                     {multi_r1r2_d2}"\n'
    f'             keyTimes="0; 0.3; 0.55; 1"\n'
    f'             dur="{CYCLE}s"\n'
    f'             repeatCount="indefinite"/>\n'
    f'    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.29;0.31;0.55;0.57;1" dur="{CYCLE}s" repeatCount="indefinite"/>\n'
    f'  </path>\n'
)

multi_r1r3_d = "M 120 240 C 120 170 180 200 180 130 L 180 90 C 180 10 660 10 660 90 L 660 130 C 660 200 552 170 552 240"
multi_r1r3_d2 = "M 120 240 C 120 170 180 200 180 130 L 180 90 C 180 10 660 10 660 90 L 660 130 C 660 200 720 170 720 240"
multi_r1r3_path = (
    f'  <!-- Multi-router R1 → R3 (skips R2 — visible 57% → end) -->\n'
    f'  <path d="{multi_r1r3_d}"\n'
    f'        fill="none" stroke="{INDIGO}" stroke-width="1.5"\n'
    f'        marker-start="url(#arr)" marker-end="url(#arr)" opacity="0">\n'
    f'    <animate attributeName="d"\n'
    f'             values="{multi_r1r3_d};\n'
    f'                     {multi_r1r3_d};\n'
    f'                     {multi_r1r3_d2};\n'
    f'                     {multi_r1r3_d2}"\n'
    f'             keyTimes="0; 0.57; 0.75; 1"\n'
    f'             dur="{CYCLE}s"\n'
    f'             repeatCount="indefinite"/>\n'
    f'    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.57;1" dur="{CYCLE}s" repeatCount="indefinite"/>\n'
    f'  </path>\n'
)

# ============================ Routers ============================
# R1 — home wifi (always visible). Public IP fades in once multi-routing kicks in.
r1 = f'''  <!-- Router 1 (home) — always visible -->
  <g>
    <title>home router</title>
    <rect x="130" y="78" width="100" height="72" fill="transparent" pointer-events="all"/>
    <text x="180" y="82" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}" opacity="0">203.0.113.1<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.29;0.31;1" dur="{CYCLE}s" repeatCount="indefinite"/></text>
    <polyline points="150,125 140,125 140,82" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="140" cy="80" r="1.5" fill="{GRAY}"/>
    <polyline points="210,125 220,125 220,82" fill="none" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="220" cy="80" r="1.5" fill="{GRAY}"/>
    <rect x="150" y="90" width="60" height="40" rx="3" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <circle cx="200" cy="124" r="1.5" fill="{AMBER}"/>
    <text x="180" y="145" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}">10.0.0.1</text>
  </g>'''

# R2 — cell tower (appears 5s, fades out at 11s). 3 panels on a mast with crossbar.
r2 = f'''  <!-- Router 2 (cell tower) — appears 5s, fades out at 11s -->
  <g opacity="0" visibility="hidden">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.25;0.27;0.55;0.57;1" dur="{CYCLE}s" repeatCount="indefinite"/>
    <animate attributeName="visibility" values="hidden;hidden;visible;visible;hidden;hidden" keyTimes="0;0.25;0.27;0.55;0.57;1" calcMode="discrete" dur="{CYCLE}s" repeatCount="indefinite"/>
    <title>mobile network</title>
    <rect x="395" y="78" width="50" height="72" fill="transparent" pointer-events="all"/>
    <text x="420" y="82" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}">198.51.100.1</text>
    <line x1="418" y1="128" x2="418" y2="82" stroke="{GRAY}" stroke-width="1"/>
    <line x1="400" y1="95" x2="440" y2="95" stroke="{GRAY}" stroke-width="1.5"/>
    <rect x="404" y="88" width="4" height="18" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <rect x="418" y="88" width="4" height="18" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <rect x="432" y="88" width="4" height="18" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <text x="420" y="145" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}">192.168.1.1</text>
  </g>'''

# R3 — Starlink ground station (fades in at 11s). Flat tilted parallelogram + kickstand.
r3 = f'''  <!-- Router 3 (Starlink ground station, far away) — fades in at 11s -->
  <g opacity="0" visibility="hidden">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.57;1" dur="{CYCLE}s" repeatCount="indefinite"/>
    <animate attributeName="visibility" values="hidden;hidden;visible;visible" keyTimes="0;0.55;0.57;1" calcMode="discrete" dur="{CYCLE}s" repeatCount="indefinite"/>
    <title>satellite internet</title>
    <rect x="632" y="78" width="64" height="72" fill="transparent" pointer-events="all"/>
    <text x="660" y="82" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}">100.64.10.1</text>
    <polygon points="664,108 668,108 672,120 668,120" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <polygon points="640,116 680,96 684,100 644,120" fill="#eee" stroke="{GRAY}" stroke-width="1.5"/>
    <text x="660" y="145" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{GRAY}">172.16.0.1</text>
  </g>'''

# ============================ Timer bar ============================
timer = f'''  <!-- Timer bar (shows position in the {CYCLE}s loop) -->
  <g>
    <rect x="0" y="376" width="0" height="3" fill="#9ca3af">
      <animate attributeName="width" from="0" to="{VB_W}" dur="{CYCLE}s" repeatCount="indefinite"/>
    </rect>
  </g>'''

# ============================ Assemble ============================
svg = f'''<svg viewBox="0 0 {VB_W} {VB_H}" xmlns="http://www.w3.org/2000/svg">
  <style>/* transparent-canvas */ :root {{ background-color: transparent; color-scheme: light dark; }}</style>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{INDIGO}"/>
    </marker>
  </defs>

  <!-- ========== Alice (iPhone with notch, static) ========== -->
{alice_block}

  <!-- ========== Bob (Android with hole-punch, moves rightward) ========== -->
{bob_block}

{single_path}
{multi_r1r2_path}
{multi_r1r3_path}
  <!-- ========== Routers drawn last (on top), so the connection tucks behind them ========== -->
{r1}

{r2}

{r3}

  <!-- ========== Timer bar (shows position in the loop) ========== -->
{timer}
</svg>
'''

open(OUT_PATH, "w").write(svg)
print(f"wrote {len(svg)} bytes -> {OUT_PATH}")
