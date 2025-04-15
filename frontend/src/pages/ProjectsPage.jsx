import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HaloCard from '../components/HaloCard';
import { fetchProjects } from '../utils/api';

const ProjectsSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: var(--accent);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(HaloCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProjectImage = styled.div`
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span`
  background-color: var(--bg-secondary);
  color: var(--accent);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent);
  font-weight: 500;
  transition: color var(--transition-speed) ease;
  
  &:hover {
    color: var(--accent-hover);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear"
    }
  }
};

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return (
      <ProjectsSection>
        <SectionTitle>{t('projects.title')}</SectionTitle>
        <LoadingSpinner
          variants={spinnerVariants}
          animate="animate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </LoadingSpinner>
      </ProjectsSection>
    );
  }

  if (error) {
    return (
      <ProjectsSection>
        <SectionTitle>{t('projects.title')}</SectionTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </ProjectsSection>
    );
  }

  return (
    <ProjectsSection>
      <SectionTitle>{t('projects.title')}</SectionTitle>
      <ProjectsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.name} delay={index * 0.1}>
            <ProjectImage>
              <img src={project.image || `https://source.unsplash.com/random/600x400?${project.name.replace(/\s+/g, ',')}`} alt={project.name} />
            </ProjectImage>
            <ProjectTitle>{project.name}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectTags>
              {project.highlights.map((tag, i) => (
                <ProjectTag key={i}>{tag}</ProjectTag>
              ))}
            </ProjectTags>
            <ProjectLinks>
              <ProjectLink 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t('projects.viewProject')}
              </ProjectLink>
              <ProjectLink 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {t('projects.viewCode')}
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default ProjectsPage;
