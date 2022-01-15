import React from 'react'

function Card(props) {
    return (
        <a href={props.link} className="xl:w-1/4 md:w-1/2 p-4" target="_blank" rel="noreferrer">
        <div className="bg-gray-800 p-6 rounded-lg">
          <img className="h-40 rounded-lg w-full object-cover object-center mb-6" src={props.img} alt="content"/> 
          <p className="tracking-widest text-green-500 text-xs font-medium title-font"></p>
          <h2 className="text-lg text-white font-medium title-font mb-4">{props.title}</h2>
          <p className="leading-relaxed text-base">{props.desc}</p>
          {
            props.link ? <div className="mt-2 mb-0 text-green-400">VIEW</div> : <div></div>
          }
        </div>
        </a>
    )
}

export default Card
