'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Menu, X, Moon, Sun, Sparkles } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement | null>(null);

  const navigation = [
    { name: 'Home',           href: '#home' },
    { name: 'About',          href: '#about' },
    { name: 'Projects',       href: '#projects' },
    { name: 'Skills',         href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Experience',     href: '#experience' },
    { name: 'Contact',        href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 140;
      for (const nav of navigation) {
        const el = document.getElementById(nav.href.substring(1));
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(nav.href.substring(1));
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const btn = activeRef.current;
    const nav = navRef.current;
    if (!btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPillStyle({ left: btnRect.left - navRect.left, width: btnRect.width });
  }, [activeSection]);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Brand Name & Portfolio Badge */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollToSection('#home')}>
            <span className="text-base sm:text-lg font-extrabold tracking-wider text-white group-hover:text-gray-200 transition-colors font-mono">
              MOHAMMED ZAIN KHAZI
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
              PORTFOLIO
            </span>
          </div>

          {/* Desktop Navigation Bar with Floating Glass Pill */}
          <div ref={navRef} className="hidden md:flex items-center relative p-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            {/* Active Pill Indicator */}
            <span
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white/10 border border-white/20 transition-all duration-300 ease-out pointer-events-none shadow-md"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />

            {navigation.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.name}
                  ref={isActive ? (el) => { activeRef.current = el; } : undefined}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 z-10 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Control Actions */}
          <div className="flex items-center gap-3">
            {/* Single-Button Theme Toggle Icon */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 shadow-md flex items-center justify-center"
              aria-label="Toggle theme"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="h-4 w-4 text-gray-200 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-gray-200 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>


            {/* Mobile Navigation Trigger */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md hover:border-amber-400/50 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1.5 p-3 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? 'text-amber-300 bg-amber-500/10 border border-amber-400/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

