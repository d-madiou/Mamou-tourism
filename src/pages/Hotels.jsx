"use client"

import { Mail, MapPin, Phone, Users, Star } from "lucide-react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Hotels({ hotels = [] }) {
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

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-GN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price);
  };

  console.log("Hotels data in component:", hotels);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section with Background Image and Gradient */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${hotels.length > 0 && hotels[0].image ? getImageUrl(hotels[0].image) : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`
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
                Hôtels à <span className="text-yellow-400">Mamou</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Découvrez les meilleurs hébergements pour votre séjour dans notre belle région
              </p>
              <div className="flex flex-wrap gap-4 text-blue-100">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>Hôtels de qualité</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>Centre-ville de Mamou</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nos <span className="text-blue-700">Établissements</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une sélection d'hôtels et résidences pour tous les budgets et tous les goûts
          </p>
        </div>

        {hotels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chargement des hôtels...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getImageUrl(hotel.image)}
                    alt={hotel.nom}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=300&width=500";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {hotel.typeHotel || "Hôtel"}
                  </div>
                  {hotel.nombreChambres && (
                    <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {hotel.nombreChambres} chambres
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-3">{hotel.nom}</h3>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-blue-700" />
                    {hotel.localisation || "Mamou"}
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {getDescriptionText(hotel.description)}
                  </p>

                  <div className="space-y-3 mb-6">
                    {hotel.telephoneContact && (
                      <div className="flex items-center text-gray-700">
                        <Phone className="h-4 w-4 mr-3 text-blue-700" />
                        <span className="text-sm">{hotel.telephoneContact}</span>
                      </div>
                    )}
                    {hotel.emailContact && (
                      <div className="flex items-center text-gray-700">
                        <Mail className="h-4 w-4 mr-3 text-blue-700" />
                        <span className="text-sm">{hotel.emailContact}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      {hotel.prixParNuit && (
                        <>
                          <span className="text-2xl font-bold text-blue-700">
                            {formatPrice(hotel.prixParNuit)} GNF
                          </span>
                          <span className="text-gray-500 text-sm block">par nuit</span>
                        </>
                      )}
                    </div>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-semibold">
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour votre réservation ?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour vous aider à trouver l'hébergement idéal pour votre séjour à Mamou.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-yellow-400" />
                    <span>+224 12 345 6789</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-yellow-400" />
                    <span>reservations@mamou-hotels.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-yellow-400" />
                    <span>Centre-ville, Mamou, Guinée</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Services disponibles</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Réservation en ligne</li>
                  <li>• Service client 24/7</li>
                  <li>• Annulation gratuite</li>
                  <li>• Meilleurs prix garantis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Hotels