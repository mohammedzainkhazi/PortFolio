'use client';

import React, { useState } from "react";
import { ExternalLink, Github, Layers, Sparkles, ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: 'Full-Stack' | 'AI & Cloud' | 'Enterprise';
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Interstellar AI Portfolio",
    category: "Full-Stack",
    description: "An ultra-modern, high-graphics developer portfolio with real-time 3D canvas physics, Groq AI chatbot, and GSAP scroll parallax.",
    technologies: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Groq AI", "Canvas 3D"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    demoUrl: "https://github.com/MohammedZainKhazi/portfolio",
    githubUrl: "https://github.com/MohammedZainKhazi/portfolio",
    featured: true,
  },
  {
    title: "Enterprise Shell Workflow System",
    category: "Enterprise",
    description: "High-impact enterprise application built for Shell using clean software architecture design patterns and automated cloud data workflows.",
    technologies: ["React.js", "C#", ".NET Core", "Azure Cloud", "SQL Server", "CI/CD"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    githubUrl: "https://github.com/MohammedZainKhazi",
    featured: true,
  },
  {
    title: "AI Intelligent Chat Assistant",
    category: "AI & Cloud",
    description: "Conversational AI chatbot embedded with multi-session chat history, dynamic prompt tuning, and Firebase Firestore persistence.",
    technologies: ["Groq SDK", "Firebase AI", "React", "TypeScript", "Node.js"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    demoUrl: "https://github.com/MohammedZainKhazi",
    githubUrl: "https://github.com/MohammedZainKhazi",
    featured: true,
  },
  {
    title: "Full-Stack E-Commerce & Analytics",
    category: "Full-Stack",
    description: "Scalable e-commerce engine with real-time inventory management, Stripe payment processing, and admin analytical dashboards.",
    technologies: ["Node.js", "Express", "MongoDB", "React", "Redux Toolkit", "Tailwind"],
    image: "https://images.unsplash.com/photo-1556742049-0a67d8a67c51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    githubUrl: "https://github.com/MohammedZainKhazi",
  },
  {
    title: "Cloud Microservices API Gateway",
    category: "AI & Cloud",
    description: "Decoupled cloud API gateway with Docker container orchestration, JWT authentication rate-limiting, and AWS deployment.",
    technologies: ["Python", "FastAPI", "Docker", "AWS ECS", "Redis", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    githubUrl: "https://github.com/MohammedZainKhazi",
  },
];


const Categories = ['All', 'Full-Stack', 'AI & Cloud', 'Enterprise'] as const;

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<typeof Categories[number]>('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl">
            <Layers className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest font-mono">
              Selected Showcase
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Featured Projects
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A curated collection of full-stack web applications, AI integrations, and enterprise engineering solutions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 backdrop-blur-xl border ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="glass-interstellar glass-interstellar-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group relative"
            >
              {/* Top Graphic Header */}
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                  {project.category}
                </div>

                {project.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/40 text-[10px] font-bold text-indigo-300">
                    <Sparkles className="w-3 h-3 text-indigo-400" /> Featured
                  </div>
                )}
              </div>


              {/* Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills & Actions */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-white/5 border border-white/10 text-purple-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold transition-all hover:scale-[1.02]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;