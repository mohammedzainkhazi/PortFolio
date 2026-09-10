'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Header } from '../src/components/Header';
import AIChatBot from '../src/components/AIChatBot';
import GalaxyBackground from '../src/components/GalaxyBackground';
import HeroSection from '../src/components/HeroSection';
import AboutSection from '../src/components/AboutSection';
import Projects from '../src/components/Projects';
import SkillsSection from '../src/components/SkillsSection';
import CertificationsSection from '../src/components/CertificationsSection';
import ExperienceSection from '../src/components/ExperienceSection';
import ContactSection from '../src/components/ContactSection';
import Footer from '../src/components/Footer';
import { useGsapScrollAnimations } from '../src/hooks/useGsapScrollAnimations';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
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
        <HeroSection onChatOpen={() => setIsChatOpen(true)} darkMode={darkMode} visitor={visitor} />
        <AboutSection />
        <Projects />
        <SkillsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
      <AIChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Toaster />
    </div>
  );
}


