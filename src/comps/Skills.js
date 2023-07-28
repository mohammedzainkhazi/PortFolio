
function Skills() {
    return (
    <section className="bg-gray-800 m-5 rounded-lg">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl text-white">
        <div className="m-5 flex flex-col justify-center w-full items-center">
                <h1 className=" w-full w-sm py-5 text-white text-center text-xl font-bold">My Skills</h1>
                <span className="bg-indigo-900 w-1/3 h-1.5 rounded-lg"></span>
            </div>
        </h1>

        <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
          {/* React */}
          <div className="text-center bg-white p-4 shadow-md rounded-lg">
            <i className="fab fa-react text-5xl text-blue-500 mb-4"></i>
            <p className="text-lg font-semibold">React</p>
          </div>

          {/* Firebase */}
          <div className="text-center bg-white p-4 shadow-md rounded-lg">
            <i className="fas fa-fire text-5xl text-yellow-500 mb-4"></i>
            <p className="text-lg font-semibold">Firebase</p>
          </div>

          {/* .NET */}
          <div className="text-center bg-white p-4 shadow-md rounded-lg">
            <i className="fab fa-dot-net text-5xl text-purple-500 mb-4"></i>
            <p className="text-lg font-semibold">.NET</p>
          </div>

          {/* Java */}
          <div className="text-center bg-white p-4 shadow-md rounded-lg">
            <i className="fab fa-java text-5xl text-red-500 mb-4"></i>
            <p className="text-lg font-semibold">Java</p>
          </div>

          {/* Python */}
          <div className="text-center bg-white p-4 shadow-md rounded-lg">
            <i className="fab fa-python text-5xl text-blue-700 mb-4"></i>
            <p className="text-lg font-semibold">Python</p>
          </div>

          {/* MongoDB */}
          <div className="text-center bg-white p-4 shadow-md rounded-lg">
            <i className="fas fa-database text-5xl text-green-500 mb-4"></i>
            <p className="text-lg font-semibold">MongoDB</p>
          </div>

          {/* MySQL */}
          <div className="text-center bg-white p-4 shadow-md rounded-lg">
            <i className="fas fa-database text-5xl text-blue-400 mb-4"></i>
            <p className="text-lg font-semibold">MySQL</p>
          </div>
        </div>
      </div>
    </div>
</section>
    )
}

export default Skills
