const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

// Device positions - left side devices connect to AWS relay, right side to GCP
const devices = [
  { id: "mobile1", x: 60, y: 80, label: "Mobile" },
  { id: "laptop", x: 60, y: 180, label: "Laptop" },
  { id: "server", x: 380, y: 80, label: "Server" },
  { id: "iot", x: 380, y: 180, label: "IoT" },
]

// Relay positions - separate, no connection between them
const relays = [
  { id: "relay1", x: 150, y: 130, label: "AWS" },
  { id: "relay2", x: 290, y: 130, label: "GCP" },
]

// Direct connections (can be made without relay)
const directConnections = [
  { from: 0, to: 1 }, // mobile to laptop (same network)
]

// Relay connections (go through relays)
const relayConnections = [
  { device: 0, relay: 0 }, // mobile to AWS relay
  { device: 1, relay: 0 }, // laptop to AWS relay
  { device: 2, relay: 1 }, // server to GCP relay
  { device: 3, relay: 1 }, // iot to GCP relay
]

// Mobile device icon
const MobileIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 10}, ${y - 16})`}>
    <rect
      x="4"
      y="2"
      width="12"
      height="20"
      rx="2"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    <line
      x1="8"
      y1="18"
      x2="12"
      y2="18"
      stroke={palette[0]}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <text
      x="10"
      y="34"
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </g>
)

// Laptop icon
const LaptopIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 14}, ${y - 10})`}>
    <rect
      x="2"
      y="2"
      width="24"
      height="14"
      rx="1"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    <path
      d="M0 16 L28 16 L26 20 L2 20 Z"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    <text
      x="14"
      y="32"
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </g>
)

// Server icon
const ServerIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 10}, ${y - 14})`}>
    <rect
      x="2"
      y="2"
      width="16"
      height="6"
      rx="1"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    <rect
      x="2"
      y="10"
      width="16"
      height="6"
      rx="1"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    <circle cx="5" cy="5" r="1" fill={palette[0]} />
    <circle cx="5" cy="13" r="1" fill={palette[0]} />
    <text
      x="10"
      y="28"
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </g>
)

// IoT device icon
const IoTIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 10}, ${y - 10})`}>
    <circle
      cx="10"
      cy="10"
      r="8"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />
    <circle cx="10" cy="10" r="3" fill={palette[0]} />
    {/* Signal waves */}
    <path
      d="M18 6 Q22 10 18 14"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1"
      opacity="0.6"
    />
    <text
      x="10"
      y="28"
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </g>
)

// Get icon component by device id
const getDeviceIcon = (id, x, y, label) => {
  switch (id) {
    case "mobile1":
      return <MobileIcon x={x} y={y} label={label} />
    case "laptop":
      return <LaptopIcon x={x} y={y} label={label} />
    case "server":
      return <ServerIcon x={x} y={y} label={label} />
    case "iot":
      return <IoTIcon x={x} y={y} label={label} />
    default:
      return null
  }
}

// Relay node component
const RelayNode = ({ x, y, label, index }) => (
  <g>
    {/* Outer ring */}
    <circle
      cx={x}
      cy={y}
      r="20"
      fill="none"
      stroke={palette[1]}
      strokeWidth="2"
      strokeDasharray="6 3"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={`0 ${x} ${y}`}
        to={`${index % 2 === 0 ? 360 : -360} ${x} ${y}`}
        dur="15s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Inner circle */}
    <circle
      cx={x}
      cy={y}
      r="12"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
    />

    {/* Relay symbol (arrows pointing in/out) */}
    <path
      d={`M${x - 5} ${y} L${x + 5} ${y}`}
      stroke={palette[1]}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d={`M${x} ${y - 5} L${x} ${y + 5}`}
      stroke={palette[1]}
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Pulse animation */}
    <circle
      cx={x}
      cy={y}
      r="12"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1"
      opacity="0.5"
    >
      <animate
        attributeName="r"
        values="12;24;12"
        dur={`${2.5 + index * 0.5}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.5;0;0.5"
        dur={`${2.5 + index * 0.5}s`}
        repeatCount="indefinite"
      />
    </circle>

    <text
      x={x}
      y={y + 34}
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </g>
)

// Animated connection line
const ConnectionLine = ({ x1, y1, x2, y2, delay, dashed = true }) => {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={palette[0]}
        strokeWidth="1.5"
        strokeDasharray={dashed ? "4 3" : "none"}
        opacity="0.4"
      />
      {/* Animated dot traveling along the line */}
      <circle r="3" fill={palette[0]}>
        <animate
          attributeName="cx"
          values={`${x1};${x2};${x1}`}
          dur={`${2.5 + delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values={`${y1};${y2};${y1}`}
          dur={`${2.5 + delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.9;0.5;0.9"
          dur={`${2.5 + delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
}

// Direct connection (solid line, different style)
const DirectConnection = ({ x1, y1, x2, y2 }) => {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={palette[2]}
        strokeWidth="2"
        opacity="0.6"
      />
      <text
        x={(x1 + x2) / 2 + 15}
        y={(y1 + y2) / 2}
        fill={palette[2]}
        fontSize="6"
        fontFamily="sans-serif"
      >
        DIRECT
      </text>
    </g>
  )
}

// Firewall/NAT indicator
const FirewallIndicator = ({ x, y }) => (
  <g transform={`translate(${x - 30}, ${y - 60})`}>
    <rect
      x="0"
      y="0"
      width="2"
      height="120"
      fill={palette[2]}
      opacity="0.3"
    />
    <text
      x="6"
      y="60"
      fill={palette[2]}
      fontSize="6"
      fontFamily="sans-serif"
      opacity="0.6"
      transform="rotate(-90, 6, 60)"
    >
      NAT / FIREWALL
    </text>
  </g>
)

export function RelayIllustration({ className }) {
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <svg viewBox="0 0 440 260" className="rounded">
        {/* Firewall indicators */}
        <FirewallIndicator x={120} y={130} />
        <FirewallIndicator x={320} y={130} />

        {/* Direct connection (same network) */}
        {directConnections.map((conn, i) => (
          <DirectConnection
            key={`direct-${i}`}
            x1={devices[conn.from].x}
            y1={devices[conn.from].y}
            x2={devices[conn.to].x}
            y2={devices[conn.to].y}
          />
        ))}

        {/* Device to relay connections */}
        {relayConnections.map((conn, i) => (
          <ConnectionLine
            key={`device-relay-${i}`}
            x1={devices[conn.device].x}
            y1={devices[conn.device].y}
            x2={relays[conn.relay].x}
            y2={relays[conn.relay].y}
            delay={i * 0.4}
          />
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

        {/* Device icons */}
        {devices.map((device) => (
          <g key={device.id}>
            {getDeviceIcon(device.id, device.x, device.y, device.label)}
          </g>
        ))}

        {/* Connection status indicators */}
        {devices.map((device, i) => (
          <circle
            key={`status-${device.id}`}
            cx={device.x + 12}
            cy={device.y - 18}
            r="3"
            fill={palette[0]}
          >
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur={`${1.5 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}
