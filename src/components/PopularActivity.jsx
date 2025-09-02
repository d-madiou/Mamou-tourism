"use client"

import { useState } from "react"
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa"
import { FaLightbulb } from "react-icons/fa6"
import { Link } from "react-router-dom"

function PopularActivity({ activities = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  

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
      'agriculture': 'bg-green-600',
      'tourism': 'bg-blue-600',
      'culture': 'bg-purple-600',
      'nature': 'bg-emerald-600',
      'sport': 'bg-orange-600',
      'default': 'bg-blue-700'
    };
    return colors[type] || colors.default;
  };

  // Navigation functions
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + activities.length) % activities.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activities.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  console.log("Activities data in component:", activities);

  if (activities.length === 0) {
    return (
      <div className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Activités <span className="text-blue-700">Populaires</span>
          </h1>
          <div className="flex items-center space-x-4 w-full max-w-sm mt-2">
            <hr className="flex-1 border-t-2 border-blue-200" />
            <FaLightbulb className="text-2xl text-yellow-500" />
            <hr className="flex-1 border-t-2 border-blue-200" />
          </div>
          <p className="text-lg mt-4 text-center text-gray-600 max-w-2xl">
            Chargement des activités populaires...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Activités <span className="text-blue-700">Populaires</span>
        </h1>
        <div className="flex items-center space-x-4 w-full max-w-sm mt-2">
          <hr className="flex-1 border-t-2 border-blue-200" />
          <FaLightbulb className="text-2xl text-yellow-500" />
          <hr className="flex-1 border-t-2 border-blue-200" />
        </div>
        <p className="text-lg mt-4 text-center text-gray-600 max-w-2xl">
          Découvrez les activités les plus appréciées et les expériences uniques que Mamou a à offrir
        </p>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={activity.id || index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={getImageUrl(activity.image)}
                  alt={activity.Titre}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=400&width=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Type Badge */}
                <div className={`absolute top-4 left-4 ${getTypeColor(activity.type)} text-white text-xs font-semibold px-3 py-1.5 rounded-full capitalize`}>
                  {activity.type || "Activité"}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-blue-900 line-clamp-2">
                  {activity.Titre || `Activité ${index + 1}`}
                </h2>
                
                <div className="flex items-center mb-4 flex-wrap gap-4">
                  {activity.date && (
                    <span className="text-gray-600 text-sm flex items-center">
                      <FaCalendarAlt className="mr-1.5 text-blue-600" />
                      {new Date(activity.date).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                  <span className="text-gray-600 text-sm flex items-center">
                    <FaMapMarkerAlt className="mr-1.5 text-blue-600" />
                    {activity.localisation || "Mamou"}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-5 line-clamp-3 leading-relaxed">
                  {getDescriptionText(activity.description)}
                </p>
                
                <Link 
                    to={`/blog/${activity.type}/${activity.id}`} 
                    className="flex items-center text-blue-700 cursor-pointer group hover:text-blue-800"
                  >
                    <span className="font-semibold text-sm mr-2">Voir Plus</span>
                    <FaInfoCircle className="transition-transform group-hover:scale-110" />
                  </Link>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Activity Carousel (if more than 3 activities) */}
      {activities.length > 3 && (
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Activité en Vedette</h2>
            <p className="text-gray-600">Découvrez notre sélection spéciale</p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-80">
                  <img
                    src={getImageUrl(activities[currentIndex]?.image)}
                    alt={activities[currentIndex]?.Titre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=400&width=600";
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className={`inline-block px-3 py-1 ${getTypeColor(activities[currentIndex]?.type)} text-white text-sm font-semibold rounded-full mb-4 capitalize`}>
                    {activities[currentIndex]?.type || "Activité"}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {activities[currentIndex]?.Titre}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {getDescriptionText(activities[currentIndex]?.description)}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    {activities[currentIndex]?.date && (
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-blue-600" />
                        {new Date(activities[currentIndex].date).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-blue-600" />
                      {activities[currentIndex]?.localisation || "Mamou"}
                    </div>
                  </div>
                  
                  <Link 
                      to={`/blog/${activities[currentIndex]?.type}/${activities[currentIndex]?.id}`}
                      className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors w-fit"
                    >
                      Découvrir maintenant
                    </Link>

                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300 z-10"
            >
              <FaChevronLeft />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300 z-10"
            >
              <FaChevronRight />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {activities.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-blue-700 w-8" : "bg-gray-300 hover:bg-blue-300"
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PopularActivity