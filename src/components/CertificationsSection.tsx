'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Award, Calendar, X } from 'lucide-react';
import { ChatSession } from './GrokChat';
import { useState, useEffect } from 'react';

// Typing animation hook
function useTypingEffect(text: string, speed = 30) {
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
      description: 'Validates expertise in cyber security principles, practices, and technologies.',
      skills: ['Cyber Security', 'Cloud Security', 'Information Security', 'High Availability'],
      credentialUrl: 'https://www.linkedin.com/posts/rootzain_isc2-cc-certification-activity-7341090352134615040-CNv3?utm_source=share&utm_medium=member_desktop&rcm=ACoAACpPAfIBpqiAKKK-WrU8TUck1Q6Nl09s64s'
    },
    {
      title: 'Azure AI Engineer Associate',
      issuer: 'Microsoft',
      date: '2026',
      level: 'Associate',
      status: 'In Progress',
      description: 'Validates practical expertise in integrating Azure AI services in business apps & solutions.',
      skills: ['Azure OpenAI', 'AI Vision', 'AI Speech', 'Cognitive Services'],
      credentialUrl: ''
    },
    {
      title: 'React The Complete Guide',
      issuer: 'Udemy',
      date: '2024',
      level: 'Professional',
      status: 'Active',
      description: 'Validates advanced React development skills and best practices.',
      skills: ['ReactJS', 'JavaScript', 'TailwindCSS', 'Hooks', 'State Management','TailwindCSS'],
      credentialUrl: 'https://www.udemy.com/certificate/UC-5195faf3-d1f6-46b3-b7d9-aae6cf2e8ad9/'
    },
    {
      title: 'Green Software For Practitioners',
      issuer: 'The Linux Foundation',
      date: '2023',
      level: 'Professional',
      status: 'Active',
      description: 'Validates ability to optimize, build, and deploy scalable applications on Cloud which reduces carbon emmissions',
      skills: ['Green Computing', 'Optimizing for Eco Friendly Code', 'Cloud Optimization'],
      credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/6fd8359d-4938-4a21-859d-14c9e29e564f-mohammed-zain-k-958fde29-45e5-4e03-944e-926dc7187f11-certificate.pdf'
    },
    {
      title: 'Spring Boot Certified Course for Essential Skills',
      issuer: 'Scaler',
      date: '2026',
      level: 'Associate',
      status: 'Active',
      description: 'Proves proficiency in developing applications and services using Spring Boot.',
      skills: ['Spring Boot', 'OOPS', 'Java', 'Database'],
      credentialUrl: 'https://moonshot.scaler.com/s/li/ZGG7mASEdI'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Professional':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Associate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<number | null>(null);

  // Typing effect for the currently flipped card
  const currentSummary = flippedIndex !== null ? summaries[flippedIndex] || '' : '';
  const { displayedText, isTyping } = useTypingEffect(currentSummary, 25);

  const handleSummaryClick = async (cert: typeof certifications[0], idx: number) => {
    // If already flipped, just flip back
    if (flippedIndex === idx) {
      setFlippedIndex(null);
      return;
    }

    // If summary already exists, just flip
    if (summaries[idx]) {
      setFlippedIndex(idx);
      return;
    }

    // Generate new summary
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
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Credentials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise across various technologies and methodologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative h-[520px]"
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT SIDE */}
                <Card
                  className="absolute inset-0 hover:shadow-lg transition-shadow backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <Award className="h-8 w-8 text-primary mb-2" />
                      <Badge className={getLevelColor(cert.level)}>
                        {cert.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{cert.date}</span>
                      <Badge variant="outline" className="ml-auto">
                        {cert.status}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed">{cert.description}</p>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => window.open(cert.credentialUrl)}
                      disabled={!cert.credentialUrl}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Credential
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleSummaryClick(cert, index)}
                    >
                      What does this certify?
                    </Button>
                  </CardContent>
                </Card>

                {/* BACK SIDE */}
                <Card
                  className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <Award className="h-8 w-8 text-primary mb-2" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setFlippedIndex(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="min-h-[280px] flex items-center justify-center">
                      {loading === index ? (
                        <div className="text-center space-y-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                          <p className="text-sm text-muted-foreground">Generating AI summary...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
                            <p className="text-sm font-medium mb-2 text-primary">AI Summary</p>
                            <p className="text-sm leading-relaxed">
                              {flippedIndex === index ? displayedText : summaries[index] || 'Click "What does this certify?" to generate summary'}
                              {flippedIndex === index && isTyping && <span className="inline-block animate-pulse ml-1">|</span>}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            💡 Generated by AI
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
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

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 p-6 bg-card rounded-lg border">
            <Award className="h-12 w-12 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Continuous Learning</h3>
              <p className="text-sm text-muted-foreground">
                Actively pursuing new certifications and staying updated with industry trends
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
