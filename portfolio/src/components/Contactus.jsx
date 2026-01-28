import { RetroGrid } from './ui/RetroGrid'
import { InteractiveHoverButton } from './ui/InteractiveHoverButton'

function Contactus() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <RetroGrid />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight font-media-sans">
          Lets Build Something
          <br />
          Together
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl  max-w-2xl mx-auto font-aceh">
          Have a idea, opportunity, or just want to say hi?
        </p>
        <p className="text-gray-400 text-lg md:text-xl mb-12 font-aceh">
          My inbox is always open
        </p>
        
        <div className="mb-20 flex justify-center">
          <InteractiveHoverButton text="Get In Touch" />
        </div>
        
        <div className="flex justify-center items-center gap-12 md:gap-20 text-xl md:text-2xl">
          <a href="#" className="group relative text-gray-300 hover:text-white transition-all duration-500 ease-in-out inline-flex items-center gap-2 pb-2">
            Twitter
            <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </a>
          <a href="#" className="group relative text-gray-300 hover:text-white transition-all duration-500 ease-in-out inline-flex items-center gap-2 pb-2">
            Linkedin
            <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </a>
          <a href="#" className="group relative text-gray-300 hover:text-white transition-all duration-500 ease-in-out inline-flex items-center gap-2 pb-2">
            Instagram
            <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contactus