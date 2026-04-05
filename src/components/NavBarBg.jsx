"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation for active state
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaCompass,
  FaNewspaper,
  FaEnvelope,
  FaGraduationCap,
  FaFutbol,
  FaFileAlt,
  FaSearch,
  FaFacebookF,
  FaWhatsapp,
  FaChevronDown,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

// Import your logo
import LogoImage from "../assets/images/logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation(); // To track current page

  // Define navigation data structure to avoid repetition
  const navLinks = [
    { label: "Home", path: "/", icon: FaHome },
    { label: "À propos", path: "/about", icon: FaInfoCircle },
    { label: "Contact", path: "/contact", icon: FaEnvelope },
    { label: "Administration", path: "/administration", icon: FaFileAlt },
    {
      label: "Explore",
      path: null, // Dropdown parent
      icon: FaCompass,
      id: "explore",
      children: [
        { label: "Nourriture", path: "/nourriture" },
        { label: "Hotels", path: "/hotel" },
        { label: "Places à visiter", path: "/place" },
      ],
    },
    { label: "Education", path: "/education", icon: FaGraduationCap },
    { label: "Sport", path: "/sport", icon: FaFutbol },
    { label: "Articles", path: "/articles", icon: FaNewspaper },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  // Animation Variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0, overflow: "hidden" },
    visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0992c2] shadow-lg py-2"
          : "md:bg-gradient-to-b md:from-black/70 md:to-transparent bg-[#0992c2] py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center space-x-2 z-50" onClick={closeMenu}>
          <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full p-0.5">
            <img
              src={LogoImage}
              alt="Mamou Ville Logo"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
        </Link>

        {/* ── Desktop Menu ── */}
        <ul className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link, index) => {
            const Icon = link.icon;

            // Render Dropdown Parent
            if (link.children) {
              return (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-sm xl:text-base ${
                      activeDropdown === link.id
                        ? "bg-[#087ea7] text-yellow-400"
                        : "text-white hover:bg-[#087ea7] hover:text-yellow-400"
                    }`}
                  >
                    <Icon className="mr-2" />
                    <span>{link.label}</span>
                    <FaChevronDown
                      className={`ml-1 text-xs transition-transform duration-300 ${
                        activeDropdown === link.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.id && (
                      <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 mt-1 min-w-[200px] z-50 border-t-2 border-yellow-400"
                      >
                        {link.children.map((child, idx) => (
                          <li key={idx}>
                            <Link
                              to={child.path}
                              className={`block px-4 py-2 transition-colors ${
                                isActive(child.path)
                                  ? "bg-[#eef9fc] text-[#086a8b] font-bold"
                                  : "text-gray-800 hover:bg-[#eef9fc] hover:text-[#086a8b]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            // Render Standard Link
            return (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-sm xl:text-base ${
                    isActive(link.path)
                      ? "bg-[#086a8b] text-yellow-400 font-semibold shadow-inner"
                      : "text-white hover:bg-[#087ea7] hover:text-yellow-400"
                  }`}
                >
                  <Icon className="mr-2" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Right Side Icons (Location & Socials) ── */}
        <div className="flex items-center space-x-3">
          {/* Desktop Location */}
          <div className="hidden lg:flex items-center space-x-2 text-white bg-[#086a8b]/50 px-3 py-1.5 rounded-full">
            <FaLocationCrosshairs className="text-red-400" />
            <span className="text-sm xl:text-base">Mamou, Guinea</span>
          </div>

          {/* Mobile Socials (Compact) */}
          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-[#0992c2] text-white transition-all"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://wa.me/224620150481"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-green-600 text-white transition-all"
            >
              <FaWhatsapp size={14} />
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden text-2xl text-white focus:outline-none p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="lg:hidden bg-[#086a8b] border-t border-[#0992c2] shadow-inner overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              
              {/* Mobile Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-[#053f53]/55 text-white border border-[#43bfd8] rounded-full py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#b9ecfb]"
                />
                <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#b9ecfb]" />
              </div>

              {/* Mobile Links Loop */}
              {navLinks.map((link, index) => {
                const Icon = link.icon;

                // Mobile Dropdown
                if (link.children) {
                  return (
                    <motion.div key={index} variants={itemVariants} className="border-b border-[#43bfd8]/35">
                      <button
                        className="flex items-center justify-between w-full py-3 px-2 text-white hover:text-yellow-400 transition-colors"
                        onClick={() => handleDropdownToggle(link.id)}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 text-[#b9ecfb]" />
                          <span className="font-medium">{link.label}</span>
                        </div>
                        <FaChevronDown
                          className={`transition-transform duration-300 text-xs ${
                            activeDropdown === link.id ? "rotate-180 text-yellow-400" : "text-[#b9ecfb]"
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.id && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="bg-[#053f53]/30 rounded-lg mb-2 overflow-hidden"
                          >
                            {link.children.map((child, idx) => (
                              <Link
                                key={idx}
                                to={child.path}
                                onClick={closeMenu}
                                className={`block py-3 px-10 text-sm ${
                                  isActive(child.path)
                                    ? "text-yellow-400 font-semibold"
                                    : "text-[#dff7fd] hover:text-white"
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                // Mobile Standard Link
                return (
                  <motion.div key={index} variants={itemVariants} className="border-b border-[#43bfd8]/35">
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className={`flex items-center py-3 px-2 transition-colors ${
                        isActive(link.path)
                          ? "text-yellow-400 font-bold bg-[#0992c2]/25 rounded"
                          : "text-white hover:text-yellow-400"
                      }`}
                    >
                      <Icon className={`mr-3 ${isActive(link.path) ? "text-yellow-400" : "text-[#b9ecfb]"}`} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Location Footer */}
              <motion.div variants={itemVariants} className="pt-6 pb-2 flex items-center justify-center text-[#d7f2f9] text-sm">
                <FaMapMarkedAlt className="mr-2 text-yellow-400" />
                <span>Mamou, République de Guinée</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
