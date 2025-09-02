"use client"

import { motion } from "framer-motion"
import { FaPhone, FaEnvelope } from "react-icons/fa"
import TouristImage from "../assets/images/Tourist.png"

// Sample data for guides
const guides = [
  {
    id: 1,
    name: "Oumar Diallo",
    role: "Tour Guide",
    image: TouristImage,
    experience: "5 ans",
    contact: {
      phone: "+224 12 345 6789",
      email: "oumar.diallo@example.com",
    },
  },
  {
    id: 2,
    name: "Aissatou Bah",
    role: "Guide Touristique",
    image: TouristImage,
    experience: "7 ans",
    contact: {
      phone: "+224 98 765 4321",
      email: "aissatou.bah@example.com",
    },
  },
  {
    id: 3,
    name: "Mamadou Sow",
    role: "Guide Culturel",
    image: TouristImage,
    experience: "4 ans",
    contact: {
      phone: "+224 55 667 7889",
      email: "mamadou.sow@example.com",
    },
  },
]

function Guide() {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Nos <span className="text-blue-700">Guides Touristiques</span>
          </h1>
          <div className="flex items-center justify-center space-x-4 w-full max-w-sm mx-auto mt-2">
            <hr className="flex-1 border-t-2 border-blue-200" />
            <div className="w-3 h-3 rounded-full bg-blue-700"></div>
            <hr className="flex-1 border-t-2 border-blue-200" />
          </div>
          <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
            Nos guides expérimentés vous feront découvrir les merveilles de Mamou.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64">
                <img
                  src={guide.image || "/placeholder.svg"}
                  alt={`${guide.name} - Guide touristique`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold text-white">{guide.name}</h3>
                  <p className="text-yellow-400 font-medium">{guide.role}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Expérience</p>
                  <p className="text-lg font-semibold text-blue-900">{guide.experience}</p>
                </div>

                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center">
                    <FaPhone className="text-blue-700 mr-2 text-sm" />
                    <span className="text-sm">{guide.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-700 mr-2 text-sm" />
                    <span className="text-sm">{guide.contact.email}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
                  Contacter
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 transition-colors">
            Réserver un guide
          </button>
          <p className="text-gray-600 mt-4">Réservez dès maintenant pour une expérience inoubliable à Mamou</p>
        </div>
      </div>
    </div>
  )
}

export default Guide
