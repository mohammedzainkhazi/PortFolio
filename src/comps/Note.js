import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import photo from "../img/pic.jpg"; // Fallback image

function Note() {
  const [pic, setPic] = useState(photo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = getStorage();
    const fetchImage = async () => {
        try {
            const url = await getDownloadURL(ref(storage, 'gs://myblog-296608.appspot.com/profilePic/pf.png'));
            setPic(url);
        } catch (error) {
            console.error("Failed to load profile pic", error);
        } finally {
            setLoading(false);
        }
    };
    fetchImage();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full">

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <h2 className="text-blue-400 font-medium tracking-wide uppercase text-sm">Welcome to my world</h2>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Zain</span>
            </h1>
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-300">
              Full Stack Developer
            </h3>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Crafting distinctive and visually appealing digital experiences.
            I specialize in building robust web applications that are both functional
            and engaging, ensuring seamless performance across all devices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
             <a
               href="https://github.com/mohammedzainkhazi/"
               target="_blank"
               rel="noreferrer"
               className="px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all hover:scale-105 border border-slate-700"
             >
               <i className="fab fa-github mr-2"></i> GitHub
             </a>
             <a
               href="https://www.linkedin.com/in/rootzain/"
               target="_blank"
               rel="noreferrer"
               className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
             >
               <i className="fab fa-linkedin mr-2"></i> LinkedIn
             </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 relative group">
            {/* Abstract Background Shapes */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 aspect-square max-w-md mx-auto">
              <img
                src={pic}
                alt="Mohammed Zain Khazi"
                className={`object-cover w-full h-full transform transition-all duration-700 ${loading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Note;
