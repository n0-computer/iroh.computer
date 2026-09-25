"""Generate a themed Zooko's triangle showing pkarr's naming tradeoff."""
from pathlib import Path
from svg_themes import write_themes

svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 510" role="img" aria-labelledby="title desc">
  <title id="title">Zooko’s triangle: pkarr and DNS</title>
  <desc id="desc">Three naming properties: human-readable, decentralized, and secure. DNS with DNSSEC sits between human-readable and secure. Pkarr sits on the edge between decentralized and secure: anyone can generate a name, but the name is a public key rather than a memorable word.</desc>
  <rect x="10" y="10" width="740" height="490" rx="12" fill="#f3f4f6"/>
  <g fill="none" stroke-linejoin="round">
    <path d="M 195 410.429 L 380 90 L 565 410.429" stroke="#9ca3af" stroke-width="2"/>
    <path d="M 195 410.429 H 565" stroke="#9ca3af" stroke-width="2"/>
  </g>
  <g font-family="Space Mono, monospace" text-anchor="middle">
    <text x="380" y="48" font-size="20" fill="#555">Human-readable</text>
    <text x="380" y="70" font-size="12" fill="#555">A meaningful, memorable name</text>
    <text x="195" y="449" font-size="20" fill="#555">Decentralized</text>
    <text x="195" y="472" font-size="12" fill="#555">No naming authority</text>
    <text x="565" y="449" font-size="20" fill="#555">Secure</text>
    <text x="565" y="472" font-size="12" fill="#555">Cryptographically verifiable</text>
    <rect x="427.5" y="230.2145" width="90" height="40" rx="10" fill="#f3f4f6" stroke="#9ca3af"/>
    <text x="472.5" y="257.2145" font-size="20" fill="#333">DNS</text>
    <rect x="322" y="389.429" width="116" height="42" rx="10" fill="#f3f4f6" stroke="#9ca3af"/>
    <text x="380" y="416.429" font-size="20" fill="#333">pkarr</text>
  </g>
  <circle cx="380" cy="90" r="5" fill="#9ca3af"/>
  <circle cx="195" cy="410.429" r="5" fill="#9ca3af"/>
  <circle cx="565" cy="410.429" r="5" fill="#9ca3af"/>
</svg>
'''
write_themes(Path(__file__).resolve().parents[1] / 'public/blog/iroh-global-content-discovery/zookos-triangle.svg', svg)
