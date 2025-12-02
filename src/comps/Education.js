import React from 'react';
import msrit from "../images/msrit.png"; // Keeping import

function Education() {
    const educationData = [
        {
            title: "B.E - Computer Science & Engineering",
            institution: "MS Ramaiah Institute of Technology",
            year: "2020 - 2023",
            score: "CGPA - 8.02",
            image: msrit,
            details: "Specialized in Computer Science with a focus on Web Technologies and Software Engineering."
        },
        {
            title: "Diploma in Computer Science",
            institution: "DRR Govt Polytechnic Davangere",
            year: "2017 - 2020",
            score: "Percentage - 84.5%",
            image: "https://gpt.karnataka.gov.in/drrgptdavanagere/public/uploads/dept_logo1650214282.gif",
            details: "Gained foundational knowledge in programming, databases, and computer networks."
        },
        {
            title: "Secondary School (Class X)",
            institution: "Bapuji HPEMS Davangere",
            year: "2017",
            score: "CGPA - 9.0",
            image: "https://pbs.twimg.com/profile_images/1161585123386466304/RwO5UbFy_400x400.jpg",
            details: "Completed secondary education with distinction."
        }
    ];

    return (
        <div className="space-y-8">
             <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold text-white">Education</h2>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
            </div>

            <div className="relative border-l border-slate-700 ml-4 md:ml-6 space-y-12">
                {educationData.map((edu, index) => (
                    <div key={index} className="relative pl-8 md:pl-12">
                        {/* Dot on timeline */}
                        <div className="absolute -left-3 top-0 bg-slate-950 border-4 border-blue-500 rounded-full w-6 h-6"></div>

                        <div className="glass-card p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-16 h-16 shrink-0 bg-white rounded-lg p-2 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={edu.image}
                                        alt={edu.institution}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {e.target.src = 'https://via.placeholder.com/150?text=Edu'}}
                                    />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                        <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                                        <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                                            {edu.year}
                                        </span>
                                    </div>
                                    <h4 className="text-lg text-slate-300">{edu.institution}</h4>
                                    <p className="text-slate-400 text-sm">{edu.details}</p>
                                    <div className="pt-2">
                                        <span className="text-sm font-bold text-green-400">{edu.score}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Education;
