"use client"

import { useEffect, useState } from "react"
import {
  FaBars,
  FaChevronDown,
  FaMapMarkedAlt,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaCompass,
  FaNewspaper,
  FaEnvelope,
  FaGraduationCap,
  FaSearch,
  FaBuilding,
  FaFileAlt,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
  FaFutbol,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
//let's import the logo image
import LogoImage from "../assets/images/logo.png"
import { LocateIcon } from "lucide-react"
import { FaLocationArrow, FaLocationCrosshairs, FaLocationPin } from "react-icons/fa6"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownToggle = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    setActiveDropdown(null)
  }

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <nav
      className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-blue-700 shadow-lg py-2"
          : "md:bg-gradient-to-b md:from-black/70 md:to-transparent bg-blue-700 py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" aria-label="Go to homepage">
          <div className="h-12 w-12 flex items-center justify-center">
            <img
              src={LogoImage}
              alt="Mamou Ville Logo"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
        </Link>

        {/* Desktop Menu - Centered */}
        <ul className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <li>
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
            >
              <FaHome className="mr-2" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
            >
              <FaInfoCircle className="mr-2" />
              <span>À propos</span>
            </Link>
          </li>
          <li className="relative group">
            <button
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white group-hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
              onMouseEnter={() => setActiveDropdown("explore")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <FaCompass className="mr-2" />
              <span>Explore</span>
              <FaChevronDown className="ml-1 text-xs transition-transform group-hover:rotate-180 duration-300" />
            </button>
            <AnimatePresence>
              {activeDropdown === "explore" && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 mt-1 min-w-[200px] z-50 border-t-2 border-yellow-400"
                  onMouseEnter={() => setActiveDropdown("explore")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <li>
                    <Link
                      to="/nourriture"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Nourriture
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hotel"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Hotels
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/place"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Places à visiter
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link
              to="/articles"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
            >
              <FaNewspaper className="mr-2" />
              <span>Articles</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
            >
              <FaEnvelope className="mr-2" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link
              to="/education"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
            >
              <FaGraduationCap className="mr-2" />
              <span>Education</span>
            </Link>
          </li>
          <li>
            <Link
              to="/sport"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
            >
              <FaFutbol className="mr-2" />
              <span>Sport</span>
            </Link>
          </li>
          <li>
            <Link
              to="/administration"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300 text-sm xl:text-base"
            >
              <FaFileAlt className="mr-2" />
              <span>Administration</span>
            </Link>
          </li>
        </ul>

        {/* Location (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 text-white">
          <FaLocationCrosshairs className="text-red-400" />
          <span className="text-sm xl:text-base">Mamou, Guinea</span>
        </div>

        {/* Social Media and Location (Mobile/Tablet) */}
        <div className="lg:hidden flex items-center space-x-4">
          <div className="flex space-x-3">
            <a
              href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-blue-600"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="https://wa.me/224620150481"
              aria-label="WhatsApp"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-green-600"
            >
              <FaWhatsapp className="text-sm" />
            </a>
          </div>
          <div className="text-white text-xs">
            <span>Mamou, Guinea</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl text-white focus:outline-none ml-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="lg:hidden bg-blue-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              {/* Search on Mobile */}
              <div className="relative mb-4 mt-2">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-blue-700 text-white rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-blue-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
              </div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <Link
                  to="/"
                  className="flex items-center py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  <FaHome className="mr-3" />
                  <span>Home</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <Link
                  to="/about"
                  className="flex items-center py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  <FaInfoCircle className="mr-3" />
                  <span>À propos</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <button
                  className="flex items-center justify-between w-full py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={() => handleDropdownToggle("explore")}
                >
                  <div className="flex items-center">
                    <FaCompass className="mr-3" />
                    <span>Explore</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${activeDropdown === "explore" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "explore" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="pl-10 mt-2 space-y-2"
                    >
                      <div>
                        <Link
                          to="/nourriture"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Nourriture
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/hotel"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Hotels
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/place"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Places à visiter
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <Link
                  to="/articles"
                  className="flex items-center py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  <FaNewspaper className="mr-3" />
                  <span>Articles</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <Link
                  to="/contact"
                  className="flex items-center py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  <FaEnvelope className="mr-3" />
                  <span>Contact</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <Link
                  to="/education"
                  className="flex items-center py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  <FaGraduationCap className="mr-3" />
                  <span>Education</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <Link
                  to="/sport"
                  className="flex items-center py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  <FaFutbol className="mr-3" />
                  <span>Sport</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="py-2 border-b border-blue-700">
                <Link
                  to="/administration"
                  className="flex items-center py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  <FaFileAlt className="mr-3" />
                  <span>Administration</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="py-4 flex items-center text-blue-200">
                <FaMapMarkedAlt className="mr-3 text-yellow-400" />
                <span>Mamou, République de Guinée</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default NavBar