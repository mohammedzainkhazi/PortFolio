
// Simple simulated AI service based on keyword matching
// This avoids needing a backend or API keys for a basic portfolio demo

const knowledgeBase = {
    skills: "I am proficient in React, Firebase, .NET, Java, Python, MongoDB, MySQL, and more. I love building full-stack applications.",
    projects: "I have worked on several projects, including an AI Virtual Assistant using Python, and various web applications using React and Firebase.",
    education: "I hold a B.E. in Computer Science from MS Ramaiah Institute of Technology (8.02 CGPA) and a Diploma in Computer Science.",
    contact: "You can reach me at mohammedzainkhazi@protonmail.com or call me at +91 9164493673.",
    experience: "I am a Full Stack Web Developer focused on crafting distinctive and visually appealing front-end elements.",
    about: "I'm Mohammed Zain Khazi, a Full Stack Web Developer passionate about creating engaging and functional web applications.",
    hello: "Hi there! How can I help you today?",
    hi: "Hello! Feel free to ask me anything about Zain's professional background.",
    resume: "You can view my resume in the Resume section of this portfolio.",
    default: "I'm not sure about that, but I can tell you about my skills, projects, education, or how to contact me."
};

export const queryAI = async (query) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            let response = knowledgeBase.default;

            for (const key in knowledgeBase) {
                if (lowerQuery.includes(key)) {
                    response = knowledgeBase[key];
                    break;
                }
            }

            // Contextual fallbacks
            if (lowerQuery.includes('who are you')) response = knowledgeBase.about;
            if (lowerQuery.includes('work')) response = knowledgeBase.experience;
            if (lowerQuery.includes('study') || lowerQuery.includes('college')) response = knowledgeBase.education;

            resolve(response);
        }, 1000 + Math.random() * 1000); // Simulate network delay
    });
};
