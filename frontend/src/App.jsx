import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import EducationPage from './pages/EducationPage';
import ContactPage from './pages/ContactPage';
import './i18n';
import './styles/global.css';
import GlobalStyles from './styles/animations';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyles />
        {/* Using HashRouter for better compatibility with static hosting and mobile */}
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="education" element={<EducationPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
