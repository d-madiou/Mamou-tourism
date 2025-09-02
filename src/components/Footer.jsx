"use client"

import { motion } from "framer-motion"
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import LogoImage from "../assets/images/logo.png"

const  Footer = ()=>{
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }
  }

  // Quick links data - reduced
  const quickLinks = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "À propos" },
    { path: "/tourism", label: "Tourisme" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <footer className="bg-blue-950 pt-8 pb-6 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section - Simplified */}
          <div className="md:col-span-1">
            <div className="h-12 w-12 flex items-center justify-center">
            <img
              src={LogoImage}
              alt="Mamou Ville Logo"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
            <p className="mb-4 text-blue-200 text-sm hidden md:block">
              Mamou est une ville et une préfecture de Guinée, située au centre du pays dans la région de Mamou.
            </p>

            {/* Social Media - Simplified */}
            <div className="flex space-x-3">
              <motion.a
                href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                whileHover={{ y: -3 }}
                className="rounded-full bg-blue-800 p-2 text-white transition-colors hover:bg-blue-700"
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                whileHover={{ y: -3 }}
                className="rounded-full bg-blue-800 p-2 text-white transition-colors hover:bg-blue-700"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                whileHover={{ y: -3 }}
                className="rounded-full bg-blue-800 p-2 text-white transition-colors hover:bg-blue-700"
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links - Only visible on desktop */}
          <div className="hidden md:block">
            <h3 className="mb-4 text-lg font-bold text-yellow-400">Liens rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center text-blue-200 transition-colors hover:text-yellow-300 group"
                  >
                    <ArrowRight className="mr-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section - Simplified */}
          <div className="hidden md:block">
            <h3 className="mb-4 text-lg font-bold text-yellow-400">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-200 text-sm">Préfecture de Mamou, Guinée</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-200 text-sm">contact@villedemamou.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-blue-800 pt-4 text-center">
          <p className="text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} Préfecture de Mamou. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
