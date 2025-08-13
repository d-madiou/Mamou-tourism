// config/navigation.js
import {
  Calendar,
  FileText,
  Home,
  Hotel,
  MapPin,
  MessageSquare,
  Settings,
  Users,
  Utensils,
  Trophy,
  School,
  Building,
  Phone,
  Info,
} from "lucide-react"

export const navItems = [
  { id: "overview", label: "Vue d'ensemble", icon: Home },
  { id: "about", label: "À Propos", icon: Info },
  { id: "articles", label: "Articles/Actualités", icon: FileText },
  { id: "events", label: "Événements", icon: Calendar },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "places", label: "Lieux à Visiter", icon: MapPin },
  { id: "restaurants", label: "Restaurants", icon: Utensils },
  { id: "hotels", label: "Hôtels", icon: Hotel },
  { id: "education", label: "Éducation", icon: School },
  { id: "administration", label: "Administration", icon: Building },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "users", label: "Utilisateurs", icon: Users },
  { id: "settings", label: "Paramètres", icon: Settings },
]
