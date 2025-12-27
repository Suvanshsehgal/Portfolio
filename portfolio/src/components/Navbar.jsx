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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#EEF1F4] shadow-lg border-b border-gray-300/50' 
          : 'bg-[#EEF1F4] border-b border-gray-300'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <h1 className="text-2xl sm:text-3xl text-black tracking-wider font-media-sans">
                Suvansh.
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 lg:gap-14">
              <a
                href="#projects"
                className="text-lg lg:text-xl font-medium text-gray-700 hover:text-black transition-all duration-300 font-aceh relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="#skills"
                className="text-lg lg:text-xl font-medium text-gray-700 hover:text-black transition-all duration-300 font-aceh relative group"
              >
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="#contact"
                className="text-lg lg:text-xl font-medium text-gray-700 hover:text-black transition-all duration-300 font-aceh relative group"
              >
                Contact Me
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Resume Button */}
              <button
                className="text-lg lg:text-xl px-4 lg:px-6 py-2 bg-black text-white rounded font-medium font-aceh 
                           transition-all duration-300 ease-in-out
                           hover:px-6 lg:hover:px-8 hover:shadow-lg hover:shadow-gray-400/50 
                           transform hover:scale-105 hover:bg-gray-800"
              >
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-50">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100/50 transition-all duration-300"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
              
                <div className="w-6 h-6 relative">
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

        {/* Responsive */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-[#EEF1F4]/95 backdrop-blur-md border-b border-gray-300/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#projects"
                onClick={closeMenu}
                className="block text-lg font-medium text-gray-700 hover:text-black transition-all duration-300 font-aceh py-3 px-4 rounded-lg hover:bg-gray-100/50 relative group"
              >
                Projects
                <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-8"></span>
              </a>

              <a
                href="#skills"
                onClick={closeMenu}
                className="block text-lg font-medium text-gray-700 hover:text-black transition-all duration-300 font-aceh py-3 px-4 rounded-lg hover:bg-gray-100/50 relative group"
              >
                Skills
                <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-8"></span>
              </a>

              <a
                href="#contact"
                onClick={closeMenu}
                className="block text-lg font-medium text-gray-700 hover:text-black transition-all duration-300 font-aceh py-3 px-4 rounded-lg hover:bg-gray-100/50 relative group"
              >
                Contact Me
                <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-8"></span>
              </a>
              
              {/* Mobile Resume Button */}
              <div className="pt-4 px-4">
                <button
                  onClick={closeMenu}
                  className="w-full text-lg px-6 py-3 bg-black text-white rounded font-medium font-aceh 
                             transition-all duration-300 ease-in-out
                             hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-400/50 
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