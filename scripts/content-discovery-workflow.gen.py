#!/usr/bin/env python3
"""Generate the DHT/address-index workflow. Run from any directory; stdlib only."""
from html import escape
from pathlib import Path
from svg_themes import write_themes

OUT = Path(__file__).resolve().parents[1] / 'public/animations/content-discovery-workflow.svg'
W, H, CYCLE = 900, 570, 28
GREEN, AMBER, BLUE = '#15803d', '#d97706', '#2563eb'
BOB, CAROL, ALICE = (120, 400), (450, 400), (780, 400)
DHT, INDEX = (215, 110), (468, 88)
PROVIDERS = [('83.149.27.64:6881', 'b7a1…', GREEN),
             ('176.58.93.21:6881', 'c84d…', AMBER)]


def text(x, y, label, color='#333', size=12, anchor='start'):
    return f'<text x="{x}" y="{y}" fill="{color}" font-family="Space Mono, monospace" font-size="{size}" text-anchor="{anchor}">{escape(label)}</text>'


def visible(start, end=26):
    points = [(0, 0), (start, 0), (start+.15, 1), (end, 1), (end+.15, 0), (CYCLE, 0)]
    assert all(a[0] <= b[0] for a, b in zip(points, points[1:]))
    return f'<animate attributeName="opacity" dur="{CYCLE}s" repeatCount="indefinite" values="{";".join(str(v) for _, v in points)}" keyTimes="{";".join(str(t/CYCLE) for t, _ in points)}"/>'


def show(body, start, end=26):
    return f'<g opacity="0">{visible(start, end)}{body}</g>'


def rect(x, y, w, h):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#f3f4f6" stroke="#9ca3af"/>'


wires, packets = [], []
interactions = {}


def packet(name, a, b, start, color):
    end = start + 1.5
    # Canonical control point keeps replies on the same curve as their queries.
    cx, cy = (a[0]+b[0])/2-55, min(a[1], b[1])-30
    path = f'M {a[0]} {a[1]} Q {cx} {cy} {b[0]} {b[1]}'
    # One path spans the whole exchange, including the wait for responses.
    key = tuple(sorted((a, b)))
    if key in interactions:
        old_path, first, last = interactions[key]
        interactions[key] = (old_path, min(first, start), max(last, end))
    else:
        interactions[key] = (path, start, end)
    motion = (f'<animateMotion path="{path}" dur="{CYCLE}s" repeatCount="indefinite" '
              f'calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;{start/CYCLE};{end/CYCLE};1"/>')
    packets.append(f'<g id="{name}">{motion}' + show(f'<circle r="5" fill="{color}"/>', start, end-.15) + '</g>')


# Announcers publish mappings from the same UDP sockets used for the DHT.
packet('bob-register', BOB, INDEX, 1, GREEN)
packet('carol-register', CAROL, INDEX, 3, AMBER)
packet('bob-announce', BOB, DHT, 6, GREEN)
packet('carol-announce', CAROL, DHT, 8, AMBER)
packet('alice-get-peers', ALICE, DHT, 11, BLUE)
packet('bob-address', DHT, ALICE, 13, GREEN)
packet('carol-address', DHT, ALICE, 13.4, AMBER)
packet('alice-index-query', ALICE, INDEX, 17, BLUE)
packet('bob-endpoint', INDEX, ALICE, 19, GREEN)
packet('carol-endpoint', INDEX, ALICE, 19.4, AMBER)

for path, start, end in interactions.values():
    wires.append(show(f'<path d="{path}" fill="none" stroke="#9ca3af" stroke-width="1.3"/>', start, end))

parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
         '<title id="title">Content discovery with Mainline and an address index</title>',
         '<desc id="desc">Bob and Carol publish signed address-to-endpoint mappings to the address index service and announce the same content hash to Mainline. Alice queries Mainline for provider addresses, then asks the address index service for their candidate endpoint IDs.</desc>']
# Mainline cloud, with one provider-list bubble rather than internal nodes.
for x, y, r in [(95, 115, 66), (165, 91, 76), (245, 94, 87), (320, 120, 67)]:
    parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#d1d5db"/>')
parts.extend(wires)
parts.extend(packets)
parts.append('<circle cx="215" cy="110" r="4" fill="#6366f1"/>')
parts += [text(215, 61, 'Mainline DHT', size=17, anchor='middle'),
          rect(95, 135, 240, 100),
          text(110, 156, 'infohash: 7c9e…'),
          text(110, 178, 'providers:', size=11)]
# Reuse the three-unit rack server design from publish-relay.gen.py.
sx, sy, sw, sh = 468, 65, 64, 66
parts.append(f'<rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="3" fill="#eee" stroke="#888" stroke-width="1.5"/>')
for i in range(3):
    ry = sy+4+i*21
    for dx in [8, 14]:
        parts.append(f'<circle cx="{sx+dx}" cy="{ry+8}" r="1.6" fill="#888"/>')
    for j in range(6):
        vx = sx+24+j*5
        parts.append(f'<line x1="{vx}" y1="{ry+3}" x2="{vx}" y2="{ry+13}" stroke="#888"/>')
    if i < 2:
        yy = sy+4+(i+1)*21-2
        parts.append(f'<line x1="{sx+2}" y1="{yy}" x2="{sx+sw-2}" y2="{yy}" stroke="#888"/>')
parts += [text(650, 32, 'Address index service', size=17, anchor='middle'),
          '<path d="M 556 88 L 540 98 L 556 108" fill="#f3f4f6" stroke="#9ca3af"/>',
          rect(556, 57, 334, 91),
          text(568, 80, 'UDP host:port → EndpointId', size=12)]

for i, (addr, eid, color) in enumerate(PROVIDERS):
    parts.append(show(text(121, 201+i*23, addr, color, 11), 7.5+i*2))
    parts.append(show(text(568, 107+i*23, f'{addr} → {eid}', color, 11), 2.5+i*2))

for (x, y), name, addr, eid, color in [
    (BOB, 'Bob', PROVIDERS[0][0], PROVIDERS[0][1], GREEN),
    (ALICE, 'Alice', '91.203.42.17:51432', 'a19f…', BLUE),
    (CAROL, 'Carol', PROVIDERS[1][0], PROVIDERS[1][1], AMBER),
]:
    parts += [f'<rect x="{x-22}" y="{y}" width="44" height="66" rx="7" fill="#eee" stroke="#6366f1" stroke-width="1.5"/>',
              f'<rect x="{x-16}" y="{y+7}" width="32" height="45" rx="3" fill="none" stroke="#6366f1"/>',
              f'<circle cx="{x}" cy="{y+59}" r="2" fill="#888"/>',
              text(x, y+84, name, color, 14, 'middle'),
              text(x, y+103, addr, color, 11, 'middle'),
              text(x, y+123, f'EndpointId: {eid}', color, 11, 'middle')]



def label(label, start, end, color=BLUE):
    x = 550 if color == BLUE else 160
    return show(rect(x, 255, 280, 36) + text(x+140, 278, label, color, 12, 'middle'), start, end)


parts += [label('Publish signed mapping', .6, 4.8, GREEN),
          label('announce_peer(7c9e…)', 5.6, 9.8, GREEN),
          label('get_peers(7c9e…)', 10.6, 14.9),
          label('Look up provider addresses', 16.6, 20.9)]
# Keep addresses in place; the index response adds endpoint IDs to each row.
providers = rect(670, 308, 220, 78) + text(682, 330, 'providers:', size=11)
for i, (addr, eid, color) in enumerate(PROVIDERS):
    y = 351+i*23
    providers += text(693, y, addr, color, 11)
    providers += show(text(815, y, f'→ {eid}', color, 11), 21)
parts.append(show(providers, 14.9))
parts.append(f'<rect x="0" y="567" width="0" height="3" fill="#9ca3af"><animate attributeName="width" from="0" to="900" dur="{CYCLE}s" repeatCount="indefinite"/></rect>')
parts.append('</svg>')
write_themes(OUT, '\n'.join(parts)+'\n')
print(f'Wrote {OUT}')
