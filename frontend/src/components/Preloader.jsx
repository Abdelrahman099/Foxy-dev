import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from 'framer-motion';
import BrandLogo from './BrandLogo';

/* ============================================================
   ReactBits-style 3D Preloader — "Building the experience"
   - A real 3D rotating cube (CSS perspective) of dev glyphs
   - A live terminal that types the build sequence
   - Animated grid + gradient glow backdrop
   - Letter-by-letter wordmark + CountUp
   - 3D "warp" exit on completion
   ============================================================ */

/* ---------- keyframes ---------- */
const spin = keyframes`
  0%   { transform: rotateX(-24deg) rotateY(0deg); }
  100% { transform: rotateX(-24deg) rotateY(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-14px); }
`;

const gridMove = keyframes`
  from { background-position: 0 0, 0 0; }
  to   { background-position: 44px 44px, 44px 44px; }
`;

const blink = keyframes`
  0%, 49%  { opacity: 1; }
  50%, 100%{ opacity: 0; }
`;

const drift = keyframes`
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-140px) scale(0.4); opacity: 0; }
`;

/* ---------- layout ---------- */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  background-color: var(--bg-primary);
  overflow: hidden;
  perspective: 1200px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(45rem 45rem at 18% 8%, rgba(122, 92, 255, 0.18), transparent 60%),
      radial-gradient(42rem 42rem at 85% 92%, rgba(0, 217, 255, 0.14), transparent 60%);
  }
`;

/* moving perspective grid on the floor */
const Grid = styled.div`
  position: absolute;
  inset: -20% 0 -20% 0;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    linear-gradient(rgba(0, 217, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
  animation: ${gridMove} 3s linear infinite;
  -webkit-mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);
  mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);
`;

const Particles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  span {
    position: absolute;
    bottom: 30%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent-2);
    box-shadow: 0 0 10px var(--accent-2);
    animation: ${drift} 4s linear infinite;
  }
`;

/* ---------- 3D cube ---------- */
const Stage = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  z-index: 1;
  animation: ${float} 3.5s ease-in-out infinite;
`;

const Cube = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: ${spin} 7s linear infinite;
`;

const Face = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.2rem;
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(122, 92, 255, 0.55) 0%, rgba(0, 217, 255, 0.45) 100%);
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.12),
    0 0 24px rgba(0, 217, 255, 0.30);
  backdrop-filter: blur(2px);
  transform: ${(p) => p.$t};
`;

/* ---------- terminal ---------- */
const Terminal = styled.div`
  position: relative;
  z-index: 1;
  width: clamp(280px, 78vw, 460px);
  border-radius: 14px;
  background: rgba(10, 10, 18, 0.72);
  border: 1px solid var(--border);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  backdrop-filter: blur(8px);
  font-family: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
`;

const TerminalBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid var(--border);

  b {
    margin-left: 8px;
    font-weight: 500;
    font-size: 0.72rem;
    letter-spacing: 0.02em;
    color: #8b8fa3;
  }
`;

const Dot = styled.span`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${(p) => p.$c};
`;

const TerminalBody = styled.div`
  padding: 14px 16px;
  min-height: 118px;
  font-size: 0.82rem;
  line-height: 1.75;
`;

const Line = styled.div`
  color: #d4d7e2;
  white-space: pre-wrap;
  word-break: break-word;

  .p { color: #00d9ff; }        /* prompt */
  .k { color: #7a5cff; }        /* keyword */
  .ok { color: #4ade80; }       /* success */
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1em;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--accent);
  animation: ${blink} 1s step-end infinite;
`;

/* ---------- wordmark + meta ---------- */
const Wordmark = styled.div`
  display: flex;
  align-items: baseline;
  z-index: 1;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  letter-spacing: -0.02em;
  user-select: none;
`;

const Letter = styled(motion.span)`
  display: inline-block;
  color: var(--text-primary);
  &[data-accent='true'] {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  z-index: 1;
`;

const Track = styled.div`
  position: relative;
  width: clamp(160px, 36vw, 280px);
  height: 3px;
  border-radius: 999px;
  background: var(--border);
  overflow: hidden;
`;

const Bar = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-origin: left center;
  border-radius: 999px;
  background: var(--gradient-accent);
  box-shadow: var(--glow);
`;

const Percent = styled(motion.span)`
  min-width: 3.6ch;
  text-align: right;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

/* ---------- CountUp (ReactBits style) ---------- */
const CountUp = ({ to = 100, duration = 2.6 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}%`);
  useEffect(() => {
    const controls = animate(count, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [count, to, duration]);
  return <Percent>{rounded}</Percent>;
};

/* ---------- terminal typing engine ---------- */
const SCRIPT = [
  { p: '$', text: ' npx create backinfront-experience', k: [] },
  { text: '  ✓ booting the backend', ok: true },
  { text: '  ✓ crafting the frontend', ok: true },
  { text: '  ✓ optimizing 3D assets', ok: true },
  { text: '  ▲ moving you to the front…', ok: false },
];

const Typewriter = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [current, setCurrent] = useState('');
  const idx = useRef(0);
  const char = useRef(0);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const speed = 26; // ms per char

    const tick = (now) => {
      if (idx.current >= SCRIPT.length) {
        onComplete?.();
        return;
      }
      if (now - last >= speed) {
        last = now;
        const line = SCRIPT[idx.current];
        if (char.current < line.text.length) {
          char.current += 1;
          setCurrent(line.text.slice(0, char.current));
        } else {
          setLines((prev) => [...prev, line]);
          setCurrent('');
          char.current = 0;
          idx.current += 1;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const renderLine = (line, key, live = false) => (
    <Line key={key}>
      {line.p && <span className="p">{line.p}</span>}
      <span className={line.ok ? 'ok' : ''}>{live ? current : line.text}</span>
      {live && <Cursor />}
    </Line>
  );

  const liveLine = idx.current < SCRIPT.length ? SCRIPT[idx.current] : null;

  return (
    <TerminalBody>
      {lines.map((l, i) => renderLine(l, i))}
      {liveLine && renderLine(liveLine, 'live', true)}
    </TerminalBody>
  );
};

/* ---------- main ---------- */
const Preloader = ({ minDuration = 2.6, onDone }) => {
  const [visible, setVisible] = useState(true);
  const word = 'BackinFront';
  const letters = useMemo(() => word.split(''), [word]);
  const startedAt = useRef(performance.now());

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = () => {
    const elapsed = (performance.now() - startedAt.current) / 1000;
    const wait = Math.max(0, minDuration - elapsed) * 1000 + 500;
    setTimeout(() => setVisible(false), wait);
  };

  const handleExit = () => {
    document.body.style.overflow = '';
    onDone?.();
  };

  const logo = <BrandLogo size={58} />;
  const faces = [logo, '</>', '{ }', logo, '( )', '▲'];
  const faceT = [
    'rotateY(0deg) translateZ(65px)',
    'rotateY(90deg) translateZ(65px)',
    'rotateY(180deg) translateZ(65px)',
    'rotateY(-90deg) translateZ(65px)',
    'rotateX(90deg) translateZ(65px)',
    'rotateX(-90deg) translateZ(65px)',
  ];

  return createPortal(
    <AnimatePresence onExitComplete={handleExit}>
      {visible && (
        <Overlay
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.35,
            rotateX: 12,
            filter: 'blur(6px)',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <Grid />
          <Particles>
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${12 + i * 12}%`,
                  animationDelay: `${i * 0.6}s`,
                  background: i % 2 ? 'var(--accent)' : 'var(--accent-2)',
                }}
              />
            ))}
          </Particles>

          <Stage>
            <Cube>
              {faces.map((g, i) => (
                <Face key={i} $t={faceT[i]}>
                  {g}
                </Face>
              ))}
            </Cube>
          </Stage>

          <Terminal>
            <TerminalBar>
              <Dot $c="#ff5f57" />
              <Dot $c="#febc2e" />
              <Dot $c="#28c840" />
              <b>backinfront — build</b>
            </TerminalBar>
            <Typewriter onComplete={finish} />
          </Terminal>

          <Wordmark aria-label={word}>
            {letters.map((c, i) => (
              <Letter
                key={`${c}-${i}`}
                data-accent={i >= 6}
                aria-hidden
                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {c}
              </Letter>
            ))}
          </Wordmark>

          <Meta>
            <Track>
              <Bar
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: minDuration, ease: [0.22, 1, 0.36, 1] }}
              />
            </Track>
            <CountUp to={100} duration={minDuration} />
          </Meta>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Preloader;
