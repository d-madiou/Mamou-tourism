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
} from "react-icons/fa"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
//let's import the logo image
import LogoImage from "../assets/images/logo.png"

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
          ? "bg-blue-700 shadow-lg py-3"
          : "md:bg-gradient-to-b md:from-black/70 md:to-transparent bg-blue-700 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" aria-label="Go to homepage">
          <div className="h-10 w-10 flex items-center justify-center"> {/* Removed rounded-full, text-blue-900, font-bold, text-xl as image handles styling */}
            <img
              src={LogoImage}
              alt="Mamou Ville Logo" // More descriptive alt text for better SEO and accessibility
              className="h-full w-full object-contain rounded-full" // Use h-full w-full for image to fill parent, object-contain to prevent stretching
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <li>
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300"
            >
              <FaHome className="mr-1" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300"
            >
              <FaInfoCircle className="mr-1" />
              <span>About Us</span>
            </Link>
          </li>
          <li className="relative group">
            <button
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white group-hover:text-yellow-400 transition-all duration-300"
              onMouseEnter={() => setActiveDropdown("explore")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <FaCompass className="mr-1" />
              <span>Explore</span>
              <FaChevronDown className="ml-1 text-xs transition-transform group-hover:rotate-180 duration-300" />
            </button>
            <AnimatePresence>
              {(activeDropdown === "explore" ||
                (typeof window !== "undefined" &&
                  window.innerWidth >= 768 &&
                  document.querySelector("li.group:nth-child(3):hover"))) && (
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
          <li className="relative group">
            <button
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white group-hover:text-yellow-400 transition-all duration-300"
              onMouseEnter={() => setActiveDropdown("articles")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <FaNewspaper className="mr-1" />
              <span>Articles</span>
              <FaChevronDown className="ml-1 text-xs transition-transform group-hover:rotate-180 duration-300" />
            </button>
            <AnimatePresence>
              {(activeDropdown === "articles" ||
                (typeof window !== "undefined" &&
                  window.innerWidth >= 768 &&
                  document.querySelector("li.group:nth-child(4):hover"))) && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 mt-1 min-w-[200px] z-50 border-t-2 border-yellow-400"
                  onMouseEnter={() => setActiveDropdown("articles")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <li>
                    <Link
                      to="/sport"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Sport
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cultures"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Cultures
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Politiques
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Citoyens
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300"
            >
              <FaEnvelope className="mr-1" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link
              to="/education"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300"
            >
              <FaGraduationCap className="mr-1" />
              <span>Education</span>
            </Link>
          </li>
          <li className="relative group">
            <button
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white group-hover:text-yellow-400 transition-all duration-300"
              onMouseEnter={() => setActiveDropdown("mairie")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <FaBuilding className="mr-1" />
              <span>Mairie</span>
              <FaChevronDown className="ml-1 text-xs transition-transform group-hover:rotate-180 duration-300" />
            </button>
            <AnimatePresence>
              {(activeDropdown === "mairie" ||
                (typeof window !== "undefined" &&
                  window.innerWidth >= 768 &&
                  document.querySelector("li.group:nth-child(7):hover"))) && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 mt-1 min-w-[200px] z-50 border-t-2 border-yellow-400"
                  onMouseEnter={() => setActiveDropdown("mairie")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <li>
                    <Link
                      to="/mairie"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Les élus
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mairie"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Les projets de la mairie
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link
              to="/administration"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 text-white hover:text-yellow-400 transition-all duration-300"
            >
              <FaFileAlt className="mr-1" />
              <span>Administration</span>
            </Link>
          </li>
        </ul>

        {/* Location and Search (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
         

          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-blue-800 text-white rounded-full py-1 px-4 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-36 lg:w-40 transition-all duration-300 focus:w-48"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white focus:outline-none"
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
            className="md:hidden bg-blue-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              {/* Search on Mobile */}
              <div className="relative mb-4 mt-2">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-blue-700 text-white rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                  <span>About Us</span>
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
                          to="#"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Nourriture
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="#"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Hotels
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="#"
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
                <button
                  className="flex items-center justify-between w-full py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={() => handleDropdownToggle("articles")}
                >
                  <div className="flex items-center">
                    <FaNewspaper className="mr-3" />
                    <span>Articles</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${activeDropdown === "articles" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "articles" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="pl-10 mt-2 space-y-2"
                    >
                      <div>
                        <Link
                          to="#"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Sport
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="#"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Cultures
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="#"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Politiques
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="#"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Citoyens
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                <button
                  className="flex items-center justify-between w-full py-2 px-3 text-white hover:text-yellow-400 transition-colors"
                  onClick={() => handleDropdownToggle("mairie")}
                >
                  <div className="flex items-center">
                    <FaBuilding className="mr-3" />
                    <span>Mairie</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${activeDropdown === "mairie" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mairie" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="pl-10 mt-2 space-y-2"
                    >
                      <div>
                        <Link
                          to="/les-elus"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Les élus
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/projets-mairie"
                          className="block py-2 text-blue-200 hover:text-yellow-400 transition-colors"
                          onClick={closeMenu}
                        >
                          Les projets de la mairie
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
