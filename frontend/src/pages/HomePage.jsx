import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HaloButton from '../components/HaloButton';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import services from '../data/services';
import projects from '../data/projects';
import ContactPage from './ContactPage';

/* ═══════════════════════ HERO ═══════════════════════ */

const MotionLink = motion.create(Link);

const HeroSection = styled.section`
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 3rem;
  }
`;

const HeroCopy = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  z-index: 2;

  @media (max-width: 968px) {
    align-items: center;
  }
`;

const Eyebrow = styled(motion.p)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--gradient-accent-soft);
  width: fit-content;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
`;

const HeroSub = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.15rem;
  line-height: 1.9;
  max-width: 540px;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const GhostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-weight: 600;
  transition: all var(--transition-speed) ease;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: var(--glow);
  }
`;

/* ─── 3D hero scene: floating browser + orbiting tech chips ─── */

const chipFloat = keyframes`
  0%, 100% { transform: translateZ(var(--z)) translateY(0); }
  50%      { transform: translateZ(var(--z)) translateY(-12px); }
`;

const Scene = styled.div`
  perspective: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 460px;

  @media (max-width: 968px) {
    min-height: 380px;
  }
`;

const SceneInner = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
  width: min(480px, 88vw);
`;

const BrowserCard = styled.div`
  transform-style: preserve-3d;
  border-radius: 16px;
  background: rgba(12, 16, 31, 0.85);
  border: 1px solid var(--border);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.55), var(--glow-2);
  overflow: hidden;
  backdrop-filter: blur(6px);

  [data-theme='light'] & {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const BrowserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);

  span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }

  i {
    font-style: normal;
    margin-inline-start: 10px;
    font-size: 0.72rem;
    color: var(--text-secondary);
    font-family: ui-monospace, Menlo, Consolas, monospace;
    direction: ltr;
  }
`;

const CodeArea = styled.div`
  padding: 1.2rem 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  direction: ltr;
`;

const CodeLine = styled(motion.div)`
  display: flex;
  gap: 0.6rem;
  align-items: center;

  b {
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 0.72rem;
    color: var(--text-secondary);
    width: 14px;
    font-weight: 400;
  }

  span {
    height: 10px;
    border-radius: 5px;
  }
`;

const Chip = styled.div`
  position: absolute;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: ${(p) => (p.$v ? 'var(--glow-2)' : 'var(--glow)')};
  animation: ${chipFloat} ${(p) => p.$dur || 4}s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || 0}s;
  white-space: nowrap;
  direction: ltr;
`;

/* ═══════════════════ STATS ═══════════════════ */

const StatsBar = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled(motion.div)`
  text-align: center;
  padding: 1.5rem 1rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--card-bg);

  h3 {
    font-size: 2rem;
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-top: 0.35rem;
  }
`;

/* ═══════════════════ SERVICES STRIP ═══════════════════ */

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const SectionHead = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  p.eyebrow {
    color: var(--accent);
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 0.82rem;
    margin-bottom: 0.8rem;
  }

  h2 {
    font-size: clamp(1.9rem, 4vw, 2.6rem);
  }

  p.sub {
    color: var(--text-secondary);
    max-width: 560px;
    margin: 1rem auto 0;
    line-height: 1.8;
  }
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.4rem;
`;

const ServiceCardInner = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.6rem;
  height: 100%;
  color: inherit;
  transform-style: preserve-3d;

  h3 {
    font-size: 1.15rem;
    color: var(--text-primary);
    transform: translateZ(26px);
  }

  p {
    color: var(--text-secondary);
    font-size: 0.92rem;
    line-height: 1.7;
    flex: 1;
  }

  span.more {
    color: var(--accent);
    font-weight: 600;
    font-size: 0.88rem;
  }
`;

const MiniIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(34px);
  background: ${(p) =>
    p.$v
      ? 'linear-gradient(135deg, rgba(122,92,255,0.22), rgba(122,92,255,0.07))'
      : 'linear-gradient(135deg, rgba(0,217,255,0.20), rgba(0,217,255,0.05))'};
  border: 1px solid ${(p) => (p.$v ? 'rgba(122,92,255,0.35)' : 'rgba(0,217,255,0.30)')};

  svg {
    width: 22px;
    height: 22px;
    color: ${(p) => (p.$v ? 'var(--accent-2)' : 'var(--accent)')};
  }
`;

/* ═══════════════════ PROCESS ═══════════════════ */

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4rem;
  position: relative;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled(motion.div)`
  padding: 1.8rem 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  position: relative;
  overflow: hidden;

  &::before {
    content: '${(p) => p.$n}';
    position: absolute;
    top: -12px;
    inset-inline-end: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 4.6rem;
    font-weight: 700;
    opacity: 0.07;
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.35;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

/* ═══════════════════ FEATURED WORK ═══════════════════ */

const WorkGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const WorkCardBody = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;

  .thumb {
    height: 180px;
    background: var(--gradient-accent-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &:hover .thumb img {
    transform: scale(1.06);
  }

  .body {
    padding: 1.3rem 1.4rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;

    h3 {
      font-size: 1.15rem;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.7;
      flex: 1;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;

    span {
      font-size: 0.72rem;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      border: 1px solid var(--border);
      color: var(--text-secondary);
    }
  }
`;

/* ═══════════════════ CTA BANNER ═══════════════════ */

const CtaBanner = styled(motion.div)`
  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 3.5rem 2.5rem;
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  background:
    radial-gradient(30rem 20rem at 20% 0%, rgba(122, 92, 255, 0.18), transparent 60%),
    radial-gradient(30rem 20rem at 85% 100%, rgba(0, 217, 255, 0.15), transparent 60%),
    var(--card-bg);

  h2 {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    max-width: 540px;
    margin: 0 auto 2rem;
    line-height: 1.8;
  }
`;

/* ─── variants ─── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } },
};

const MINI_ICONS = {
  website: 'M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  deployment: 'M5 12h14M12 5l7 7-7 7',
  crm: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z',
  lms: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  erp: 'M9 17v-6h6v6m-9 4h12a2 2 0 002-2V7l-7-5-7 5v12a2 2 0 002 2z',
  automation: 'M13 10V3L4 14h7v7l9-11h-7z',
  vps: 'M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
};

/* ─── 3D hero scene component ─── */
const HeroScene = () => {
  const ref = useRef(null);
  const rx = useMotionValue(-8);
  const ry = useMotionValue(14);
  const srx = useSpring(rx, { stiffness: 60, damping: 14 });
  const sry = useSpring(ry, { stiffness: 60, damping: 14 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set(6 + (px - 0.5) * 22);
    rx.set(-2 + (0.5 - py) * 18);
  };

  const onLeave = () => {
    rx.set(-8);
    ry.set(14);
  };

  const lines = [
    ['48%', 'var(--accent-2)'],
    ['72%', 'var(--accent)'],
    ['60%', 'var(--text-secondary)'],
    ['82%', 'var(--accent-2)'],
    ['38%', 'var(--accent)'],
    ['66%', 'var(--text-secondary)'],
  ];

  return (
    <Scene ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <SceneInner style={{ rotateX, rotateY }}>
        <BrowserCard>
          <BrowserBar>
            <span style={{ background: '#ff5f57' }} />
            <span style={{ background: '#febc2e' }} />
            <span style={{ background: '#28c840' }} />
            <i>backinfront.dev — building…</i>
          </BrowserBar>
          <CodeArea>
            {lines.map(([w, c], i) => (
              <CodeLine
                key={i}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.14 }}
              >
                <b>{i + 1}</b>
                <span style={{ width: w, background: c, opacity: 0.75 }} />
              </CodeLine>
            ))}
          </CodeArea>
        </BrowserCard>

        <Chip style={{ '--z': '90px', top: '-8%', insetInlineStart: '-6%' }} $dur={4.5}>⚛ React</Chip>
        <Chip style={{ '--z': '120px', top: '18%', insetInlineEnd: '-10%' }} $v $dur={5} $delay={0.6}>🖥 CRM</Chip>
        <Chip style={{ '--z': '70px', bottom: '22%', insetInlineStart: '-12%' }} $v $dur={4.2} $delay={1.1}>⚙ ERP</Chip>
        <Chip style={{ '--z': '110px', bottom: '-6%', insetInlineEnd: '4%' }} $dur={5.4} $delay={0.3}>🚀 Deploy</Chip>
        <Chip style={{ '--z': '95px', top: '52%', insetInlineEnd: '-16%' }} $dur={4.8} $delay={1.5}>🎓 LMS</Chip>
      </SceneInner>
    </Scene>
  );
};

/* ═══════════════════ PAGE ═══════════════════ */

const HomePage = () => {
  const { t } = useTranslation();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const featuredList = featured.length ? featured : projects.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <HeroSection>
        <HeroCopy variants={stagger} initial="hidden" animate="visible">
          <Eyebrow variants={rise}>{t('home.eyebrow')}</Eyebrow>
          <HeroTitle variants={rise}>
            {t('home.titleA')}{' '}
            <span className="gradient-text">{t('home.titleB')}</span>
          </HeroTitle>
          <HeroSub variants={rise}>{t('home.subtitle')}</HeroSub>
          <HeroButtons variants={rise}>
            <HaloButton as={MotionLink} to="/services">
              {t('home.ctaServices')}
            </HaloButton>
            <GhostButton to="/contact">{t('home.ctaQuote')} →</GhostButton>
          </HeroButtons>
        </HeroCopy>
        <HeroScene />
      </HeroSection>

      {/* STATS */}
      <StatsBar>
        {[
          [t('home.stats.projects'), '20+'],
          [t('home.stats.years'), '4+'],
          [t('home.stats.systems'), '7'],
          [t('home.stats.support'), '24/7'],
        ].map(([label, value], i) => (
          <Stat
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <h3>{value}</h3>
            <p>{label}</p>
          </Stat>
        ))}
      </StatsBar>

      {/* SERVICES STRIP */}
      <Section id="services">
        <SectionHead>
          <p className="eyebrow">{t('home.services.eyebrow')}</p>
          <h2>{t('home.services.title')}</h2>
          <p className="sub">{t('home.services.sub')}</p>
        </SectionHead>
        <ServicesGrid variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
          {services.map((s) => {
            return (
              <motion.div key={s.id} variants={rise}>
                <TiltCard maxTilt={7}>
                  <ServiceCardInner to={`/services#${s.id}`}>
                    <MiniIcon $v={s.accent === 'violet'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={MINI_ICONS[s.id]} />
                      </svg>
                    </MiniIcon>
                    <ServiceText service={s} />
                    <span className="more">{t('home.services.more')} →</span>
                  </ServiceCardInner>
                </TiltCard>
              </motion.div>
            );
          })}
        </ServicesGrid>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHead>
          <p className="eyebrow">{t('home.process.eyebrow')}</p>
          <h2>{t('home.process.title')}</h2>
        </SectionHead>
        <ProcessGrid>
          {[1, 2, 3, 4].map((n, i) => (
            <ProcessStep
              key={n}
              $n={`0${n}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3>{t(`home.process.s${n}.title`)}</h3>
              <p>{t(`home.process.s${n}.text`)}</p>
            </ProcessStep>
          ))}
        </ProcessGrid>
      </Section>

      {/* FEATURED WORK */}
      <Section>
        <SectionHead>
          <p className="eyebrow">{t('home.work.eyebrow')}</p>
          <h2>{t('home.work.title')}</h2>
        </SectionHead>
        <WorkGrid variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
          {featuredList.map((p) => (
            <motion.div key={p.name} variants={rise}>
              <TiltCard maxTilt={6}>
                <WorkCardBody href={p.url || undefined} target={p.url ? '_blank' : undefined} rel="noopener noreferrer">
                  <div className="thumb">
                    {p.image && <img src={p.image} alt={p.name} loading="lazy" />}
                  </div>
                  <div className="body">
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <div className="tags">
                      {p.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </WorkCardBody>
              </TiltCard>
            </motion.div>
          ))}
        </WorkGrid>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <GhostButton to="/projects">{t('home.work.all')} →</GhostButton>
        </div>
      </Section>

      {/* CTA BANNER */}
      <Section>
        <CtaBanner
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>
            {t('home.cta.titleA')} <span className="gradient-text">{t('home.cta.titleB')}</span>
          </h2>
          <p>{t('home.cta.text')}</p>
          <HaloButton as={MotionLink} to="/contact">
            {t('home.cta.button')}
          </HaloButton>
        </CtaBanner>
      </Section>

      {/* CONTACT */}
      <ContactPage />
    </div>
  );
};

/* Renders the service title/desc in the active language */
const ServiceText = ({ service }) => {
  const { i18n } = useTranslation();
  const c = i18n.language?.startsWith('ar') ? service.ar : service.en;
  return (
    <>
      <h3>{c.title}</h3>
      <p>{c.tagline}</p>
    </>
  );
};

export default HomePage;
