"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Hotels() {
  // Simplified hotel data with just essential information
  const hotels = [
    {
      id: 1,
      name: "Hôtel Mamou Palace",
      description: "Un hôtel de luxe au cœur de Mamou offrant une expérience inoubliable avec des chambres élégantes.",
      price: "450,000 GNF",
      image: "https://i.pinimg.com/736x/78/64/1a/78641ae99a7f9828e46f92e3df9d325b.jpg",
      location: "Centre-ville, Mamou",
      phone: "+224 12 345 6789",
      email: "contact@mamoupalace.com",
    },
    {
      id: 2,
      name: "Résidence Dalaba",
      description: "Un établissement confortable et abordable, idéal pour les voyageurs d'affaires et les touristes.",
      price: "250,000 GNF",
      image: "/placeholder.svg?height=300&width=500",
      location: "Quartier Dalaba, Mamou",
      phone: "+224 98 765 4321",
      email: "info@residencedalaba.com",
    },
    {
      id: 3,
      name: "Grand Hôtel de Mamou",
      description: "Le plus ancien hôtel de Mamou, alliant charme historique et confort moderne.",
      price: "350,000 GNF",
      image: "/placeholder.svg?height=300&width=500",
      location: "Avenue de la République, Mamou",
      phone: "+224 55 667 7889",
      email: "reservation@grandhotelmamou.com",
    },
    {
      id: 4,
      name: "Auberge du Voyageur",
      description: "Une auberge chaleureuse et économique, parfaite pour les voyageurs à petit budget.",
      price: "150,000 GNF",
      image: "/placeholder.svg?height=300&width=500",
      location: "Quartier Petel, Mamou",
      phone: "+224 77 888 9999",
      email: "contact@aubergevoyageur.com",
    },
    {
      id: 5,
      name: "Résidence Les Palmiers",
      description: "Un complexe hôtelier moderne avec des villas privées et des appartements spacieux.",
      price: "550,000 GNF",
      image: "/placeholder.svg?height=300&width=500",
      location: "Route de Conakry, Mamou",
      phone: "+224 66 555 4444",
      email: "info@lespalmiers.com",
    },
    {
      id: 6,
      name: "Hôtel du Centre",
      description: "Un hôtel simple et pratique situé en plein centre-ville, à proximité des commerces.",
      price: "200,000 GNF",
      image: "/placeholder.svg?height=300&width=500",
      location: "Centre-ville, Mamou",
      phone: "+224 33 222 1111",
      email: "contact@hotelcentre.com",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Simple Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hôtels à Mamou</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Découvrez les meilleurs hébergements pour votre séjour à Mamou
          </p>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                  {hotel.location}
                </div>
                <p className="text-gray-600 mb-4">{hotel.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2 text-blue-700" />
                    <span className="text-sm">{hotel.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-blue-700" />
                    <span className="text-sm">{hotel.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-2xl font-bold text-blue-700">{hotel.price}</span>
                    <span className="text-gray-500 text-sm"> / nuit</span>
                  </div>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors">
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Besoin d'aide pour votre réservation ?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour vous aider à trouver l'hébergement idéal pour votre séjour à
              Mamou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                <span>+224 12 345 6789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                <span>reservations@mamou-hotels.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Hotels
