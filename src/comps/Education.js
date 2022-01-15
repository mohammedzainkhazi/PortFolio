import React from 'react'

function Education() {
    return (
        <section className="text-gray-400 bg-gray-900 body-font m-3 rounded-lg">
             <div className="m-5 pl-5">
                <h1 className=" w-1/3 w-sm p-5 pb-1 pl-0 text-white text-left text-lg font-bold">EDUCATION</h1>
                <p className="bg-indigo-900 w-1/3 h-1.5 rounded-lg"></p>
            </div>
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap -mx-4 -my-8">
                <div className="py-8 px-4 lg:w-1/3">
                    <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">2020</span>
                        <span className="font-medium text-lg leading-none text-gray-300 title-font">Present</span>
                    </div>
                    <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-indigo-400 mb-1">ENGINEERING</h2>
                        <h1 className="title-font text-xl font-medium text-white mb-3">MS Ramaiah Institute Of Engineering</h1>
                        <p className="leading-relaxed mb-5"> B.E in Computer Science & Engineering</p>
                        <span className="inline-flex items-center" href="#">
                        <span className="flex-grow flex flex-col pl-3">
                            <span className="title-font font-medium text-white"></span>
                        </span>
                        </span>
                    </div>
                    </div>
                </div>
                <div className="py-8 px-4 lg:w-1/3">
                    <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">2017</span>
                        <span className="font-medium text-lg leading-none text-gray-300 title-font">2020</span>
                    </div>
                    <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-indigo-400 mb-1">DIPLOMA</h2>
                        <h1 className="title-font text-xl font-medium text-white mb-3">D.R.R (GOVT) Polytechnic</h1>
                        <p className="leading-relaxed mb-5">Diploma In Computer Science</p>
                        <span className="inline-flex items-center" href="#">
                        <span className="flex-grow flex flex-col pl-3">
                            <span className="title-font font-medium text-white">Aggregate of 84.5%</span>
                        </span>
                        </span>
                    </div>
                    </div>
                </div>
                <div className="py-8 px-4 lg:w-1/3">
                    <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">2014</span>
                        <span className="font-medium text-lg leading-none text-gray-300 title-font">2017</span>
                    </div>
                    <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-indigo-400 mb-1">SCHOOL</h2>
                        <h1 className="title-font text-xl font-medium text-white mb-3">Bapuji (CBSE) School</h1>
                        <p className="leading-relaxed mb-5">Completed High School </p>
                        <span className="inline-flex items-center">
                        <span className="flex-grow flex flex-col pl-3">
                            <span className="title-font font-medium text-white">CGPA - 9/10</span>
                        </span>
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    </section>
    )
}

export default Education
