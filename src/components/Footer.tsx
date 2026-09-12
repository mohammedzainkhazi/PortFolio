'use client';

import { Button } from './ui/button';
import { Github, Linkedin, Mail, ArrowUp, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/MohammedZainKhazi' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/rootzain' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/zain.khazi' },
    { icon: Mail, label: 'Email', href: 'mailto:MohammedZainKhazi@protonmail.com' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/70 backdrop-blur-2xl text-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Brand & Social */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span
              onClick={scrollToTop}
              className="text-sm font-extrabold tracking-wider text-white hover:text-gray-200 cursor-pointer font-mono"
            >
              MOHAMMED ZAIN KHAZI
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="text-xs text-gray-400 font-mono">
              © {currentYear} All rights reserved.
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:ml-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center gap-2 rounded-xl bg-white/5 border-white/15 hover:border-white/30 text-gray-300 hover:text-white text-xs px-3.5 py-1.5"
            >
              <ArrowUp className="h-3.5 w-3.5 text-gray-300" />
              <span>Back to top</span>
            </Button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
