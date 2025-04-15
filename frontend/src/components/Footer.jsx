import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  padding: 3rem 0;
  margin-top: 5rem;
  transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    ${(props) => (props.dir === 'rtl' ? 'right: 0;' : 'left: 0;')}
    width: 30px;
    height: 2px;
    background-color: var(--accent);
  }
`;




const FooterLink = styled.a`
  color: var(--text-secondary);
  transition: color var(--transition-speed) ease;
  
  &:hover {
    color: var(--accent);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: var(--text-secondary);
  transition: color var(--transition-speed) ease;
  
  &:hover {
    color: var(--accent);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid var(--border);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const iconVariants = {
  hover: { 
    scale: 1.2,
    rotate: 5,
    transition: { type: "spring", stiffness: 300, damping: 10 }
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle dir={document.documentElement.lang === 'ar' ? 'rtl' : 'ltr'}>Foxy Dev</FooterTitle>
          <p>Full Stack Developer specializing in modern web technologies and creating responsive, user-friendly applications.</p>
          <SocialLinks>
            <SocialIcon 
              href="https://github.com/foxydev" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover="hover"
              variants={iconVariants}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </SocialIcon>
            <SocialIcon 
              href="https://linkedin.com/in/foxydev" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover="hover"
              variants={iconVariants}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </SocialIcon>
            <SocialIcon 
              href="https://twitter.com/foxydev" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover="hover"
              variants={iconVariants}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle dir={document.documentElement.lang === 'ar' ? 'rtl' : 'ltr'}>Quick Links</FooterTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/projects">Projects</FooterLink>
          <FooterLink href="/skills">Skills</FooterLink>
          <FooterLink href="/education">Education</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle dir={document.documentElement.lang === 'ar' ? 'rtl' : 'ltr'}>Contact</FooterTitle>
          <p>Email: contact@foxydev.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Location: San Francisco, USA</p>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {currentYear} Foxy Dev. All Rights Reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
