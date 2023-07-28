import './App.css';
import NavBar from './comps/NavBar'
import Note from './comps/Note'
import Projects from './comps/Projects'
import Education from './comps/Education'
import Contact from './comps/Contact'
import Skills from "./comps/Skills"
import "@material-tailwind/react/tailwind.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Resume from './comps/Resume';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import AiChat from './comps/AiChat';



function App() {
  const [resume, setResume] = useState();

  useEffect(() => {
    getDownloadURL(ref(getStorage(), "gs://myblog-296608.appspot.com/Resume/Mohammed's Resume.pdf")).then(url => setResume(url));
  }, [])
  return (
    <div className="App h-screen">
      <Router>
        <div className='sticky top-0 w-full z-[100]'>
          <NavBar resume={resume} />
        </div>
        <Routes>
          <Route element={<Note />} path='/' />
          <Route element={<Note />} exact path='/home' />
          <Route element={<Projects />} exact path='/projects' />
          <Route element={<Skills />} exact path='/skills' />
          <Route element={<Contact />} exact path='/contact' />
          <Route element={<Education />} exact path='/education' />
          <Route element={<Resume url={resume} />} exact path='/resume' />
          <Route element={<AiChat />} exact path='/aichat' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
