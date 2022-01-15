import './App.css';
import Main from './comps/Main'
import Note from './comps/Note'
import Cards from './comps/Cards'
import Education from './comps/Education'
import Contact from './comps/Contact'
import Footer from './comps/Footer'
import "@material-tailwind/react/tailwind.css";


function App() {
  return (
    <div className="App">
      <div><Main/></div>
      <div id="Home" ><Note/></div>
      <div id="Projects" ><Cards/></div>
      <div id="Education" ><Education/></div>
      <div id="Contact" ><Contact/></div>
      <div><Footer/></div>  
    </div>
  );
}

export default App;
