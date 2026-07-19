import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ButtonContainer = styled(motion.button)`
  background: var(--gradient-accent);
  color: white;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: box-shadow var(--transition-speed) ease, filter var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: var(--glow);

  &:hover {
    filter: brightness(1.08);
    box-shadow: var(--glow), var(--glow-2);
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
