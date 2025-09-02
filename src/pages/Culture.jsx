"use client"

import { Calendar, Share2 } from "lucide-react"
import { useState } from "react"
import { FaCalendarAlt, FaClock, FaHome, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa"
import EventImage from "../assets/images/Event1.png"
import NavBar from "../components/NavBar"

const Culture = ({ events = [] }) => {
  const [activeFilter, setActiveFilter] = useState("all")


  // Filter categories
  const categories = [
    { id: "all", name: "Tous" },
    { id: "music", name: "Musique" },
    { id: "art", name: "Art & Culture" },
    { id: "festival", name: "Festivals" },
    { id: "sport", name: "Sport" },
  ]

  // Filter events based on selected category
  const filteredEvents = activeFilter === "all" ? events : events.filter((event) => event.category === activeFilter)

  // Sample events for preview if no events are provided
  const sampleEvents = [
    {
      eventMonth: "JAN",
      eventDay: "15",
      eventDate: "2025",
      eventTitle: "FESTIVAL",
      eventContent: [{ children: [{ text: "Festival de Musique Traditionnelle de Mamou" }] }],
      Location: "Centre Culturel de Mamou",
      eventPrice: "25,000",
      category: "music",
    },
    {
      eventMonth: "FÉV",
      eventDay: "28",
      eventDate: "2025",
      eventTitle: "EXPOSITION",
      eventContent: [{ children: [{ text: "Exposition d'Art Contemporain Guinéen" }] }],
      Location: "Galerie Nationale de Mamou",
      eventPrice: "10,000",
      category: "art",
    },
    {
      eventMonth: "MAR",
      eventDay: "10",
      eventDate: "2025",
      eventTitle: "CONCERT",
      eventContent: [{ children: [{ text: "Concert de Bienfaisance pour les Écoles" }] }],
      Location: "Stade Municipal",
      eventPrice: "15,000",
      category: "music",
    },
  ]

  // Use provided events or sample events if none provided
  const displayEvents = events.length > 0 ? filteredEvents : sampleEvents

  return (
    <div style={{ fontFamily: "Poppins" }} className="min-h-screen bg-gray-50 ">
      {/* Hero section */}
      <div
  className="relative h-72 md:h-[500px] bg-center bg-cover bg-fixed"
  style={{ backgroundImage: `url(${EventImage})` }}
>
  <NavBar />
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent">
    <div className="container mx-auto h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 pt-16">
      
      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-3xl font-bold">
        <div className="bg-amber-400 p-1.5 sm:p-2 rounded-full">
          <Calendar className="text-slate-900 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
        </div>
        <h1 className="text-white text-sm sm:text-lg md:text-4xl font-bold tracking-tight leading-tight">
          Événements de la ville de Mamou
        </h1>
      </div>

      <p className="text-gray-300 text-xs sm:text-base md:text-2xl mt-2 leading-snug sm:leading-normal">
        Découvrez les prochains événements de Mamou et soyez informés en temps réel
      </p>

      <div className="flex items-center text-xs sm:text-sm md:text-lg text-gray-300 gap-2 sm:gap-4 pt-4">
        <FaHome className="text-white" />
        <span className="text-white">Home / Events</span>
      </div>

      <div className="mt-2 flex flex-col md:flex-wrap md:flex-row gap-2">
        <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/20">
          <Share2 className="w-4 h-4" />
          Partager
        </button>
        <a
          href="#events-section"
          className="flex items-center rounded-full bg-yellow-400 px-4 py-2 text-black gap-2 transition-all hover:bg-yellow-300"
        >
          <Calendar className="w-4 h-4" />
          Consulter le programme
        </a>
      </div>

    </div>
  </div>
</div>


      <div className="container mx-auto px-4 py-12">
        {/* Heading */}
        <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
          <span className="relative inline-block">
            Découvrez les programmes
            <span className="absolute -bottom-2 left-1/4 h-1 w-1/2 bg-yellow-400"></span>
          </span>
        </h2>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category.id ? "bg-blue-700 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div id="events-section" className="space-y-8">
          {displayEvents.length > 0 ? (
            displayEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6">
                  {/* Date Block */}
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="text-center border border-gray-300 rounded-lg w-16 flex flex-col overflow-hidden shadow-lg">
                      <div className="text-xs text-gray-700 font-semibold pt-1 bg-gray-100 uppercase">{event.Mois}</div>
                      <div className="text-2xl font-bold text-black leading-none py-1">{event.Jour}</div>
                      <div className="text-xs text-white bg-blue-700 font-semibold py-1">{event.Annee}</div>
                    </div>

                    {/* Content Block */}
                    <div>
                      <div className="text-xs uppercase text-blue-700 font-semibold tracking-wider">
                        {event.typeEvenement}
                      </div>
                      <h3 className="font-bold text-xl md:text-2xl text-gray-800 leading-tight mt-1">
                        {event.Titre &&
                          event.Titre.map((contentItem, contentIndex) => (
                            <div key={contentIndex}>
                              {contentItem.children.map((child, childIndex) => (
                                <span key={childIndex}>{child.text}</span>
                              ))}
                            </div>
                          ))}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-2">
                        <FaMapMarkerAlt className="text-blue-700 mr-2" />
                        <span>{event.localisation}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mt-1">
                        <FaClock className="text-blue-700 mr-2" />
                        <span>{event.dateEvenement}</span>
                      </div>
                      <div className="mt-3 flex space-x-3">
                        <button className="bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center">
                          <FaTicketAlt className="mr-1" />
                          Réserver
                        </button>
                        <div className="flex items-center text-sm text-gray-700">
                          <span className="font-semibold">{event.prix} <span className="line-through text-gray-400"> GNF</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Image */}
                  <div className="md:w-40 h-52 md:h-44 rounded-lg overflow-hidden">
                    {event.Image ? (
                      <img
                        src={`https://cozy-sparkle-24ced58ec1.strapiapp.com${event.Image.url}`}
                        alt={event.eventTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FaCalendarAlt className="text-gray-400 text-2xl" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <FaCalendarAlt className="text-gray-300 text-5xl mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Aucun événement pour le moment.</p>
              <p className="text-gray-500 mt-2">Revenez bientôt pour découvrir nos prochains événements.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Vous organisez un événement à Mamou?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Faites connaître votre événement à toute la communauté de Mamou en le publiant sur notre plateforme.
          </p>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-medium transition-colors">
            Soumettre un événement
          </button>
        </div>
      </div>
    </div>
  )
}

export default Culture
