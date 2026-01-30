const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

// Global relay locations (approximate positions on a simplified world map)
const relays = [
  { id: "frankfurt", x: 220, y: 80, label: "Frankfurt" },
  { id: "amsterdam", x: 210, y: 65, label: "Amsterdam" },
  { id: "chicago", x: 95, y: 90, label: "Chicago" },
  { id: "saopaulo", x: 135, y: 190, label: "São Paulo" },
  { id: "riyadh", x: 280, y: 120, label: "Riyadh" },
]

// User devices connecting through relays
const devices = [
  { x: 60, y: 70, relay: "chicago" },
  { x: 80, y: 120, relay: "chicago" },
  { x: 120, y: 210, relay: "saopaulo" },
  { x: 150, y: 180, relay: "saopaulo" },
  { x: 190, y: 95, relay: "frankfurt" },
  { x: 240, y: 60, relay: "amsterdam" },
  { x: 260, y: 100, relay: "frankfurt" },
  { x: 300, y: 140, relay: "riyadh" },
  { x: 320, y: 110, relay: "riyadh" },
  { x: 350, y: 130, relay: "riyadh" },
]

// Relay connections (mesh between relays)
const relayConnections = [
  ["frankfurt", "amsterdam"],
  ["frankfurt", "chicago"],
  ["frankfurt", "riyadh"],
  ["amsterdam", "chicago"],
  ["chicago", "saopaulo"],
  ["riyadh", "saopaulo"],
]

// Get relay by id
const getRelay = (id) => relays.find(r => r.id === id)

// Simplified world map outline (very basic continents)
const WorldMap = () => (
  <g opacity="0.1">
    {/* North America */}
    <path
      d="M40,50 Q60,40 100,45 Q130,50 140,70 Q145,90 130,110 Q100,130 70,120 Q50,100 40,80 Z"
      fill={palette[0]}
    />
    {/* South America */}
    <path
      d="M100,140 Q130,135 145,160 Q150,190 140,220 Q120,240 100,230 Q90,200 95,170 Z"
      fill={palette[0]}
    />
    {/* Europe */}
    <path
      d="M190,50 Q220,45 250,50 Q260,70 250,85 Q230,90 200,85 Q185,70 190,50 Z"
      fill={palette[0]}
    />
    {/* Africa */}
    <path
      d="M200,100 Q230,95 250,110 Q260,150 250,190 Q230,210 200,200 Q180,160 190,120 Z"
      fill={palette[0]}
    />
    {/* Asia/Middle East */}
    <path
      d="M260,60 Q320,50 370,70 Q380,100 370,130 Q340,140 300,130 Q270,110 260,80 Z"
      fill={palette[0]}
    />
  </g>
)

// Relay node component
const RelayNode = ({ x, y, label, index }) => (
  <g>
    {/* Outer pulse ring */}
    <circle cx={x} cy={y} r="12" fill="none" stroke={palette[0]} strokeWidth="1" opacity="0.3">
      <animate
        attributeName="r"
        values="12;20;12"
        dur={`${2 + index * 0.3}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.3;0;0.3"
        dur={`${2 + index * 0.3}s`}
        repeatCount="indefinite"
      />
    </circle>
    {/* Relay circle */}
    <circle cx={x} cy={y} r="8" fill={palette[0]} opacity="0.9" />
    {/* Inner dot */}
    <circle cx={x} cy={y} r="3" fill="white" />
    {/* Label */}
    <text
      x={x}
      y={y + 22}
      textAnchor="middle"
      fill={palette[0]}
      fontSize="8"
      fontFamily="sans-serif"
      fontWeight="500"
    >
      {label}
    </text>
  </g>
)

// Device node (small dot representing a user)
const DeviceNode = ({ x, y, index }) => (
  <circle cx={x} cy={y} r="3" fill={palette[1]} opacity="0.7">
    <animate
      attributeName="opacity"
      values="0.7;0.4;0.7"
      dur={`${1.5 + index * 0.2}s`}
      repeatCount="indefinite"
    />
  </circle>
)

// Connection line with animated data flow
const DataFlow = ({ x1, y1, x2, y2, delay, speed = 2 }) => {
  const duration = speed + delay * 0.3
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={palette[1]}
        strokeWidth="1"
        opacity="0.2"
      />
      {/* Animated dot */}
      <circle r="2" fill={palette[0]}>
        <animate
          attributeName="cx"
          values={`${x1};${x2};${x1}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values={`${y1};${y2};${y1}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.4;0.8"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
}

// Relay-to-relay connection (thicker, more prominent)
const RelayConnection = ({ from, to, index }) => {
  const r1 = getRelay(from)
  const r2 = getRelay(to)
  if (!r1 || !r2) return null

  const duration = 3 + index * 0.5
  return (
    <g>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        stroke={palette[0]}
        strokeWidth="2"
        strokeDasharray="6 3"
        opacity="0.4"
      />
      {/* Bidirectional data flow */}
      <circle r="3" fill={palette[0]}>
        <animate
          attributeName="cx"
          values={`${r1.x};${r2.x};${r1.x}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values={`${r1.y};${r2.y};${r1.y}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </circle>
      <circle r="3" fill={palette[1]}>
        <animate
          attributeName="cx"
          values={`${r2.x};${r1.x};${r2.x}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values={`${r2.y};${r1.y};${r2.y}`}
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
}

// Stats overlay
const StatsOverlay = () => (
  <g>
    {/* Connection count */}
    <g transform="translate(320, 200)">
      <rect x="0" y="0" width="80" height="40" rx="4" fill={palette[0]} opacity="0.1" />
      <text x="40" y="18" textAnchor="middle" fill={palette[0]} fontSize="10" fontWeight="bold">1M+</text>
      <text x="40" y="32" textAnchor="middle" fill={palette[1]} fontSize="8">connections</text>
    </g>
  </g>
)

export function GlobalRelayIllustration({ className }) {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <svg viewBox="0 0 420 260" className="rounded w-full">
        {/* World map background */}
        <WorldMap />

        {/* Relay-to-relay connections */}
        {relayConnections.map(([from, to], i) => (
          <RelayConnection key={`${from}-${to}`} from={from} to={to} index={i} />
        ))}

        {/* Device-to-relay connections */}
        {devices.map((device, i) => {
          const relay = getRelay(device.relay)
          if (!relay) return null
          return (
            <DataFlow
              key={`device-${i}`}
              x1={device.x}
              y1={device.y}
              x2={relay.x}
              y2={relay.y}
              delay={i}
              speed={1.5}
            />
          )
        })}

        {/* Device nodes */}
        {devices.map((device, i) => (
          <DeviceNode key={`device-node-${i}`} x={device.x} y={device.y} index={i} />
        ))}

        {/* Relay nodes */}
        {relays.map((relay, i) => (
          <RelayNode
            key={relay.id}
            x={relay.x}
            y={relay.y}
            label={relay.label}
            index={i}
          />
        ))}

        {/* Stats */}
        <StatsOverlay />
      </svg>
    </div>
  )
}
