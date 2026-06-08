'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';

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

  // Track scroll to highlight active section + shrink header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 120;
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

  // Move the sliding pill indicator under the active nav item
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
          ? 'py-2 bg-background/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo / name */}
          <div className="flex items-center gap-2">
            {/* Animated orbit dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_4s_linear_infinite]">
              Mohammed Zain Khazi
            </span>
          </div>

          {/* Desktop nav */}
          <div ref={navRef} className="hidden md:flex items-center relative">
            {/* Sliding pill */}
            <span
              className="absolute bottom-0 h-full rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/50 transition-all duration-300 ease-out pointer-events-none"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />

            {navigation.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.name}
                  ref={isActive ? (el) => { activeRef.current = el; } : undefined}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 z-10 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                  {/* Active dot */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle — pill style */}
            <button
              onClick={toggleDarkMode}
              className="relative flex items-center gap-1 px-3 py-1.5 rounded-full border border-foreground/20 dark:border-primary/40 bg-foreground/5 dark:bg-primary/10 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 dark:hover:border-primary/70 transition-all duration-200 text-sm"
              aria-label="Toggle dark mode"
            >
              <Sun className={`h-3.5 w-3.5 transition-all duration-300 ${darkMode ? 'opacity-40 scale-75' : 'opacity-100 scale-100 text-yellow-400'}`} />
              <span className="w-8 h-4 rounded-full bg-muted relative mx-1">
                <span
                  className={`absolute top-0.5 h-3 w-3 rounded-full bg-primary transition-all duration-300 ${darkMode ? 'left-4' : 'left-0.5'}`}
                />
              </span>
              <Moon className={`h-3.5 w-3.5 transition-all duration-300 ${darkMode ? 'opacity-100 scale-100 text-primary' : 'opacity-40 scale-75'}`} />
            </button>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-full border border-foreground/20 dark:border-primary/40 hover:border-foreground/40 dark:hover:border-primary/70 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu — slide down */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 pb-4 rounded-2xl border border-border bg-background/80 backdrop-blur-xl p-3">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
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
