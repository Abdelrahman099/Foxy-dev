import React from 'react';
import styled from 'styled-components';
import HaloButton from './HaloButton';

const CallToActionContainer = styled.div`
    padding: 1.8rem;
 background: radial-gradient(circle at center, var(--halo-color) 0%, transparent 70%);
    color: var(--text-secondary);
    text-align: center;
    margin-top: 2rem;
    position: fixed;
    bottom: 20px;
    right:40px;
    border-radius: 50%;


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
  
  &:hover svg {
    color: var(--accent-hover);
    transform: rotate(45deg);
    transition: transform 0.5s ease;
  }
`;

const CallToAction = () => {
  return (
  <CallToActionContainer onClick={() => window.open('https://wa.me/201009923849', '_blank')}>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M6.908 8.607a1.595 1.595 0 0 1 1.051 1.44v.002l.266 6.63a1.613 1.613 0 0 1-1.514 1.672h-.009l-.598.031c-1.144.06-2.05-.651-2.622-1.5c-.582-.866-.933-2.02-.981-3.255c-.05-1.235.208-2.416.714-3.331c.496-.897 1.332-1.692 2.47-1.752l.603-.03a1.6 1.6 0 0 1 .62.093m-.931 1.925l.234 5.842l-.21.011c-.179.01-.506-.096-.86-.62c-.341-.509-.605-1.288-.642-2.217s.164-1.736.467-2.285c.313-.566.639-.712.823-.721zm10.826-1.956a1.59 1.59 0 0 0-1.05 1.44l-.001.002l-.265 6.63A1.613 1.613 0 0 0 17 18.32h.008l.598.031c1.144.06 2.05-.651 2.622-1.501c.582-.865.933-2.018.982-3.254c.049-1.235-.209-2.416-.715-3.332c-.496-.896-1.332-1.692-2.47-1.75l-.603-.032a1.6 1.6 0 0 0-.62.094Zm.931 1.925l-.234 5.842l.21.01c.18.01.507-.095.86-.62c.342-.508.606-1.287.642-2.216s-.163-1.736-.466-2.285c-.314-.566-.64-.712-.824-.721z" clip-rule="evenodd"/><path fill="white" fill-rule="evenodd" d="M11.889 4c-3.507 0-6.865 3.099-6.865 6.865a1 1 0 1 1-2 0C3.024 5.944 7.328 2 11.889 2c4.56 0 8.865 3.944 8.865 8.865a1 1 0 1 1-2 0C18.754 7.099 15.395 4 11.889 4M5.722 16.956a1 1 0 0 1 1.306.542c.237.575.553 1.198 1.056 1.679c.475.453 1.162.823 2.26.823a1 1 0 0 1 0 2c-1.623 0-2.802-.576-3.64-1.377c-.81-.773-1.255-1.709-1.525-2.361a1 1 0 0 1 .543-1.306" clip-rule="evenodd"/></svg>
  </CallToActionContainer>
  );
};

export default CallToAction;
