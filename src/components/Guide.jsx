"use client"

import { motion } from "framer-motion"
import { FaPhone, FaMapPin, FaShieldAlt, FaUser } from "react-icons/fa"

function Police({ policeData = [] }) {
  // Helper function to get image URL
  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=300&width=400";
    const imageUrl = imageArray[0].url;
    return imageUrl.startsWith('http') ? imageUrl : `https://cozy-sparkle-24ced58ec1.strapiapp.com${imageUrl}`;
  };

  // Helper function to get post type display name
  const getPostTypeDisplay = (typePoste) => {
    const types = {
      'commissariat': 'Commissariat',
      'gendarmerie': 'Gendarmerie',
      'police': 'Poste de Police',
      'brigade': 'Brigade'
    };
    return types[typePoste] || typePoste;
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Forces de <span className="text-blue-700">l'Ordre à Mamou</span>
          </h1>
          <div className="flex items-center justify-center space-x-4 w-full max-w-sm mx-auto mt-2">
            <hr className="flex-1 border-t-2 border-blue-200" />
            <div className="w-3 h-3 rounded-full bg-blue-700"></div>
            <hr className="flex-1 border-t-2 border-blue-200" />
          </div>
          <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
            Informations sur les postes de police et contacts d'urgence dans la région de Mamou.
          </p>
        </div>

        {policeData.length === 0 ? (
          <div className="text-center py-20">
            <FaShieldAlt className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucune information disponible</h3>
            <p className="text-gray-500 text-lg">
              Les informations sur les forces de l'ordre ne sont pas disponibles pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {policeData.map((poste) => (
              <motion.div
                key={poste.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative h-64">
                  <img
                    src={getImageUrl(poste.image)}
                    alt={`${poste.nom} - ${getPostTypeDisplay(poste.typePoste)}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=300&width=400";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-xl font-bold text-white">{poste.nom}</h3>
                    <p className="text-yellow-400 font-medium">{getPostTypeDisplay(poste.typePoste)}</p>
                  </div>
                </div>

                <div className="p-6">
                  {poste.nomCommandant && (
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <FaUser className="text-blue-700 mr-2 text-sm" />
                        <p className="text-sm text-gray-500">Responsable</p>
                      </div>
                      <p className="text-lg font-semibold text-blue-900">{poste.nomCommandant}</p>
                    </div>
                  )}

                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center">
                      <FaMapPin className="text-blue-700 mr-2 text-sm flex-shrink-0" />
                      <span className="text-sm">{poste.localisation}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <FaPhone className="text-red-600 mr-2 text-sm flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-red-600">Urgence: </span>
                        <span className="text-sm font-semibold">{poste.contactUrgence}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <a 
                      href={`tel:${poste.contactUrgence}`}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <FaPhone className="mr-2" />
                      Appeler en urgence
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Police