import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Projects from './components/Projects'
import Drag from './components/Drag'
import Experience from './components/Experience'
import Contactus from './components/Contactus'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
    <Navbar/>
    <HeroSection/>
    <Projects/>
    <Drag/>
    <Experience/>
    <Contactus/>
    <Footer/>
    </div>
  )
}

export default App