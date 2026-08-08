import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import createGlobe from 'cobe';

/* ============================================================
   WorkGlobe — GitHub-style dotted WebGL globe (cobe).
   Auto-rotates; when a country is selected it eases toward it
   and its marker grows. Colors match the BackinFront palette.
   ============================================================ */

export const GLOBE_COUNTRIES = {
  egypt: { flag: '🇪🇬', location: [30.04, 31.24] },   // Cairo
  ksa:   { flag: '🇸🇦', location: [24.71, 46.68] },   // Riyadh
  uae:   { flag: '🇦🇪', location: [25.2, 55.27] },    // Dubai
  usa:   { flag: '🇺🇸', location: [40.71, -74.01] },  // New York
};

const Stage = styled.div`
  position: relative;
  width: min(440px, 86vw);
  aspect-ratio: 1;
  margin: 0 auto;

  /* ambient glow behind the globe */
  &::before {
    content: '';
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(122, 92, 255, 0.35), rgba(0, 217, 255, 0.12) 55%, transparent 75%);
    filter: blur(30px);
    pointer-events: none;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
    cursor: grab;
  }
`;

/* convert lat/lng to cobe's [phi, theta] focus angles */
const locationToAngles = (lat, lng) => [
  Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
  (lat * Math.PI) / 180,
];

const WorkGlobe = ({ activeCountry = null }) => {
  const canvasRef = useRef(null);
  const activeRef = useRef(null);     // selected country id
  const focusRef = useRef(null);      // [phi, theta] target or null
  const dragRef = useRef({ down: false, startX: 0, startPhi: 0 });
  const phiRef = useRef(4.2);         // start roughly over the Middle East
  const thetaRef = useRef(0.32);

  /* keep selection + focus target in sync (no globe rebuild) */
  useEffect(() => {
    activeRef.current = activeCountry;
    const meta = GLOBE_COUNTRIES[activeCountry];
    focusRef.current = meta ? locationToAngles(...meta.location) : null;
  }, [activeCountry]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth || 440;
    const onResize = () => {
      width = canvas.offsetWidth || width;
    };
    window.addEventListener('resize', onResize);

    const countryIds = Object.keys(GLOBE_COUNTRIES);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.2,
      mapSamples: isMobile ? 10000 : 18000,
      mapBrightness: 5.2,
      baseColor: [0.32, 0.28, 0.52],     // violet dots
      markerColor: [0, 0.85, 1],          // cyan markers
      glowColor: [0.34, 0.26, 0.7],       // violet atmosphere
      opacity: 0.92,
      markers: countryIds.map((id) => ({
        location: GLOBE_COUNTRIES[id].location,
        size: 0.07,
      })),
      onRender: (state) => {
        // NOTE: only refs in here — never closure consts that may
        // not exist on the first synchronous frame.
        const focus = focusRef.current;
        const drag = dragRef.current;

        if (!drag.down) {
          if (focus) {
            // shortest-path ease toward the selected country
            const [fPhi, fTheta] = focus;
            const dPhi = ((fPhi - phiRef.current + Math.PI) % (Math.PI * 2)) - Math.PI;
            phiRef.current += dPhi * 0.08;
            thetaRef.current += (fTheta - thetaRef.current) * 0.08;
          } else {
            phiRef.current += 0.0045; // idle auto-rotation
            thetaRef.current += (0.32 - thetaRef.current) * 0.05;
          }
        }

        state.phi = phiRef.current;
        state.theta = thetaRef.current;
        state.width = width * 2;
        state.height = width * 2;

        // grow the marker of the selected country
        const active = activeRef.current;
        state.markers = countryIds.map((id) => ({
          location: GLOBE_COUNTRIES[id].location,
          size: id === active ? 0.13 : 0.07,
        }));
      },
    });

    /* drag to rotate */
    const getX = (e) => e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const onDown = (e) => {
      dragRef.current = { down: true, startX: getX(e), startPhi: phiRef.current };
      canvas.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d.down) return;
      phiRef.current = d.startPhi + (getX(e) - d.startX) / 120;
    };
    const onUp = () => {
      if (dragRef.current.down) {
        dragRef.current.down = false;
        canvas.style.cursor = 'grab';
      }
    };

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <Stage>
      <canvas ref={canvasRef} aria-label="Globe showing project locations" />
    </Stage>
  );
};

export default WorkGlobe;
