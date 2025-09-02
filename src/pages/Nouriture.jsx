"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Nouriture({ restaurant = [] }) {
  // Helper function to get image URL
  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=300&width=500";
    const image = imageArray[0];
    // Handle both full URLs and relative paths
    return image.url.startsWith('http') ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
  };

  // Helper function to get description text
  const getDescriptionText = (descriptionArray) => {
    if (!descriptionArray || !descriptionArray.length) return "Description non disponible";
    // Assuming description is in rich text format, extract the text
    const firstBlock = descriptionArray[0];
    if (firstBlock.children && firstBlock.children.length > 0) {
      return firstBlock.children[0].text || "Description non disponible";
    }
    return "Description non disponible";
  };

  // Helper function to generate email from restaurant name
  const generateEmail = (nom) => {
    const cleanName = nom.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9]/g, '');
    return `contact@${cleanName}.com`;
  };

  console.log("Restaurant data in Nouriture component:", restaurant);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Simple Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Restaurants à Mamou</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Découvrez les saveurs authentiques et les délices culinaires de la région de Mamou
          </p>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="container mx-auto px-4 py-12">
        {restaurant.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chargement des restaurants...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {restaurant.map((resto) => (
              <div key={resto.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={getImageUrl(resto.image)}
                    alt={resto.nom}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=300&width=500";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{resto.nom}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                    {resto.localisation || "Localisation non disponible"}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {getDescriptionText(resto.description)}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-blue-700" />
                      <span className="text-sm">
                        {resto.heuresOuverture ? `À partir de ${resto.heuresOuverture}` : "Heures non disponibles"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="h-4 w-4 mr-2 text-blue-700" />
                      <span className="text-sm">
                        {resto.telephoneContact || "Téléphone non disponible"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="h-4 w-4 mr-2 text-blue-700" />
                      <span className="text-sm">
                        {generateEmail(resto.nom)}
                      </span>
                    </div>
                    {resto.prix && (
                      <div className="flex items-center text-gray-700">
                        <span className="text-sm font-semibold text-green-600">
                          Prix moyen: {resto.prix} GNF
                        </span>
                      </div>
                    )}
                    {resto.typeCuisine && (
                      <div className="flex items-center text-gray-700">
                        <span className="text-sm">
                          Cuisine: {resto.typeCuisine}
                        </span>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                    Contacter le restaurant
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Découvrez la cuisine de Mamou</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Savourez les délices culinaires de notre région dans nos restaurants partenaires qui vous offrent une
              expérience gastronomique authentique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                <span>+224 12 345 6789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                <span>restaurants@mamou.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Nouriture