// utils/auth.js

export const authUtils = {
  // Get authentication token from localStorage
  getToken: () => {
    return localStorage.getItem('auth_token')
  },

  // Set authentication token in localStorage
  setToken: (token) => {
    localStorage.setItem('auth_token', token)
  },

  // Remove authentication token from localStorage
  removeToken: () => {
    localStorage.removeItem('auth_token')
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('auth_token')
    return token !== null && token !== undefined
  },

  // Get auth headers for API requests
  getAuthHeaders: () => {
    const token = localStorage.getItem('auth_token')
    return {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('auth_token')
    // Could also clear other user-related data
    localStorage.removeItem('user_data')
  }
}