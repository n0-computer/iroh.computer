const palette = [
  "#7C7CFF", // irohPurple-500
  "#6257F7", // irohPurple-600
  "#4E3FE0", // irohPurple-700
]

const GRAY = "#888"

// Device positions
const A = { x: 130, y: 110 } // ESP32
const B = { x: 390, y: 110 } // Raspberry Pi
const C = { x: 260, y: 250 } // Phone / controller

const ESP32 = ({ x, y }) => (
  <g transform={`translate(${x - 18}, ${y - 14})`}>
    <rect x="2" y="2" width="32" height="22" rx="2" fill="none" stroke={palette[0]} strokeWidth="1.5" />
    <rect x="6" y="6" width="16" height="10" rx="1" fill={palette[0]} opacity="0.15" />
    <line x1="24" y1="7" x2="30" y2="7" stroke={palette[0]} strokeWidth="0.8" opacity="0.5" />
    <line x1="24" y1="10" x2="30" y2="10" stroke={palette[0]} strokeWidth="0.8" opacity="0.5" />
    <line x1="24" y1="13" x2="30" y2="13" stroke={palette[0]} strokeWidth="0.8" opacity="0.5" />
    <circle cx="8" cy="20" r="1" fill={palette[0]} opacity="0.5" />
    <circle cx="12" cy="20" r="1" fill={palette[0]} opacity="0.5" />
    <circle cx="16" cy="20" r="1" fill={palette[0]} opacity="0.5" />
    <text x="18" y="36" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="sans-serif">ESP32</text>
  </g>
)

const RaspberryPi = ({ x, y }) => (
  <g transform={`translate(${x - 20}, ${y - 14})`}>
    <rect x="2" y="2" width="36" height="22" rx="2" fill="none" stroke={palette[0]} strokeWidth="1.5" />
    <rect x="5" y="5" width="10" height="8" rx="1" fill={palette[0]} opacity="0.2" />
    <rect x="18" y="5" width="6" height="5" rx="0.5" fill={palette[0]} opacity="0.3" />
    <rect x="27" y="5" width="8" height="4" rx="0.5" fill={palette[0]} opacity="0.3" />
    {/* pin header */}
    <line x1="5" y1="18" x2="35" y2="18" stroke={palette[0]} strokeWidth="0.5" opacity="0.5" />
    <line x1="5" y1="21" x2="35" y2="21" stroke={palette[0]} strokeWidth="0.5" opacity="0.5" />
    <text x="20" y="36" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="sans-serif">Raspberry Pi</text>
  </g>
)

const Phone = ({ x, y }) => (
  <g transform={`translate(${x - 10}, ${y - 18})`}>
    <rect x="2" y="2" width="20" height="32" rx="3" fill="none" stroke={palette[0]} strokeWidth="1.5" />
    <rect x="4" y="6" width="16" height="22" rx="1" fill={palette[0]} opacity="0.08" />
    <circle cx="12" cy="31" r="1.2" fill="none" stroke={palette[0]} strokeWidth="0.8" opacity="0.6" />
    <text x="12" y="46" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="sans-serif">Phone</text>
  </g>
)

// Expanding discovery ring
const Ripple = ({ cx, cy, delay, color }) => (
  <circle cx={cx} cy={cy} r="0" fill="none" stroke={color} strokeWidth="1.2">
    <animate attributeName="r" values="4;70" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.6;0" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
  </circle>
)

// Animated connection line that fades in
const Connection = ({ x1, y1, x2, y2, delay, color }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="3 3">
      <animate attributeName="opacity" values="0;0.6;0.6;0" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
    </line>
    <circle r="2.5" fill={color}>
      <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="cx" values={`${x1};${x2}`} dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="cy" values={`${y1};${y2}`} dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  </g>
)

const IrohBadge = ({ x, y }) => (
  <g>
    <rect x={x - 22} y={y - 10} width="44" height="20" rx="10" fill={palette[0]} opacity="0.1" />
    <rect x={x - 22} y={y - 10} width="44" height="20" rx="10" fill="none" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <text x={x} y={y + 4} textAnchor="middle" fill={palette[0]} fontSize="9" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.04em">
      iroh
    </text>
  </g>
)

export function DiscoveryDiagram({ className }) {
  const centerX = (A.x + B.x + C.x) / 3
  const centerY = (A.y + B.y + C.y) / 3

  return (
    <div className={`flex items-center justify-center bg-irohGray-100 dark:bg-irohGray-900 rounded-lg p-4 ${className || ''}`}>
      <svg viewBox="60 60 440 240" className="rounded w-full">

        {/* Discovery ripples — each device broadcasts */}
        <Ripple cx={A.x} cy={A.y} delay={0} color={palette[0]} />
        <Ripple cx={A.x} cy={A.y} delay={1.5} color={palette[0]} />
        <Ripple cx={B.x} cy={B.y} delay={0.8} color={palette[1]} />
        <Ripple cx={B.x} cy={B.y} delay={2.3} color={palette[1]} />
        <Ripple cx={C.x} cy={C.y} delay={0.4} color={palette[2]} />
        <Ripple cx={C.x} cy={C.y} delay={1.9} color={palette[2]} />

        {/* Peer connections form after discovery */}
        <Connection x1={A.x} y1={A.y} x2={B.x} y2={B.y} delay={0} color={palette[0]} />
        <Connection x1={B.x} y1={B.y} x2={C.x} y2={C.y} delay={2} color={palette[1]} />
        <Connection x1={C.x} y1={C.y} x2={A.x} y2={A.y} delay={4} color={palette[2]} />

        {/* Devices */}
        <ESP32 x={A.x} y={A.y} />
        <RaspberryPi x={B.x} y={B.y} />
        <Phone x={C.x} y={C.y} />

        {/* Center iroh badge */}
        <IrohBadge x={centerX} y={centerY - 10} />

        {/* Label */}
        <text
          x={centerX} y={centerY + 20}
          textAnchor="middle" fill={palette[0]} fontSize="6.5" fontFamily="sans-serif"
          letterSpacing="0.05em" opacity="0.7" fontWeight="600"
        >
          LOCAL DISCOVERY
        </text>
        <text
          x={centerX} y={centerY + 32}
          textAnchor="middle" fill={GRAY} fontSize="6" fontFamily="sans-serif" opacity="0.6"
        >
          devices find each other on the network
        </text>

      </svg>
    </div>
  )
}
