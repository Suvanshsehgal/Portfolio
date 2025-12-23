import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contactus from './components/Contactus'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Projects/>
    <Skills/>
    <Experience/>
    <Contactus/>
    <Footer/>
    </>
  )
}

export default App