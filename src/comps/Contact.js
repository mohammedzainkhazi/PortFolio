import React from 'react';

function Contact() {
    return (
        <div className="space-y-8 h-full flex flex-col">
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold text-white">Contact Me</h2>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
                <p className="text-slate-400">Feel free to reach out for collaborations or just a friendly hello!</p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-xl space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <i className="fas fa-map-marker-alt text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Address</h3>
                                <p className="text-slate-400">Davangere, Karnataka - 577006, India</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                                <i className="fas fa-envelope text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Email</h3>
                                <a href="mailto:mohammedzainkhazi@protonmail.com" className="text-slate-400 hover:text-white transition-colors">mohammedzainkhazi@protonmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <i className="fas fa-phone text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Phone</h3>
                                <p className="text-slate-400">+91 9164493673</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com/mohammedzainkhazi/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600 transition-colors">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/rootzain/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://www.instagram.com/zain.khazi/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-500 transition-colors">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="glass-card p-2 rounded-xl h-64 lg:h-auto min-h-[300px] overflow-hidden relative">
                     <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        className="absolute inset-0 rounded-lg filter grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=davangere&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Contact;
