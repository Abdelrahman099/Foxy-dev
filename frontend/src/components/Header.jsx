import React, { useContext, useState, useEffect } from 'react';
import { Link ,NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import HaloIcon from './HaloIcon';
import BrandLogo from './BrandLogo';


/* Smart-hide glassy navbar:
   - at the very top: fully transparent, blends with the hero
   - after scrolling: frosted glass (blur + translucent) with a soft border
   - scrolling down hides it; any scroll up brings it back instantly */
const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ $scrolled }) =>
    $scrolled ? 'color-mix(in srgb, var(--bg-primary) 72%, transparent)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(16px) saturate(1.5)' : 'none')};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(16px) saturate(1.5)' : 'none')};
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? 'var(--border)' : 'transparent')};
  box-shadow: ${({ $scrolled }) => ($scrolled ? '0 10px 34px rgba(0, 0, 0, 0.25)' : 'none')};
  transition: background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease,
    box-shadow 0.35s ease;

  /* thin gradient glow line under the glass */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1px;
    background: var(--gradient-accent);
    opacity: ${({ $scrolled }) => ($scrolled ? 0.35 : 0)};
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
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
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  color: var(--text-primary);
  transition: color var(--transition-speed) ease;
  direction: ltr;

  svg {
    flex-shrink: 0;
    transition: transform 0.4s ease;
  }

  &:hover svg {
    transform: translateY(-2px) rotate(-4deg);
  }

  span {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: var(--text-primary);
  font-weight: 500;
  transition: color var(--transition-speed) ease;
  position: relative;
  text-decoration: none;
  
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

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999;
  border-top: 1px solid var(--border);
`;

const MobileNavLinkStyled = styled(NavLink)`
  color: var(--text-primary);
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all var(--transition-speed) ease;
  
  &:hover, &.active {
    color: var(--accent);
    background-color: var(--bg-secondary);
  }
`;

const Header = () => {
  const { t } = useTranslation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // hide when scrolling down past the hero, reveal on any scroll up
      setHidden(y > lastY && y > 180 && !mobileMenuOpen);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: hidden ? '-110%' : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      <NavContainer>
        <Logo to="/">
          <BrandLogo size={30} />
          <span style={{ WebkitTextFillColor: 'initial', background: 'none', color: 'var(--text-primary)' }}>Backin</span><span>Front</span>
        </Logo>

        <NavLinks>
          <NavLinkStyled to="/">{t('header.home')}</NavLinkStyled>
          <NavLinkStyled to="/services">{t('header.services')}</NavLinkStyled>
          <NavLinkStyled to="/projects">{t('header.projects')}</NavLinkStyled>
          <NavLinkStyled to="/skills">{t('header.skills')}</NavLinkStyled>
          <NavLinkStyled to="/contact">{t('header.contact')}</NavLinkStyled>
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
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </MobileMenuButton>
        </Controls>
      </NavContainer>
      
      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <MobileNavLinkStyled to="/" onClick={() => setMobileMenuOpen(false)}>
            {t('header.home')}
          </MobileNavLinkStyled>
          <MobileNavLinkStyled to="/services" onClick={() => setMobileMenuOpen(false)}>
            {t('header.services')}
          </MobileNavLinkStyled>
          <MobileNavLinkStyled to="/projects" onClick={() => setMobileMenuOpen(false)}>
            {t('header.projects')}
          </MobileNavLinkStyled>
          <MobileNavLinkStyled to="/skills" onClick={() => setMobileMenuOpen(false)}>
            {t('header.skills')}
          </MobileNavLinkStyled>
          <MobileNavLinkStyled to="/contact" onClick={() => setMobileMenuOpen(false)}>
            {t('header.contact')}
          </MobileNavLinkStyled>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
