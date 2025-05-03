import { Calendar, Calendar1, ChevronRight, Clock, MapPin, Share, Trophy } from 'lucide-react'
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaFutbol, FaHome, FaNewspaper, FaRunning } from 'react-icons/fa'
import { FaBasketball, FaVolleyball } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'


const Sport = ({ matchs = [], news = [] }) => {
  const [activeTabe, setActiveTabe] = useState('football')
  const [activeNewsIndex, setActiveNewsIndex] = useState(0)

  const navigateNews = (direction) => {
    if (direction === "next") {
      setActiveNewsIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1))
    } else {
      setActiveNewsIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1))
    }
  }

  const activeNews = news[activeNewsIndex] || {}

  return (
    <div className='min-h-screen bg-gray-50 ' style={{ fontFamily: 'var(--font)'}}>
      <div className='text-center'>
          <NavBar />
      </div>

      {/* Hero Section */}
      <div className='relative bg-blue-900 text-white'>
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          }}
        ></div>
        <div className='relative container mx-auto px-4 py-16 md:py-24'>
          <div className='max-w-3xl'>
            <div className='flex items-center text-sm mb-4'>
              <FaHome className='mr-2' />
              <span>Home</span>
              <FaChevronRight className='mx-2 h-4 w-4' />
              <span>Sport</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>Sports à Mamou</h1>
            <p className='text-xl text-blue-100 mb-8'>Suivez les résultats, les actualités et les événements sportifs de la ville de Mamou</p>
            <div className='flex space-x-4'>
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 rounded-full px-4 py-2 font-medium flex items-center transition-colors">
                <Calendar className="mr-2" />
                Calendrier des matchs
              </button>
              <button className='bg-white/10 hover:bg-white/20 flex items-center rounded-full font-medium transition-colors backdrop-blur-sm px-4 py-2'>
                <Share className="mr-2" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className='bg-white shadow-md'>
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {[
              { key: 'football', label: 'Football', icon: FaFutbol },
              { key: 'basketball', label: 'Basketball', icon: FaBasketball },
              { key: 'volleyball', label: 'Volleyball', icon: FaVolleyball },
              { key: 'athletism', label: 'Athlétisme', icon: FaRunning }
            ].map(tab => (
              <button
                key={tab.key}
                className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap mr-3 transition-colors
                  ${activeTabe === tab.key ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                onClick={() => setActiveTabe(tab.key)}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match Cards */}
      <div className='container mx-auto px-4 py-12'>
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
            <Trophy className="mr-2" />
            Derniers Résultats
          </h2>
          <div className='grid gap-4 md:grid-cols-3'>
            {matchs.map((match, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-700 text-white px-4 py-2 flex justify-between items-center">
                  <span>{match.date}</span>
                  <span className={`rounded-lg px-2 py-1 text-sm ${match.matchStatus === 'Terminé' ? 'bg-gray-300 text-black' :
                    match.matchStatus === 'Joue' ? 'bg-green-500' :
                      match.matchStatus === 'Programmé' ? 'bg-yellow-300' : 'bg-white'
                    }`}>
                    {match.matchStatus}
                  </span>
                  <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">{match.time}</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center flex-1">
                      <div className="font-bold text-lg">{match.homeTeam}</div>
                      <div className="text-3xl font-bold text-blue-700">{match.homeScore}</div>
                    </div>
                    <div className="text-gray-400 text-lg font-bold mx-4">VS</div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-lg">{match.awayTeam}</div>
                      <div className="text-3xl font-bold text-blue-700">{match.awayScore}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-yellow-500" />
                    {match.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Calendar1 className="mr-2 text-blue-700" />
            Prochains Matchs
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {matchs.map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-50 text-blue-700 px-4 py-2 flex justify-between items-center">
                  <span>?</span>
                  <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded-full">vide</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center flex-1">
                      <div className="font-bold text-lg">?</div>
                    </div>
                    <div className="text-gray-400 text-lg font-bold mx-4">VS</div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-lg">?</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> ?
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> ?
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                    Acheter des billets
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Section */}
        <div>
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
            <FaNewspaper className="mr-2 text-blue-700" />
            Actualités Sportives
          </h2>
          <div className='relative'>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="md:flex">
                
                    <div className="md:w-1/2">
                      <img
                        src={
                          activeNews?.imageSport?.[0]?.url
                            ? `http://localhost:1337${activeNews.imageSport[0].url}`
                            : `/placeholder.svg?height=500&width=1200`
                        }
                        alt={activeNews.sportTitle || 'Sport'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-1/2">
                      <div className="flex items-center mb-3">
                        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">sport</span>
                        <span className="text-gray-500 text-sm ml-3">{activeNews.dateSport}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-4">{activeNews.titleSport}</h3>
                      {activeNews?.contentSport?.length > 0
                        ? activeNews.contentSport.map((item1, index) => (
                            <div key={index}>
                                {item1.children?.map((child, indexChild) => (
                                <div key={indexChild}>{child.text}</div>
                                )) || <p>No content</p>}
                            </div>
                            ))
                        : <p>No data</p>}
                        <Link to={`/blog/sport/${activeNews.id}`}>
                      <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors flex items-center">
                        Lire plus
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                      </Link>
                    </div>
               
              </div>
            </div>

            <button
              onClick={() => navigateNews("prev")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md text-blue-700 hover:bg-blue-50"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigateNews("next")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md text-blue-700 hover:bg-blue-50"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>

            <div className="flex justify-center mt-4">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveNewsIndex(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${activeNewsIndex === index ? "bg-blue-700" : "bg-gray-300"}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sport
