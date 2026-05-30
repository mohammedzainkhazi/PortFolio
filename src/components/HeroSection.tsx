'use client';

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Github, Linkedin, Mail, Download, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { ChatSession } from './GrokChat';
import { downloadPDFFromStorage } from './Firebase';
import picture from '../images/pic.jpg';
import picturebw from '../images/Picbwrbg.png';



interface HeroSectionProps {
  onChatOpen: () => void;
  darkMode: boolean;
  visitor: string;
}

// Typing animation hook (copied from AboutSection)
function useTypingEffect(text: string, speed = 18) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
  }, [text]);
  useEffect(() => {
    if (!text || index >= text.length) return;
    const timeout = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(timeout);
  }, [text, index, speed]);
  return text.slice(0, index);
}

const HeroSection = ({ onChatOpen, darkMode, visitor }: HeroSectionProps) => {
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'];
  const [introText, setIntroText] = useState('');

  useEffect(() => {
    console.log(visitor)
    const paraphrase = async () => {
      const originalText = `Passionate about building scalable web applications and solving complex problems with clean, efficient code. Results driven Full-Stack Software Developer with 2+ years of experience and skilled in ReactJS, React Native, NextJS, Node.js,
            Python, C#,Java and Azure ecosystems. Proven track record of developing high-impact solutions at Shell with design patterns.
            Passionate about integrating AI in tools to make intelligent apps.`;
      try{
        const session = new ChatSession(`Paraphrase the following text to respond to a visitor from ${visitor} with the tone which people from ${visitor} expects, dont  respond as an assistant just give what asked :\n`);
        const response = await session.chat(originalText);
        setIntroText(response || originalText);
      }
      catch(error){
        console.error('Error paraphrasing intro text:', error);
        setIntroText(originalText); // Fallback to original text on error
      }
    }

    paraphrase();
  }, []);


  const typedIntro = useTypingEffect(introText, 18);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <Badge variant="secondary" className="hero-badge inline-flex items-center">
                🚀 Available for new opportunities
              </Badge>
              <h1 className="hero-title text-4xl md:text-6xl font-bold tracking-tight">
                Hi, I'm <span className="text-primary">Zain</span>
              </h1>
              <h2 className="hero-subtitle text-2xl md:text-3xl text-muted-foreground">
                Software Developer Engineer
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl min-h-[6em]" style={{ whiteSpace: 'pre-line' }}>
                {typedIntro}
                {typedIntro.length < introText.length && <span className="inline-block animate-pulse">|</span>}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="hero-skill">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="hero-action flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black" onClick={()=>
                downloadPDFFromStorage("Resume", "Resume.pdf")}>
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hero-action flex items-center gap-2"
                onClick={onChatOpen}
              >
                <MessageCircle className="h-4 w-4" />
                Chat with AI Assistant
              </Button>
            </div>

            <div className="hero-action flex items-center gap-6">
              <Button variant="ghost" size="sm" className="p-2">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>

          <div className="hero-image relative order-1 lg:order-2">
            <div className="relative z-10 sm:mt-5 lg:mt-0">
              <ImageWithFallback
                src={darkMode ? picturebw.src : picture.src}
                alt="Developer workspace"
                className="rounded-2xl w-full h-[400px] sm:h-[300px] md:h-[500px] object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-accent/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;