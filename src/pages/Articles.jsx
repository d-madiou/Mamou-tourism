"use client";

import {
  AlertCircle,
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
  MapPin,
  Filter,
  Grid,
  List,
  ChevronRight,
  HomeIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import ImageMamou from "../assets/images/MamouHero2.jpg";
import NavBar from "../components/NavBar";
import { toMediaUrl } from "../config/api";

/* ─── Premium Easing ─────────────────────────────────────────────────── */
const easeOutExpo = [0.16, 1, 0.3, 1];

export default function Articles({ data = [], loading = false, error = null }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["Tous", "actualites", "politique", "economie", "social", "culture", "sport", "sante"];

  /* ── Helpers (Unchanged Logic) ───────────────────────────────────────── */
  const getImageUrl = (image) => {
    if (!image) return "/placeholder.svg?height=400&width=800";
    if (Array.isArray(image) && image.length > 0) {
      const first = image[0];
      return first?.url ? toMediaUrl(first.url) : "/placeholder.svg?height=400&width=800";
    }
    if (image?.url) return toMediaUrl(image.url);
    return "/placeholder.svg?height=400&width=800";
  };

  const getTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "Description non disponible";
    let text = "";
    blocks.forEach(block => {
      if (block.type === "image") return;
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach(child => {
          if (child.type === "link") {
            child.children?.forEach(lc => { if (lc.text) text += lc.text + " "; });
          } else if (child.text) {
            text += child.text + " ";
          }
        });
      }
    });
    return text.trim() || "Description non disponible";
  };

  const sortedData = [...data].sort((a, b) => {
    const dA = new Date(a.datePublication || a.createdAt || 0);
    const dB = new Date(b.datePublication || b.createdAt || 0);
    return dB - dA;
  });

  const filteredData = sortedData.filter(item => {
    const matchesSearch = item.Titre?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || item.categorie === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  }) : "Date inconnue";

  /* ── States ──────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="flex max-w-md flex-col items-center rounded-[2rem] bg-white p-12 text-center shadow-xl shadow-blue-100/70 ring-1 ring-blue-100">
          <motion.div animate={{ rotateY: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <BookOpen size={48} className="mb-6 text-blue-600" />
          </motion.div>
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-blue-950">Chargement...</h2>
          <p className="text-sm text-blue-700">Récupération des articles en cours.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="flex max-w-md flex-col items-center rounded-[2rem] bg-white p-12 text-center shadow-xl shadow-blue-100/70 ring-1 ring-blue-100">
          <AlertCircle size={48} className="mb-6 text-blue-600" />
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-blue-950">Erreur de chargement</h2>
          <p className="mb-8 text-sm text-blue-700">Veuillez réessayer plus tard ou contacter l'administrateur du site.</p>
          <button 
            onClick={() => window.location.reload()}
            className="rounded-full bg-blue-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  /* ── Main Render ─────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-blue-50 font-sans text-blue-950" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Helmet>
        <title>Articles et Actualités | Ville de Mamou</title>
        <meta name="description" content="Consultez les articles et actualités de Mamou: informations municipales, initiatives locales, culture, sport et vie citoyenne." />
      </Helmet>

      {/* ════ HERO ════ */}
      <header className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-50">
          <NavBar />
        </div>
        
        <div className="absolute inset-0 bg-blue-950">
          <img 
            src={ImageMamou} 
            alt="Mamou" 
            className="h-full w-full object-cover opacity-80 mix-blend-overlay transition-transform duration-[20s] ease-out hover:scale-105" 
          />
        </div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/35 via-blue-900/55 to-blue-950/90" />

        <div className="relative z-10 w-full max-w-7xl px-6 pb-24 pt-32 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            className="mx-auto flex max-w-3xl flex-col items-center"
          >
            <div className="mb-6 flex items-center space-x-2 text-xs font-semibold tracking-widest text-blue-100 uppercase">
              <HomeIcon className="h-3 w-3" />
              <span>Ville de Mamou</span>
              <ChevronRight className="h-3 w-3 text-blue-300/70" />
              <span className="text-blue-300">Actualités</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Articles &amp; <span className="italic text-blue-300">Actualités</span>
            </h1>
            
            <p className="max-w-xl text-base font-normal leading-relaxed text-blue-100/85 md:text-lg">
              Restez informés des dernières nouvelles, événements et initiatives de notre ville.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ════ SEARCH PANEL ════ */}
      <div className="relative z-20 mx-auto -mt-12 max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
          className="rounded-[2rem] bg-white p-6 shadow-xl shadow-blue-100/70 ring-1 ring-blue-100 md:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search Input */}
            <div className="group flex flex-1 items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3.5 transition-colors focus-within:border-blue-400 focus-within:bg-white">
              <Search size={18} className="text-blue-400 group-focus-within:text-blue-600" />
              <input
                type="text"
                placeholder="Rechercher des articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-blue-950 outline-none placeholder:text-blue-400"
              />
            </div>
            
            {/* View Toggles */}
            <div className="flex shrink-0 items-center overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-1">
              {[{ mode: "grid", Icon: Grid }, { mode: "list", Icon: List }].map(({ mode, Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex h-10 w-12 items-center justify-center rounded-xl transition-all ${
                    viewMode === mode 
                      ? "bg-blue-900 text-white shadow-md" 
                      : "text-blue-500 hover:text-blue-800"
                  }`}
                  aria-label={`Vue en ${mode}`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={14} className="mr-2 hidden text-blue-400 md:block" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200/70"
                    : "bg-transparent text-blue-700 hover:bg-blue-50 hover:text-blue-900"
                }`}
              >
                {cat === "Tous" ? "Tous" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ════ MAIN ARTICLES SECTION ════ */}
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Presse & Information</p>
            <h2 className="text-3xl font-semibold tracking-tight text-blue-950 md:text-4xl">
              Tous les <span className="italic text-blue-600">Articles</span>
            </h2>
          </div>
          <p className="mt-4 text-sm font-medium text-blue-500 md:mt-0">
            {filteredData.length} article{filteredData.length !== 1 ? "s" : ""} trouvé{filteredData.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-blue-100 bg-white py-24 shadow-sm">
            <Search size={48} className="mb-6 text-blue-200" />
            <h3 className="mb-2 text-xl font-medium text-blue-900">Aucun article trouvé</h3>
            <p className="mb-6 text-sm text-blue-700">Aucun article ne correspond à votre recherche. Essayez d'autres termes.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("Tous"); }}
              className="rounded-full bg-blue-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className={viewMode === "grid" ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-6"}
            >
              {filteredData.map((item, idx) => (
                <Link 
                  key={item.id || idx} 
                  to={`/blog/article/${item.id}`} 
                  className={`group relative flex overflow-hidden rounded-[2rem] bg-white shadow-md shadow-blue-100/70 ring-1 ring-blue-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/80 hover:ring-blue-200 ${
                    viewMode === "grid" ? "flex-col" : "flex-col sm:flex-row sm:h-[220px]"
                  }`}
                >
                  {/* Image Container */}
                  <div className={`relative shrink-0 overflow-hidden bg-blue-100 ${viewMode === "grid" ? "h-56 w-full" : "h-56 w-full sm:h-full sm:w-72"}`}>
                    <img
                      src={getImageUrl(item?.Image)}
                      alt={item.Titre}
                      onError={e => { e.target.src = "/placeholder.svg?height=400&width=800"; }}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/45 via-blue-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <span className="absolute bottom-4 left-4 rounded-full bg-blue-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                      {item.categorie || "ARTICLE"}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium text-blue-500">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(item.datePublication)}</span>
                      {item.auteur && <span className="flex items-center gap-1.5"><User size={14} /> {item.auteur}</span>}
                    </div>
                    
                    <h3 className="mb-3 text-xl font-semibold leading-snug text-blue-950 transition-colors group-hover:text-blue-600 line-clamp-2">
                      {item.Titre || `Article ${idx + 1}`}
                    </h3>
                    
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-blue-700 line-clamp-2">
                      {getTextFromBlocks(item.description)}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-blue-100 pt-4">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-blue-500">
                        <MapPin size={14} /> {item.localisation || "Mamou"}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition-transform group-hover:translate-x-1">
                        Lire plus <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* ════ RECENT STRIP ════ */}
      {filteredData.length > 0 && (
        <section className="relative overflow-hidden bg-blue-950 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Dernières publications</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Articles <span className="italic text-blue-300">Récents</span>
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {filteredData.slice(0, 3).map((item, idx) => (
                <Link 
                  key={item.id || idx} 
                  to={`/blog/article/${item.id}`} 
                  className="group flex flex-col overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-blue-300/50"
                >
                  <div className="relative h-48 shrink-0 overflow-hidden bg-blue-900/30">
                    <img
                      src={getImageUrl(item?.Image)}
                      alt={item.Titre}
                      onError={e => { e.target.src = "/placeholder.svg?height=400&width=800"; }}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-blue-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-950">
                      Nouveau
                    </span>
                  </div>
                  
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs font-medium text-blue-200">
                      <Calendar size={14} /> {formatDate(item.datePublication)}
                    </div>
                    <h3 className="mb-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-blue-300 line-clamp-2">
                      {item.Titre || `Article récent ${idx + 1}`}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-blue-100/75 line-clamp-2">
                      {getTextFromBlocks(item.description)}
                    </p>
                    <span className="mt-auto w-fit border-b border-blue-300/30 pb-1 text-[10px] font-bold uppercase tracking-widest text-blue-300 transition-colors group-hover:border-blue-300">
                      Lire l'article
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
