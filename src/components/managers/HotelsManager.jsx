import { useState, useEffect } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { getHotels, createHotel, deleteHotel } from "../../services/apiService"

function HotelsManager() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newHotel, setNewHotel] = useState({
    name: '',
    description: '',
    address: '',
    star_rating: 1
  })

  useEffect(() => {
    loadHotels()
  }, [])

  const loadHotels = async () => {
    try {
      setLoading(true)
      const response = await getHotels()
      setHotels(response.results || response)
    } catch (error) {
      console.error('Error loading hotels:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewHotel({
      ...newHotel,
      [name]: name === 'star_rating' ? parseInt(value) : value,
    })
  }

  const handleAddHotel = async (e) => {
    e.preventDefault()
    try {
      await createHotel(newHotel)
      setNewHotel({
        name: '',
        description: '',
        address: '',
        star_rating: 1
      })
      setShowAddForm(false)
      loadHotels()
    } catch (error) {
      console.error('Error creating hotel:', error)
    }
  }

  const handleDeleteHotel = async (id) => {
    try {
      await deleteHotel(id)
      loadHotels()
    } catch (error) {
      console.error('Error deleting hotel:', error)
    }
  }

  if (loading) {
    return <div className="text-center p-8">Chargement des hôtels...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Hôtels</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showAddForm ? "Annuler" : "Ajouter un hôtel"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Nouvel hôtel</h3>
          <form onSubmit={handleAddHotel}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={newHotel.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Étoiles</label>
                <select
                  name="star_rating"
                  value={newHotel.star_rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>{star} étoile{star > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={newHotel.address}
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
                value={newHotel.description}
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
                  Étoiles
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
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{hotel.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hotel.star_rating} étoile{hotel.star_rating > 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hotel.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteHotel(hotel.id)}
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

export default HotelsManager