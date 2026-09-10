'use client';

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Github, Linkedin, Mail, Download, MessageCircle, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect, useRef } from 'react';
import { ChatSession } from './GrokChat';
import { downloadPDFFromStorage } from './Firebase';
import picture from '../images/pic.jpg';
import picturebw from '../images/Picbwrbg.png';

interface HeroSectionProps {
  onChatOpen: () => void;
  darkMode: boolean;
  visitor: string;
}

function useTypingEffect(text: string, speed = 18) {
  const [index, setIndex] = useState(0);
  useEffect(() => { setIndex(0); }, [text]);
  useEffect(() => {
    if (!text || index >= text.length) return;
    const timeout = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(timeout);
  }, [text, index, speed]);
  return text.slice(0, index);
}

const HeroSection = ({ onChatOpen, darkMode, visitor }: HeroSectionProps) => {
  const skills = ['React.js', 'Next.js 14', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Docker', 'Firebase AI'];
  const [introText, setIntroText] = useState('');
  const hasParaphrasedRef = useRef(false);

  useEffect(() => {
    if (hasParaphrasedRef.current) return;
    hasParaphrasedRef.current = true;

    const paraphrase = async () => {
      const originalText = `Passionate about building scalable web applications and solving complex problems with clean, efficient code. Results driven Full-Stack Software Developer with 3+ years of experience and skilled in ReactJS, React Native, NextJS, Node.js, Python, C#, Java and Azure ecosystems. Proven track record of developing high-impact solutions with design patterns. Passionate about integrating AI in tools to make intelligent apps.`;
      try {
        const session = new ChatSession(`Paraphrase the following text to respond to a visitor from ${visitor} with the tone which people from ${visitor} expects, dont respond as an assistant just give what asked :\n`);
        const response = await session.chat(originalText);
        setIntroText(response || originalText);
      } catch (error) {
        console.error('Error paraphrasing intro text:', error);
        setIntroText(originalText);
      }
    };
    paraphrase();
  }, [visitor]);

  const typedIntro = useTypingEffect(introText, 18);

  const stats = [
    { label: 'Experience', value: '3+ Years', icon: Terminal },
    { label: 'Proven Track', value: 'Enterprise Dev', icon: Code2 },
    { label: 'Specialization', value: 'Full-Stack & AI', icon: Cpu },
  ];


  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              {/* Opportunity Badge */}
              <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold tracking-wider text-gray-200 uppercase font-mono">
                  Available for High-Impact Roles
                </span>
              </div>

              {/* Headline */}
              <h1 className="hero-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white">
                Hi, I'm <span className="text-white font-extrabold">Zain Khazi</span>
              </h1>
              <h2 className="hero-subtitle text-xl sm:text-3xl font-semibold tracking-wide text-gray-300">
                Software Development Engineer & AI Specialist
              </h2>

              {/* Dynamic Paraphrased Intro with Cursor */}
              <div className="hero-intro p-5 rounded-2xl glass-interstellar border border-white/10 relative overflow-hidden group">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed min-h-[5em] font-sans">
                  {typedIntro}
                  {typedIntro.length < introText.length && (
                    <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" />
                  )}
                </p>
              </div>
            </div>

            {/* Interactive Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="hero-skill px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-md cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {stats.map((st) => (
                <div key={st.label} className="p-3.5 rounded-xl glass-interstellar border border-white/10 text-center relative group hover:border-white/25 transition-all">
                  <st.icon className="w-4 h-4 mx-auto mb-1.5 text-gray-300 group-hover:scale-110 transition-transform" />
                  <div className="text-sm sm:text-base font-bold text-white">{st.value}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="hero-action btn-shiny flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 px-8 py-6 rounded-2xl backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => downloadPDFFromStorage("Resume", "Resume.pdf")}
              >
                <Download className="h-5 w-5 stroke-[2.5]" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hero-action btn-shiny flex items-center justify-center gap-2 border border-white/15 bg-black/40 hover:bg-white/10 text-gray-200 hover:text-white px-8 py-6 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
                onClick={onChatOpen}
              >
                <MessageCircle className="h-5 w-5 text-gray-300" />
                Chat with AI Assistant
              </Button>
            </div>

            {/* Social Connect Links */}
            <div className="hero-action flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Connect</span>
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="flex gap-3">
                <a href="https://github.com/MohammedZainKhazi" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl glass-interstellar border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all hover:scale-110">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl glass-interstellar border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all hover:scale-110">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="mailto:MohammedZainKhazi@protonmail.com" className="p-2.5 rounded-xl glass-interstellar border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all hover:scale-110">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — Clean Dark Glass Profile Photo */}
          <div className="lg:col-span-5 hero-image relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-square">
              
              {/* Inner Clean Dark Glass Container */}
              <div className="relative w-full h-full rounded-3xl p-1.5 bg-black/50 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden group">
                <ImageWithFallback
                  src={darkMode ? picturebw.src : picture.src}
                  alt="Mohammed Zain Khazi"
                  className="rounded-2xl w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>

            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;

