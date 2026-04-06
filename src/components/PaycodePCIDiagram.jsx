const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

// Monitor icon for the toll booth terminal
const TerminalIcon = ({ x, y }) => (
  <g transform={`translate(${x - 20}, ${y - 18})`}>
    {/* Monitor */}
    <rect
      x="2"
      y="2"
      width="36"
      height="24"
      rx="2"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    {/* Screen content lines */}
    <line x1="8" y1="9" x2="32" y2="9" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <line x1="8" y1="14" x2="28" y2="14" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    <line x1="8" y1="19" x2="24" y2="19" stroke={palette[0]} strokeWidth="1" opacity="0.4" />
    {/* Stand */}
    <line x1="20" y1="26" x2="20" y2="32" stroke={palette[0]} strokeWidth="1.5" />
    <line x1="12" y1="32" x2="28" y2="32" stroke={palette[0]} strokeWidth="1.5" strokeLinecap="round" />
  </g>
)

// POS device icon (card reader terminal)
const POSIcon = ({ x, y }) => (
  <g transform={`translate(${x - 14}, ${y - 20})`}>
    {/* Device body */}
    <rect
      x="2"
      y="2"
      width="24"
      height="36"
      rx="3"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    {/* Screen */}
    <rect
      x="5"
      y="5"
      width="18"
      height="12"
      rx="1"
      fill={palette[0]}
      opacity="0.15"
    />
    {/* Keypad dots */}
    <circle cx="9" cy="23" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="14" cy="23" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="19" cy="23" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="9" cy="28" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="14" cy="28" r="1.5" fill={palette[0]} opacity="0.5" />
    <circle cx="19" cy="28" r="1.5" fill={palette[0]} opacity="0.5" />
    {/* Card slot indicator */}
    <line x1="8" y1="35" x2="20" y2="35" stroke={palette[0]} strokeWidth="1" opacity="0.5" />
  </g>
)

// Credit card icon
const CardIcon = ({ x, y }) => (
  <g transform={`translate(${x - 14}, ${y - 9})`}>
    <rect
      x="0"
      y="0"
      width="28"
      height="18"
      rx="2"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.2"
    />
    {/* Magnetic stripe */}
    <rect x="0" y="4" width="28" height="4" fill={palette[0]} opacity="0.2" />
    {/* Chip */}
    <rect x="4" y="10" width="6" height="5" rx="1" fill={palette[0]} opacity="0.4" />
  </g>
)

// Lock icon
const LockIcon = ({ x, y, size = 12 }) => (
  <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
    <rect
      x={size * 0.2}
      y={size * 0.45}
      width={size * 0.6}
      height={size * 0.5}
      rx={1}
      fill={palette[1]}
      opacity="0.8"
    />
    <path
      d={`M${size * 0.3} ${size * 0.45} L${size * 0.3} ${size * 0.3} A${size * 0.2} ${size * 0.2} 0 0 1 ${size * 0.7} ${size * 0.3} L${size * 0.7} ${size * 0.45}`}
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
      opacity="0.8"
    />
  </g>
)

// Animated data packet traveling along a path
const DataPacket = ({ x1, y1, x2, y2, dur, delay, label, color = palette[0] }) => {
  return (
    <g>
      {/* Packet dot */}
      <rect rx="2" width="8" height="6" fill={color}>
        <animate
          attributeName="x"
          values={`${x1 - 4};${x2 - 4}`}
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values={`${y1 - 3};${y2 - 3}`}
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.9;0.9;0"
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </rect>
    </g>
  )
}

export function PaycodePCIDiagram({ className }) {
  const terminalX = 110
  const posX = 480
  const centerY = 140

  // iroh channel endpoints
  const channelLeft = 185
  const channelRight = 400

  // PCI boundary box
  const pciLeft = 370
  const pciTop = 45
  const pciWidth = 200
  const pciHeight = 230

  return (
    <div className={`flex items-center justify-center bg-irohGray-100 dark:bg-irohGray-800 rounded-lg p-4 ${className || ''}`}>
      <svg viewBox="0 0 600 310" className="rounded w-full">
        {/* ---- PCI Compliance Boundary ---- */}
        <rect
          x={pciLeft}
          y={pciTop}
          width={pciWidth}
          height={pciHeight}
          rx="8"
          fill={palette[1]}
          fillOpacity="0.04"
          stroke={palette[1]}
          strokeWidth="2"
          strokeDasharray="8 4"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.6;0.3;0.6"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* PCI boundary label */}
        <g>
          <LockIcon x={pciLeft + 14} y={pciTop + 14} size={14} />
          <text
            x={pciLeft + 26}
            y={pciTop + 19}
            fill={palette[1]}
            fontSize="9"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="600"
            letterSpacing="0.5"
          >
            PCI COMPLIANCE BOUNDARY
          </text>
        </g>

        {/* ---- iroh P2P Channel ---- */}
        {/* Channel background */}
        <rect
          x={channelLeft}
          y={centerY - 20}
          width={channelRight - channelLeft}
          height="40"
          rx="20"
          fill={palette[0]}
          fillOpacity="0.06"
          stroke={palette[0]}
          strokeWidth="1"
          strokeDasharray="6 3"
          opacity="0.5"
        />

        {/* Channel line - top */}
        <line
          x1={channelLeft + 10}
          y1={centerY - 8}
          x2={channelRight - 10}
          y2={centerY - 8}
          stroke={palette[0]}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Channel line - bottom */}
        <line
          x1={channelLeft + 10}
          y1={centerY + 8}
          x2={channelRight - 10}
          y2={centerY + 8}
          stroke={palette[0]}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Channel label */}
        <text
          x={(channelLeft + channelRight) / 2}
          y={centerY - 28}
          textAnchor="middle"
          fill={palette[0]}
          fontSize="9"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
        >
          iroh P2P channel
        </text>

        {/* Encrypted indicator on channel */}
        <LockIcon x={(channelLeft + channelRight) / 2} y={centerY} size={10} />

        {/* Animated packets - Commands going right (top lane) */}
        <DataPacket x1={channelLeft + 15} y1={centerY - 8} x2={channelRight - 15} y2={centerY - 8} dur={2.5} delay={0} color={palette[2]} />
        <DataPacket x1={channelLeft + 15} y1={centerY - 8} x2={channelRight - 15} y2={centerY - 8} dur={2.5} delay={1.2} color={palette[2]} />

        {/* Animated packets - Encrypted results going left (bottom lane) */}
        <DataPacket x1={channelRight - 15} y1={centerY + 8} x2={channelLeft + 15} y2={centerY + 8} dur={3} delay={0.5} color={palette[1]} />
        <DataPacket x1={channelRight - 15} y1={centerY + 8} x2={channelLeft + 15} y2={centerY + 8} dur={3} delay={2} color={palette[1]} />

        {/* Flow labels */}
        <text
          x={(channelLeft + channelRight) / 2}
          y={centerY + 36}
          textAnchor="middle"
          fill={palette[2]}
          fontSize="7"
          fontFamily="'Space Grotesk', sans-serif"
          opacity="0.7"
        >
          Commands & Encrypted Payloads Only
        </text>

        {/* Transport options */}
        <text
          x={(channelLeft + channelRight) / 2}
          y={centerY + 50}
          textAnchor="middle"
          fill="#888"
          fontSize="7"
          fontFamily="'Space Grotesk', sans-serif"
          opacity="0.6"
        >
          via Bluetooth / LAN / Wi-Fi
        </text>

        {/* ---- Point of Sale Terminal (Left) ---- */}
        <TerminalIcon x={terminalX} y={centerY - 10} />

        <text
          x={terminalX}
          y={centerY + 34}
          textAnchor="middle"
          fill={palette[0]}
          fontSize="10"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
        >
          Point of Sale
        </text>
        {/* Terminal features */}
        <text
          x={terminalX}
          y={centerY + 46}
          textAnchor="middle"
          fill="#888"
          fontSize="7"
          fontFamily="'Space Grotesk', sans-serif"
          opacity="0.7"
        >
          Charge creation
        </text>
        <text
          x={terminalX}
          y={centerY + 58}
          textAnchor="middle"
          fill="#888"
          fontSize="7"
          fontFamily="'Space Grotesk', sans-serif"
          opacity="0.7"
        >
          Transaction status
        </text>

        {/* Connection dot - terminal to channel */}
        <circle cx={channelLeft} cy={centerY} r="4" fill={palette[0]}>
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Line from terminal to channel */}
        <line
          x1={terminalX + 22}
          y1={centerY}
          x2={channelLeft - 4}
          y2={centerY}
          stroke={palette[0]}
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* ---- Payment Terminal (Right, inside PCI boundary) ---- */}
        <POSIcon x={posX} y={centerY - 10} />

        <text
          x={posX}
          y={centerY + 34}
          textAnchor="middle"
          fill={palette[0]}
          fontSize="10"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
        >
          Payment Terminal
        </text>

        {/* Connection dot - channel to POS */}
        <circle cx={channelRight} cy={centerY} r="4" fill={palette[0]}>
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Line from channel to POS */}
        <line
          x1={channelRight + 4}
          y1={centerY}
          x2={posX - 16}
          y2={centerY}
          stroke={palette[0]}
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* ---- Raw Card Data (stays inside PCI boundary) ---- */}
        <g>
          <CardIcon x={posX} y={centerY + 72} />

          <text
            x={posX}
            y={centerY + 92}
            textAnchor="middle"
            fill={palette[1]}
            fontSize="7.5"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="600"
          >
            Raw Card Data
          </text>
          <text
            x={posX}
            y={centerY + 103}
            textAnchor="middle"
            fill="#888"
            fontSize="7"
            fontFamily="'Space Grotesk', sans-serif"
          >
            Never leaves this boundary
          </text>
        </g>

        {/* ---- "No Exit" indicator ---- */}
        {/* X mark on the PCI boundary where data could escape */}
        <g transform={`translate(${pciLeft - 1}, ${centerY + 60})`}>
          <circle r="8" cx="0" cy="0" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
          <line x1="-4" y1="-4" x2="4" y2="4" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
          <line x1="4" y1="-4" x2="-4" y2="4" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Status indicators */}
        <circle cx={terminalX + 24} cy={centerY - 30} r="3" fill="#22c55e">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={posX + 18} cy={centerY - 32} r="3" fill="#22c55e">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2.3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
