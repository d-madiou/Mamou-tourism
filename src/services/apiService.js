// services/apiService.js

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token')
  return {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
  }
}

// API Service
export const apiService = {
  // Dashboard
  getDashboardSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/summary/`, {
      headers: getAuthHeaders(),
    })
    return response.json()
  },

  getRecentActivities: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/activities/`, {
      headers: getAuthHeaders(),
    })
    return response.json()
  },

  // News Articles
  getNewsArticles: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/actualites/news/?${queryString}`)
    return response.json()
  },

  createNewsArticle: async (data) => {
    const response = await fetch(`${API_BASE_URL}/actualites/news/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  updateNewsArticle: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/actualites/news/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deleteNewsArticle: async (id) => {
    await fetch(`${API_BASE_URL}/actualites/news/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
  },

  // Events
  getEvents: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/actualites/events/?${queryString}`)
    return response.json()
  },

  createEvent: async (data) => {
    const response = await fetch(`${API_BASE_URL}/actualites/events/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deleteEvent: async (id) => {
    await fetch(`${API_BASE_URL}/actualites/events/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
  },

  // Sports Matches
  getSportsMatches: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/actualites/sports/matches/?${queryString}`)
    return response.json()
  },

  createSportsMatch: async (data) => {
    const response = await fetch(`${API_BASE_URL}/actualites/sports/matches/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deleteSportsMatch: async (id) => {
    await fetch(`${API_BASE_URL}/actualites/sports/matches/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
  },

  // Places to Visit
  getPlaces: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/explore/places/?${queryString}`)
    return response.json()
  },

  createPlace: async (data) => {
    const response = await fetch(`${API_BASE_URL}/explore/places/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deletePlace: async (id) => {
    await fetch(`${API_BASE_URL}/explore/places/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
  },

  // Restaurants
  getRestaurants: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/explore/restaurants/?${queryString}`)
    return response.json()
  },

  createRestaurant: async (data) => {
    const response = await fetch(`${API_BASE_URL}/explore/restaurants/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deleteRestaurant: async (id) => {
    await fetch(`${API_BASE_URL}/explore/restaurants/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
  },

  // Hotels
  getHotels: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/explore/hotels/?${queryString}`)
    return response.json()
  },

  createHotel: async (data) => {
    const response = await fetch(`${API_BASE_URL}/explore/hotels/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Schools
  getSchools: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/education/schools/?${queryString}`)
    return response.json()
  },

  // Contact Messages
  getContactMessages: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/contact/messages/?${queryString}`, {
      headers: getAuthHeaders(),
    })
    return response.json()
  },

  updateContactMessage: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/contact/messages/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  deleteContactMessage: async (id) => {
    await fetch(`${API_BASE_URL}/contact/messages/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
  }
}