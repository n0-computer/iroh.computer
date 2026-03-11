const palette = [
  "#7C7CFF", // irohPurple-500 (primary)
  "#6257F7", // irohPurple-600 (secondary)
  "#4E3FE0", // irohPurple-700 (tertiary)
]

// Endpoint positions sending metrics
const endpoints = [
  { id: "mobile", x: 60, y: 60, label: "Mobile" },
  { id: "server", x: 60, y: 130, label: "Server" },
  { id: "iot", x: 60, y: 200, label: "IoT" },
]

// Dashboard position
const dashboard = { x: 340, y: 130 }

// Metric types flowing to dashboard
const metricTypes = [
  { label: "Connections", y: 50 },
  { label: "Latency", y: 90 },
  { label: "Throughput", y: 130 },
  { label: "Custom", y: 170 },
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

// Get icon component by endpoint id
const getEndpointIcon = (id, x, y, label) => {
  switch (id) {
    case "mobile":
      return <MobileIcon x={x} y={y} label={label} />
    case "server":
      return <ServerIcon x={x} y={y} label={label} />
    case "iot":
      return <IoTIcon x={x} y={y} label={label} />
    default:
      return null
  }
}

// Dashboard component
const DashboardIcon = ({ x, y }) => (
  <g>
    {/* Dashboard frame */}
    <rect
      x={x - 50}
      y={y - 60}
      width="100"
      height="120"
      rx="4"
      fill="none"
      stroke={palette[1]}
      strokeWidth="2"
    />
    
    {/* Header bar */}
    <rect
      x={x - 50}
      y={y - 60}
      width="100"
      height="16"
      rx="4"
      fill={palette[1]}
      opacity="0.3"
    />
    
    {/* Bar chart */}
    <rect x={x - 40} y={y - 30} width="8" height="30" fill={palette[0]} opacity="0.7">
      <animate
        attributeName="height"
        values="30;40;25;30"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="-30;-40;-25;-30"
        dur="2s"
        repeatCount="indefinite"
        additive="sum"
      />
    </rect>
    <rect x={x - 28} y={y - 20} width="8" height="20" fill={palette[0]} opacity="0.7">
      <animate
        attributeName="height"
        values="20;35;20;20"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x={x - 16} y={y - 35} width="8" height="35" fill={palette[0]} opacity="0.7">
      <animate
        attributeName="height"
        values="35;25;40;35"
        dur="1.8s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x={x - 4} y={y - 25} width="8" height="25" fill={palette[0]} opacity="0.7">
      <animate
        attributeName="height"
        values="25;30;20;25"
        dur="2.2s"
        repeatCount="indefinite"
      />
    </rect>
    
    {/* Line chart */}
    <polyline
      points={`${x - 40},${y + 30} ${x - 25},${y + 20} ${x - 10},${y + 35} ${x + 5},${y + 15} ${x + 20},${y + 25} ${x + 35},${y + 10}`}
      fill="none"
      stroke={palette[2]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="100;0"
        dur="3s"
        repeatCount="indefinite"
      />
    </polyline>
    
    {/* Status indicators */}
    <circle cx={x + 30} cy={y - 52} r="3" fill={palette[0]}>
      <animate
        attributeName="opacity"
        values="1;0.4;1"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx={x + 38} cy={y - 52} r="3" fill={palette[0]}>
      <animate
        attributeName="opacity"
        values="1;0.4;1"
        dur="1.8s"
        repeatCount="indefinite"
      />
    </circle>
    
    <text
      x={x}
      y={y + 75}
      textAnchor="middle"
      fill="#888"
      fontSize="8"
      fontFamily="sans-serif"
    >
      Dashboard
    </text>
  </g>
)

// Animated metric flow line
const MetricFlow = ({ x1, y1, x2, y2, delay, label }) => {
  // Calculate midpoint for label
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2
  
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
        opacity="0.3"
      />
      {/* Animated dot */}
      <circle r="3" fill={palette[0]}>
        <animate
          attributeName="cx"
          values={`${x1};${x2};${x2}`}
          dur={`${2 + delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values={`${y1};${y2};${y2}`}
          dur={`${2 + delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.9;0.9;0"
          dur={`${2 + delay}s`}
          repeatCount="indefinite"
        />
      </circle>
      {/* Metric label */}
      {label && (
        <text
          x={midX}
          y={midY - 6}
          textAnchor="middle"
          fill={palette[1]}
          fontSize="6"
          fontFamily="sans-serif"
          opacity="0.8"
        >
          {label}
        </text>
      )}
    </g>
  )
}

// Aggregator node
const AggregatorNode = ({ x, y }) => (
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
        to={`360 ${x} ${y}`}
        dur="12s"
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

    {/* Aggregation symbol (Σ) */}
    <text
      x={x}
      y={y + 5}
      textAnchor="middle"
      fill={palette[1]}
      fontSize="14"
      fontFamily="sans-serif"
      fontWeight="bold"
    >
      Σ
    </text>

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
        dur="2.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.5;0;0.5"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>

    <text
      x={x}
      y={y + 36}
      textAnchor="middle"
      fill="#888"
      fontSize="7"
      fontFamily="sans-serif"
    >
      Aggregator
    </text>
  </g>
)

export function MetricsIllustration({ className }) {
  const aggregatorX = 180
  const aggregatorY = 130
  
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <svg viewBox="0 0 480 260" className="rounded">
        {/* Metric flows from endpoints to aggregator */}
        {endpoints.map((endpoint, i) => (
          <MetricFlow
            key={`endpoint-agg-${i}`}
            x1={endpoint.x + 20}
            y1={endpoint.y}
            x2={aggregatorX - 20}
            y2={aggregatorY}
            delay={i * 0.5}
          />
        ))}

        {/* Flow from aggregator to dashboard */}
        <MetricFlow
          x1={aggregatorX + 20}
          y1={aggregatorY}
          x2={dashboard.x - 55}
          y2={dashboard.y}
          delay={0.3}
        />

        {/* Metric type labels near dashboard */}
        {metricTypes.map((metric, i) => (
          <g key={`metric-label-${i}`}>
            <rect
              x={dashboard.x + 60}
              y={metric.y}
              width="70"
              height="20"
              rx="3"
              fill={palette[0]}
              opacity="0.15"
            />
            <text
              x={dashboard.x + 95}
              y={metric.y + 14}
              textAnchor="middle"
              fill={palette[0]}
              fontSize="8"
              fontFamily="sans-serif"
            >
              {metric.label}
            </text>
            <circle
              cx={dashboard.x + 55}
              cy={metric.y + 10}
              r="2"
              fill={palette[0]}
            >
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur={`${1.5 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Aggregator node */}
        <AggregatorNode x={aggregatorX} y={aggregatorY} />

        {/* Dashboard */}
        <DashboardIcon x={dashboard.x} y={dashboard.y} />

        {/* Endpoint icons */}
        {endpoints.map((endpoint) => (
          <g key={endpoint.id}>
            {getEndpointIcon(endpoint.id, endpoint.x, endpoint.y, endpoint.label)}
          </g>
        ))}

        {/* Connection status indicators on endpoints */}
        {endpoints.map((endpoint, i) => (
          <circle
            key={`status-${endpoint.id}`}
            cx={endpoint.x + 14}
            cy={endpoint.y - 18}
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
