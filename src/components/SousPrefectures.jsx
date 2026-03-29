import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

/* ─────────────────────────────────────────────────
   DESIGN TOKENS — inherits the site's shared system
   (navy / cobalt / gold / Playfair + Outfit)
───────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --sp-navy:      #0c1b33;
    --sp-cobalt:    #1d4ed8;
    --sp-gold:      #c9a84c;
    --sp-gold-pale: #fdf6e3;
    --sp-surface:   #f5f7fa;
    --sp-white:     #ffffff;
    --sp-ink:       #0c1b33;
    --sp-ink-mid:   #3d5068;
    --sp-ink-light: #7a90ab;
    --sp-border:    #dde3ed;
  }

  /* ── Root ───────────────────────────────────── */
  .sp-root {
    font-family: 'Outfit', system-ui, sans-serif;
    color: var(--sp-ink);
  }

  /* ── Empty state ────────────────────────────── */
  .sp-empty {
    padding: 80px 24px; text-align: center;
    background: var(--sp-surface);
    border: 1px solid var(--sp-border);
  }
  .sp-empty h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 700; color: var(--sp-ink);
    margin-bottom: 12px;
  }
  .sp-empty p { font-size: 14px; color: var(--sp-ink-light); }

  /* ── Card ───────────────────────────────────── */
  .sp-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 460px;
    background: var(--sp-white);
    border: 1px solid var(--sp-border);
    overflow: hidden;
    position: relative;
  }
  @media (max-width: 768px) {
    .sp-card { grid-template-columns: 1fr; }
    .sp-image-col { min-height: 260px; order: -1; }
  }

  /* ── Info Panel ─────────────────────────────── */
  .sp-info {
    padding: clamp(32px, 5vw, 60px);
    display: flex; flex-direction: column; justify-content: center;
    position: relative;
    z-index: 2;
  }

  /* Gold left rule */
  .sp-info::before {
    content: '';
    position: absolute; left: 0; top: 20%; bottom: 20%;
    width: 3px;
    background: linear-gradient(to bottom, transparent, var(--sp-gold), transparent);
  }

  .sp-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--sp-gold);
    margin-bottom: 14px;
  }
  .sp-eyebrow::before {
    content: ''; width: 16px; height: 1px; background: currentColor;
  }

  .sp-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.6rem, 3.5vw, 2.6rem);
    font-weight: 700; line-height: 1.1; color: var(--sp-ink);
    margin-bottom: 6px;
  }

  .sp-titre {
    font-size: 12px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--sp-cobalt);
    margin-bottom: 20px;
  }

  .sp-desc {
    font-size: 14px; line-height: 1.8; color: var(--sp-ink-mid);
    margin-bottom: 28px;
    display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── Stats Grid ─────────────────────────────── */
  .sp-stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--sp-border);
    margin-bottom: 28px;
  }
  .sp-stat {
    padding: 14px 18px;
    border-right: 1px solid var(--sp-border);
    border-bottom: 1px solid var(--sp-border);
  }
  .sp-stat:nth-child(2n) { border-right: none; }
  .sp-stat:nth-last-child(-n+2) { border-bottom: none; }

  .sp-stat-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--sp-ink-light);
    margin-bottom: 4px;
  }
  .sp-stat-value {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.15rem; font-weight: 700; color: var(--sp-ink);
    line-height: 1.2;
  }

  /* ── Location tag ───────────────────────────── */
  .sp-location {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--sp-ink-mid);
    border: 1px solid var(--sp-border);
    padding: 7px 14px; align-self: flex-start;
    margin-bottom: 0;
  }

  /* ── Image Column ───────────────────────────── */
  .sp-image-col {
    position: relative; overflow: hidden;
  }
  .sp-image-col img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
  }
  .sp-card:hover .sp-image-col img { transform: scale(1.03); }
  .sp-image-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(12,27,51,0.22), transparent);
    pointer-events: none;
  }

  /* ── Index badge (top-right of image) ───────── */
  .sp-index-badge {
    position: absolute; top: 20px; right: 20px;
    background: rgba(12,27,51,0.75);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    padding: 7px 14px;
    font-family: 'Outfit', sans-serif;
    z-index: 5;
  }

  /* ── Navigation Arrows ──────────────────────── */
  .sp-nav-btn {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px;
    background: var(--sp-white);
    border: 1px solid var(--sp-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--sp-ink); cursor: pointer;
    z-index: 30;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    box-shadow: 0 4px 16px rgba(12,27,51,0.10);
  }
  .sp-nav-btn:hover { background: var(--sp-navy); border-color: var(--sp-navy); color: #fff; }
  .sp-nav-btn.prev { left: -22px; }
  .sp-nav-btn.next { right: -22px; }

  @media (max-width: 640px) {
    .sp-nav-btn.prev { left: -14px; }
    .sp-nav-btn.next { right: -14px; }
    .sp-nav-btn { width: 36px; height: 36px; }
  }

  /* ── Pagination ─────────────────────────────── */
  .sp-dots {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    margin-top: 28px;
  }
  .sp-dot {
    height: 2px; background: var(--sp-border);
    border: none; cursor: pointer;
    transition: background 0.3s, width 0.3s;
    padding: 0;
  }
  .sp-dot.active { background: var(--sp-gold); width: 32px !important; }

  /* ── Name List ──────────────────────────────── */
  .sp-name-list {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
    margin-top: 20px;
  }
  .sp-name-pill {
    font-size: 11px; font-weight: 500; letter-spacing: 0.05em;
    color: var(--sp-ink-light); background: none;
    border: 1px solid var(--sp-border);
    padding: 5px 14px; cursor: pointer;
    transition: all 0.18s; font-family: 'Outfit', sans-serif;
  }
  .sp-name-pill:hover { border-color: var(--sp-cobalt); color: var(--sp-cobalt); }
  .sp-name-pill.active { background: var(--sp-navy); border-color: var(--sp-navy); color: #fff; }
`;

/* ─────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────── */
const SousPrefectures = ({ sousPrefectures = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ── Navigation (unchanged logic) ───────────── */
  const goToPrevious = () => {
    setCurrentIndex(i => (i === 0 ? sousPrefectures.length - 1 : i - 1));
  };
  const goToNext = () => {
    setCurrentIndex(i => (i === sousPrefectures.length - 1 ? 0 : i + 1));
  };
  const goToSlide = (idx) => setCurrentIndex(idx);

  /* ── Empty state ─────────────────────────────── */
  if (!sousPrefectures || sousPrefectures.length === 0) {
    return (
      <section id="sous-prefecture-section" className="sp-root">
        <style>{CSS}</style>
        <div className="sp-empty">
          <h2>Sous-Préfectures</h2>
          <p>Aucune information sur les sous-préfectures n'est disponible pour le moment.</p>
        </div>
      </section>
    );
  }

  const { nom, titre, description, chefLieu, nombreDistricts, population, superficieKm2, image } =
    sousPrefectures[currentIndex];

  const imageUrl = image?.[0]?.url?.startsWith("http")
    ? image[0].url
    : `https://api.villedemamou.org${image?.[0]?.url || "/placeholder.svg"}`;
  const imageAlt = image?.[0]?.alternativeText || nom || "Image";

  const descText =
    description?.[0]?.children?.[0]?.text ||
    (typeof description === "string" ? description : null) ||
    "Description non disponible.";

  const stats = [
    { label: "Chef-lieu",  value: chefLieu },
    { label: "Districts",  value: nombreDistricts },
    { label: "Population", value: population ? parseInt(population).toLocaleString("fr-FR") : null },
    { label: "Superficie", value: superficieKm2 ? `${superficieKm2} km²` : null },
  ].filter(s => s.value);

  /* ── Render ─────────────────────────────────── */
  return (
    <section id="sous-prefecture-section" className="sp-root">
      <style>{CSS}</style>

      {/* Card */}
      <div style={{ position: "relative" }}>
        <div className="sp-card">

          {/* Info Panel */}
          <div className="sp-info">
            <p className="sp-eyebrow">Sous-Préfecture</p>
            <h3 className="sp-name">{nom}</h3>
            {titre && <p className="sp-titre">{titre}</p>}
            <p className="sp-desc">{descText}</p>

            {/* Stats grid — only shown if there's data */}
            {stats.length > 0 && (
              <div className="sp-stats">
                {stats.map(s => (
                  <div className="sp-stat" key={s.label}>
                    <p className="sp-stat-label">{s.label}</p>
                    <p className="sp-stat-value">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {chefLieu && (
              <div className="sp-location">
                <MapPin size={11} style={{ color: "var(--sp-gold)", flexShrink: 0 }} />
                {chefLieu}
              </div>
            )}
          </div>

          {/* Image Column */}
          <div className="sp-image-col">
            <img src={imageUrl} alt={imageAlt} />
            <div className="sp-image-scrim" />
            <div className="sp-index-badge">
              {String(currentIndex + 1).padStart(2, "0")} / {String(sousPrefectures.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {sousPrefectures.length > 1 && (
          <>
            <button className="sp-nav-btn prev" onClick={goToPrevious} aria-label="Sous-préfecture précédente">
              <ChevronLeft size={18} />
            </button>
            <button className="sp-nav-btn next" onClick={goToNext} aria-label="Sous-préfecture suivante">
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Pagination — horizontal bars + name pills */}
      {sousPrefectures.length > 1 && (
        <>
          <div className="sp-dots">
            {sousPrefectures.map((_, idx) => (
              <button
                key={idx}
                className={`sp-dot${idx === currentIndex ? " active" : ""}`}
                style={{ width: idx === currentIndex ? 32 : 16 }}
                onClick={() => goToSlide(idx)}
                aria-label={`Aller à la sous-préfecture ${idx + 1}`}
              />
            ))}
          </div>

          <div className="sp-name-list">
            {sousPrefectures.map((sp, idx) => (
              <button
                key={idx}
                className={`sp-name-pill${idx === currentIndex ? " active" : ""}`}
                onClick={() => goToSlide(idx)}
              >
                {sp.nom}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SousPrefectures;