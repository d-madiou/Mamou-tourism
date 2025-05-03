"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Facebook,
  Globe,
  Heart,
  Instagram,
  MapPin,
  Share2,
  Twitter,
  Users
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ThreeDot } from "react-loading-indicators"
import NavBar from "../components/NavBar"

const About = ({ loading, error, abouts, diwals }) => {
  const [activeDiwal, setActiveDiwal] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeTab, setActiveTab] = useState("histoire")
  const [showShareMenu, setShowShareMenu] = useState(false)
  const diwalContainerRef = useRef(null)

  // Tabs for the about section
  const tabs = [
    { id: "histoire", label: "Histoire" },
    { id: "culture", label: "Culture" },
    { id: "economie", label: "Économie" },
    { id: "tourisme", label: "Tourisme" },
  ]

  useEffect(() => {
    setIsVisible(true)

    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Show scroll to top button when scrolled down
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to diwal section when changing active diwal
  useEffect(() => {
    if (diwalContainerRef.current) {
      diwalContainerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [activeDiwal])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const shareContent = () => {
    setShowShareMenu(!showShareMenu)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-white p-8 shadow-lg"
        >
          <ThreeDot variant="pulsate" color="#1d4ed8" size="medium" text="Chargement..." textColor="#1d4ed8" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-red-50 p-8 text-center text-red-700 shadow-lg"
        >
          <h2 className="mb-4 text-2xl font-bold">Une erreur s'est produite</h2>
          <p className="text-lg">Impossible de charger les données. Veuillez réessayer plus tard.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-red-600 px-6 py-2 text-white transition-all hover:bg-red-700"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    )
  }

  if (!abouts?.length || !diwals?.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-yellow-50 p-8 text-center text-yellow-700 shadow-lg"
        >
          <h2 className="mb-4 text-2xl font-bold">Aucune donnée disponible</h2>
          <p className="text-lg">Les informations sur cette page ne sont pas encore disponibles.</p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 rounded-full bg-yellow-600 px-6 py-2 text-white transition-all hover:bg-yellow-700"
          >
            Retour
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />

      {/* Hero Section with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mt-15"
      >
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 py-20 shadow-xl">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-bold uppercase text-yellow-400 md:text-6xl"
            >
              {abouts[0]?.aboutTitle || "À propos de Mamou"}
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 flex items-center text-white"
            >
              <a href="/" className="transition-colors hover:text-yellow-300">
                Accueil
              </a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <a href="/about" className="transition-colors hover:text-yellow-300">
                À propos de Mamou
              </a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span className="text-yellow-200">Principales Villes</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button
                onClick={shareContent}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Share2 className="h-4 w-4" />
                Partager
              </button>

              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute mt-2 flex gap-2 rounded-lg bg-white p-2 shadow-lg"
                  >
                    <motion.a href="#" whileHover={{ y: -5 }} className="rounded-full bg-blue-600 p-2 text-white">
                      <Facebook className="h-5 w-5" />
                    </motion.a>
                    <motion.a href="#" whileHover={{ y: -5 }} className="rounded-full bg-blue-400 p-2 text-white">
                      <Twitter className="h-5 w-5" />
                    </motion.a>
                    <motion.a href="#" whileHover={{ y: -5 }} className="rounded-full bg-pink-600 p-2 text-white">
                      <Instagram className="h-5 w-5" />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href="#diwal-section"
                className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-blue-900 transition-all hover:bg-yellow-300"
              >
                <MapPin className="h-4 w-4" />
                Explorer les diwees
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        {/* About Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="mb-20 overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {abouts[0]?.aboutImage[0]?.url && (
              <div className="relative overflow-hidden lg:order-2">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={`http://localhost:1337${abouts[0].aboutImage[0].url}`}
                  alt={abouts[0].aboutImage[0]?.name || "Image de Mamou"}
                  className="h-full w-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute bottom-4 right-4 flex gap-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-white/80 p-2 text-blue-900 backdrop-blur-sm transition-all hover:bg-white"
                  >
                    <Camera className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-white/80 p-2 text-blue-900 backdrop-blur-sm transition-all hover:bg-white"
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              </div>
            )}

            <div className="flex flex-col justify-center p-8 lg:order-1 lg:p-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-4xl">
                  <span className="relative inline-block">
                    {abouts[0]?.aboutTitle || "À propos de Mamou"}
                    <span className="absolute bottom-0 left-0 h-1 w-1/2 bg-yellow-400"></span>
                  </span>
                </h2>

                {/* Tabs Navigation */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        activeTab === tab.id ? "bg-blue-700 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                    >
                      {tab.label}
                    </motion.button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "histoire" && (
                      <div className="prose prose-lg max-w-none text-gray-700">
                        {abouts.map((about, index) => (
                          <div key={index}>
                            {about.aboutText.map((textItem, textIndex) => (
                              <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + textIndex * 0.1, duration: 0.5 }}
                                key={textIndex}
                                className="mb-4 leading-relaxed"
                              >
                                {textItem.children.map((child, childIndex) => (
                                  <span key={childIndex}>{child.text}</span>
                                ))}
                              </motion.p>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "culture" && (
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4 leading-relaxed">
                          La culture de Mamou est riche et diversifiée, reflétant les traditions des différentes ethnies
                          qui y cohabitent. La musique, la danse et l'artisanat traditionnel occupent une place
                          importante dans la vie quotidienne.
                        </p>
                        <p className="mb-4 leading-relaxed">
                          Les cérémonies traditionnelles et les festivals culturels sont régulièrement organisés,
                          permettant de préserver et de transmettre le patrimoine culturel aux nouvelles générations.
                        </p>
                      </div>
                    )}

                    {activeTab === "economie" && (
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4 leading-relaxed">
                          L'économie de Mamou repose principalement sur l'agriculture, l'élevage et le commerce. La
                          région est connue pour sa production de fruits, de légumes et de produits laitiers.
                        </p>
                        <p className="mb-4 leading-relaxed">
                          Le développement des infrastructures et l'amélioration des conditions de vie sont des
                          priorités pour les autorités locales, qui travaillent à attirer les investissements et à créer
                          des opportunités d'emploi.
                        </p>
                      </div>
                    )}

                    {activeTab === "tourisme" && (
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4 leading-relaxed">
                          Mamou offre de nombreuses attractions touristiques, notamment ses paysages naturels
                          spectaculaires, ses montagnes, ses cascades et ses forêts luxuriantes.
                        </p>
                        <p className="mb-4 leading-relaxed">
                          Les visiteurs peuvent également découvrir l'artisanat local, goûter à la cuisine
                          traditionnelle et participer aux festivités culturelles qui animent la région tout au long de
                          l'année.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <a
                    href="#diwal-section"
                    className="flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-white transition-all hover:bg-blue-800"
                  >
                    <MapPin className="h-5 w-5" />
                    Explorer les diwees
                  </a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-blue-700 transition-all hover:bg-blue-50"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Voir plus de détails
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
            <span className="relative inline-block">
              Mamou en chiffres
              <span className="absolute -bottom-2 left-1/4 h-1 w-1/2 bg-yellow-400"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="rounded-xl bg-blue-700 p-6 text-white shadow-lg transition-all"
            >
              <MapPin className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">9</h3>
              <p className="text-blue-100">Diwees</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="rounded-xl bg-blue-800 p-6 text-white shadow-lg transition-all"
            >
              <Calendar className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">1873</h3>
              <p className="text-blue-100">Année de fondation</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="rounded-xl bg-blue-900 p-6 text-white shadow-lg transition-all"
            >
              <Users className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">318 738</h3>
              <p className="text-blue-100">Population</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="rounded-xl bg-blue-950 p-6 text-white shadow-lg transition-all"
            >
              <Globe className="mb-3 h-10 w-10 text-yellow-300" />
              <h3 className="text-2xl font-bold">5 400 km²</h3>
              <p className="text-blue-100">Superficie</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Diwal Navigation */}
        <motion.div
          id="diwal-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 scroll-mt-24"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
            <span className="relative inline-block">
              Découvrez nos 9 diwees
              <span className="absolute -bottom-2 left-1/4 h-1 w-1/2 bg-yellow-400"></span>
            </span>
          </h2>

          <div className="flex justify-center overflow-x-auto pb-6">
            <div className="flex flex-wrap justify-center gap-3">
              {diwals.map((diwal, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveDiwal(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`whitespace-nowrap rounded-full px-6 py-3 text-lg font-medium transition-all duration-300 ${
                    activeDiwal === index
                      ? "bg-blue-700 text-white shadow-lg"
                      : "bg-white text-blue-900 hover:bg-blue-50"
                  }`}
                >
                  {diwal.diwalTitre}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Diwal Content with Animation */}
        <motion.div
          ref={diwalContainerRef}
          key={activeDiwal}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:p-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h3 className="mb-6 text-2xl font-bold text-blue-800">
                  <span className="relative inline-block">
                    {diwals[activeDiwal]?.diwalTitre}
                    <span className="absolute bottom-0 left-0 h-1 w-1/3 bg-yellow-400"></span>
                  </span>
                </h3>
              </motion.div>

              {diwals[activeDiwal]?.diwalText.map((textItem, textIndex) => (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * textIndex, duration: 0.5 }}
                  key={textIndex}
                  className="mb-4 leading-relaxed"
                >
                  {textItem.children.map((child, childIndex) => (
                    <span key={childIndex}>{child.text}</span>
                  ))}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center rounded-full bg-blue-700 px-6 py-3 text-white transition-all hover:bg-blue-800"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 transition-all hover:bg-blue-50"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Voir sur la carte
                </motion.button>
              </motion.div>
            </div>

            {diwals[activeDiwal]?.diwalPhoto[0]?.url && (
              <div className="overflow-hidden rounded-xl shadow-lg">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  src={`http://localhost:1337${diwals[activeDiwal].diwalPhoto[0].url}`}
                  alt={diwals[activeDiwal].diwalPhoto[0]?.name || "Image de région"}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Diwal Navigation Arrows */}
          <div className="flex items-center justify-between px-8 pb-8 lg:px-12">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDiwal((prev) => (prev === 0 ? diwals.length - 1 : prev - 1))}
              className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700 transition-all hover:bg-blue-100"
            >
              <ChevronLeft className="h-5 w-5" />
              {diwals[activeDiwal === 0 ? diwals.length - 1 : activeDiwal - 1]?.diwalTitre}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDiwal((prev) => (prev === diwals.length - 1 ? 0 : prev + 1))}
              className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700 transition-all hover:bg-blue-100"
            >
              {diwals[activeDiwal === diwals.length - 1 ? 0 : activeDiwal + 1]?.diwalTitre}
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-12 text-center text-white shadow-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold">Vous souhaitez visiter Mamou?</h2>
            <p className="mb-8 text-xl text-blue-100">Découvrez toutes les merveilles que notre région a à offrir</p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-blue-900 transition-all hover:bg-yellow-300"
              >
                Planifier votre visite
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
              >
                Contacter un guide
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
            <span className="relative inline-block">
              Questions fréquentes
              <span className="absolute -bottom-2 left-1/4 h-1 w-1/2 bg-yellow-400"></span>
            </span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "Quelle est la meilleure période pour visiter Mamou?",
                answer:
                  "La meilleure période pour visiter Mamou est pendant la saison sèche, de novembre à avril, lorsque le climat est plus agréable et les routes plus accessibles.",
              },
              {
                question: "Comment se rendre à Mamou depuis Conakry?",
                answer:
                  "Vous pouvez vous rendre à Mamou depuis Conakry par la route nationale, en taxi-brousse ou en bus. Le trajet dure environ 4 à 5 heures selon les conditions routières.",
              },
              {
                question: "Quelles sont les spécialités culinaires de Mamou?",
                answer:
                  "Mamou est connue pour ses plats traditionnels comme le riz sauce arachide, le fouti (couscous de manioc), et divers plats à base de viande grillée accompagnés de sauces locales.",
              },
              {
                question: "Y a-t-il des hébergements pour les touristes à Mamou?",
                answer:
                  "Oui, Mamou dispose de plusieurs options d'hébergement, des hôtels modernes aux gîtes traditionnels, adaptés à différents budgets et préférences.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-3 text-xl font-bold text-blue-800">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 rounded-full bg-blue-700 p-3 text-white shadow-lg transition-all hover:bg-blue-800"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default About
