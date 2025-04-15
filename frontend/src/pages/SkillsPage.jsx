import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HaloCard from '../components/HaloCard';
import { fetchSkills } from '../utils/api';

const SkillsSection = styled.section`
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

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(HaloCard)`
  padding: 2rem;
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
`;

const SkillLevel = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: var(--accent);
    border-radius: 4px;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled(motion.span)`
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
  
  &:hover {
    background-color: var(--accent);
    color: white;
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

const tagVariants = {
  hover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 10 }
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

// Map skill names to icons
const getSkillIcon = (skillName) => {
  switch(skillName.toLowerCase()) {
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

// Map skill level to progress percentage
const getProgressPercentage = (level) => {
  switch(level.toLowerCase()) {
    case 'expert': return 95;
    case 'advanced': return 85;
    case 'intermediate': return 70;
    case 'beginner': return 50;
    default: return 75;
  }
};

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

  if (loading) {
    return (
      <SkillsSection>
        <SectionTitle>{t('skills.title')}</SectionTitle>
        <LoadingSpinner
          variants={spinnerVariants}
          animate="animate"
        >
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
        <SectionTitle>{t('skills.title')}</SectionTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </SkillsSection>
    );
  }

  return (
    <SkillsSection>
      <SectionTitle>{t('skills.title')}</SectionTitle>
      <SkillsContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} delay={index * 0.1}>
            <SkillHeader>
              <SkillIcon>{getSkillIcon(skill.name)}</SkillIcon>
              <SkillTitle>{skill.name}</SkillTitle>
            </SkillHeader>
            <SkillLevel>
              <div>{skill.level}</div>
              <ProgressBar progress={getProgressPercentage(skill.level)} />
            </SkillLevel>
            <SkillTags>
              {skill.keywords.map((tag, i) => (
                <SkillTag 
                  key={i}
                  variants={tagVariants}
                  whileHover="hover"
                >
                  {tag}
                </SkillTag>
              ))}
            </SkillTags>
          </SkillCard>
        ))}
      </SkillsContainer>
    </SkillsSection>
  );
};

export default SkillsPage;
