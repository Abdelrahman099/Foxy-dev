import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HaloCard from '../components/HaloCard';
import { fetchEducation } from '../utils/api';

const EducationSection = styled.section`
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

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--border);
    left: 50%;
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 2rem 0;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
  
  @media (max-width: 768px) {
    justify-content: flex-end;
    padding-left: 40px;
  }
`;

const TimelineDot = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--accent);
 left: calc(50% - 10px);
  top: 2rem;

  z-index: 2;
  
  @media (max-width: 768px) {
    left: 20px;
  }
`;

const TimelineContent = styled(HaloCard)`
  width: calc(50% - 40px);
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const EducationTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const EducationSubtitle = styled.h4`
  font-size: 1.2rem;
  color: var(--accent);
  margin-bottom: 1rem;
`;

const EducationPeriod = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
  }
`;

const EducationGPA = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
  }
`;

const CoursesList = styled.div`
  margin-top: 1.5rem;
`;

const CoursesTitle = styled.h5`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const CoursesTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CourseTag = styled(motion.span)`
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
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
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
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

const EducationPage = () => {
  const { t } = useTranslation();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEducation = async () => {
      try {
        setLoading(true);
        const data = await fetchEducation();
        setEducation(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch education:', error);
        setError('Failed to load education data. Please try again later.');
        setLoading(false);
      }
    };

    getEducation();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <EducationSection>
        <SectionTitle>{t('education.title')}</SectionTitle>
        <LoadingSpinner
          variants={spinnerVariants}
          animate="animate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </LoadingSpinner>
      </EducationSection>
    );
  }

  if (error) {
    return (
      <EducationSection>
        <SectionTitle>{t('education.title')}</SectionTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </EducationSection>
    );
  }

  return (
    <EducationSection>
      <SectionTitle>{t('education.title')}</SectionTitle>
      <Timeline
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {education.map((edu, index) => (
          <TimelineItem 
            key={index} 
            position={index % 2 === 0 ? 'right' : 'left'}
            variants={itemVariants}
          >
            <TimelineDot variants={dotVariants} />
            <TimelineContent>
              <EducationTitle>{edu.institution}</EducationTitle>
              <EducationSubtitle>{edu.studyType} in {edu.area}</EducationSubtitle>
              <EducationPeriod>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </EducationPeriod>
              <EducationGPA>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                GPA: {edu.gpa}
              </EducationGPA>
              <CoursesList>
                <CoursesTitle>{t('education.courses')}</CoursesTitle>
                <CoursesTags>
                  {edu.courses.map((course, i) => (
                    <CourseTag 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                    >
                      {course}
                    </CourseTag>
                  ))}
                </CoursesTags>
              </CoursesList>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </EducationSection>
  );
};

export default EducationPage;
