"use client"
import { FaAward, FaCheckSquare, FaGlobe, FaInfoCircle, FaLeaf, FaStar, FaUsers } from "react-icons/fa"
import { FaStarHalfStroke } from "react-icons/fa6"
import About1 from "../assets/images/About1.png"
import About2 from "../assets/images/About2.png"
import About3 from "../assets/images/About3.png"
import { Highlight, Logos } from "../assets/mockData"

function AboutSection() {
  return (
    <div className="relative">
      <div
        id="about-content"
        className="bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-black relative z-10 rounded-t-[40px] -mt-10"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                À PROPOS DE MAMOU
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-900">
                Une Ville <span className="text-yellow-500">paradisiaque</span>
              </h2>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <FaUsers className="text-blue-700 mr-2 text-xl" />
                    <h3 className="text-2xl font-bold text-blue-700">10,000+</h3>
                  </div>
                  <p className="text-gray-700">Personnes qui ont visité Mamou</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <FaGlobe className="text-blue-700 mr-2 text-xl" />
                    <h3 className="text-2xl font-bold text-blue-700">90%</h3>
                  </div>
                  <p className="text-gray-700">Personnes apprecient Mamou</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <FaAward className="text-blue-700 mr-2 text-xl" />
                    <h3 className="text-2xl font-bold text-blue-700">Top 50</h3>
                  </div>
                  <p className="text-gray-700">Tourism destination Mamou</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl flex mb-2 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfStroke />
                  </h3>
                  <p className="text-gray-700">Rating</p>
                </div>
              </div>

              <button className="bg-blue-700 flex text-white px-6 py-3 rounded-full items-center hover:bg-blue-800 transition duration-300 shadow-lg">
                <FaInfoCircle className="mr-2" />
                En savoir plus
              </button>
            </div>

            <div className="relative h-[500px]">
              {/* Static image layout instead of animated positioning */}
              <div className="relative h-full">
                <img
                  src={About1 || "/placeholder.svg"}
                  alt="Vue de Mamou - Paysage naturel"
                  className="absolute top-0 left-0 w-3/4 rounded-2xl shadow-2xl border-4 border-white z-10"
                />

                <img
                  src={About3 || "/placeholder.svg"}
                  alt="Culture locale de Mamou"
                  className="absolute top-1/4 right-0 w-2/3 rounded-2xl shadow-2xl border-4 border-white z-20"
                />

                <div className="absolute top-1/2 left-1/4 bg-green-600 p-6 text-white rounded-2xl shadow-xl z-30">
                  <FaLeaf className="mb-3 text-2xl" />
                  <p className="font-semibold">Notre Culture, notre Identité</p>
                </div>

                <img
                  src={About2 || "/placeholder.svg"}
                  alt="Traditions de Mamou"
                  className="absolute bottom-0 left-1/4 w-3/4 rounded-2xl shadow-2xl border-4 border-white z-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-blue-900 leading-tight">
                Une culture authentique où la beauté ne connaît pas de
                <span className="text-yellow-500"> limite</span>
              </h2>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
                pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit.
              </p>
            </div>

            <div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Highlight.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start p-4 bg-blue-50 rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <FaCheckSquare className="mr-3 text-blue-700 w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-base md:text-lg text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Logos Section - Static instead of animated */}
      <div className="relative bg-blue-700 py-8 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-8 container mx-auto px-4">
          {Logos.map((logo, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={logo.logo || "/placeholder.svg"}
                alt={`Logo ${logo.name}`}
                className="w-12 h-12 object-contain"
              />
              <p className="text-xl font-bold text-white whitespace-nowrap">{logo.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutSection
