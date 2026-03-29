"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Calendar, ChevronRight, ChevronLeft, Share2, Newspaper, ChevronUp, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NavBar from "../components/NavBar";
import { FaFutbol, FaMapPin, FaMoneyBill, FaRunning, FaTrophy, FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";
import { FaBasketball, FaVolleyball } from "react-icons/fa6";
import { toMediaUrl } from "../config/api";

/* ─── Share Popup Component ──────────────────────────────────────────── */
const SharePopup = ({ match, onClose }) => {
  const [copied, setCopied] = useState(false);
  const popupRef = useRef(null);

  // Build a shareable game URL
  const gameUrl = `${window.location.origin}/sport`;
  const shareText = `⚽ ${match.equipeDomicile} vs ${match.equipeVisiteuse} — ${match.dateMatch} | ${match.lieu}`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + gameUrl)}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}&quote=${encodeURIComponent(shareText)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(gameUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        ref={popupRef}
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: "20px",
          padding: "32px",
          width: "100%",
          maxWidth: "360px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          animation: "popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.85) translateY(10px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>Partager le match</p>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "18px", lineHeight: 1.3 }}>
            {match.equipeDomicile} <span style={{ color: "#0992c2" }}>vs</span> {match.equipeVisiteuse}
          </h3>
          <p style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>{match.dateMatch} · {match.lieu}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* WhatsApp */}
          <button
            onClick={shareWhatsApp}
            style={{
              display: "flex", alignItems: "center", gap: "14px",
              background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)",
              borderRadius: "12px", padding: "14px 18px", cursor: "pointer",
              color: "#25d366", fontWeight: 700, fontSize: "15px",
              transition: "all 0.2s", width: "100%",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,0.22)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(37,211,102,0.12)"}
          >
            <FaWhatsapp size={22} />
            Partager sur WhatsApp
          </button>

          {/* Facebook */}
          <button
            onClick={shareFacebook}
            style={{
              display: "flex", alignItems: "center", gap: "14px",
              background: "rgba(24,119,242,0.12)", border: "1px solid rgba(24,119,242,0.3)",
              borderRadius: "12px", padding: "14px 18px", cursor: "pointer",
              color: "#1877f2", fontWeight: 700, fontSize: "15px",
              transition: "all 0.2s", width: "100%",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(24,119,242,0.22)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(24,119,242,0.12)"}
          >
            <FaFacebook size={22} />
            Partager sur Facebook
          </button>

          {/* Copy Link */}
          <button
            onClick={copyLink}
            style={{
              display: "flex", alignItems: "center", gap: "14px",
              background: copied ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
              border: copied ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px", padding: "14px 18px", cursor: "pointer",
              color: copied ? "#818cf8" : "#94a3b8", fontWeight: 700, fontSize: "15px",
              transition: "all 0.2s", width: "100%",
            }}
          >
            <FaLink size={18} />
            {copied ? "Lien copié ✓" : "Copier le lien"}
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "20px", width: "100%", background: "transparent",
            border: "none", color: "#475569", fontSize: "14px",
            cursor: "pointer", padding: "8px",
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

/* ─── Match Card Component ───────────────────────────────────────────── */
const MatchCard = ({ match, getStatusBadgeStyle }) => {
  const [shareOpen, setShareOpen] = useState(false);
  
  // Normalize status for comparison (handles "En cours", "en_cours", "en cours")
  const statusLower = match.statut?.toLowerCase().replace(" ", "_") || "";
  const isLive = statusLower === "en_cours";
  const isScheduled = statusLower === "programme" || statusLower === "programmé";
  
  // Use the original status for display, or formatted
  const displayStatus = match.statut;

  return (
    <>
      {shareOpen && <SharePopup match={match} onClose={() => setShareOpen(false)} />}

      <div
        style={{
          background: "linear-gradient(145deg, #0f172a 0%, #1a2d4a 60%, #0f2340 100%)",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(59,130,246,0.15)",
          boxShadow: isLive
            ? "0 8px 32px rgba(239,68,68,0.15), 0 2px 8px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(0,0,0,0.3)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = isLive
            ? "0 20px 48px rgba(239,68,68,0.2), 0 4px 16px rgba(0,0,0,0.5)"
            : "0 20px 48px rgba(59,130,246,0.2), 0 4px 16px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = isLive
            ? "0 8px 32px rgba(239,68,68,0.15), 0 2px 8px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(0,0,0,0.3)";
        }}
      >
        {/* Top accent line */}
        <div style={{
          height: "3px",
          background: isLive
            ? "linear-gradient(90deg, #ef4444, #f97316)"
            : isScheduled
            ? "linear-gradient(90deg, #eab308, #f59e0b)"
            : "linear-gradient(90deg, #0992c2, #43bfd8)",
        }} />

        {/* Header row: date + status + share */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 18px 0",
        }}>
          <span style={{ color: "#64748b", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>
            {match.dateMatch}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              padding: "3px 10px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              ...getStatusBadgeStyle(match.statut),
              ...(isLive ? { animation: "pulse 1.5s infinite" } : {}),
            }}>
              {isLive && <span style={{ marginRight: "4px" }}>●</span>}
              {displayStatus}
            </span>
            <button
              onClick={() => setShareOpen(true)}
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: "8px",
                padding: "5px 8px",
                cursor: "pointer",
                color: "#60a5fa",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(59,130,246,0.25)";
                e.currentTarget.style.color = "#93c5fd";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                e.currentTarget.style.color = "#60a5fa";
              }}
              title="Partager ce match"
            >
              <Share2 size={13} />
            </button>
          </div>
        </div>

        {/* Teams & Score */}
        <div style={{ padding: "18px 18px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Home team */}
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(59,130,246,0.15)",
              border: "2px solid rgba(59,130,246,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 10px",
              fontSize: "20px",
            }}>
              🏠
            </div>
            <h3 style={{
              color: "#e2e8f0",
              fontWeight: 800,
              fontSize: "15px",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}>
              {match.equipeDomicile}
            </h3>
          </div>

          {/* Score / VS */}
          <div style={{
            flex: "0 0 auto",
            textAlign: "center",
            padding: "0 12px",
          }}>
            {isScheduled ? (
              <div style={{
                background: "rgba(234,179,8,0.1)",
                border: "2px solid rgba(234,179,8,0.3)",
                borderRadius: "12px",
                padding: "10px 16px",
              }}>
                <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: "22px", letterSpacing: "0.05em" }}>VS</span>
              </div>
            ) : (
              <div style={{
                background: "#fbbf24",
                border: "2px solid rgba(59,130,246,0.2)",
                borderRadius: "14px",
                padding: "8px 14px",
                minWidth: "90px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <span style={{ color: "#000", fontWeight: 900, fontSize: "32px", lineHeight: 1 }}>
                    {match.scoreDomicile}
                  </span>
                  <span style={{ color: "#475569", fontWeight: 700, fontSize: "20px", margin: "0 2px" }}>–</span>
                  <span style={{ color: "#000", fontWeight: 900, fontSize: "32px", lineHeight: 1 }}>
                    {match.scoreVisiteur}
                  </span>
                </div>
                {isLive && (
                  <div style={{ textAlign: "center", marginTop: "4px" }}>
                    <span style={{ color: "#ef4444", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}>EN DIRECT</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Away team */}
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(6,182,212,0.15)",
              border: "2px solid rgba(6,182,212,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 10px",
              fontSize: "20px",
            }}>
              ✈️
            </div>
            <h3 style={{
              color: "#e2e8f0",
              fontWeight: 800,
              fontSize: "15px",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}>
              {match.equipeVisiteuse}
            </h3>
          </div>
        </div>

        {/* Footer: venue + price */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.2)",
          padding: "10px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "12px", fontWeight: 600 }}>
            <FaMapPin size={11} style={{ color: "#0992c2" }} />
            <span style={{ color: "#94a3b8" }}>{match.lieu}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700 }}>
            <FaMoneyBill size={11} style={{ color: "#22c55e" }} />
            <span style={{ color: "#86efac" }}>{match.fraisEntree}</span>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Main Sport Component ───────────────────────────────────────────── */
const Sport = ({ matchs = [], news = [] }) => {
  const [activeTab, setActiveTab] = useState("Football");
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getCarouselImages = () => {
    const newsImages = news
      .filter(item => item.imageSport && item.imageSport.length > 0)
      .map(item => {
        const imageUrl = item.imageSport[0].url;
        return toMediaUrl(imageUrl);
      });
    if (newsImages.length > 0) return newsImages.slice(0, 3);
    return [
      "https://images.pexels.com/photos/164332/pexels-photo-164332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/313700/pexels-photo-313700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];
  };

  const carouselImages = getCarouselImages();

  useEffect(() => {
    if (carouselImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [carouselImages.length]);

  const navigateNews = (direction) => {
    if (news.length === 0) return;
    if (direction === "next") setActiveNewsIndex(prev => (prev === news.length - 1 ? 0 : prev + 1));
    else setActiveNewsIndex(prev => (prev === 0 ? news.length - 1 : prev - 1));
  };

  const activeNews = news[activeNewsIndex];

  const sportTypes = useMemo(() => {
    const uniqueSports = [...new Set(matchs.map(match => match.typeSport))];
    const sorted = uniqueSports.sort((a, b) => {
      const aIsFootball = a.toLowerCase() === "football";
      const bIsFootball = b.toLowerCase() === "football";
      if (aIsFootball) return -1;
      if (bIsFootball) return 1;
      return 0;
    });
    const sportIcons = {
      Football: FaFutbol, football: FaFutbol,
      Basketball: FaBasketball, basketball: FaBasketball,
      Volleyball: FaVolleyball, volleyball: FaVolleyball,
      "Athlétisme": FaRunning, "athlétisme": FaRunning,
    };
    return sorted.map(sport => ({ name: sport, icon: sportIcons[sport] || FaFutbol }));
  }, [matchs]);

  useEffect(() => {
    if (sportTypes.length > 0) {
      const footballType = sportTypes.find(s => s.name.toLowerCase() === "football");
      if (footballType) {
        setActiveTab(footballType.name);
      } else if (!sportTypes.find(s => s.name === activeTab)) {
        setActiveTab(sportTypes[0].name);
      }
    }
  }, [sportTypes, activeTab]);

  const filteredMatches = matchs.filter(match => match.typeSport === activeTab);

  const getStatusBadgeStyle = (status) => {
    // Normalize string to allow matching both "En cours" and "en_cours"
    const s = status?.toLowerCase().replace(" ", "_") || "";
    
    if (s === "terminé" || s === "terminer") {
       return { background: "rgba(100,116,139,0.15)", color: "#94a3b8", border: "1px solid rgba(100,116,139,0.3)" };
    }
    if (s === "en_cours") {
       return { background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.4)" };
    }
    if (s === "programme" || s === "programmé") {
       return { background: "rgba(234,179,8,0.12)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.35)" };
    }
    // Default
    return { background: "rgba(100,116,139,0.15)", color: "#94a3b8", border: "1px solid rgba(100,116,139,0.3)" };
  };

  const getTextFromBlock = (content) => {
    if (!content || !content.length) return "Contenu non disponible";
    return content[0]?.children?.[0]?.text || content[0]?.text || "Contenu non disponible";
  };

  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=400&width=600";
    const imageUrl = imageArray[0].url;
    return toMediaUrl(imageUrl);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gray-50 text-white font-[poppins]">
      <Helmet>
        <title>Sport à Mamou | Ville de Mamou</title>
        <meta
          name="description"
          content="Suivez les matchs, résultats et actualités sportives de Mamou avec les informations clés sur les équipes et événements locaux."
        />
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <NavBar />

      {/* Hero */}
      <header className="relative min-h-[400px] md:min-h-[600px] flex items-center text-white pt-20">
        <div className="absolute inset-0 bg-black overflow-hidden">
          {carouselImages.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt="Sports background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              onError={e => { e.target.src = "https://images.pexels.com/photos/164332/pexels-photo-164332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-blue-900/40 to-transparent" />
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <div className="flex items-center text-sm mb-4 text-gray-300">
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Accueil de Mamou</span>
              <ChevronRight className="mx-2 h-3 w-3" />
              <span className="font-semibold text-white">Sport</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Actualités et Matchs Sportifs à Mamou</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              Suivez les résultats, les actualités et les événements sportifs de votre ville.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-yellow-600 to-yellow-300 hover:from-yellow-700 hover:to-yellow-700 text-black rounded-full px-6 py-3 font-semibold flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
                <Calendar className="mr-2 h-5 w-5" />
                Calendrier des matchs
              </button>
              <button className="bg-white/10 hover:bg-white/20 flex items-center rounded-full font-medium transition-colors backdrop-blur-sm px-6 py-3">
                <Share2 className="mr-2 h-5 w-5" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Sport Tabs */}
        <section className="mb-16">
          {sportTypes.length > 0 ? (
            <div className="flex items-center border-b border-gray-200 overflow-x-auto pb-2 scrollbar-hide">
              {sportTypes.map(sport => (
                <button
                  key={sport.name}
                  className={`flex items-center px-5 py-3 rounded-full whitespace-nowrap mr-3 transition-all duration-300 text-base font-semibold ${
                    activeTab === sport.name
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(sport.name)}
                >
                  <sport.icon className="mr-2 h-5 w-5" />
                  {sport.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun sport disponible pour le moment.</p>
            </div>
          )}
        </section>

        {/* Match Cards */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 flex items-center">
            <FaTrophy className="mr-3 text-yellow-500" />
            Derniers Résultats
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm col-span-full">
                <FaTrophy className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucun match trouvé</h3>
                <p className="text-gray-500 text-lg">
                  {sportTypes.length === 0
                    ? "Aucun match disponible pour le moment."
                    : "Veuillez sélectionner un autre sport ou vérifier ultérieurement."}
                </p>
              </div>
            ) : (
              filteredMatches.map(match => (
                <MatchCard key={match.id} match={match} getStatusBadgeStyle={getStatusBadgeStyle} />
              ))
            )}
          </div>
        </section>

        {/* News Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 flex items-center">
            <Newspaper className="mr-3 text-blue-600" />
            Actualités Sportives
          </h2>
          <div className="relative">
            {news.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <Newspaper className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucune actualité trouvée</h3>
                <p className="text-gray-500 text-lg">Veuillez vérifier ultérieurement pour les dernières nouvelles.</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex items-center border border-gray-100">
                  <div className="md:w-1/2 lg:w-3/5">
                    <img
                      src={getImageUrl(activeNews?.imageSport)}
                      alt={activeNews?.titleSport || "Actualité sportive"}
                      className="w-full h-64 md:h-full object-cover"
                      onError={e => { e.target.src = "/placeholder.svg?height=400&width=600"; }}
                    />
                  </div>
                  <div className="p-6 md:p-8 md:w-1/2 lg:w-2/5">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                        {activeNews?.sportTitle || "Sport"}
                      </span>
                      <span className="text-gray-500 text-sm ml-4">{activeNews?.dateSport}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{activeNews?.titleSport}</h3>
                    <p className="text-gray-600 mb-6">{getTextFromBlock(activeNews?.contentSport)}</p>
                    
                    {/* Fixed nested button inside Link issue */}
                    <Link to={`/blog/sport/${activeNews?.id}`} className="inline-block">
                      <span className="font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center cursor-pointer">
                        Lire plus
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                    
                  </div>
                </div>
                {news.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateNews("prev")}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-700 hover:bg-white z-20"
                      aria-label="Article précédent"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => navigateNews("next")}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-gray-700 hover:bg-white z-20"
                      aria-label="Article suivant"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="flex justify-center mt-6">
                      {news.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveNewsIndex(index)}
                          className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
                            activeNewsIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`Aller à l'article ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Retourner en haut"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Sport;
