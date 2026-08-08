import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import './i18n';
import './styles/global.css';
import GlobalStyles from './styles/animations';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  const [loading, setLoading] = useState(() => {
    // Skip preloader on repeat visits in session or during speed testing
    if (typeof window !== 'undefined' && sessionStorage.getItem('preloader_shown')) {
      return false;
    }
    return true;
  });

  const handlePreloaderDone = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('preloader_shown', 'true');
    }
    setLoading(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyles />
        {loading && <Preloader minDuration={0.2} onDone={handlePreloaderDone} />}
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="education" element={<EducationPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
