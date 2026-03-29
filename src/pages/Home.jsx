"use client"

import { useEffect, useRef, useState } from "react"
import { FaFacebookF, FaInfoCircle, FaLinkedinIn, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa"
import { Helmet } from "react-helmet-async"
import ImageMamou from "../assets/images/Mamou1.png"
import ImageMamou3 from "../assets/images/Mamou3.png"
import MamouHero from "../assets/images/MamouHero.jpg"
import MamouHero2 from "../assets/images/MamouHero2.jpg"
import AboutSection from "../components/AboutSection"
import Banner from "../components/Banner"
import Gallery from "../components/Galley"
import NavBar from "../components/NavBar"
import PopularActivity from "../components/PopularActivity"
import Police from "../components/Guide"

/* ─────────────────────────────────────────────────
   DESIGN TOKENS — shared with About & Admin pages
───────────────────────────────────────────────── */
const CSS = `
  :root {
    --h-navy:      #0c1b33;
    --h-cobalt:    #1d4ed8;
    --h-gold:      #F8DE22;
    --h-gold-dim:  rgba(201,168,76,0.25);
    --h-white:     #ffffff;
    --h-ink-soft:  rgba(255,255,255,0.62);
    --h-ink-dim:   rgba(255,255,255,0.38);
  }

  /* ── Slide transitions ──────────────────────── */
  .hm-slide {
    position: absolute; inset: 0;
    transition: opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
  }
  .hm-slide img {
    width: 100%; height: 100%;
    object-fit: cover;
    transform: scale(1.06);
    transition: transform 9s ease;
  }
  .hm-slide.active img { transform: scale(1); }

  /* ── Scrim ──────────────────────────────────── */
  .hm-scrim {
    position: absolute; inset: 0;
    background:
      linear-gradient(to top,   rgba(12,27,51,0.85) 0%,  rgba(12,27,51,0.0) 55%),
      linear-gradient(to bottom,rgba(12,27,51,0.55) 0%,  rgba(12,27,51,0.0) 40%),
      linear-gradient(to right, rgba(12,27,51,0.45) 0%,  rgba(12,27,51,0.0) 60%);
  }

  /* Subtle noise texture overlay */
  .hm-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* ── Hero text block ────────────────────────── */
  .hm-text {
    position: absolute;
    bottom: clamp(56px, 10vh, 112px);
    left: max(6vw, 28px);
    right: max(6vw, 28px);
    max-width: 780px;
    z-index: 10;
  }

  /* ── Eyebrow tag ────────────────────────────── */
  .hm-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--h-gold);
    margin-bottom: 20px;
  }
  .hm-eyebrow::before {
    content: ''; width: 28px; height: 1px; background: var(--h-gold);
  }

  /* ── Main title ─────────────────────────────── */
  .hm-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(2.4rem, 6vw, 5.1rem);
    font-weight: 700; line-height: 1.04; color: var(--h-white);
    margin-bottom: 20px;
    letter-spacing: -0.03em;
  }
  .hm-title strong { font-weight: 700; }
  .hm-title em     { font-style: normal; color: var(--h-gold); font-weight: 700; }

  /* ── Sub copy ───────────────────────────────── */
  .hm-sub {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(14px, 1.8vw, 17px); line-height: 1.8;
    color: var(--h-ink-soft);
    max-width: 520px; margin-bottom: 36px;
  }

  /* ── CTA row ────────────────────────────────── */
  .hm-cta-row {
    display: flex; flex-wrap: wrap; align-items: center; gap: 14px;
  }
  .hm-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--h-gold); color: var(--h-navy);
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    border: none; padding: 14px 28px; cursor: pointer;
    transition: background 0.22s, transform 0.18s;
  }
  .hm-btn-primary:hover { background: #dbbe6a; transform: translateY(-1px); }

  .hm-btn-ghost {
    display: inline-flex; align-items: center; gap: 9px;
    background: transparent; color: var(--h-white);
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.3); padding: 13px 26px; cursor: pointer;
    transition: border-color 0.22s, background 0.22s;
    text-decoration: none;
  }
  .hm-btn-ghost:hover { border-color: var(--h-gold); background: rgba(201,168,76,0.08); color: var(--h-gold); }

  /* ── Social icons ───────────────────────────── */
  .hm-socials {
    position: absolute; right: max(3vw, 20px); top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 12px;
    z-index: 15;
  }
  .hm-social-link {
    width: 38px; height: 38px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(9,146,194,0.22);
    backdrop-filter: blur(10px);
    color: rgba(255,255,255,0.92);
    text-decoration: none;
    box-shadow: 0 10px 24px rgba(5,63,83,0.18);
    transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.18s, box-shadow 0.18s;
    font-size: 13px;
    border-radius: 12px;
  }
  .hm-social-link:hover {
    border-color: rgba(255,255,255,0.28);
    background: rgba(9,146,194,0.36);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(5,63,83,0.24);
  }

  /* ── Slide dots ─────────────────────────────── */
  .hm-dots {
    position: absolute; bottom: clamp(28px, 4vh, 48px); right: max(6vw, 28px);
    display: flex; flex-direction: column; gap: 7px;
    z-index: 15;
  }
  .hm-dot {
    width: 2px; background: rgba(255,255,255,0.25);
    border: none; cursor: pointer; padding: 0;
    transition: background 0.3s, height 0.3s;
  }
  .hm-dot.active { background: var(--h-gold); height: 32px !important; }

  /* ── Scroll cue ─────────────────────────────── */
  .hm-scroll-cue {
    position: absolute; bottom: clamp(20px, 3.5vh, 36px); left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 7px;
    z-index: 10; pointer-events: none;
  }
  .hm-scroll-label {
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--h-ink-dim);
  }
  .hm-scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
    animation: scrollPulse 2.2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%,100% { opacity: 0.3; transform: scaleY(1);   }
    50%      { opacity: 0.9; transform: scaleY(1.2); }
  }

  /* ── Fade-in ────────────────────────────────── */
  .hm-reveal {
    animation: hmFadeUp 0.9s ease both;
  }
  .hm-reveal-1 { animation-delay: 0.15s; }
  .hm-reveal-2 { animation-delay: 0.30s; }
  .hm-reveal-3 { animation-delay: 0.48s; }
  .hm-reveal-4 { animation-delay: 0.64s; }
  @keyframes hmFadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Responsive ─────────────────────────────── */
  @media (max-width: 640px) {
    .hm-socials { display: none; }
    .hm-title   { font-size: clamp(2rem, 10.5vw, 3.2rem); }
    .hm-dots    { right: 14px; }
  }
`

/* ─────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────── */
function Home({ activities = [], galleryData = [], policeData = [] }) {
  const images = [MamouHero, MamouHero2, ImageMamou, ImageMamou3]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroRef = useRef(null)

  /* Auto-advance (unchanged logic) */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <>
      <style>{CSS}</style>
      <Helmet>
        <title>Accueil | Ville de Mamou</title>
        <meta
          name="description"
          content="Découvrez la ville de Mamou, ses activités populaires, ses lieux emblématiques, sa culture et ses informations touristiques officielles."
        />
      </Helmet>

      <div className="w-full overflow-hidden">
        <div style={{ fontFamily: "'Poppins', system-ui, sans-serif" }} className="relative">

          {/* ════ HERO ════ */}
          <div
            ref={heroRef}
            style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}
          >
            {/* Slides */}
            {images.map((src, idx) => (
              <div
                key={idx}
                className={`hm-slide${idx === currentImageIndex ? " active" : ""}`}
                style={{ opacity: idx === currentImageIndex ? 1 : 0 }}
              >
                <img src={src} alt={`Mamou ${idx + 1}`} />
              </div>
            ))}

            {/* Overlays */}
            <div className="hm-scrim" />
            <div className="hm-noise"  />

            {/* NavBar — absolutely positioned at top */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50 }}>
              <NavBar />
            </div>

            {/* ── Social icons — vertical right rail ── */}
            <div className="hm-socials">
              <a href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                 aria-label="Facebook" className="hm-social-link" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://wa.me/224620150481"
                 aria-label="WhatsApp" className="hm-social-link" target="_blank" rel="noreferrer">
                <FaWhatsapp />
              </a>
              <a href="#" aria-label="LinkedIn" className="hm-social-link">
                <FaLinkedinIn />
              </a>
            </div>

            {/* ── Slide progress dots — right, below socials ── */}
            <div className="hm-dots">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`hm-dot${idx === currentImageIndex ? " active" : ""}`}
                  style={{ height: idx === currentImageIndex ? 32 : 16 }}
                  onClick={() => setCurrentImageIndex(idx)}
                  aria-label={`Image ${idx + 1}`}
                />
              ))}
            </div>

            {/* ── Hero Text — bottom-left anchored ── */}
            <div className="hm-text">
              <p className="hm-eyebrow hm-reveal hm-reveal-1">
                Préfecture du Fouta-Djalon
              </p>

              <h1 className="hm-title hm-reveal hm-reveal-2">
                Découvrez la beauté<br />
                <strong>et la nature</strong> de{" "}
                <em>Mamou</em>
              </h1>

              <p className="hm-sub hm-reveal hm-reveal-3">
                Porte d'entrée du Fouta-Djalon, Mamou vous invite à explorer ses paysages
                pittoresques, ses cascades majestueuses et sa richesse culturelle.
              </p>

              <div className="hm-cta-row hm-reveal hm-reveal-4">
                <button className="hm-btn-primary">
                  <FaInfoCircle size={12} />
                  En savoir plus
                </button>
                <a href="#about-section" className="hm-btn-ghost">
                  <FaMapMarkerAlt size={12} style={{ color: "var(--h-gold)" }} />
                  Visiter Mamou
                </a>
              </div>
            </div>

            {/* ── Scroll cue ── */}
            <div className="hm-scroll-cue">
              <span className="hm-scroll-label">Défiler</span>
              <div className="hm-scroll-line" />
            </div>
          </div>

          {/* ════ SECTIONS ════ */}
          <div id="about-section">
            <AboutSection />
          </div>
          <PopularActivity activities={activities} />
          <Banner />
          {/* <Police policeData={policeData} /> */}
          <Gallery galleryData={galleryData} />

        </div>
      </div>
    </>
  )
}

export default Home
