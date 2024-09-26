import React from 'react';

export const ConnectDevicesIllustration = ({ className }) => (
  <div className={className}>
    <ConnectDevicesIllustrationLight className='block dark:hidden' />
    <ConnectDevicesIllustrationDark className='hidden dark:block' />
  </div>
)


export const ConnectDevicesIllustrationDark = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 150">
    <defs>
      <style>
        {`
          .text {
            fill: #7c7cf7;
            font-family: SpaceMono-Regular, 'Space Mono';
            font-size: 12.59px;
            letter-spacing: .1em;
          }
          .devices-2 { stroke: #9494F7; }
          .devices-2, .devices-3 {
            fill: none;
            stroke-miterlimit: 10;
          }
          .devices-3 {
            stroke: #f8f8f8;
          }
          .devices-4 {
            fill: #282828;
          }
          .devices-4, .devices-5 {
            stroke-width: 0px;
          }
          .devices-5 {
            fill: #9494F7;
          }
        `}
      </style>
    </defs>
    <g id="Layer_1">
      <rect className="devices-3" x="3.23" y="72" width="33.43" height="55.24" rx="5.36" ry="5.36" />
      <circle className="devices-3" cx="19.95" cy="121.8" r="1.6" />
      <rect className="devices-3" x="472.2" y="72" width="33.43" height="55.24" rx="4.97" ry="4.97" />
      <circle className="devices-3" cx="488.92" cy="121.8" r="1.6" />
      <path className="devices-3" d="m287,123.74v-54.98c0-.7.57-1.27,1.27-1.27h84.39c.7,0,1.27.57,1.27,1.27v54.98" />
      <path className="devices-3" d="m281.45,123.3h98.02v1.11c0,1.53-1.25,2.78-2.78,2.78h-92.46c-1.53,0-2.78-1.25-2.78-2.78v-1.11h0Z" />
      <path className="devices-3" d="m113.08,106.41s0,16.66-12.04,16.66v4.17s48.14,0,48.14,0v-4.17c-12.04,0-12.04-16.66-12.04-16.66" />
      <rect className="devices-3" x="58.83" y="31.65" width="132.57" height="74.57" />
      <polyline className="devices-2" points="214.62 11.71 20.26 11.71 20.26 67.42" />
      <polygon className="devices-5" points="18.27 66.83 20.26 70.29 22.26 66.83 18.27 66.83" />
      <polyline className="devices-2" points="489.9 67.26 489.9 11.71 284.81 11.71" />
      <polygon className="devices-5" points="491.9 66.67 489.9 70.13 487.91 66.67 491.9 66.67" />
      <text className="text" transform="translate(155.9 148.2)">
        <tspan x="0" y="0">DIRECT</tspan>
      </text>
      <text className="text" transform="translate(220.53 16.02)">
        <tspan x="0" y="0">DIRECT</tspan>
      </text>
      <text className="text" transform="translate(398.06 102.54)">
        <tspan x="0" y="0">RELAY</tspan>
      </text>
      <line className="devices-2" x1="395.76" y1="97.37" x2="378.43" y2="97.37" />
      <polygon className="devices-5" points="379.02 95.38 375.56 97.37 379.02 99.37 379.02 95.38" />
      <line className="devices-2" x1="448.37" y1="97.37" x2="467.74" y2="97.37" />
      <polygon className="devices-5" points="467.15 99.37 470.61 97.37 467.15 95.38 467.15 99.37" />
      <text className="text" transform="translate(213.53 101.14)">
        <tspan x="0" y="0">DIRECT</tspan>
      </text>
      <line className="devices-2" x1="196.69" y1="97.03" x2="211.39" y2="97.03" />
      <polygon className="devices-5" points="197.28 99.03 193.82 97.03 197.28 95.04 197.28 99.03" />
      <line className="devices-2" x1="282.68" y1="97.03" x2="267.98" y2="97.03" />
      <polygon className="devices-5" points="282.1 95.04 285.55 97.03 282.1 99.03 282.1 95.04" />
      <polyline className="devices-2" points="153.57 144.19 19.95 144.19 19.95 131.6" />
      <polygon className="devices-5" points="21.94 132.19 19.95 128.73 17.95 132.19 21.94 132.19" />
      <polyline className="devices-2" points="330.46 131.6 330.46 144.19 210.25 144.19" />
      <polygon className="devices-5" points="328.47 132.19 330.46 128.73 332.46 132.19 328.47 132.19" />
    </g>
  </svg>
);


export const ConnectDevicesIllustrationLight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 150">
    <defs>
      <style>
        {`
          .text {
            fill: #7c7cf7;
            font-family: SpaceMono-Regular, 'Space Mono';
            font-size: 12.59px;
            letter-spacing: .1em;
          }
          .devices-light-2 { 
            stroke: #3C3C3C;
            fill: none;
            stroke-miterlimit: 10px;
          }
          .devices-light-3 {
            stroke: #9494f7;
            fill: none;
            stroke-width: 1px;
          }
          .devices-light-4 {
            fill: #9494f7;
          }
        `}
      </style>
    </defs>
    <rect className="devices-light-2" x="3.84" y="67.59" width="33.43" height="55.24" rx="5.36" ry="5.36"/>
    <circle className="devices-light-2" cx="20.55" cy="117.39" r="1.6"/>
    <rect className="devices-light-2" x="472.81" y="67.59" width="33.43" height="55.24" rx="4.97" ry="4.97"/>
    <circle className="devices-light-2" cx="489.52" cy="117.39" r="1.6"/>
    <path className="devices-light-2" d="m287.6,119.33v-54.98c0-.7.57-1.27,1.27-1.27h84.39c.7,0,1.27.57,1.27,1.27v54.98"/>
    <path className="devices-light-2" d="m282.06,118.9h98.02v1.11c0,1.53-1.25,2.78-2.78,2.78h-92.46c-1.53,0-2.78-1.25-2.78-2.78v-1.11h0Z"/>
    <path className="devices-light-2" d="m113.69,102s0,16.66-12.04,16.66v4.17s48.14,0,48.14,0v-4.17c-12.04,0-12.04-16.66-12.04-16.66"/>
    <rect className="devices-light-2" x="59.44" y="27.24" width="132.57" height="74.57"/>
    <polyline className="devices-light-3" points="215.23 7.3 20.87 7.3 20.87 63.01"/>
    <polygon className="devices-light-4" points="18.88 62.43 20.87 65.88 22.86 62.43 18.88 62.43"/>
    <polyline className="devices-light-3" points="490.51 62.85 490.51 7.3 285.42 7.3"/>
    <polygon className="devices-light-4" points="492.51 62.27 490.51 65.72 488.52 62.27 492.51 62.27"/>
    <text className="text" transform="translate(156.51 143.79)"><tspan x="0" y="0">DIRECT</tspan></text>
    <text className="text" transform="translate(221.14 11.61)"><tspan x="0" y="0">DIRECT</tspan></text>
    <text className="text" transform="translate(398.67 98.14)"><tspan x="0" y="0">RELAY</tspan></text>
    <line className="devices-light-3" x1="396.37" y1="92.97" x2="379.04" y2="92.97"/>
    <polygon className="devices-light-4" points="379.62 90.97 376.17 92.97 379.62 94.96 379.62 90.97"/>
    <line className="devices-light-3" x1="448.97" y1="92.97" x2="468.34" y2="92.97"/>
    <polygon className="devices-light-4" points="467.76 94.96 471.21 92.97 467.76 90.97 467.76 94.96"/>
    <text className="text" transform="translate(214.14 96.74)"><tspan x="0" y="0">DIRECT</tspan></text>
    <line className="devices-light-3" x1="197.3" y1="92.63" x2="212" y2="92.63"/>
    <polygon className="devices-light-4" points="197.88 94.62 194.43 92.63 197.88 90.63 197.88 94.62"/>
    <line className="devices-light-3" x1="283.29" y1="92.63" x2="268.59" y2="92.63"/>
    <polygon className="devices-light-4" points="282.71 90.63 286.16 92.63 282.71 94.62 282.71 90.63"/>
    <polyline className="devices-light-3" points="154.18 139.79 20.55 139.79 20.55 127.2"/>
    <polygon className="devices-light-4" points="22.55 127.78 20.55 124.33 18.56 127.78 22.55 127.78"/>
    <polyline className="devices-light-3" points="331.07 127.2 331.07 139.79 210.86 139.79"/>
    <polygon className="devices-light-4" points="329.08 127.78 331.07 124.33 333.06 127.78 329.08 127.78"/>
  </svg>
);