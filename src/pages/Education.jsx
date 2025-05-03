"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  AlertCircle,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lightbulb,
  MapPin,
  Search,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Mosaic } from "react-loading-indicators"
import { Link } from "react-router-dom"
import ImageMamou from "../assets/images/Education.png"
import NavBar from "../components/NavBar"

const Education = ({ data = [], loading = false, error = null, schools = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)
  const carouselRef = useRef(null)

  // Categories for filtering
  const categories = ["Tous", "Primaire", "Secondaire", "Supérieur", "Formation"]

  // Auto-advance effect
  useEffect(() => {
    if (schools.length > 0 && !isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % schools.length)
      }, 5000)
    }

    return () => clearInterval(timerRef.current)
  }, [schools.length, isHovered])

  // Reset timer on manual navigation
  const handleSlide = (direction) => {
    clearInterval(timerRef.current)
    setCurrentIndex((prev) => {
      const newIndex =
        direction === "forward" ? (prev + 1) % schools.length : (prev - 1 + schools.length) % schools.length

      // Restart timer after navigation
      if (!isHovered) {
        timerRef.current = setInterval(() => {
          setCurrentIndex((p) => (p + 1) % schools.length)
        }, 5000)
      }

      return newIndex
    })
  }

  // Filter data based on search query and category
  const filteredData = data.filter((item) => {
    const matchesSearch = item.Title?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Tous" || item.category === activeCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Mosaic color="#1d4ed8" size="medium" text="Chargement des données..." textColor="#1d4ed8" />
      </div>
    )

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-50 text-red-700 p-8 rounded-xl shadow-lg max-w-md text-center"
        >
          <AlertCircle className="mx-auto mb-4 h-12 w-12" />
          <h2 className="text-xl font-bold mb-2">Erreur lors du chargement des données d'éducation</h2>
          <p className="mb-4">Veuillez réessayer plus tard ou contacter l'administrateur du site.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    )

  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative text-white">
        <NavBar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-72 md:h-[500px] bg-cover bg-center bg-fixed transition-all duration-700"
          style={{
            backgroundImage: `url(${ImageMamou})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent">
            <div className="container mx-auto h-full flex flex-col justify-center px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl space-y-4"
              >
                <div className="flex items-center gap-3 text-xl md:text-3xl font-bold">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatDelay: 1 }}
                  >
                    <BookOpen className="text-yellow-400" />
                  </motion.div>
                  <h1 className="text-2xl md:text-5xl font-bold tracking-tight">Éducation à Mamou</h1>
                </div>
                <p className="text-base md:text-2xl text-white/90 leading-relaxed">
                  Découvrez comment l'éducation est accessible et valorisée dans notre belle région
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center text-sm text-gray-300 pt-4"
                >
                  <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
                    MamouVille
                  </Link>
                  <span className="mx-2">/</span>
                  <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-yellow-400">Education</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 -mt-12 relative z-10 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Articles Grid Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Actualités <span className="text-blue-700">Éducatives</span>
          </h2>
          <div className="flex items-center space-x-4 w-full max-w-sm mt-3">
            <hr className="flex-1 border-t-2 border-gray-300" />
            <BookOpen className="text-blue-700" />
            <hr className="flex-1 border-t-2 border-gray-300" />
          </div>
          <p className="text-lg mt-3 text-center text-gray-600 max-w-lg">
            Découvrez les dernières actualités sur l'éducation à Mamou
          </p>
        </motion.div>

        {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-blue-50 inline-block p-6 rounded-full mb-4">
              <Search className="h-12 w-12 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Aucun article ne correspond à votre recherche. Essayez d'autres termes ou catégories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("Tous")
              }}
              className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300"
            >
              Réinitialiser la recherche
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id || index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className={`group ${index === 0 ? "sm:col-span-2 row-span-2" : ""}`}
              >
                <Link to={`/blog/education/${item.id}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full overflow-hidden rounded-xl shadow-md hover:shadow-xl"
                  >
                    <img
                      src={
                        item?.Images?.url
                          ? `http://localhost:1337${item.Images.url}`
                          : `/placeholder.svg?height=400&width=800`
                      }
                      alt={item.Title}
                      className="w-full h-full object-cover transition duration-700 ease-in-out transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-xs px-3 py-1 font-bold rounded-full ${
                            index === 0 ? "bg-red-600" : "bg-blue-600"
                          }`}
                        >
                          {item.category?.toUpperCase() || "ÉDUCATION"}
                        </span>
                        <span className="text-xs text-white/80 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(item.publishedDate || Date.now()).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <h2
                        className={`font-bold ${
                          index === 0 ? "text-2xl" : "text-lg"
                        } group-hover:text-yellow-400 transition-colors duration-300 text-white`}
                      >
                        {item.Title || `Article ${index + 1}`}
                      </h2>
                      <p className="mt-2 text-white/80 text-sm line-clamp-2">
                        {item.Description ||
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam."}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-white/80 text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>Mamou</span>
                        </div>
                        <div className="text-yellow-400 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                          Lire plus
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Schools Section */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              Les Écoles De <span className="text-blue-700">Mamou</span>
            </h2>
            <div className="flex items-center space-x-4 w-full max-w-sm mt-3">
              <hr className="flex-1 border-t-2 border-gray-300" />
              <Lightbulb className="text-yellow-500" />
              <hr className="flex-1 border-t-2 border-gray-300" />
            </div>
            <p className="text-lg mt-3 text-center text-gray-600 max-w-lg">
              Découvrez les meilleures écoles de Mamou, leur histoire et leur environnement éducatif !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-6xl mx-auto"
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false)
              // Restart timer
              clearInterval(timerRef.current)
              timerRef.current = setInterval(() => {
                setCurrentIndex((p) => (p + 1) % schools.length)
              }, 5000)
            }}
          >
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
              <AnimatePresence initial={false} mode="wait">
                {(schools.length > 0 ? schools : [{}, {}, {}]).map((school, index) => (
                  <motion.div
                    key={school.id || index}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: index === currentIndex ? 1 : 0, x: index === currentIndex ? 0 : 300 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${index === currentIndex ? "z-10" : "z-0"}`}
                    style={{ display: index === currentIndex ? "block" : "none" }}
                  >
                    <Link to={`/blog/school/${school.id}`} className="block h-full">
                      <img
                        src={
                          school?.Image?.[0]?.url
                            ? `http://localhost:1337${school.Image[0].url}`
                            : `/placeholder.svg?height=500&width=1200`
                        }
                        alt={school?.Title || `École ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                        <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-block px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded-full mb-3"
                          >
                            ÉCOLE {index + 1}/{schools.length || 3}
                          </motion.div>
                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-2xl md:text-3xl font-bold mt-3 text-white"
                          >
                            {school?.Title || `École ${index + 1}`}
                          </motion.h3>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-base mt-3 max-w-3xl line-clamp-3 text-white/90"
                          >
                            {school?.Description
                              ? school.Description.map((textItem, textIndex) => (
                                  <div key={textIndex}>
                                    {textItem.children.map((child, childIndex) => (
                                      <span key={childIndex}>{child.text}</span>
                                    ))}
                                  </div>
                                ))
                              : "Description de l'école..."}
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-wrap gap-4 mt-4"
                          >
                            <div className="flex items-center text-yellow-400 text-sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{school?.Location || "Mamou, Guinée"}</span>
                            </div>
                            <div className="flex items-center text-yellow-400 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{school?.Founded || "Fondée en 1980"}</span>
                            </div>
                          </motion.div>
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-400 transition-colors duration-300"
                          >
                            En savoir plus
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  className="h-full bg-yellow-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
                  key={currentIndex}
                />
              </div>

              {/* Navigation Buttons */}
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSlide("backward")}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg z-20"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSlide("forward")}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg z-20"
                aria-label="Suivant"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {(schools.length > 0 ? schools : [{}, {}, {}]).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-yellow-400 scale-125 w-8" : "bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Voir l'école ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">L'Éducation en Chiffres</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Découvrez les statistiques clés sur l'éducation dans la région de Mamou
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "95%", label: "Taux d'alphabétisation", icon: BookOpen },
              { value: "120+", label: "Écoles primaires", icon: Lightbulb },
              { value: "45+", label: "Établissements secondaires", icon: BookOpen },
              { value: "12", label: "Centres de formation", icon: Lightbulb },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="bg-yellow-400 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Restez informé sur l'éducation à Mamou</h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-8">
                Abonnez-vous à notre newsletter pour recevoir les dernières actualités et événements éducatifs
              </p>

              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium shadow-sm"
                >
                  S'abonner
                </motion.button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">
                  Politique de confidentialité
                </a>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">
                  Conditions d'utilisation
                </a>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Education
