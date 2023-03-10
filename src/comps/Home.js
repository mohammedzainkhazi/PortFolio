import Typewriter from 'typewriter-effect';
import { GitHub } from '@mui/icons-material';
import React from 'react';

function Home(props) {
    return (
        <section className="text-gray-600 body-font bg-[black] h-screen"> 
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col-reverse items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center" data-aos="fade-right">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white text-left">
                        <div className='flex flex-row my-0 py-0'>
                        <Typewriter
                            options={{
                                strings: ['Detect ', 'Recognise ','Track '],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                        <span>The Criminal</span>
                        </div>
                        <span className='pt-5'>It takes a Moment to Start</span>
                    </h1>
                    <p className="mb-8 leading-relaxed text-gray-500 text-lg">Provide an Image of a Criminal and some probable videos where criminal may present, This app will detect and track the criminal with the power of AI.</p>
                    <div className="flex justify-center gap-3">
                        <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:opacity-[1] opacity-[0.9] rounded text-lg">Get Started</button>
                        <button className="inline-flex text-gray-800 bg-gray-300 border-0 py-2 px-6 focus:outline-none hover:opacity-[1] opacity-[0.9] rounded text-lg">Contribute <GitHub className='ml-3' /></button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6" data-aos="fade-up">
                    <img className="object-cover object-center rounded" alt="hero" src={props.bg} />
                </div>
            </div>
        </section>
    )
}

export default Home