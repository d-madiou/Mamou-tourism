"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaEnvelope, FaFacebook, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import { FaInstagram, FaWhatsapp } from "react-icons/fa6"
import TouristImage from "../assets/images/Tourist.png"

// Sample data for multiple guides
const guides = [
  {
    id: 1,
    name: "Oumar Diallo",
    role: "Tour Guide",
    image: TouristImage,
    experience: "5 ans",
    languages: ["Français", "Anglais", "Pular"],
    speciality: "Histoire et Culture",
    description:
      "Passionné par l'histoire de Mamou, Oumar vous fera découvrir les secrets et traditions de notre belle région.",
    contact: {
      phone: "+224 12 345 6789",
      email: "oumar.diallo@example.com",
    },
  },
  {
    id: 2,
    name: "Aissatou Bah",
    role: "Guide Touristique",
    image: TouristImage, // Using the same image as placeholder
    experience: "7 ans",
    languages: ["Français", "Anglais", "Soussou"],
    speciality: "Nature et Randonnée",
    description:
      "Spécialiste des sentiers de randonnée et de la faune locale, Aissatou vous emmènera à la découverte des merveilles naturelles de Mamou.",
    contact: {
      phone: "+224 98 765 4321",
      email: "aissatou.bah@example.com",
    },
  },
  {
    id: 3,
    name: "Mamadou Sow",
    role: "Guide Culturel",
    image: TouristImage, // Using the same image as placeholder
    experience: "4 ans",
    languages: ["Français", "Anglais", "Malinké"],
    speciality: "Gastronomie et Artisanat",
    description:
      "Expert en gastronomie locale et artisanat traditionnel, Mamadou vous fera découvrir les saveurs et savoir-faire de Mamou.",
    contact: {
      phone: "+224 55 667 7889",
      email: "mamadou.sow@example.com",
    },
  },
]

function Guide() {
  const [activeGuide, setActiveGuide] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const nextGuide = () => {
    setActiveGuide((prev) => (prev === guides.length - 1 ? 0 : prev + 1))
  }

  const prevGuide = () => {
    setActiveGuide((prev) => (prev === 0 ? guides.length - 1 : prev - 1))
  }

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Nos <span className="text-blue-700">Guides Touristiques</span>
          </h1>
          <div className="flex items-center justify-center space-x-4 w-full max-w-sm mx-auto mt-2">
            <hr className="flex-1 border-t-2 border-blue-200" />
            <div className="w-3 h-3 rounded-full bg-blue-700"></div>
            <hr className="flex-1 border-t-2 border-blue-200" />
          </div>
          <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
            Nos guides expérimentés vous feront découvrir les merveilles de Mamou, son histoire, sa culture et ses
            paysages à couper le souffle.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGuide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-96 md:h-auto overflow-hidden">
                  <motion.img
                    src={guides[activeGuide].image}
                    alt={`${guides[activeGuide].name} - Guide touristique`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:hidden">
                    <h2 className="text-2xl font-bold text-white mb-1">{guides[activeGuide].name}</h2>
                    <p className="text-yellow-400 font-medium">{guides[activeGuide].role}</p>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <div className="hidden md:block">
                    <h2 className="text-3xl font-bold text-blue-900 mb-2">{guides[activeGuide].name}</h2>
                    <p className="text-lg text-blue-700 font-medium mb-6">{guides[activeGuide].role}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Expérience</p>
                      <p className="text-lg font-semibold text-blue-900">{guides[activeGuide].experience}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Spécialité</p>
                      <p className="text-lg font-semibold text-blue-900">{guides[activeGuide].speciality}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Langues parlées</h3>
                    <div className="flex flex-wrap gap-2">
                      {guides[activeGuide].languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className={`text-gray-700 mb-6 relative overflow-hidden ${isExpanded ? "" : "max-h-24"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="leading-relaxed">{guides[activeGuide].description}</p>
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                    )}
                  </motion.div>

                  {guides[activeGuide].description.length > 100 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-700 text-sm font-medium hover:text-blue-800 mb-6 focus:outline-none"
                    >
                      {isExpanded ? "Voir moins" : "Voir plus"}
                    </button>
                  )}

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-center">
                        <FaPhone className="text-blue-700 mr-3" />
                        <span>{guides[activeGuide].contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="text-blue-700 mr-3" />
                        <span>{guides[activeGuide].contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-blue-700 mr-3" />
                        <span>Mamou, Guinée</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-8 space-x-4">
                    <motion.a
                      href="#"
                      whileHover={{ y: -5, backgroundColor: "#1877f2", color: "#ffffff" }}
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-colors"
                    >
                      <FaFacebook />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -5, backgroundColor: "#25D366", color: "#ffffff" }}
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-colors"
                    >
                      <FaWhatsapp />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -5, backgroundColor: "#E4405F", color: "#ffffff" }}
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-colors"
                    >
                      <FaInstagram />
                    </motion.a>
                    <motion.a
                      href={`tel:${guides[activeGuide].contact.phone}`}
                      whileHover={{ y: -5, backgroundColor: "#0077B5", color: "#ffffff" }}
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-colors"
                    >
                      <FaPhone />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevGuide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 bg-white text-blue-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-blue-700 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </motion.button>

          <motion.button
            onClick={nextGuide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 bg-white text-blue-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-blue-700 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </motion.button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {guides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  activeGuide === index ? "bg-blue-700 w-8" : "bg-gray-300 hover:bg-blue-300"
                } transition-all duration-300`}
                onClick={() => setActiveGuide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 transition-colors"
          >
            Réserver un guide
          </motion.button>
          <p className="text-gray-600 mt-4">Réservez dès maintenant pour une expérience inoubliable à Mamou</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Guide
