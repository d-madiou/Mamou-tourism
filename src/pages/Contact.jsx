"use client"

import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Clock, Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from "lucide-react"
import { useState } from "react"
import { FaHome, FaWhatsapp } from "react-icons/fa"
import NavBar from "../components/NavBar"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <FaHome className="mr-2" />
            <span>Accueil</span>
            <ChevronRight className="mx-2 h-3 w-3" />
            <span>Contact</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-blue-100 mb-6">Nous sommes à votre écoute pour toute question ou information</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Informations de contact</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Adresse</h3>
                    <p className="text-gray-600">Préfecture de Mamou, Région de Mamou, Guinée</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Téléphone</h3>
                    <p className="text-gray-600">+224 620 15 04 81</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">contact@villedemamou.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Heures d'ouverture</h3>
                    <p className="text-gray-600">Lundi - Vendredi: 8h00 - 17h00</p>
                    <p className="text-gray-600">Samedi: 9h00 - 13h00</p>
                    <p className="text-gray-600">Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Suivez-nous</h2>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                  whileHover={{ y: -5 }}
                  className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://wa.me/224620150481"
                  whileHover={{ y: -5 }}
                  className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex mb-6 border-b">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`pb-3 px-4 font-medium ${
                    activeTab === "general"
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Demande générale
                </button>
                <button
                  onClick={() => setActiveTab("tourism")}
                  className={`pb-3 px-4 font-medium ${
                    activeTab === "tourism"
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Informations touristiques
                </button>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-700 p-4 rounded-lg flex items-start"
                >
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Message envoyé avec succès!</h3>
                    <p className="text-green-600 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Notre localisation</h2>
          <div className="bg-white rounded-lg shadow-sm p-4 h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-700 mx-auto mb-4" />
              <p className="text-gray-600">Carte interactive de Mamou</p>
              <a href="https://maps.app.goo.gl/NmFfQYZvd7BK5CmU6" className="mt-4 text-blue-700 font-medium hover:text-blue-800">Voir sur Google Maps</a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Questions fréquentes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Quels sont les horaires d'ouverture de la préfecture?
              </h3>
              <p className="text-gray-600">
                La préfecture est ouverte du lundi au vendredi de 8h00 à 17h00, le samedi de 9h00 à 13h00, et fermée le
                dimanche.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Comment puis-je obtenir des informations touristiques?
              </h3>
              <p className="text-gray-600">
                Vous pouvez nous contacter par téléphone, email ou en personne à notre bureau. Nous proposons également
                des brochures et des guides touristiques.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Est-il possible de réserver un guide touristique?
              </h3>
              <p className="text-gray-600">
                Oui, nous proposons des services de guide touristique. Veuillez nous contacter au moins 48 heures à
                l'avance pour effectuer une réservation.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Comment puis-je signaler un problème dans la ville?
              </h3>
              <p className="text-gray-600">
                Vous pouvez signaler tout problème en utilisant notre formulaire de contact ou en appelant directement
                notre service concerné.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
