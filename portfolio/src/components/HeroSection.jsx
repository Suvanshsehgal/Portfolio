import profileImage from '../assets/profile.png'
import githubIcon from '../assets/GitHub.svg'
import twitterIcon from '../assets/X.svg'
import instagramIcon from '../assets/Instagram.svg'
import linkedinIcon from '../assets/Linkedin.svg'

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-3 -mt-20 pt-12">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Social Icons – Non-fixed */}
        <div className="flex flex-col justify-center lg:justify-start gap-6 mb-8 lg:mb-0 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 ml-8">
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
          {/* Text Content */}
          <div className="flex-1 max-w-3xl lg:pl-16 text-left lg:text-left font-aceh">
            <p className="text-2xl mb-3 text-center">
              Hi, I am <span className="font-bold">Suvansh Sehgal, I am a</span>
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-8xl leading-none mb-2 font-media-sans">
              Developer
            </h1>

            <h2 className="text-5xl md:text-6xl lg:text-8xl leading-none mb-6 font-media-sans">
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '2px black' }}
              >
                &Designer
              </span>
            </h2>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
                About Me
              </button>
              <button className="px-8 py-3 border-2 border-black rounded hover:bg-black hover:text-white transition">
                Resume
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0">
            <div className="w-72 h-[28rem] md:w-96 md:h-[32rem] lg:w-[28rem] lg:h-[36rem] relative lg:translate-x-20 ">
              <img
                src={profileImage}
                alt="Suvansh Sehgal"
                className="w-full h-full object-cover rounded-t-full"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 60%, transparent 100%)',
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
