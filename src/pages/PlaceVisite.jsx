"use client"

import { Calendar, MapPin, Camera, Info } from "lucide-react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function PlaceVisite({ places = [] }) {
  // Helper function to get image URL
  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=400&width=600";
    const image = imageArray[0];
    return image.url.startsWith('http') ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
  };

  // Helper function to get description text
  const getDescriptionText = (descriptionArray) => {
    if (!descriptionArray || !descriptionArray.length) return "Description non disponible";
    const firstBlock = descriptionArray[0];
    if (firstBlock.children && firstBlock.children.length > 0) {
      return firstBlock.children[0].text || "Description non disponible";
    }
    return "Description non disponible";
  };

  // Helper function to get type color
  const getTypeColor = (type) => {
    const colors = {
      'agriculture': 'bg-green-500',
      'tourism': 'bg-blue-500',
      'culture': 'bg-purple-500',
      'nature': 'bg-emerald-500',
      'default': 'bg-gray-500'
    };
    return colors[type] || colors.default;
  };

  console.log("Places data in component:", places);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section with Background Image and Gradient */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${places.length > 0 && places[0].image ? getImageUrl(places[0].image) : 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/75 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Lieux à <span className="text-yellow-400">Visiter</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                Explorez les merveilles naturelles et culturelles de Mamou
              </p>
              <div className="flex flex-wrap gap-4 text-purple-100">
                <div className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>Sites pittoresques</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>Région de Mamou</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Places Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Découvrez nos <span className="text-purple-700">Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des sites naturels aux activités culturelles, explorez tout ce que Mamou a à offrir
          </p>
        </div>

        {places.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chargement des lieux à visiter...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {places.map((place, index) => (
              <div key={place.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${index === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}>
                <div className={`relative ${index === 0 ? 'h-80' : 'h-56'} overflow-hidden`}>
                  <img
                    src={getImageUrl(place.image)}
                    alt={place.Titre}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=400&width=600";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className={`absolute top-4 right-4 ${getTypeColor(place.type)} text-white px-3 py-1 rounded-full text-sm font-semibold capitalize`}>
                    {place.type || "Visite"}
                  </div>
                  
                  {/* Date Badge */}
                  {place.date && (
                    <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(place.date).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                  
                  {/* Title Overlay for featured item */}
                  {index === 0 && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{place.Titre}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">
                        {getDescriptionText(place.description)}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  {/* Title for non-featured items */}
                  {index !== 0 && (
                    <h3 className="font-bold text-xl text-gray-800 mb-3">{place.Titre}</h3>
                  )}
                  
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-purple-700" />
                    {place.localisation || "Mamou"}
                  </div>
                  
                  {/* Description for non-featured items */}
                  {index !== 0 && (
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {getDescriptionText(place.description)}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Info className="h-4 w-4 mr-1" />
                      <span>Plus d'infos</span>
                    </div>
                    <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-semibold">
                      Explorer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Planifiez votre visite</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Découvrez les trésors cachés de Mamou avec nos guides locaux expérimentés
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Camera className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-lg font-semibold mb-2">Visites guidées</h3>
                <p className="text-purple-100 text-sm">
                  Explorez avec des guides locaux experts
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-lg font-semibold mb-2">Circuits personnalisés</h3>
                <p className="text-purple-100 text-sm">
                  Créez votre itinéraire sur mesure
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Info className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-lg font-semibold mb-2">Informations locales</h3>
                <p className="text-purple-100 text-sm">
                  Conseils et recommandations authentiques
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Commencer l'exploration
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PlaceVisite