"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { FaArrowRight, FaInfoCircle } from "react-icons/fa"
import ImageMamou from "../assets/images/Mamou1.png"
import { Link } from "react-router-dom"

function Banner() {
  const [isInView, setIsInView] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const bannerElement = document.getElementById("banner-section")
    if (bannerElement) {
      observer.observe(bannerElement)
    }

    return () => {
      if (bannerElement) {
        observer.unobserve(bannerElement)
      }
    }
  }, [])

  return (
    <div id="banner-section" className="mt-16 mb-16 overflow-hidden">
      <div className="relative h-[500px] w-full">
        <motion.div
          style={{
            backgroundImage: `url(${ImageMamou})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y,
          }}
          className="absolute inset-0 w-full h-[100%]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h3
              className="text-lg mb-3 text-yellow-400 font-semibold uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Découvre Mamou
            </motion.h3>

            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Beauté Infinie <span className="text-yellow-400">&</span> Charme Naturel
            </motion.h2>

            <motion.p
              className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-gray-200"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explorez une destination où l'aventure et la tranquillité se rencontrent. Que ce soit pour une randonnée à travers des 
              paysages à couper le souffle ou pour un moment de quiétude, Mamou offre une expérience inoubliable.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 text-blue-900 py-3 px-8 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:bg-yellow-400 transition duration-300"
              >
                <FaInfoCircle />
                <span>En savoir plus</span>
              </motion.button>

              <motion.Link to="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-white py-3 px-8 rounded-full font-semibold flex items-center space-x-2 hover:bg-white/10 transition duration-300"
              >
                <span>Visiter Mamou</span>
                <FaArrowRight />
              </motion.Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Banner
