import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import HaloIcon from './HaloIcon';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: background-color var(--transition-speed) ease;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color var(--transition-speed) ease;
  
  span {
    color: var(--accent);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  font-weight: 500;
  transition: color var(--transition-speed) ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--accent);
    transition: width var(--transition-speed) ease;
  }
  
  &:hover, &.active {
    color: var(--accent);
    
    &:after {
      width: 100%;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color var(--transition-speed) ease;
  
  &:hover {
    background-color: var(--bg-secondary);
  }
`;

const MobileMenuButton = styled(ControlButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const headerVariants = {
  hidden: { y: -100 },
  visible: { 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  }
};

const Header = () => {
  const { t } = useTranslation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  
  return (
    <HeaderContainer
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <NavContainer>
        <Logo to="/">
          Foxy<span>Dev</span>
        </Logo>
        
        <NavLinks>
          <NavLink to="/">{t('header.home')}</NavLink>
          <NavLink to="/projects">{t('header.projects')}</NavLink>
          <NavLink to="/skills">{t('header.skills')}</NavLink>
          <NavLink to="/education">{t('header.education')}</NavLink>
          <NavLink to="/contact">{t('header.contact')}</NavLink>
        </NavLinks>
        
        <Controls>
          <HaloIcon 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {darkMode ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                )}
              </svg>
            }
            onClick={toggleTheme}
          />
          
          <HaloIcon 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            }
            onClick={toggleLanguage}
          />
          
          <MobileMenuButton>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </MobileMenuButton>
        </Controls>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
