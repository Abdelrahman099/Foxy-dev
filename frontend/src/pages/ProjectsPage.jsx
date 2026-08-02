import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { projects as projectsData } from '../data/projects';
import { getImageUrl } from '../utils/api';
import TiltCard from '../components/TiltCard';
import WorkGlobe, { GLOBE_COUNTRIES } from '../components/WorkGlobe';

/* ============================ Layout ============================ */
const ProjectsSection = styled.section`
  padding: 7rem 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

/* ============================ Globe ============================ */
const GlobeSection = styled.div`
  margin: 1.5rem 0 0.5rem;
`;

const CountryChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 1.6rem;
`;

const CountryChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'var(--gradient-accent)' : 'var(--card-bg)')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text-secondary)')};
  padding: 0.5rem 1.15rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: ${({ $active }) => ($active ? 'var(--glow-2)' : 'none')};

  .flag {
    font-size: 1.05rem;
    line-height: 1;
  }

  .count {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.22)' : 'var(--bg-secondary)')};
    color: ${({ $active }) => ($active ? '#fff' : 'var(--accent-2)')};
  }

  &:hover {
    transform: translateY(-2px);
    color: ${({ $active }) => ($active ? '#fff' : 'var(--accent)')};
    border-color: ${({ $active }) => ($active ? 'transparent' : 'var(--accent)')};
  }
`;

/* ============================ Filters ============================ */
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin: 2.5rem 0 3rem;
`;

const FilterChip = styled.button`
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'var(--gradient-accent)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text-secondary)')};
  padding: 0.45rem 1.1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.25s ease;

  &:hover {
    color: ${({ $active }) => ($active ? '#fff' : 'var(--accent)')};
    border-color: ${({ $active }) => ($active ? 'transparent' : 'var(--accent)')};
    transform: translateY(-2px);
  }
`;

/* ============================ Grid & Card ============================ */
const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* inner content of each 3D tilt card — children float at
   different depths (translateZ) above the card surface */
const CardInner = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  transform-style: preserve-3d;
`;

const Media = styled.div`
  position: relative;
  height: 190px;
  overflow: hidden;
  background: var(--gradient-accent-soft);
  transform-style: preserve-3d;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${CardInner}:hover & img {
    transform: scale(1.07);
  }

  /* fallback glyph when no image */
  &::after {
    content: '</>';
    font-family: 'Space Grotesk', monospace;
    font-weight: 700;
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: absolute;
    inset: 0;
    display: ${({ $hasImage }) => ($hasImage ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    opacity: 0.5;
  }
`;

const IndexBadge = styled.span`
  position: absolute;
  transform: translateZ(34px);
  top: 12px;
  left: 12px;
  z-index: 2;
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  background: rgba(10, 10, 18, 0.55);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
`;

const YearBadge = styled.span`
  position: absolute;
  transform: translateZ(34px);
  top: 12px;
  right: 12px;
  z-index: 2;
  font-size: 0.7rem;
  font-weight: 600;
  color: #fff;
  background: rgba(10, 10, 18, 0.55);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
`;

const FeaturedRibbon = styled.span`
  position: absolute;
  transform: translateZ(40px);
  bottom: 12px;
  left: 12px;
  z-index: 2;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
  background: var(--gradient-accent);
  padding: 0.28rem 0.7rem;
  border-radius: 8px;
  box-shadow: var(--glow);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.4rem 1.4rem 1.6rem;
  transform-style: preserve-3d;
`;

const ProjectTitle = styled.h3`
  font-size: 1.35rem;
  transform: translateZ(22px);
  margin-bottom: 0.6rem;
  color: var(--text-primary);
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  flex-grow: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.3rem;
`;

const Tag = styled.span`
  background: var(--bg-secondary);
  color: var(--accent-2);
  padding: 0.22rem 0.65rem;
  border-radius: 50px;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1px solid var(--border);
`;

const Links = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const PrimaryLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  justify-content: center;
  background: var(--gradient-accent);
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;

  &:hover { color: #fff; }
  svg { width: 16px; height: 16px; }
`;

const GhostLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  transition: border-color 0.25s ease, color 0.25s ease;

  &:hover { color: var(--accent); border-color: var(--accent); }
  svg { width: 16px; height: 16px; }
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--text-secondary);
  padding: 3rem;
`;

/* ============================ Icons ============================ */
const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

/* ============================ Component ============================ */
const ProjectsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCountry, setActiveCountry] = useState(null);

  const countryCounts = useMemo(() => {
    const counts = {};
    projectsData.forEach((p) => {
      if (p.country) counts[p.country] = (counts[p.country] || 0) + 1;
    });
    return counts;
  }, []);

  // featured projects float to the top
  const sorted = useMemo(
    () => [...projectsData].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)),
    []
  );

  // collect tags for the filter bar, ranked by how often they appear
  const allTags = useMemo(() => {
    const counts = {};
    projectsData.forEach((p) => (p.tags || []).forEach((tag) => (counts[tag] = (counts[tag] || 0) + 1)));
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, 10);
  }, []);

  const visible = useMemo(() => {
    let list = activeFilter === 'all'
      ? sorted
      : sorted.filter((p) => (p.tags || []).includes(activeFilter));
    if (activeCountry) list = list.filter((p) => p.country === activeCountry);
    return list;
  }, [activeFilter, activeCountry, sorted]);

  return (
    <ProjectsSection>
      <Header>
        <Eyebrow>{t('projects.eyebrow', 'Selected Work')}</Eyebrow>
        <SectionTitle className="gradient-text">{t('projects.title')}</SectionTitle>
        <SubTitle>{t('projects.subtitle', 'A collection of things I have designed, built and shipped.')}</SubTitle>
      </Header>

      {/* ====== 3D globe — projects around the world ====== */}
      <GlobeSection>
        <WorkGlobe activeCountry={activeCountry} />
        <CountryChips>
          <CountryChip $active={!activeCountry} onClick={() => setActiveCountry(null)}>
            🌍 {t('projects.all', 'All')}
          </CountryChip>
          {Object.entries(GLOBE_COUNTRIES).map(([id, meta]) => (
            <CountryChip
              key={id}
              $active={activeCountry === id}
              onClick={() => setActiveCountry(activeCountry === id ? null : id)}
            >
              <span className="flag">{meta.flag}</span>
              {t(`projects.countries.${id}`, id.toUpperCase())}
              <span className="count">{countryCounts[id] || 0}</span>
            </CountryChip>
          ))}
        </CountryChips>
      </GlobeSection>

      <Filters>
        <FilterChip $active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
          {t('projects.all', 'All')}
        </FilterChip>
        {allTags.map((tag) => (
          <FilterChip key={tag} $active={activeFilter === tag} onClick={() => setActiveFilter(tag)}>
            {tag}
          </FilterChip>
        ))}
      </Filters>

      <ProjectsGrid layout>
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => {
            const imageUrl = getImageUrl(project.image);
            const hasLink = project.url && project.url !== '#';
            return (
              <TiltCard
                key={project.name}
                maxTilt={8}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(index * 0.06, 0.4) }}
              >
                <CardInner>
                <Media $hasImage={!!imageUrl}>
                  {imageUrl && <img src={imageUrl} alt={project.name} loading="lazy" />}
                  <IndexBadge>{String(index + 1).padStart(2, '0')}</IndexBadge>
                  {project.year && <YearBadge>{project.year}</YearBadge>}
                  {project.featured && <FeaturedRibbon>★ {t('projects.featured', 'Featured')}</FeaturedRibbon>}
                </Media>

                <Body>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <Tags>
                    {(project.tags || []).map((tag, i) => (
                      <Tag key={i}>{tag}</Tag>
                    ))}
                  </Tags>
                  <Links>
                    {hasLink && (
                      <PrimaryLink href={project.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <ExternalIcon />
                        {t('projects.viewProject')}
                      </PrimaryLink>
                    )}
                    {project.github && (
                      <GhostLink href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <GithubIcon />
                        {t('projects.viewCode')}
                      </GhostLink>
                    )}
                  </Links>
                </Body>
                </CardInner>
              </TiltCard>
            );
          })}
        </AnimatePresence>
      </ProjectsGrid>

      {visible.length === 0 && <EmptyState>{t('projects.empty', 'No projects match this filter yet.')}</EmptyState>}
    </ProjectsSection>
  );
};

export default ProjectsPage;
