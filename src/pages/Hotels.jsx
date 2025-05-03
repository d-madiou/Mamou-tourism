"use client"

import {
    Calendar,
    CheckCircle,
    ChevronRight,
    Coffee,
    Filter,
    Heart,
    Mail,
    MapPin,
    Phone,
    Search,
    Star,
    Tv,
    Users,
    Utensils,
    X,
} from "lucide-react"
import { useState } from "react"
import { FaConciergeBell, FaHome, FaHotel, FaParking, FaSwimmingPool, FaWifi } from "react-icons/fa"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Hotels() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedStars, setSelectedStars] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [favoriteHotels, setFavoriteHotels] = useState([])

  // Sample data for hotels
  const hotels = [
    {
      id: 1,
      name: "Hôtel Mamou Palace",
      description:
        "Un hôtel de luxe au cœur de Mamou offrant une expérience inoubliable avec des chambres élégantes et un service exceptionnel.",
      price: 450000,
      currency: "GNF",
      stars: 4,
      rating: 4.7,
      reviews: 124,
      image: "https://i.pinimg.com/736x/78/64/1a/78641ae99a7f9828e46f92e3df9d325b.jpg",
      location: "Centre-ville, Mamou",
      amenities: ["wifi", "restaurant", "pool", "parking", "ac", "tv"],
      featured: true,
    },
    {
      id: 2,
      name: "Résidence Dalaba",
      description:
        "Un établissement confortable et abordable, idéal pour les voyageurs d'affaires et les touristes en quête de tranquillité.",
      price: 250000,
      currency: "GNF",
      stars: 3,
      rating: 4.2,
      reviews: 86,
      image: "/placeholder.svg?height=300&width=500",
      location: "Quartier Dalaba, Mamou",
      amenities: ["wifi", "restaurant", "parking", "ac"],
      featured: false,
    },
    {
      id: 3,
      name: "Grand Hôtel de Mamou",
      description:
        "Le plus ancien hôtel de Mamou, alliant charme historique et confort moderne dans un cadre verdoyant.",
      price: 350000,
      currency: "GNF",
      stars: 3,
      rating: 4.4,
      reviews: 102,
      image: "/placeholder.svg?height=300&width=500",
      location: "Avenue de la République, Mamou",
      amenities: ["wifi", "restaurant", "pool", "parking", "ac", "tv", "spa"],
      featured: true,
    },
    {
      id: 4,
      name: "Auberge du Voyageur",
      description:
        "Une auberge chaleureuse et économique, parfaite pour les voyageurs à petit budget souhaitant découvrir Mamou.",
      price: 150000,
      currency: "GNF",
      stars: 2,
      rating: 4.0,
      reviews: 65,
      image: "/placeholder.svg?height=300&width=500",
      location: "Quartier Petel, Mamou",
      amenities: ["wifi", "parking"],
      featured: false,
    },
    {
      id: 5,
      name: "Résidence Les Palmiers",
      description:
        "Un complexe hôtelier moderne avec des villas privées et des appartements spacieux pour des séjours de courte ou longue durée.",
      price: 550000,
      currency: "GNF",
      stars: 4,
      rating: 4.8,
      reviews: 93,
      image: "/placeholder.svg?height=300&width=500",
      location: "Route de Conakry, Mamou",
      amenities: ["wifi", "restaurant", "pool", "parking", "ac", "tv", "gym"],
      featured: true,
    },
    {
      id: 6,
      name: "Hôtel du Centre",
      description:
        "Un hôtel simple et pratique situé en plein centre-ville, à proximité des commerces et des attractions touristiques.",
      price: 200000,
      currency: "GNF",
      stars: 2,
      rating: 3.8,
      reviews: 54,
      image: "/placeholder.svg?height=300&width=500",
      location: "Centre-ville, Mamou",
      amenities: ["wifi", "restaurant", "parking"],
      featured: false,
    },
  ]

  // Amenities options
  const amenitiesOptions = [
    { id: "wifi", label: "Wi-Fi", icon: <FaWifi /> },
    { id: "restaurant", label: "Restaurant", icon: <Utensils /> },
    { id: "pool", label: "Piscine", icon: <FaSwimmingPool /> },
    { id: "parking", label: "Parking", icon: <FaParking /> },
    { id: "ac", label: "Climatisation", icon: <Coffee /> },
    { id: "tv", label: "Télévision", icon: <Tv /> },
    { id: "spa", label: "Spa", icon: <FaConciergeBell /> },
    { id: "gym", label: "Salle de sport", icon: <Users /> },
  ]

  // Toggle favorite hotel
  const toggleFavorite = (hotelId) => {
    if (favoriteHotels.includes(hotelId)) {
      setFavoriteHotels(favoriteHotels.filter((id) => id !== hotelId))
    } else {
      setFavoriteHotels([...favoriteHotels, hotelId])
    }
  }

  // Toggle star filter
  const toggleStarFilter = (star) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter((s) => s !== star))
    } else {
      setSelectedStars([...selectedStars, star])
    }
  }

  // Toggle amenity filter
  const toggleAmenityFilter = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  // Filter hotels based on search and filters
  const filteredHotels = hotels.filter((hotel) => {
    // Filter by search query
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by star rating
    const matchesStars = selectedStars.length === 0 || selectedStars.includes(hotel.stars)

    // Filter by price range
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1]

    // Filter by amenities
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))

    return matchesSearch && matchesStars && matchesPrice && matchesAmenities
  })

  // Featured hotels
  const featuredHotels = hotels.filter((hotel) => hotel.featured)

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
              <span>Hôtels</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hôtels à Mamou</h1>
            <p className="text-xl text-blue-100 mb-8">Découvrez les meilleurs hébergements pour votre séjour à Mamou</p>

            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un hôtel..."
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range Filter */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Prix (GNF)</h4>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000000])}
                        />
                      </div>
                    </div>

                    {/* Star Rating Filter */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Étoiles</h4>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => toggleStarFilter(star)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedStars.includes(star)
                                ? "bg-blue-700 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {star} {star === 1 ? "étoile" : "étoiles"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Amenities Filter */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Équipements</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {amenitiesOptions.map((amenity) => (
                          <button
                            key={amenity.id}
                            onClick={() => toggleAmenityFilter(amenity.id)}
                            className={`flex items-center px-3 py-2 rounded text-sm ${
                              selectedAmenities.includes(amenity.id)
                                ? "bg-blue-700 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <span className="mr-2">{amenity.icon}</span>
                            {amenity.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Hotels Section */}
        {featuredHotels.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Star className="mr-2 text-yellow-500 fill-yellow-500" />
              Hôtels Recommandés
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredHotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <button
                      onClick={() => toggleFavorite(hotel.id)}
                      className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favoriteHotels.includes(hotel.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </button>
                    <div className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                      Recommandé
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{hotel.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-gray-700">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                      {hotel.location}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity) => {
                        const amenityOption = amenitiesOptions.find((a) => a.id === amenity)
                        return (
                          <div
                            key={amenity}
                            className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                          >
                            <span className="mr-1">{amenityOption?.icon}</span>
                            {amenityOption?.label}
                          </div>
                        )
                      })}
                      {hotel.amenities.length > 4 && (
                        <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{hotel.amenities.length - 4}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-700">
                          {hotel.price.toLocaleString()} {hotel.currency}
                        </span>
                        <span className="text-gray-500 text-sm"> / nuit</span>
                      </div>
                      <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Hotels Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaHotel className="mr-2 text-blue-700" />
            Tous les Hôtels
            <span className="ml-2 text-sm font-normal text-gray-500">({filteredHotels.length} résultats)</span>
          </h2>

          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun hôtel trouvé</h3>
              <p className="text-gray-600 mb-6">
                Aucun hôtel ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedStars([])
                  setSelectedAmenities([])
                  setPriceRange([0, 1000000])
                }}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredHotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <button
                      onClick={() => toggleFavorite(hotel.id)}
                      className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favoriteHotels.includes(hotel.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex items-center">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{hotel.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-gray-700">{hotel.rating}</span>
                        <span className="ml-1 text-gray-500 text-xs">({hotel.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                      {hotel.location}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity) => {
                        const amenityOption = amenitiesOptions.find((a) => a.id === amenity)
                        return (
                          <div
                            key={amenity}
                            className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                          >
                            <span className="mr-1">{amenityOption?.icon}</span>
                            {amenityOption?.label}
                          </div>
                        )
                      })}
                      {hotel.amenities.length > 4 && (
                        <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{hotel.amenities.length - 4}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-700">
                          {hotel.price.toLocaleString()} {hotel.currency}
                        </span>
                        <span className="text-gray-500 text-sm"> / nuit</span>
                      </div>
                      <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Pourquoi réserver avec nous ?</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="font-bold text-lg mb-2">Meilleurs prix garantis</h3>
              <p className="text-gray-600">Nous vous garantissons les meilleurs tarifs pour votre séjour à Mamou.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="font-bold text-lg mb-2">Service client 24/7</h3>
              <p className="text-gray-600">
                Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="font-bold text-lg mb-2">Annulation gratuite</h3>
              <p className="text-gray-600">
                Annulation gratuite jusqu'à 24 heures avant votre arrivée pour la plupart des réservations.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-700 text-white rounded-xl p-8">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Besoin d'aide pour votre réservation ?</h2>
              <p className="text-blue-100 mb-4">
                Notre équipe est à votre disposition pour vous aider à trouver l'hébergement idéal pour votre séjour à
                Mamou.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>+224 12 345 6789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>reservations@mamou-hotels.com</span>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Hotels
