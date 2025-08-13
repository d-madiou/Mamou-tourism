"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Calendar,
  FileText,
  Home,
  Hotel,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Settings,
  ShoppingBag,
  Users,
  X,
  Utensils,
  Trophy,
  ImageIcon,
} from "lucide-react"

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [isAuthenticated, setIsAuthenticated] = useState(true) // For demo purposes
  const [stats, setStats] = useState({
    articles: 24,
    events: 12,
    places: 13,
    restaurants: 8,
    messages: 5,
  })
  const navigate = useNavigate()

  // Check authentication
  useEffect(() => {
    // In a real app, you would check if the user is authenticated
    // If not, redirect to login page
    if (!isAuthenticated) {
      navigate("/admin/login")
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    // In a real app, you would implement proper logout logic
    setIsAuthenticated(false)
  }

  // Navigation items
  const navItems = [
    { id: "overview", label: "Vue d'ensemble", icon: <Home className="h-5 w-5" /> },
    { id: "articles", label: "Articles", icon: <FileText className="h-5 w-5" /> },
    { id: "events", label: "Événements", icon: <Calendar className="h-5 w-5" /> },
    { id: "sports", label: "Sports", icon: <Trophy className="h-5 w-5" /> },
    { id: "places", label: "Lieux", icon: <MapPin className="h-5 w-5" /> },
    { id: "restaurants", label: "Restaurants", icon: <Utensils className="h-5 w-5" /> },
    { id: "hotels", label: "Hôtels", icon: <Hotel className="h-5 w-5" /> },
    { id: "markets", label: "Marchés", icon: <ShoppingBag className="h-5 w-5" /> },
    { id: "gallery", label: "Galerie", icon: <ImageIcon className="h-5 w-5" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="h-5 w-5" /> },
    { id: "users", label: "Utilisateurs", icon: <Users className="h-5 w-5" /> },
    { id: "settings", label: "Paramètres", icon: <Settings className="h-5 w-5" /> },
  ]

  // Recent activity data (for demo)
  const recentActivity = [
    {
      id: 1,
      action: "Nouvel article ajouté",
      user: "Admin",
      time: "Il y a 2 heures",
      section: "Articles",
    },
    {
      id: 2,
      action: "Événement mis à jour",
      user: "Éditeur",
      time: "Il y a 5 heures",
      section: "Événements",
    },
    {
      id: 3,
      action: "Nouveau message reçu",
      user: "Système",
      time: "Il y a 1 jour",
      section: "Messages",
    },
    {
      id: 4,
      action: "Restaurant ajouté",
      user: "Admin",
      time: "Il y a 2 jours",
      section: "Restaurants",
    },
  ]

  // Render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Articles</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.articles}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Événements</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.events}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Lieux</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.places}</h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-yellow-700" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Messages</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.messages}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Activité récente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <FileText className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <div className="flex text-sm text-gray-500">
                        <span>{activity.user}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-700 font-medium hover:text-blue-800">Voir toute l'activité</button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Actions rapides</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-lg transition-colors">
                  Ajouter un article
                </button>
                <button className="bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg transition-colors">
                  Créer un événement
                </button>
                <button className="bg-yellow-700 hover:bg-yellow-800 text-white p-3 rounded-lg transition-colors">
                  Ajouter un lieu
                </button>
              </div>
            </div>
          </div>
        )

      case "articles":
        return <ArticlesManager />

      case "events":
        return <EventsManager />

      case "sports":
        return <SportsManager />

      case "places":
        return <PlacesManager />

      case "restaurants":
        return <RestaurantsManager />

      case "hotels":
        return <HotelsManager />

      case "messages":
        return <MessagesManager />

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Section en développement</h2>
            <p className="text-gray-600">
              Cette section est en cours de développement et sera disponible prochainement.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "w-64" : "w-0 lg:w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-blue-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-lg mr-2">
                M
              </div>
              <span className="text-lg font-bold">Admin Mamou</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-800"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-blue-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="bg-blue-700 text-white text-xs absolute top-0 right-0 h-4 w-4 rounded-full flex items-center justify-center">
                3
              </span>
              <button className="text-gray-600">
                <MessageSquare className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-2">
                A
              </div>
              <span className="text-gray-800 font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

// Content management components
function ArticlesManager() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Développement économique à Mamou",
      category: "Économie",
      status: "Publié",
      date: "15/04/2023",
    },
    {
      id: 2,
      title: "Nouveau centre culturel inauguré",
      category: "Culture",
      status: "Publié",
      date: "02/05/2023",
    },
    {
      id: 3,
      title: "Rénovation des infrastructures routières",
      category: "Infrastructure",
      status: "Brouillon",
      date: "10/06/2023",
    },
    {
      id: 4,
      title: "Festival annuel de musique traditionnelle",
      category: "Culture",
      status: "Publié",
      date: "22/06/2023",
    },
    {
      id: 5,
      title: "Initiatives pour l'éducation des jeunes",
      category: "Éducation",
      status: "Brouillon",
      date: "05/07/2023",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "",
    content: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewArticle({
      ...newArticle,
      [name]: value,
    })
  }

  const handleAddArticle = (e) => {
    e.preventDefault()
    const article = {
      id: articles.length + 1,
      ...newArticle,
      status: "Brouillon",
      date: new Date().toLocaleDateString("fr-FR"),
    }
    setArticles([...articles, article])
    setNewArticle({
      title: "",
      category: "",
      content: "",
    })
    setShowAddForm(false)
  }

  const handleDeleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Articles</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showAddForm ? "Annuler" : "Ajouter un article"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Nouvel article</h3>
          <form onSubmit={handleAddArticle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={newArticle.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Catégorie</label>
                <select
                  name="category"
                  value={newArticle.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Économie">Économie</option>
                  <option value="Culture">Culture</option>
                  <option value="Éducation">Éducation</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Contenu</label>
              <textarea
                name="content"
                value={newArticle.content}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{article.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        article.status === "Publié" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteArticle(article.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function EventsManager() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Festival de Musique Traditionnelle",
      date: "15/08/2023",
      location: "Centre Culturel de Mamou",
      type: "Festival",
      status: "À venir",
    },
    {
      id: 2,
      title: "Exposition d'Art Local",
      date: "22/09/2023",
      location: "Galerie Municipale",
      type: "Exposition",
      status: "À venir",
    },
    {
      id: 3,
      title: "Conférence sur le Développement Durable",
      date: "05/07/2023",
      location: "Salle de Conférence de la Mairie",
      type: "Conférence",
      status: "Terminé",
    },
    {
      id: 4,
      title: "Marché Artisanal Hebdomadaire",
      date: "Chaque Dimanche",
      location: "Place du Marché",
      type: "Marché",
      status: "Récurrent",
    },
    {
      id: 5,
      title: "Célébration de la Fête Nationale",
      date: "02/10/2023",
      location: "Place Centrale",
      type: "Célébration",
      status: "À venir",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    type: "",
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent({
      ...newEvent,
      [name]: value,
    })
  }

  const handleAddEvent = (e) => {
    e.preventDefault()
    const event = {
      id: events.length + 1,
      ...newEvent,
      status: "À venir",
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      location: "",
      type: "",
      description: "",
    })
    setShowAddForm(false)
  }

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Événements</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showAddForm ? "Annuler" : "Ajouter un événement"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Nouvel événement</h3>
          <form onSubmit={handleAddEvent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input
                  type="text"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  placeholder="JJ/MM/AAAA ou description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Lieu</label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type</label>
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Festival">Festival</option>
                  <option value="Exposition">Exposition</option>
                  <option value="Conférence">Conférence</option>
                  <option value="Marché">Marché</option>
                  <option value="Célébration">Célébration</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{event.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{event.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{event.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.status === "À venir"
                          ? "bg-blue-100 text-blue-800"
                          : event.status === "Terminé"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteEvent(event.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SportsManager() {
  const [matches, setMatches] = useState([
    {
      id: 1,
      homeTeam: "AS Mamou",
      awayTeam: "FC Conakry",
      homeScore: 2,
      awayScore: 1,
      date: "15/07/2023",
      location: "Stade Municipal de Mamou",
      status: "Terminé",
      sport: "Football",
    },
    {
      id: 2,
      homeTeam: "AS Mamou",
      awayTeam: "Kindia United",
      homeScore: 3,
      awayScore: 0,
      date: "22/07/2023",
      location: "Stade Municipal de Mamou",
      status: "Terminé",
      sport: "Football",
    },
    {
      id: 3,
      homeTeam: "Basket Mamou",
      awayTeam: "Conakry Stars",
      homeScore: 78,
      awayScore: 65,
      date: "10/07/2023",
      location: "Gymnase de Mamou",
      status: "Terminé",
      sport: "Basketball",
    },
    {
      id: 4,
      homeTeam: "AS Mamou",
      awayTeam: "Labé Sportif",
      homeScore: null,
      awayScore: null,
      date: "05/08/2023",
      location: "Stade Municipal de Mamou",
      status: "À venir",
      sport: "Football",
    },
    {
      id: 5,
      homeTeam: "Volley Mamou",
      awayTeam: "Kankan VC",
      homeScore: null,
      awayScore: null,
      date: "12/08/2023",
      location: "Gymnase de Mamou",
      status: "À venir",
      sport: "Volleyball",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newMatch, setNewMatch] = useState({
    homeTeam: "",
    awayTeam: "",
    homeScore: "",
    awayScore: "",
    date: "",
    location: "",
    sport: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMatch({
      ...newMatch,
      [name]: value,
    })
  }

  const handleAddMatch = (e) => {
    e.preventDefault()
    const match = {
      id: matches.length + 1,
      ...newMatch,
      homeScore: newMatch.homeScore || null,
      awayScore: newMatch.awayScore || null,
      status: newMatch.homeScore && newMatch.awayScore ? "Terminé" : "À venir",
    }
    setMatches([...matches, match])
    setNewMatch({
      homeTeam: "",
      awayTeam: "",
      homeScore: "",
      awayScore: "",
      date: "",
      location: "",
      sport: "",
    })
    setShowAddForm(false)
  }

  const handleDeleteMatch = (id) => {
    setMatches(matches.filter((match) => match.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Matchs Sportifs</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showAddForm ? "Annuler" : "Ajouter un match"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Nouveau match</h3>
          <form onSubmit={handleAddMatch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Équipe domicile</label>
                <input
                  type="text"
                  name="homeTeam"
                  value={newMatch.homeTeam}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Équipe extérieure</label>
                <input
                  type="text"
                  name="awayTeam"
                  value={newMatch.awayTeam}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Sport</label>
                <select
                  name="sport"
                  value={newMatch.sport}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner un sport</option>
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Handball">Handball</option>
                  <option value="Athlétisme">Athlétisme</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Score domicile</label>
                <input
                  type="number"
                  name="homeScore"
                  value={newMatch.homeScore}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Laisser vide si match à venir"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Score extérieur</label>
                <input
                  type="number"
                  name="awayScore"
                  value={newMatch.awayScore}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Laisser vide si match à venir"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input
                  type="text"
                  name="date"
                  value={newMatch.date}
                  onChange={handleInputChange}
                  placeholder="JJ/MM/AAAA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Lieu</label>
                <input
                  type="text"
                  name="location"
                  value={newMatch.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {match.homeScore !== null && match.awayScore !== null
                        ? `${match.homeScore} - ${match.awayScore}`
                        : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{match.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{match.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{match.sport}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        match.status === "Terminé" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteMatch(match.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function PlacesManager() {
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: "Tolo",
      type: "Sous-préfecture",
      description: "Connue pour ses paysages montagneux et ses cascades pittoresques.",
      featured: true,
    },
    {
      id: 2,
      name: "Timbo",
      type: "Sous-préfecture",
      description: "Site historique important, ancienne capitale de l'empire du Fouta-Djalon.",
      featured: true,
    },
    {
      id: 3,
      name: "Cascade de Tolo",
      type: "Attraction",
      description: "Une magnifique cascade entourée de végétation luxuriante.",
      featured: true,
    },
    {
      id: 4,
      name: "Mosquée historique de Timbo",
      type: "Attraction",
      description: "Un joyau architectural et historique datant du 18ème siècle.",
      featured: true,
    },
    {
      id: 5,
      name: "Mont Tolo",
      type: "Attraction",
      description: "Un sommet offrant une vue panoramique exceptionnelle sur toute la région.",
      featured: false,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newPlace, setNewPlace] = useState({
    name: "",
    type: "",
    description: "",
    featured: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewPlace({
      ...newPlace,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddPlace = (e) => {
    e.preventDefault()
    const place = {
      id: places.length + 1,
      ...newPlace,
    }
    setPlaces([...places, place])
    setNewPlace({
      name: "",
      type: "",
      description: "",
      featured: false,
    })
    setShowAddForm(false)
  }

  const handleDeletePlace = (id) => {
    setPlaces(places.filter((place) => place.id !== id))
  }

  const handleToggleFeatured = (id) => {
    setPlaces(places.map((place) => (place.id === id ? { ...place, featured: !place.featured } : place)))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Lieux</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-yellow-700 hover:bg-yellow-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showAddForm ? "Annuler" : "Ajouter un lieu"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Nouveau lieu</h3>
          <form onSubmit={handleAddPlace}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={newPlace.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type</label>
                <select
                  name="type"
                  value={newPlace.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Sous-préfecture">Sous-préfecture</option>
                  <option value="Attraction">Attraction</option>
                  <option value="Site naturel">Site naturel</option>
                  <option value="Site historique">Site historique</option>
                  <option value="Parc">Parc</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={newPlace.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={newPlace.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Mettre en avant sur la page d'accueil</span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-700 hover:bg-yellow-800 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mis en avant
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {places.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{place.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{place.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 truncate max-w-xs">{place.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleFeatured(place.id)}
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        place.featured ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {place.featured ? "Oui" : "Non"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeletePlace(place.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function RestaurantsManager() {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Restaurant Le Mamou",
      cuisine: "Traditionnelle",
      location: "Centre-ville, Mamou",
      priceRange: "Élevé",
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      name: "Chez Fatou",
      cuisine: "Traditionnelle",
      location: "Quartier Dalaba, Mamou",
      priceRange: "Moyen",
      rating: 4.5,
      featured: true,
    },
    {
      id: 3,
      name: "Le Petit Café",
      cuisine: "Café",
      location: "Avenue de la République, Mamou",
      priceRange: "Économique",
      rating: 4.3,
      featured: false,
    },
    {
      id: 4,
      name: "La Terrasse",
      cuisine: "Fusion",
      location: "Quartier Petel, Mamou",
      priceRange: "Élevé",
      rating: 4.7,
      featured: true,
    },
    {
      id: 5,
      name: "Maquis du Foutah",
      cuisine: "Traditionnelle",
      location: "Route de Conakry, Mamou",
      priceRange: "Économique",
      rating: 4.2,
      featured: false,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    cuisine: "",
    location: "",
    priceRange: "",
    rating: "",
    featured: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewRestaurant({
      ...newRestaurant,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddRestaurant = (e) => {
    e.preventDefault()
    const restaurant = {
      id: restaurants.length + 1,
      ...newRestaurant,
      rating: Number.parseFloat(newRestaurant.rating),
    }
    setRestaurants([...restaurants, restaurant])
    setNewRestaurant({
      name: "",
      cuisine: "",
      location: "",
      priceRange: "",
      rating: "",
      featured: false,
    })
    setShowAddForm(false)
  }

  const handleDeleteRestaurant = (id) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id))
  }

  const handleToggleFeatured = (id) => {
    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, featured: !restaurant.featured } : restaurant,
      ),
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Restaurants</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showAddForm ? "Annuler" : "Ajouter un restaurant"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Nouveau restaurant</h3>
          <form onSubmit={handleAddRestaurant}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={newRestaurant.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Cuisine</label>
                <select
                  name="cuisine"
                  value={newRestaurant.cuisine}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner un type de cuisine</option>
                  <option value="Traditionnelle">Traditionnelle</option>
                  <option value="Fusion">Fusion</option>
                  <option value="Café">Café</option>
                  <option value="Internationale">Internationale</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Emplacement</label>
                <input
                  type="text"
                  name="location"
                  value={newRestaurant.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Gamme de prix</label>
                <select
                  name="priceRange"
                  value={newRestaurant.priceRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une gamme de prix</option>
                  <option value="Économique">Économique</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Élevé">Élevé</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Note (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={newRestaurant.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={newRestaurant.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Mettre en avant sur la page d'accueil</span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cuisine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emplacement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mis en avant
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{restaurant.cuisine}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{restaurant.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{restaurant.priceRange}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{restaurant.rating}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleFeatured(restaurant.id)}
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        restaurant.featured ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {restaurant.featured ? "Oui" : "Non"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function HotelsManager() {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Hôtel Mamou Palace",
      category: "4 étoiles",
      location: "Centre-ville, Mamou",
      priceRange: "Élevé",
      amenities: ["Piscine", "Restaurant", "Wifi", "Climatisation", "Salle de conférence"],
      featured: true,
    },
    {
      id: 2,
      name: "Résidence Foutah",
      category: "3 étoiles",
      location: "Quartier Dalaba, Mamou",
      priceRange: "Moyen",
      amenities: ["Restaurant", "Wifi", "Climatisation"],
      featured: true,
    },
    {
      id: 3,
      name: "Auberge du Voyageur",
      category: "2 étoiles",
      location: "Route de Conakry, Mamou",
      priceRange: "Économique",
      amenities: ["Wifi", "Ventilateur"],
      featured: false,
    },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Hôtels</h2>
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition-colors">
          Ajouter un hôtel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <h3 className="text-lg font-bold mb-4">Module en développement</h3>
        <p className="text-gray-600 mb-4">
          Cette section est en cours de développement et sera disponible prochainement.
        </p>
        <p className="text-gray-600">
          Vous pourrez bientôt gérer les hôtels, leurs chambres, tarifs et disponibilités.
        </p>
      </div>
    </div>
  )
}

function MessagesManager() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      subject: "Demande d'informations touristiques",
      message:
        "Bonjour, je souhaiterais obtenir des informations sur les attractions touristiques à Mamou. Quels sont les sites à ne pas manquer? Merci d'avance pour votre réponse.",
      date: "15/07/2023",
      status: "Non lu",
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@example.com",
      subject: "Réservation d'un guide",
      message:
        "Bonjour, je serai à Mamou du 10 au 15 août et je souhaiterais réserver un guide pour visiter la région. Pouvez-vous me donner plus d'informations sur les tarifs et disponibilités? Merci.",
      date: "20/07/2023",
      status: "Lu",
    },
    {
      id: 3,
      name: "Ahmed Diallo",
      email: "ahmed.diallo@example.com",
      subject: "Problème de voirie",
      message:
        "Bonjour, je souhaite signaler un problème de voirie dans le quartier Dalaba. La route est en très mauvais état et devient dangereuse lors des pluies. Pourriez-vous intervenir? Merci.",
      date: "25/07/2023",
      status: "Non lu",
    },
    {
      id: 4,
      name: "Sophie Camara",
      email: "sophie.camara@example.com",
      subject: "Demande de partenariat",
      message:
        "Bonjour, je représente une association culturelle et nous souhaiterions établir un partenariat avec la ville de Mamou pour organiser des événements culturels. Pouvons-nous convenir d'un rendez-vous pour en discuter? Cordialement.",
      date: "01/08/2023",
      status: "Lu",
    },
    {
      id: 5,
      name: "Pierre Sow",
      email: "pierre.sow@example.com",
      subject: "Informations sur les marchés",
      message:
        "Bonjour, je suis chercheur et je travaille sur les marchés traditionnels en Guinée. Pourriez-vous me fournir des informations sur les jours de marché à Mamou et les produits qu'on y trouve? Merci pour votre aide.",
      date: "05/08/2023",
      status: "Non lu",
    },
  ])

  const [selectedMessage, setSelectedMessage] = useState(null)

  const handleMarkAsRead = (id) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, status: "Lu" } : message)))
  }

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id))
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Messages de contact</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-[600px]">
          {/* Message List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">Boîte de réception</h3>
              <p className="text-sm text-gray-500">
                {messages.filter((m) => m.status === "Non lu").length} messages non lus
              </p>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message)
                  if (message.status === "Non lu") {
                    handleMarkAsRead(message.id)
                  }
                }}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedMessage && selectedMessage.id === message.id ? "bg-blue-50" : ""
                } ${message.status === "Non lu" ? "font-semibold" : ""}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-gray-900">{message.name}</span>
                  <span className="text-xs text-gray-500">{message.date}</span>
                </div>
                <div className="text-sm text-gray-800 font-medium mb-1 truncate">{message.subject}</div>
                <div className="text-xs text-gray-500 truncate">{message.message}</div>
                {message.status === "Non lu" && (
                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Non lu</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Content */}
          <div className="w-2/3 overflow-y-auto">
            {selectedMessage ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedMessage.subject}</h3>
                    <div className="text-sm text-gray-600">
                      De: {selectedMessage.name} ({selectedMessage.email})
                    </div>
                    <div className="text-sm text-gray-500">Reçu le: {selectedMessage.date}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-800 whitespace-pre-line">{selectedMessage.message}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Répondre</h4>
                  <textarea
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Écrivez votre réponse ici..."
                  ></textarea>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors">
                    Envoyer la réponse
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Sélectionnez un message pour le lire</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
