'use client';

import { Button } from './ui/button';
import { Github, Linkedin, Mail, Heart, ArrowUp, Instagram, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/MohammedZainKhazi' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/rootzain' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/zain.khazi' },
    { icon: Mail, label: 'Email', href: 'mailto:MohammedZainKhazi@protonmail.com' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/60 backdrop-blur-2xl text-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
              <span className="text-lg font-extrabold tracking-wider text-white hover:text-cyan-300 transition-colors">
                MOHAMMED ZAIN KHAZI
              </span>
            </div>


            <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed font-sans">
              Full-Stack Software Engineer specializing in modern web frameworks, enterprise cloud solutions, & AI integration. Built with clean code standards and high-impact design.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-amber-500/10 text-gray-300 hover:text-amber-300 transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">Location & Status</h4>
            <div className="space-y-2 text-xs text-gray-400 font-mono">
              <p>📍 Bengaluru, India</p>
              <p>✉️ MohammedZainKhazi@protonmail.com</p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[11px] font-mono text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Available for New Projects
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} Mohammed Zain Khazi. Interstellar Web Experience.</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-xl bg-white/5 border-white/15 hover:border-amber-400/50 text-gray-300 hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5 text-amber-400" />
            <span>Back to top</span>
          </Button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;