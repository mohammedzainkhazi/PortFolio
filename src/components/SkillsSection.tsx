'use client';

import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React/Next.js', level: 95, description: 'Expert level with 5+ years experience' },
        { name: 'TypeScript', level: 90, description: 'Strong typing and advanced patterns' },
        { name: 'Tailwind CSS', level: 88, description: 'Responsive design and component systems' },
        { name: 'Vue.js', level: 75, description: 'Solid understanding and practical experience' },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 92, description: 'Express, Fastify, and serverless functions' },
        { name: 'Python', level: 85, description: 'Django, FastAPI, and data processing' },
        { name: 'PostgreSQL', level: 80, description: 'Database design and optimization' },
        { name: 'MongoDB', level: 78, description: 'NoSQL database design and aggregation' },
      ]
    },
    {
      title: 'DevOps Tools & AI',
      skills: [
        { name: 'Git/GitHub', level: 95, description: 'Version control and collaboration' },
        { name: 'CI/CD', level: 80, description: 'GitHub Actions, Runners, automated testing' },
        { name: 'Docker', level: 82, description: 'Containerization and orchestration' },
        { name: 'LangChain', level: 70, description: 'Chains, Templates, Context Management, Token Optimization' },
        { name: 'OpenAI & Groq API', level: 80, description: 'API integration and prompt engineering' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="secondary">{skill.level}%</Badge>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">2.5+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-muted-foreground">Technologies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;