import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ButtonContainer = styled(motion.button)`
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:hover {
    background-color: var(--accent-hover);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: radial-gradient(circle at center, var(--halo-color) 0%, transparent 70%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const HaloButton = ({ children, onClick, className, ...props }) => {
  return (
    <ButtonContainer 
      className={`halo-effect ${className || ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};

export default HaloButton;
