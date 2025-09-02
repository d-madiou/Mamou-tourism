
"use client";

import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Search,
  User,
  Users,
  Phone,
  Mail,
  GraduationCap,
  School,
  Home,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

// Carousel images (inspired by EducationPage)
const carouselImages = [
  "https://i.pinimg.com/1200x/63/10/1c/63101c87d3b3c0dea31484127f093a83.jpg",
  "https://international.blog.snes.edu/wp-content/uploads/sites/6/2019/05/guinee_2-scaled.jpg",
  "https://www.lerevelateur224.com/wp-content/uploads/2024/06/IMG-20240622-WA0018.jpg",
];

const Education = ({ data = [], loading = false, error = null, schools = [], statistiqueEdu = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Categories for filtering education content
  const categories = ["Tous", "enseignement", "formation", "orientation", "pedagogie", "infrastructure", "diplomes"];

  // Carousel functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image) return "/placeholder.svg?height=400&width=800";
    return image.url?.startsWith("http") ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
  };

  // Helper function to extract text from blocks
  const getTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "Description non disponible";
    let text = "";
    blocks.forEach((block) => {
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach((child) => {
          if (child.text) {
            text += child.text + " ";
          }
        });
      }
    });
    return text.trim() || "Description non disponible";
  };

  // Filter data based on search query and category
  const filteredData = data.filter((item) => {
    const matchesSearch = item.Titre?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || item.categorie === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get education statistics
  const getEducationStats = () => {
    if (!statistiqueEdu || statistiqueEdu.length === 0) {
      return {
        totalEcoles: "24+",
        totalEtudiants: "4.7K+",
        pourcentageReussite: "67%",
        candidatsExamen: "1.2K+",
      };
    }

    const stats = statistiqueEdu[0];
    const totalEtudiants = (stats.totalEtudiantsGarcons || 0) + (stats.totalEtudiantesFilles || 0);

    return {
      totalEcoles: `${stats.totalEcoles || 0}+`,
      totalEtudiants: totalEtudiants > 1000 ? `${(totalEtudiants / 1000).toFixed(1)}K+` : `${totalEtudiants}+`,
      pourcentageReussite: `${stats.pourcentageReussite || 0}%`,
      candidatsExamen: stats.candidatsExamen > 1000 ? `${(stats.candidatsExamen / 1000).toFixed(1)}K+` : `${stats.candidatsExamen || 0}+`,
    };
  };

  const stats = getEducationStats();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-blue-600 text-lg font-semibold">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur lors du chargement des données</h2>
          <p className="text-gray-600 mb-6">Veuillez réessayer plus tard ou contacter l'administrateur du site.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-gray-50 font-[poppins]">
      <NavBar />

      {/* Hero Section (adapted from EducationPage) */}
      <header className="relative min-h-[400px] md:min-h-[600px] flex items-center text-white pt-20">
        <div className="absolute inset-0 bg-black overflow-hidden">
          {carouselImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="Education background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-blue-900/40 to-transparent"></div>
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <div className="flex items-center text-sm mb-4 text-gray-300">
              <Home className="mr-2 h-4 w-4" />
              <Link to="/" className="hover:text-blue-400 transition-colors">Accueil</Link>
              <ChevronRight className="mx-2 h-3 w-3" />
              <span className="font-semibold text-white">Éducation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Éducation à Mamou
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              Découvrez les opportunités éducatives, les écoles et les statistiques de la région de Mamou.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-full px-6 py-3 font-semibold flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
                <Calendar className="mr-2 h-5 w-5" />
                Calendrier scolaire
              </button>
              <button className="bg-white/10 hover:bg-white/20 flex items-center rounded-full font-medium transition-colors backdrop-blur-sm px-6 py-3">
                <Mail className="mr-2 h-5 w-5" />
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section (adapted from EducationPage) */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 -mt-12 relative z-10 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher du contenu éducatif..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
              />
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 rounded-full text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "Tous" ? "Tous" : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schools Section (adapted from EducationPage) */}
      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Les Écoles de Mamou
          </h2>
        </div>
        {schools.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <School className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucune école trouvée</h3>
            <p className="text-gray-500 text-lg">Veuillez vérifier ultérieurement pour les informations sur les écoles.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schools.map((school, index) => (
              <Link key={school.id || index} to={`/blog/school/${school.id}`}>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={getImageUrl(school?.image?.[0])}
                      alt={school?.nom || `École ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=400&width=800";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-3 py-1 font-bold rounded-full bg-blue-100 text-blue-700">
                        {school.typeEcole || "ÉCOLE"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {school.anneeFondation && `Fondée en ${school.anneeFondation}`}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {school?.nom || `École ${index + 1}`}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{school?.localisation || "Mamou, Guinée"}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {getTextFromBlocks(school?.description)}
                    </p>
                    {school.nomDuDirecteur && (
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Directeur: {school.nomDuDirecteur}</span>
                      </div>
                    )}
                    {school.capaciteEleves && (
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Capacité: {school.capaciteEleves} élèves</span>
                      </div>
                    )}
                    {school.telephone && (
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{school.telephone}</span>
                      </div>
                    )}
                    {school.email && (
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{school.email}</span>
                      </div>
                    )}
                    <div className="mt-6">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-full font-semibold transition-all duration-300">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section (adapted from EducationPage) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              L'Éducation en Chiffres
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les statistiques clés sur l'éducation dans la région de Mamou
              {statistiqueEdu.length > 0 && statistiqueEdu[0].anneeEnCours && ` pour l'année ${statistiqueEdu[0].anneeEnCours}`}.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: stats.totalEcoles,
                label: "Total des écoles",
                icon: School,
                description: "Établissements scolaires",
              },
              {
                value: stats.totalEtudiants,
                label: "Total des étudiants",
                icon: Users,
                description: "Garçons et filles confondus",
              },
              {
                value: stats.pourcentageReussite,
                label: "Taux de réussite",
                icon: GraduationCap,
                description: "Aux examens officiels",
              },
              {
                value: stats.candidatsExamen,
                label: "Candidats aux examens",
                icon: BookOpen,
                description: "Cette année",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-700 font-semibold mb-1">{stat.label}</p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
          {statistiqueEdu.length > 0 && (
            <div className="mt-12 text-center">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-semibold">Étudiants garçons:</span>
                  <span className="font-bold text-blue-600">
                    {statistiqueEdu[0].totalEtudiantsGarcons?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Étudiantes filles:</span>
                  <span className="font-bold text-blue-600">
                    {statistiqueEdu[0].totalEtudiantesFilles?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Education;