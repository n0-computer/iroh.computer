const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

// Device positions in a mesh network
const devices = [
  { id: "cloud", x: 220, y: 40, label: "Cloud Server" },
  { id: "tablet", x: 360, y: 80, label: "Tablet" },
  { id: "pi", x: 380, y: 180, label: "Raspberry Pi" },
  { id: "legacy", x: 280, y: 220, label: "Legacy System" },
  { id: "server", x: 160, y: 220, label: "Server" },
  { id: "iot", x: 60, y: 180, label: "IoT Device" },
  { id: "mobile", x: 80, y: 80, label: "Mobile" },
]

// Mesh connections - pairs of device indices that connect
const meshConnections = [
  [0, 1],
  [0, 6],
  [0, 3],
  [0, 4], // cloud connects to tablet, mobile, legacy, server
  [1, 2],
  [1, 3], // tablet connects to pi, legacy
  [2, 3], // pi connects to legacy
  [3, 4], // legacy connects to server
  [4, 5],
  [4, 6], // server connects to iot, mobile
  [5, 6], // iot connects to mobile
  [6, 1], // mobile connects to tablet
  [5, 0], // iot connects to cloud
]

// Cloud icon
const CloudIcon = ({ x, y }) => (
  <g transform={`translate(${x - 12}, ${y - 8})`}>
    <path
      d="M6 16a4 4 0 0 1-.8-7.9A5.5 5.5 0 0 1 16 9a4.5 4.5 0 0 1 1 8.9"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
)

// Server icon
const ServerIcon = ({ x, y }) => (
  <g transform={`translate(${x - 10}, ${y - 12})`}>
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
  </g>
)

// Tablet icon
const TabletIcon = ({ x, y }) => (
  <g transform={`translate(${x - 10}, ${y - 12})`}>
    <rect
      x="3"
      y="1"
      width="14"
      height="22"
      rx="2"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
    />
    <line
      x1="10"
      y1="19"
      x2="10"
      y2="19"
      stroke={palette[1]}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </g>
)

// Raspberry Pi icon (small circuit board)
const PiIcon = ({ x, y }) => (
  <g transform={`translate(${x - 10}, ${y - 10})`}>
    <rect
      x="2"
      y="4"
      width="16"
      height="12"
      rx="1"
      fill="none"
      stroke={palette[2]}
      strokeWidth="1.5"
    />
    <circle cx="6" cy="8" r="1.5" fill={palette[2]} />
    <circle cx="14" cy="8" r="1.5" fill={palette[2]} />
    <line x1="4" y1="2" x2="4" y2="4" stroke={palette[2]} strokeWidth="1.5" />
    <line x1="8" y1="2" x2="8" y2="4" stroke={palette[2]} strokeWidth="1.5" />
    <line x1="12" y1="2" x2="12" y2="4" stroke={palette[2]} strokeWidth="1.5" />
    <line x1="16" y1="2" x2="16" y2="4" stroke={palette[2]} strokeWidth="1.5" />
  </g>
)

// Mobile icon
const MobileIcon = ({ x, y }) => (
  <g transform={`translate(${x - 8}, ${y - 12})`}>
    <rect
      x="2"
      y="1"
      width="12"
      height="22"
      rx="2"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
    />
    <line
      x1="8"
      y1="19"
      x2="8"
      y2="19"
      stroke={palette[1]}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </g>
)

// IoT Device icon
const IoTIcon = ({ x, y }) => (
  <g transform={`translate(${x - 10}, ${y - 10})`}>
    <circle
      cx="10"
      cy="10"
      r="6"
      fill="none"
      stroke={palette[2]}
      strokeWidth="1.5"
    />
    <circle cx="10" cy="10" r="2" fill={palette[2]} />
    <path d="M10 2 L10 4" stroke={palette[2]} strokeWidth="1.5" />
    <path d="M10 16 L10 18" stroke={palette[2]} strokeWidth="1.5" />
    <path d="M2 10 L4 10" stroke={palette[2]} strokeWidth="1.5" />
    <path d="M16 10 L18 10" stroke={palette[2]} strokeWidth="1.5" />
  </g>
)

// Legacy system icon (old monitor)
const LegacyIcon = ({ x, y }) => (
  <g transform={`translate(${x - 12}, ${y - 10})`}>
    <rect
      x="2"
      y="2"
      width="20"
      height="14"
      rx="1"
      fill="none"
      stroke={palette[2]}
      strokeWidth="1.5"
    />
    <line
      x1="8"
      y1="18"
      x2="16"
      y2="18"
      stroke={palette[2]}
      strokeWidth="1.5"
    />
    <line
      x1="12"
      y1="16"
      x2="12"
      y2="18"
      stroke={palette[2]}
      strokeWidth="1.5"
    />
  </g>
)

// Get icon component by device id
const getIcon = (id, x, y) => {
  switch (id) {
    case "cloud":
      return <CloudIcon x={x} y={y} />
    case "server":
      return <ServerIcon x={x} y={y} />
    case "tablet":
      return <TabletIcon x={x} y={y} />
    case "pi":
      return <PiIcon x={x} y={y} />
    case "mobile":
      return <MobileIcon x={x} y={y} />
    case "iot":
      return <IoTIcon x={x} y={y} />
    case "legacy":
      return <LegacyIcon x={x} y={y} />
    default:
      return null
  }
}

export function AnywhereIllustration({ className }) {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <svg viewBox="0 0 440 260" className="rounded">
        {/* Mesh connection lines between devices */}
        {meshConnections.map(([i, j], idx) => {
          const d1 = devices[i]
          const d2 = devices[j]
          return (
            <line
              key={`mesh-${idx}`}
              x1={d1.x}
              y1={d1.y}
              x2={d2.x}
              y2={d2.y}
              stroke={palette[idx % 3]}
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.5"
            />
          )
        })}

        {/* Animated pulse circles traveling along connections */}
        {meshConnections.map(([i, j], idx) => {
          const d1 = devices[i]
          const d2 = devices[j]
          const duration = 2 + (idx % 5) * 0.4
          return (
            <circle
              key={`pulse-${idx}`}
              r="2.5"
              fill={palette[idx % 3]}
              opacity="0.8"
            >
              <animate
                attributeName="cx"
                values={`${d1.x};${d2.x};${d1.x}`}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${d1.y};${d2.y};${d1.y}`}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}

        {/* Device icons */}
        {devices.map((device) => (
          <g key={device.id}>{getIcon(device.id, device.x, device.y)}</g>
        ))}

        {/* Connection status indicators */}
        {devices.map((device, i) => (
          <circle
            key={`status-${device.id}`}
            cx={device.x + 12}
            cy={device.y - 12}
            r="3"
            fill={palette[0]}
          >
            <animate
              attributeName="fill"
              values={`${palette[0]};${palette[1]};${palette[0]}`}
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}
