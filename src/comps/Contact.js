import React from 'react'
import Footer from './Footer'

function Contact() {
    return (
        <section id="contact" className="text-gray-400 bg-gray-900 body-font relative m-5 rounded-lg">
            <div className="m-5 pl-5">
                <h1 className=" w-1/3 w-sm p-5 pb-1 pl-0 text-white text-left text-lg font-bold">CONTACT</h1>
                <p className="bg-indigo-900 w-1/3 h-1.5 rounded-lg"></p>
            </div>
            <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap justify-center flex-wrap mb-5 border-b border-5 border-indigo-900">
                    
                <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-center relative">
                <iframe width="100%" height="100%" title="map" className="absolute inset-0" frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" style={{filter : "grayscale(1) contrast(1.2) opacity(0.16)"}}></iframe>
                <div className="bg-gray-900 relative flex justify-center items-center flex-wrap py-6 rounded shadow-md">
                    <div className="lg:w-1/2 px-6">
                    <h2 className="title-font font-semibold text-white tracking-widest text-xs">ADDRESS</h2>
                    <p className="mt-1">3rd Main 12th Cross,
                    <br></br>
                    Vinobanagar, Davangere - 577006</p>
                    </div>
                    <div className="lg:w-1/2 pl-10 pr-10 mt-4 lg:mt-0">
                    <h2 className="title-font font-semibold text-white tracking-widest text-xs">EMAIL</h2>
                    <p className="text-indigo-400 leading-relaxed">mohammedzainkhazi@protonmail.com</p>
                    <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">PHONE</h2>
                    <p className="leading-relaxed">+91 9164493673</p>
                    </div>
                </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
}

export default Contact
