import './styles/globals.css';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import AIChatBot from './components/AIChatBot';
import HeroSection from './components/HeroSection';

const AboutSection = lazy(() => import('./components/AboutSection'));
const Projects = lazy(() => import('./components/Projects'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const CertificationsSection = lazy(() => import('./components/CertificationsSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const visitor = new URLSearchParams(window.location.search).get('s');

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main>
        
        <HeroSection onChatOpen={setIsChatOpen} darkMode={darkMode} visitor={visitor === null ? 'Random Source' : visitor} />
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <AboutSection visitor={visitor === null ? 'Random Source' : visitor} />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Projects visitor={visitor === null ? 'Random Source' : visitor} />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <CertificationsSection visitor={visitor === null ? 'Random Source' : visitor} />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <ExperienceSection visitor={visitor === null ? 'Random Source' : visitor} />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <ContactSection onOpenChat={() => setIsChatOpen(true)} />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Footer />
        </Suspense>
      </main>

      {/* AI Chat Bot */}
      <AIChatBot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        richColors
        closeButton
      />
    </div>
  );
}