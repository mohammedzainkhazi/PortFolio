'use client';

import { useState, Suspense, lazy, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Header } from '../src/components/Header';
import AIChatBot from '../src/components/AIChatBot';
import GalaxyBackground from '../src/components/GalaxyBackground';
import { useGsapScrollAnimations } from '../src/hooks/useGsapScrollAnimations';

const HeroSection = lazy(() => import('../src/components/HeroSection'));
const AboutSection = lazy(() => import('../src/components/AboutSection'));
const Projects = lazy(() => import('../src/components/Projects'));
const SkillsSection = lazy(() => import('../src/components/SkillsSection'));
const CertificationsSection = lazy(() => import('../src/components/CertificationsSection'));
const ExperienceSection = lazy(() => import('../src/components/ExperienceSection'));
const ContactSection = lazy(() => import('../src/components/ContactSection'));
const Footer = lazy(() => import('../src/components/Footer'));

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [visitor, setVisitor] = useState('Unknown');

  useGsapScrollAnimations();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('visitor');
    if (v) setVisitor(v);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <GalaxyBackground darkMode={darkMode} />
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} />
      <main>
        <Suspense fallback={null}>
          <HeroSection onChatOpen={() => setIsChatOpen(true)} darkMode={darkMode} visitor={visitor} />
          <AboutSection />
          <Projects />
          <SkillsSection />
          <CertificationsSection />
          <ExperienceSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
      <AIChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Toaster />
    </div>
  );
}
