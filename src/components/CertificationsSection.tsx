'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Award, Calendar, X, Sparkles, ShieldCheck } from 'lucide-react';
import { ChatSession } from './GrokChat';
import { useState, useEffect } from 'react';

function useTypingEffect(text: string, speed = 25) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isTyping };
}

const CertificationsSection = () => {
  const certifications = [
    {
      title: 'ISC2 CC - Cyber Security',
      issuer: 'ISC2',
      date: '2025',
      level: 'Professional',
      status: 'Active',
      description: 'Validates expertise in cyber security principles, risk management, network security, and access controls.',
      skills: ['Cyber Security', 'Cloud Security', 'Information Security', 'High Availability'],
      credentialUrl: 'https://www.linkedin.com/posts/rootzain_isc2-cc-certification-activity-7341090352134615040-CNv3?utm_source=share&utm_medium=member_desktop&rcm=ACoAACpPAfIBpqiAKKK-WrU8TUck1Q6Nl09s64s'
    },
    {
      title: 'Azure AI Engineer Associate',
      issuer: 'Microsoft',
      date: '2026',
      level: 'Associate',
      status: 'In Progress',
      description: 'Validates practical expertise in integrating Azure AI services, Vision, NLP, & OpenAI models into production applications.',
      skills: ['Azure OpenAI', 'AI Vision', 'AI Speech', 'Cognitive Services'],
      credentialUrl: ''
    },
    {
      title: 'React The Complete Guide',
      issuer: 'Udemy',
      date: '2024',
      level: 'Professional',
      status: 'Active',
      description: 'Validates advanced React development, state management, hooks, and performance optimization techniques.',
      skills: ['ReactJS', 'JavaScript', 'TailwindCSS', 'Hooks', 'State Management'],
      credentialUrl: 'https://www.udemy.com/certificate/UC-5195faf3-d1f6-46b3-b7d9-aae6cf2e8ad9/'
    },
    {
      title: 'Green Software For Practitioners',
      issuer: 'The Linux Foundation',
      date: '2023',
      level: 'Professional',
      status: 'Active',
      description: 'Validates ability to optimize, build, and deploy eco-friendly cloud applications reducing carbon emissions.',
      skills: ['Green Computing', 'Eco-Friendly Optimization', 'Cloud Efficiency'],
      credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/6fd8359d-4938-4a21-859d-14c9e29e564f-mohammed-zain-k-958fde29-45e5-4e03-944e-926dc7187f11-certificate.pdf'
    },
    {
      title: 'Spring Boot Certified Course',
      issuer: 'Scaler',
      date: '2026',
      level: 'Associate',
      status: 'Active',
      description: 'Proves proficiency in developing enterprise microservices & REST APIs using Java and Spring Boot framework.',
      skills: ['Spring Boot', 'OOP Design', 'Java', 'SQL Databases'],
      credentialUrl: 'https://moonshot.scaler.com/s/li/ZGG7mASEdI'
    }
  ];

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<number | null>(null);

  const currentSummary = flippedIndex !== null ? summaries[flippedIndex] || '' : '';
  const { displayedText, isTyping } = useTypingEffect(currentSummary, 25);

  const handleSummaryClick = async (cert: typeof certifications[0], idx: number) => {
    if (flippedIndex === idx) {
      setFlippedIndex(null);
      return;
    }

    if (summaries[idx]) {
      setFlippedIndex(idx);
      return;
    }

    setLoading(idx);
    setFlippedIndex(idx);

    try {
      const session = new ChatSession();
      const prompt = `Summarize in 2-3 lines what the certification '${cert.title}' is for and how it helps Zain as a professional. Description: ${cert.description}`;
      const aiSummary = await session.chat(prompt);
      setSummaries(prev => ({ ...prev, [idx]: aiSummary }));
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummaries(prev => ({ ...prev, [idx]: 'Failed to generate summary. Please try again.' }));
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="certifications" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest font-mono">
              Verified Excellence
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Certifications & Credentials
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Industry-recognized credentials validating cybersecurity, AI engineering, cloud efficiency, and software architecture.
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative h-[480px]"
              style={{ perspective: '1200px' }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT SIDE */}
                <Card
                  className="glass-interstellar glass-interstellar-hover absolute inset-0 border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center">
                        <Award className="h-5 w-5 text-amber-400" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
                        {cert.level}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-white mt-3 group-hover:text-amber-300 transition-colors">
                      {cert.title}
                    </CardTitle>
                    <p className="text-xs text-gradient-cosmic font-semibold">{cert.issuer}</p>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-amber-400" />
                          <span>{cert.date}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                          {cert.status}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-3">
                        {cert.description}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono uppercase text-gray-400">Verified Competencies:</span>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-purple-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs font-semibold bg-white/5 border-white/15 text-gray-200 hover:text-white hover:border-amber-400/50 hover:bg-amber-500/10 transition-all rounded-xl"
                        onClick={() => window.open(cert.credentialUrl)}
                        disabled={!cert.credentialUrl}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
                        View Verified Credential
                      </Button>
                      <button
                        onClick={() => handleSummaryClick(cert, index)}
                        className="w-full text-[11px] font-mono text-purple-300 hover:text-amber-300 transition-colors flex items-center justify-center gap-1 py-1"
                      >
                        <Sparkles className="w-3 h-3 text-purple-400" /> What does this certify?
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* BACK SIDE */}
                <Card
                  className="glass-interstellar absolute inset-0 border-amber-400/30 rounded-3xl overflow-hidden flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-400" />
                        <span className="text-xs font-mono font-bold text-amber-300 uppercase">AI Insights</span>
                      </div>
                      <button
                        onClick={() => setFlippedIndex(null)}
                        className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <CardTitle className="text-base font-bold text-white mt-2">{cert.title}</CardTitle>
                    <p className="text-xs text-purple-300 font-mono">{cert.issuer}</p>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center p-4 rounded-2xl bg-black/50 border border-white/10">
                      {loading === index ? (
                        <div className="text-center space-y-3">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto" />
                          <p className="text-xs text-gray-400 font-mono">Generating AI summary...</p>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
                          {flippedIndex === index ? displayedText : summaries[index]}
                          {flippedIndex === index && isTyping && <span className="inline-block w-1.5 h-3 ml-1 bg-amber-400 animate-pulse" />}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-semibold bg-white/5 border-white/15 text-gray-200 hover:text-white hover:border-amber-400/50 rounded-xl"
                      onClick={() => setFlippedIndex(null)}
                    >
                      ← Back to Details
                    </Button>
                  </CardContent>
                </Card>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;

