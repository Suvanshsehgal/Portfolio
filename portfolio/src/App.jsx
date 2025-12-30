import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contactus from './components/Contactus'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#EEF1F4]">
    <Navbar/>
    <HeroSection/>
    <Projects/>
    <Skills/>
    <Experience/>
    <Contactus/>
    <Footer/>
    </div>
  )
}

export default App