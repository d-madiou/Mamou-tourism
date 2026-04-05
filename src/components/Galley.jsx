"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { toMediaUrl } from "../config/api"

/* ─────────────────────────────────────────────────
   DESIGN SYSTEM — Gallery Edition
   Font: Poppins (consistent with site)
   Tone: editorial photography showcase — dark,
         immersive, magazine-quality presentation
───────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');

  :root {
    --gl-navy:      #0c1b33;
    --gl-cobalt:    #1d4ed8;
    --gl-gold:      #c9a84c;
    --gl-gold-pale: #fdf6e3;
    --gl-surface:   #f5f7fa;
    --gl-white:     #ffffff;
    --gl-ink:       #0c1b33;
    --gl-ink-mid:   #3d5068;
    --gl-ink-light: #7a90ab;
    --gl-border:    #dde3ed;
  }

  /* ── Root ───────────────────────────────────── */
  .gl-root {
    background: var(--gl-surface);
    font-family: 'Poppins', system-ui, sans-serif;
    color: var(--gl-ink);
    padding: clamp(72px, 10vw, 120px) max(5vw, 24px);
  }
  .gl-root * { box-sizing: border-box; }

  /* ── Section Header ─────────────────────────── */
  .gl-header { text-align: center; margin-bottom: clamp(44px, 7vw, 68px); }

  .gl-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--gl-gold); margin-bottom: 14px;
  }
  .gl-eyebrow::before, .gl-eyebrow::after { content:''; width:24px; height:1px; background:currentColor; }

  .gl-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; line-height: 1.15; color: var(--gl-ink);
    margin-bottom: 14px;
  }
  .gl-title .accent { color: var(--gl-gold); font-weight: 300; font-style: italic; }

  .gl-sub {
    font-size: 14px; line-height: 1.8; color: var(--gl-ink-mid);
    max-width: 480px; margin: 0 auto;
  }

  /* ── Category Chips ─────────────────────────── */
  .gl-chips {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
    margin-bottom: clamp(36px, 5vw, 56px);
  }
  .gl-chip {
    padding: 5px 18px;
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid var(--gl-border); color: var(--gl-ink-light);
    background: transparent; cursor: pointer; transition: all .18s;
  }
  .gl-chip:hover { border-color: var(--gl-cobalt); color: var(--gl-cobalt); }
  .gl-chip.active { background: var(--gl-navy); border-color: var(--gl-navy); color: #fff; }

  /* ── Masonry-style Grid ─────────────────────── */
  .gl-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
  }
  @media (max-width: 768px) { .gl-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .gl-grid { grid-template-columns: 1fr; } }

  /* Every 7th card is wide (spans 2 columns) */
  .gl-item:nth-child(7n+1) { grid-column: span 2; aspect-ratio: 16/7; }
  @media (max-width: 768px) { .gl-item:nth-child(7n+1) { grid-column: span 1; aspect-ratio: 4/3; } }

  /* ── Gallery Item ───────────────────────────── */
  .gl-item {
    position: relative; overflow: hidden; cursor: pointer;
    aspect-ratio: 4/3;
    background: var(--gl-border);
  }
  .gl-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.65s ease;
  }
  .gl-item:hover img { transform: scale(1.06); }

  /* Hover overlay */
  .gl-item-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(12,27,51,0.82) 0%, transparent 55%);
    opacity: 0; transition: opacity .3s;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 16px 18px;
  }
  .gl-item:hover .gl-item-overlay { opacity: 1; }

  .gl-item-badge {
    display: inline-flex; align-self: flex-start;
    padding: 3px 10px; background: var(--gl-gold); color: var(--gl-navy);
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 6px;
  }
  .gl-item-date {
    font-size: 11px; color: rgba(255,255,255,0.55); font-weight: 500;
  }

  /* Gold left rule that slides in on hover */
  .gl-item::after {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: var(--gl-gold);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform .35s ease;
  }
  .gl-item:hover::after { transform: scaleY(1); }

  /* ── Footer count ───────────────────────────── */
  .gl-count {
    text-align: center; margin-top: 28px;
    font-size: 12px; color: var(--gl-ink-light); font-weight: 500;
  }

  /* ── Skeleton Loading ───────────────────────── */
  .gl-skeleton {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px;
  }
  @media (max-width: 768px) { .gl-skeleton { grid-template-columns: 1fr 1fr; } }
  .gl-skel-item {
    aspect-ratio: 4/3; background: var(--gl-border);
    animation: skelPulse 1.5s ease-in-out infinite;
  }
  @keyframes skelPulse { 0%,100%{opacity:.6} 50%{opacity:1} }

  /* ── Empty State ────────────────────────────── */
  .gl-empty {
    max-width: 440px; margin: 0 auto; text-align: center; padding: 72px 24px;
    border: 1px solid var(--gl-border); background: var(--gl-white);
  }
  .gl-empty h3 { font-size: 1.25rem; font-weight: 700; color: var(--gl-ink-mid); margin: 14px 0 7px; }
  .gl-empty p  { font-size: 13px; color: var(--gl-ink-light); }

  /* ── Lightbox ───────────────────────────────── */
  .gl-lb-overlay {
    position: fixed; inset: 0;
    background: rgba(8,14,26,0.97);
    z-index: 50; display: flex; align-items: center; justify-content: center;
  }

  /* Close button */
  .gl-lb-close {
    position: absolute; top: 20px; right: 20px;
    width: 40px; height: 40px;
    border: 1px solid rgba(255,255,255,0.18);
    background: transparent; color: rgba(255,255,255,0.65); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    z-index: 60; transition: border-color .2s, color .2s;
  }
  .gl-lb-close:hover { border-color: var(--gl-gold); color: var(--gl-gold); }

  /* Nav arrows */
  .gl-lb-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    z-index: 60; transition: background .2s, border-color .2s, color .2s;
  }
  .gl-lb-nav:hover { background: var(--gl-gold); border-color: var(--gl-gold); color: var(--gl-navy); }
  .gl-lb-nav.prev { left: 16px; }
  .gl-lb-nav.next { right: 16px; }
  @media (max-width: 640px) {
    .gl-lb-nav.prev { left: 8px; }
    .gl-lb-nav.next { right: 8px; }
  }

  /* Main image */
  .gl-lb-img-wrap {
    max-width: 90vw; max-height: 80vh;
    display: flex; align-items: center; justify-content: center;
  }
  .gl-lb-img-wrap img {
    max-width: 100%; max-height: 80vh;
    object-fit: contain; display: block;
  }

  /* Caption bar */
  .gl-lb-caption {
    position: absolute; bottom: 72px; left: 50%; transform: translateX(-50%);
    display: flex; align-items: center; justify-content: space-between;
    width: min(90vw, 800px); gap: 12px;
  }
  .gl-lb-badge {
    display: inline-flex; padding: 4px 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    background: var(--gl-gold); color: var(--gl-navy);
  }
  .gl-lb-date { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 500; }
  .gl-lb-counter {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1); padding: 4px 12px;
    white-space: nowrap;
  }

  /* Thumbnail strip */
  .gl-lb-thumbs {
    position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 4px; max-width: 90vw; overflow: hidden;
  }
  .gl-lb-thumb {
    width: 52px; height: 36px; overflow: hidden; cursor: pointer; flex-shrink: 0;
    border: 2px solid transparent; transition: border-color .2s, opacity .2s;
    opacity: 0.45;
  }
  .gl-lb-thumb.active { border-color: var(--gl-gold); opacity: 1; }
  .gl-lb-thumb:hover  { opacity: 0.75; }
  .gl-lb-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
`;

const Gallery = ({ galleryData = [], isStandalonePage = false }) => {
  const [lightboxOpen,       setLightboxOpen]       = useState(false)
  const [currentImageIndex,  setCurrentImageIndex]  = useState(0)
  const [isLoading,          setIsLoading]          = useState(true)
  const HeadingTag = isStandalonePage ? "h1" : "h2";

  const getImageUrl = imageArray => {
    if (!imageArray?.length) return "/placeholder.svg?height=400&width=600";
    return toMediaUrl(imageArray[0].url);
  };

  const visibleImages = galleryData;

  /* ── Effects (unchanged logic) ───────────────── */
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    document.body.style.overflow = lightboxOpen ? "hidden" : "auto";
    return () => { clearTimeout(t); document.body.style.overflow = "auto"; };
  }, [lightboxOpen]);

  const openLightbox = i => { setCurrentImageIndex(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);

  const navigateImage = useCallback(direction => {
    if (direction === "next") setCurrentImageIndex(p => (p + 1) % visibleImages.length);
    else                       setCurrentImageIndex(p => (p - 1 + visibleImages.length) % visibleImages.length);
  }, [visibleImages.length]);

  useEffect(() => {
    const h = e => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft")  navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxOpen, navigateImage]);

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <section id="gallery" className="gl-root">
      <style>{CSS}</style>
      {isStandalonePage && (
        <Helmet>
          <title>Galerie Photos | Ville de Mamou</title>
          <meta name="description" content="Parcourez la galerie photo de Mamou et découvrez ses paysages, sa culture et ses moments marquants." />
        </Helmet>
      )}

      {/* ── Header ── */}
      <motion.div
        className="gl-header"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }} viewport={{ once: true }}
      >
        <p className="gl-eyebrow">Photographies</p>
        <HeadingTag className="gl-title">
          La Beauté de <span className="accent">Mamou</span>
        </HeadingTag>
        <p className="gl-sub">
          Découvrez les paysages à couper le souffle et la richesse culturelle à travers notre galerie.
        </p>
      </motion.div>

      {/* ── Grid / States ── */}
      {isLoading ? (
        <div className="gl-skeleton">
          {[...Array(9)].map((_, i) => <div key={i} className="gl-skel-item" />)}
        </div>
      ) : visibleImages.length === 0 ? (
        <div className="gl-empty">
          <div style={{ width: 52, height: 52, background: "var(--gl-border)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 28, height: 28, background: "var(--gl-surface-2)" }} />
          </div>
          <h3>Aucune image trouvée</h3>
          <p>Aucune image disponible pour le moment.</p>
        </div>
      ) : (
        <motion.div
          className="gl-grid"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {visibleImages.map((item, idx) => (
            <motion.div
              key={item.id}
              className="gl-item"
              onClick={() => openLightbox(idx)}
              variants={{
                hidden: { opacity: 0, scale: 0.97 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
              }}
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.typeDePhoto}
                onError={e => { e.target.src = "/placeholder.svg?height=400&width=600"; }}
              />
              <div className="gl-item-overlay">
                <span className="gl-item-badge">{item.typeDePhoto}</span>
                <p className="gl-item-date">
                  {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── Count ── */}
      {visibleImages.length > 0 && (
        <motion.p
          className="gl-count"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }} viewport={{ once: true }}
        >
          {visibleImages.length} image{visibleImages.length > 1 ? "s" : ""} au total
        </motion.p>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && visibleImages.length > 0 && (
          <motion.div
            className="gl-lb-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close */}
            <button className="gl-lb-close" onClick={closeLightbox}><X size={18} /></button>

            {/* Nav */}
            {visibleImages.length > 1 && (
              <>
                <button className="gl-lb-nav prev" onClick={() => navigateImage("prev")} aria-label="Précédent"><ArrowLeft size={18} /></button>
                <button className="gl-lb-nav next" onClick={() => navigateImage("next")} aria-label="Suivant"><ArrowRight size={18} /></button>
              </>
            )}

            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="gl-lb-img-wrap"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28 }}
              >
                <img
                  src={getImageUrl(visibleImages[currentImageIndex]?.image)}
                  alt={visibleImages[currentImageIndex]?.typeDePhoto}
                  onError={e => { e.target.src = "/placeholder.svg?height=600&width=800"; }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <motion.div
              className="gl-lb-caption"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="gl-lb-badge">{visibleImages[currentImageIndex]?.typeDePhoto}</span>
                <span className="gl-lb-date">
                  {new Date(visibleImages[currentImageIndex]?.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
              {visibleImages.length > 1 && (
                <span className="gl-lb-counter">
                  {String(currentImageIndex + 1).padStart(2, "0")} / {String(visibleImages.length).padStart(2, "0")}
                </span>
              )}
            </motion.div>

            {/* Thumbnail strip */}
            {visibleImages.length > 1 && (
              <div className="gl-lb-thumbs">
                {visibleImages.slice(
                  Math.max(0, currentImageIndex - 3),
                  Math.min(visibleImages.length, currentImageIndex + 4)
                ).map((item, i) => {
                  const realIdx = Math.max(0, currentImageIndex - 3) + i;
                  return (
                    <div
                      key={item.id}
                      className={`gl-lb-thumb${realIdx === currentImageIndex ? " active" : ""}`}
                      onClick={() => setCurrentImageIndex(realIdx)}
                    >
                      <img src={getImageUrl(item.image)} alt={item.typeDePhoto} />
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
