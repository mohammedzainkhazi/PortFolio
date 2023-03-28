import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 z-10">
      <div className="flex items-center flex-shrink-0 text-white z-10" data-aos="fade-up">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ52FTipbifVf2ZsF3k06sKtl9PDSUkvxaypDKe1y2a1sxiA46VgoS9TZAMsangaUAs4Q&usqp=CAU"
          className=" mr-5 h-10 rounded-full" alt="criminalImage"
        />
        <span className="font-semibold text-xl tracking-tight">AI CRIMINAL DETECTOR</span>
      </div>
      <div className="block lg:hidden z-10" onClick={() => setOpen(!open)} >
        <button className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:justify-end lg:items-end lg:w-auto ${!open && 'hidden'}`}>
        <div className="text-sm lg:flex-grow lg:flex lg:justify-end lg:items-end">
          {
            ['home','select','search','history','team'].map((link,i)=>(
              <Link to={link} onClick={() => setOpen(!open)} key={i}>
              <a href="#responsive-header" className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4 px-4 hover:bg-gray-200 py-2 rounded-lg ${location.pathname === '/'+link && 'bg-white text-black'}`}>
                {link.toUpperCase()}
              </a>
            </Link>
            ))
          }
        </div>
      </div>
    </nav>
  );
}

export default Nav;
