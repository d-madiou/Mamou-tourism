import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react"

const SousPrefectures = ({ sousPrefectures = [] }) => {
  const [activeSP, setActiveSP] = useState(0)
  const spContainerRef = useRef(null)

  useEffect(() => {
    if (spContainerRef.current) {
      spContainerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [activeSP])

  // Early return if no data
  if (!sousPrefectures || sousPrefectures.length === 0) {
    return (
      <div id="sous-prefecture-section" className="mb-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
          Sous-Préfectures
          <span className="block h-1 w-1/2 mx-auto bg-yellow-400"></span>
        </h2>
        <div className="text-center text-gray-500">
          Aucune sous-préfecture disponible pour le moment.
        </div>
      </div>
    )
  }

  return (
    <div id="sous-prefecture-section" className="mb-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">
        Sous-Préfectures
        <span className="block h-1 w-1/2 mx-auto bg-yellow-400"></span>
      </h2>

      {/* Navigation buttons */}
      <div className="flex justify-center overflow-x-auto pb-6">
        <div className="flex flex-wrap justify-center gap-3">
          {sousPrefectures?.map((sp, index) => (
            <button
              key={sp.id || index}
              onClick={() => setActiveSP(index)}
              className={`whitespace-nowrap rounded-full px-6 py-3 text-lg font-medium ${
                activeSP === index
                  ? "bg-blue-700 text-white shadow-lg"
                  : "bg-white text-blue-900 hover:bg-blue-50"
              }`}
            >
              {sp.nom || `Sous-Préfecture ${index + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* Active sous-préfecture details */}
      <div ref={spContainerRef} className="mb-20 rounded-2xl bg-white shadow-2xl">
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:p-12">
          {/* Text Info */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="mb-6 text-2xl font-bold text-blue-800">
              {sousPrefectures[activeSP]?.titre || sousPrefectures[activeSP]?.nom}
              <span className="block h-1 w-1/3 bg-yellow-400"></span>
            </h3>

            {/* Description */}
            <p className="mb-4 leading-relaxed">
              {sousPrefectures[activeSP]?.description?.[0]?.children?.[0]?.text || sousPrefectures[activeSP]?.description?.[0]}
            </p>

            {/* Extra fields */}
            <ul className="mt-4 space-y-2 text-gray-600">
              {sousPrefectures[activeSP]?.chefLieu && (
                <li><strong>Chef-lieu:</strong> {sousPrefectures[activeSP].chefLieu}</li>
              )}
              {sousPrefectures[activeSP]?.nombreDistricts && (
                <li><strong>Nombre de districts:</strong> {sousPrefectures[activeSP].nombreDistricts}</li>
              )}
              {sousPrefectures[activeSP]?.population && (
                <li><strong>Population:</strong> {parseInt(sousPrefectures[activeSP].population).toLocaleString()}</li>
              )}
              {sousPrefectures[activeSP]?.superficieKm2 && (
                <li><strong>Superficie:</strong> {sousPrefectures[activeSP].superficieKm2} km²</li>
              )}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex items-center rounded-full bg-blue-700 px-6 py-3 text-white hover:bg-blue-800">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="flex items-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 hover:bg-blue-50">
                <MapPin className="mr-2 h-4 w-4" />
                Voir sur la carte
              </button>
            </div>
          </div>

          {/* Image */}
          {sousPrefectures[activeSP]?.image?.[0] && (
  <div className="overflow-hidden rounded-xl shadow-lg">
    <img
      src={
        sousPrefectures[activeSP].image[0].url.startsWith("http")
          ? sousPrefectures[activeSP].image[0].url
          : `http://localhost:1337${sousPrefectures[activeSP].image[0].url}`
      }
      alt={
        sousPrefectures[activeSP].image[0].alternativeText ||
        sousPrefectures[activeSP].nom ||
        "Image"
      }
      className="h-full w-full object-cover"
    />
  </div>
)}

        </div>

        {/* Navigation between sous-préfectures */}
        {sousPrefectures.length > 1 && (
          <div className="flex items-center justify-between px-8 pb-8 lg:px-12">
            <button
              onClick={() => setActiveSP((prev) => (prev === 0 ? sousPrefectures.length - 1 : prev - 1))}
              className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100"
            >
              <ChevronLeft className="h-5 w-5" />
              {sousPrefectures[activeSP === 0 ? sousPrefectures.length - 1 : activeSP - 1]?.nom}
            </button>
            <button
              onClick={() => setActiveSP((prev) => (prev === sousPrefectures.length - 1 ? 0 : prev + 1))}
              className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100"
            >
              {sousPrefectures[activeSP === sousPrefectures.length - 1 ? 0 : activeSP + 1]?.nom}
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SousPrefectures