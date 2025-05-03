"use client"

import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { FaChevronRight, FaHome } from "react-icons/fa"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function PlaceVisite() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [attractionType, setAttractionType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState([])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [expandedPrefecture, setExpandedPrefecture] = useState(null)
  const [showWeather, setShowWeather] = useState(false)
  const sliderRef = useRef(null)

  // List of all 13 sous-prefectures of Mamou
  const sousPrefectures = [
    {
      id: 1,
      name: "Tolo",
      description: "Connue pour ses paysages montagneux et ses cascades pittoresques.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: ["Cascade de Tolo", "Mont Tolo", "Forêt sacrée", "Marché traditionnel", "Village artisanal"],
      bestTimeToVisit: "Novembre à Mars",
      featured: true,
    },
    {
      id: 2,
      name: "Timbo",
      description: "Site historique important, ancienne capitale de l'empire du Fouta-Djalon.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Mosquée historique",
        "Palais de l'Almamy",
        "Musée du Fouta-Djalon",
        "Jardins de Timbo",
        "Centre culturel",
      ],
      bestTimeToVisit: "Toute l'année",
      featured: true,
    },
    {
      id: 3,
      name: "Poredaka",
      description: "Célèbre pour ses vallées fertiles et ses traditions agricoles.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Vallée de Poredaka",
        "Plantations traditionnelles",
        "Rivière Kokoulo",
        "Sentiers de randonnée",
        "Fermes locales",
      ],
      bestTimeToVisit: "Avril à Juin",
      featured: false,
    },
    {
      id: 4,
      name: "Téguéréyah",
      description: "Réputée pour ses sources thermales et ses paysages montagneux.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Sources thermales",
        "Montagnes de Téguéréyah",
        "Grottes naturelles",
        "Jardins botaniques",
        "Artisanat local",
      ],
      bestTimeToVisit: "Octobre à Avril",
      featured: true,
    },
    {
      id: 5,
      name: "Niagara",
      description: "Offre des paysages aquatiques impressionnants et une biodiversité riche.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Chutes d'eau",
        "Réserve naturelle",
        "Observation des oiseaux",
        "Sentiers écologiques",
        "Pêche traditionnelle",
      ],
      bestTimeToVisit: "Mai à Octobre",
      featured: false,
    },
    {
      id: 6,
      name: "Madina km15",
      description: "Carrefour culturel important, lieu de rencontre et d'échanges commerciaux.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Grand marché hebdomadaire",
        "Centre artisanal",
        "Festivals culturels",
        "Gastronomie locale",
        "Architecture traditionnelle",
      ],
      bestTimeToVisit: "Jours de marché (mercredi)",
      featured: false,
    },
    {
      id: 7,
      name: "Koumi",
      description: "Connue pour ses paysages pittoresques et ses traditions pastorales.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Collines de Koumi",
        "Élevage traditionnel",
        "Fabrication de fromage local",
        "Randonnées panoramiques",
        "Festivals pastoraux",
      ],
      bestTimeToVisit: "Novembre à Février",
      featured: false,
    },
    {
      id: 8,
      name: "Dounet",
      description: "Réputée pour ses forêts denses et sa biodiversité exceptionnelle.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Forêt classée de Dounet",
        "Sanctuaire d'oiseaux",
        "Cascades cachées",
        "Sentiers forestiers",
        "Campements écologiques",
      ],
      bestTimeToVisit: "Décembre à Mars",
      featured: true,
    },
    {
      id: 9,
      name: "Konkouré",
      description: "Traversée par le fleuve du même nom, offrant des paysages fluviaux magnifiques.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Fleuve Konkouré",
        "Pêche traditionnelle",
        "Excursions en pirogue",
        "Berges pittoresques",
        "Observation de la faune aquatique",
      ],
      bestTimeToVisit: "Novembre à Mai",
      featured: false,
    },
    {
      id: 10,
      name: "Bouliwel",
      description: "Connue pour ses plateaux et ses panoramas à couper le souffle.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Plateau de Bouliwel",
        "Points de vue panoramiques",
        "Randonnées en altitude",
        "Villages traditionnels",
        "Artisanat local",
      ],
      bestTimeToVisit: "Octobre à Mai",
      featured: false,
    },
    {
      id: 11,
      name: "Saramoussaya",
      description: "Réputée pour ses terres fertiles et ses traditions agricoles.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Marchés agricoles",
        "Plantations fruitières",
        "Techniques agricoles traditionnelles",
        "Festivals des récoltes",
        "Gastronomie locale",
      ],
      bestTimeToVisit: "Saison des récoltes (Septembre-Octobre)",
      featured: false,
    },
    {
      id: 12,
      name: "Soyah",
      description: "Un havre de paix avec ses collines douces et ses villages pittoresques.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Ateliers d'artisanat",
        "Tissage traditionnel",
        "Poterie locale",
        "Marchés artisanaux",
        "Architecture vernaculaire",
      ],
      bestTimeToVisit: "Toute l'année",
      featured: false,
    },
    {
      id: 13,
      name: "Ouré-Kaba",
      description: "Connue pour son patrimoine culturel et ses sites historiques.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      attractions: [
        "Sites historiques",
        "Cérémonies traditionnelles",
        "Danses folkloriques",
        "Contes et légendes",
        "Musique traditionnelle",
      ],
      bestTimeToVisit: "Pendant les festivals (variables)",
      featured: false,
    },
  ]

  // Sample data for featured attractions
  const featuredAttractions = [
    {
      id: 1,
      name: "Cascade de Tolo",
      description:
        "Une magnifique cascade entourée de végétation luxuriante, offrant un spectacle naturel impressionnant et une eau rafraîchissante pour la baignade.",
      image: "https://i0.wp.com/mosaiqueguinee.com/wp-content/uploads/2021/02/TIMBO-1.jpg?resize=700%2C375&ssl=1",
      location: "Tolo, à 15 km de Mamou",
      type: "nature",
      bestTimeToVisit: "Saison des pluies (Juin-Septembre)",
      difficulty: "Modérée",
      duration: "2-3 heures",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Mosquée historique de Timbo",
      description:
        "Un joyau architectural et historique datant du 18ème siècle, témoignage de l'importance religieuse et culturelle de la région du Fouta-Djalon.",
      image: "/placeholder.svg?height=400&width=600",
      location: "Timbo, à 25 km de Mamou",
      type: "historical",
      bestTimeToVisit: "Toute l'année (respecter les heures de prière)",
      difficulty: "Facile",
      duration: "1 heure",
      rating: 4.9,
      reviews: 210,
    },
    {
      id: 3,
      name: "Mont Tolo",
      description:
        "Un sommet offrant une vue panoramique exceptionnelle sur toute la région. La randonnée traverse des paysages variés et une flore unique.",
      image: "/placeholder.svg?height=400&width=600",
      location: "Tolo, à 18 km de Mamou",
      type: "nature",
      bestTimeToVisit: "Saison sèche (Novembre-Mai)",
      difficulty: "Difficile",
      duration: "Journée entière",
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 4,
      name: "Sources thermales de Téguéréyah",
      description:
        "Des sources d'eau chaude naturelles aux propriétés curatives, nichées dans un cadre naturel préservé. Un lieu de détente et de bien-être.",
      image: "/placeholder.svg?height=400&width=600",
      location: "Téguéréyah, à 30 km de Mamou",
      type: "nature",
      bestTimeToVisit: "Toute l'année",
      difficulty: "Facile",
      duration: "2-3 heures",
      rating: 4.6,
      reviews: 156,
    },
    {
      id: 5,
      name: "Forêt classée de Dounet",
      description:
        "Une forêt dense abritant une biodiversité exceptionnelle, avec des sentiers balisés permettant d'observer la faune et la flore locales.",
      image: "/placeholder.svg?height=400&width=600",
      location: "Dounet, à 40 km de Mamou",
      type: "nature",
      bestTimeToVisit: "Saison sèche (Novembre-Mai)",
      difficulty: "Modérée",
      duration: "3-4 heures",
      rating: 4.5,
      reviews: 87,
    },
  ]

  // Sample data for seasonal highlights
  const seasonalHighlights = [
    {
      season: "Printemps (Mars-Mai)",
      description:
        "La saison idéale pour observer la floraison et profiter de températures agréables. Les cascades commencent à se remplir.",
      activities: ["Randonnée", "Observation des oiseaux", "Photographie", "Visites culturelles"],
      recommendations: ["Cascade de Tolo", "Mont Tolo", "Jardins botaniques de Téguéréyah"],
    },
    {
      season: "Été (Juin-Août)",
      description:
        "Saison des pluies avec une végétation luxuriante. Les cascades sont à leur apogée mais certains chemins peuvent être difficiles.",
      activities: ["Observation des cascades", "Photographie", "Visites culturelles à l'intérieur"],
      recommendations: ["Cascade de Tolo", "Musée du Fouta-Djalon", "Marchés couverts"],
    },
    {
      season: "Automne (Septembre-Novembre)",
      description:
        "La fin de la saison des pluies offre des paysages verdoyants et des températures agréables. Idéal pour les activités de plein air.",
      activities: ["Randonnée", "Festivals des récoltes", "Excursions en nature", "Camping"],
      recommendations: ["Plateau de Bouliwel", "Festivals à Saramoussaya", "Randonnées à Koumi"],
    },
    {
      season: "Hiver (Décembre-Février)",
      description:
        "Saison sèche avec des températures fraîches le matin et le soir. Parfait pour les longues randonnées et l'observation de la faune.",
      activities: ["Trekking", "Safaris photo", "Visites historiques", "Camping"],
      recommendations: ["Forêt classée de Dounet", "Sites historiques de Timbo", "Randonnées à Poredaka"],
    },
  ]

  // Toggle favorite item
  const toggleFavorite = (itemId) => {
    if (favoriteItems.includes(itemId)) {
      setFavoriteItems(favoriteItems.filter((id) => id !== itemId))
    } else {
      setFavoriteItems([...favoriteItems, itemId])
    }
  }

  // Toggle prefecture expansion
  const togglePrefecture = (id) => {
    if (expandedPrefecture === id) {
      setExpandedPrefecture(null)
    } else {
      setExpandedPrefecture(id)
    }
  }

  // Filter attractions based on search and filters
  const filteredAttractions = featuredAttractions.filter((attraction) => {
    // Filter by search query
    const matchesSearch =
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by attraction type
    const matchesType = attractionType === "all" || attraction.type === attractionType

    return matchesSearch && matchesType
  })

  // Navigate through slides
  const navigateSlides = (direction) => {
    if (direction === "next") {
      setActiveSlideIndex((prev) => (prev === seasonalHighlights.length - 1 ? 0 : prev + 1))
    } else {
      setActiveSlideIndex((prev) => (prev === 0 ? seasonalHighlights.length - 1 : prev - 1))
    }
  }

  // Featured prefectures
  const featuredPrefectures = sousPrefectures.filter((prefecture) => prefecture.featured)

  // Auto-advance effect for slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev === seasonalHighlights.length - 1 ? 0 : prev + 1))
    }, 8000)

    return () => clearInterval(interval)
  }, [seasonalHighlights.length])

  // Filter prefectures based on search
  const filteredPrefectures = sousPrefectures.filter(
    (prefecture) =>
      prefecture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prefecture.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <FaHome className="mr-2" />
            <span>Accueil</span>
            <FaChevronRight className="mx-2 h-3 w-3" />
            <span>Lieux à visiter</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Découvrez Mamou</h1>
          <p className="text-xl text-blue-100 mb-6">Explorez les 13 sous-préfectures de Mamou</p>

          {/* Search Box */}
          <div className="bg-white rounded-lg p-2 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un lieu..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Les 13 Sous-préfectures de Mamou</h2>

        {filteredPrefectures.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrefectures.map((prefecture) => (
              <div
                key={prefecture.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={prefecture.image || "/placeholder.svg"}
                    alt={prefecture.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{prefecture.name}</h3>
                  <p className="text-gray-600">{prefecture.description}</p>
                  <button className="mt-4 text-blue-700 font-medium hover:text-blue-800 transition-colors flex items-center">
                    En savoir plus
                    <FaChevronRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg">Aucun résultat trouvé pour "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-700 hover:text-blue-800 transition-colors"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}

        Call to Action
        <div className="bg-blue-700 text-white rounded-lg p-6 mt-12 text-center">
          <h2 className="text-xl font-bold mb-2">Prêt à explorer Mamou?</h2>
          <p className="text-blue-100 mb-4">Découvrez les 13 sous-préfectures de Mamou.</p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-2 rounded-lg font-medium">
            Réserver un guide
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PlaceVisite
