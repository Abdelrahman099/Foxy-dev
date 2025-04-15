import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CardContainer = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed) ease;
  position: relative;
  z-index: 1;
  overflow: visible;
  
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    y: -10,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const HaloCard = ({ children, className, delay = 0, ...props }) => {
  return (
    <CardContainer
      className={`halo-effect ${className || ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay }}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

export default HaloCard;
