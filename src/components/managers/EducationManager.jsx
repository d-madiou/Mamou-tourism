import { useState, useEffect } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { getSchools, createSchool, deleteSchool } from "../../services/apiService"

function EducationManager() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSchool, setNewSchool] = useState({
    name: '',
    description: '',
    address: '',
    type: ''
  })

  useEffect(() => {
    loadSchools()
  }, [])

  const loadSchools = async () => {
    try {
      setLoading(true)
      const response = await getSchools()
      setSchools(response.results || response)
    } catch (error) {
      console.error('Error loading schools:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSchool({
      ...newSchool,
      [name]: value,
    })
  }

  const handleAddSchool = async (e) => {
    e.preventDefault()
    try {
      await createSchool(newSchool)
      setNewSchool({
        name: '',
        description: '',
        address: '',
        type: ''
      })
      setShowAddForm(false)
      loadSchools()
    } catch (error) {
      console.error('Error creating school:', error)
    }
  }

  const handleDeleteSchool = async (id) => {
    try {
      await deleteSchool(id)
      loadSchools()
    } catch (error) {
      console.error('Error deleting school:', error)
    }
  }

  if (loading) {
    return <div className="text-center p-8">Chargement des écoles...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Écoles</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showAddForm ? "Annuler" : "Ajouter une école"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Nouvelle école</h3>
          <form onSubmit={handleAddSchool}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={newSchool.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type</label>
                <select
                  name="type"
                  value={newSchool.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="primary">Primaire</option>
                  <option value="secondary">Secondaire</option>
                  <option value="university">Université</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={newSchool.address}
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
                value={newSchool.description}
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
                  Type
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
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{school.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{school.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {school.type_display || school.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {school.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteSchool(school.id)}
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

export default EducationManager