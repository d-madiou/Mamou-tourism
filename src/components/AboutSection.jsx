"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { FaAward, FaCheckSquare, FaGlobe, FaInfoCircle, FaLeaf, FaStar, FaUsers } from "react-icons/fa"
import { FaStarHalfStroke } from "react-icons/fa6"
import About1 from "../assets/images/About1.png"
import About2 from "../assets/images/About2.png"
import About3 from "../assets/images/About3.png"
import { Highlight, Logos } from "../assets/mockData"

function AboutSection() {
  const [isInView, setIsInView] = useState(false)
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], [0, -1000])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const aboutElement = document.getElementById("about-content")
    if (aboutElement) {
      observer.observe(aboutElement)
    }

    return () => {
      if (aboutElement) {
        observer.unobserve(aboutElement)
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative">
      <div
        id="about-content"
        className="bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-black relative z-10 rounded-t-[40px] -mt-10"
      >
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4"
                variants={itemVariants}
              >
                À PROPOS DE MAMOU
              </motion.span>

              <motion.h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-900" variants={itemVariants}>
                Une Ville <span className="text-yellow-500">paradisiaque</span>
              </motion.h2>

              <motion.p className="text-lg text-gray-700 mb-8 leading-relaxed" variants={itemVariants}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </motion.p>

              <motion.div className="grid grid-cols-2 gap-6 mb-8" variants={containerVariants}>
                <motion.div
                  className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                  variants={itemVariants}
                >
                  <div className="flex items-center mb-2">
                    <FaUsers className="text-blue-700 mr-2 text-xl" />
                    <h3 className="text-2xl font-bold text-blue-700">10,000+</h3>
                  </div>
                  <p className="text-gray-700">Personnes qui ont visité Mamou</p>
                </motion.div>

                <motion.div
                  className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                  variants={itemVariants}
                >
                  <div className="flex items-center mb-2">
                    <FaGlobe className="text-blue-700 mr-2 text-xl" />
                    <h3 className="text-2xl font-bold text-blue-700">90%</h3>
                  </div>
                  <p className="text-gray-700">Personnes apprecient Mamou</p>
                </motion.div>

                <motion.div
                  className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                  variants={itemVariants}
                >
                  <div className="flex items-center mb-2">
                    <FaAward className="text-blue-700 mr-2 text-xl" />
                    <h3 className="text-2xl font-bold text-blue-700">Top 100</h3>
                  </div>
                  <p className="text-gray-700">Tourism destination</p>
                </motion.div>

                <motion.div
                  className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                  variants={itemVariants}
                >
                  <h3 className="text-xl flex mb-2 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfStroke />
                  </h3>
                  <p className="text-gray-700">Rating</p>
                </motion.div>
              </motion.div>

              <motion.button
                className="bg-blue-700 flex text-white px-6 py-3 rounded-full items-center hover:bg-blue-800 transition duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaInfoCircle className="mr-2" />
                En savoir plus
              </motion.button>
            </motion.div>

            <motion.div
              className="relative h-[500px]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.img
                src={About1}
                alt="About1"
                className="absolute top-0 left-0 w-3/4 rounded-2xl shadow-2xl border-4 border-white z-10"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
              />

              <motion.img
                src={About3}
                alt="About3"
                className="absolute top-1/4 right-0 w-2/3 rounded-2xl shadow-2xl border-4 border-white z-20"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.03 }}
              />

              <motion.div
                className="absolute top-1/2 left-1/4 bg-green-600 p-6 text-white rounded-2xl shadow-xl z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ scale: 1.1, rotate: 3 }}
              >
                <FaLeaf className="mb-3 text-2xl" />
                <p className="font-semibold">Notre Culture, notre Identité</p>
              </motion.div>

              <motion.img
                src={About2}
                alt="About2"
                className="absolute bottom-0 left-1/4 w-3/4 rounded-2xl shadow-2xl border-4 border-white z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.03 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-blue-900 leading-tight">
                Une culture authentique où la beauté ne connaît pas de
                <span className="text-yellow-500"> limite</span>
              </h2>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
                pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit.
              </p>
            </div>

            <div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Highlight.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start p-4 bg-blue-50 rounded-lg hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ y: -5, backgroundColor: "#EFF6FF" }}
                  >
                    <FaCheckSquare className="mr-3 text-blue-700 w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-base md:text-lg text-gray-700">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logos Section with Infinite Scroll */}
      <div className="relative bg-blue-700 py-8 overflow-hidden">
        <motion.div className="flex space-x-16 items-center" style={{ x }}>
          {[...Logos, ...Logos].map((logo, index) => (
            <motion.div key={index} className="flex items-center space-x-3 min-w-[200px]" whileHover={{ scale: 1.1 }}>
              <img src={logo.logo || "/placeholder.svg"} alt="Logo" className="w-12 h-12 object-contain" />
              <p className="text-xl font-bold text-white whitespace-nowrap">{logo.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AboutSection
