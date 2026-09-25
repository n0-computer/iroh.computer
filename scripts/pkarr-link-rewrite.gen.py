#!/usr/bin/env python3
"""Generate light/dark SVGs showing the browser extension's pkarr URL rewrite."""
from pathlib import Path
from html import escape

OUT = Path(__file__).resolve().parents[1] / 'public/animations'
CYCLE = 12
KEY = 'uinsazmmp47ejo8gs5dbc6rfxya14cgqhxmdqin8ae55w5aqnsio'


def anim(values, times):
    assert len(values) == len(times)
    assert times[0] == 0 and times[-1] == CYCLE
    assert all(a <= b for a, b in zip(times, times[1:]))
    return f'<animate attributeName="opacity" values="{";".join(map(str, values))}" keyTimes="{";".join(str(t/CYCLE) for t in times)}" dur="{CYCLE}s" repeatCount="indefinite"/>'


before = anim([1, 1, 0, 0, 1, 1], [0, 3.8, 4.2, 10.5, 11, 12])
after = anim([0, 0, 1, 1, 0, 0], [0, 4.2, 4.6, 10.5, 11, 12])

for dark in [False, True]:
    bg, panel, ink, muted, border, green, purple, blue = (
        ('#18181b', '#27272a', '#f4f4f5', '#a1a1aa', '#52525b', '#4ade80', '#a5b4fc', '#60a5fa')
        if dark else ('#fafafa', '#f3f4f6', '#18181b', '#71717a', '#d4d4d8', '#15803d', '#6366f1', '#2563eb')
    )

    def text(x, y, value, color=ink, size=15):
        return f'<text x="{x}" y="{y}" font-family="Space Mono, monospace" font-size="{size}" fill="{color}">{escape(value)}</text>'

    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 260" role="img" aria-labelledby="title desc">',
             '<title id="title">The browser plugin rewrites a pkarr link</title>',
             f'<desc id="desc">The public key remains unchanged as https://{KEY}.pkarr.net becomes http://{KEY}.pkarr.localhost:1234. Port 1234 is an example of the configured local gateway port.</desc>',
             f'<rect x="10" y="10" width="880" height="240" rx="12" fill="{bg}" stroke="{border}"/>',
             text(35, 43, 'Browser', muted, 13),
             f'<rect x="35" y="68" width="830" height="61" rx="8" fill="{panel}" stroke="{border}"/>',
             '<g>'+before+text(55, 105, 'https://', muted)+'</g>',
             '<g opacity="0">'+after+text(64, 105, 'http://', muted)+'</g>',
             text(127, 105, KEY, green),
             text(595, 105, '.pkarr', purple),
             '<g>'+before+text(649, 105, '.net', purple)+'</g>',
             '<g opacity="0">'+after+text(649, 105, '.localhost', purple)+text(739, 105, ':1234', blue)+'</g>',
             f'<path d="M 127 138 V 146 H 595 V 138" fill="none" stroke="{green}"/>',
             text(127, 168, 'Ed25519 public key', green, 12),
             '<g>'+before+text(55, 218, 'Shareable link', muted, 13)+'</g>',
             '<g opacity="0">'+after+text(55, 218, 'Local gateway', blue, 13)+text(240, 218, '1234 = configured gateway port', muted, 12)+'</g>',
             '</svg>']
    path = OUT / ('pkarr-link-rewrite-dark.svg' if dark else 'pkarr-link-rewrite.svg')
    path.write_text('\n'.join(parts)+'\n')
    print(f'Wrote {path}')
