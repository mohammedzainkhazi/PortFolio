'use client';

import React from "react";
import { Badge } from "./ui/badge";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my projects, skills, and experience.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://your-portfolio-link.com",
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce application with user authentication and payment integration.",
    technologies: ["Node.js", "Express", "MongoDB", "React"],
    link: "https://github.com/yourusername/ecommerce",
  },
  // Add more projects as needed
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that demonstrate my skills and experience in software development
          </p>
        </div>
      <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-muted">
            <h3 className="text-lg font-semibold">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export default Projects;