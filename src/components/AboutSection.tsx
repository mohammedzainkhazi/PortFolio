
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Coffee, Code2, Zap, Users, Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChatSession } from './GrokChat';

function useTypingEffect(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    if (!text) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

const AboutSection = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Clean Code Advocate',
      description: 'I believe in writing maintainable, well-documented code that scales with your business needs.'
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description: 'Optimizing applications for speed and efficiency, ensuring the best user experience possible.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Strong communication skills with experience leading development teams and mentoring junior developers.'
    },
    {
      icon: Coffee,
      title: 'Continuous Learning',
      description: 'Always staying up-to-date with the latest technologies and best practices in software development.'
    }
  ];

  const personalValues = [
    'Problem Solving',
    'Innovation',
    'Creativity',
    'Quality',
    'Collaboration',
    'Growth Mindset',
    'User-Centric'
  ];

  // Typing animation for intro paragraphs
  const [introParagraphs, setintroParagraphs] = useState([
    `I'm a passionate Software Developer Engineer with over 2 and half years of experience along with 1 year of Internship experience building scalable web applications and leading development teams. My journey began with a curiosity about how things work, which led me to discover the exciting world of software development
    I specialize in modern JavaScript technologies, cloud architecture, and creating seamless user experiences. Whether it's architecting microservices, optimizing database queries, or crafting intuitive user interfaces, I approach every challenge with enthusiasm and attention to detail.
    I'm always excited to collaborate with teams that share a passion for excellence and innovation.`
    ]);

  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const typed = useTypingEffect(introParagraphs[current] || '', 18);
  const session = new ChatSession("Paraphrase the following text, dont  respond as an assistant just give me what asked :\n");

  useEffect(() => {
    session.chat(introParagraphs[0]).then((response) => {
      if (response) {
        setintroParagraphs([response]);
      }
    }).catch((e) => {
      // Fail silently and use original text
      console.log("Paraphrasing failed, using original text. "+e);
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          if (typed.length === introParagraphs[current].length && current < introParagraphs.length - 1) {
            const timeout = setTimeout(() => {
              setCurrent((c) => c + 1);
            }, 500);
            return () => clearTimeout(timeout);
          } else if (typed.length === introParagraphs[current].length && current === introParagraphs.length - 1) {
            setDone(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a mission to create exceptional digital experiences
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Hello, I'm Zain</h3>
                <p
                  className="text-muted-foreground leading-relaxed min-h-[3.5em]"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {typed}
                  {<span className="inline-block animate-pulse">|</span>}
                </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Core Values</h4>
              <div className="flex flex-wrap gap-2">
                {personalValues.map((value, index) => (
                  <Badge key={index} variant="outline">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Let's Connect
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1599580546605-a86af98dbdb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjUyNzg3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional workspace"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* What I Bring */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">What I Bring to Your Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="text-center">
          <Card className="inline-block">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Quick Facts About Me</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">☕</div>
                  <p className="text-muted-foreground">Coffee enthusiast<br />3+ cups daily</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">🌎</div>
                  <p className="text-muted-foreground">Remote work advocate<br />Global mindset</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">🎯</div>
                  <p className="text-muted-foreground">Goal-oriented<br />Results driven</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;