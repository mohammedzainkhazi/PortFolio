import React from 'react'
import msrit from "../images/msrit.png"

function Education() {
    return (
    <section className="bg-white bg-gray-900 m-5 rounded-lg">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl text-white">
        <div className="m-5 flex flex-col justify-center w-full items-center">
                <h1 className=" w-1/3 w-sm p-5 text-white text-center text-lg font-bold">EDUCATION</h1>
                <span className="bg-indigo-900 w-1/3 h-1.5 rounded-lg"></span>
            </div>
        </h1>

        <div className="flex lg:flex-row flex-col justify-around items-center  w-full gap-8 mt-8 xl:mt-16">
            <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-blue-600 border-gray-700 hover:border-transparent">
                <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src={msrit} alt=""/>

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize text-white group-hover:text-white">B.E - Computer Science & Engineering</h1>

                <p className="mt-2 text-gray-500 capitalize text-gray-300 group-hover:text-gray-300">MS RAMAIAH INSTIUTE OF TECHNOLOGY</p>

                <div className="flex mt-3 -mx-2">
                    CGPA - 8.02
                </div>
            </div>

            <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-blue-600 border-gray-700 hover:border-transparent">
                <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src="https://gpt.karnataka.gov.in/drrgptdavanagere/public/uploads/dept_logo1650214282.gif" alt=""/>

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize text-white group-hover:text-white">Diploma in Computer Science</h1>

                <p className="mt-2 text-gray-500 capitalize text-gray-300 group-hover:text-gray-300">DRR GOVT POLYTECHNIC DAVANGERE</p>

                <div className="flex mt-3 -mx-2">
                    Percentage - 84.5
                </div>
            </div>

            <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-blue-600 border-gray-700 hover:border-transparent">
                <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src="https://pbs.twimg.com/profile_images/1161585123386466304/RwO5UbFy_400x400.jpg" alt=""/>

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize text-white group-hover:text-white">Class Xth (CBSE) </h1>

                <p className="mt-2 text-gray-500 capitalize text-gray-300 group-hover:text-gray-300">BAPUJI HPEMS DAVANGERE</p>

                <div className="flex mt-3 -mx-2">
                    CGPA - 9.0
                </div>
            </div>
        </div>
    </div>
</section>
    )
}

export default Education
