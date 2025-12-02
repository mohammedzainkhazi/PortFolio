import React from 'react';

function Skills() {
    const skills = [
        { name: 'React', icon: 'fab fa-react', color: 'text-blue-500' },
        { name: 'Firebase', icon: 'fas fa-fire', color: 'text-yellow-500' },
        { name: '.NET', icon: 'fab fa-windows', color: 'text-purple-500' }, // Changed to generic windows icon or similar as fa-dot-net might not exist in 5.15 standard free
        { name: 'Java', icon: 'fab fa-java', color: 'text-red-500' },
        { name: 'Python', icon: 'fab fa-python', color: 'text-blue-400' },
        { name: 'MongoDB', icon: 'fas fa-database', color: 'text-green-500' },
        { name: 'MySQL', icon: 'fas fa-database', color: 'text-blue-600' },
        { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400' },
        { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
        { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold text-white">Skills & Technologies</h2>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
                <p className="text-slate-400 max-w-2xl">
                    My technical toolkit includes a variety of languages and frameworks. I'm constantly learning and expanding this list.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {skills.map((skill, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:-translate-y-1 transition-transform duration-300 group">
                        <i className={`${skill.icon} text-5xl ${skill.color} group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`}></i>
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills;
