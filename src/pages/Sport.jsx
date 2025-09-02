"use client";
import React, { useState, useEffect } from "react";
import { Calendar, ChevronRight, ChevronLeft, Share2, Newspaper, ChevronUp, Play, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { FaFutbol, FaMapPin, FaMoneyBill, FaRunning, FaTrophy } from "react-icons/fa";
import { FaBasketball, FaVolleyball } from "react-icons/fa6";

const Sport = ({ matchs = [], news = [] }) => {
  const [activeTabe, setActiveTabe] = useState("Football");
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get carousel images from news data or use fallback
  const getCarouselImages = () => {
    const newsImages = news
      .filter(item => item.imageSport && item.imageSport.length > 0)
      .map(item => {
        const imageUrl = item.imageSport[0].url;
        return imageUrl.startsWith('http') ? imageUrl : `https://cozy-sparkle-24ced58ec1.strapiapp.com${imageUrl}`;
      });
    
    // If we have news images, use them, otherwise use fallback images
    if (newsImages.length > 0) {
      return newsImages.slice(0, 3); // Limit to 3 images
    }
    
    // Fallback images if no news images available
    return [
      "https://images.pexels.com/photos/164332/pexels-photo-164332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/313700/pexels-photo-313700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];
  };

  const carouselImages = getCarouselImages();

  // Carousel functionality
  useEffect(() => {
    if (carouselImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [carouselImages.length]);

  const navigateNews = (direction) => {
    if (news.length === 0) return;
    
    if (direction === "next") {
      setActiveNewsIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));
    } else {
      setActiveNewsIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
    }
  };

  const activeNews = news[activeNewsIndex];

  // Get unique sport types from matches data
  const getAvailableSportTypes = () => {
    const uniqueSports = [...new Set(matchs.map(match => match.typeSport))];
    const sportIcons = {
      "Football": FaFutbol,
      "Basketball": FaBasketball,
      "Volleyball": FaVolleyball,
      "Athlétisme": FaRunning,
      "football": FaFutbol,
      "basketball": FaBasketball,
      "volleyball": FaVolleyball,
      "athlétisme": FaRunning,
    };

    return uniqueSports.map(sport => ({
      name: sport,
      icon: sportIcons[sport] || FaFutbol // Default to football icon
    }));
  };

  const sportTypes = getAvailableSportTypes();

  // Set first available sport as default if current selection doesn't exist
  useEffect(() => {
    if (sportTypes.length > 0 && !sportTypes.find(sport => sport.name === activeTabe)) {
      setActiveTabe(sportTypes[0].name);
    }
  }, [matchs, activeTabe, sportTypes]);

  const filteredMatches = matchs.filter((match) => match.typeSport === activeTabe);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Terminé":
        return "bg-gray-100 text-gray-800";
      case "En cours":
        return "bg-red-100 text-red-800 animate-pulse";
      case "Programmé":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTextFromBlock = (content) => {
    if (!content || !content.length) return "Contenu non disponible";
    return content[0]?.children?.[0]?.text || content[0]?.text || "Contenu non disponible";
  };

  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=400&width=600";
    const imageUrl = imageArray[0].url;
    return imageUrl.startsWith('http') ? imageUrl : `https://cozy-sparkle-24ced58ec1.strapiapp.com${imageUrl}`;
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-white font-[poppins]">
      <NavBar />

      {/* Hero Section with Dynamic Images */}
      <header className="relative min-h-[400px] md:min-h-[600px] flex items-center text-white pt-20">
        <div className="absolute inset-0 bg-black overflow-hidden">
          {carouselImages.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt="Sports background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              onError={(e) => {
                e.target.src = "https://images.pexels.com/photos/164332/pexels-photo-164332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-blue-900/40 to-transparent"></div>
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <div className="flex items-center text-sm mb-4 text-gray-300">
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Accueil</span>
              <ChevronRight className="mx-2 h-3 w-3" />
              <span className="font-semibold text-white">Sport</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">{activeNews?.titleSport}</h3>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              Suivez les résultats, les actualités et les événements sportifs de votre ville.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-yellow-600 to-yellow-300 hover:from-yellow-700 hover:to-yellow-700 text-black rounded-full px-6 py-3 font-semibold flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
                <Calendar className="mr-2 h-5 w-5" />
                Calendrier des matchs
              </button>
              <button className="bg-white/10 hover:bg-white/20 flex items-center rounded-full font-medium transition-colors backdrop-blur-sm px-6 py-3">
                <Share2 className="mr-2 h-5 w-5" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Dynamic Tabs Section */}
        <section className="mb-16">
          {sportTypes.length > 0 ? (
            <div className="flex items-center border-b border-gray-200 overflow-x-auto pb-2 scrollbar-hide">
              {sportTypes.map((sport) => (
                <button
                  key={sport.name}
                  className={`flex items-center px-5 py-3 rounded-full whitespace-nowrap mr-3 transition-all duration-300 text-base font-semibold ${
                    activeTabe === sport.name
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTabe(sport.name)}
                >
                  <sport.icon className="mr-2 h-5 w-5" />
                  {sport.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun sport disponible pour le moment.</p>
            </div>
          )}
        </section>

        {/* Match Cards */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 flex items-center">
            <FaTrophy className="mr-3 text-yellow-500" />
            Derniers Résultats
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm col-span-full">
                <FaTrophy className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucun match trouvé</h3>
                <p className="text-gray-500 text-lg">
                  {sportTypes.length === 0 
                    ? "Aucun match disponible pour le moment."
                    : "Veuillez sélectionner un autre sport ou vérifier ultérieurement."
                  }
                </p>
              </div>
            ) : (
              filteredMatches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">{match.dateMatch}</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusBadgeColor(match.statut)}`}>
                        {match.statut}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-center w-2/5">
                        <h3 className="font-bold text-lg text-gray-800">{match.equipeDomicile}</h3>
                      </div>
                      <div className="font-extrabold flex text-3xl text-gray-800 mx-2">
                        {match.statut !== "Programmé" ? `${match.scoreDomicile} - ${match.scoreVisiteur}` : "VS"}
                      </div>
                      <div className="text-center w-2/5">
                        <h3 className="font-bold text-lg text-gray-800">{match.equipeVisiteuse}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border-t border-gray-100 px-6 py-3 flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaMapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {match.lieu}
                    </div>
                    <div className="flex items-center font-semibold">
                      <FaMoneyBill className="h-4 w-4 mr-2 text-green-500" />
                      {match.fraisEntree}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* News Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 flex items-center">
            <Newspaper className="mr-3 text-blue-600" />
            Actualités Sportives
          </h2>
          <div className="relative">
            {news.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <Newspaper className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucune actualité trouvée</h3>
                <p className="text-gray-500 text-lg">Veuillez vérifier ultérieurement pour les dernières nouvelles.</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex items-center border border-gray-100">
                  <div className="md:w-1/2 lg:w-3/5">
                    <img
                      src={getImageUrl(activeNews?.imageSport)}
                      alt={activeNews?.titleSport || "Actualité sportive"}
                      className="w-full h-64 md:h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=400&width=600";
                      }}
                    />
                  </div>
                  <div className="p-6 md:p-8 md:w-1/2 lg:w-2/5">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                        {activeNews?.sportTitle || "Sport"}
                      </span>
                      <span className="text-gray-500 text-sm ml-4">{activeNews?.dateSport}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{activeNews?.titleSport}</h3>
                    <p className="text-gray-600 mb-6">{getTextFromBlock(activeNews?.contentSport)}</p>
                    <Link to={`/blog/sport/${activeNews?.id}`}>
                      <button className="font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                        Lire plus
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
                
                {news.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateNews("prev")}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-700 hover:bg-white z-20"
                      aria-label="Article précédent"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => navigateNews("next")}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-700 hover:bg-white z-20"
                      aria-label="Article suivant"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="flex justify-center mt-6">
                      {news.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveNewsIndex(index)}
                          className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
                            activeNewsIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`Aller à l'article ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Retourner en haut"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Sport;