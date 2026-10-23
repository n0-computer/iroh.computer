"""Generate a themed diagram of where an iroh endpoint relies on the Web PKI."""
from pathlib import Path
from svg_themes import write_themes

svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" role="img" aria-labelledby="title desc">
  <title id="title">Where iroh relies on certificate chains</title>
  <desc id="desc">The connection from your endpoint to another endpoint is authenticated by the Ed25519 key alone, without any certificate chain. The connections to iroh infrastructure, the relay (relay connection, QAD and HTTPS probes) and the pkarr server (publish via HTTP PUT), use TLS with a CA certificate chain.</desc>
  <rect x="500" y="130" width="245" height="235" rx="12" fill="none" stroke="#9ca3af" stroke-dasharray="6 5"/>
  <g fill="none" stroke-width="3">
    <path d="M 200 170 H 320 V 65 H 530" stroke="#15803d"/>
    <path d="M 200 215 H 530 M 370 215 V 317 H 530" stroke="#d97706"/>
  </g>
  <g stroke="#9ca3af" fill="#f3f4f6">
    <rect x="30" y="150" width="170" height="80" rx="10"/>
    <rect x="530" y="30" width="200" height="70" rx="10"/>
    <rect x="530" y="170" width="200" height="90" rx="10"/>
    <rect x="530" y="285" width="200" height="65" rx="10"/>
  </g>
  <g font-family="Space Mono, monospace" text-anchor="middle">
    <text x="115" y="196" font-size="16" fill="#111">Your endpoint</text>
    <text x="630" y="62" font-size="16" fill="#111">Other endpoint</text>
    <text x="630" y="84" font-size="13" fill="#888">any peer</text>
    <text x="630" y="198" font-size="16" fill="#111">Relay</text>
    <text x="630" y="222" font-size="13" fill="#888">relay connection</text>
    <text x="630" y="244" font-size="13" fill="#888">QAD + HTTPS probes</text>
    <text x="630" y="312" font-size="16" fill="#111">pkarr server</text>
    <text x="630" y="334" font-size="13" fill="#888">publish (http PUT)</text>
  </g>
  <g font-family="Space Mono, monospace" font-size="13">
    <text x="335" y="55" fill="#15803d">Ed25519 key, no CA</text>
    <text x="385" y="205" fill="#d97706">TLS + CA chain</text>
    <text x="385" y="307" fill="#d97706">TLS + CA chain</text>
    <text x="515" y="153" fill="#888">iroh infrastructure</text>
  </g>
</svg>
'''
write_themes(Path(__file__).resolve().parents[1] / 'public/blog/iroh-and-the-number-4/cert-chain-usage.svg', svg)
