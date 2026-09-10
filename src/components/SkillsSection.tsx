'use client';

import { Card, CardContent } from './ui/card';
import { Cpu, Terminal, ShieldCheck, Sparkles } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend & UI Engineering',
      icon: Terminal,
      skills: [
        { name: 'React.js & Next.js 14', level: 95, description: 'App Router, Server Components, SSR, & State Management' },
        { name: 'TypeScript', level: 92, description: 'Strict type safety, generics, & design patterns' },
        { name: 'Tailwind CSS & Glassmorphism', level: 94, description: 'Custom design systems & dynamic micro-animations' },
        { name: 'Redux Toolkit & Context', level: 88, description: 'Scalable state architecture & middleware' },
      ]
    },
    {
      title: 'Backend & Cloud Services',
      icon: Cpu,
      skills: [
        { name: 'Node.js & Express', level: 90, description: 'RESTful APIs, microservices, & WebSocket real-time feeds' },
        { name: 'Python & FastAPI', level: 86, description: 'Asynchronous services, data processing, & AI scripting' },
        { name: 'Azure & AWS Cloud', level: 84, description: 'App Services, Lambda, S3, IAM, & Serverless Functions' },
        { name: 'PostgreSQL & MongoDB', level: 85, description: 'Relational & NoSQL database indexing & queries' },
      ]
    },
    {
      title: 'AI, DevOps & Engineering Tools',
      icon: ShieldCheck,
      skills: [
        { name: 'Groq & OpenAI APIs', level: 88, description: 'LLM integration, structured outputs, & prompt engineering' },
        { name: 'Firebase & Firestore', level: 92, description: 'Real-time database, Authentication, & AI logic' },
        { name: 'Docker & CI/CD', level: 85, description: 'Containerization, GitHub Actions, & deployment runners' },
        { name: 'Git & Agile Systems', level: 95, description: 'Branching strategies, code reviews, & sprint delivery' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest font-mono">
              Technical Spectrum
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Skills & Competencies
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A comprehensive overview of my software engineering capabilities and technical stack.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="glass-interstellar glass-interstellar-hover border-white/10 rounded-3xl overflow-hidden group">
              <CardContent className="p-7 space-y-6">
                
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Individual Skill Progress */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-200">{skill.name}</span>
                        <span className="font-mono text-gray-300 font-bold">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Simple Sleek Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-white/10 border border-white/10 overflow-hidden relative">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gray-300 to-white transition-all duration-1000 opacity-90"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Highlight Bar */}
        <div className="p-8 rounded-3xl glass-interstellar border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">3+ Yrs</div>
            <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Professional Exp</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">15+ Techs</div>
            <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Mastered Stack</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">Cloud Native</div>
            <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Architecture</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">90%</div>
            <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Code Quality</div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default SkillsSection;