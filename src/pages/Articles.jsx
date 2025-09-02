"use client"

import {
  AlertCircle,
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
  MapPin,
  Filter,
  Grid,
  List
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ImageMamou from "../assets/images/MamouHero2.jpg"
import NavBar from "../components/NavBar"

const Articles = ({ data = [], loading = false, error = null }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [viewMode, setViewMode] = useState("grid") 

  
  const categories = ["Tous", "actualites", "politique", "economie", "social", "culture", "sport", "sante"]

  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image) return "/placeholder.svg?height=400&width=800";
    return image.url.startsWith('http') ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
  };

  // Helper function to extract text from blocks
  const getTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "Description non disponible";
    
    let text = "";
    blocks.forEach(block => {
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach(child => {
          if (child.text) {
            text += child.text + " ";
          }
        });
      }
    });
    return text.trim() || "Description non disponible";
  };

  // Filter data based on search query and category
  const filteredData = data.filter((item) => {
    const matchesSearch = item.Titre?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Tous" || item.categorie === activeCategory
    return matchesSearch && matchesCategory
  })

  console.log("Articles data:", data);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-blue-600 text-lg">Chargement des articles...</div>
      </div>
    )

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-red-50 text-red-700 p-8 rounded-xl shadow-lg max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12" />
          <h2 className="text-xl font-bold mb-2">Erreur lors du chargement des articles</h2>
          <p className="mb-4">Veuillez réessayer plus tard ou contacter l'administrateur du site.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
          >
            Réessayer
          </button>
        </div>
      </div>
    )

  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative text-white">
        <NavBar />
        <div
          className="relative h-72 md:h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${ImageMamou})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent">
            <div className="container mx-auto h-full flex flex-col justify-center px-6 md:px-8">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3 text-xl md:text-3xl font-bold">
                  <BookOpen className="text-yellow-400" />
                  <h1 className="text-2xl md:text-5xl font-bold tracking-tight">Articles & Actualités</h1>
                </div>
                <p className="text-base md:text-2xl text-white/90 leading-relaxed">
                  Restez informés des dernières actualités et événements de Mamou
                </p>
                <div className="flex items-center text-sm text-gray-300 pt-4">
                  <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
                    MamouVille
                  </Link>
                  <span className="mx-2">/</span>
                  <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-yellow-400">Articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 -mt-12 relative z-10 mb-12">
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
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-500"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "Tous" ? "Tous" : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Tous les <span className="text-blue-700">Articles</span>
          </h2>
          <div className="flex items-center space-x-4 w-full max-w-sm mt-3">
            <hr className="flex-1 border-t-2 border-gray-300" />
            <BookOpen className="text-blue-700" />
            <hr className="flex-1 border-t-2 border-gray-300" />
          </div>
          <p className="text-lg mt-3 text-center text-gray-600 max-w-lg">
            {filteredData.length} article{filteredData.length !== 1 ? 's' : ''} trouvé{filteredData.length !== 1 ? 's' : ''}
            {activeCategory !== "Tous" && ` dans la catégorie "${activeCategory}"`}
          </p>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-blue-50 inline-block p-6 rounded-full mb-4">
              <Search className="h-12 w-12 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucun article trouvé</h3>
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
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
          }>
            {filteredData.map((item, index) => (
              <div key={item.id || index} className={`group ${viewMode === "list" ? "bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden" : ""}`}>
                <Link to={`/blog/article/${item.id}`}>
                  {viewMode === "grid" ? (
                    // Grid View
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={getImageUrl(item?.Image)}
                          alt={item.Titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=400&width=800";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs px-3 py-1 font-bold rounded-full bg-blue-600 text-white">
                            {item.categorie?.toUpperCase() || "ARTICLE"}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.datePublication ? new Date(item.datePublication).toLocaleDateString("fr-FR") : "Date inconnue"}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                          {item.Titre || `Article ${index + 1}`}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {getTextFromBlocks(item.description)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{item.localisation || "Mamou"}</span>
                          </div>
                          <div className="text-blue-600 text-sm font-medium">
                            Lire plus →
                          </div>
                        </div>
                        {item.auteur && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center text-xs text-gray-500">
                              <User className="h-3 w-3 mr-1" />
                              <span>Par {item.auteur}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="flex gap-6 p-6 hover:bg-gray-50 transition-colors duration-300">
                      <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={getImageUrl(item?.Image)}
                          alt={item.Titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=400&width=800";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs px-3 py-1 font-bold rounded-full bg-blue-600 text-white">
                            {item.categorie?.toUpperCase() || "ARTICLE"}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.datePublication ? new Date(item.datePublication).toLocaleDateString("fr-FR") : "Date inconnue"}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                          {item.Titre || `Article ${index + 1}`}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {getTextFromBlocks(item.description)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{item.localisation || "Mamou"}</span>
                            </div>
                            {item.auteur && (
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                <span>Par {item.auteur}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-blue-600 text-sm font-medium">
                            Lire plus →
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Articles Section */}
      {filteredData.length > 0 && (
        <div className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">
                Articles <span className="text-blue-700">Récents</span>
              </h2>
              <div className="flex items-center space-x-4 w-full max-w-sm mt-3">
                <hr className="flex-1 border-t-2 border-gray-300" />
                <Clock className="text-yellow-500" />
                <hr className="flex-1 border-t-2 border-gray-300" />
              </div>
              <p className="text-lg mt-3 text-center text-gray-600 max-w-lg">
                Découvrez nos derniers articles publiés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.slice(0, 3).map((item, index) => (
                <div key={item.id || index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <Link to={`/blog/article/${item.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={getImageUrl(item?.Image)}
                        alt={item.Titre}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=400&width=800";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs px-3 py-1 font-bold rounded-full bg-green-600 text-white">
                          RÉCENT
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.datePublication ? new Date(item.datePublication).toLocaleDateString("fr-FR") : "Date inconnue"}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl text-gray-800 mb-2">
                        {item.Titre || `Article récent ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {getTextFromBlocks(item.description)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{item.localisation || "Mamou"}</span>
                        </div>
                        <div className="text-green-600 text-sm font-medium">
                          Lire maintenant →
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Articles