import React from 'react';

// --- Themes ---

interface Theme {
  device: string;
  label: string;
  sdkText: string;
  background: string;
}

const lightTheme: Theme = {
  device:     '#7C7CFF',
  label:      '#888',
  sdkText:    '#7C7CFF',
  background: 'transparent',
};

const darkTheme: Theme = {
  device:     '#9494F7',
  label:      '#80878d',  // --dark-code-comment
  sdkText:    '#f7f7f7',  // --dark-code-text
  background: '#1b1b1b',  // --dark-code-background
};

// --- Layout constants ---

const SPACING = 112;
const START_X = 60;
const SDK_X = START_X + SPACING * 2;
const SDK_Y = 38;
const BRANCH_Y = 80;
const DEVICE_Y = 148;
const GAP = 6;

const deviceXs = [0, 1, 2, 3, 4].map(i => START_X + SPACING * i);

// --- Shared components ---

const DeviceLabel = ({ x, y, lines, t }: { x: number; y: number; lines: string[]; t: Theme }) => (
  <g>
    {lines.map((line, i) => (
      <text key={i} x={x} y={y + i * 11} textAnchor="middle" fill={t.label} fontSize="8" fontFamily="sans-serif">
        {line}
      </text>
    ))}
  </g>
);

const IrohSDKBox = ({ x, y, t }: { x: number; y: number; t: Theme }) => (
  <g>
    <rect x={x - 46} y={y - 16} width="92" height="32" rx="6" fill={t.device} opacity="0.15" />
    <rect x={x - 46} y={y - 16} width="92" height="32" rx="6" fill="none" stroke={t.device} strokeWidth="1.5" opacity="0.7" />
    <text x={x} y={y + 5} textAnchor="middle" fill={t.sdkText} fontSize="12" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.04em">
      iroh 
    </text>
  </g>
);

const DistributionArrows = ({ deviceXs, fromY, branchY, toYs, t }: {
  deviceXs: number[];
  fromY: number;
  branchY: number;
  toYs: number[];
  t: Theme;
}) => {
  const arrowSize = 5;
  return (
    <g stroke={t.device} strokeWidth="1.5" fill="none" opacity="0.55">
      <line x1={SDK_X} y1={fromY} x2={SDK_X} y2={branchY} />
      <line x1={deviceXs[0]} y1={branchY} x2={deviceXs[deviceXs.length - 1]} y2={branchY} />
      {deviceXs.map((x, idx) => {
        const toY = toYs[idx];
        return (
          <g key={x}>
            <line x1={x} y1={branchY} x2={x} y2={toY} />
            <polygon
              points={`${x},${toY} ${x - arrowSize},${toY - arrowSize * 1.6} ${x + arrowSize},${toY - arrowSize * 1.6}`}
              fill={t.device}
              stroke="none"
              opacity="0.7"
            />
          </g>
        );
      })}
    </g>
  );
};

// --- Device icons ---

const EmbeddedDevice = ({ x, y, t }: { x: number; y: number; t: Theme }) => {
  const w = 44, h = 36;
  return (
    <g>
      {[0, 1, 2, 3].map(i => (
        <line key={`t${i}`} x1={x - 14 + i * 10} y1={y - h / 2} x2={x - 14 + i * 10} y2={y - h / 2 - 7} stroke={t.device} strokeWidth="1.5" opacity="0.5" />
      ))}
      {[0, 1, 2, 3].map(i => (
        <line key={`b${i}`} x1={x - 14 + i * 10} y1={y + h / 2} x2={x - 14 + i * 10} y2={y + h / 2 + 7} stroke={t.device} strokeWidth="1.5" opacity="0.5" />
      ))}
      {[0, 1].map(i => (
        <line key={`l${i}`} x1={x - w / 2} y1={y - 8 + i * 16} x2={x - w / 2 - 7} y2={y - 8 + i * 16} stroke={t.device} strokeWidth="1.5" opacity="0.5" />
      ))}
      {[0, 1].map(i => (
        <line key={`r${i}`} x1={x + w / 2} y1={y - 8 + i * 16} x2={x + w / 2 + 7} y2={y - 8 + i * 16} stroke={t.device} strokeWidth="1.5" opacity="0.5" />
      ))}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="2" fill="none" stroke={t.device} strokeWidth="1.5" />
      <DeviceLabel x={x} y={y + h / 2 + 16} lines={["Embedded", "Device"]} t={t} />
    </g>
  );
};

const CloudDevice = ({ x, y, t }: { x: number; y: number; t: Theme }) => {
  const w = 48, rh = 12;
  return (
    <g>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={x - w / 2} y={y - 20 + i * (rh + 3)} width={w} height={rh} rx="2" fill="none" stroke={t.device} strokeWidth="1.5" />
          <circle cx={x - w / 2 + 5} cy={y - 20 + i * (rh + 3) + rh / 2} r="2" fill={t.device} opacity={0.3 + i * 0.2} />
          <line x1={x - w / 2 + 12} y1={y - 20 + i * (rh + 3) + 4} x2={x + w / 2 - 6} y2={y - 20 + i * (rh + 3) + 4} stroke={t.device} strokeWidth="1" opacity="0.3" />
          <line x1={x - w / 2 + 12} y1={y - 20 + i * (rh + 3) + 8} x2={x + w / 2 - 6} y2={y - 20 + i * (rh + 3) + 8} stroke={t.device} strokeWidth="1" opacity="0.3" />
        </g>
      ))}
      <DeviceLabel x={x} y={y + 36} lines={["Cloud"]} t={t} />
    </g>
  );
};

const TerminalDevice = ({ x, y, t }: { x: number; y: number; t: Theme }) => {
  const w = 38, h = 48;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="3" fill="none" stroke={t.device} strokeWidth="1.5" />
      <rect x={x - w / 2 + 4} y={y - h / 2 + 4} width={w - 8} height={14} rx="1" fill="none" stroke={t.device} strokeWidth="0.8" opacity="0.4" />
      <rect x={x - w / 2 + 4} y={y - h / 2 + 23} width={w - 8} height={4} rx="1" fill="none" stroke={t.device} strokeWidth="1" />
      {[0, 1, 2].map(col => (
        <circle key={col} cx={x - 8 + col * 8} cy={y + h / 2 - 10} r="1.5" fill={t.device} opacity="0.5" />
      ))}
      <DeviceLabel x={x} y={y + h / 2 + 10} lines={["Payment", "Terminal"]} t={t} />
    </g>
  );
};

const MobileDevice = ({ x, y, t }: { x: number; y: number; t: Theme }) => {
  const w = 28, h = 48;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="4" fill="none" stroke={t.device} strokeWidth="1.5" />
      <circle cx={x} cy={y - h / 2 + 4} r="1.5" fill={t.device} opacity="0.5" />
      <rect x={x - w / 2 + 3} y={y - h / 2 + 9} width={w - 6} height={28} rx="1" fill="none" stroke={t.device} strokeWidth="0.8" opacity="0.4" />
      <line x1={x - 6} y1={y + h / 2 - 5} x2={x + 6} y2={y + h / 2 - 5} stroke={t.device} strokeWidth="1.5" strokeLinecap="round" />
      <DeviceLabel x={x} y={y + h / 2 + 10} lines={["Mobile", "Phone"]} t={t} />
    </g>
  );
};

const DesktopDevice = ({ x, y, t }: { x: number; y: number; t: Theme }) => {
  const w = 52, h = 36;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="2" fill="none" stroke={t.device} strokeWidth="1.5" />
      <rect x={x - w / 2 + 3} y={y - h / 2 + 3} width={w - 6} height={h - 8} rx="1" fill="none" stroke={t.device} strokeWidth="0.8" opacity="0.4" />
      <line x1={x} y1={y + h / 2} x2={x} y2={y + h / 2 + 8} stroke={t.device} strokeWidth="2" />
      <line x1={x - 10} y1={y + h / 2 + 8} x2={x + 10} y2={y + h / 2 + 8} stroke={t.device} strokeWidth="2" strokeLinecap="round" />
      <DeviceLabel x={x} y={y + h / 2 + 20} lines={["Desktop", "App"]} t={t} />
    </g>
  );
};

// --- Main component ---

interface IrohEverywhereProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  dark?: boolean;
}

export function IrohEverywhere({ className, width, height, dark = false }: IrohEverywhereProps) {
  const t = dark ? darkTheme : lightTheme;

  const toYs = [
    DEVICE_Y - 18 - 7 - GAP, // embedded: above pin tops
    DEVICE_Y - 24 - GAP,     // terminal: above body top
    DEVICE_Y - 24 - GAP,     // mobile: above body top
    DEVICE_Y - 18 - GAP,     // desktop: above monitor top
    DEVICE_Y - 20 - GAP,     // cloud: above top rack
  ];

  return (
    <div className={`w-full ${className || ''}`} style={{ aspectRatio: '580 / 230' }}>
      <svg viewBox="0 0 580 230" style={{ display: 'block', width: '100%', height: '100%' }} className="rounded">
        {dark && <rect width="580" height="230" fill={t.background} rx="4" />}

        <IrohSDKBox x={SDK_X} y={SDK_Y} t={t} />

        <DistributionArrows deviceXs={deviceXs} fromY={SDK_Y + 16} branchY={BRANCH_Y} toYs={toYs} t={t} />

        <EmbeddedDevice x={deviceXs[0]} y={DEVICE_Y} t={t} />
        <TerminalDevice x={deviceXs[1]} y={DEVICE_Y} t={t} />
        <MobileDevice   x={deviceXs[2]} y={DEVICE_Y} t={t} />
        <DesktopDevice  x={deviceXs[3]} y={DEVICE_Y} t={t} />
        <CloudDevice    x={deviceXs[4]} y={DEVICE_Y} t={t} />
      </svg>
    </div>
  );
}

export function IrohEverywhereDark(props: Omit<IrohEverywhereProps, 'dark'>) {
  return <IrohEverywhere {...props} dark />;
}
