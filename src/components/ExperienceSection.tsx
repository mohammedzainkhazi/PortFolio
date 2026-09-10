'use client';

import { Card, CardContent } from './ui/card';
import { Building2, Calendar, MapPin, Award, GraduationCap, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'Shell India Markets Private Limited',
      location: 'Bengaluru, India',
      period: 'Aug 2023 - Present',
      type: 'Full-Time',
      description: 'Full-Stack Software Engineer architecting enterprise web apps, native tracking systems, & automated data pipelines.',
      achievements: [
        'Recognized with the Shell SEAT Superstar Award (Q4 2025) for outstanding contributions to project delivery and innovation.',
        'Improved asset tracking efficiency by developing a cross-platform React Native tracking app that replaced costly beacon scanners.',
        'Eliminated annual vendor licensing fees by spearheading the development of an in-house Next.js PWA to replace a legacy product.',
        'Reduced cyclomatic complexity and resolved critical security vulnerabilities across 3 enterprise projects via CI/CD automated scanning.',
        'Reduced infrastructure costs and increased data pipeline reliability by replacing Databricks dependencies with AVEVA PI System native tooling.'
      ],
      technologies: ['React.js', 'Next.js', 'React Native', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'CI/CD'],
      website: 'https://shell.com'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      school: 'MS Ramaiah Institute of Technology',
      location: 'Bengaluru, India',
      period: '2020 - 2023',
      description: 'Graduated with CGPA: 8.02',
      coursework: ['Database Systems', 'Operating Systems', 'Computer Networks', 'AI & Machine Learning', 'Cyber Security', 'Data Structures & Algorithms', 'Software Engineering', 'Object Oriented Programming']
    },
    {
      degree: 'Diploma in Computer Science & Engineering',
      school: 'DRR Govt Polytechnic',
      location: 'Davangere, India',
      period: '2017 - 2020',
      description: 'Graduated with Percentage: 84.5%',
      coursework: ['Digital Electronics', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Data Structures']
    }
  ];

  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl">
            <Briefcase className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest font-mono">
              Career Trajectory
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Experience & Education
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A proven track record of software engineering impact, enterprise innovation, and academic foundation.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
            <Building2 className="w-6 h-6 text-amber-400" /> Professional Experience
          </h3>

          <div className="relative pl-6 sm:pl-10 space-y-12">
            {/* Glowing Connecting Line */}
            <div className="absolute left-3 sm:left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber-500 via-purple-500 to-transparent" />

            {experiences.map((exp, index) => (
              <div key={index} className="relative group">
                {/* Timeline Glowing Node */}
                <div className="absolute -left-[27px] sm:-left-[35px] top-1 w-7 h-7 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.6)]">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>

                {/* Experience Glass Card */}
                <Card className="glass-interstellar glass-interstellar-hover border-white/10 rounded-3xl overflow-hidden">
                  <CardContent className="p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                            {exp.title}
                          </h4>
                          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                            {exp.type}
                          </span>
                        </div>

                        <div className="text-base font-semibold text-gradient-cosmic mt-1">
                          {exp.company}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" /> {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                          <MapPin className="w-3.5 h-3.5 text-purple-400" /> {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed font-sans">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" /> Key High-Impact Deliverables
                      </h5>
                      <ul className="space-y-2.5">
                        {exp.achievements.map((ach, achIndex) => (
                          <li key={achIndex} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Used */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <span className="text-[11px] font-mono uppercase text-gray-400">Technologies Utilized:</span>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-white/5 border border-white/10 text-purple-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Education Grid */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
            <GraduationCap className="w-6 h-6 text-purple-400" /> Academic Foundation
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="glass-interstellar glass-interstellar-hover border-white/10 rounded-3xl overflow-hidden group">
                <CardContent className="p-7 space-y-5">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {edu.degree}
                    </h4>
                    <div className="text-sm font-semibold text-gradient-gold mt-1">
                      {edu.school}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> {edu.period}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" /> {edu.location}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/20 text-xs font-mono text-purple-300 font-semibold inline-block">
                    {edu.description}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono text-gray-400 uppercase">Relevant Coursework:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-white/5 border border-white/10 text-gray-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;