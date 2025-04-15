import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const IconWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  
  svg {
    width: ${props => props.size || '24px'};
    height: ${props => props.size || '24px'};
    color: var(--accent);
    transition: color var(--transition-speed) ease;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: radial-gradient(circle at center, var(--halo-color) 0%, transparent 70%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
  
  &:hover svg {
    color: var(--accent-hover);
  }
`;

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.2,
    rotate: 5,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  },
  tap: { scale: 0.9 }
};

const HaloIcon = ({ icon, size, className, onClick, ...props }) => {
  return (
    <IconWrapper 
      className={`halo-effect ${className || ''}`}
      size={size}
      variants={iconVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      {...props}
    >
      {icon}
    </IconWrapper>
  );
};

export default HaloIcon;
