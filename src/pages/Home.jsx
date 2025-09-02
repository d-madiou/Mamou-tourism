"use client"

import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaFacebookF, FaInfoCircle, FaLinkedinIn, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa"
import ImageMamou from "../assets/images/Mamou1.png"
import ImageMamou3 from "../assets/images/Mamou3.png"
import MamouHero from "../assets/images/MamouHero.jpg"
import MamouHero2 from "../assets/images/MamouHero2.jpg"
import AboutSection from "../components/AboutSection"
import Banner from "../components/Banner"
import Gallery from "../components/Galley"
import Guide from "../components/Guide"
import NavBar from "../components/NavBar"
import PopularActivity from "../components/PopularActivity"
import Police from "../components/Guide"

function Home({ activities = [], galleryData = [], policeData = [] }) {
  // Define an array of all images
  const images = [MamouHero, MamouHero2, ImageMamou, ImageMamou3];
  // Use a state to track the index of the current image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    // Simple image transition
    const interval = setInterval(() => {
      // Increment the index, and loop back to 0 if it goes past the last image
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => {
      clearInterval(interval);
    };
  }, [images.length]); // The dependency array should be images.length to re-run if the array size changes

    const scrollToContent = () => {
      const contentElement = document.getElementById("about-section");
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: "smooth" });
      }
    };

  return (
    <>
      {/* SEO Head Tags */}
      
        <title>Mamou - Découvrez la beauté et la nature de notre ville</title>
        <meta
          name="description"
          content="Explorez Mamou, une ville carrefour en République de Guinée. Découvrez sa culture, ses attractions touristiques et sa beauté naturelle."
        />
        <meta name="keywords" content="Mamou, Guinée, tourisme, culture, attractions, ville, Timbo, Tolo, Institute superieur de la technologie de Mamou" />
        <meta property="og:title" content="Mamou - Découvrez la region de Mamou" />
        <meta name="author" content="Ville de Mamou"/>

        <meta
          property="og:description"
          content="Explorez Mamou, une ville paradisiaque en République de Guinée. Découvrez sa culture, ses attractions touristiques et sa beauté naturelle."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.mamou-ville.com" />
   

      <div className="w-full overflow-hidden">
        <div style={{ fontFamily: "var(--font)" }} className="relative">
          {/* Hero Section - With Zoom Effect */}
           <div
            ref={heroRef}
            className="relative h-screen w-full bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          >

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
              <NavBar />

              <div className="mt-8 px-4 max-w-5xl animate-fade-in">
                <div className="flex space-x-6 justify-center mb-6">
                  <a
                    href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                    aria-label="Facebook"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-blue-600"
                  >
                    <FaFacebookF />
                  </a>
                 <a
                    href="https://wa.me/224620150481"
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

                <h1 className="text-3xl md:text-6xl lg:text-5xl font-bold mb-6 leading-tight">
                  Découvrez la beauté et la nature de la ville de
                  <span className="text-yellow-400"> Mamou</span>
                </h1>

                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                  Porte d'entrée du Fouta-Djalon, Mamou vous invite à explorer ses paysages pittoresques, ses cascades majestueuses et sa richesse culturelle
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
            </div>
          </div>

          {/* Rest of the components */}
          <div id="about-section">
            <AboutSection />
          </div>
          <PopularActivity activities={activities} />
          <Banner />
          <Police policeData={policeData} />
          <Gallery galleryData={galleryData} />
        </div>
      </div>
    </>
  )
}

export default Home