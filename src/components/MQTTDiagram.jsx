const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

const GRAY = "#888"
const WARN = "#f59e0b"

// Layout positions — left to right
const OP_X = 85
const OP_Y = 130
const BROKER_X = 260
const BROKER_Y = 130
const POS_X = 435
const POS_Y = 130
const CLOUD_X = 435
const CLOUD_Y = 245

// Operator machine — monitor with keyboard
const OperatorMachine = ({ x, y }) => (
  <g transform={`translate(${x - 20}, ${y - 18})`}>
    <rect x="2" y="2" width="36" height="24" rx="2" fill="none" stroke={palette[0]} strokeWidth="1.5" />
    <line x1="8" y1="9" x2="32" y2="9" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <line x1="8" y1="14" x2="28" y2="14" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <line x1="8" y1="19" x2="24" y2="19" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <line x1="20" y1="26" x2="20" y2="32" stroke={palette[0]} strokeWidth="1.5" />
    <line x1="12" y1="32" x2="28" y2="32" stroke={palette[0]} strokeWidth="1.5" strokeLinecap="round" />
    <text x="20" y="46" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="sans-serif">Point of Sale</text>
  </g>
)

// MQTT Broker — server with warning indicator
const BrokerServer = ({ x, y }) => (
  <g transform={`translate(${x - 20}, ${y - 26})`}>
    <rect x="2" y="2" width="36" height="48" rx="3" fill="none" stroke={WARN} strokeWidth="1.5" />
    {/* Top panel */}
    <rect x="6" y="6" width="28" height="11" rx="1.5" fill="none" stroke={WARN} strokeWidth="1" opacity="0.5" />
    <circle cx="11" cy="11.5" r="2" fill={WARN} opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <line x1="16" y1="9.5" x2="30" y2="9.5" stroke={WARN} strokeWidth="1" opacity="0.3" />
    <line x1="16" y1="13.5" x2="26" y2="13.5" stroke={WARN} strokeWidth="1" opacity="0.3" />
    {/* Middle panel */}
    <rect x="6" y="20" width="28" height="11" rx="1.5" fill="none" stroke={WARN} strokeWidth="1" opacity="0.5" />
    <circle cx="11" cy="25.5" r="2" fill={WARN} opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <line x1="16" y1="23.5" x2="30" y2="23.5" stroke={WARN} strokeWidth="1" opacity="0.3" />
    <line x1="16" y1="27.5" x2="26" y2="27.5" stroke={WARN} strokeWidth="1" opacity="0.3" />
    {/* Bottom panel */}
    <rect x="6" y="34" width="28" height="11" rx="1.5" fill="none" stroke={WARN} strokeWidth="1" opacity="0.5" />
    <circle cx="11" cy="39.5" r="2" fill={WARN} opacity="0.5" />
    <line x1="16" y1="37.5" x2="30" y2="37.5" stroke={WARN} strokeWidth="1" opacity="0.3" />
    <line x1="16" y1="41.5" x2="26" y2="41.5" stroke={WARN} strokeWidth="1" opacity="0.3" />

    <text x="20" y="64" textAnchor="middle" fill={WARN} fontSize="8" fontFamily="sans-serif" fontWeight="600">MQTT Broker</text>
    <text x="20" y="74" textAnchor="middle" fill={WARN} fontSize="6.5" fontFamily="sans-serif" opacity="0.7">(local server)</text>
  </g>
)

// Payment Terminal — card reader device
const POSTerminal = ({ x, y }) => (
  <g transform={`translate(${x - 14}, ${y - 20})`}>
    <rect x="2" y="2" width="24" height="36" rx="3" fill="none" stroke={palette[0]} strokeWidth="1.5" />
    <rect x="5" y="5" width="18" height="12" rx="1" fill={palette[0]} opacity="0.08" />
    <line x1="8" y1="9" x2="20" y2="9" stroke={palette[0]} strokeWidth="0.8" opacity="0.4" />
    <line x1="8" y1="13" x2="16" y2="13" stroke={palette[0]} strokeWidth="0.8" opacity="0.4" />
    {/* Keypad */}
    <circle cx="9" cy="23" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="14" cy="23" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="19" cy="23" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="9" cy="28" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="14" cy="28" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="19" cy="28" r="1.5" fill={palette[0]} opacity="0.5" />
    <line x1="8" y1="35" x2="20" y2="35" stroke={palette[0]} strokeWidth="1" opacity="0.5" />
    <text x="14" y="50" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="sans-serif">Payment Terminal</text>
  </g>
)

// Cloud server
const CloudServer = ({ x, y }) => (
  <g transform={`translate(${x - 24}, ${y - 14})`}>
    {/* Cloud shape */}
    <path
      d="M12 22 C4 22 2 16 6 12 C4 6 10 4 16 4 C20 0 30 0 34 4 C40 4 44 8 42 14 C46 18 42 22 36 22 Z"
      fill="none" stroke={palette[0]} strokeWidth="1.5"
    />
    {/* Server lines inside cloud */}
    <line x1="16" y1="10" x2="32" y2="10" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <line x1="16" y1="14" x2="28" y2="14" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <line x1="16" y1="18" x2="24" y2="18" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <text x="24" y="36" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="sans-serif">Payment Backend</text>
  </g>
)

// Animated message dot
const MessageDot = ({ x1, y1, x2, y2, delay, dur, color }) => (
  <circle r="3" fill={color}>
    <animate attributeName="cx" values={`${x1};${x2}`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
    <animate attributeName="cy" values={`${y1};${y2}`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.9;0.4;0.9" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
  </circle>
)

// Label badge
const Badge = ({ x, y, text, color = palette[0] }) => {
  const w = text.length * 4.5 + 16
  return (
    <g>
      <rect x={x - w / 2} y={y - 8} width={w} height="16" rx="3" fill={color} opacity="0.08" />
      <rect x={x - w / 2} y={y - 8} width={w} height="16" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <text x={x} y={y + 4} textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" opacity="0.85">
        {text}
      </text>
    </g>
  )
}

export function MQTTDiagram({ className }) {
  const opRight = OP_X + 22
  const brokerLeft = BROKER_X - 20
  const brokerRight = BROKER_X + 20
  const posLeft = POS_X - 14

  // Midpoints for labels
  const midLeftX = (opRight + brokerLeft) / 2
  const midRightX = (brokerRight + posLeft) / 2

  return (
    <div className={`flex items-center justify-center bg-irohGray-100 dark:bg-irohGray-800 rounded-lg p-4 ${className || ''}`}>
      <svg viewBox="0 0 530 280" className="rounded w-full">

        {/* --- Operator → Broker (PUBLISH start_txn) --- */}
        <line
          x1={opRight} y1={OP_Y - 6}
          x2={brokerLeft} y2={BROKER_Y - 6}
          stroke={palette[0]} strokeWidth="1.5" opacity="0.2"
        />
        <polygon
          points={`${brokerLeft - 1},${BROKER_Y - 10} ${brokerLeft - 1},${BROKER_Y - 2} ${brokerLeft + 5},${BROKER_Y - 6}`}
          fill={palette[0]} opacity="0.3"
        />
        <MessageDot
          x1={opRight} y1={OP_Y - 6}
          x2={brokerLeft} y2={BROKER_Y - 6}
          delay={0} dur={2} color={palette[0]}
        />
        <text
          x={midLeftX} y={OP_Y - 36}
          textAnchor="middle" fill={palette[0]} fontSize="6.5" fontFamily="sans-serif"
          letterSpacing="0.05em" opacity="0.65" fontWeight="600"
        >
          PUBLISH
        </text>
        <Badge x={midLeftX} y={OP_Y - 24} text="start_txn" />

        {/* --- Broker → POS (forward start_txn) --- */}
        <line
          x1={brokerRight} y1={BROKER_Y - 6}
          x2={posLeft} y2={POS_Y - 6}
          stroke={palette[0]} strokeWidth="1.5" opacity="0.2"
        />
        <polygon
          points={`${posLeft - 1},${POS_Y - 10} ${posLeft - 1},${POS_Y - 2} ${posLeft + 5},${POS_Y - 6}`}
          fill={palette[0]} opacity="0.3"
        />
        <MessageDot
          x1={brokerRight} y1={BROKER_Y - 6}
          x2={posLeft} y2={POS_Y - 6}
          delay={1} dur={2} color={palette[1]}
        />
        <text
          x={midRightX} y={POS_Y - 36}
          textAnchor="middle" fill={palette[1]} fontSize="6.5" fontFamily="sans-serif"
          letterSpacing="0.05em" opacity="0.65" fontWeight="600"
        >
          SUBSCRIBE
        </text>
        <Badge x={midRightX} y={POS_Y - 24} text="start_txn" color={palette[1]} />

        {/* --- POS → Broker (PUBLISH txn_result) --- */}
        <line
          x1={posLeft} y1={POS_Y + 6}
          x2={brokerRight} y2={BROKER_Y + 6}
          stroke={palette[2]} strokeWidth="1.5" opacity="0.2"
        />
        <polygon
          points={`${brokerRight + 1},${BROKER_Y + 2} ${brokerRight + 1},${BROKER_Y + 10} ${brokerRight - 5},${BROKER_Y + 6}`}
          fill={palette[2]} opacity="0.3"
        />
        <MessageDot
          x1={posLeft} y1={POS_Y + 6}
          x2={brokerRight} y2={BROKER_Y + 6}
          delay={0.5} dur={2.2} color={palette[2]}
        />

        {/* --- Broker → Operator (forward txn_result) --- */}
        <line
          x1={brokerLeft} y1={BROKER_Y + 6}
          x2={opRight} y2={OP_Y + 6}
          stroke={palette[2]} strokeWidth="1.5" opacity="0.2"
        />
        <polygon
          points={`${opRight + 1},${OP_Y + 2} ${opRight + 1},${OP_Y + 10} ${opRight - 5},${OP_Y + 6}`}
          fill={palette[2]} opacity="0.3"
        />
        <MessageDot
          x1={brokerLeft} y1={BROKER_Y + 6}
          x2={opRight} y2={OP_Y + 6}
          delay={1.5} dur={2.2} color={palette[2]}
        />

        {/* Return label */}
        <Badge x={midLeftX} y={OP_Y + 24} text="txn_result" color={palette[2]} />
        <Badge x={midRightX} y={POS_Y + 24} text="txn_result" color={palette[2]} />

        {/* --- POS → Payment Backend (cloud) --- */}
        <line
          x1={POS_X} y1={POS_Y + 20}
          x2={CLOUD_X} y2={CLOUD_Y - 16}
          stroke={palette[0]} strokeWidth="1" strokeDasharray="4 3" opacity="0.3"
        />
        <text
          x={POS_X + 18} y={(POS_Y + 20 + CLOUD_Y - 16) / 2 + 2}
          fill={GRAY} fontSize="6" fontFamily="sans-serif" opacity="0.6"
        >
          PCI flow
        </text>

        {/* --- Warning: single point of failure --- */}
        <g transform={`translate(${BROKER_X}, ${BROKER_Y + 56})`}>
          <text x="0" y="0" textAnchor="middle" fill={WARN} fontSize="6.5" fontFamily="sans-serif" opacity="0.8">
            ⚠ single point of failure
          </text>
        </g>

        {/* --- Icons --- */}
        <OperatorMachine x={OP_X} y={OP_Y} />
        <BrokerServer x={BROKER_X} y={BROKER_Y} />
        <POSTerminal x={POS_X} y={POS_Y} />
        <CloudServer x={CLOUD_X} y={CLOUD_Y} />

      </svg>
    </div>
  )
}
