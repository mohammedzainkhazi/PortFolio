import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Layout from './comps/Layout';
import Note from './comps/Note';
import Projects from './comps/Projects';
import Skills from "./comps/Skills";
import Contact from './comps/Contact';
import Education from './comps/Education';
import Resume from './comps/Resume';
import AiChat from './comps/AiChat';
import './App.css';

function App() {
  const [resume, setResume] = useState();

  useEffect(() => {
    // Keep the existing logic to fetch resume
    const fetchResume = async () => {
        try {
            const url = await getDownloadURL(ref(getStorage(), "gs://myblog-296608.appspot.com/Resume/Mohammed's Resume.pdf"));
            setResume(url);
        } catch (error) {
            console.error("Error fetching resume:", error);
        }
    }
    fetchResume();
  }, [])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Note />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/education' element={<Education />} />
          <Route path='/resume' element={<Resume url={resume} />} />
          <Route path='/aichat' element={<AiChat />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
