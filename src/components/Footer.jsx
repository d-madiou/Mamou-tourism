"use client"

import { ArrowRight, Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"
import LogoImage from "../assets/images/logo.png"

const  Footer = ()=>{
  // Quick links data - reduced
  const quickLinks = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "À propos" },
    { path: "/articles", label: "Articles" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <footer className="bg-gradient-to-b from-[#086a8b] via-[#053f53] to-[#032836] pt-8 pb-6 text-white">
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
            <p className="mb-4 text-[#d7f2f9] text-sm hidden md:block">
              Mamou est une ville et une préfecture de Guinée, située au centre du pays dans la région de Mamou.
            </p>

            {/* Social Media - Simplified */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                aria-label="Page Facebook officielle de Mamou"
                className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition-colors hover:bg-[#0992c2] hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                aria-label="Compte X/Twitter de Mamou"
                className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition-colors hover:bg-[#0992c2] hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                aria-label="Compte Instagram de Mamou"
                className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition-colors hover:bg-[#0992c2] hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links - Only visible on desktop */}
          <div className="hidden md:block">
            <h3 className="mb-4 text-lg font-bold text-[#fbbf24]">Liens rapides</h3>
            <nav aria-label="Liens rapides du pied de page">
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="flex items-center text-[#d7f2f9] transition-colors hover:text-[#fbbf24] group"
                    >
                      <ArrowRight className="mr-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Section - Simplified */}
          <div className="hidden md:block">
            <h3 className="mb-4 text-lg font-bold text-[#fbbf24]">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                <span className="text-[#d7f2f9] text-sm">Ville de Mamou, Guinée</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-4 w-4 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                <span className="text-[#d7f2f9] text-sm">contact@villedemamou.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-[#99e3f6] text-sm">
            &copy; {new Date().getFullYear()} Ville de Mamou. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
