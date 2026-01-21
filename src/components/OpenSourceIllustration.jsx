const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

// Cloud providers/regions around the central open source core
const clouds = [
  { id: "aws", x: 80, y: 60, label: "AWS" },
  { id: "gcp", x: 220, y: 30, label: "GCP" },
  { id: "azure", x: 360, y: 60, label: "Azure" },
  { id: "selfhost", x: 400, y: 160, label: "Self-Host" },
  { id: "edge", x: 340, y: 230, label: "Edge" },
  { id: "hybrid", x: 100, y: 230, label: "Hybrid" },
  { id: "private", x: 40, y: 160, label: "Private" },
]

// Stateless relay positions
const relays = [
  { x: 150, y: 100 },
  { x: 290, y: 100 },
  { x: 320, y: 180 },
  { x: 120, y: 180 },
]

const center = { x: 220, y: 140 }

// Cloud provider icon
const CloudIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 16}, ${y - 12})`}>
    <path
      d="M8 20a6 6 0 0 1-1.2-11.9A8 8 0 0 1 22 12a6.5 6.5 0 0 1 1.5 12.8"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="scale(0.7)"
    />
    <text
      x="12"
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

// Server/Self-host icon
const ServerIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 10}, ${y - 14})`}>
    <rect
      x="2"
      y="2"
      width="16"
      height="5"
      rx="1"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
    />
    <rect
      x="2"
      y="9"
      width="16"
      height="5"
      rx="1"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
    />
    <circle cx="5" cy="4.5" r="1" fill={palette[1]} />
    <circle cx="5" cy="11.5" r="1" fill={palette[1]} />
    <text
      x="10"
      y="26"
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </g>
)

// Edge node icon
const EdgeIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 10}, ${y - 10})`}>
    <polygon
      points="10,2 18,8 18,16 10,22 2,16 2,8"
      fill="none"
      stroke={palette[2]}
      strokeWidth="1.5"
    />
    <circle cx="10" cy="12" r="3" fill={palette[2]} />
    <text
      x="10"
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

// Hybrid cloud icon
const HybridIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 12}, ${y - 10})`}>
    <rect
      x="2"
      y="8"
      width="10"
      height="8"
      rx="1"
      fill="none"
      stroke={palette[2]}
      strokeWidth="1.5"
    />
    <path
      d="M14 6a4 4 0 0 1 8 1 3 3 0 0 1 0 6h-6"
      fill="none"
      stroke={palette[2]}
      strokeWidth="1.5"
      transform="scale(0.6) translate(8, 2)"
    />
    <text
      x="12"
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

// Private cloud icon (lock)
const PrivateIcon = ({ x, y, label }) => (
  <g transform={`translate(${x - 10}, ${y - 12})`}>
    <rect
      x="4"
      y="10"
      width="12"
      height="10"
      rx="1"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
    />
    <path
      d="M7 10V7a3 3 0 0 1 6 0v3"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
    />
    <circle cx="10" cy="15" r="1.5" fill={palette[1]} />
    <text
      x="10"
      y="30"
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      {label}
    </text>
  </g>
)

// Get icon component by cloud id
const getIcon = (id, x, y, label) => {
  switch (id) {
    case "aws":
    case "gcp":
    case "azure":
      return <CloudIcon x={x} y={y} label={label} />
    case "selfhost":
      return <ServerIcon x={x} y={y} label={label} />
    case "edge":
      return <EdgeIcon x={x} y={y} label={label} />
    case "hybrid":
      return <HybridIcon x={x} y={y} label={label} />
    case "private":
      return <PrivateIcon x={x} y={y} label={label} />
    default:
      return null
  }
}

// Stateless relay component
const StatelessRelay = ({ x, y, index }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r="8"
      fill="none"
      stroke={palette[1]}
      strokeWidth="1.5"
      strokeDasharray="3 2"
    />
    <circle cx={x} cy={y} r="3" fill={palette[1]} opacity="0.7">
      <animate
        attributeName="opacity"
        values="0.7;0.3;0.7"
        dur={`${1.5 + index * 0.4}s`}
        repeatCount="indefinite"
      />
    </circle>
  </g>
)

// Open source heart/bracket symbol
const OpenSourceCore = ({ x, y }) => (
  <g transform={`translate(${x - 20}, ${y - 20})`}>
    {/* Outer rotating ring */}
    <circle
      cx="20"
      cy="20"
      r="18"
      fill="none"
      stroke={palette[0]}
      strokeWidth="2"
      strokeDasharray="8 4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="20s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Inner circle */}
    <circle
      cx="20"
      cy="20"
      r="12"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1.5"
    />

    {/* Open bracket < */}
    <path
      d="M16 14 L12 20 L16 26"
      fill="none"
      stroke={palette[0]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Close bracket > */}
    <path
      d="M24 14 L28 20 L24 26"
      fill="none"
      stroke={palette[0]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Slash / */}
    <line
      x1="22"
      y1="14"
      x2="18"
      y2="26"
      stroke={palette[0]}
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Pulse animation */}
    <circle
      cx="20"
      cy="20"
      r="12"
      fill="none"
      stroke={palette[0]}
      strokeWidth="1"
      opacity="0.5"
    >
      <animate
        attributeName="r"
        values="12;22;12"
        dur="3s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.5;0;0.5"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
  </g>
)

// Migration arrow (showing no lock-in)
const MigrationArrow = ({ x1, y1, x2, y2, delay }) => {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={palette[0]}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.4"
      />
      {/* Animated dot traveling along the line */}
      <circle r="2.5" fill={palette[0]}>
        <animate
          attributeName="cx"
          values={`${x1};${x2};${x1}`}
          dur={`${3 + delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values={`${y1};${y2};${y1}`}
          dur={`${3 + delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.4;0.8"
          dur={`${3 + delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
}

export function OpenSourceIllustration({ className }) {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <svg viewBox="0 0 440 280" className="rounded">
        {/* Connection lines from center to relays */}
        {relays.map((relay, i) => (
          <line
            key={`center-relay-${i}`}
            x1={center.x}
            y1={center.y}
            x2={relay.x}
            y2={relay.y}
            stroke={palette[0]}
            strokeWidth="1.5"
            opacity="0.5"
          />
        ))}

        {/* Connection lines from relays to clouds */}
        {clouds.map((cloud, i) => {
          // Connect to nearest relay
          const nearestRelay = relays.reduce((nearest, relay) => {
            const dist = Math.hypot(relay.x - cloud.x, relay.y - cloud.y)
            const nearestDist = Math.hypot(
              nearest.x - cloud.x,
              nearest.y - cloud.y,
            )
            return dist < nearestDist ? relay : nearest
          }, relays[0])

          return (
            <MigrationArrow
              key={`relay-cloud-${i}`}
              x1={nearestRelay.x}
              y1={nearestRelay.y}
              x2={cloud.x}
              y2={cloud.y}
              delay={i * 0.5}
            />
          )
        })}

        {/* Cross-cloud migration lines (showing portability) */}
        <MigrationArrow
          x1={clouds[0].x}
          y1={clouds[0].y}
          x2={clouds[2].x}
          y2={clouds[2].y}
          delay={1}
        />
        <MigrationArrow
          x1={clouds[1].x}
          y1={clouds[1].y}
          x2={clouds[3].x}
          y2={clouds[3].y}
          delay={2}
        />

        {/* Stateless relays */}
        {relays.map((relay, i) => (
          <StatelessRelay
            key={`relay-${i}`}
            x={relay.x}
            y={relay.y}
            index={i}
          />
        ))}

        {/* Open source core */}
        <OpenSourceCore x={center.x} y={center.y} />

        {/* Cloud provider icons */}
        {clouds.map((cloud) => (
          <g key={cloud.id}>
            {getIcon(cloud.id, cloud.x, cloud.y, cloud.label)}
          </g>
        ))}

        {/* Connection status indicators (purple = healthy) */}
        {clouds.map((cloud, i) => (
          <circle
            key={`status-${cloud.id}`}
            cx={cloud.x + 14}
            cy={cloud.y - 14}
            r="3"
            fill={palette[0]}
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}
