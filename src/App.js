import './App.css';
import NavBar from './comps/NavBar'
import Note from './comps/Note'
import Cards from './comps/Cards'
import Education from './comps/Education'
import Contact from './comps/Contact'
import Footer from './comps/Footer'
import "@material-tailwind/react/tailwind.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Resume from './comps/Resume';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";


function App() {
  const [resume,setResume] = useState();

  useEffect( async () => {
    await getDownloadURL(ref(getStorage(), "gs://myblog-296608.appspot.com/Resume/Mohammed's Resume.pdf")).then(url=>setResume(url));
  }, [])
  return (
    <div className="App h-screen">
      <Router>
      <div className='sticky top-0 w-full z-[100]'><NavBar resume={resume}/></div>
        <Routes>
        <Route element={<Note />} path='/'/>
        <Route element={<Note />} exact path='/home'/>
        <Route element={<Cards />} exact path='/projects'/>
        <Route element={<Contact />} exact path='/contact'/>
        <Route element={<Education />} exact path='/education'/>
        <Route element={<Resume url={resume}/>} exact path='/resume'/>
        </Routes>
      {/* <div className='fixed w-full bottom-0'><Footer/></div>  */}
      </Router> 
    </div>
  );
}

export default App;
