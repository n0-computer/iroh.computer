"""Generate a themed `openssl ec -text` dump of a P-384 key whose private scalar is 4."""
from pathlib import Path
from svg_themes import write_themes

# Output of `openssl ec -noout -text` for the P-384 key with private scalar 4.
PRIV = ['00:' * 16] * 2 + ['00:' * 15 + '04']
PUB = [
    '04:13:82:51:cd:52:ac:92:98:c1:c8:aa:d9:77:32:1d:',
    'eb:97:e7:09:bd:0b:4c:a0:ac:a5:5d:c8:ad:51:dc:fc:',
    '9d:15:89:a1:59:7e:3a:51:20:e1:ef:d6:31:c6:3e:18:',
    '35:ca:ca:e2:98:69:a6:2e:16:31:e8:a2:81:81:ab:56:',
    '61:6d:c4:5d:91:8a:bc:09:f3:ab:0e:63:cf:79:2a:a4:',
    'dc:ed:73:87:be:37:bb:a5:69:54:9f:1c:02:b2:70:ed:',
    '67',
]

X, INDENT, LINE, TOP = 40, 40, 24, 56
rows = []
y = TOP


def row(text, fill, x=X):
    global y
    rows.append(f'<text x="{x}" y="{y}" fill="{fill}">{text}</text>')
    y += LINE


row('$ openssl ec -noout -text', '#888')
row('Private-Key: (384 bit field, 192 bit security level)', '#555')
row('priv:', '#555')
for line in PRIV[:-1]:
    row(line, '#9ca3af', X + INDENT)
rows.append(
    f'<text x="{X + INDENT}" y="{y}" fill="#9ca3af">{PRIV[-1][:-2]}'
    f'<tspan fill="#d97706" font-weight="bold">04</tspan></text>'
)
y += LINE
row('pub:', '#555')
for line in PUB:
    row(line, '#333', X + INDENT)
row('ASN1 OID: secp384r1', '#555')
row('NIST CURVE: P-384', '#555')

height = y + 16
body = '\n    '.join(rows)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 {height}" role="img" aria-labelledby="title desc">
  <title id="title">A P-384 private key that is the number 4</title>
  <desc id="desc">OpenSSL text dump of a P-384 elliptic curve key. The 48-byte private key is all zeros except for the last byte, which is 04. The public key below it looks like random bytes.</desc>
  <rect x="10" y="10" width="660" height="{height - 20}" rx="12" fill="#f3f4f6"/>
  <g font-family="Space Mono, monospace" font-size="16">
    {body}
  </g>
</svg>
'''
write_themes(Path(__file__).resolve().parents[1] / 'public/blog/iroh-and-the-number-4/private-key-4.svg', svg)
