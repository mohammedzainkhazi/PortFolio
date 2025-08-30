import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, Calendar, MapPin, ExternalLink } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'Shell India Markets Private Limited',
      location: 'Bengaluru, India',
      period: 'Aug 2023 - Present',
      type: 'Full-Time',
      description: 'Full-Stack Engineer driving the delivery of complex software solutions.',
      achievements: [
        'Reduced application load time by 40% through optimization',
        'Led team of 5 developers on flagship product redesign',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Introduced TypeScript reducing bugs by 30%'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes'],
      website: 'https://techcorp.com'
    },
    {
      title: 'Full Stack Developer',
      company: 'InnovateLab',
      location: 'Austin, TX',
      period: '2020 - 2022',
      type: 'Full-time',
      description: 'Developed and maintained multiple client applications using modern web technologies. Collaborated with design team to implement pixel-perfect UIs.',
      achievements: [
        'Built 8 client applications from concept to deployment',
        'Implemented responsive designs improving mobile usage by 50%',
        'Integrated third-party APIs increasing functionality',
        'Optimized database queries improving performance by 35%'
      ],
      technologies: ['Vue.js', 'Python', 'Django', 'MongoDB', 'Redis', 'GitLab CI'],
      website: 'https://innovatelab.com'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      period: '2019 - 2020',
      type: 'Contract',
      description: 'Developed user interfaces for a growing fintech startup. Worked closely with product team to deliver user-centric solutions.',
      achievements: [
        'Delivered MVP in 3 months ahead of schedule',
        'Implemented accessibility standards (WCAG 2.1)',
        'Built responsive components used across 5 products',
        'Contributed to 200% increase in user engagement'
      ],
      technologies: ['React', 'JavaScript', 'Sass', 'Webpack', 'Jest', 'Cypress'],
      website: 'https://startupxyz.com'
    },
    {
      title: 'Junior Developer',
      company: 'WebDev Agency',
      location: 'New York, NY',
      period: '2018 - 2019',
      type: 'Full-time',
      description: 'Started career developing websites for small businesses. Learned full-stack development and agile methodologies.',
      achievements: [
        'Completed 20+ client projects with 100% satisfaction',
        'Learned React, Node.js, and modern development practices',
        'Contributed to company\'s internal tool development',
        'Mentored intern developers'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress'],
      website: 'https://webdevagency.com'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      school: 'MS Ramaiah Institute of Technology',
      location: 'Bangaluru, India',
      period: '2020 - 2023',
      description: 'CGPA: 8.02',
      coursework: ['Database Systems', 'Operating System', 'Computer Networks', 'AI', 'Cyber Security', 'Data Structures', 'Software Engineering','Object Oriented Programming']
    },
    {
      degree: 'Diploma in Computer Science & Engineering',
      school: 'DRR Govt Polytechnic',
      location: 'Davangere, India',
      period: '2017 - 2020',
      description: 'Percentage: 84.5%',
      coursework: ['Basics of Electronics', 'Digital Electronics','Database Systems', 'Operating System', 'Computer Networks', 'Data Structures']
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background in software development
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8">Professional Experience</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex gap-8">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center relative z-10">
                    <Building2 className="h-8 w-8 text-white dark:text-black" />
                  </div>
                  
                  <Card className="flex-grow hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold">{exp.title}</h4>
                          <div className="flex items-center gap-2 text-primary font-medium mb-2">
                            <span>{exp.company}</span>
                            <Button variant="ghost" size="sm" className="h-auto p-1">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                            <Badge variant="outline">{exp.type}</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      
                      <div className="mb-4">
                        <h5 className="font-medium mb-2">Key Achievements:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Technologies:</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-semibold mb-8">Education</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-2">{edu.degree}</h4>
                  <p className="text-primary font-medium mb-2">{edu.school}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{edu.description}</p>
                  <div>
                    <h5 className="font-medium mb-2">Relevant Coursework:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="outline">
                          {course}
                        </Badge>
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
}

export default ExperienceSection;