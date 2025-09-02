"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useEffect, useState } from "react"

const Gallery = ({ galleryData = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("Tous")

  // Get unique categories from API data
  const getCategories = () => {
    if (!galleryData || galleryData.length === 0) return ["Tous"];
    
    const uniqueTypes = [...new Set(galleryData.map(item => item.typeDePhoto))];
    return ["Tous", ...uniqueTypes];
  };

  const categories = getCategories();

  // Helper function to get image URL
  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=400&width=600";
    const imageUrl = imageArray[0].url;
    return imageUrl.startsWith('http') ? imageUrl : `https://cozy-sparkle-24ced58ec1.strapiapp.com${imageUrl}`;
  };

  // Filter images based on active category
  const filteredImages = activeCategory === "Tous" 
    ? galleryData 
    : galleryData.filter(item => item.typeDePhoto === activeCategory);

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
  }

  const navigateImage = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length)
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length)
    }
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
  }, [lightboxOpen, filteredImages.length])

  // Reset current image index when category changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [activeCategory])

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
        {categories.length > 1 && (
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
                    : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucune image trouvée</h3>
            <p className="text-gray-500 text-lg">
              {activeCategory === "Tous" 
                ? "Aucune image disponible pour le moment."
                : `Aucune image trouvée pour la catégorie "${activeCategory}".`
              }
            </p>
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
            {filteredImages.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(index)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.typeDePhoto}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=400&width=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium mb-2 self-start">
                    {item.typeDePhoto}
                  </span>
                  <p className="text-white text-sm">
                    Ajouté le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredImages.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">
              {filteredImages.length} image{filteredImages.length > 1 ? 's' : ''} 
              {activeCategory !== "Tous" ? ` dans la catégorie "${activeCategory}"` : ' au total'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Simplified Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredImages.length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/30 p-2 rounded-full backdrop-blur-sm"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            {filteredImages.length > 1 && (
              <>
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 p-3 rounded-full backdrop-blur-sm"
                  onClick={() => navigateImage("prev")}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="h-6 w-6" />
                </motion.button>

                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 p-3 rounded-full backdrop-blur-sm"
                  onClick={() => navigateImage("next")}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-[90vw] max-h-[90vh]"
              >
                <img
                  src={getImageUrl(filteredImages[currentImageIndex]?.image)}
                  alt={filteredImages[currentImageIndex]?.typeDePhoto}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=600&width=800";
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium mb-2">
                        {filteredImages[currentImageIndex]?.typeDePhoto}
                      </span>
                      <p className="text-white/80 text-sm">
                        Ajouté le {new Date(filteredImages[currentImageIndex]?.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {filteredImages.length > 1 && (
                      <div className="text-xs text-white/70 bg-black/30 px-3 py-1 rounded-full">
                        {currentImageIndex + 1} / {filteredImages.length}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Simplified Thumbnail Navigation */}
            {filteredImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[90%] p-2">
                {filteredImages.slice(Math.max(0, currentImageIndex - 2), Math.min(filteredImages.length, currentImageIndex + 3)).map((item, index) => {
                  const actualIndex = Math.max(0, currentImageIndex - 2) + index;
                  return (
                    <motion.div
                      key={item.id}
                      className={`w-16 h-12 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                        currentImageIndex === actualIndex ? "ring-2 ring-blue-400 opacity-100" : "opacity-60 hover:opacity-80"
                      }`}
                      onClick={() => setCurrentImageIndex(actualIndex)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.typeDePhoto} 
                        className="w-full h-full object-cover" 
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery