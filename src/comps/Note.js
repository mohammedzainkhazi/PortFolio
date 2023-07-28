import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import photo from "../img/pic.jpg";

// Create a reference with an initial file path and name

function Note() {
  const [pic, setPic] = useState(photo)
  const storage = getStorage();
  async function getImage() {
    await getDownloadURL(ref(storage, 'gs://myblog-296608.appspot.com/profilePic/pf.png')).then(url => setPic(url))
  }
  getImage();
  return (
    <div className="m-3 rounded-lg bg-gray-900">
      <section className="text-gray-400 body-font text-center items-center rounded-lg">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col text-center items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10" >
            <img className="object-cover object-center rounded-lg" style={{ borderRadius: "20px" }} alt="hero" src={pic} />
          </div>
          <div className="mb-2 lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Mohammed Zain Khazi 👑
            </h1>
            <p className="mb-3 leading-relaxed">As a Full Stack Web Developer, my primary focus is on crafting distinctive and visually appealing front-end elements for websites and web applications. I'm dedicated to creating components and features that are not only functional but also engaging for end users and clients. My commitment extends to ensuring that the websites and web apps I develop maintain consistent visibility and functionality across a wide range of web browsers, both on desktop and mobile devices.</p>
            <p className="text-white">Full Stack Web Developer</p>
            <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-2 mb-6"></span>
            <div className="flex justify-center mt-3">
              <a href="https://github.com/mohammedzainkhazi/" ><button className="inline-flex text-white font-bold bg-gray-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">GitHub</button></a>
              <a href="https://www.linkedin.com/in/rootzain/" ><button style={{ backgroundColor: "#0E76A8" }} className="ml-4 font-bold inline-flex text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">LinkedIn</button></a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Note
