'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Coffee, Code2, Zap, Users, CogIcon, Compass, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChatSession } from './GrokChat';

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

const AboutSection = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Clean Code Architect',
      description: 'Crafting modular, scalable, and maintainable software systems with rigorous engineering design patterns.'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimizing web apps, database indexes, and bundle rendering for maximum speed and smooth CWV performance.'
    },
    {
      icon: CogIcon,
      title: 'DevOps & AI Automation',
      description: 'Integrating AI models into enterprise workflows, CI/CD pipelines, and cloud automated infrastructure.'
    },
    {
      icon: Users,
      title: 'Cross-Functional Leader',
      description: 'Partnering seamlessly with stakeholders, engineering teams, and designers to deliver complex products.'
    },
  ];

  const personalValues = [
    'Problem Solving',
    'AI Integration',
    'System Architecture',
    'Clean Code',
    'Cloud Scaling',
    'User Experience',
    'Growth Mindset'
  ];

  const [introParagraphs, setintroParagraphs] = useState([
    `I'm a Software Development Engineer with over 2.5 years of professional engineering experience along with 1 year of internship experience architecting web applications, cloud backends, and AI integrations. My passion lies at the intersection of modern JavaScript ecosystems, enterprise cloud architectures, and intelligent tools.

Whether crafting real-time user interfaces in Next.js, building microservices in Node.js/Python, or engineering automated workflows, I bring precision, creativity, and clean design patterns to every line of code.`
  ]);

  const [current] = useState(0);
  const [visible, setVisible] = useState(false);
  const typed = useTypingEffect(visible ? (introParagraphs[current] || '') : '', 18);

  useEffect(() => {
    const paraphraseIntro = async () => {
      try {
        const session = new ChatSession("Paraphrase the following text, dont respond as an assistant just give what asked :\n");
        const response = await session.chat(introParagraphs[0]);
        setintroParagraphs([response || introParagraphs[0]]);
      } catch (error) {
        console.error('Paraphrasing failed, using original text:', error);
      }
    };

    paraphraseIntro();

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl">
            <Compass className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest font-mono">
              Engineering Philosophy
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-gradient-cosmic">Mohammed Zain Khazi</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Bridging complex software architecture with elegant user experiences and AI innovation.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl glass-interstellar border border-white/10 relative overflow-hidden group">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                Engineered for Impact & Scale
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed min-h-[5em] font-sans">
                {typed}
                {typed.length < (introParagraphs[current]?.length ?? 0) && (
                  <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse" />
                )}
              </p>
            </div>


            {/* Core Values Pills */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                Core Engineering Pillars
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalValues.map((value, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                className="btn-shiny border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-6 rounded-2xl backdrop-blur-xl shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Build Together
              </Button>
            </div>
          </div>

          {/* Right Column Modern Tech Workspace Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl p-1.5 bg-black/50 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzU2NTI3ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Software engineering workspace"
                className="rounded-2xl w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-gray-300" /> Full-Stack & AI Engineering
                </div>
                <p className="text-xs text-gray-300 font-mono">
                  High-performance web apps, scalable APIs, & AI integrations.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* What I Bring Cards */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-white">
            What I Bring to the Table
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="glass-interstellar glass-interstellar-hover border-white/10 rounded-2xl overflow-hidden group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-gray-300" />
                  </div>
                  <h4 className="font-bold text-white text-base group-hover:text-gray-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="p-8 rounded-3xl glass-interstellar border border-white/10 text-center max-w-3xl mx-auto">
          <h3 className="font-bold text-lg text-white mb-6 uppercase tracking-wider font-mono">
            ⚡ Key Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">☕ 3+ Cups</div>
              <p className="text-xs text-gray-400">Fueled by daily problem-solving</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">🌐 Global Work</div>
              <p className="text-xs text-gray-400">Remote & cross-team collaborator</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">🎯 High Impact</div>
              <p className="text-xs text-gray-400">Scalable web applications</p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default AboutSection;