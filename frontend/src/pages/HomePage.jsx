import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HaloButton from '../components/HaloButton';
import HaloCard from '../components/HaloCard';
import { fetchBasics, fetchEducation } from '../utils/api';
import ContactPage from './ContactPage';

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

const floatingCircleVariants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// Add a second variant for staggered animations
const floatingCircleVariants2 = {
  animate: {
    y: [0, 30, 0],
    x: [0, -15, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// Add a third variant for different animation pattern
const floatingCircleVariants3 = {
  animate: {
    y: [0, -100, 0],
    x: [0, 200, 0],
    scale: [1, 1.15, 1],
    rotate: [0, 1, 0],
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

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
  line-height: 1.9;
  padding: 1rem;
`;

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  height: 400px;
  overflow: visible;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    display: block;
    position: relative;
    z-index: 1;
  }

  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -3px; /* سمك البوردر */
    border-radius: inherit;
    background: conic-gradient(from var(--angle), black 90%, red);
    z-index: 0;
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    from { --angle: 0deg; }
    to { --angle: 360deg; }
  }
`;



// Define the custom animation path for the image
const imageAnimationVariants = {
  animate: {
    x: [0, 180, 180, 0, 0],
    y: [0, 0, 50, 50, 0],
    transition: {
      duration: 8,
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Add keyframes for border animation
const BorderAnimation = styled.div`
  @keyframes borderAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

// Add styled components for education section
const EducationSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const EducationTitle = styled.h2`
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

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const EducationCard = styled(HaloCard)`
  padding: 1.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EducationInstitution = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const EducationDegree = styled.h4`
  font-size: 1.1rem;
  color: var(--accent);
  margin-bottom: 1rem;
`;

const EducationPeriod = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const EducationGPA = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const EducationCourses = styled.div`
  margin-top: 1rem;
`;

const CoursesTitle = styled.h5`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const CourseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CourseTag = styled.span`
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
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
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [basicsData, educationData] = await Promise.all([
          fetchBasics(),
          fetchEducation()
        ]);
        setBasics(basicsData);
        setEducation(educationData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    getData();
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
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  return (
    <div>
 
      <HeroSection>
        <BackgroundCircle
          variants={floatingCircleVariants}
          animate="animate"
          style={{
            width: '300px',
            height: '300px',
            top: '10%',
            left: '5%',
          }}
        />
        <BackgroundCircle 
          variants={floatingCircleVariants2}
          animate="animate"
          style={{ 
            width: '400px', 
            height: '400px', 
            top: '10%', 
            left: '10%',
            opacity: 0.5
          }}
        />
        <BackgroundCircle 
          variants={floatingCircleVariants3}
          animate="animate"
          style={{ 
            width: '300px', 
            height: '300px', 
            bottom: '10%', 
            right: '10%',
            opacity: 0.3
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
            { t('hero.title')}
          </HeroTitle>
          <HeroDescription variants={itemVariants}>
            { t('about.description')}
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
            {basics?.description?.[document.documentElement.lang === 'ar' ? 'ar' : 'en']}
          </AboutText>
          <AboutImage 
            
        
            animate="animate"
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src="https://media.istockphoto.com/id/2212360504/photo/holographic-ui-ux-display-icons-of-ux-ui-designer-creative-planning-data-visualization-web.jpg?s=1024x1024&w=is&k=20&c=skd_SMOtTMujQh9SX6oawwdSDeuPhmkxXmVqxUWLPrA=" alt="Passionate Developer" />
          </AboutImage>
        </AboutContent>
      </AboutSection>
      
      {/* Add Education Section */}
      <EducationSection id="education">
        <EducationTitle>My Educational Background</EducationTitle>
        <EducationGrid>
          {education.map((edu, index) => (
            <EducationCard key={index} delay={index * 0.1}>
              <EducationInstitution>{edu.institution}</EducationInstitution>
              <EducationDegree>{edu.studyType} in {edu.area}</EducationDegree>
              <EducationPeriod>
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </EducationPeriod>
              {edu.gpa && (
                <EducationGPA>GPA: {edu.gpa}</EducationGPA>
              )}
              <EducationCourses>
                <CoursesTitle>Key Courses</CoursesTitle>
                <CourseTags>
                  {edu.courses.slice(0, 5).map((course, i) => (
                    <CourseTag key={i}>{course}</CourseTag>
                  ))}
                </CourseTags>
              </EducationCourses>
            </EducationCard>
          ))}
        </EducationGrid>
      </EducationSection>


 <div>
   <ContactPage/>
  </div>      
    </div>



 
  );
};

export default HomePage;
