import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import HaloButton from '../components/HaloButton';
import services from '../data/services';

/* ─── service icons (stroke svg paths keyed by id) ─── */
const ICONS = {
  website: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  deployment: 'M5 12h14M12 5l7 7-7 7',
  crm: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3',
  lms: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  erp: 'M9 17v-6h6v6m-9 4h12a2 2 0 002-2V7l-7-5-7 5v12a2 2 0 002 2z',
  automation: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  vps: 'M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6',
};

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
`;

const Hero = styled.div`
  text-align: center;
  padding: 3rem 0 4rem;
`;

const Eyebrow = styled(motion.p)`
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  margin-bottom: 1.25rem;
`;

const Sub = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.15rem;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.8;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
`;

const CardInner = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  transform-style: preserve-3d;
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) =>
    p.$accent === 'violet'
      ? 'linear-gradient(135deg, rgba(122,92,255,0.22), rgba(122,92,255,0.08))'
      : 'linear-gradient(135deg, rgba(0,217,255,0.20), rgba(0,217,255,0.06))'};
  border: 1px solid ${(p) => (p.$accent === 'violet' ? 'rgba(122,92,255,0.35)' : 'rgba(0,217,255,0.30)')};
  box-shadow: ${(p) => (p.$accent === 'violet' ? 'var(--glow-2)' : 'var(--glow)')};
  transform: translateZ(40px);

  svg {
    width: 28px;
    height: 28px;
    color: ${(p) => (p.$accent === 'violet' ? 'var(--accent-2)' : 'var(--accent)')};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  transform: translateZ(30px);
`;

const Tagline = styled.p`
  color: ${(p) => (p.$accent === 'violet' ? 'var(--accent-2)' : 'var(--accent)')};
  font-weight: 600;
  font-size: 0.95rem;
  transform: translateZ(24px);
`;

const Desc = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.98rem;
  flex: 1;
`;

const Points = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-primary);
    font-size: 0.92rem;

    &::before {
      content: '';
      flex-shrink: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--gradient-accent);
      box-shadow: 0 0 8px rgba(0, 217, 255, 0.6);
    }
  }
`;

const CtaWrap = styled.div`
  text-align: center;
  margin-top: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  h2 {
    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  }
  p {
    color: var(--text-secondary);
    max-width: 520px;
    line-height: 1.8;
  }
`;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } },
};

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');

  return (
    <Page>
      <Hero>
        <Eyebrow initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {t('services2.eyebrow')}
        </Eyebrow>
        <Title initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          {t('services2.title')} <span className="gradient-text">{t('services2.titleAccent')}</span>
        </Title>
        <Sub initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          {t('services2.subtitle')}
        </Sub>
      </Hero>

      <motion.div variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
        <Grid>
          {services.map((s) => {
            const c = isAr ? s.ar : s.en;
            return (
              <motion.div key={s.id} variants={cardVariants} id={s.id}>
                <TiltCard maxTilt={8}>
                  <CardInner>
                    <IconWrap $accent={s.accent}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={ICONS[s.id]} />
                      </svg>
                    </IconWrap>
                    <CardTitle>{c.title}</CardTitle>
                    <Tagline $accent={s.accent}>{c.tagline}</Tagline>
                    <Desc>{c.description}</Desc>
                    <Points>
                      {c.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </Points>
                  </CardInner>
                </TiltCard>
              </motion.div>
            );
          })}
        </Grid>
      </motion.div>

      <CtaWrap>
        <h2>{t('services2.ctaTitle')}</h2>
        <p>{t('services2.ctaText')}</p>
        <HaloButton as={Link} to="/contact">
          {t('services2.ctaButton')}
        </HaloButton>
      </CtaWrap>
    </Page>
  );
};

export default ServicesPage;
