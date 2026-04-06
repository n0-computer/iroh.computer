const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

const GRAY = "#888"

// Participant X positions
const POS_X = 80
const QR_X = 210
const TERMINAL_X = 340
const DISCOVERY_X = 470

// Vertical layout
const HEAD_Y = 40
const LIFELINE_START = 62
const LIFELINE_END = 340

// Message Y positions
const MSG1_Y = 100
const MSG2_Y = 150
const MSG3_Y = 195
const MSG4_Y = 240
const MSG5_Y = 285
const SELF_H = 20

// Participant header box
const Participant = ({ x, label, sub }) => {
  const w = sub ? Math.max(label.length, sub.length) * 6.5 + 20 : label.length * 6.5 + 20
  return (
    <g>
      <rect x={x - w / 2} y={HEAD_Y - 14} width={w} height={sub ? 30 : 22} rx="3"
        fill={palette[0]} opacity="0.08" />
      <rect x={x - w / 2} y={HEAD_Y - 14} width={w} height={sub ? 30 : 22} rx="3"
        fill="none" stroke={palette[0]} strokeWidth="1" opacity="0.35" />
      <text x={x} y={HEAD_Y + 1} textAnchor="middle"
        fill={palette[0]} fontSize="9" fontFamily="sans-serif" fontWeight="600">
        {label}
      </text>
      {sub && (
        <text x={x} y={HEAD_Y + 12} textAnchor="middle"
          fill={GRAY} fontSize="6.5" fontFamily="sans-serif">
          {sub}
        </text>
      )}
    </g>
  )
}

// Dashed vertical lifeline
const Lifeline = ({ x }) => (
  <line x1={x} y1={LIFELINE_START} x2={x} y2={LIFELINE_END}
    stroke={palette[0]} strokeWidth="1" strokeDasharray="4 3" opacity="0.2" />
)

// Horizontal arrow with label
const Arrow = ({ x1, x2, y, label, color = palette[0], dashed }) => {
  const dir = x2 > x1 ? 1 : -1
  const tipX = x2
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y}
        stroke={color} strokeWidth="1.5" opacity="0.35"
        strokeDasharray={dashed ? "4 3" : undefined} />
      <polygon
        points={`${tipX},${y} ${tipX - dir * 6},${y - 3.5} ${tipX - dir * 6},${y + 3.5}`}
        fill={color} opacity="0.5"
      />
      <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle"
        fill={color} fontSize="7" fontFamily="monospace" opacity="0.85">
        {label}
      </text>
      <circle r="2.5" fill={color}>
        <animate attributeName="cx" values={`${x1};${x2}`} dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="cy" values={`${y};${y}`} dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

// Self-call arrow
const SelfArrow = ({ x, y, label, color = palette[0] }) => {
  const w = 32
  return (
    <g>
      <polyline
        points={`${x},${y} ${x + w},${y} ${x + w},${y + SELF_H} ${x},${y + SELF_H}`}
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.35"
      />
      <polygon
        points={`${x},${y + SELF_H} ${x + 6},${y + SELF_H - 3.5} ${x + 6},${y + SELF_H + 3.5}`}
        fill={color} opacity="0.5"
      />
      <text x={x + w + 5} y={y + SELF_H / 2 + 3} textAnchor="start"
        fill={color} fontSize="7" fontFamily="monospace" opacity="0.85">
        {label}
      </text>
    </g>
  )
}

// Bidirectional connection
const BiArrow = ({ x1, x2, y, label, color = palette[0] }) => {
  const gap = 4
  return (
    <g>
      <line x1={x1} y1={y - gap} x2={x2} y2={y - gap}
        stroke={color} strokeWidth="1.5" opacity="0.25" />
      <polygon
        points={`${x2},${y - gap} ${x2 - 6},${y - gap - 3.5} ${x2 - 6},${y - gap + 3.5}`}
        fill={color} opacity="0.4"
      />
      <line x1={x2} y1={y + gap} x2={x1} y2={y + gap}
        stroke={color} strokeWidth="1.5" opacity="0.25" />
      <polygon
        points={`${x1},${y + gap} ${x1 + 6},${y + gap - 3.5} ${x1 + 6},${y + gap + 3.5}`}
        fill={color} opacity="0.4"
      />
      <text x={(x1 + x2) / 2} y={y - gap - 7} textAnchor="middle"
        fill={color} fontSize="7" fontFamily="monospace" opacity="0.85">
        {label}
      </text>
      <circle r="2.5" fill={palette[0]}>
        <animate attributeName="cx" values={`${x1};${x2}`} dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="cy" values={`${y - gap};${y - gap}`} dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle r="2.5" fill={palette[1]}>
        <animate attributeName="cx" values={`${x2};${x1}`} dur="2.2s" begin="1.1s" repeatCount="indefinite" />
        <animate attributeName="cy" values={`${y + gap};${y + gap}`} dur="2.2s" begin="1.1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

// Note box
const Note = ({ x, y, text, sub, color = palette[0] }) => {
  const w = sub
    ? Math.max(text.length, sub.length) * 5 + 16
    : text.length * 5 + 16
  const h = sub ? 26 : 18
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="2"
        fill={color} opacity="0.06" />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="2"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.3" />
      <text x={x} y={sub ? y - 2 : y + 3} textAnchor="middle"
        fill={color} fontSize="6.5" fontFamily="monospace" opacity="0.8">
        {text}
      </text>
      {sub && (
        <text x={x} y={y + 9} textAnchor="middle"
          fill={GRAY} fontSize="5.5" fontFamily="monospace" opacity="0.6">
          {sub}
        </text>
      )}
    </g>
  )
}

// Small QR icon for the participant header
const QRIcon = ({ x, y, size }) => {
  const s = size / 7
  const ox = x - size / 2
  const oy = y - size / 2
  const Finder = ({ gx, gy }) => (
    <g>
      <rect x={ox + gx * s} y={oy + gy * s} width={2 * s} height={2 * s}
        fill={palette[0]} opacity="0.7" />
      <rect x={ox + (gx + 0.5) * s} y={oy + (gy + 0.5) * s} width={s} height={s}
        fill="white" />
    </g>
  )
  return (
    <g>
      <rect x={ox - 1} y={oy - 1} width={size + 2} height={size + 2} rx="1"
        fill="white" stroke={palette[0]} strokeWidth="0.6" opacity="0.4" />
      <Finder gx={0} gy={0} />
      <Finder gx={5} gy={0} />
      <Finder gx={0} gy={5} />
      {[[3, 0], [4, 1], [3, 3], [5, 4], [3, 5], [4, 6], [6, 3], [6, 6]].map(([c, r], i) => (
        <rect key={i} x={ox + c * s} y={oy + r * s} width={s * 0.8} height={s * 0.8}
          fill={palette[0]} opacity="0.5" />
      ))}
    </g>
  )
}

export function QRTicketFlow({ className }) {
  return (
    <div className={`flex items-center justify-center bg-irohGray-100 dark:bg-irohGray-800 rounded-lg p-4 ${className || ''}`}>
      <svg viewBox="0 0 550 360" className="rounded w-full">

        {/* Lifelines */}
        <Lifeline x={POS_X} />
        <Lifeline x={QR_X} />
        <Lifeline x={TERMINAL_X} />
        <Lifeline x={DISCOVERY_X} />

        {/* Participant headers */}
        <Participant x={POS_X} label="Point of Sale" />
        <Participant x={QR_X} label="QR Code" />
        <Participant x={TERMINAL_X} label="Payment Terminal" />
        <Participant x={DISCOVERY_X} label="Discovery" sub="gossip" />

        {/* 1: Point of Sale encodes ticket into QR */}
        <Arrow x1={POS_X} x2={QR_X} y={MSG1_Y} label="encode(iroh_ticket)" />
        <Note
          x={(POS_X + QR_X) / 2} y={MSG1_Y + 18}
          text="NodeID + Addrs + RelayURL"
        />

        {/* 2: Payment Terminal scans QR code */}
        <Arrow x1={TERMINAL_X} x2={QR_X} y={MSG2_Y} label="scan" color={palette[1]} />

        {/* 3: Payment Terminal registers as static provider */}
        <SelfArrow x={TERMINAL_X} y={MSG3_Y} label="add_node_addr" color={palette[1]} />

        {/* 4: Payment Terminal queries gossip discovery */}
        <Arrow x1={TERMINAL_X} x2={DISCOVERY_X} y={MSG4_Y} label="resolve(NodeID)" color={palette[2]} />
        <Arrow x1={DISCOVERY_X} x2={TERMINAL_X} y={MSG4_Y + 18} label="endpoints" color={palette[2]} />

        {/* 5: Established connection */}
        <BiArrow x1={POS_X} x2={TERMINAL_X} y={MSG5_Y} label="connected" color={palette[0]} />

      </svg>
    </div>
  )
}
