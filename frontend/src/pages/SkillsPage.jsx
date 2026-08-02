import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { fetchSkills } from '../utils/api';

/* ============================================================
   Skills — 3D redesign
   - "Tech Orbit": keywords orbiting on a real 3D ring
   - TiltCard skill cards with floating (translateZ) icons
   - Gradient progress bars that fill in view + CountUp %
   ============================================================ */

/* ---------------- layout ---------------- */
const SkillsSection = styled.section`
  padding: 7rem 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;

const SubTitle = styled.p`
  color: var(--text-secondary);
  max-width: 560px;
  margin: 0 auto;
  font-size: 1.05rem;
`;

/* ---------------- 3D tech orbit ---------------- */
const orbitSpin = keyframes`
  from { transform: rotateX(-12deg) rotateY(0deg); }
  to   { transform: rotateX(-12deg) rotateY(360deg); }
`;

const OrbitStage = styled.div`
  position: relative;
  height: 210px;
  margin: 2.5rem auto 3.5rem;
  perspective: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* soft glow floor under the ring */
  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: min(560px, 80vw);
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(122, 92, 255, 0.18), transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: 170px;
  }
`;

const OrbitRing = styled.div`
  position: relative;
  width: 1px;
  height: 1px;
  transform-style: preserve-3d;
  animation: ${orbitSpin} 26s linear infinite;

  ${OrbitStage}:hover & {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotateX(-12deg);
  }
`;

const OrbitItem = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(${(p) => p.$angle}deg) translateZ(${(p) => p.$radius}px);
  transform-style: preserve-3d;
  white-space: nowrap;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: 0 0 18px rgba(0, 217, 255, 0.10);
  backface-visibility: hidden;
  translate: -50% -50%;

  b {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 0.72rem;
    padding: 0.35rem 0.75rem;
  }
`;

const OrbitCore = styled.div`
  position: absolute;
  z-index: -1;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: var(--gradient-accent);
  filter: blur(34px);
  opacity: 0.55;
`;

/* ---------------- cards grid ---------------- */
const SkillsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 1.8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardInner = styled.div`
  padding: 1.8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.4rem;
  transform-style: preserve-3d;
`;

const SkillIcon = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 14px;
  background: var(--gradient-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glow-2);
  /* floats above the card surface in 3D */
  transform: translateZ(38px);

  svg {
    width: 26px;
    height: 26px;
    color: #fff;
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary);
  transform: translateZ(24px);
`;

const LevelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const LevelBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent-2);
  background: var(--gradient-accent-soft);
  border: 1px solid var(--border);
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
`;

const PercentText = styled.span`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 0.95rem;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const shimmer = keyframes`
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 1.4rem;
  border: 1px solid var(--border);
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  border-radius: 999px;
  background: var(--gradient-accent);
  box-shadow: var(--glow);
  position: relative;
  transform-origin: left center;

  /* light sweep */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.35) 50%, transparent 70%);
    background-size: 200% 100%;
    animation: ${shimmer} 2.4s ease-in-out infinite;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: auto;
`;

const SkillTag = styled(motion.span)`
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 0.32rem 0.8rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: default;
  transition: color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    color: var(--accent-2);
    border-color: var(--accent-2);
    box-shadow: 0 0 14px rgba(0, 217, 255, 0.18);
  }
`;

/* ---------------- states ---------------- */
const LoadingSpinner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;

  svg {
    width: 50px;
    height: 50px;
    color: var(--accent);
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  padding: 2rem;
`;

/* ---------------- anim variants ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 16 },
  },
};

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1, ease: 'linear' },
  },
};

/* ---------------- helpers ---------------- */
const getSkillIcon = (skillName) => {
  switch (skillName.toLowerCase()) {
    case 'frontend development':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'backend development':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'database':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case 'devops':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'mobile development':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

const getProgressPercentage = (level) => {
  switch (level.toLowerCase()) {
    case 'expert': return 95;
    case 'advanced': return 85;
    case 'intermediate': return 70;
    case 'beginner': return 50;
    default: return 75;
  }
};

/* CountUp that starts when scrolled into view */
const PercentCounter = ({ to }) => {
  const [display, setDisplay] = useState(0);
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      onViewportEnter={() => {
        animate(0, to, {
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (v) => setDisplay(Math.round(v)),
        });
      }}
    >
      <PercentText>{display}%</PercentText>
    </motion.span>
  );
};

/* ---------------- component ---------------- */
const SkillsPage = () => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSkills = async () => {
      try {
        setLoading(true);
        const data = await fetchSkills();
        setSkills(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        setError('Failed to load skills. Please try again later.');
        setLoading(false);
      }
    };

    getSkills();
  }, []);

  /* unique keywords for the 3D orbit ring */
  const orbitKeywords = useMemo(() => {
    const seen = new Set();
    const out = [];
    skills.forEach((s) =>
      (s.keywords || []).forEach((k) => {
        const key = k.toLowerCase();
        if (!seen.has(key) && out.length < 12) {
          seen.add(key);
          out.push(k);
        }
      })
    );
    return out.length ? out : ['React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Docker', 'CI/CD', 'WordPress', 'Vite', 'Tailwind'];
  }, [skills]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const orbitRadius = isMobile ? 130 : 240;

  if (loading) {
    return (
      <SkillsSection>
        <Header>
          <SectionTitle className="gradient-text">{t('skills.title')}</SectionTitle>
        </Header>
        <LoadingSpinner variants={spinnerVariants} animate="animate">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </LoadingSpinner>
      </SkillsSection>
    );
  }

  if (error) {
    return (
      <SkillsSection>
        <Header>
          <SectionTitle className="gradient-text">{t('skills.title')}</SectionTitle>
        </Header>
        <ErrorMessage>{error}</ErrorMessage>
      </SkillsSection>
    );
  }

  return (
    <SkillsSection>
      <Header>
        <Eyebrow>{t('skills.eyebrow', 'Tech Arsenal')}</Eyebrow>
        <SectionTitle className="gradient-text">{t('skills.title')}</SectionTitle>
        <SubTitle>{t('skills.subtitle', 'The tools I use to take products from the back of the stack to the front of the screen.')}</SubTitle>
      </Header>

      {/* ====== 3D orbiting tech ring ====== */}
      <OrbitStage aria-hidden>
        <OrbitCore />
        <OrbitRing>
          {orbitKeywords.map((kw, i) => (
            <OrbitItem
              key={kw}
              $angle={(360 / orbitKeywords.length) * i}
              $radius={orbitRadius}
            >
              <b>◆</b> {kw}
            </OrbitItem>
          ))}
        </OrbitRing>
      </OrbitStage>

      {/* ====== tilt cards ====== */}
      <SkillsContainer variants={containerVariants} initial="hidden" animate="visible">
        {skills.map((skill) => {
          const pct = getProgressPercentage(skill.level);
          return (
            <motion.div key={skill.name} variants={cardVariants} style={{ height: '100%' }}>
              <TiltCard maxTilt={9}>
                <CardInner>
                  <SkillHeader>
                    <SkillIcon>{getSkillIcon(skill.name)}</SkillIcon>
                    <SkillTitle>{skill.name}</SkillTitle>
                  </SkillHeader>

                  <LevelRow>
                    <LevelBadge>{skill.level}</LevelBadge>
                    <PercentCounter to={pct} />
                  </LevelRow>

                  <ProgressTrack>
                    <ProgressFill
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: pct / 100 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </ProgressTrack>

                  <SkillTags>
                    {skill.keywords.map((tag, i) => (
                      <SkillTag key={i} whileHover={{ scale: 1.08, y: -2 }}>
                        {tag}
                      </SkillTag>
                    ))}
                  </SkillTags>
                </CardInner>
              </TiltCard>
            </motion.div>
          );
        })}
      </SkillsContainer>
    </SkillsSection>
  );
};

export default SkillsPage;
