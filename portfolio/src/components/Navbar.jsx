function Navbar() {
  return (
    <nav className="bg-[#EEF1F4] border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl text-black tracking-wider font-media-sans">
              Suvansh.
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-14">
            <a
              href="#projects"
              className="text-xl font-medium text-gray-700 hover:text-black transition font-aceh"
            >
              Projects
            </a>

            <a
              href="#skills"
              className="text-xl font-medium text-gray-700 hover:text-black transition font-aceh"
            >
              Skills
            </a>

            <a
              href="#contact"
              className="text-xl font-medium text-gray-700 hover:text-black transition font-aceh"
            >
              Contact Me
            </a>
            
            {/* Resume Button with hover animation */}
            <button
              className="text-xl px-6 py-2 bg-black text-white rounded font-medium font-aceh 
                         transition-all duration-300 ease-in-out
                         hover:px-8 hover:shadow-lg hover:shadow-gray-400/50 
                         transform hover:scale-105"
            >
              Resume
            </button>
          </div>
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar