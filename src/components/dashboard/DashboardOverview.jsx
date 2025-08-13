// components/dashboard/DashboardOverview.jsx
import React, { useState, useEffect } from 'react'
import {
  Calendar,
  FileText,
  Hotel,
  MapPin,
  MessageSquare,
  School,
  Trophy,
  Utensils,
} from "lucide-react"
import StatCard from '../common/StatCard'
import { apiService } from '../../services/apiService'
import Sidebar from '../common/SideBar'

export default function DashboardOverview({ stats, loading }) {
  const [recentActivities, setRecentActivities] = useState([])

  useEffect(() => {
    loadRecentActivities()
  }, [])

  const loadRecentActivities = async () => {
    try {
      const activities = await apiService.getRecentActivities()
      setRecentActivities(activities.activities || [])
    } catch (error) {
      console.error('Error loading recent activities:', error)
    }
  }

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
        <p className="mt-4">Chargement...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Restaurants"
          value={stats?.total_restaurants || 0}
          icon={<Utensils className="h-6 w-6 text-red-700" />}
          bgColor="bg-red-100"
        />
        <StatCard
          title="Hôtels"
          value={stats?.total_hotels || 0}
          icon={<Hotel className="h-6 w-6 text-purple-700" />}
          bgColor="bg-purple-100"
        />
        <StatCard
          title="Lieux à Visiter"
          value={stats?.total_places || 0}
          icon={<MapPin className="h-6 w-6 text-green-700" />}
          bgColor="bg-green-100"
        />
        <StatCard
          title="Événements"
          value={stats?.total_events || 0}
          icon={<Calendar className="h-6 w-6 text-blue-700" />}
          bgColor="bg-blue-100"
        />
        <StatCard
          title="Articles"
          value={stats?.total_news || 0}
          icon={<FileText className="h-6 w-6 text-yellow-700" />}
          bgColor="bg-yellow-100"
        />
        <StatCard
          title="Matchs Sportifs"
          value={stats?.total_matches || 0}
          icon={<Trophy className="h-6 w-6 text-orange-700" />}
          bgColor="bg-orange-100"
        />
        <StatCard
          title="Écoles"
          value={stats?.total_schools || 0}
          icon={<School className="h-6 w-6 text-indigo-700" />}
          bgColor="bg-indigo-100"
        />
        <StatCard
          title="Messages Non Lus"
          value={stats?.unread_messages || 0}
          icon={<MessageSquare className="h-6 w-6 text-pink-700" />}
          bgColor="bg-pink-100"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Activité récente</h3>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start border-b border-gray-100 pb-4 last:border-b-0">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  {activity.type === 'news' && <FileText className="h-4 w-4 text-blue-700" />}
                  {activity.type === 'event' && <Calendar className="h-4 w-4 text-green-700" />}
                  {activity.type === 'match' && <Trophy className="h-4 w-4 text-orange-700" />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex text-sm text-gray-500">
                    <span>{new Date(activity.created_at).toLocaleDateString('fr-FR')}</span>
                    {activity.category && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{activity.category}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Aucune activité récente</p>
          )}
        </div>
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
}