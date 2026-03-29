"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { FaArrowRight, FaInfoCircle } from "react-icons/fa"
import ImageMamou from "../assets/images/Mamou1.png"
import { Link } from "react-router-dom"

function Banner() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll()
  
  // Parallax effect: moves the image down by 300px as the user scrolls
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div 
      id="banner-section" 
      ref={sectionRef} 
      className="mt-16 mb-16 overflow-hidden relative h-[80vh] min-h-[600px] w-full"
    >
      {/* PARALLAX FIX: 
        To prevent the black gap at the top when 'y' translates down by 300px, 
        we start the image 300px higher (-top-[300px]) and make it 300px taller. 
        This guarantees the image always covers 100% of the container.
      */}
      <motion.div
        style={{
          backgroundImage: `url(${ImageMamou})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y,
        }}
        className="absolute left-0 right-0 top-[-300px] h-[calc(100%+300px)] w-full"
      />

      {/* Premium Color Overlay: A deep, rich sapphire/navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-900/70 to-blue-800/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-blue-900/20" /> {/* Subtle brightness boost */}

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Eyebrow Subtitle */}
          <motion.h3
            className="text-sm mb-4 text-amber-400 font-semibold uppercase tracking-[0.25em]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Découvre Mamou
          </motion.h3>

          {/* Main Headline */}
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Beauté Infinie <span className="text-amber-400 font-serif italic font-medium">&</span> Charme Naturel
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-gray-100 font-light leading-relaxed drop-shadow"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Explorez une destination où l'aventure et la tranquillité se rencontrent. Que ce soit pour une randonnée à travers des 
            paysages à couper le souffle ou pour un moment de quiétude, Mamou offre une expérience inoubliable.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Primary CTA: Rich Gold */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group bg-amber-500 text-blue-950 py-4 px-9 rounded-full font-semibold text-sm tracking-wide flex items-center space-x-3 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all duration-300"
            >
              <FaInfoCircle className="text-blue-900" />
              <span>En savoir plus</span>
            </motion.button>

            {/* Secondary CTA: Transparent with solid hover state */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link 
                to="/about"
                className="group border border-white/60 text-white py-4 px-9 rounded-full font-semibold text-sm tracking-wide flex items-center space-x-3 hover:bg-white hover:text-blue-950 transition-all duration-300"
              >
                <span>Visiter Mamou</span>
                <FaArrowRight className="text-white group-hover:text-blue-950 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Banner