import React from 'react';

/* ============================================================
   BackinFront — Brand Mark
   Three isometric layers: the deep violet layer is the "Back",
   the glowing cyan layer is the "Front". The stack reads
   bottom→top exactly like a request travels backend→frontend.
   ============================================================ */

const BrandLogo = ({ size = 30, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="BackinFront logo"
    {...props}
  >
    <defs>
      <linearGradient id="bf-front" x1="8" y1="8" x2="56" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7a5cff" />
        <stop offset="1" stopColor="#00d9ff" />
      </linearGradient>
      <linearGradient id="bf-mid" x1="8" y1="20" x2="56" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7a5cff" stopOpacity="0.75" />
        <stop offset="1" stopColor="#00d9ff" stopOpacity="0.55" />
      </linearGradient>
      <filter id="bf-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Back layer — the backend, deep violet */}
    <path d="M32 34 L56 46 L32 58 L8 46 Z" fill="#7a5cff" opacity="0.38" />

    {/* Middle layer — the bridge */}
    <path d="M32 21 L56 33 L32 45 L8 33 Z" fill="url(#bf-mid)" opacity="0.8" />

    {/* Front layer — the frontend, glowing cyan edge */}
    <path
      d="M32 8 L56 20 L32 32 L8 20 Z"
      fill="url(#bf-front)"
      filter="url(#bf-glow)"
    />

    {/* Highlight edge on the front layer */}
    <path
      d="M32 8 L56 20 L32 32 L8 20 Z"
      fill="none"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth="1.2"
    />
  </svg>
);

export default BrandLogo;
