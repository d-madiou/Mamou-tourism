"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Download, Heart, Share2, X, ZoomIn } from "lucide-react"
import { useEffect, useState } from "react"

// Gallery images with French translations
const galleryImages = [
  {
    url: "https://www.africaguinee.com/app/uploads/2023/05/mamouu.jpg",
    title: "Rivière entre montagnes",
    description: "Les magnifiques rivières qui coulent à travers les chaînes de montagnes de Mamou",
  },
  {
    url: "https://conakrylemag.com/wp-content/uploads/2020/05/Une-route-du-centre-ville-de-Mamou.jpg",
    title: "Forêts de pins",
    description: "Luxuriantes forêts de pins qui couvrent les hautes terres de Mamou",
  },
  {
    url: "https://guinee114.com/wp-content/uploads/2020/09/Manifs-mamou.jpg",
    title: "Cascades",
    description: "Les cascades cachées font partie des merveilles naturelles les plus précieuses de Mamou",
  },
  {
    url: "https://i.pinimg.com/736x/79/d2/ef/79d2ef34e6ec39c61a584ec22373014f.jpg",
    title: "Formations rocheuses",
    description: "Formations rocheuses uniques sculptées par des siècles de forces naturelles",
  },
  {
    url: "https://i.pinimg.com/736x/79/d2/ef/79d2ef34e6ec39c61a584ec22373014f.jpg",
    title: "Paysage montagneux",
    description: "Vues à couper le souffle depuis les sommets montagneux de Mamou",
  },
  {
    url: "https://i.pinimg.com/736x/79/d2/ef/79d2ef34e6ec39c61a584ec22373014f.jpg",
    title: "Lumière du soleil en forêt",
    description: "La lumière du soleil filtrant à travers les forêts denses crée des scènes magiques",
  },
]

// Categories for filtering (in French)
const categories = ["Tous", "Montagnes", "Rivières", "Forêts", "Culture"]

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [liked, setLiked] = useState([])
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    // Simulate loading images
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Prevent scrolling when lightbox is open
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "auto"
    }
  }, [lightboxOpen])

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setIsFullscreen(false)
  }

  const navigateImage = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  const toggleLike = (index) => {
    setLiked((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return

      switch (e.key) {
        case "ArrowLeft":
          navigateImage("prev")
          break
        case "ArrowRight":
          navigateImage("next")
          break
        case "Escape":
          closeLightbox()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen])

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Explorez la Beauté de <span className="text-blue-700">Mamou</span>
          </h2>
          <div className="flex items-center justify-center space-x-4 w-full max-w-sm mx-auto mt-2 mb-6">
            <hr className="flex-1 border-t-2 border-blue-200" />
            <div className="w-3 h-3 rounded-full bg-blue-700"></div>
            <hr className="flex-1 border-t-2 border-blue-200" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les paysages à couper le souffle et la richesse culturelle à travers notre galerie
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer shadow-md"
                onClick={() => openLightbox(index)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -10 }}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                  <p className="text-white/80 text-sm mt-2">{image.description}</p>
                </div>
                <motion.button
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
                    liked.includes(index)
                      ? "bg-red-500 text-white"
                      : "bg-white/30 backdrop-blur-sm text-white hover:bg-white/50"
                  } transition-all duration-300`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(index)
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: liked.includes(index) ? 1 : 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  <Heart className={`w-5 h-5 ${liked.includes(index) ? "fill-white" : ""}`} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-blue-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir Plus de Photos
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-50 bg-black/30 p-2 rounded-full backdrop-blur-sm"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            <div className="absolute top-4 left-4 flex space-x-3 z-50">
              <motion.button
                className="text-white hover:text-yellow-400 transition-colors bg-black/30 p-2 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
              >
                <ZoomIn className="h-6 w-6" />
              </motion.button>
              <motion.button
                className="text-white hover:text-yellow-400 transition-colors bg-black/30 p-2 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="h-6 w-6" />
              </motion.button>
              <motion.button
                className="text-white hover:text-yellow-400 transition-colors bg-black/30 p-2 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="h-6 w-6" />
              </motion.button>
              <motion.button
                className={`transition-colors p-2 rounded-full backdrop-blur-sm ${
                  liked.includes(currentImageIndex)
                    ? "bg-red-500 text-white"
                    : "bg-black/30 text-white hover:text-yellow-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleLike(currentImageIndex)}
              >
                <Heart className={`h-6 w-6 ${liked.includes(currentImageIndex) ? "fill-white" : ""}`} />
              </motion.button>
            </div>

            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 transition-colors bg-black/30 p-3 rounded-full backdrop-blur-sm"
              onClick={() => navigateImage("prev")}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="h-6 w-6" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: isFullscreen ? 1.2 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative ${isFullscreen ? "scale-110" : ""} transition-transform duration-300`}
              >
                <img
                  src={galleryImages[currentImageIndex].url || "/placeholder.svg"}
                  alt={galleryImages[currentImageIndex].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white text-2xl font-semibold">{galleryImages[currentImageIndex].title}</h3>
                      <p className="text-white/80 mt-2">{galleryImages[currentImageIndex].description}</p>
                    </div>
                    <div className="text-xs text-white/50 ">
                      {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 transition-colors bg-black/30 p-3 rounded-full backdrop-blur-sm"
              onClick={() => navigateImage("next")}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="h-6 w-6" />
            </motion.button>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[90%] p-2">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`w-16 h-12 rounded-md overflow-hidden cursor-pointer ${
                    currentImageIndex === index ? "ring-2 ring-yellow-400" : "opacity-60"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
