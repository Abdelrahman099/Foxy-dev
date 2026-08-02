import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ============================================================
   TiltCard — ReactBits-style 3D tilt on mouse move.
   The card rotates in real 3D space following the cursor,
   children can float above the surface via translateZ.
   ============================================================ */

const Wrapper = styled(motion.div)`
  perspective: 900px;
  height: 100%;
`;

const Card = styled(motion.div)`
  position: relative;
  height: 100%;
  border-radius: 18px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  transform-style: preserve-3d;
  will-change: transform;
  overflow: hidden;

  /* glare that follows the light */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      600px circle at var(--mx, 50%) var(--my, 50%),
      rgba(255, 255, 255, 0.06),
      transparent 45%
    );
  }
`;

const TiltCard = ({ children, maxTilt = 10, className, style, ...rest }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const py = (e.clientY - rect.top) / rect.height;   // 0 → 1
    ry.set((px - 0.5) * maxTilt * 2);
    rx.set((0.5 - py) * maxTilt * 2);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Wrapper className={className} style={style} {...rest}>
      <Card
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
      >
        {children}
      </Card>
    </Wrapper>
  );
};

export default TiltCard;
