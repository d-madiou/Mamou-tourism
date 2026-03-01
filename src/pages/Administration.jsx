"use client";
import { useState, useEffect } from "react";
import {
  Calendar, Clock, Download, FileText, Mail, MapPin, Phone,
  Search, User, Building2, Shield, Users, ChevronRight,
  Filter, Grid, List, Eye, ChevronDown, ChevronUp
} from "lucide-react";
import NavBar from "../components/NavBar";
import Image1 from "../assets/images/document.png";
import jsPDF from "jspdf";

const carouselImages = [
  Image1,
  "https://www.assembleeguinee.org/sites/default/files/post-gallery/galerie_mamou2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg/330px-%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg",
];

/* ─── Reusable styled label ─────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", justifyContent: "center" }}>
    <div style={{ height: "2px", flex: 1, maxWidth: "60px", background: "#2563eb" }} />
    <span style={{ color: "#2563eb", fontWeight: 700, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>
      {children}
    </span>
    <div style={{ height: "2px", flex: 1, maxWidth: "60px", background: "#2563eb" }} />
  </div>
);

/* ─── Official Card ─────────────────────────────────────── */
const OfficialCard = ({ official, getImageUrl, getBiographyText, compact = false }) => (
  <div
    className="official-card"
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 16px 40px rgba(37,99,235,0.12)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
    }}
  >
    {/* Top accent */}
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }} />

    {/* Avatar */}
    <div style={{ position: "relative", marginBottom: "16px" }}>
      <img
        src={getImageUrl(official.image)}
        alt={official.nom}
        style={{
          width: compact ? "80px" : "110px",
          height: compact ? "80px" : "110px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #eff6ff",
          display: "block",
        }}
        onError={e => { e.target.src = "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"; }}
      />
      <div style={{
        position: "absolute", bottom: "-4px", right: "-4px",
        background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
        color: "#fff", borderRadius: "999px",
        fontSize: "9px", fontWeight: 800, letterSpacing: "0.06em",
        padding: "3px 8px", textTransform: "uppercase",
        boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
        whiteSpace: "nowrap",
        fontFamily: "'Barlow Condensed', sans-serif",
      }}>
        {official.titre}
      </div>
    </div>

    <h3 style={{ fontWeight: 800, fontSize: compact ? "16px" : "18px", color: "#0f172a", marginBottom: "6px", textAlign: "center", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.01em" }}>
      {official.nom}
    </h3>
    {!compact && (
      <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center", marginBottom: "16px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {getBiographyText(official.biographie)}
      </p>
    )}

    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginTop: "auto" }}>
      {official.telephone && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
          <div style={{ background: "#dcfce7", borderRadius: "6px", padding: "4px", minWidth: "20px" }}><Phone size={11} style={{ color: "#16a34a" }} /></div>
          <span style={{ wordBreak: "break-all" }}>{official.telephone}</span>
        </div>
      )}
      {official.email && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
          <div style={{ background: "#dbeafe", borderRadius: "6px", padding: "4px", minWidth: "20px" }}><Mail size={11} style={{ color: "#2563eb" }} /></div>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{official.email}</span>
        </div>
      )}
      {official.adresseBureau && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
          <div style={{ background: "#fef3c7", borderRadius: "6px", padding: "4px", minWidth: "20px" }}><MapPin size={11} style={{ color: "#d97706" }} /></div>
          <span style={{ wordBreak: "break-word" }}>{official.adresseBureau}</span>
        </div>
      )}
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const Administration = ({ documents = [], officials = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null); // Added for FAQ toggle

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
    pdf.save(`${doc.titre}.pdf`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: "all", label: "Tous", count: documents.length },
    { id: "civil", label: "État civil", count: documents.filter(d => ["Acte de naissance","Acte de mariage","Acte de décès"].includes(d.typeDocument)).length },
    { id: "residence", label: "Résidence", count: documents.filter(d => d.typeDocument === "Certificat de résidence").length },
    { id: "business", label: "Commerce", count: documents.filter(d => ["Licence commerciale","Permis de construire"].includes(d.typeDocument)).length },
    { id: "legal", label: "Juridique", count: documents.filter(d => d.typeDocument === "Jugement supplétif").length },
  ];

  useEffect(() => {
    let filtered = documents;
    if (selectedCategory !== "all") {
      const categoryMap = {
        civil: ["Acte de naissance","Acte de mariage","Acte de décès"],
        residence: ["Certificat de résidence"],
        business: ["Licence commerciale","Permis de construire"],
        legal: ["Jugement supplétif"],
      };
      filtered = filtered.filter(doc => categoryMap[selectedCategory]?.includes(doc.typeDocument));
    }
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDocuments(filtered);
  }, [searchTerm, selectedCategory, documents]);

  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length)
      return "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600";
    const image = imageArray[0];
    return image.url.startsWith("http") ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
  };

  const getDescriptionText = (blocks) => {
    if (!blocks || !blocks.length) return "Description non disponible";
    const first = blocks[0];
    return first.children?.[0]?.text || first.text || "Description non disponible";
  };

  const getBiographyText = (blocks) => {
    if (!blocks || !blocks.length) return "Biographie non disponible";
    const first = blocks[0];
    return first.children?.[0]?.text || first.text || "Biographie non disponible";
  };

  const getDocumentIcon = (type) => {
    const map = {
      "Acte de naissance": <User className="h-5 w-5 text-blue-600" />,
      "Acte de mariage": <Users className="h-5 w-5 text-pink-500" />,
      "Acte de décès": <FileText className="h-5 w-5 text-slate-500" />,
      "Certificat de résidence": <MapPin className="h-5 w-5 text-orange-500" />,
      "Licence commerciale": <Building2 className="h-5 w-5 text-green-600" />,
      "Permis de construire": <Building2 className="h-5 w-5 text-yellow-600" />,
      "Jugement supplétif": <Shield className="h-5 w-5 text-blue-500" />,
    };
    return map[type] || <FileText className="h-5 w-5 text-slate-500" />;
  };

  // Split officials
  const leaderOfficials = officials.filter(o => o.titre?.toLowerCase() !== "conseiller");
  const conseillerOfficials = officials.filter(o => o.titre?.toLowerCase() === "conseiller");

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        
        /* --- Responsive CSS Classes --- */
        .responsive-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        
        .hero-section {
          min-height: 600px;
        }
        
        .hero-title {
          font-size: clamp(42px, 6vw, 72px);
        }

        .search-container-wrap {
          display: flex;
          gap: 10px;
          flex-wrap: nowrap;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 4px;
        }

        .doc-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .doc-grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .official-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #e8edf5;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 24px;
          position: relative;
        }

        /* --- Mobile Specific Overrides (Max-width: 768px) --- */
        @media (max-width: 768px) {
          .responsive-container {
            padding: 40px 16px;
          }
          
          .hero-section {
            min-height: auto;
            padding-top: 100px;
            padding-bottom: 60px;
          }

          .hero-title {
            font-size: 42px;
          }
          
          .search-container-wrap {
            flex-wrap: wrap;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .doc-grid-view {
            grid-template-columns: 1fr;
          }

          /* Force buttons to be full width on mobile */
          .full-width-mobile {
            width: 100%;
          }
          
          .official-card {
            padding: 24px 16px;
          }
        }
      `}</style>

      <NavBar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <header className="hero-section" style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: "80px" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {carouselImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="Administration background"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", transition: "opacity 1s ease",
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
        </div>
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,58,138,0.6) 60%, rgba(0,0,0,0.2) 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "13px", marginBottom: "24px" }}>
            <a href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Accueil</a>
            <ChevronRight size={14} />
            <span style={{ color: "#fff", fontWeight: 600 }}>Administration</span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <SectionLabel>Services Officiels</SectionLabel>
          </div>
          <h1 className="hero-title" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            color: "#fff", lineHeight: 1.05, marginBottom: "16px",
            letterSpacing: "-0.01em",
          }}>
            Administration<br />
            <span style={{ color: "#60a5fa" }}>Communale</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "18px", maxWidth: "520px", lineHeight: 1.7, marginBottom: "40px" }}>
            Services administratifs modernes et efficaces pour tous vos besoins officiels.
          </p>

          {/* Search bar */}
          <div style={{
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)",
            borderRadius: "16px", border: "1px solid rgba(255,255,255,0.15)",
            padding: "12px", maxWidth: "540px",
          }}>
            <div className="search-container-wrap">
              <div style={{ flex: 1, minWidth: "200px", display: "flex", alignItems: "center", background: "#fff", borderRadius: "10px", padding: "0 16px" }}>
                <Search size={16} style={{ color: "#94a3b8", marginRight: "10px", flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Rechercher une démarche..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ border: "none", outline: "none", background: "transparent", color: "#0f172a", fontSize: "15px", padding: "12px 0", width: "100%" }}
                />
              </div>
              <button
                className="full-width-mobile"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                  color: "#fff", border: "none", borderRadius: "10px",
                  padding: "12px 20px", fontWeight: 700, fontSize: "14px",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "all 0.2s",
                }}
              >
                <Filter size={15} />
                Filtres
              </button>
            </div>
            {showFilters && (
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        padding: "6px 14px", borderRadius: "999px", fontSize: "13px",
                        fontWeight: 600, cursor: "pointer", border: "none",
                        background: selectedCategory === cat.id ? "#fff" : "rgba(255,255,255,0.15)",
                        color: selectedCategory === cat.id ? "#1d4ed8" : "#fff",
                        transition: "all 0.2s",
                      }}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Contact Bar ─────────────────────────────────────────── */}
      <section style={{
        background: "#fff", borderTop: "4px solid #2563eb",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)", position: "relative", zIndex: 10,
      }}>
        <div className="contact-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
          {[
            { icon: Clock, label: "Horaires", value: "Lun-Ven: 8h-16h", bg: "#eff6ff", color: "#2563eb" },
            { icon: Phone, label: "Téléphone", value: "+224 12 345 6789", bg: "#f0fdf4", color: "#16a34a" },
            { icon: Mail, label: "Email", value: "admin@mamou.gov.gn", bg: "#fef9ec", color: "#d97706" },
            { icon: MapPin, label: "Adresse", value: "Centre-ville, Mamou", bg: "#fff7ed", color: "#ea580c" },
          ].map(({ icon: Icon, label, value, bg, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", borderRadius: "12px", transition: "background 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ background: bg, borderRadius: "10px", padding: "10px", flexShrink: 0 }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#0f172a", fontSize: "14px", marginBottom: "2px" }}>{label}</p>
                <p style={{ color: "#64748b", fontSize: "13px" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="responsive-container">

        {/* ── Documents ─────────────────────────────────────────── */}
        <section style={{ marginBottom: "96px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <SectionLabel>Démarches Administratives</SectionLabel>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Documents Officiels
            </h2>
            <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              Obtenez facilement tous vos documents officiels avec nos services rapides et efficaces.
            </p>
          </div>

          <div className="doc-controls" style={{ marginBottom: "28px" }}>
            <span style={{ color: "#475569", fontWeight: 600, fontSize: "15px" }}>
              {filteredDocuments.length} résultat{filteredDocuments.length > 1 ? "s" : ""}
            </span>
            <div style={{ display: "flex", background: "#f1f5f9", borderRadius: "10px", padding: "4px", gap: "2px" }}>
              {[{ mode: "grid", Icon: Grid }, { mode: "list", Icon: List }].map(({ mode, Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: "8px 12px", borderRadius: "7px", border: "none", cursor: "pointer",
                    background: viewMode === mode ? "#fff" : "transparent",
                    color: viewMode === mode ? "#2563eb" : "#94a3b8",
                    boxShadow: viewMode === mode ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 24px", background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
              <FileText size={64} style={{ color: "#cbd5e1", margin: "0 auto 20px" }} />
              <h3 style={{ fontWeight: 800, fontSize: "22px", color: "#475569", marginBottom: "8px" }}>Aucun document trouvé</h3>
              <p style={{ color: "#94a3b8", marginBottom: "24px" }}>Essayez d'ajuster vos filtres ou votre recherche.</p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "999px", padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'doc-grid-view' : ''} style={{
              display: viewMode === 'list' ? 'flex' : 'grid',
              flexDirection: 'column',
              gap: "20px",
            }}>
              {filteredDocuments.map(doc => (
                <div
                  key={doc.id}
                  className="doc-card"
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    border: "1px solid #e8edf5",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: viewMode === "list" ? "row" : "column",
                  }}
                >
                  {/* Color stripe */}
                  <div style={{ width: viewMode === "list" ? "5px" : "auto", height: viewMode === "list" ? "auto" : "5px", background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", flexShrink: 0 }} />

                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div style={{ background: "#eff6ff", borderRadius: "12px", padding: "10px" }}>
                        {getDocumentIcon(doc.typeDocument)}
                      </div>
                      <span style={{ background: "#f0f9ff", color: "#0284c7", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {doc.typeDocument}
                      </span>
                    </div>

                    <h3 style={{ fontWeight: 800, fontSize: "17px", color: "#0f172a", marginBottom: "6px", lineHeight: 1.3 }}>{doc.titre}</h3>
                    <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {getDescriptionText(doc.description)}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", marginTop: "auto" }}>
                      {doc.lieu && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
                          <MapPin size={13} style={{ color: "#3b82f6" }} />
                          <span>{doc.lieu}</span>
                        </div>
                      )}
                      {doc.delai && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "12px" }}>
                          <Clock size={13} style={{ color: "#16a34a" }} />
                          <span>Délai: {doc.delai} jours</span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "16px", flexWrap: "wrap", gap: "10px" }}>
                      <span style={{ fontWeight: 800, fontSize: "16px", color: doc.prix ? "#0f172a" : "#16a34a" }}>
                        {doc.prix ? `${doc.prix.toLocaleString()} GNF` : "Gratuit"}
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {doc.formulaireTelecharger && (
                          <button
                            onClick={() => generatePDF(doc)}
                            style={{
                              background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                              color: "#fff", border: "none", borderRadius: "10px",
                              padding: "8px 16px", fontWeight: 700, fontSize: "13px",
                              cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                              transition: "all 0.2s",
                            }}
                          >
                            <Download size={13} />
                            <span className="hidden sm:inline">Télécharger</span>
                          </button>
                        )}
                        <button style={{ background: "#f1f5f9", border: "none", borderRadius: "10px", padding: "8px 10px", cursor: "pointer", transition: "background 0.2s", color: "#475569" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"}
                          onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Officials ─────────────── */}
        {(leaderOfficials.length > 0 || conseillerOfficials.length > 0) && (
          <section style={{ marginBottom: "96px" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <SectionLabel>Gouvernance Locale</SectionLabel>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                Élus & Responsables
              </h2>
            </div>

            {leaderOfficials.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px", marginBottom: conseillerOfficials.length > 0 ? "72px" : "0" }}>
                {leaderOfficials.map(official => (
                  <OfficialCard key={official.id} official={official} getImageUrl={getImageUrl} getBiographyText={getBiographyText} />
                ))}
              </div>
            )}

            {conseillerOfficials.length > 0 && (
              <div>
                <div style={{
                  position: "relative", marginBottom: "48px",
                  display: "flex", alignItems: "center", gap: "20px", flexDirection: "column"
                }}>
                  <div style={{
                    background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
                    color: "#fff", borderRadius: "999px",
                    padding: "10px 28px", textAlign: "center",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: "15px", letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    Les Conseillers des Quartiers de Mamou
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "18px" }}>
                  {conseillerOfficials.map(official => (
                    <OfficialCard key={official.id} official={official} getImageUrl={getImageUrl} getBiographyText={getBiographyText} compact />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <SectionLabel>Aide & Support</SectionLabel>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Questions Fréquentes
            </h2>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              {
                q: "Quels documents dois-je apporter pour un acte de naissance?",
                a: "Vous devez apporter une pièce d'identité valide, un certificat de résidence récent, et les informations complètes sur la personne concernée.",
              },
              {
                q: "Combien de temps faut-il pour obtenir un document?",
                a: "Les délais varient selon le type de document : 2-3 jours pour les certificats simples, 5-7 jours pour les actes d'état civil.",
              },
              {
                q: "Puis-je faire une demande en ligne?",
                a: "Certaines démarches peuvent être initiées en ligne, mais la plupart nécessitent une visite en personne.",
              },
            ].map((faq, index) => (
              <div key={index} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", background: "#fff" }}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  style={{ width: "100%", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>{faq.q}</span>
                  {openFaqIndex === index ? <ChevronUp size={20} className="text-blue-600" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>
                {openFaqIndex === index && (
                  <div style={{ padding: "0 20px 20px", color: "#64748b", lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Administration;