import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { GridPattern } from "./ui/GridPattern"

import profileImage from '../assets/profile.png'
import githubIcon from '../assets/GitHub.svg'
import twitterIcon from '../assets/X.svg'
import instagramIcon from '../assets/Instagram.svg'
import linkedinIcon from '../assets/Linkedin.svg'

function HeroSection() {

  const devFilled = useRef()
  const devOutline = useRef()
  const desFilled = useRef()
  const desOutline = useRef()

  useEffect(() => {
    // initial state
    gsap.set(devFilled.current, { opacity: 1, scale: 1 })
    gsap.set(devOutline.current, { opacity: 0, scale: 0.98 })

    gsap.set(desFilled.current, { opacity: 0, scale: 0.98 })
    gsap.set(desOutline.current, { opacity: 1, scale: 1 })
  }, [])

  const activateDev = () => {
    gsap.to(devFilled.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" })
    gsap.to(devOutline.current, { opacity: 0, scale: 0.98, duration: 0.35, ease: "power3.out" })

    gsap.to(desFilled.current, { opacity: 0, scale: 0.98, duration: 0.35, ease: "power3.out" })
    gsap.to(desOutline.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" })
  }

  const activateDes = () => {
    gsap.to(desFilled.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" })
    gsap.to(desOutline.current, { opacity: 0, scale: 0.98, duration: 0.35, ease: "power3.out" })

    gsap.to(devFilled.current, { opacity: 0, scale: 0.98, duration: 0.35, ease: "power3.out" })
    gsap.to(devOutline.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" })
  }


  return (
    <section className="relative min-h-screen flex items-center px-3 pt-24 md:pt-20 lg:pt-12 overflow-hidden">
      <GridPattern
        width={20}
        height={20}
        className="absolute inset-0"
      />
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Social Icons - Mobile/Tablet */}
        <div className="flex gap-4 justify-center items-center mb-6 lg:hidden">
          {[
            { href: 'https://github.com', icon: githubIcon, alt: 'GitHub' },
            { href: 'https://twitter.com', icon: twitterIcon, alt: 'Twitter' },
            { href: 'https://instagram.com', icon: instagramIcon, alt: 'Instagram' },
            { href: 'https://linkedin.com', icon: linkedinIcon, alt: 'LinkedIn' },
          ].map(({ href, icon, alt }) => (
            <a
              key={alt}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img src={icon} alt={alt} className="w-7 h-7" />
            </a>
          ))}
        </div>

        {/* Social Icons - Desktop */}
        <div className="hidden lg:flex lg:flex-col lg:gap-6 lg:absolute lg:-left-4 lg:top-1/2 lg:-translate-y-[70%]">
          {[
            { href: 'https://github.com', icon: githubIcon, alt: 'GitHub' },
            { href: 'https://twitter.com', icon: twitterIcon, alt: 'Twitter' },
            { href: 'https://instagram.com', icon: instagramIcon, alt: 'Instagram' },
            { href: 'https://linkedin.com', icon: linkedinIcon, alt: 'LinkedIn' },
          ].map(({ href, icon, alt }) => (
            <a
              key={alt}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img src={icon} alt={alt} className="w-8 h-8" />
            </a>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* Text Section */}
          <div className="flex-1 max-w-3xl lg:pl-16 text-center lg:text-left font-aceh relative">


            <p className="text-lg sm:text-lg md:text-2xl mb-3 text-center">
              Hi, I am <span className="font-bold">Suvansh Sehgal, I am a</span>
            </p>

            {/* Developer */}
            <h1
              className="text-6xl sm:text-7xl md:text-6xl lg:text-8xl leading-none mb-2 font-media-sans
              relative inline-block cursor-pointer"
              onMouseEnter={activateDev}
            >
              {/* Filled */}
              <span ref={devFilled} className="absolute left-0 top-0">
                Developer
              </span>

              {/* Outlined */}
              <span
                ref={devOutline}
                style={{ WebkitTextStroke: "2px black", color: "transparent" }}
              >
                Developer
              </span>
            </h1>

            {/* Designer */}
            <h2
              className="text-6xl sm:text-7xl md:text-6xl lg:text-8xl leading-none mb-4 font-media-sans
              lg:translate-x-10 relative inline-block cursor-pointer"
              onMouseEnter={activateDes}
            >
              {/* Filled */}
              <span ref={desFilled} className="absolute left-0 top-0">
                &Designer
              </span>

              {/* Outlined */}
              <span
                ref={desOutline}
                style={{ WebkitTextStroke: "2px black", color: "transparent" }}
              >
                &Designer
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 mb-6 text-center lg:text-left font-aceh
              max-w-[90%] sm:max-w-full mx-auto lg:mx-0">
              Solving real-world problems through thoughtful design and engineering.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <button className="px-6 py-2 text-sm sm:px-8 sm:text-base lg:px-10 bg-black text-white rounded font-medium font-aceh
             transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-400/50 transform hover:scale-105">
                Projects
              </button>

              <button className=" px-6 py-2 text-sm sm:px-8 sm:text-base lg:px-10 bg-transparent text-black border-2 border-black rounded font-medium font-aceh
                  transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-400/50 transform hover:scale-105">
                Contact
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0">
            <div className="w-72 h-[26rem] sm:w-72 sm:h-[26rem] md:w-80 md:h-[28rem] lg:w-[28rem] lg:h-[36rem] relative  -translate-y-10
              sm:translate-y-0 lg:translate-x-20 mx-auto lg:mx-0 ">
              <img
                src={profileImage}
                alt="Suvansh Sehgal"
                className="w-full h-full object-cover rounded-t-full"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
