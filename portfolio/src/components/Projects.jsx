import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import lexportBg from '../assets/Lexport.png'
import lawlensBg from '../assets/LawLens.png'

const projectsData = [
  {
    id: 1,
    title: 'LEX - PORT',
    subtitle: 'AI-powered document generation and management platform with dynamic templates, smart form inputs, and automated document structuring.',
    tags: ['MERN STACK', 'AI INTEGRATION', 'DOCUMENT AUTOMATION', 'FULL STACK'],
    bgImage: lexportBg,
    mockupImage: lexportBg,
    repoLink: '#',
    uiLink: '#'
  },
  {
    id: 2,
    title: 'LAW - LENS',
    subtitle: 'AI-assisted legal research tool that analyzes case data, simplifies legal insights, and enhances decision support using intelligent search and data processing.',
    tags: ['REACT', 'AI POWERED', 'LEGAL TECH', 'DATA PROCESSING'],
    bgImage: lawlensBg,
    mockupImage: lawlensBg,
    repoLink: '#',
    uiLink: '#'
  }
]


function Projects() {
  const [isVisible, setIsVisible] = useState({})
  const cursorRefs = useRef([])
  const sectionRefs = useRef([])

  useEffect(() => {
    const observers = sectionRefs.current.map((section, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [index]: true }))
          }
        },
        { threshold: 0.2 }
      )

      if (section) {
        observer.observe(section)
      }

      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs.current[index]) {
          observer.unobserve(sectionRefs.current[index])
        }
      })
    }
  }, [])

  const handleMouseMove = (e, index) => {
    if (cursorRefs.current[index]) {
      gsap.to(cursorRefs.current[index], {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseEnter = (index) => {
    if (cursorRefs.current[index]) {
      gsap.to(cursorRefs.current[index], {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseLeave = (index) => {
    if (cursorRefs.current[index]) {
      gsap.to(cursorRefs.current[index], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }

  return (
    <>
      {projectsData.map((project, index) => (
        <section
          key={project.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          style={{ cursor: 'none' }}
        >
          {/* Background Image with Dark Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={project.bgImage}
              alt={`${project.title} Background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/85"></div>
          </div>

          {/* Custom Circular Cursor with GSAP */}
          <div
            ref={(el) => (cursorRefs.current[index] = el)}
            className="fixed pointer-events-none z-50 flex items-center justify-center"
            style={{
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
              opacity: 0,
              scale: 0
            }}
          >
            <div className="w-32 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-semibold tracking-wider">
                VIEW PROJECT →
              </span>
            </div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Side - Project Info */}
              <div className="space-y-8">
                {/* Title with Animation */}
                <h2
                  className={` font-media-sans text-6xl lg:text-7xl text-white uppercase tracking-tight leading-none transition-all duration-1000 ${
                    isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: '0.2s' }}
                >
                  {project.title}
                </h2>

                {/* Subtitle with Delay */}
                <p
                  className={` font-aceh text-xl text-gray-300 font-light max-w-4xl transition-all duration-1000 ${
                    isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: '0.4s' }}
                >
                  {project.subtitle}
                </p>

                {/* Tech Stack Tags */}
                <div
                  className={`flex flex-wrap gap-3 transition-all duration-1000 ${
                    isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: '0.6s' }}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div
                  className={`flex gap-4 pt-4 transition-all duration-1000 ${
                    isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: '0.8s' }}
                >
                  <a
                    href={project.repoLink}
                    className="text-lg px-8 py-2.5 bg-white text-black font-aceh rounded
                               transition-all duration-300 ease-in-out
                               hover:px-10 hover:shadow-lg hover:shadow-white/50 
                               transform hover:scale-105 hover:bg-gray-100 "
                  >
                    View Repo
                  </a>
                  <a
                    href={project.uiLink}
                    className="text-lg px-8 py-2.5 bg-transparent border-2 border-white text-white font-aceh rounded
                               transition-all duration-300 ease-in-out
                               hover:px-10 hover:shadow-lg hover:shadow-white/50 
                               transform hover:scale-105 hover:bg-white hover:text-black"
                  >
                    Case Study
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default Projects