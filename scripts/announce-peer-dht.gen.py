#!/usr/bin/env python3
"""Generate the provider-list DHT animation for the global content discovery post.

Run: python3 scripts/announce-peer-dht.gen.py
Standard library only; one shared SMIL timeline, like publish-relay-dht.gen.py.
Routing and the pre-announce token exchange are abstracted away. Provider lists grow when packets arrive.
"""
from pathlib import Path
from svg_themes import write_themes
from html import escape
import math

OUT = Path(__file__).resolve().parents[1] / 'public/animations/announce-peer-dht.svg'
W, H, CYCLE = 900, 530, 22.0
SPEED = 220
INDIGO, BLUE, GREEN, AMBER, GRAY = '#6366f1', '#2563eb', '#15803d', '#d97706', '#888'
MONO = "'Space Mono', monospace"
NODES = [(280, 150), (480, 125), (680, 150)]
BOB, CAROL, ALICE = (105, 365), (360, 365), (790, 365)


def opacity(points):
    assert points[0][0] == 0 and points[-1][0] == CYCLE
    assert all(a[0] <= b[0] for a, b in zip(points, points[1:]))
    times = ';'.join(f'{t/CYCLE:.6f}' for t, _ in points)
    values = ';'.join(str(v) for _, v in points)
    return f'<animate attributeName="opacity" dur="{CYCLE}s" repeatCount="indefinite" values="{values}" keyTimes="{times}"/>'


def visible(start, end=20.8):
    return opacity([(0, 0), (start, 0), (start+.2, 1), (end, 1), (end+.2, 0), (CYCLE, 0)])


def text(x, y, label, size=12, color='#111', anchor='middle'):
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{MONO}" font-size="{size}" fill="{color}">{escape(label)}</text>'


def arc(a, b):
    x, y = a
    xx, yy = b
    cx, cy = (x+xx)/2, min(y, yy)-35
    path = f'M {x} {y} Q {cx} {cy} {xx} {yy}'
    prev, length = a, 0
    for i in range(1, 101):
        t = i/100
        p = ((1-t)**2*x+2*(1-t)*t*cx+t*t*xx,
             (1-t)**2*y+2*(1-t)*t*cy+t*t*yy)
        length += math.dist(prev, p)
        prev = p
    return path, length/SPEED


wires, packets = [], []

def wire(name, a, b, launch, color, response=False):
    path, travel = arc(a, b)
    arrival = launch+travel
    back = arrival+travel if response else arrival
    wires.append(f'<path id="{name}" d="{path}" fill="none" stroke="#a1aab8" stroke-width="1.3" opacity="0">{visible(launch-.4, back+.2)}</path>')
    times = [0, launch, arrival, back, CYCLE] if response else [0, launch, arrival, CYCLE]
    positions = [0, 0, 1, 0, 0] if response else [0, 0, 1, 1]
    motion = (f'<animateMotion dur="{CYCLE}s" repeatCount="indefinite" calcMode="linear" '
              f'keyTimes="{";".join(f"{t/CYCLE:.6f}" for t in times)}" '
              f'keyPoints="{";".join(map(str, positions))}"><mpath href="#{name}"/></animateMotion>')
    if response:
        dots = f'<circle r="4" fill="{BLUE}" opacity="0">{visible(launch, arrival-.2)}</circle>'
        dots += f'<circle r="4" fill="{GREEN}" opacity="0">{visible(arrival, back-.2)}</circle>'
    else:
        dots = f'<circle r="4" fill="{color}" opacity="0">{visible(launch, arrival-.2)}</circle>'
    packets.append(f'<g>{motion}{dots}</g>')
    return arrival, back


bob_arrivals = [wire(f'b{i}', BOB, n, 1.5, GREEN)[0] for i, n in enumerate(NODES)]
carol_arrivals = [wire(f'c{i}', CAROL, n, 5.5, AMBER)[0] for i, n in enumerate(NODES)]
answers = [wire(f'q{i}', ALICE, n, 10, BLUE, True)[1] for i, n in enumerate(NODES)]
first, second, third = sorted(answers)

parts = [f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">
<title id="title">Mainline DHT: announcing and finding providers</title>
<desc id="desc">Bob and Carol announce the same infohash. Each illustrated DHT node adds both addresses to its provider list. Alice queries the infohash with get_peers and receives a list containing both providers. Routing and the token exchange before announcing are omitted.</desc>
<style>:root {{ background: transparent; color-scheme: light dark; }}</style>''']
# Fill-only cloud and light cards keep the diagram readable on either page theme.
for x, y, r in [(250, 154, 84), (364, 127, 105), (489, 119, 108), (609, 137, 105), (711, 162, 87)]:
    parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#d1d5db"/>')
parts.append(text(480, 70, 'Mainline DHT', 17))
parts.extend(wires)
# Draw moving packets behind all cards, devices, and callouts.
parts.extend(packets)
for i, (x, y) in enumerate(NODES):
    parts.append(f'<circle cx="{x}" cy="{y}" r="5" fill="{INDIGO}"/>')
    parts.append(f'<rect x="{x-91}" y="{y+13}" width="182" height="83" rx="6" fill="#f3f4f6" stroke="#9ca3af"/>')
    parts.append(text(x, y+32, 'infohash: 7c9e…', 12))
    parts.append(text(x-79, y+51, 'providers:', 11, '#555', 'start'))
    parts.append(f'<g opacity="0">{visible(bob_arrivals[i])}{text(x-68, y+68, "83.149.27.64:6881", 11, GREEN, "start")}</g>')
    parts.append(f'<g opacity="0">{visible(carol_arrivals[i])}{text(x-68, y+83, "176.58.93.21:6881", 11, AMBER, "start")}</g>')


def device(pos, name, addr, color):
    x, y = pos
    return (f'<rect x="{x-22}" y="{y}" width="44" height="66" rx="7" fill="#eee" stroke="{INDIGO}" stroke-width="1.5"/>'
            f'<rect x="{x-16}" y="{y+7}" width="32" height="45" rx="3" fill="none" stroke="{INDIGO}"/>'
            f'<circle cx="{x}" cy="{y+59}" r="2" fill="{GRAY}"/>'
            + text(x, y+84, name, 14, color)
            + text(x, y+103, addr, 11, GRAY))


parts.append(device(BOB, 'Bob', '83.149.27.64:6881', GREEN))
parts.append(device(CAROL, 'Carol', '176.58.93.21:6881', AMBER))
parts.append(device(ALICE, 'Alice', 'looking for 7c9e…', BLUE))


def callout(x, y, width, lines, start, end, color):
    return (f'<g opacity="0">{visible(start, end)}'
            f'<rect x="{x}" y="{y}" width="{width}" height="{len(lines)*19+18}" rx="5" fill="#e5e7eb" stroke="#9ca3af"/>'
            + ''.join(text(x+12, y+23+j*19, line, 12, color if j==0 else '#111', 'start') for j, line in enumerate(lines))+'</g>')


parts.append(callout(20, 274, 238, ['announce_peer(7c9e…)'], .6, max(bob_arrivals)+.3, GREEN))
parts.append(callout(245, 274, 258, ['announce_peer(7c9e…)'], 5, max(carol_arrivals)+.3, AMBER))
parts.append(callout(565, 274, 236, ['get_peers(7c9e…)'], 9.4, first-.3, BLUE))
# Match the node lists: 11px monospace, 11px indentation, provider colors.
parts.append(f'<g opacity="0">{visible(first, 20.8)}'
             '<rect x="500" y="335" width="225" height="73" rx="5" fill="#e5e7eb" stroke="#9ca3af"/>'
             + text(512, 358, 'providers:', 11, '#555', 'start')
             + text(523, 375, '83.149.27.64:6881', 11, GREEN, 'start')
             + text(523, 390, '176.58.93.21:6881', 11, AMBER, 'start')
             + '</g>')
# Every DHT reply contains both providers; count duplicate sightings in place.
for y in (375, 390):
    parts.append(f'<g opacity="0">{opacity([(0, 0), (second, 0), (second+.2, 1), (third, 1), (third, 0), (CYCLE, 0)])}'
                 + text(643, y, '×2', 11, GRAY, 'start') + '</g>')
    parts.append(f'<g opacity="0">{opacity([(0, 0), (third, 0), (third, 1), (20.8, 1), (21, 0), (CYCLE, 0)])}'
                 + text(643, y, '×3', 11, GRAY, 'start') + '</g>')
parts.append(f'<rect x="0" y="527" width="0" height="3" fill="#9ca3af"><animate attributeName="width" from="0" to="{W}" dur="{CYCLE}s" repeatCount="indefinite"/></rect>')
parts.append('</svg>')
write_themes(OUT, '\n'.join(parts)+'\n')
print(f'Wrote {OUT}; first response at {first:.2f}s, loop {CYCLE}s')
