import { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
