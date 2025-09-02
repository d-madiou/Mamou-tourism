"use client"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ExternalLink, Facebook, Globe, Instagram, MapPin, Share2, TrendingUp, Twitter, Users, Play, Pause } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ThreeDot } from "react-loading-indicators"
import NavBar from "../components/NavBar"
import SousPrefectures from "../components/SousPrefectures"

const About = ({ loading, error, abouts, sousPrefectures }) => {
  const [activeTab, setActiveTab] = useState("histoire")
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
 
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
 
  // FAQ state
  const [openFAQItems, setOpenFAQItems] = useState(new Set([0]))

  const tabs = [
    { id: "histoire", label: "Histoire", icon: Calendar },
    { id: "culture", label: "Culture", icon: Globe },
    { id: "economie", label: "Économie", icon: TrendingUp },
    { id: "tourisme", label: "Tourisme", icon: Users },
  ]

  const faqs = [
    {
      question: "Quelle est la meilleure période pour visiter?",
      answer: "La saison sèche, de novembre à avril, offre un climat agréable avec des températures modérées et peu de précipitations, idéal pour explorer la région."
    },
    {
      question: "Comment se rendre à Mamou depuis Conakry?",
      answer: "Plusieurs options s'offrent à vous : par route nationale via taxi-brousse ou bus (4-5 heures), ou par transport privé pour plus de confort."
    },
    {
      question: "Quelles sont les spécialités culinaires locales?",
      answer: "Découvrez nos délicieuses spécialités : riz à la sauce arachide, fouti traditionnel, viandes grillées aux épices locales, et fruits frais de saison."
    },
    {
      question: "Quels types d'hébergements sont disponibles?",
      answer: "Une gamme variée d'options : hôtels modernes avec toutes commodités, gîtes traditionnels authentiques, et maisons d'hôtes familiales chaleureuses."
    }
  ]

  // Prepare carousel images
  const carouselImages = abouts[0]?.aboutImage || []

  // Carousel functionality
  useEffect(() => {
    if (!isPlaying || carouselImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [isPlaying, carouselImages.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // FAQ functionality
  const toggleFAQItem = (index) => {
    const newOpenItems = new Set(openFAQItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenFAQItems(newOpenItems)
  }

  // Tab content functionality
  const getTabIcon = (tabId) => {
    switch (tabId) {
      case 'histoire': return <Calendar className="h-5 w-5" />
      case 'culture': return <Globe className="h-5 w-5" />
      case 'economie': return <TrendingUp className="h-5 w-5" />
      case 'tourisme': return <Users className="h-5 w-5" />
      default: return null
    }
  }

  const getTabContent = (tabId) => {
    switch (tabId) {
      case 'histoire':
        return abouts.map((about, index) => (
          <div key={index} className="space-y-4">
            {about.aboutText.map((textItem, textIndex) => (
              <p key={textIndex} className="text-lg leading-relaxed text-gray-700">
                {textItem.children.map((child, childIndex) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>
        ))
      case 'culture':
        return (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700">
              Culture riche et diversifiée avec musique, danse et artisanat traditionnel qui reflètent l'identité unique de notre région.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Festivals culturels organisés tout au long de l'année pour préserver et célébrer notre patrimoine ancestral.
            </p>
          </div>
        )
      case 'economie':
        return (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700">
              Économie dynamique basée sur l'agriculture durable, l'élevage moderne et le commerce équitable.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Développement continu des infrastructures et création d'opportunités d'emploi pour la jeunesse.
            </p>
          </div>
        )
      case 'tourisme':
        return (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700">
              Attractions touristiques exceptionnelles : paysages montagneux, cascades cristallines et patrimoine naturel préservé.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Artisanat local authentique, cuisine traditionnelle savoureuse et festivités culturelles tout au long de l'année.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const shareContent = () => {
    setShowShareMenu(!showShareMenu)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="rounded-2xl bg-white/80 p-8 backdrop-blur-sm">
          <ThreeDot variant="pulsate" color="#1e40af" size="medium" text="Chargement..." textColor="#1e40af" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="rounded-2xl bg-white p-8 text-center">
          <div className="mb-4 text-6xl">😔</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Oops! Une erreur s'est produite</h2>
          <p className="mb-6 text-gray-600">Impossible de charger les données.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-red-500 px-6 py-3 text-white hover:bg-red-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  if (!abouts?.length || !sousPrefectures?.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="rounded-2xl bg-white p-8 text-center">
          <div className="mb-4 text-6xl">📭</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Aucune donnée disponible</h2>
          <p className="mb-6 text-gray-600">Les informations ne sont pas encore disponibles.</p>
          <button
            onClick={() => window.history.back()}
            className="rounded-full bg-yellow-500 px-6 py-3 text-white hover:bg-yellow-600 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-[poppins] text-white">
      <NavBar />
     
      {/* Hero Section with Carousel */}
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative h-[70vh] overflow-hidden">
          {carouselImages.length > 0 && (
            <>
              {/* Image Container */}
              <div className="relative h-full">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={
                        image.url.startsWith("http")
                          ? image.url
                          : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`
                      }
                      alt={image.alternativeText || `Slide ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
              {/* Navigation Arrows */}
              {carouselImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              {/* Dots Indicator */}
              {carouselImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-yellow-400 w-8'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
              {/* Play/Pause Button */}
              {carouselImages.length > 1 && (
                <button
                  onClick={togglePlayPause}
                  className="absolute bottom-6 right-6 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
              )}
            </>
          )}
        </div>
       
        {/* Hero Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {abouts[0]?.aboutTitle || "À propos"}
            </h1>
            <div className="flex items-center justify-center text-white/80 mb-8">
              <a href="/" className="hover:text-yellow-300 transition-colors">Accueil</a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <a href="/about" className="hover:text-yellow-300 transition-colors">À propos</a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span className="text-yellow-200">Découverte</span>
            </div>
           
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="relative">
                <button
                  onClick={shareContent}
                  className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white backdrop-blur-md hover:bg-white/30 transition-all hover:scale-105"
                >
                  <Share2 className="h-5 w-5" />
                  Partager
                </button>
                {showShareMenu && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex gap-2 rounded-xl bg-white/95 p-3 backdrop-blur-sm">
                    <a href="facebook.com" className="rounded-full bg-blue-600 p-3 text-white hover:scale-110 transition-transform">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="twiter.com" className="rounded-full bg-sky-500 p-3 text-white hover:scale-110 transition-transform">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="instagram.com" className="rounded-full bg-pink-600 p-3 text-white hover:scale-110 transition-transform">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>
             
              <a
                href="#content-section"
                className="flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-blue-900 hover:bg-yellow-300 transition-all hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" />
                Découvrir plus
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="content-section" className="container mx-auto px-4 py-20">
        {/* About Content */}
        <div className="mb-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Découvrez Notre Histoire
              </h2>
            </div>
            {/* Tab Navigation */}
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                        : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 hover:border-blue-300"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            {/* Tab Content */}
            <div className="rounded-3xl bg-white/70 backdrop-blur-sm p-8 md:p-12">
              <div className="animated-content">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                    {getTabIcon(activeTab)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 capitalize">
                    {activeTab}
                  </h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  {getTabContent(activeTab)}
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href="#sous-prefecture-section"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-white hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 shadow-lg"
              >
                <MapPin className="h-5 w-5 group-hover:animate-bounce" />
                Explorer les sous-préfectures
              </a>
              <button className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-blue-700 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all hover:scale-105">
                <ExternalLink className="h-5 w-5" />
                Plus de détails
              </button>
            </div>
          </div>
        </div>
        {/* Regions Section */}
        <div id="diwal-section" className="mb-20">
          <SousPrefectures sousPrefectures={sousPrefectures} />
        </div>
        {/* Modern FAQ Section */}
        <div className="mb-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
                Questions Fréquentes
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Trouvez les réponses à vos questions les plus courantes
              </p>
            </div>
           
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-blue-300"
                >
                  <button
                    onClick={() => toggleFAQItem(index)}
                    className="w-full px-6 py-5 text-left transition-all duration-300 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-4">
                        {openFAQItems.has(index) ? (
                          <ChevronUp className="h-5 w-5 text-blue-500 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:text-blue-500" />
                        )}
                      </div>
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-110 z-50"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
      <style jsx>{`
        .animated-content {
          animation: slideIn 0.5s ease-out;
        }
       
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
       
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
       
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default About