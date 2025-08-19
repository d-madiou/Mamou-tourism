"use client"

import { ArrowRight, Calendar, Camera, ChevronLeft, ChevronRight, ChevronUp, ExternalLink, Facebook, Globe, Heart, Instagram, MapPin, Share2, Twitter, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ThreeDot } from "react-loading-indicators"
import NavBar from "../components/NavBar"
import Diwals from "../components/SousPrefectures"

const About = ({ loading, error, abouts, sousPrefectures}) => {
  const [activeTab, setActiveTab] = useState("histoire")
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const tabs = [
    { id: "histoire", label: "Histoire" },
    { id: "culture", label: "Culture" },
    { id: "economie", label: "Économie" },
    { id: "tourisme", label: "Tourisme" },
  ]

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
      <div className="flex h-screen items-center justify-center bg-blue-50">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <ThreeDot variant="pulsate" color="#1d4ed8" size="medium" text="Chargement..." textColor="#1d4ed8" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-50">
        <div className="rounded-lg bg-red-50 p-8 text-center text-red-700 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Erreur</h2>
          <p className="text-lg">Impossible de charger les données.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  if (!abouts?.length || !sousPrefectures?.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-50">
        <div className="rounded-lg bg-yellow-50 p-8 text-center text-yellow-700 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Aucune donnée</h2>
          <p className="text-lg">Informations non disponibles.</p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 rounded-full bg-yellow-600 px-6 py-2 text-white hover:bg-yellow-700"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <NavBar />
      <div className="bg-blue-900 py-20 shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold uppercase text-yellow-400 md:text-6xl">
            {abouts[0]?.aboutTitle || "À propos"}
          </h1>
          <div className="mt-4 flex items-center text-white">
            <a href="/" className="hover:text-yellow-300">Accueil</a>
            <ChevronRight className="mx-2 h-4 w-4" />
            <a href="/about" className="hover:text-yellow-300">À propos</a>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-yellow-200">Villes</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={shareContent}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
            >
              <Share2 className="h-4 w-4" />
              Partager
            </button>
            {showShareMenu && (
              <div className="absolute mt-2 flex gap-2 rounded-lg bg-white p-2 shadow-lg">
                <a href="#" className="rounded-full bg-blue-600 p-2 text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-full bg-blue-400 p-2 text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-full bg-pink-600 p-2 text-white">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            )}
            <a
              href="#diwal-section"
              className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-blue-900 hover:bg-yellow-300"
            >
              <MapPin className="h-4 w-4" />
              Explorer les diwees
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-20 rounded-2xl bg-white shadow-2xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {abouts[0]?.aboutImage[0]?.url && (
              <div className="relative overflow-hidden lg:order-2">
                <img 
                  src={
                    abouts[0]?.aboutImage?.[0]?.url?.startsWith("http")
                      ? abouts[0].aboutImage[0].url
                      : `https://cozy-sparkle-24ced58ec1.strapiapp.com${abouts[0].aboutImage[0].url}`
                  } 
                  alt={abouts[0]?.aboutImage?.[0]?.alternativeText || "About image"} 
                />

                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="rounded-full bg-white/80 p-2 text-blue-900 hover:bg-white">
                    <Camera className="h-5 w-5" />
                  </button>
                  <button className="rounded-full bg-white/80 p-2 text-blue-900 hover:bg-white">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center p-8 lg:order-1 lg:p-12">
              <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-4xl">
                {abouts[0]?.aboutTitle || "À propos"}
                <span className="block h-1 w-1/2 bg-yellow-400"></span>
              </h2>
              <div className="mb-6 flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      activeTab === tab.id ? "bg-blue-700 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div>
                {activeTab === "histoire" && (
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {abouts.map((about, index) => (
                      <div key={index}>
                        {about.aboutText.map((textItem, textIndex) => (
                          <p key={textIndex} className="mb-4 leading-relaxed">
                            {textItem.children.map((child, childIndex) => (
                              <span key={childIndex}>{child.text}</span>
                            ))}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "culture" && (
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="mb-4 leading-relaxed">Culture riche et diversifiée avec musique, danse et artisanat.</p>
                    <p className="mb-4 leading-relaxed">Festivals culturels pour préserver le patrimoine.</p>
                  </div>
                )}
                {activeTab === "economie" && (
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="mb-4 leading-relaxed">Économie basée sur l'agriculture, l'élevage et le commerce.</p>
                    <p className="mb-4 leading-relaxed">Développement des infrastructures et opportunités d'emploi.</p>
                  </div>
                )}
                {activeTab === "tourisme" && (
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="mb-4 leading-relaxed">Attractions touristiques : paysages, montagnes, cascades.</p>
                    <p className="mb-4 leading-relaxed">Artisanat local, cuisine et festivités culturelles.</p>
                  </div>
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#diwal-section"
                  className="flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
                >
                  <MapPin className="h-5 w-5" />
                  Explorer les diwees
                </a>
                <button className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-blue-700 hover:bg-blue-50">
                  <ExternalLink className="h-5 w-5" />
                  Plus de détails
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
            Statistiques
            <span className="block h-1 w-1/2 mx-auto bg-yellow-400"></span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-blue-700 p-6 text-white shadow-lg">
              <MapPin className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">9</h3>
              <p className="text-blue-100">Diwees</p>
            </div>
            <div className="rounded-xl bg-blue-800 p-6 text-white shadow-lg">
              <Calendar className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">1873</h3>
              <p className="text-blue-100">Fondation</p>
            </div>
            <div className="rounded-xl bg-blue-900 p-6 text-white shadow-lg">
              <Users className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">318 738</h3>
              <p className="text-blue-100">Population</p>
            </div>
            <div className="rounded-xl bg-blue-950 p-6 text-white shadow-lg">
              <Globe className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">5 400 km²</h3>
              <p className="text-blue-100">Superficie</p>
            </div>
          </div>
        </div>

        <Diwals diwals={sousPrefectures} />

        <div className="mb-20 rounded-2xl bg-blue-900 p-12 text-center text-white shadow-2xl">
          <h2 className="mb-4 text-3xl font-bold">Visiter?</h2>
          <p className="mb-8 text-xl text-blue-100">Découvrez la région</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-blue-900 hover:bg-yellow-300">
              Planifier
            </button>
            <button className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white hover:bg-white/10">
              Contacter
            </button>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
            FAQ
            <span className="block h-1 w-1/2 mx-auto bg-yellow-400"></span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "Meilleure période pour visiter?",
                answer: "Saison sèche, novembre à avril, climat agréable.",
              },
              {
                question: "Comment aller à Mamou depuis Conakry?",
                answer: "Par route nationale, taxi-brousse ou bus, 4-5 heures.",
              },
              {
                question: "Spécialités culinaires?",
                answer: "Riz sauce arachide, fouti, viande grillée.",
              },
              {
                question: "Hébergements disponibles?",
                answer: "Hôtels modernes et gîtes traditionnels.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 text-xl font-bold text-blue-800">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full bg-blue-700 p-3 text-white shadow-lg hover:bg-blue-800"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}

export default About