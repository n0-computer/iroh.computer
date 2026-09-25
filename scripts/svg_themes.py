"""Write matching light/dark SVGs without duplicating geometry or timelines."""
import re

DARK_COLORS = {
    '#d1d5db': '#3f3f46',  # cloud
    '#f3f4f6': '#27272a',  # cards
    '#e5e7eb': '#27272a',  # callouts
    '#eee': '#27272a',    # devices
    '#111': '#f4f4f5',
    '#333': '#e4e4e7',
    '#555': '#d4d4d8',
    '#888': '#a1a1aa',
    '#9ca3af': '#71717a',
    '#a1aab8': '#71717a',
    '#6366f1': '#a5b4fc',
    '#2563eb': '#60a5fa',
    '#15803d': '#4ade80',
    '#d97706': '#fbbf24',
}


def write_themes(path, svg):
    path.write_text(svg)
    dark = re.sub(r'#[0-9a-fA-F]{3,8}\b',
                  lambda m: DARK_COLORS.get(m[0].lower(), m[0]), svg)
    path.with_name(path.stem + '-dark.svg').write_text(dark)
