import { useState } from 'react'


function Navbar() {


  return (
    <nav className="border-b border-gray-300 sticky top-0 z-50">
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
              className="text-lg font-medium text-gray-700 hover:text-black transition font-aceh"
            >
              Projects
            </a>

            <a
              href="#skills"
              className="text-lg font-medium text-gray-700 hover:text-black transition font-aceh"
            >
              Skills
            </a>

            <a
              href="#contact"
              className="text-lg font-medium text-gray-700 hover:text-black transition font-aceh"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar