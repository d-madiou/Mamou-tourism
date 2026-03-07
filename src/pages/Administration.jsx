"use client";
import { useState, useEffect } from "react";
import {
  Calendar, Clock, Download, FileText, Mail, MapPin, Phone,
  Search, User, Building2, Shield, Users, ChevronRight,
  Filter, Grid, List, Eye,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Image1 from "../assets/images/document.png";
import jsPDF from "jspdf";

const carouselImages = [
  Image1,
  "https://www.assembleeguinee.org/sites/default/files/post-gallery/galerie_mamou2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg/330px-%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg",
];

/* ── Section Label ── */
const SectionLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", justifyContent: "center" }}>
    <div style={{ height: "2px", flex: 1, maxWidth: "60px", background: "#2563eb" }} />
    <span style={{ color: "#2563eb", fontWeight: 700, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>
      {children}
    </span>
    <div style={{ height: "2px", flex: 1, maxWidth: "60px", background: "#2563eb" }} />
  </div>
);

/* ── Group Banner ── */
const GroupBanner = ({ title, icon, accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px", flexWrap: "wrap" }}>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #cbd5e1)", minWidth: "20px" }} />
    <div
      className="group-banner-pill"
      style={{
        background: accent, color: "#fff",
        borderRadius: "14px", padding: "11px 28px",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800, fontSize: "14px", letterSpacing: "0.08em",
        textTransform: "uppercase", display: "flex", alignItems: "center",
        gap: "8px", boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "16px" }}>{icon}</span>
      {title}
    </div>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #cbd5e1, transparent)", minWidth: "20px" }} />
  </div>
);

/* ── Official Card ── */
const OfficialCard = ({ official, getImageUrl, getBiographyText, compact = false, accentColor = "#2563eb", basicOnly = false }) => (
  <div
    className="official-card"
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.06)"; }}
  >
    {/* Solid accent top bar */}
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: accentColor, borderRadius: "20px 20px 0 0" }} />

    {/* Avatar */}
    <div style={{ position: "relative", marginBottom: "18px" }}>
      <img
        src={getImageUrl(official.image)} alt={official.nom}
        style={{ width: compact ? "76px" : "106px", height: compact ? "76px" : "106px", borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", boxShadow: `0 0 0 3px ${accentColor}30`, display: "block" }}
        onError={e => { e.target.src = "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"; }}
      />
      {/* Badge: solid bg, white text */}
      <div style={{
        position: "absolute", bottom: "-6px", left: "50%", transform: "translateX(-50%)",
        background: accentColor, color: "#fff",
        borderRadius: "999px", fontSize: "9px", fontWeight: 800,
        letterSpacing: "0.08em", padding: "3px 10px",
        textTransform: "uppercase", whiteSpace: "nowrap",
        fontFamily: "'Barlow Condensed', sans-serif",
        border: "2px solid #fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}>
        {official.titre}
      </div>
    </div>

    <h3 style={{ fontWeight: 800, fontSize: compact ? "15px" : "17px", color: "#0f172a", marginBottom: compact ? "12px" : "8px", textAlign: "center", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.01em", marginTop: "8px" }}>
      {official.nom}
    </h3>

    {!basicOnly && !compact && official.biographie && (
      <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center", marginBottom: "16px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {getBiographyText(official.biographie)}
      </p>
    )}

    {/* Contact info — solid icon bg, white icon, dark label text */}
    {!basicOnly && (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginTop: "auto" }}>
        {official.telephone && (
          <div style={{ display: "flex", alignItems: "center", gap: "9px", color: "#1e293b", fontSize: "12px", fontWeight: 500 }}>
            <div style={{ background: "#16a34a", borderRadius: "7px", padding: "5px", flexShrink: 0, display: "flex" }}>
              <Phone size={10} style={{ color: "#fff" }} />
            </div>
            <span style={{ wordBreak: "break-all" }}>{official.telephone}</span>
          </div>
        )}
        {official.email && (
          <div style={{ display: "flex", alignItems: "center", gap: "9px", color: "#1e293b", fontSize: "12px", fontWeight: 500 }}>
            <div style={{ background: "#2563eb", borderRadius: "7px", padding: "5px", flexShrink: 0, display: "flex" }}>
              <Mail size={10} style={{ color: "#fff" }} />
            </div>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{official.email}</span>
          </div>
        )}
        {official.adresseBureau && (
          <div style={{ display: "flex", alignItems: "center", gap: "9px", color: "#1e293b", fontSize: "12px", fontWeight: 500 }}>
            <div style={{ background: "#d97706", borderRadius: "7px", padding: "5px", flexShrink: 0, display: "flex" }}>
              <MapPin size={10} style={{ color: "#fff" }} />
            </div>
            <span style={{ wordBreak: "break-word" }}>{official.adresseBureau}</span>
          </div>
        )}
        {official.dateDebut && (
          <div style={{ display: "flex", alignItems: "center", gap: "9px", color: "#1e293b", fontSize: "12px", fontWeight: 500 }}>
            <div style={{ background: "#0284c7", borderRadius: "7px", padding: "5px", flexShrink: 0, display: "flex" }}>
              <Calendar size={10} style={{ color: "#fff" }} />
            </div>
            <span>Depuis {new Date(official.dateDebut).toLocaleDateString("fr-FR")}</span>
          </div>
        )}
      </div>
    )}
  </div>
);

/* ── FAQ Item ── */
const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div style={{ background: "#fff", borderRadius: "14px", border: `1px solid ${isOpen ? "#bfdbfe" : "#e2e8f0"}`, overflow: "hidden", boxShadow: isOpen ? "0 4px 20px rgba(37,99,235,0.08)" : "none", transition: "all 0.2s" }}>
    <button onClick={onToggle} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ background: isOpen ? "#2563eb" : "#f1f5f9", borderRadius: "9px", padding: "8px", flexShrink: 0, display: "flex", transition: "background 0.2s" }}>
          <FileText size={13} style={{ color: isOpen ? "#fff" : "#94a3b8" }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: "14px", color: isOpen ? "#1d4ed8" : "#0f172a", transition: "color 0.2s" }}>{faq.q}</span>
      </div>
      <ChevronRight size={15} style={{ color: isOpen ? "#2563eb" : "#94a3b8", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
    </button>
    {isOpen && (
      <div style={{ padding: "0 20px 18px 56px", color: "#475569", fontSize: "14px", lineHeight: 1.75 }}>{faq.a}</div>
    )}
  </div>
);

/* ── Doc Card ── */
const DocCard = ({ doc, getDocumentIcon, getDescriptionText, generatePDF, listMode = false }) => (
  <div className="doc-card" style={{ background: "#fff", borderRadius: "18px", border: "1px solid #e8edf5", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", display: "flex", flexDirection: listMode ? "row" : "column" }}>
    <div style={{ width: listMode ? "5px" : "auto", height: listMode ? "auto" : "5px", background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", flexShrink: 0 }} />
    <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "8px" }}>
        <div style={{ background: "#eff6ff", borderRadius: "10px", padding: "9px", flexShrink: 0 }}>{getDocumentIcon(doc.typeDocument)}</div>
        {/* Badge: solid bg, white text */}
        <span style={{ background: "#0284c7", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          {doc.typeDocument}
        </span>
      </div>
      <h3 style={{ fontWeight: 800, fontSize: "16px", color: "#0f172a", marginBottom: "6px", lineHeight: 1.3 }}>{doc.titre}</h3>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "14px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>
        {getDescriptionText(doc.description)}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "16px" }}>
        {doc.lieu && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#1e293b", fontSize: "12px", fontWeight: 500 }}>
            {/* Solid icon */}
            <div style={{ background: "#2563eb", borderRadius: "5px", padding: "4px", display: "flex", flexShrink: 0 }}><MapPin size={10} style={{ color: "#fff" }} /></div>
            {doc.lieu}
          </div>
        )}
        {doc.delai && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#1e293b", fontSize: "12px", fontWeight: 500 }}>
            <div style={{ background: "#16a34a", borderRadius: "5px", padding: "4px", display: "flex", flexShrink: 0 }}><Clock size={10} style={{ color: "#fff" }} /></div>
            Délai: {doc.delai} jours
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px", flexWrap: "wrap", gap: "8px" }}>
        <span style={{ fontWeight: 800, fontSize: "15px", color: doc.prix ? "#0f172a" : "#16a34a" }}>
          {doc.prix ? `${doc.prix.toLocaleString()} GNF` : "Gratuit"}
        </span>
        <div style={{ display: "flex", gap: "7px" }}>
          {doc.formulaireTelecharger && (
            <button onClick={() => generatePDF(doc)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "9px", padding: "8px 14px", fontWeight: 700, fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"} onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}>
              <Download size={12} /> Télécharger
            </button>
          )}
          <button style={{ background: "#f1f5f9", border: "none", borderRadius: "9px", padding: "8px 10px", cursor: "pointer", color: "#475569", display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"} onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}>
            <Eye size={13} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ── Main ── */
const Administration = ({ documents = [], officials = [] }) => {
  const [searchTerm, setSearchTerm]               = useState("");
  const [selectedCategory, setSelectedCategory]   = useState("all");
  const [viewMode, setViewMode]                   = useState("grid");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [showFilters, setShowFilters]             = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex]           = useState(null);

  const generatePDF = (doc) => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(18); pdf.text(doc.titre, 20, 20);
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(12);
    pdf.text(`Type: ${doc.typeDocument}`, 20, 40);
    if (doc.description) pdf.text(`Description: ${doc.description}`, 20, 50);
    if (doc.lieu)  pdf.text(`Lieu: ${doc.lieu}`, 20, 60);
    if (doc.delai) pdf.text(`Délai: ${doc.delai} jours`, 20, 70);
    pdf.text(doc.prix ? `Prix: ${doc.prix.toLocaleString()} GNF` : "Prix: Gratuit", 20, 80);
    pdf.save(`${doc.titre}.pdf`);
  };

  useEffect(() => {
    const t = setInterval(() => setCurrentImageIndex(p => (p + 1) % carouselImages.length), 10000);
    return () => clearInterval(t);
  }, []);

  const categories = [
    { id: "all",       label: "Tous",       count: documents.length },
    { id: "civil",     label: "État civil", count: documents.filter(d => ["Acte de naissance","Acte de mariage","Acte de décès"].includes(d.typeDocument)).length },
    { id: "residence", label: "Résidence",  count: documents.filter(d => d.typeDocument === "Certificat de résidence").length },
    { id: "business",  label: "Commerce",   count: documents.filter(d => ["Licence commerciale","Permis de construire"].includes(d.typeDocument)).length },
    { id: "legal",     label: "Juridique",  count: documents.filter(d => d.typeDocument === "Jugement supplétif").length },
  ];

  useEffect(() => {
    const map = { civil: ["Acte de naissance","Acte de mariage","Acte de décès"], residence: ["Certificat de résidence"], business: ["Licence commerciale","Permis de construire"], legal: ["Jugement supplétif"] };
    let f = documents;
    if (selectedCategory !== "all") f = f.filter(d => map[selectedCategory]?.includes(d.typeDocument));
    if (searchTerm) f = f.filter(d => d.titre.toLowerCase().includes(searchTerm.toLowerCase()) || d.typeDocument.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredDocuments(f);
  }, [searchTerm, selectedCategory, documents]);

  const getImageUrl        = (arr) => { if (!arr?.length) return "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600"; const i = arr[0]; return i.url.startsWith("http") ? i.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${i.url}`; };
  const getDescriptionText = (b)   => { if (!b?.length) return "Description non disponible"; const f = b[0]; return f.children?.[0]?.text || f.text || "Description non disponible"; };
  const getBiographyText   = (b)   => { if (!b?.length) return "Biographie non disponible";  const f = b[0]; return f.children?.[0]?.text || f.text || "Biographie non disponible"; };
  const getDocumentIcon    = (type) => {
    const map = { "Acte de naissance": <User className="h-5 w-5 text-blue-600" />, "Acte de mariage": <Users className="h-5 w-5 text-pink-500" />, "Acte de décès": <FileText className="h-5 w-5 text-slate-500" />, "Certificat de résidence": <MapPin className="h-5 w-5 text-orange-500" />, "Licence commerciale": <Building2 className="h-5 w-5 text-green-600" />, "Permis de construire": <Building2 className="h-5 w-5 text-yellow-600" />, "Jugement supplétif": <Shield className="h-5 w-5 text-blue-500" /> };
    return map[type] || <FileText className="h-5 w-5 text-slate-500" />;
  };

  /* Official groups */
  const norm = (s) => s?.toLowerCase().trim() || "";
  const delegationTitleRank = (titre) => {
    const t = norm(titre);
    if (t === "président" || t === "president") return 0;
    if (t === "vice-président" || t === "vice-president") return 1;
    return 2;
  };

  const groups = [
    {
      key: "regional",
      filter: (o) => ["préfet","prefet","gouverneur", "président","president"].includes(norm(o.titre)),
      title: "Autorités Administratives",
      icon: "🏛",
      accent: "#0f172a",
      compact: false,
    },
    {
      key: "delegation",
      filter: (o) => ["président","president","délégué","delegue","vice-président","vice-president"].includes(norm(o.titre)),
      title: "Délégation Spéciale de la Commune Urbaine de Mamou",
      icon: "⚖️",
      accent: "#1d4ed8",
      compact: false,
    },
    {
      key: "quartier",
      filter: (o) => norm(o.titre).includes("président de quartier") || norm(o.titre).includes("president de quartier"),
      title: "Présidents de Quartier",
      icon: "🏘",
      accent: "#0891b2",
      compact: true,
    },
    {
      key: "conseiller",
      filter: (o) => norm(o.titre) === "conseiller",
      title: "Les Conseillers des Quartiers de Mamou",
      icon: "👥",
      accent: "#16a34a",
      compact: true,
    },
  ].map((g) => {
    const groupedOfficials = officials.filter(g.filter);

    if (g.key === "delegation") {
      // Always pin president/vice-president first, then keep original order for others.
      const withIndex = groupedOfficials.map((official, idx) => ({ official, idx }));
      withIndex.sort((a, b) => {
        const rankDiff = delegationTitleRank(a.official.titre) - delegationTitleRank(b.official.titre);
        if (rankDiff !== 0) return rankDiff;
        return a.idx - b.idx;
      });
      return { ...g, officials: withIndex.map((item) => item.official) };
    }

    return { ...g, officials: groupedOfficials };
  }).filter(g => g.officials.length > 0);

  const faqData = [
    { q: "Quels documents dois-je apporter pour un acte de naissance?", a: "Vous devez apporter une pièce d'identité valide, un certificat de résidence récent, et les informations complètes sur la personne concernée." },
    { q: "Combien de temps faut-il pour obtenir un document?", a: "Les délais varient : 2-3 jours pour les certificats simples, 5-7 jours pour les actes d'état civil, jusqu'à 15 jours pour les documents complexes." },
    { q: "Puis-je faire une demande en ligne?", a: "Certaines démarches peuvent être initiées en ligne, mais la plupart nécessitent une visite en personne pour la vérification et la signature." },
    { q: "Quels sont les moyens de paiement acceptés?", a: "Nous acceptons les paiements en espèces, par chèque, et par mobile money (Orange Money, MTN Money)." },
    { q: "Comment contacter un élu spécifique?", a: "Prenez rendez-vous via notre secrétariat au +224 12 345 6789 ou envoyez un email à admin@mamou.gov.gn." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Poppins', sans-serif" }}>
      <Helmet>
        <title>Administration | Ville de Mamou</title>
        <meta
          name="description"
          content="Accédez aux services administratifs de Mamou: documents officiels, démarches, élus, informations pratiques et contacts utiles."
        />
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .official-card {
          background: #fff; border-radius: 20px; border: 1px solid #e8edf5;
          box-shadow: 0 4px 18px rgba(0,0,0,0.06);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex; flex-direction: column; align-items: center;
          padding: 32px 20px 24px; position: relative; overflow: visible;
        }
        .doc-card { transition: transform 0.28s ease, box-shadow 0.28s ease; }
        .doc-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(37,99,235,0.1) !important; }

        /* Layout */
        .page-wrap  { max-width: 1200px; margin: 0 auto; padding: 72px 24px; }
        .contact-bar { max-width: 1200px; margin: 0 auto; padding: 20px 24px; display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; }
        .doc-grid   { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
        .off-lg     { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .off-sm     { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 18px; }
        .search-row { display: flex; gap: 10px; }

        @media (max-width: 900px) { .contact-bar { grid-template-columns: repeat(2,1fr); } }

        @media (max-width: 640px) {
          .page-wrap  { padding: 40px 16px; }
          .contact-bar { grid-template-columns: 1fr; padding: 16px; }
          .doc-grid   { grid-template-columns: 1fr; }
          .off-lg     { grid-template-columns: 1fr; }
          .off-sm     { grid-template-columns: repeat(2,1fr); }
          .search-row { flex-wrap: wrap; }
          .hero-title { font-size: 38px !important; }
          .group-banner-pill { font-size: 11px !important; padding: 9px 14px !important; letter-spacing: 0.04em !important; }
        }
        @media (max-width: 380px) { .off-sm { grid-template-columns: 1fr; } }
      `}</style>

      <NavBar />

      {/* Hero */}
      <header style={{ position: "relative", minHeight: "580px", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: "72px", paddingBottom: "48px" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {carouselImages.map((src, i) => (
            <img key={src} src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 1s ease", opacity: i === currentImageIndex ? 1 : 0 }} />
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.93) 0%, rgba(30,58,138,0.62) 60%, rgba(0,0,0,0.2) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 28px)" }} />
        <div style={{ position: "relative", zIndex: 5, maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "13px", marginBottom: "22px", flexWrap: "wrap" }}>
            <Link to="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Retour à l'accueil de Mamou</Link>
            <ChevronRight size={13} />
            <span style={{ color: "#fff", fontWeight: 600 }}>Administration</span>
          </div>
          <div style={{ marginBottom: "14px" }}><SectionLabel>Services Officiels</SectionLabel></div>
          <h1 className="hero-title" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(42px,7vw,74px)", color: "#fff", lineHeight: 1.05, marginBottom: "16px", letterSpacing: "-0.01em" }}>
            Administration<br /><span style={{ color: "#60a5fa" }}>Communale</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "17px", maxWidth: "500px", lineHeight: 1.7, marginBottom: "36px" }}>
            Services administratifs modernes et efficaces pour tous vos besoins officiels.
          </p>
          <div style={{ background: "rgba(255,255,255,0.09)", backdropFilter: "blur(16px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.15)", padding: "12px", maxWidth: "520px" }}>
            <div className="search-row">
              <div style={{ flex: 1, minWidth: "160px", display: "flex", alignItems: "center", background: "#fff", borderRadius: "10px", padding: "0 14px" }}>
                <Search size={15} style={{ color: "#94a3b8", marginRight: "9px", flexShrink: 0 }} />
                <input type="text" placeholder="Rechercher une démarche..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  style={{ border: "none", outline: "none", background: "transparent", color: "#0f172a", fontSize: "14px", padding: "12px 0", width: "100%", fontFamily: "'DM Sans',sans-serif" }} />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 18px", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px", whiteSpace: "nowrap" }}>
                <Filter size={14} /> Filtres
              </button>
            </div>
            {showFilters && (
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ padding: "6px 13px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, cursor: "pointer", border: "none", background: selectedCategory === cat.id ? "#fff" : "rgba(255,255,255,0.15)", color: selectedCategory === cat.id ? "#1d4ed8" : "#fff", transition: "all 0.18s" }}>
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "70px", background: "linear-gradient(to top, #f8fafc, transparent)" }} />
      </header>

      {/* Contact Bar */}
      <section style={{ background: "#fff", borderTop: "4px solid #2563eb", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", position: "relative", zIndex: 10 }}>
        <div className="contact-bar">
          {[
            { icon: Clock,  label: "Horaires",  value: "Lun-Ven: 8h-16h",    bg: "#2563eb" },
            { icon: Phone,  label: "Téléphone", value: "+224 12 345 6789",    bg: "#16a34a" },
            { icon: Mail,   label: "Email",     value: "admin@mamou.gov.gn",  bg: "#d97706" },
            { icon: MapPin, label: "Adresse",   value: "Centre-ville, Mamou", bg: "#ea580c" },
          ].map(({ icon: Icon, label, value, bg }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "13px", padding: "14px 16px", borderRadius: "12px", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Solid icon — 100% opacity bg, white icon */}
              <div style={{ background: bg, borderRadius: "10px", padding: "10px", flexShrink: 0, display: "flex" }}>
                <Icon size={18} style={{ color: "#fff" }} />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#0f172a", fontSize: "13px", marginBottom: "2px" }}>{label}</p>
                <p style={{ color: "#64748b", fontSize: "12px" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="page-wrap">

        
        

        {/* Officials */}
        {groups.length > 0 && (
          <section style={{ marginBottom: "88px" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <SectionLabel>Gouvernance Locale</SectionLabel>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(30px,5vw,50px)", color: "#0f172a", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                Élus & Responsables
              </h2>
              <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
                Rencontrez les personnes qui servent notre communauté.
              </p>
            </div>

            {groups.map((g, gi) => (
              <div key={g.key} style={{ marginBottom: gi < groups.length - 1 ? "64px" : 0 }}>
                <GroupBanner title={g.title} icon={g.icon} accent={g.accent} />
                <div className={g.compact ? "off-sm" : "off-lg"}>
                  {g.officials.map(o => (
                    <OfficialCard key={o.id} official={o} getImageUrl={getImageUrl} getBiographyText={getBiographyText} compact={g.compact} accentColor={g.accent} basicOnly={g.key === "delegation"} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        <section style={{ marginBottom: "88px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <SectionLabel>Démarches Administratives</SectionLabel>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(30px,5vw,50px)", color: "#0f172a", marginBottom: "10px", letterSpacing: "-0.01em" }}>
              Documents Officiels
            </h2>
            <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
              Obtenez facilement tous vos documents officiels avec nos services rapides.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ color: "#475569", fontWeight: 600, fontSize: "14px" }}>{filteredDocuments.length} résultat{filteredDocuments.length > 1 ? "s" : ""}</span>
            <div style={{ display: "flex", background: "#f1f5f9", borderRadius: "10px", padding: "4px", gap: "2px" }}>
              {[{ mode: "grid", Icon: Grid }, { mode: "list", Icon: List }].map(({ mode, Icon }) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: "7px 11px", borderRadius: "7px", border: "none", cursor: "pointer", background: viewMode === mode ? "#fff" : "transparent", color: viewMode === mode ? "#2563eb" : "#94a3b8", boxShadow: viewMode === mode ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "72px 24px", background: "#fff", borderRadius: "20px", border: "1px solid #e2e8f0" }}>
              <FileText size={56} style={{ color: "#cbd5e1", margin: "0 auto 16px", display: "block" }} />
              <h3 style={{ fontWeight: 800, fontSize: "20px", color: "#475569", marginBottom: "8px" }}>Aucun document trouvé</h3>
              <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Essayez d'ajuster vos filtres ou votre recherche.</p>
              <button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "999px", padding: "11px 26px", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}>
                Réinitialiser
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="doc-grid">
              {filteredDocuments.map(doc => <DocCard key={doc.id} doc={doc} getDocumentIcon={getDocumentIcon} getDescriptionText={getDescriptionText} generatePDF={generatePDF} />)}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {filteredDocuments.map(doc => <DocCard key={doc.id} doc={doc} getDocumentIcon={getDocumentIcon} getDescriptionText={getDescriptionText} generatePDF={generatePDF} listMode />)}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <SectionLabel>Aide & Support</SectionLabel>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(30px,5vw,50px)", color: "#0f172a", marginBottom: "10px", letterSpacing: "-0.01em" }}>
              Questions Fréquentes
            </h2>
          </div>
          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqData.map((faq, i) => (
              <FaqItem key={i} faq={faq} isOpen={openFaqIndex === i} onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Administration;
