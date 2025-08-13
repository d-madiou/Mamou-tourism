"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Nouriture() {
  // Simplified restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Restaurant Le Mamou",
      description:
        "Un restaurant élégant proposant une cuisine traditionnelle guinéenne revisitée avec des techniques modernes.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Centre-ville, Mamou",
      openingHours: "12:00 - 22:00",
      phone: "+224 12 345 6789",
      email: "contact@lemamou.com",
    },
    {
      id: 2,
      name: "Chez Fatou",
      description:
        "Un restaurant familial où vous pourrez déguster d'authentiques plats guinéens dans une ambiance chaleureuse.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Quartier Dalaba, Mamou",
      openingHours: "11:00 - 21:00",
      phone: "+224 98 765 4321",
      email: "info@chezfatou.com",
    },
    {
      id: 3,
      name: "Le Petit Café",
      description: "Un café-restaurant proposant des petits déjeuners, des pâtisseries et des plats légers.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Avenue de la République, Mamou",
      openingHours: "07:00 - 19:00",
      phone: "+224 77 888 9999",
      email: "contact@petitcafe.com",
    },
    {
      id: 4,
      name: "La Terrasse",
      description: "Un restaurant avec une belle terrasse offrant une vue sur la ville et servant une cuisine fusion.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Quartier Petel, Mamou",
      openingHours: "18:00 - 23:00",
      phone: "+224 55 667 7889",
      email: "reservation@laterrasse.com",
    },
    {
      id: 5,
      name: "Maquis du Foutah",
      description: "Un maquis traditionnel où vous pourrez déguster des grillades et des plats typiques.",
      image: "https://i.pinimg.com/736x/c8/76/42/c87642aa477b87afce7f920c9eb1a733.jpg",
      location: "Route de Conakry, Mamou",
      openingHours: "16:00 - 02:00",
      phone: "+224 66 555 4444",
      email: "contact@maquisfouta.com",
    },
    {
      id: 6,
      name: "Le Gourmet",
      description:
        "Un restaurant haut de gamme proposant une cuisine raffinée mêlant saveurs locales et influences internationales.",
      image: "/placeholder.svg?height=300&width=500",
      location: "Centre-ville, Mamou",
      openingHours: "19:00 - 23:00",
      phone: "+224 33 222 1111",
      email: "info@legourmet.com",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Simple Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Restaurants à Mamou</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Découvrez les saveurs authentiques et les délices culinaires de la région de Mamou
          </p>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{restaurant.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                  {restaurant.location}
                </div>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-blue-700" />
                    <span className="text-sm">{restaurant.openingHours}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2 text-blue-700" />
                    <span className="text-sm">{restaurant.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-blue-700" />
                    <span className="text-sm">{restaurant.email}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                  Contacter le restaurant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Découvrez la cuisine de Mamou</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Savourez les délices culinaires de notre région dans nos restaurants partenaires qui vous offrent une
              expérience gastronomique authentique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                <span>+224 12 345 6789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                <span>restaurants@mamou.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Nouriture
