import { useState, useEffect } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { getPlaces, createPlace, deletePlace } from "../../services/apiService"

function PlacesManager() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPlace, setNewPlace] = useState({
    name: '',
    description: '',
    address: '',
    category: ''
  })

  useEffect(() => {
    loadPlaces()
  }, [])

  const loadPlaces = async () => {
    try {
      setLoading(true)
      const response = await getPlaces()
      setPlaces(response.results || response)
    } catch (error) {
      console.error('Error loading places:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPlace({
      ...newPlace,
      [name]: value,
    })
  }

  const handleAddPlace = async (e) => {
    e.preventDefault()
    try {
      await createPlace(newPlace)
      setNewPlace({
        name: '',
        description: '',
        address: '',
        category: ''
      })
      setShowAddForm(false)
      loadPlaces()
    } catch (error) {
      console.error('Error creating place:', error)
    }
  }

  const handleDeletePlace = async (id) => {
    try {
      await deletePlace(id)
      loadPlaces()
    } catch (error) {
      console.error('Error deleting place:', error)
    }
  }

  if (loading) {
    return <div className="text-center p-8">Chargement des lieux...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Lieux à Visiter</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
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
                <label className="block text-gray-700 font-medium mb-2">Catégorie</label>
                <select
                  name="category"
                  value={newPlace.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="historical">Historique</option>
                  <option value="natural">Naturel</option>
                  <option value="cultural">Culturel</option>
                  <option value="recreational">Récréatif</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={newPlace.address}
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
                value={newPlace.description}
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
                  Catégorie
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
              {places.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{place.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{place.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {place.category_display || place.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {place.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeletePlace(place.id)}
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

export default PlacesManager