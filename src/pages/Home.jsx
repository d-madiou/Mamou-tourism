"use client"

import { useEffect, useRef, useState } from "react"

import { FaChevronDown, FaFacebookF, FaInfoCircle, FaLinkedinIn, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa"
import ImageMamou from "../assets/images/Mamou1.png"
import ImageMamou3 from "../assets/images/Mamou3.png"
import AboutSection from "../components/AboutSection"
import Banner from "../components/Banner"
import Gallery from "../components/Galley"
import Guide from "../components/Guide"
import NavBar from "../components/NavBar"
import PopularActivity from "../components/PopularActivity"

function Home() {
  const [currentImage, setCurrentImage] = useState(ImageMamou)
  const heroRef = useRef(null)

  useEffect(() => {
    // Simple image transition without complex animations
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === ImageMamou ? ImageMamou3 : ImageMamou))
    }, 5000) // Change image every 5 seconds

    return () => {
      clearInterval(interval)
    }
  }, [])

  const scrollToContent = () => {
    const contentElement = document.getElementById("about-section")
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* SEO Head Tags */}
      
        <title>Mamou - Découvrez la beauté et la nature de notre ville</title>
        <meta
          name="description"
          content="Explorez Mamou, une ville paradisiaque en République de Guinée. Découvrez sa culture, ses attractions touristiques et sa beauté naturelle."
        />
        <meta name="keywords" content="Mamou, Guinée, tourisme, culture, attractions, ville" />
        <meta property="og:title" content="Mamou - Découvrez la beauté et la nature de notre ville" />
        <meta
          property="og:description"
          content="Explorez Mamou, une ville paradisiaque en République de Guinée. Découvrez sa culture, ses attractions touristiques et sa beauté naturelle."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.mamou-ville.com" />
   

      <div className="w-full overflow-hidden">
        <div style={{ fontFamily: "var(--font)" }} className="relative">
          {/* Hero Section - Simplified */}
          <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
            {/* Simple fade transition instead of complex motion animations */}
            <img
              src={currentImage || "/placeholder.svg"}
              alt="Vue panoramique de la ville de Mamou"
              className="absolute w-full h-full object-cover transition-opacity duration-1000"
              style={{
                opacity: 1,
                transform: "scale(1.05)",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
              <NavBar />

              <div className="mt-8 px-4 max-w-5xl animate-fade-in">
                <div className="flex space-x-6 justify-center mb-6">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-blue-600"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-green-600"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-blue-700"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Découvrez la beauté et la nature de la ville de
                  <span className="text-yellow-400"> Mamou</span>
                </h1>

                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="bg-yellow-500 text-black py-3 px-8 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:bg-yellow-400 transition duration-300">
                    <FaInfoCircle />
                    <span>En savoir plus</span>
                  </button>

                  <div className="flex items-center space-x-2 bg-transparent border border-white/50 backdrop-blur-sm py-3 px-8 rounded-full hover:bg-white/10 transition duration-300">
                    <FaMapMarkerAlt className="text-yellow-400" />
                    <span>Visiter Mamou</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
                onClick={scrollToContent}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm mb-2">Découvrir</span>
                  <FaChevronDown className="text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the components */}
          <div id="about-section">
            <AboutSection />
          </div>
          <PopularActivity />
          <Banner />
          <Guide />
          <Gallery />
        </div>
      </div>
    </>
  )
}

// Add custom CSS for simple animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0) translateX(-50%); }
    50% { transform: translateY(-10px) translateX(-50%); }
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
`

// Inject the styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style")
  styleElement.innerHTML = styles
  document.head.appendChild(styleElement)
}

export default Home
