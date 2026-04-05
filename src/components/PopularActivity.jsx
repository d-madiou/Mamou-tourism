"use client"

import { useEffect, useState } from "react"
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa"
import { FaLightbulb } from "react-icons/fa6"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

/* ─────────────────────────────────────────────────
   DESIGN SYSTEM — Activities Edition
   Font: Poppins (as required) — display + body
   Tone: warm editorial, destination-guide energy,
         aspirational and culturally rich
───────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,600&display=swap');

  :root {
    --ac-navy:       #0c1b33;
    --ac-cobalt:     #1d4ed8;
    --ac-gold:       #c9a84c;
    --ac-gold-pale:  #fdf6e3;
    --ac-gold-dim:   rgba(201,168,76,0.14);
    --ac-surface:    #f5f7fa;
    --ac-surface-2:  #eef1f6;
    --ac-white:      #ffffff;
    --ac-ink:        #0c1b33;
    --ac-ink-mid:    #3d5068;
    --ac-ink-light:  #7a90ab;
    --ac-border:     #dde3ed;

    /* Type palette — one accent per category */
    --ac-agri:   #15803d;
    --ac-tour:   #1d4ed8;
    --ac-cult:   #7c3aed;
    --ac-natu:   #0f766e;
    --ac-spor:   #c2410c;
    --ac-deflt:  #1a3057;
  }

  /* ── Root ───────────────────────────────────── */
  .ac-root {
    font-family: 'Poppins', system-ui, sans-serif;
    color: var(--ac-ink);
    background: var(--ac-surface);
    padding: clamp(72px, 10vw, 120px) max(5vw, 24px);
  }
  .ac-root * { box-sizing: border-box; }

  /* ── Section header ─────────────────────────── */
  .ac-header { text-align: center; margin-bottom: clamp(48px, 7vw, 72px); }

  .ac-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--ac-gold); margin-bottom: 14px;
  }
  .ac-eyebrow::before, .ac-eyebrow::after { content:''; width:24px; height:1px; background:currentColor; }

  .ac-title {
    font-family: 'Poppins', system-ui, sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700; line-height: 1.15; color: var(--ac-ink);
    margin-bottom: 14px;
  }
  .ac-title .accent { color: var(--ac-gold); font-weight: 300; font-style: italic; }

  .ac-sub {
    font-size: 14px; line-height: 1.8; color: var(--ac-ink-mid);
    max-width: 520px; margin: 0 auto;
  }

  /* ── Grid ───────────────────────────────────── */
  .ac-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px; margin: 0 auto;
  }

  /* ── Activity Card ──────────────────────────── */
  .ac-card {
    background: var(--ac-white);
    border: 1px solid var(--ac-border);
    overflow: hidden; display: flex; flex-direction: column;
    transition: box-shadow 0.26s, transform 0.26s;
    text-decoration: none; color: inherit;
  }
  .ac-card:hover { box-shadow: 0 18px 52px rgba(12,27,51,0.13); transform: translateY(-3px); }

  /* Image wrap */
  .ac-card-img {
    position: relative; height: 220px; overflow: hidden; flex-shrink: 0;
  }
  .ac-card-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.65s ease;
    display: block;
  }
  .ac-card:hover .ac-card-img img { transform: scale(1.04); }

  /* Gradient on image bottom */
  .ac-card-img-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(12,27,51,0.55) 0%, transparent 55%);
    pointer-events: none;
  }

  /* Type badge — flat, positioned over image */
  .ac-type-badge {
    position: absolute; top: 14px; left: 14px;
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #fff; padding: 4px 11px;
  }

  /* Top accent bar (inside card, under image) */
  .ac-card-bar { height: 2px; flex-shrink: 0; }

  /* Card body */
  .ac-card-body { padding: 20px 22px; flex: 1; display: flex; flex-direction: column; }

  .ac-card-title {
    font-size: 15px; font-weight: 700; line-height: 1.35;
    color: var(--ac-ink); margin-bottom: 10px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }

  .ac-card-meta {
    display: flex; flex-wrap: wrap; gap: 12px;
    margin-bottom: 12px;
  }
  .ac-card-meta-item {
    display: flex; align-items: center; gap: 5px;
    font-size: 11px; color: var(--ac-ink-light); font-weight: 500;
  }
  .ac-card-meta-item svg { flex-shrink: 0; }

  .ac-card-desc {
    font-size: 13px; line-height: 1.75; color: var(--ac-ink-mid);
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden; flex: 1; margin-bottom: 18px;
  }

  .ac-card-footer {
    border-top: 1px solid var(--ac-border); padding-top: 14px;
    margin-top: auto; display: flex; align-items: center; justify-content: space-between;
  }
  .ac-read-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ac-gold); text-decoration: none;
    border-bottom: 1px solid rgba(201,168,76,0.3);
    padding-bottom: 1px;
    transition: border-color 0.2s, gap 0.2s;
  }
  .ac-card:hover .ac-read-link { border-color: var(--ac-gold); gap: 10px; }

  /* ── Rule ───────────────────────────────────── */
  .ac-rule { border:none; border-top: 1px solid var(--ac-border); margin: clamp(56px, 8vw, 88px) 0; max-width: 1200px; margin-left: auto; margin-right: auto; }

  /* ── Featured Carousel ──────────────────────── */
  .ac-featured-header { text-align: center; margin-bottom: 36px; }
  .ac-featured-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ac-gold); margin-bottom: 12px;
  }
  .ac-featured-label::before, .ac-featured-label::after { content:''; width:18px; height:1px; background:currentColor; }
  .ac-featured-title {
    font-size: clamp(1.3rem, 2.8vw, 1.9rem); font-weight: 700;
    color: var(--ac-ink); line-height: 1.2;
  }
  .ac-featured-title .accent { color: var(--ac-gold); font-weight: 300; font-style: italic; }

  /* ── Featured Card ──────────────────────────── */
  .ac-featured-wrap { max-width: 1000px; margin: 0 auto; position: relative; }

  .ac-featured-card {
    display: grid; grid-template-columns: 1fr 1fr;
    border: 1px solid var(--ac-border);
    overflow: hidden; background: var(--ac-white);
  }
  @media (max-width: 700px) { .ac-featured-card { grid-template-columns: 1fr; } }

  .ac-featured-img { position: relative; min-height: 300px; overflow: hidden; }
  .ac-featured-img img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.7s ease;
  }
  .ac-featured-card:hover .ac-featured-img img { transform: scale(1.03); }
  .ac-featured-img-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to right, transparent 60%, var(--ac-white));
    pointer-events: none;
  }

  /* Number indicator on featured image */
  .ac-featured-counter {
    position: absolute; bottom: 16px; left: 16px;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
    color: #fff; background: rgba(12,27,51,0.65);
    backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15);
    padding: 6px 12px;
  }

  .ac-featured-body {
    padding: clamp(24px, 4vw, 44px);
    display: flex; flex-direction: column; justify-content: center;
  }

  .ac-featured-type {
    display: inline-flex; padding: 3px 12px; align-self: flex-start;
    font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #fff; margin-bottom: 16px;
  }

  .ac-featured-name {
    font-size: clamp(1.1rem, 2.2vw, 1.5rem); font-weight: 700; line-height: 1.25;
    color: var(--ac-ink); margin-bottom: 12px;
  }
  .ac-featured-desc {
    font-size: 13px; line-height: 1.8; color: var(--ac-ink-mid);
    display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 18px; flex: 1;
  }
  .ac-featured-meta {
    display: flex; gap: 16px; flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .ac-featured-meta-item {
    display: flex; align-items: center; gap: 5px;
    font-size: 11px; color: var(--ac-ink-light); font-weight: 500;
  }

  .ac-featured-cta {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--ac-navy); color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 12px 22px; text-decoration: none;
    transition: background 0.22s; align-self: flex-start;
  }
  .ac-featured-cta:hover { background: var(--ac-cobalt); }

  /* ── Featured nav arrows ─────────────────────── */
  .ac-nav-btn {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px;
    background: var(--ac-white); border: 1px solid var(--ac-border);
    color: var(--ac-ink-mid); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    z-index: 20; transition: background 0.18s, color 0.18s, border-color 0.18s;
    box-shadow: 0 4px 16px rgba(12,27,51,0.08);
  }
  .ac-nav-btn:hover { background: var(--ac-navy); border-color: var(--ac-navy); color: #fff; }
  .ac-nav-btn.prev { left: -20px; }
  .ac-nav-btn.next { right: -20px; }
  @media (max-width: 640px) {
    .ac-nav-btn.prev { left: -12px; }
    .ac-nav-btn.next { right: -12px; }
    .ac-nav-btn { width: 34px; height: 34px; }
  }

  /* ── Dots ────────────────────────────────────── */
  .ac-dots {
    display: flex; justify-content: center; gap: 6px; margin-top: 24px;
  }
  .ac-dot {
    height: 2px; background: var(--ac-border);
    border: none; cursor: pointer; padding: 0;
    transition: background 0.3s, width 0.3s;
  }
  .ac-dot.active { background: var(--ac-gold); width: 28px !important; }

  /* ── Pill index list ─────────────────────────── */
  .ac-pill-list {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-top: 16px;
  }
  .ac-pill {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 0.05em;
    color: var(--ac-ink-light); background: none;
    border: 1px solid var(--ac-border); padding: 4px 14px; cursor: pointer;
    transition: all 0.18s;
  }
  .ac-pill:hover { border-color: var(--ac-cobalt); color: var(--ac-cobalt); }
  .ac-pill.active { background: var(--ac-navy); border-color: var(--ac-navy); color: #fff; }

  /* ── Empty / loading state ─────────────────────── */
  .ac-empty {
    text-align: center; padding: 80px 24px;
    border: 1px solid var(--ac-border); background: var(--ac-white);
    max-width: 500px; margin: 0 auto;
  }
  .ac-empty h2 {
    font-size: 1.5rem; font-weight: 700; color: var(--ac-ink); margin: 16px 0 8px;
  }
  .ac-empty p { font-size: 13px; color: var(--ac-ink-light); }

  /* ── Responsive ─────────────────────────────── */
  @media (max-width: 768px) { .ac-grid { grid-template-columns: 1fr; } }
  @media (max-width: 540px) { .ac-grid { grid-template-columns: 1fr; } }
`

/* ─────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────── */
const TYPE_COLORS = {
  agriculture: { bg: "#15803d", bar: "#15803d" },
  tourism:     { bg: "#1d4ed8", bar: "#1d4ed8" },
  culture:     { bg: "#7c3aed", bar: "#7c3aed" },
  nature:      { bg: "#0f766e", bar: "#0f766e" },
  sport:       { bg: "#c2410c", bar: "#c2410c" },
  default:     { bg: "#1a3057", bar: "#1a3057" },
}
const typeColors = type => TYPE_COLORS[type] || TYPE_COLORS.default

const shuffleArray = items => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/* ─────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────── */
function PopularActivity({
  activities = [],
  events = [],
  restaurants = [],
  hotels = [],
  places = [],
  isStandalonePage = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [featuredItems, setFeaturedItems] = useState([])
  const HeadingTag = isStandalonePage ? "h1" : "h2"

  /* ── Helpers (unchanged logic) ───────────────── */
  const getImageUrl = arr => {
    if (!arr?.length) return "/placeholder.svg?height=400&width=600"
    const img = arr[0]
    return img.url.startsWith("http") ? img.url : `https://api.villedemamou.org${img.url}`
  }

  const getDescriptionText = arr => {
    if (!arr?.length) return "Description non disponible"
    const b = arr[0]
    if (b.children?.length > 0) return b.children[0].text || "Description non disponible"
    return "Description non disponible"
  }

  const getEventTitle = titleBlocks => {
    if (!titleBlocks?.length) return "Événement culturel"
    return titleBlocks
      .flatMap(block => block.children || [])
      .map(child => child.text || "")
      .join(" ")
      .trim() || "Événement culturel"
  }

  const buildFeaturedItems = () => {
    const fromActivities = activities.map(item => ({
      id: `activity-${item.id}`,
      title: item.Titre || "Activité populaire",
      description: getDescriptionText(item.description),
      image: getImageUrl(item.image),
      category: item.type || "Activité",
      location: item.localisation || "Mamou",
      date: item.date || "",
      path: `/blog/${item.type}/${item.id}`,
      sourceType: item.type || "activity",
    }))

    const fromHotels = hotels.map(item => ({
      id: `hotel-${item.id}`,
      title: item.nom || "Hôtel",
      description: getDescriptionText(item.description),
      image: getImageUrl(item.image),
      category: item.typeHotel || "Hôtel",
      location: item.localisation || "Mamou",
      date: "",
      path: "/hotel",
      sourceType: "tourism",
    }))

    const fromRestaurants = restaurants.map(item => ({
      id: `restaurant-${item.id}`,
      title: item.nom || "Restaurant",
      description: getDescriptionText(item.description),
      image: getImageUrl(item.image),
      category: item.typeCuisine || "Restaurant",
      location: item.localisation || "Mamou",
      date: "",
      path: "/nourriture",
      sourceType: "culture",
    }))

    const fromPlaces = places.map(item => ({
      id: `place-${item.id}`,
      title: item.Titre || "Lieu à visiter",
      description: getDescriptionText(item.description),
      image: getImageUrl(item.image),
      category: item.type || "Visite",
      location: item.localisation || "Mamou",
      date: "",
      path: "/place",
      sourceType: item.type || "nature",
    }))

    const fromEvents = events.map(item => ({
      id: `event-${item.id}`,
      title: getEventTitle(item.Titre),
      description: `${item.typeEvenement || "Événement"} à ${item.localisation || "Mamou"}`,
      image: item.Image?.url
        ? (item.Image.url.startsWith("http") ? item.Image.url : `https://api.villedemamou.org${item.Image.url}`)
        : "/placeholder.svg?height=400&width=600",
      category: item.typeEvenement || "Événement",
      location: item.localisation || "Mamou",
      date: item.dateEvenement || [item.Jour, item.Mois, item.Annee].filter(Boolean).join(" "),
      path: "/cultures",
      sourceType: "culture",
    }))

    return shuffleArray([
      ...fromActivities,
      ...fromHotels,
      ...fromRestaurants,
      ...fromPlaces,
      ...fromEvents,
    ]).slice(0, 8)
  }

  useEffect(() => {
    setFeaturedItems(buildFeaturedItems())
    setCurrentIndex(0)
  }, [activities, events, restaurants, hotels, places])

  const handlePrevious = () => setCurrentIndex(p => (p - 1 + activities.length) % activities.length)
  const handleNext     = () => setCurrentIndex(p => (p + 1) % activities.length)
  const handleDotClick = i  => setCurrentIndex(i)

  /* ── Empty state ─────────────────────────────── */
  if (activities.length === 0) {
    return (
      <div className="ac-root">
        <style>{CSS}</style>
        {isStandalonePage && (
          <Helmet>
            <title>Activités Populaires | Ville de Mamou</title>
            <meta name="description" content="Découvrez les activités populaires de Mamou, les événements appréciés et les expériences locales à ne pas manquer." />
          </Helmet>
        )}
        <div className="ac-empty">
          <FaLightbulb size={40} style={{ color: "var(--ac-gold)", margin: "0 auto 12px", display: "block" }} />
          <HeadingTag>Activités <span style={{ color: "var(--ac-gold)" }}>Populaires</span></HeadingTag>
          <p>Chargement des activités populaires…</p>
        </div>
      </div>
    )
  }

  const featured = featuredItems[currentIndex]
  const hasFeaturedSelection = featuredItems.length > 1
  const handleFeaturedPrevious = () => setCurrentIndex(p => (p - 1 + featuredItems.length) % featuredItems.length)
  const handleFeaturedNext     = () => setCurrentIndex(p => (p + 1) % featuredItems.length)
  const handleFeaturedDotClick = i  => setCurrentIndex(i)

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div className="ac-root">
      <style>{CSS}</style>
      {isStandalonePage && (
        <Helmet>
          <title>Activités Populaires | Ville de Mamou</title>
          <meta name="description" content="Découvrez les activités populaires de Mamou, les événements appréciés et les expériences locales à ne pas manquer." />
        </Helmet>
      )}

      {/* ════ HEADER ════ */}
      <div className="ac-header">
        <p className="ac-eyebrow">À faire à Mamou</p>
        <HeadingTag className="ac-title">
          Activités <span className="accent">Populaires</span>
        </HeadingTag>
        <p className="ac-sub">
          Découvrez les activités les plus appréciées et les expériences uniques que Mamou a à offrir.
        </p>
      </div>

      {/* ════ ACTIVITY GRID ════ */}
      <div className="ac-grid">
        {activities.map((activity, idx) => {
          const { bg } = typeColors(activity.type)
          return (
            <Link
              key={activity.id || idx}
              to={`/blog/${activity.type}/${activity.id}`}
              className="ac-card"
            >
              {/* Image */}
              <div className="ac-card-img">
                <img
                  src={getImageUrl(activity.image)}
                  alt={activity.Titre}
                  onError={e => { e.target.src = "/placeholder.svg?height=400&width=600" }}
                />
                <div className="ac-card-img-scrim" />
                <span className="ac-type-badge" style={{ background: bg }}>
                  {activity.type || "Activité"}
                </span>
              </div>
              {/* Accent bar */}
              <div className="ac-card-bar" style={{ background: bg }} />
              {/* Body */}
              <div className="ac-card-body">
                <h2 className="ac-card-title">{activity.Titre || `Activité ${idx + 1}`}</h2>
                <div className="ac-card-meta">
                  {activity.date && (
                    <span className="ac-card-meta-item">
                      <FaCalendarAlt size={11} style={{ color: "var(--ac-gold)" }} />
                      {new Date(activity.date).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                  <span className="ac-card-meta-item">
                    <FaMapMarkerAlt size={11} style={{ color: "var(--ac-gold)" }} />
                    {activity.localisation || "Mamou"}
                  </span>
                </div>
                <p className="ac-card-desc">{getDescriptionText(activity.description)}</p>
                <div className="ac-card-footer">
                  <span className="ac-read-link">
                    Voir les détails <FaInfoCircle size={11} />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* ════ FEATURED CAROUSEL (3+ activities) ════ */}
      {hasFeaturedSelection && (
        <>
          <hr className="ac-rule" />

          <div className="ac-featured-header">
            <p className="ac-featured-label">Sélection spéciale</p>
            <h2 className="ac-featured-title">
              Le meilleur de <span className="accent">Mamou</span>
            </h2>
          </div>

          <div className="ac-featured-wrap">
            <div className="ac-featured-card">
              {/* Image */}
              <div className="ac-featured-img">
                <img
                  src={featured?.image}
                  alt={featured?.title}
                  onError={e => { e.target.src = "/placeholder.svg?height=400&width=600" }}
                />
                <div className="ac-featured-img-scrim" />
                <div className="ac-featured-counter">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(featuredItems.length).padStart(2, "0")}
                </div>
              </div>

              {/* Body */}
              <div className="ac-featured-body">
                <span className="ac-featured-type" style={{ background: typeColors(featured?.sourceType).bg }}>
                  {featured?.category || "Découverte"}
                </span>

                <h3 className="ac-featured-name">{featured?.title}</h3>
                <p className="ac-featured-desc">{featured?.description}</p>

                <div className="ac-featured-meta">
                  {featured?.date && (
                    <span className="ac-featured-meta-item">
                      <FaCalendarAlt size={11} style={{ color: "var(--ac-gold)" }} />
                      {featured.date}
                    </span>
                  )}
                  <span className="ac-featured-meta-item">
                    <FaMapMarkerAlt size={11} style={{ color: "var(--ac-gold)" }} />
                    {featured?.location || "Mamou"}
                  </span>
                </div>

                <Link
                  to={featured?.path || "/"}
                  className="ac-featured-cta"
                >
                  Découvrir maintenant
                </Link>
              </div>
            </div>

            {/* Nav arrows */}
            <button className="ac-nav-btn prev" onClick={handleFeaturedPrevious} aria-label="Précédent">
              <FaChevronLeft size={14} />
            </button>
            <button className="ac-nav-btn next" onClick={handleFeaturedNext} aria-label="Suivant">
              <FaChevronRight size={14} />
            </button>

            {/* Dots + pill names */}
            <div className="ac-dots">
              {featuredItems.map((_, idx) => (
                <button
                  key={idx}
                  className={`ac-dot${idx === currentIndex ? " active" : ""}`}
                  style={{ width: idx === currentIndex ? 28 : 14 }}
                  onClick={() => handleFeaturedDotClick(idx)}
                  aria-label={`Sélection ${idx + 1}`}
                />
              ))}
            </div>
            <div className="ac-pill-list">
              {featuredItems.map((item, idx) => (
                <button
                  key={idx}
                  className={`ac-pill${idx === currentIndex ? " active" : ""}`}
                  onClick={() => handleFeaturedDotClick(idx)}
                >
                  {item.title || `Sélection ${idx + 1}`}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PopularActivity
