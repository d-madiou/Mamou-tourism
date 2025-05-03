import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import {
  FaChevronDown,
  FaFacebookF,
  FaInfoCircle,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaWhatsapp
} from 'react-icons/fa'
import ImageMamou from '../assets/images/Mamou1.png'
import ImageMamou3 from '../assets/images/Mamou3.png'
import AboutSection from '../components/AboutSection'
import Banner from '../components/Banner'
import Gallery from '../components/Galley'
import Guide from '../components/Guide'
import NavBar from '../components/NavBar'
import PopularActivity from '../components/PopularActivity'

function Home() {
  const [currentImage, setCurrentImage] = useState(ImageMamou)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === ImageMamou ? ImageMamou3 : ImageMamou
      )
    }, 5000) // Change image every 5 seconds

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToContent = () => {
    const contentElement = document.getElementById('about-section')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full overflow-hidden">
      <div style={{ fontFamily: 'var(--font)' }} className='relative'>
        {/* Hero Section with Parallax Effect */}
        <div 
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden "
        >
          <motion.img 
            src={currentImage} 
            alt="Mamou Background" 
            className="absolute w-full h-full object-cover animate-zoom"
            initial={{ scale: 1 }}
            animate={{ 
              scale: 1.1,
              y: scrollY * 0.2 // Parallax effect
            }}
            transition={{ 
              scale: { duration: 5, ease: "easeInOut" },
              y: { duration: 0.1, ease: "linear" }
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
            <NavBar/>
            
            <motion.div 
              className='mt-8 px-4 max-w-5xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className='flex space-x-6 justify-center mb-6'>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, backgroundColor: "#ffffff", color: "#1877f2", y: -5 }}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300'
                >
                  <FaFacebookF />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, backgroundColor: "#ffffff", color: "#25D366", y: -5 }}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300'
                >
                  <FaWhatsapp />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, backgroundColor: "#ffffff", color: "#0077b5", y: -5 }}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300'
                >
                  <FaLinkedinIn />
                </motion.a>
              </div>
              
              <motion.h1 
                className='text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Découvrez la beauté et la nature de la ville de 
                <span className="text-yellow-400"> Mamou</span>
              </motion.h1>
              
              <motion.p 
                className='text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className='flex flex-col sm:flex-row items-center justify-center gap-4'
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='bg-yellow-500 text-black py-3 px-8 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:bg-yellow-400 transition duration-300'
                >
                  <FaInfoCircle />
                  <span>En savoir plus</span>
                </motion.button>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center space-x-2 bg-transparent border border-white/50 backdrop-blur-sm py-3 px-8 rounded-full hover:bg-white/10 transition duration-300'
                >
                  <FaMapMarkerAlt className="text-yellow-400" />
                  <span>Visiter Mamou</span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ 
                opacity: { delay: 1.5, duration: 1 },
                y: { repeat: Infinity, duration: 1.5 }
              }}
              onClick={scrollToContent}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2">Découvrir</span>
                <FaChevronDown className="text-yellow-400" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Rest of the components */}
        <div id="about-section">
          <AboutSection/>
        </div>
        <PopularActivity/>
        <Banner/>
        <Guide/>
        <Gallery/>
      </div>
    </div>
  )
}

export default Home
