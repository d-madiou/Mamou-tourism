import { useState, useEffect } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { getRestaurants, createRestaurant, deleteRestaurant } from "../../services/apiService"

function RestaurantsManager() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    cuisine_type: ''
  })

  useEffect(() => {
    loadRestaurants()
  }, [])

  const loadRestaurants = async () => {
    try {
      setLoading(true)
      const response = await getRestaurants()
      setRestaurants(response.results || response)
    } catch (error) {
      console.error('Error loading restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRestaurant({
      ...newRestaurant,
      [name]: value,
    })
  }

  const handleAddRestaurant = async (e) => {
    e.preventDefault()
    try {
      await createRestaurant(newRestaurant)
      setNewRestaurant({
        name: '',
        description: '',
        address: '',
        cuisine_type: ''
      })
      setShowAddForm(false)
      loadRestaurants()
    } catch (error) {
      console.error('Error creating restaurant:', error)
    }
  }

  const handleDeleteRestaurant = async (id) => {
    try {
      await deleteRestaurant(id)
      loadRestaurants()
    } catch (error) {
      console.error('Error deleting restaurant:', error)
    }
  }

  if (loading) {
    return <div className="text-center p-8">Chargement des restaurants...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Restaurants</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
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
                <label className="block text-gray-700 font-medium mb-2">Type de cuisine</label>
                <select
                  name="cuisine_type"
                  value={newRestaurant.cuisine_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="local">Local</option>
                  <option value="international">International</option>
                  <option value="fast_food">Fast Food</option>
                  <option value="fine_dining">Gastronomique</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={newRestaurant.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={newRestaurant.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
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
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de cuisine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adresse
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{restaurant.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {restaurant.cuisine_type_display || restaurant.cuisine_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {restaurant.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
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

export default RestaurantsManager