import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HaloButton from '../components/HaloButton';
import { fetchBasics } from '../utils/api';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  z-index: 2;
`;

const HeroGreeting = styled(motion.h2)`
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 1rem;
`;

const HeroName = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, var(--accent) 0%, #9c27b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroTitle = styled(motion.h3)`
  font-size: 2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at center, var(--halo-color) 0%, transparent 70%);
  z-index: 1;
`;

const AboutSection = styled.section`
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: inherit;
    background: radial-gradient(circle at center, var(--halo-color) 0%, transparent 70%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover:before {
    opacity: 1;
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

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
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

const HomePage = () => {
  const { t } = useTranslation();
  const [basics, setBasics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getBasics = async () => {
      try {
        setLoading(true);
        const data = await fetchBasics();
        setBasics(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch basic profile data:', error);
        setError('Failed to load profile data. Please try again later.');
        setLoading(false);
      }
    };

    getBasics();
  }, []);

  if (loading) {
    return (
      <HeroSection>
        <LoadingSpinner
          variants={spinnerVariants}
          animate="animate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </LoadingSpinner>
      </HeroSection>
    );
  }

  if (error) {
    return (
      <HeroSection>
        <ErrorMessage>{error}</ErrorMessage>
      </HeroSection>
    );
  }
  
  return (
    <>
      <HeroSection>
        <BackgroundCircle 
          className="float-animation"
          style={{ 
            width: '400px', 
            height: '400px', 
            top: '10%', 
            left: '10%',
            opacity: 0.5
          }}
        />
        <BackgroundCircle 
          className="float-animation"
          style={{ 
            width: '300px', 
            height: '300px', 
            bottom: '10%', 
            right: '10%',
            opacity: 0.3,
            animationDelay: '1s'
          }}
        />
        
        <HeroContent
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroGreeting variants={itemVariants}>
            {t('hero.greeting')}
          </HeroGreeting>
          <HeroName variants={itemVariants} className="gradient-text">
            {basics?.name || "Foxy Developer"}
          </HeroName>
          <HeroTitle variants={itemVariants}>
            {basics?.title || t('hero.title')}
          </HeroTitle>
          <HeroDescription variants={itemVariants}>
            {basics?.summary || t('about.description')}
          </HeroDescription>
          <ButtonContainer variants={itemVariants}>
            <HaloButton as="a" href="/projects">
              {t('hero.cta')}
            </HaloButton>
          </ButtonContainer>
        </HeroContent>
      </HeroSection>
      
      <AboutSection id="about">
        <SectionTitle>{t('about.title')}</SectionTitle>
        <AboutContent>
          <AboutText>
            <p>
              I'm a passionate full-stack developer with expertise in modern web technologies. With a strong foundation in both frontend and backend development, I create responsive, user-friendly applications with clean code and innovative solutions.
            </p>
            <p>
              My journey in software development began during my studies at {basics?.location?.city || "Stanford"} University, where I earned my Master's degree in Computer Science. Since then, I've worked with various technologies and frameworks to build scalable and efficient web applications.
            </p>
            <p>
              I believe in continuous learning and staying updated with the latest industry trends. My goal is to create meaningful digital experiences that solve real-world problems and provide value to users.
            </p>
            <p>
              When I'm not coding, you can find me contributing to open-source projects, exploring new technologies, or enjoying outdoor activities like hiking and rock climbing.
            </p>
          </AboutText>
          <AboutImage 
            className="halo-effect"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Developer" />
          </AboutImage>
        </AboutContent>
      </AboutSection>
    </>
  );
};

export default HomePage;
