import { useState, useEffect } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[40%] max-w-4xl">
        <div className={`transition-all duration-300 rounded-xl ${
          isScrolled 
            ? 'bg-[#3d3d3d] shadow-lg' 
            : 'bg-[#3d3d3d]'
        }`}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-12 sm:h-12 lg:h-14">
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <h1 className="text-lg sm:text-xl text-white tracking-wider font-media-sans">
                suvansh.
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <a
                href="#projects"
                className="text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-all duration-300 font-aceh relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="#skills"
                className="text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-all duration-300 font-aceh relative group"
              >
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="#contact"
                className="text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-all duration-300 font-aceh relative group"
              >
                Contact Me.
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Resume Button */}
              <button
                className="text-sm lg:text-base px-3 lg:px-5 py-1.5 bg-white text-black rounded-lg font-medium font-aceh 
                           transition-all duration-300 ease-in-out
                           hover:shadow-lg hover:shadow-gray-700/50 
                           transform hover:scale-105 hover:bg-gray-100"
              >
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-50">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-600/50 transition-all duration-300"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
              
                <div className="w-5 h-5 relative">
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out translate-y-2.5 ${
                      isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-5'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* Responsive */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 mt-2 transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-[#3d3d3d]/95 backdrop-blur-md shadow-lg rounded-xl">
            <div className="px-3 py-4 space-y-2">
              <a
                href="#projects"
                onClick={closeMenu}
                className="block text-base font-medium text-gray-300 hover:text-white transition-all duration-300 font-aceh py-2 px-3 rounded-lg hover:bg-gray-600/50 relative group"
              >
                Projects
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-8"></span>
              </a>

              <a
                href="#skills"
                onClick={closeMenu}
                className="block text-base font-medium text-gray-300 hover:text-white transition-all duration-300 font-aceh py-2 px-3 rounded-lg hover:bg-gray-600/50 relative group"
              >
                Skills
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-8"></span>
              </a>

              <a
                href="#contact"
                onClick={closeMenu}
                className="block text-base font-medium text-gray-300 hover:text-white transition-all duration-300 font-aceh py-2 px-3 rounded-lg hover:bg-gray-600/50 relative group"
              >
                Contact Me.
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-8"></span>
              </a>
              
              {/* Mobile Resume Button */}
              <div className="pt-2 px-3">
                <button
                  onClick={closeMenu}
                  className="w-full text-base px-4 py-2 bg-white text-black rounded-lg font-medium font-aceh 
                             transition-all duration-300 ease-in-out
                             hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-700/50 
                             transform hover:scale-105"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay  */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}
    </>
  )
}

export default Navbar