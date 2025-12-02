import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { onValue, ref } from 'firebase/database';
import { ExternalLinkIcon } from '@heroicons/react/outline';

function Projects() {
    const staticProjects = [
        {
            Description: "A Python-based AI assistant capable of responding to user queries, similar to Google Assistant, Siri, and Alexa.",
            ImageUrl: "https://i.ytimg.com/vi/NZMTWBpLUa4/maxresdefault.jpg",
            Title: "A.I Virtual Assistant",
            link: "#" // Added placeholder link
        },
    ];

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = () => {
            const projectsRef = ref(db, 'posts/');
            onValue(projectsRef, (snapshot) => {
                const fetchedProjects = [];
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    fetchedProjects.push(data);
                });
                setProjects([...staticProjects, ...fetchedProjects]);
                setLoading(false);
            }, (error) => {
                console.error("Error fetching projects:", error);
                setProjects([...staticProjects]); // Fallback to static if firebase fails
                setLoading(false);
            });
        };
        fetchProjects();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold text-white">Projects</h2>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
                <p className="text-slate-400 max-w-2xl">
                    Here are some of the projects I've worked on. They range from AI experiments to full-stack web applications.
                </p>
            </div>

            {loading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-64 bg-slate-800 rounded-xl"></div>
                    ))}
                 </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p, i) => (
                        <div key={i} className="group glass-card rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all duration-300 flex flex-col">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={p.ImageUrl}
                                    alt={p.Title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    {p.link && (
                                        <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-full text-white font-medium hover:bg-blue-500 transition-colors">
                                            View Project <ExternalLinkIcon className="w-4 h-4 ml-2"/>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2">{p.Title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                                    {p.Description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Projects;
