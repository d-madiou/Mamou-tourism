"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa"
import { FaLightbulb } from "react-icons/fa6"
import "../App.css"
import { Activities } from "../assets/mockData"

function PopularActivity() {
  const containerRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  // Calculate max scroll width
  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
      }
    }

    updateMaxScroll()
    window.addEventListener("resize", updateMaxScroll)

    return () => window.removeEventListener("resize", updateMaxScroll)
  }, [])

  // Handle scroll event to update position
  useEffect(() => {
    const handleScrollEvent = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft)
        
        // Calculate active index based on scroll position
        const cardWidth = containerRef.current.firstElementChild?.offsetWidth || 0
        const margin = 16 // 4rem in pixels
        const newIndex = Math.round(containerRef.current.scrollLeft / (cardWidth + margin))
        setActiveIndex(Math.min(newIndex, Activities.length - 1))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScrollEvent)
      return () => container.removeEventListener("scroll", handleScrollEvent)
    }
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScrollEnabled || isHovered) return

    const interval = setInterval(() => {
      if (containerRef.current) {
        const cardWidth = containerRef.current.firstElementChild?.offsetWidth || 0
        const margin = 16 // 4rem in pixels
        const scrollAmount = cardWidth + margin

        if (containerRef.current.scrollLeft + scrollAmount >= maxScroll) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
          setActiveIndex(0)
        } else {
          containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
          setActiveIndex(prev => Math.min(prev + 1, Activities.length - 1))
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [maxScroll, isHovered, autoScrollEnabled])

  const handleScroll = (direction) => {
    if (!containerRef.current) return
    
    const card = containerRef.current.firstElementChild
    const cardWidth = card?.offsetWidth || 0
    const margin = 16 // 4rem in pixels
    const scrollAmount = cardWidth + margin

    const newScrollPosition =
      direction === "left"
        ? Math.max(containerRef.current.scrollLeft - scrollAmount, 0)
        : Math.min(containerRef.current.scrollLeft + scrollAmount, maxScroll)

    containerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    })

    // Update active index
    const newIndex = Math.round(newScrollPosition / scrollAmount)
    setActiveIndex(Math.min(newIndex, Activities.length - 1))
    setScrollPosition(newScrollPosition)
  }

  const scrollToIndex = (index) => {
    if (!containerRef.current) return
    
    const card = containerRef.current.firstElementChild
    const cardWidth = card?.offsetWidth || 0
    const margin = 16 // 4rem in pixels
    const scrollAmount = cardWidth + margin

    const newScrollPosition = index * scrollAmount
    
    containerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    })

    setActiveIndex(index)
    setScrollPosition(newScrollPosition)
  }

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-bold mb-4 text-center">
          Activités <span className="text-blue-700">Populaires</span>
        </h1>
        <div className="flex items-center space-x-4 w-full max-w-sm mt-2">
          <hr className="flex-1 border-t-2 border-blue-200" />
          <motion.div
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <FaLightbulb className="text-2xl text-yellow-500" />
          </motion.div>
          <hr className="flex-1 border-t-2 border-blue-200" />
        </div>
        <p className="text-lg mt-4 text-center text-gray-600 max-w-2xl">
          Concerts passionnants, ateliers, festivals et plus encore - plongez dans un monde d'expériences inoubliables à Mamou!
        </p>
      </motion.div>

      <div className="relative mt-12 max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={containerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-8"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {Activities.map((activity, index) => (
              <motion.div
                key={index}
                className={`snap-start flex-none w-full sm:w-[350px] md:w-[380px] rounded-xl shadow-lg overflow-hidden bg-white 
                  ${activeIndex === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {activity.title}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-blue-900 truncate">
                    {activity.name}
                  </h2>
                  <div className="flex items-center mb-4 flex-wrap gap-2">
                    <span className="text-gray-600 text-sm flex items-center">
                      <FaCalendarAlt className="mr-1.5 text-blue-600" />
                      12 Mars, 2025
                    </span>
                    <span className="text-gray-600 text-sm flex items-center ml-4">
                      <FaMapMarkerAlt className="mr-1.5 text-blue-600" />
                      Mamou
                    </span>
                  </div>
                  <p className="text-gray-700 mb-5 line-clamp-3 leading-relaxed">
                    {activity.description}
                  </p>
                  <motion.div 
                    className="flex items-center text-blue-700 cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-semibold text-sm mr-2">Voir Plus</span>
                    <FaInfoCircle className="group-hover:animate-bounce" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={() => handleScroll("left")}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-700 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 ${
              scrollPosition <= 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:text-white"
            }`}
            disabled={scrollPosition <= 0}
            whileHover={scrollPosition > 0 ? { scale: 1.1 } : {}}
            whileTap={scrollPosition > 0 ? { scale: 0.9 } : {}}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronLeft />
          </motion.button>
          
          <motion.button
            onClick={() => handleScroll("right")}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-700 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 ${
              scrollPosition >= maxScroll ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:text-white"
            }`}
            disabled={scrollPosition >= maxScroll}
            whileHover={scrollPosition < maxScroll ? { scale: 1.1 } : {}}
            whileTap={scrollPosition < maxScroll ? { scale: 0.9 } : {}}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronRight />
          </motion.button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {Activities.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? "bg-blue-700 w-8" : "bg-gray-300 hover:bg-blue-300"
              } transition-all duration-300`}
              onClick={() => scrollToIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Auto-scroll Toggle */}
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
            className={`text-sm px-4 py-2 rounded-full flex items-center ${
              autoScrollEnabled ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{autoScrollEnabled ? "Pause" : "Auto-scroll"}</span>
            <div className={`w-8 h-4 rounded-full ${autoScrollEnabled ? "bg-blue-700" : "bg-gray-300"} relative`}>
              <motion.div
                className="w-3 h-3 bg-white rounded-full absolute top-0.5"
                animate={{ x: autoScrollEnabled ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default PopularActivity

