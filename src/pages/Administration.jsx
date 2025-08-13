import { Calendar, Clock, Download, FileText, HelpCircle, Info, Mail, MapPin, Phone, Search, User } from "lucide-react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const Administration = () => {
  // Common administrative procedures
  const procedures = [
    {
      title: "Carte d'identité nationale",
      description: "Demande ou renouvellement de la carte d'identité nationale",
      icon: <User className="h-6 w-6" />,
      documents: ["Extrait de naissance", "Certificat de résidence", "Photos d'identité"],
      duration: "15 jours",
      fee: "25,000 GNF",
    },
    {
      title: "Certificat de résidence",
      description: "Obtention d'un certificat de résidence officiel",
      icon: <MapPin className="h-6 w-6" />,
      documents: ["Pièce d'identité", "Facture de service public", "Formulaire de demande"],
      duration: "2 jours",
      fee: "10,000 GNF",
    },
    {
      title: "Extrait de naissance",
      description: "Demande d'une copie d'extrait de naissance",
      icon: <FileText className="h-6 w-6" />,
      documents: ["Pièce d'identité", "Formulaire de demande"],
      duration: "3 jours",
      fee: "5,000 GNF",
    },
    {
      title: "Permis de construire",
      description: "Autorisation pour la construction d'un bâtiment",
      icon: <FileText className="h-6 w-6" />,
      documents: ["Titre foncier", "Plan architectural", "Étude d'impact environnemental"],
      duration: "30 jours",
      fee: "100,000 GNF",
    },
  ]

  // Administrative departments
  const departments = [
    {
      name: "État Civil",
      address: "Hôtel de Ville, Centre-ville, Mamou",
      phone: "+224 12 345 6789",
      email: "etatcivil@mamou.gov.gn",
      hours: "Lundi - Vendredi: 8h00 - 16h00",
    },
    {
      name: "Service Foncier",
      address: "Annexe Administrative, Quartier Dalaba, Mamou",
      phone: "+224 23 456 7890",
      email: "foncier@mamou.gov.gn",
      hours: "Lundi - Jeudi: 8h00 - 16h00, Vendredi: 8h00 - 12h00",
    },
    {
      name: "Urbanisme",
      address: "Bâtiment Administratif, Avenue de la République, Mamou",
      phone: "+224 34 567 8901",
      email: "urbanisme@mamou.gov.gn",
      hours: "Lundi - Vendredi: 9h00 - 15h00",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Administration</h1>
            <p className="text-xl text-blue-100 mb-6">
              Services administratifs et démarches officielles de la ville de Mamou
            </p>
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
              <Search className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Rechercher une démarche administrative..."
                className="w-full bg-transparent border-none focus:outline-none text-gray-800"
              />
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md">Rechercher</button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center mr-6 py-2">
              <Clock className="h-4 w-4 text-blue-700 mr-2" />
              <span>Lun-Ven: 8h00-16h00</span>
            </div>
            <div className="flex items-center mr-6 py-2">
              <Phone className="h-4 w-4 text-blue-700 mr-2" />
              <span>+224 12 345 6789</span>
            </div>
            <div className="flex items-center mr-6 py-2">
              <Mail className="h-4 w-4 text-blue-700 mr-2" />
              <span>administration@mamou.gov.gn</span>
            </div>
            <div className="flex items-center py-2">
              <MapPin className="h-4 w-4 text-blue-700 mr-2" />
              <span>Hôtel de Ville, Centre-ville, Mamou</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Administrative Procedures Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <FileText className="h-6 w-6 text-blue-700 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Démarches Administratives</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">{procedure.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{procedure.title}</h3>
                    <p className="text-gray-600 mb-4">{procedure.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Documents requis:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {procedure.documents.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-1 text-blue-700" />
                        <span>Délai: {procedure.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Info className="h-4 w-4 mr-1 text-blue-700" />
                        <span>Frais: {procedure.fee}</span>
                      </div>
                    </div>

                    <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger le formulaire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Administrative Departments Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <MapPin className="h-6 w-6 text-blue-700 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Services Administratifs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-4">{dept.name}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-700 mr-2 mt-0.5" />
                    <span>{dept.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-700 mr-2" />
                    <span>{dept.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-700 mr-2" />
                    <span>{dept.email}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-700 mr-2 mt-0.5" />
                    <span>{dept.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-700 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Prendre Rendez-vous</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Pour éviter les files d'attente, vous pouvez prendre rendez-vous en ligne pour vos démarches
                administratives.
              </p>
            </div>
            <div>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Réserver un créneau
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <HelpCircle className="h-6 w-6 text-blue-700 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Questions Fréquentes</h2>
          </div>

          <div className="bg-white rounded-lg shadow-md divide-y">
            {[
              {
                question: "Quels sont les horaires d'ouverture de l'administration ?",
                answer:
                  "Les services administratifs sont généralement ouverts du lundi au vendredi, de 8h00 à 16h00. Certains services peuvent avoir des horaires spécifiques.",
              },
              {
                question: "Comment obtenir un extrait de naissance ?",
                answer:
                  "Pour obtenir un extrait de naissance, vous devez vous présenter au service d'état civil avec une pièce d'identité et remplir un formulaire de demande. Le délai de traitement est généralement de 3 jours ouvrables.",
              },
              {
                question: "Où puis-je payer les taxes municipales ?",
                answer:
                  "Les taxes municipales peuvent être payées au service des finances de la mairie, situé à l'Hôtel de Ville. Le paiement peut être effectué en espèces ou par chèque.",
              },
            ].map((item, index) => (
              <div key={index} className="p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-700 text-white rounded-lg p-8">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Besoin d'aide pour vos démarches ?</h2>
              <p className="text-blue-100 mb-4">
                Notre équipe est à votre disposition pour vous aider dans vos démarches administratives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>+224 12 345 6789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>assistance@mamou.gov.gn</span>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Administration
