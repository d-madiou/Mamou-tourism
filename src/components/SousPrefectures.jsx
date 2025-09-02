
import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const SousPrefectures = ({ sousPrefectures = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sousPrefectures.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === sousPrefectures.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Early return if no data
  if (!sousPrefectures || sousPrefectures.length === 0) {
    return (
      <section id="sous-prefecture-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Découvrez les Sous-Préfectures
          </h2>
          <div className="flex justify-center mb-8">
            <span className="block h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
          </div>
          <p className="text-gray-500 text-lg">Aucune information sur les sous-préfectures n'est disponible pour le moment.</p>
        </div>
      </section>
    );
  }

  const { nom, titre, description, chefLieu, nombreDistricts, population, superficieKm2, image } = sousPrefectures[currentIndex];

  return (
    <section id="sous-prefecture-section" className="py-8 bg-gray-50 font-[poppins]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Découvrez les Sous-Préfectures
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl bg-white border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
              {/* Text Info */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{nom}</h3>
                <p className="text-lg text-blue-600 font-semibold mb-6">{titre}</p>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {description?.[0]?.children?.[0]?.text || description || "Description non disponible."}
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700 mb-8">
                  {chefLieu && (
                    <li className="flex flex-col">
                      <strong className="font-semibold">Chef-lieu:</strong> <span>{chefLieu}</span>
                    </li>
                  )}
                  {nombreDistricts && (
                    <li className="flex flex-col">
                      <strong className="font-semibold">Districts:</strong> <span>{nombreDistricts}</span>
                    </li>
                  )}
                  {population && (
                    <li className="flex flex-col">
                      <strong className="font-semibold">Population:</strong>{" "}
                      <span>{parseInt(population).toLocaleString()}</span>
                    </li>
                  )}
                  {superficieKm2 && (
                    <li className="flex flex-col">
                      <strong className="font-semibold">Superficie:</strong> <span>{superficieKm2} km²</span>
                    </li>
                  )}
                </ul>
              </div>
              {/* Image */}
              <div className="relative min-h-[300px] md:min-h-0">
                <img
                  src={image?.[0]?.url?.startsWith("http") ? image[0].url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image?.[0]?.url || "/placeholder.svg"}`}
                  alt={image?.[0]?.alternativeText || nom || "Image"}
                  className="absolute inset-0 h-60% w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r"></div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {sousPrefectures.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-700 hover:bg-white z-20"
                aria-label="Sous-préfecture précédente"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-700 hover:bg-white z-20"
                aria-label="Sous-préfecture suivante"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {sousPrefectures.length > 1 && (
          <div className="flex justify-center mt-8">
            {sousPrefectures.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
                  currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Aller à la sous-préfecture ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SousPrefectures;