"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, ChevronLeft, Share2, Newspaper, ChevronUp, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NavBar from "../components/NavBar";
import { FaFutbol, FaMapPin, FaMoneyBill, FaRunning, FaTrophy, FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";
import { FaBasketball, FaVolleyball } from "react-icons/fa6";
import { toMediaUrl } from "../config/api";

/* ─── Premium Easing ─────────────────────────────────────────────────── */
const easeOutExpo = [0.16, 1, 0.3, 1];

/* ─── Share Popup Component ──────────────────────────────────────────── */
const SharePopup = ({ match, onClose }) => {
  const [copied, setCopied] = useState(false);
  const popupRef = useRef(null);

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-950/65 p-4 backdrop-blur-md">
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-blue-950 p-8 shadow-2xl ring-1 ring-white/10"
      >
        <div className="mb-6 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">
            Partager l'événement
          </p>
          <h3 className="text-xl font-light tracking-tight text-white">
            {match.equipeDomicile} <span className="italic text-blue-300">&</span> {match.equipeVisiteuse}
          </h3>
          <p className="mt-2 text-xs text-blue-200/70">
            {match.dateMatch} · {match.lieu}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={shareWhatsApp}
            className="group flex w-full items-center gap-4 rounded-2xl bg-[#25D366]/10 px-5 py-3.5 text-sm font-medium text-[#25D366] transition-all hover:bg-[#25D366]/20"
          >
            <FaWhatsapp size={18} className="transition-transform group-hover:scale-110" />
            WhatsApp
          </button>

          <button
            onClick={shareFacebook}
            className="group flex w-full items-center gap-4 rounded-2xl bg-[#1877F2]/10 px-5 py-3.5 text-sm font-medium text-[#1877F2] transition-all hover:bg-[#1877F2]/20"
          >
            <FaFacebook size={18} className="transition-transform group-hover:scale-110" />
            Facebook
          </button>

          <button
            onClick={copyLink}
            className={`group flex w-full items-center gap-4 rounded-2xl px-5 py-3.5 text-sm font-medium transition-all ${
              copied
                ? "bg-blue-400/15 text-blue-200"
                : "bg-white/5 text-blue-100 hover:bg-white/10"
            }`}
          >
            <FaLink size={16} className={copied ? "" : "transition-transform group-hover:scale-110"} />
            {copied ? "Lien copié ✓" : "Copier le lien"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full text-xs font-medium uppercase tracking-wider text-blue-200/70 transition-colors hover:text-blue-100"
        >
          Fermer
        </button>
      </motion.div>
    </div>
  );
};

/* ─── Match Card Component ───────────────────────────────────────────── */
const MatchCard = ({ match, getStatusBadgeStyle }) => {
  const [shareOpen, setShareOpen] = useState(false);
  
  const statusLower = match.statut?.toLowerCase().replace(" ", "_") || "";
  const isLive = statusLower === "en_cours";
  const isScheduled = statusLower === "programme" || statusLower === "programmé";
  const displayStatus = match.statut;

  return (
    <>
      <AnimatePresence>
        {shareOpen && <SharePopup match={match} onClose={() => setShareOpen(false)} />}
      </AnimatePresence>

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-blue-100/70 ring-1 ring-blue-100 transition-shadow hover:shadow-xl hover:shadow-blue-200/80"
      >
        {/* Top Accent Line */}
        <div className={`h-1 w-full ${
          isLive ? "bg-gradient-to-r from-blue-700 to-blue-500"
          : isScheduled ? "bg-gradient-to-r from-blue-400 to-blue-300"
          : "bg-gradient-to-r from-blue-200 to-blue-100"
        }`} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
            {match.dateMatch}
          </span>
          <div className="flex items-center gap-3">
            <span 
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={getStatusBadgeStyle(match.statut)}
            >
              {isLive && <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />}
              {displayStatus}
            </span>
            <button
              onClick={() => setShareOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100 hover:text-blue-700"
              title="Partager ce match"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* Teams & Score */}
        <div className="flex flex-1 items-center justify-between px-6 py-6">
          <div className="flex flex-1 flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl shadow-sm ring-1 ring-blue-100/60">
              🏠
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-blue-900 line-clamp-2">
              {match.equipeDomicile}
            </h3>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center px-4">
            {isScheduled ? (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2">
                <span className="text-sm font-medium italic text-blue-500">vs</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 rounded-2xl bg-blue-900 px-5 py-2.5 shadow-md">
                  <span className="text-2xl font-light text-white">{match.scoreDomicile}</span>
                  <span className="text-blue-200/70">-</span>
                  <span className="text-2xl font-light text-white">{match.scoreVisiteur}</span>
                </div>
                {isLive && (
                  <span className="mt-2 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase">
                    En Direct
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl shadow-sm ring-1 ring-blue-100/60">
              ✈️
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-blue-900 line-clamp-2">
              {match.equipeVisiteuse}
            </h3>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-blue-100 bg-blue-50/70 px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-medium text-blue-700">
            <FaMapPin className="text-blue-500" />
            <span className="truncate max-w-[120px]">{match.lieu}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
            <FaMoneyBill className="text-blue-600" />
            <span>{match.fraisEntree}</span>
          </div>
        </div>
      </motion.div>
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
      .map(item => toMediaUrl(item.imageSport[0].url));
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
      }, 8000);
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
    const s = status?.toLowerCase().replace(" ", "_") || "";
    if (s === "terminé" || s === "terminer") {
       return { background: "var(--brand-50)", color: "var(--brand-700)", border: "1px solid var(--brand-200)" };
    }
    if (s === "en_cours") {
       return { background: "var(--brand-100)", color: "var(--brand-800)", border: "1px solid var(--brand-300)" };
    }
    if (s === "programme" || s === "programmé") {
       return { background: "var(--brand-50)", color: "var(--brand-600)", border: "1px solid var(--brand-200)" };
    }
    return { background: "var(--brand-50)", color: "var(--brand-700)", border: "1px solid var(--brand-200)" };
  };

  const getTextFromBlock = (content) => {
    if (!content || !content.length) return "Contenu non disponible";
    return content[0]?.children?.[0]?.text || content[0]?.text || "Contenu non disponible";
  };

  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=400&width=600";
    return toMediaUrl(imageArray[0].url);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-blue-50 font-sans text-blue-950" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Helmet>
        <title>Sport à Mamou | Ville de Mamou</title>
        <meta name="description" content="Suivez les matchs, résultats et actualités sportives de Mamou avec les informations clés sur les équipes et événements locaux." />
      </Helmet>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <NavBar />

      {/* Hero Section */}
      <header className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-blue-950">
          {carouselImages.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt="Sports background"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              onError={e => { e.target.src = "https://images.pexels.com/photos/164332/pexels-photo-164332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; }}
            />
          ))}
        </div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/35 via-blue-900/55 to-blue-950/90" />

        <div className="relative z-10 w-full max-w-7xl px-6 pb-20 pt-32 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            className="mx-auto flex max-w-3xl flex-col items-center"
          >
            <div className="mb-6 flex items-center space-x-2 text-xs font-semibold tracking-widest text-blue-100 uppercase">
              <HomeIcon className="h-3 w-3" />
              <span>Accueil</span>
              <ChevronRight className="h-3 w-3 text-blue-300/70" />
              <span className="text-blue-300">Sport</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Vivez l'Émotion <br /> <span className="italic text-yellow-300">Sportive</span> à Mamou
            </h1>
            
            <p className="mb-10 max-w-xl text-base font-normal leading-relaxed text-blue-100/85 md:text-lg">
              Suivez les résultats en direct, découvrez les actualités et ne manquez aucun événement de votre ville.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="group flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-yellow-600">
                <Calendar size={18} className="text-white" />
                Calendrier des matchs
              </button>
              <button className="group flex items-center gap-3 rounded-full border border-blue-100/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:border-blue-100/70">
                <Share2 size={18} className="text-blue-100 group-hover:text-white" />
                Partager
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-20">
        
        {/* Sport Tabs */}
        <section className="mb-16">
          {sportTypes.length > 0 ? (
            <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex space-x-2 rounded-full border border-blue-100 bg-white p-1.5 shadow-sm shadow-blue-100/60">
                {sportTypes.map(sport => (
                  <button
                    key={sport.name}
                    onClick={() => setActiveTab(sport.name)}
                    className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                      activeTab === sport.name
                        ? "bg-blue-900 text-white shadow-md"
                        : "text-blue-700 hover:bg-blue-50 hover:text-blue-900"
                    }`}
                  >
                    <sport.icon size={16} />
                    {sport.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-blue-700">Aucun sport disponible pour le moment.</div>
          )}
        </section>

        {/* Match Cards Grid */}
        <section className="mb-24">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-blue-950">
              Derniers <span className="italic text-blue-600">Résultats</span>
            </h2>
            <div className="h-px flex-1 bg-blue-100" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-[2rem] bg-white py-24 shadow-sm ring-1 ring-blue-100">
                <FaTrophy className="mb-6 text-4xl text-blue-200" />
                <h3 className="mb-2 text-xl font-medium text-blue-900">Aucun match trouvé</h3>
                <p className="text-sm text-blue-700">
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
          <div className="mb-10 flex items-center gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-blue-950">
              Actualités <span className="italic text-blue-600">Sportives</span>
            </h2>
            <div className="h-px flex-1 bg-blue-100" />
          </div>

          <div className="relative">
            {news.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-[2rem] bg-white py-24 shadow-sm ring-1 ring-blue-100">
                <Newspaper className="mb-6 h-10 w-10 text-blue-200" />
                <h3 className="mb-2 text-xl font-medium text-blue-900">Aucune actualité trouvée</h3>
                <p className="text-sm text-blue-700">Veuillez vérifier ultérieurement pour les dernières nouvelles.</p>
              </div>
            ) : (
              <div className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-blue-100/70 ring-1 ring-blue-100 md:flex md:h-[450px]">
                
                {/* Image Side */}
                <div className="relative md:w-1/2 lg:w-3/5">
                  <img
                    src={getImageUrl(activeNews?.imageSport)}
                    alt={activeNews?.titleSport || "Actualité sportive"}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-full"
                    onError={e => { e.target.src = "/placeholder.svg?height=400&width=600"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 md:hidden" />
                </div>

                {/* Content Side */}
                <div className="relative flex flex-col justify-center p-8 md:w-1/2 md:p-12 lg:w-2/5">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700">
                      {activeNews?.sportTitle || "Sport"}
                    </span>
                    <span className="text-xs font-medium text-blue-500">{activeNews?.dateSport}</span>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-semibold leading-snug tracking-tight text-blue-950 md:text-3xl">
                    {activeNews?.titleSport}
                  </h3>
                  
                  <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-blue-700 md:text-base">
                    {getTextFromBlock(activeNews?.contentSport)}
                  </p>
                  
                  {/* Fixed nested button inside Link structural issue */}
                  <Link 
                    to={`/blog/sport/${activeNews?.id}`} 
                    className="inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-blue-900 transition-colors hover:text-blue-600"
                  >
                    Lire l'article
                    <ChevronRight size={16} />
                  </Link>
                </div>

                {/* Slider Controls */}
                {news.length > 1 && (
                  <div className="absolute bottom-6 right-6 flex items-center gap-2 md:bottom-8 md:right-8">
                    <button
                      onClick={() => navigateNews("prev")}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-md ring-1 ring-blue-100 transition-transform hover:scale-105"
                      aria-label="Article précédent"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => navigateNews("next")}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white shadow-md transition-transform hover:scale-105"
                      aria-label="Article suivant"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Pagination Dots */}
            {news.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveNewsIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeNewsIndex === index ? "w-6 bg-blue-900" : "w-1.5 bg-blue-200 hover:bg-blue-400"
                    }`}
                    aria-label={`Aller à l'article ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Elegant Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-white shadow-xl shadow-blue-900/20 transition-transform hover:scale-110 focus:outline-none"
            aria-label="Retourner en haut"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sport;
