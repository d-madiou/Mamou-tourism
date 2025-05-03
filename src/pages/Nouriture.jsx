"use client"

import { Calendar, ChevronRight, Clock, Filter, Heart, MapPin, Search, Star, X } from "lucide-react"
import { useState } from "react"
import {
    FaChevronLeft,
    FaChevronRight,
    FaCoffee,
    FaFire,
    FaHome,
    FaLeaf,
    FaShoppingBasket,
    FaUtensils,
    FaWineGlassAlt,
} from "react-icons/fa"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Nouriture() {
  const [activeTab, setActiveTab] = useState("dishes")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [cuisineType, setCuisineType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState([])
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0)

  // Sample data for local dishes
  const localDishes = [
    {
      id: 1,
      name: "Tô de Manioc",
      description:
        "Un plat traditionnel à base de manioc pilé, servi avec une sauce aux feuilles et à la viande. Un incontournable de la cuisine locale.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Plat principal",
      ingredients: ["Manioc", "Feuilles de patate", "Viande", "Piment", "Huile de palme"],
      featured: true,
    },
    {
      id: 2,
      name: "Konkoé",
      description:
        "Une délicieuse soupe de poisson aux légumes, parfumée aux épices locales. Idéale pour les journées fraîches.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Soupe",
      ingredients: ["Poisson", "Tomates", "Oignons", "Piment", "Gombo"],
      featured: true,
    },
    {
      id: 3,
      name: "Fouti",
      description:
        "Un couscous de manioc accompagné d'une sauce arachide crémeuse et de viande. Un plat nourrissant et savoureux.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Plat principal",
      ingredients: ["Manioc", "Arachides", "Viande", "Légumes", "Épices"],
      featured: false,
    },
    {
      id: 4,
      name: "Kansiyé",
      description:
        "Un ragoût de poulet aux arachides et aux légumes, mijoté lentement pour développer des saveurs riches et complexes.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Plat principal",
      ingredients: ["Poulet", "Arachides", "Tomates", "Oignons", "Piment"],
      featured: true,
    },
    {
      id: 5,
      name: "Dackéré",
      description:
        "Un dessert sucré à base de riz cuit à la vapeur et mélangé avec du miel et des fruits. Parfait pour terminer un repas.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Dessert",
      ingredients: ["Riz", "Miel", "Fruits", "Cannelle", "Noix"],
      featured: false,
    },
    {
      id: 6,
      name: "Fakoye",
      description:
        "Une sauce aux feuilles sauvages accompagnée de riz blanc. Un plat simple mais plein de saveurs et de nutriments.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Plat principal",
      ingredients: ["Feuilles sauvages", "Riz", "Poisson séché", "Oignons", "Épices"],
      featured: false,
    },
  ]

  // Sample data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Restaurant Le Mamou",
      description:
        "Un restaurant élégant proposant une cuisine traditionnelle guinéenne revisitée avec des techniques modernes.",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4.8,
      reviews: 124,
      priceRange: "expensive", // expensive, moderate, budget
      cuisineType: "traditional",
      location: "Centre-ville, Mamou",
      openingHours: "12:00 - 22:00",
      featured: true,
    },
    {
      id: 2,
      name: "Chez Fatou",
      description:
        "Un restaurant familial où vous pourrez déguster d'authentiques plats guinéens dans une ambiance chaleureuse.",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4.5,
      reviews: 86,
      priceRange: "moderate",
      cuisineType: "traditional",
      location: "Quartier Dalaba, Mamou",
      openingHours: "11:00 - 21:00",
      featured: true,
    },
    {
      id: 3,
      name: "Le Petit Café",
      description:
        "Un café-restaurant proposant des petits déjeuners, des pâtisseries et des plats légers tout au long de la journée.",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4.3,
      reviews: 65,
      priceRange: "budget",
      cuisineType: "cafe",
      location: "Avenue de la République, Mamou",
      openingHours: "07:00 - 19:00",
      featured: false,
    },
    {
      id: 4,
      name: "La Terrasse",
      description:
        "Un restaurant avec une belle terrasse offrant une vue sur la ville et servant une cuisine fusion guinéenne-internationale.",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4.7,
      reviews: 102,
      priceRange: "expensive",
      cuisineType: "fusion",
      location: "Quartier Petel, Mamou",
      openingHours: "18:00 - 23:00",
      featured: true,
    },
    {
      id: 5,
      name: "Maquis du Foutah",
      description:
        "Un maquis traditionnel où vous pourrez déguster des grillades et des plats typiques dans une ambiance festive.",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4.2,
      reviews: 78,
      priceRange: "budget",
      cuisineType: "traditional",
      location: "Route de Conakry, Mamou",
      openingHours: "16:00 - 02:00",
      featured: false,
    },
    {
      id: 6,
      name: "Le Gourmet",
      description:
        "Un restaurant haut de gamme proposant une cuisine raffinée mêlant saveurs locales et influences internationales.",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4.9,
      reviews: 93,
      priceRange: "expensive",
      cuisineType: "fusion",
      location: "Centre-ville, Mamou",
      openingHours: "19:00 - 23:00",
      featured: false,
    },
  ]

  // Sample data for traditional recipes
  const recipes = [
    {
      id: 1,
      name: "Sauce Arachide Traditionnelle",
      description:
        "Une sauce crémeuse à base d'arachides, parfaite pour accompagner le riz ou le foufou. Un classique de la cuisine guinéenne.",
      image: "/placeholder.svg?height=400&width=600",
      prepTime: "20 min",
      cookTime: "45 min",
      difficulty: "Moyen",
      ingredients: [
        "500g d'arachides grillées",
        "2 oignons",
        "3 tomates",
        "2 piments",
        "2 cuillères à soupe d'huile de palme",
        "Sel et épices",
        "Viande ou poisson (facultatif)",
      ],
      steps: [
        "Mixer les arachides grillées pour obtenir une pâte.",
        "Faire revenir les oignons et les tomates dans l'huile de palme.",
        "Ajouter la pâte d'arachide et mélanger.",
        "Verser de l'eau et laisser mijoter 30 minutes.",
        "Ajouter la viande ou le poisson précuit et les épices.",
        "Laisser mijoter encore 15 minutes.",
        "Servir chaud avec du riz blanc ou du foufou.",
      ],
    },
    {
      id: 2,
      name: "Foufou de Manioc",
      description:
        "Le foufou est un accompagnement incontournable en Guinée, préparé à partir de manioc pilé. Sa texture élastique est parfaite pour accompagner les sauces.",
      image: "/placeholder.svg?height=400&width=600",
      prepTime: "30 min",
      cookTime: "20 min",
      difficulty: "Difficile",
      ingredients: ["1kg de manioc", "Eau", "Sel"],
      steps: [
        "Éplucher et laver le manioc.",
        "Couper en morceaux et faire bouillir jusqu'à ce qu'il soit tendre.",
        "Égoutter et laisser refroidir légèrement.",
        "Piler dans un mortier jusqu'à obtenir une pâte élastique.",
        "Former des boules et servir chaud avec une sauce.",
      ],
    },
    {
      id: 3,
      name: "Poulet Yassa",
      description:
        "Un plat savoureux de poulet mariné au citron et aux oignons, puis mijoté lentement. Un délice qui fait la fierté de la cuisine ouest-africaine.",
      image: "/placeholder.svg?height=400&width=600",
      prepTime: "4 heures (marinade)",
      cookTime: "1 heure",
      difficulty: "Facile",
      ingredients: [
        "1 poulet coupé en morceaux",
        "8 citrons",
        "6 oignons",
        "4 gousses d'ail",
        "2 cuillères à soupe d'huile",
        "Sel, poivre, piment",
        "2 cubes de bouillon",
      ],
      steps: [
        "Mariner le poulet avec le jus de citron, l'ail écrasé, le sel et le poivre pendant au moins 4 heures.",
        "Faire revenir le poulet dans l'huile jusqu'à ce qu'il soit doré.",
        "Retirer le poulet et faire revenir les oignons émincés dans la même huile.",
        "Ajouter le reste de la marinade et les cubes de bouillon.",
        "Remettre le poulet et laisser mijoter 30 minutes.",
        "Servir chaud avec du riz blanc.",
      ],
    },
  ]

  // Sample data for food markets
  const foodMarkets = [
    {
      id: 1,
      name: "Marché Central de Mamou",
      description:
        "Le plus grand marché de la ville où vous trouverez tous les ingrédients frais pour préparer les plats traditionnels.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Centre-ville, Mamou",
      openingHours: "06:00 - 18:00",
      specialties: ["Légumes frais", "Épices", "Viandes", "Poissons", "Fruits"],
    },
    {
      id: 2,
      name: "Marché aux Épices",
      description:
        "Un marché spécialisé dans les épices et les ingrédients traditionnels utilisés dans la cuisine guinéenne.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Quartier Dalaba, Mamou",
      openingHours: "07:00 - 17:00",
      specialties: ["Épices rares", "Herbes médicinales", "Condiments", "Huiles traditionnelles"],
    },
    {
      id: 3,
      name: "Marché Hebdomadaire",
      description:
        "Un marché qui se tient chaque dimanche où les agriculteurs des villages environnants viennent vendre leurs produits.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Place du Marché, Mamou",
      openingHours: "05:00 - 14:00 (Dimanche uniquement)",
      specialties: ["Produits fermiers", "Légumes bio", "Miel", "Produits laitiers artisanaux"],
    },
  ]

  // Toggle favorite item
  const toggleFavorite = (itemId) => {
    if (favoriteItems.includes(itemId)) {
      setFavoriteItems(favoriteItems.filter((id) => id !== itemId))
    } else {
      setFavoriteItems([...favoriteItems, itemId])
    }
  }

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Filter by search query
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by price range
    const matchesPrice = priceRange === "all" || restaurant.priceRange === priceRange

    // Filter by cuisine type
    const matchesCuisine = cuisineType === "all" || restaurant.cuisineType === cuisineType

    return matchesSearch && matchesPrice && matchesCuisine
  })

  // Navigate through recipes
  const navigateRecipes = (direction) => {
    if (direction === "next") {
      setActiveRecipeIndex((prev) => (prev === recipes.length - 1 ? 0 : prev + 1))
    } else {
      setActiveRecipeIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1))
    }
  }

  // Featured dishes
  const featuredDishes = localDishes.filter((dish) => dish.featured)

  // Featured restaurants
  const featuredRestaurants = restaurants.filter((restaurant) => restaurant.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center text-sm mb-4">
              <FaHome className="mr-2" />
              <span>Accueil</span>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span>Nourriture</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cuisine de Mamou</h1>
            <p className="text-xl text-blue-100 mb-8">
              Découvrez les saveurs authentiques et les délices culinaires de la région de Mamou
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un restaurant ou un plat..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                  >
                    <Filter className="mr-2 h-5 w-5" />
                    Filtres
                  </button>
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg transition-colors">
                    Rechercher
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Filtres</h3>
                    <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price Range Filter */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Gamme de prix</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setPriceRange("all")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            priceRange === "all"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Tous
                        </button>
                        <button
                          onClick={() => setPriceRange("budget")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            priceRange === "budget"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Économique
                        </button>
                        <button
                          onClick={() => setPriceRange("moderate")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            priceRange === "moderate"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Modéré
                        </button>
                        <button
                          onClick={() => setPriceRange("expensive")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            priceRange === "expensive"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Haut de gamme
                        </button>
                      </div>
                    </div>

                    {/* Cuisine Type Filter */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Type de cuisine</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setCuisineType("all")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            cuisineType === "all"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Tous
                        </button>
                        <button
                          onClick={() => setCuisineType("traditional")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            cuisineType === "traditional"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Traditionnelle
                        </button>
                        <button
                          onClick={() => setCuisineType("fusion")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            cuisineType === "fusion"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Fusion
                        </button>
                        <button
                          onClick={() => setCuisineType("cafe")}
                          className={`px-4 py-2 rounded-full text-sm ${
                            cuisineType === "cafe"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Café
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setActiveTab("dishes")}
              className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap mr-3 transition-colors ${
                activeTab === "dishes" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaUtensils className="mr-2" />
              Plats Locaux
            </button>
            <button
              onClick={() => setActiveTab("restaurants")}
              className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap mr-3 transition-colors ${
                activeTab === "restaurants" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaWineGlassAlt className="mr-2" />
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab("recipes")}
              className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap mr-3 transition-colors ${
                activeTab === "recipes" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaFire className="mr-2" />
              Recettes
            </button>
            <button
              onClick={() => setActiveTab("markets")}
              className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap mr-3 transition-colors ${
                activeTab === "markets" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaShoppingBasket className="mr-2" />
              Marchés
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Content based on active tab */}
        {activeTab === "dishes" && (
          <>
            {/* Featured Dishes Section */}
            {featuredDishes.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Star className="mr-2 text-yellow-500 fill-yellow-500" />
                  Plats Emblématiques
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {featuredDishes.map((dish) => (
                    <div key={dish.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={dish.image || "/placeholder.svg"}
                          alt={dish.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                          onClick={() => toggleFavorite(dish.id)}
                          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              favoriteItems.includes(dish.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                          />
                        </button>
                        <div className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                          Populaire
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-gray-800">{dish.name}</h3>
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {dish.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{dish.description}</p>
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2">Ingrédients principaux:</h4>
                          <div className="flex flex-wrap gap-2">
                            {dish.ingredients.map((ingredient, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                          Voir la recette
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Dishes Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUtensils className="mr-2 text-blue-700" />
                Tous les Plats Locaux
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {localDishes.map((dish) => (
                  <div key={dish.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <button
                        onClick={() => toggleFavorite(dish.id)}
                        className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            favoriteItems.includes(dish.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{dish.name}</h3>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {dish.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{dish.description}</p>
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Ingrédients principaux:</h4>
                        <div className="flex flex-wrap gap-2">
                          {dish.ingredients.map((ingredient, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                        Voir la recette
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary Experiences Section */}
            <div className="bg-blue-700 text-white rounded-xl p-8 mb-16">
              <div className="md:flex items-center justify-between">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-4">Découvrez la cuisine de Mamou</h2>
                  <p className="text-blue-100 mb-4">
                    Participez à nos cours de cuisine traditionnelle et apprenez à préparer les plats emblématiques de
                    la région avec nos chefs locaux.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-yellow-400" />
                      <span>Cours disponibles tous les jours</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                      <span>Durée: 3 heures</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors">
                    Réserver un cours
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "restaurants" && (
          <>
            {/* Featured Restaurants Section */}
            {featuredRestaurants.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Star className="mr-2 text-yellow-500 fill-yellow-500" />
                  Restaurants Recommandés
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {featuredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                          onClick={() => toggleFavorite(restaurant.id)}
                          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              favoriteItems.includes(restaurant.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                          />
                        </button>
                        <div className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                          Recommandé
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-gray-800">{restaurant.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                          <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                          {restaurant.location}
                        </div>
                        <p className="text-gray-600 mb-4">{restaurant.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {restaurant.openingHours}
                          </div>
                          <div className="text-sm">
                            {restaurant.priceRange === "budget" && <span className="text-green-600">€</span>}
                            {restaurant.priceRange === "moderate" && <span className="text-amber-600">€€</span>}
                            {restaurant.priceRange === "expensive" && <span className="text-red-600">€€€</span>}
                          </div>
                        </div>
                        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                          Voir le menu
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Restaurants Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaWineGlassAlt className="mr-2 text-blue-700" />
                Tous les Restaurants
                <span className="ml-2 text-sm font-normal text-gray-500">({filteredRestaurants.length} résultats)</span>
              </h2>

              {filteredRestaurants.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun restaurant trouvé</h3>
                  <p className="text-gray-600 mb-6">
                    Aucun restaurant ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setPriceRange("all")
                      setCuisineType("all")
                    }}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                          onClick={() => toggleFavorite(restaurant.id)}
                          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              favoriteItems.includes(restaurant.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-gray-800">{restaurant.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                            <span className="ml-1 text-gray-500 text-xs">({restaurant.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                          <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                          {restaurant.location}
                        </div>
                        <p className="text-gray-600 mb-4">{restaurant.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {restaurant.openingHours}
                          </div>
                          <div className="text-sm">
                            {restaurant.priceRange === "budget" && <span className="text-green-600">€</span>}
                            {restaurant.priceRange === "moderate" && <span className="text-amber-600">€€</span>}
                            {restaurant.priceRange === "expensive" && <span className="text-red-600">€€€</span>}
                          </div>
                        </div>
                        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                          Voir le menu
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "recipes" && (
          <>
            {/* Recipe Showcase Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaFire className="mr-2 text-blue-700" />
                Recettes Traditionnelles
              </h2>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={recipes[activeRecipeIndex].image || "/placeholder.svg"}
                        alt={recipes[activeRecipeIndex].name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-1/2">
                      <h3 className="text-2xl font-bold mb-4">{recipes[activeRecipeIndex].name}</h3>
                      <p className="text-gray-600 mb-6">{recipes[activeRecipeIndex].description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <span className="block text-gray-500 text-sm">Préparation</span>
                          <span className="font-bold text-blue-700">{recipes[activeRecipeIndex].prepTime}</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <span className="block text-gray-500 text-sm">Cuisson</span>
                          <span className="font-bold text-blue-700">{recipes[activeRecipeIndex].cookTime}</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <span className="block text-gray-500 text-sm">Difficulté</span>
                          <span className="font-bold text-blue-700">{recipes[activeRecipeIndex].difficulty}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold text-gray-800 mb-2">Ingrédients</h4>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          {recipes[activeRecipeIndex].ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>

                      <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors flex items-center">
                        Voir la recette complète
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateRecipes("prev")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md text-blue-700 hover:bg-blue-50"
                >
                  <FaChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigateRecipes("next")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md text-blue-700 hover:bg-blue-50"
                >
                  <FaChevronRight className="h-5 w-5" />
                </button>

                <div className="flex justify-center mt-4">
                  {recipes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveRecipeIndex(index)}
                      className={`w-3 h-3 rounded-full mx-1 ${
                        activeRecipeIndex === index ? "bg-blue-700" : "bg-gray-300"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recipe Steps Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Étapes de préparation</h2>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <ol className="space-y-6">
                  {recipes[activeRecipeIndex].steps.map((step, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Cooking Tips Section */}
            <div className="bg-yellow-50 rounded-xl p-8 mb-16 border border-yellow-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center">
                    <FaLeaf className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Conseils de cuisine</h3>
                  <p className="text-gray-700 mb-4">
                    Pour réussir vos plats traditionnels de Mamou, voici quelques conseils de nos chefs locaux:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Utilisez des ingrédients frais et locaux pour des saveurs authentiques.</li>
                    <li>
                      L'huile de palme est un ingrédient clé dans de nombreux plats, mais utilisez-la avec modération.
                    </li>
                    <li>
                      Les épices doivent être ajoutées progressivement pour permettre aux saveurs de se développer.
                    </li>
                    <li>
                      Pour le foufou, la texture est essentielle - continuez à piler jusqu'à obtenir une consistance
                      élastique.
                    </li>
                    <li>
                      Laissez mijoter les sauces à feu doux pour permettre aux saveurs de se mélanger harmonieusement.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "markets" && (
          <>
            {/* Food Markets Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShoppingBasket className="mr-2 text-blue-700" />
                Marchés Alimentaires
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {foodMarkets.map((market) => (
                  <div key={market.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={market.image || "/placeholder.svg"}
                        alt={market.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{market.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                        {market.location}
                      </div>
                      <p className="text-gray-600 mb-4">{market.description}</p>
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {market.openingHours}
                      </div>
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Spécialités:</h4>
                        <div className="flex flex-wrap gap-2">
                          {market.specialties.map((specialty, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                        Voir plus de détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Products Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Produits de Saison</h2>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaLeaf className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Printemps</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>Mangues fraîches</li>
                      <li>Feuilles de patate</li>
                      <li>Aubergines locales</li>
                      <li>Piments frais</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaFire className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Été</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>Ananas</li>
                      <li>Maïs frais</li>
                      <li>Gombos</li>
                      <li>Papayes</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaUtensils className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Automne</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>Ignames</li>
                      <li>Arachides fraîches</li>
                      <li>Manioc nouveau</li>
                      <li>Bananes plantains</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCoffee className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Hiver</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>Oranges</li>
                      <li>Patates douces</li>
                      <li>Taro</li>
                      <li>Légumes à feuilles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Tour Section */}
            <div className="bg-blue-700 text-white rounded-xl p-8">
              <div className="md:flex items-center justify-between">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-4">Visite guidée des marchés</h2>
                  <p className="text-blue-100 mb-4">
                    Découvrez les marchés colorés de Mamou avec un guide local qui vous fera découvrir les meilleurs
                    produits et vous expliquera leur utilisation dans la cuisine traditionnelle.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-yellow-400" />
                      <span>Visites disponibles tous les matins</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                      <span>Durée: 2 heures</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors">
                    Réserver une visite
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Nouriture
