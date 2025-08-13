"use client"

import { useState } from "react"
import {
  Calendar,
  MapPin,
  Users,
  Building,
  Wrench,
  Heart,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
} from "lucide-react"
import { FaHome } from "react-icons/fa"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

function Mairie() {
  const [activeCategory, setActiveCategory] = useState("tous")

  // Sample data for municipal projects
  const projects = [
    {
      id: 1,
      title: "Rénovation du Marché Central",
      description:
        "Modernisation complète du marché central de Mamou avec de nouveaux stands, un système d'évacuation des eaux et un éclairage moderne.",
      category: "infrastructure",
      status: "en-cours",
      budget: "2,500,000,000 GNF",
      startDate: "Janvier 2024",
      endDate: "Décembre 2024",
      progress: 65,
      location: "Centre-ville, Mamou",
      image: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: 2,
      title: "Construction de l'École Primaire de Dalaba",
      description:
        "Construction d'une nouvelle école primaire de 12 salles de classe avec bibliothèque, cantine et terrain de sport.",
      category: "education",
      status: "planifie",
      budget: "1,800,000,000 GNF",
      startDate: "Mars 2024",
      endDate: "Septembre 2025",
      progress: 15,
      location: "Quartier Dalaba, Mamou",
      image: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: 3,
      title: "Réhabilitation des Routes Urbaines",
      description:
        "Réparation et bitumage de 15 km de routes dans les quartiers de Mamou pour améliorer la circulation.",
      category: "infrastructure",
      status: "en-cours",
      budget: "3,200,000,000 GNF",
      startDate: "Octobre 2023",
      endDate: "Juin 2024",
      progress: 80,
      location: "Plusieurs quartiers",
      image: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: 4,
      title: "Centre de Santé Communautaire",
      description:
        "Construction d'un centre de santé moderne avec maternité, pharmacie et équipements médicaux de base.",
      category: "sante",
      status: "termine",
      budget: "1,500,000,000 GNF",
      startDate: "Juin 2023",
      endDate: "Décembre 2023",
      progress: 100,
      location: "Quartier Petel, Mamou",
      image: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: 5,
      title: "Système d'Adduction d'Eau Potable",
      description:
        "Installation de nouvelles pompes et extension du réseau d'eau potable pour desservir 5000 habitants supplémentaires.",
      category: "infrastructure",
      status: "en-cours",
      budget: "4,100,000,000 GNF",
      startDate: "Août 2023",
      endDate: "Août 2024",
      progress: 45,
      location: "Zones périphériques",
      image: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: 6,
      title: "Parc Municipal et Aire de Jeux",
      description: "Aménagement d'un parc public avec aires de jeux pour enfants, espaces verts et bancs publics.",
      category: "environnement",
      status: "planifie",
      budget: "800,000,000 GNF",
      startDate: "Mai 2024",
      endDate: "Octobre 2024",
      progress: 5,
      location: "Centre-ville, Mamou",
      image: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
  ]

  const categories = [
    { id: "tous", label: "Tous les projets", icon: <Building /> },
    { id: "infrastructure", label: "Infrastructure", icon: <Wrench /> },
    { id: "education", label: "Éducation", icon: <Users /> },
    { id: "sante", label: "Santé", icon: <Heart /> },
    { id: "environnement", label: "Environnement", icon: <MapPin /> },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "termine":
        return "bg-green-100 text-green-800"
      case "en-cours":
        return "bg-blue-100 text-blue-800"
      case "planifie":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "termine":
        return <CheckCircle className="h-4 w-4" />
      case "en-cours":
        return <Play className="h-4 w-4" />
      case "planifie":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "termine":
        return "Terminé"
      case "en-cours":
        return "En cours"
      case "planifie":
        return "Planifié"
      default:
        return "Inconnu"
    }
  }

  const filteredProjects =
    activeCategory === "tous" ? projects : projects.filter((project) => project.category === activeCategory)

  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center text-sm mb-4">
              <FaHome className="mr-2" />
              <span>Accueil</span>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span>Mairie</span>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span>Projets</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Projets de la Mairie</h1>
            <p className="text-xl text-blue-100 mb-8">
              Découvrez les projets de développement en cours et à venir pour améliorer la vie des habitants de Mamou
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{projects.length}</h3>
            <p className="text-gray-600">Projets Total</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {projects.filter((p) => p.status === "termine").length}
            </h3>
            <p className="text-gray-600">Terminés</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {projects.filter((p) => p.status === "en-cours").length}
            </h3>
            <p className="text-gray-600">En cours</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {projects.filter((p) => p.status === "planifie").length}
            </h3>
            <p className="text-gray-600">Planifiés</p>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Projets Phares</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                      Projet Phare
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                      >
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{getStatusLabel(project.status)}</span>
                      </span>
                      <span className="text-xs text-gray-500">{project.category}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-blue-700" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-blue-700" />
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progression</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-700 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-blue-700">Budget: {project.budget}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tous les Projets</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id ? "bg-blue-700 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                  >
                    {getStatusIcon(project.status)}
                    <span className="ml-1">{getStatusLabel(project.status)}</span>
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{project.category}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-blue-700" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-blue-700" />
                    {project.startDate} - {project.endDate}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-700 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-blue-700">{project.budget}</div>
                  <button className="text-blue-700 hover:text-blue-800 text-sm font-medium">Voir détails →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-blue-700 text-white rounded-xl p-8 mt-16">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Questions sur nos projets ?</h2>
              <p className="text-blue-100 mb-4">
                Notre équipe est disponible pour répondre à toutes vos questions concernant les projets municipaux en
                cours ou à venir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>Mairie de Mamou</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>Centre-ville, Mamou</span>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Mairie
