"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Download,
  FileText,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
  Building2,
  Shield,
  Users,
  Star,
  ChevronRight,
  ChevronUp,
  Filter,
  Grid,
  List,
  Eye,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Image1 from "../assets/images/document.png";
import jsPDF from "jspdf";


const carouselImages = [
  Image1,
  "https://www.assembleeguinee.org/sites/default/files/post-gallery/galerie_mamou2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg/330px-%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg",
];

const Administration = ({ documents = [], officials = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

      // Let's organise here the PDF downloads
      const generatePDF = (doc) => {
      const pdf = new jsPDF();

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text(doc.titre, 20, 20);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(`Type de document: ${doc.typeDocument}`, 20, 40);
      if (doc.description) pdf.text(`Description: ${doc.description}`, 20, 50);
      if (doc.lieu) pdf.text(`Lieu: ${doc.lieu}`, 20, 60);
      if (doc.delai) pdf.text(`Délai: ${doc.delai} jours`, 20, 70);
      if (doc.prix) pdf.text(`Prix: ${doc.prix.toLocaleString()} GNF`, 20, 80);
      else pdf.text(`Prix: Gratuit`, 20, 80);

      // Save file
      pdf.save(`${doc.titre}.pdf`);
    };

  // Carousel functionality (from App)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Document categories (unchanged)
  const categories = [
    { id: "all", label: "Tous les documents", count: documents.length },
    {
      id: "civil",
      label: "État civil",
      count: documents.filter((doc) =>
        ["Acte de naissance", "Acte de mariage", "Acte de décès"].includes(doc.typeDocument)
      ).length,
    },
    {
      id: "residence",
      label: "Résidence",
      count: documents.filter((doc) => doc.typeDocument === "Certificat de résidence").length,
    },
    {
      id: "business",
      label: "Commerce",
      count: documents.filter((doc) =>
        ["Licence commerciale", "Permis de construire"].includes(doc.typeDocument)
      ).length,
    },
    {
      id: "legal",
      label: "Juridique",
      count: documents.filter((doc) => doc.typeDocument === "Jugement supplétif").length,
    },
  ];

  // Filter documents based on search and category (unchanged)
  useEffect(() => {
    let filtered = documents;
    if (selectedCategory !== "all") {
      const categoryMap = {
        civil: ["Acte de naissance", "Acte de mariage", "Acte de décès"],
        residence: ["Certificat de résidence"],
        business: ["Licence commerciale", "Permis de construire"],
        legal: ["Jugement supplétif"],
      };
      filtered = filtered.filter((doc) => categoryMap[selectedCategory]?.includes(doc.typeDocument));
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDocuments(filtered);
  }, [searchTerm, selectedCategory, documents]);

  // Scroll to top functionality (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper function to get image URL (unchanged)
  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length)
      return "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto =compress&cs=tinysrgb&w=600";
    const image = imageArray[0];
    return image.url.startsWith("http") ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
  };

  // Helper function to get description text from blocks (unchanged)
  const getDescriptionText = (descriptionBlocks) => {
    if (!descriptionBlocks || !descriptionBlocks.length) return "Description non disponible";
    const firstBlock = descriptionBlocks[0];
    if (firstBlock.children && firstBlock.children.length > 0) {
      return firstBlock.children[0].text || "Description non disponible";
    }
    return "Description non disponible";
  };

  // Helper function to get biography text from blocks (unchanged)
  const getBiographyText = (biographyBlocks) => {
    if (!biographyBlocks || !biographyBlocks.length) return "Biographie non disponible";
    const firstBlock = biographyBlocks[0];
    if (firstBlock.children && firstBlock.children.length > 0) {
      return firstBlock.children[0].text || "Biographie non disponible";
    }
    return "Biographie non disponible";
  };

  // Helper function to get document type icon (unchanged)
  const getDocumentIcon = (type) => {
    const iconMap = {
      "Acte de naissance": <User className="h-6 w-6 text-blue-600" />,
      "Acte de mariage": <Users className="h-6 w-6 text-pink-600" />,
      "Acte de décès": <FileText className="h-6 w-6 text-gray-600" />,
      "Certificat de résidence": <MapPin className="h-6 w-6 text-orange-600" />,
      "Licence commerciale": <Building2 className="h-6 w-6 text-green-600" />,
      "Permis de construire": <Building2 className="h-6 w-6 text-yellow-600" />,
      "Jugement supplétif": <Shield className="h-6 w-6 text-purple-600" />,
    };
    return iconMap[type] || <FileText className="h-6 w-6 text-gray-500" />;
  };

  // Helper function to get official title badge color (unchanged)
  const getTitleColor = (titre) => {
    const colorMap = {
      maire: "bg-blue-600",
      adjoint: "bg-blue-600",
      conseiller: "bg-blue-600",
      prefet: "bg-blue-600",
      gouverneur: "bg-blue-600",
    };
    return colorMap[titre.toLowerCase()] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins] text-white">
      <NavBar />

      {/* Hero Section (adapted from App) */}
      <header className="relative h-[50vh] min-h-[500px] md:h-screen md:min-h-[700px] text-white overflow-hidden pt-20">
        <div className="absolute inset-0 w-full h-80%">
          {carouselImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="Administration background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl text-left">
            <div className="mb-8">
              
              <p className="text-xl md:text-2xl text-slate-200 leading-relaxed">
                Services administratifs modernes et efficaces pour tous vos besoins officiels.
              </p>
            </div>
            <div className="flex items-center text-slate-300 mb-12">
              <a href="/" className="hover:text-white transition-colors">
                Accueil
              </a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span className="font-semibold text-white">Administration</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-3 max-w-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center bg-white/90 rounded-xl px-4">
                  <Search className="text-gray-400 mr-3 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher une démarche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 text-lg placeholder-gray-500 py-3"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <Filter className="h-5 w-5" />
                  Filtres
                </button>
              </div>
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-white text-blue-700 shadow-lg"
                            : "bg-white/20 text-white hover:bg-white/40"
                        }`}
                      >
                        {category.label} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contact Info Bar (adapted from App) */}
      <section className="bg-white shadow-md border-t-4 border-blue-500 -mt-1 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center group hover:bg-blue-50 p-4 rounded-xl transition-all duration-300">
              <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Horaires d'ouverture</p>
                <p className="text-gray-600">Lun-Ven: 8h00-16h00</p>
              </div>
            </div>
            <div className="flex items-center group hover:bg-green-50 p-4 rounded-xl transition-all duration-300">
              <div className="bg-green-100 p-3 rounded-full mr-4 group-hover:bg-green-200 transition-colors">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Téléphone</p>
                <p className="text-gray-600">+224 12 345 6789</p>
              </div>
            </div>
            <div className="flex items-center group hover:bg-purple-50 p-4 rounded-xl transition-all duration-300">
              <div className="bg-purple-100 p-3 rounded-full mr-4 group-hover:bg-purple-200 transition-colors">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">admin@mamou.gov.gn</p>
              </div>
            </div>
            <div className="flex items-center group hover:bg-orange-50 p-4 rounded-xl transition-all duration-300">
              <div className="bg-orange-100 p-3 rounded-full mr-4 group-hover:bg-orange-200 transition-colors">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Adresse</p>
                <p className="text-gray-600">Centre-ville, Mamou</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        {/* Documents Section (adapted from App) */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Documents Administratifs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Obtenez facilement tous vos documents officiels avec nos services rapides et efficaces.
            </p>
          </div>

          {/* View Toggle and Results Count */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <span className="text-gray-700 font-medium text-lg mb-4 md:mb-0">
              {filteredDocuments.length} résultat{filteredDocuments.length > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === "grid" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === "list" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
              <FileText className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucun document trouvé</h3>
              <p className="text-gray-500 text-lg">Essayez d'ajuster vos filtres ou votre recherche.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`group bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl border border-gray-100 ${
                    viewMode === "list" && "flex items-center p-4"
                  }`}
                >
                  <div className={viewMode === "grid" ? "p-6" : "flex-1 ml-4"}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-slate-100 p-3 rounded-lg">{getDocumentIcon(doc.typeDocument)}</div>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {doc.typeDocument}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {doc.titre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{getDescriptionText(doc.description)}</p>
                    <div className="space-y-3 mb-4">
                      {doc.lieu && (
                        <div className="flex items-center text-gray-700">
                          <MapPin className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                          <span className="text-sm">{doc.lieu}</span>
                        </div>
                      )}
                      {doc.delai && (
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                          <span className="text-sm">Délai: {doc.delai} jours</span>
                        </div>
                      )}
                      {doc.prix && (
                        <div className="flex items-center text-gray-700">
                          <Star className="h-4 w-4 mr-3 text-yellow-500 flex-shrink-0" />
                          <span className="text-sm font-semibold text-green-600">
                            {doc.prix.toLocaleString()} GNF
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <span className="text-lg font-bold text-green-600">
                        {doc.prix ? `${doc.prix.toLocaleString()} GNF` : "Gratuit"}
                      </span>
                      <div className="flex gap-2">
                        {doc.formulaireTelecharger && (
                          <button
                            onClick={() => generatePDF(doc)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Télécharger
                          </button>

                        )}
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-all duration-300">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Officials Section (adapted from App) */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Les Élus et Responsables de Region
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rencontrez les personnes dévouées qui servent notre communauté avec passion et engagement.
            </p>
          </div>
          {officials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
              <Users className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Chargement des élus...</h3>
              <p className="text-gray-500 text-lg">Veuillez patienter pendant le chargement des informations</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {officials.map((official) => (
                <div key={official.id} className="group text-center flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      src={getImageUrl(official.image)}
                      alt={official.nom}
                      className="w-48 h-48 rounded-full object-cover shadow-md border-4 border-white group-hover:border-blue-300 transition-all duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600";
                      }}
                    />
                    <div
                      className={`absolute bottom-2 right-2 bg-gradient-to-r ${getTitleColor(
                        official.titre
                      )} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}
                    >
                      {official.titre?.toUpperCase()}
                    </div>
                  </div>
                  <h3 className="font-bold text-2xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {official.nom}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 px-4">
                    {getBiographyText(official.biographie)}
                  </p>
                  <div className="space-y-3 mb-6">
                    {official.telephone && (
                      <div className="flex items-center text-gray-700 group/item hover:text-green-600 transition-colors">
                        <div className="bg-green-100 p-1 rounded-full mr-3 group-hover/item:bg-green-200 transition-colors">
                          <Phone className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm">{official.telephone}</span>
                      </div>
                    )}
                    {official.email && (
                      <div className="flex items-center text-gray-700 group/item hover:text-blue-600 transition-colors">
                        <div className="bg-blue-100 p-1 rounded-full mr-3 group-hover/item:bg-blue-200 transition-colors">
                          <Mail className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="text-sm">{official.email}</span>
                      </div>
                    )}
                    {official.adresseBureau && (
                      <div className="flex items-center text-gray-700 group/item hover:text-blue-600 transition-colors">
                        <div className="bg-purple-100 p-1 rounded-full mr-3 group-hover/item:bg-purple-200 transition-colors">
                          <MapPin className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">{official.adresseBureau}</span>
                      </div>
                    )}
                    {official.dateDebut && (
                      <div className="flex items-center text-gray-700 group/item hover:text-orange-600 transition-colors">
                        <div className="bg-orange-100 p-1 rounded-full mr-3 group-hover/item:bg-orange-200 transition-colors">
                          <Calendar className="h-3 w-3 text-orange-600" />
                        </div>
                        <span className="text-sm">
                          Depuis {new Date(official.dateDebut).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-md transition-all duration-300 group-hover:scale-105">
                    Contacter
                  </button> */}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FAQ Section (styled to match App's card design) */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Questions <span className="bg-gradient-to-r from-yellow-600 to-yellow-600 bg-clip-text text-transparent">Fréquentes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Quels documents dois-je apporter pour un acte de naissance?",
                answer:
                  "Vous devez apporter une pièce d'identité valide, un certificat de résidence récent, et les informations complètes sur la personne concernée.",
              },
              {
                question: "Combien de temps faut-il pour obtenir un document?",
                answer:
                  "Les délais varient selon le type de document : 2-3 jours pour les certificats simples, 5-7 jours pour les actes d'état civil, et jusqu'à 15 jours pour les documents complexes.",
              },
              {
                question: "Puis-je faire une demande en ligne?",
                answer:
                  "Certaines démarches peuvent être initiées en ligne, mais la plupart nécessitent une visite en personne pour la vérification des documents et la signature.",
              },
              {
                question: "Quels sont les moyens de paiement acceptés?",
                answer:
                  "Nous acceptons les paiements en espèces, par chèque, et par mobile money (Orange Money, MTN Money). Les cartes bancaires seront bientôt disponibles.",
              },
              {
                question: "Comment contacter un élu spécifique?",
                answer:
                  "Vous pouvez prendre rendez-vous via notre secrétariat au +224 12 345 6789 ou envoyer un email à admin@mamou.gov.gn avec vos coordonnées.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-white hover:shadow-md hover:-translate-y-0 transition-all duration-300 rounded-2xl border border-gray-100 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Scroll to Top Button (from App) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 animate-bounce"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Administration;