"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, } from "lucide-react"
import { Link } from "react-router-dom"
import {
  FaAward,
  FaCheckSquare,
  FaGlobe,
  FaInfoCircle,
  FaLeaf,
  FaStar,
  FaUsers,
} from "react-icons/fa"
import { FaStarHalfStroke } from "react-icons/fa6"
import About1 from "../assets/images/About1.png"
import About2 from "../assets/images/About2.png"
import About3 from "../assets/images/About3.png"
import { Highlight, Logos } from "../assets/mockData"

const CSS = `
  :root {
    --as-navy: #053f53;
    --as-cobalt: #0992c2;
    --as-cobalt-dark: #086a8b;
    --as-cobalt-pale: #eef9fc;
    --as-surface: #f8fcfe;
    --as-white: #ffffff;
    --as-ink: #0f172a;
    --as-ink-mid: #475569;
    --as-ink-light: #64748b;
    --as-border: #d7e9ef;
    --as-green: #15803d;
    --as-shadow: 0 16px 42px rgba(8, 106, 139, 0.14);
  }

  .as-root {
    font-family: "Poppins", system-ui, sans-serif;
    color: var(--as-ink);
  }

  .as-section {
    background: var(--as-white);
    padding: clamp(72px, 10vw, 120px) max(5vw, 24px);
    position: relative;
    margin-top: -40px;
  }

  .as-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .as-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--as-cobalt);
    margin-bottom: 16px;
  }
  .as-eyebrow::before {
    content: "";
    width: 24px;
    height: 1px;
    background: currentColor;
  }

  .as-headline {
    font-family: "Poppins", sans-serif;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 700;
    line-height: 1.12;
    color: var(--as-ink);
    margin-bottom: 20px;
    letter-spacing: -0.03em;
  }
  .as-headline em {
    font-style: normal;
    color: var(--as-cobalt);
  }
  .as-headline strong {
    font-weight: 700;
  }

  .as-body {
    font-size: 15px;
    line-height: 1.85;
    color: var(--as-ink-mid);
    margin-bottom: 36px;
    max-width: 520px;
  }

  .as-intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 96px);
    align-items: center;
    margin-bottom: clamp(72px, 10vw, 120px);
  }

  .as-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--as-border);
    margin-bottom: 36px;
    border-radius: 24px;
    overflow: hidden;
    background: var(--as-white);
    box-shadow: var(--as-shadow);
  }
  .as-stat {
    padding: 20px 22px;
    border-right: 1px solid var(--as-border);
    border-bottom: 1px solid var(--as-border);
  }
  .as-stat:nth-child(2n) {
    border-right: none;
  }
  .as-stat:nth-last-child(-n + 2) {
    border-bottom: none;
  }

  .as-stat-val {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    color: var(--as-cobalt-dark);
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .as-stat-icon {
    color: var(--as-cobalt);
    font-size: 1rem;
  }
  .as-stat-label {
    font-size: 11px;
    color: var(--as-ink-light);
    font-weight: 500;
    letter-spacing: 0.05em;
  }

  .as-stars {
    display: flex;
    gap: 3px;
    color: var(--as-cobalt);
    font-size: 1.1rem;
    margin-bottom: 4px;
  }

  .as-btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: var(--as-cobalt);
    color: var(--as-white);
    font-family: "Poppins", sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: none;
    padding: 14px 28px;
    cursor: pointer;
    border-radius: 999px;
    box-shadow: 0 14px 30px rgba(9, 146, 194, 0.2);
    transition: background 0.22s, transform 0.18s;
  }
  .as-btn:hover {
    background: var(--as-cobalt-dark);
    transform: translateY(-1px);
  }

  .as-photo-col {
    position: relative;
    height: 540px;
  }
  .as-photo-main,
  .as-photo-secondary,
  .as-photo-bottom {
    border: 3px solid var(--as-white);
    box-shadow: var(--as-shadow);
    display: block;
    object-fit: cover;
    border-radius: 24px;
  }
  .as-photo-main {
    position: absolute;
    top: 0;
    left: 0;
    width: 68%;
    aspect-ratio: 4 / 3;
  }
  .as-photo-secondary {
    position: absolute;
    top: 28%;
    right: 0;
    width: 58%;
    aspect-ratio: 4 / 3;
    z-index: 2;
  }
  .as-photo-bottom {
    position: absolute;
    bottom: 0;
    left: 22%;
    width: 66%;
    aspect-ratio: 16 / 7;
    z-index: 1;
  }

  .as-float-card {
    position: absolute;
    top: 46%;
    left: 36%;
    background: var(--as-navy);
    padding: 16px 20px;
    z-index: 10;
    border-left: 3px solid var(--as-cobalt);
    box-shadow: 0 16px 40px rgba(8, 106, 139, 0.22);
    border-radius: 18px;
  }
  .as-float-card-icon {
    color: #99e3f6;
    font-size: 1.1rem;
    margin-bottom: 6px;
  }
  .as-float-card-text {
    font-size: 12px;
    font-weight: 600;
    color: var(--as-white);
    letter-spacing: 0.04em;
    line-height: 1.4;
    white-space: nowrap;
  }

  .as-mobile-carousel {
    display: none;
    margin-bottom: 40px;
  }
  .as-mobile-stage {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--as-shadow);
    background: var(--as-white);
    border: 1px solid var(--as-border);
  }
  .as-mobile-slide {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    display: block;
  }
  .as-mobile-overlay {
    position: absolute;
    inset: auto 0 0 0;
    padding: 18px 18px 16px;
    background: linear-gradient(to top, rgba(5, 63, 83, 0.85), rgba(5, 63, 83, 0));
  }
  .as-mobile-caption {
    color: #fff;
    font-size: 13px;
    font-weight: 600;
  }
  .as-mobile-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    background: rgba(5, 63, 83, 0.55);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
  }
  .as-mobile-nav.prev {
    left: 12px;
  }
  .as-mobile-nav.next {
    right: 12px;
  }
  .as-mobile-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }
  .as-mobile-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    border: none;
    background: #cbd5e1;
    cursor: pointer;
    transition: all 0.2s;
  }
  .as-mobile-dot.active {
    width: 28px;
    background: var(--as-cobalt);
  }

  .as-pres-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 96px);
    align-items: start;
  }

  .as-highlights {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--as-border);
    border: 1px solid var(--as-border);
    border-radius: 24px;
    overflow: hidden;
  }
  .as-highlight-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 18px 16px;
    background: var(--as-white);
    transition: background 0.18s;
  }
  .as-highlight-item:hover {
    background: var(--as-gold-pale);
  }
  .as-highlight-check {
    color: var(--as-cobalt);
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .as-highlight-text {
    font-size: 13px;
    line-height: 1.65;
    color: var(--as-ink-mid);
  }

  .as-partners {
    background: linear-gradient(135deg, var(--as-cobalt-dark), var(--as-navy));
    padding: 32px max(5vw, 24px);
    position: relative;
    overflow: hidden;
  }
  .as-partners::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--as-cobalt), transparent);
  }
  .as-partners-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
    align-items: center;
  }
  .as-partner-item {
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0.92;
    transition: transform 0.2s, opacity 0.2s;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(223, 247, 253, 0.15);
    border-radius: 18px;
    padding: 12px 16px;
  }
  .as-partner-item:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
  .as-partner-item img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    background: #fff;
    border-radius: 12px;
    padding: 4px;
  }
  .as-partner-name {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--as-white);
    white-space: nowrap;
  }

  .as-rule {
    border: none;
    border-top: 1px solid var(--as-border);
    margin: 0 0 clamp(56px, 8vw, 96px) 0;
  }

  @media (max-width: 900px) {
    .as-intro-grid {
      grid-template-columns: 1fr;
    }
    .as-photo-col {
      display: none;
    }
    .as-mobile-carousel {
      display: block;
    }
    .as-pres-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .as-section {
      padding: 56px 20px 72px;
      margin-top: -20px;
    }
    .as-headline {
      font-size: clamp(1.8rem, 8vw, 2.5rem);
    }
    .as-body {
      font-size: 14px;
      line-height: 1.75;
    }
    .as-stats {
      grid-template-columns: 1fr;
    }
    .as-stat {
      border-right: none;
    }
    .as-stat:not(:last-child) {
      border-bottom: 1px solid var(--as-border);
    }
    .as-stat:nth-last-child(-n + 2) {
      border-bottom: 1px solid var(--as-border);
    }
    .as-stat:last-child {
      border-bottom: none;
    }
    .as-btn {
      width: 100%;
      justify-content: center;
    }
    .as-highlights {
      grid-template-columns: 1fr;
    }
    .as-partners-inner {
      gap: 14px;
    }
    .as-partner-item {
      width: calc(50% - 8px);
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 14px 10px;
    }
    .as-partner-name {
      font-size: 11px;
      letter-spacing: 0.04em;
      white-space: normal;
    }
  }

  @media (max-width: 420px) {
    .as-partner-item {
      width: 100%;
    }
  }
`

function AboutSection() {
  const [mobileIndex, setMobileIndex] = useState(0)

  const mobileImages = [
    { src: About1, alt: "Vue de Mamou — Paysage naturel", label: "Paysages naturels de Mamou" },
    { src: About3, alt: "Culture locale de Mamou", label: "Culture locale et traditions" },
    { src: About2, alt: "Traditions de Mamou", label: "Traditions et patrimoine" },
  ]

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)")
    if (!mediaQuery.matches) return undefined

    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % mobileImages.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [mobileImages.length])

  const goPrev = () => setMobileIndex((prev) => (prev === 0 ? mobileImages.length - 1 : prev - 1))
  const goNext = () => setMobileIndex((prev) => (prev === mobileImages.length - 1 ? 0 : prev + 1))

  return (
    <div className="as-root">
      <style>{CSS}</style>

      <div className="as-section" id="about-content">
        <div className="as-container">
          <div className="as-intro-grid">
            <div>
              <p className="as-eyebrow">À propos de Mamou</p>

              <h2 className="as-headline">
                Une ville <em>carrefour</em>
                <br />
                <strong>au cœur de la Guinée</strong>
              </h2>

              <p className="as-body">
                Située au cœur de la Guinée, Mamou est la porte d&apos;entrée et le principal
                carrefour du Fouta-Djalon, reliant la Basse-Guinée à la Haute-Guinée, la
                Guinée forestière et même la Sierra Leone. Son emplacement stratégique en
                fait un centre névralgique pour le commerce et les échanges culturels.
              </p>

              <div className="as-mobile-carousel">
                <div className="as-mobile-stage">
                  <img
                    src={mobileImages[mobileIndex].src || "/placeholder.svg"}
                    alt={mobileImages[mobileIndex].alt}
                    className="as-mobile-slide"
                  />
                  <div className="as-mobile-overlay">
                    <p className="as-mobile-caption">{mobileImages[mobileIndex].label}</p>
                  </div>
                  <button className="as-mobile-nav prev" onClick={goPrev} aria-label="Image précédente">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="as-mobile-nav next" onClick={goNext} aria-label="Image suivante">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="as-mobile-dots">
                  {mobileImages.map((_, index) => (
                    <button
                      key={index}
                      className={`as-mobile-dot${mobileIndex === index ? " active" : ""}`}
                      onClick={() => setMobileIndex(index)}
                      aria-label={`Voir l'image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="as-stats">
                <div className="as-stat">
                  <div className="as-stat-val">
                    <FaUsers className="as-stat-icon" size={16} />
                    10 000+
                  </div>
                  <p className="as-stat-label">Visiteurs annuels</p>
                </div>
                <div className="as-stat">
                  <div className="as-stat-val">
                    <FaGlobe className="as-stat-icon" size={16} />
                    90 %
                  </div>
                  <p className="as-stat-label">Taux de satisfaction</p>
                </div>
                <div className="as-stat">
                  <div className="as-stat-val">
                    <FaAward className="as-stat-icon" size={16} />
                    Top 3
                  </div>
                  <p className="as-stat-label">Destination touristique Guinee</p>
                </div>
                <div className="as-stat">
                  <div className="as-stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfStroke />
                  </div>
                  <p className="as-stat-label">Note des visiteurs</p>
                </div>
              </div>

              <Link to="/about" className="as-btn">
                <FaInfoCircle size={12} />
                En savoir plus
              </Link>

            </div>

            <div className="as-photo-col">
              <img
                src={About1 || "/placeholder.svg"}
                alt="Vue de Mamou — Paysage naturel"
                className="as-photo-main"
              />
              <img
                src={About3 || "/placeholder.svg"}
                alt="Culture locale de Mamou"
                className="as-photo-secondary"
              />
              <img
                src={About2 || "/placeholder.svg"}
                alt="Traditions de Mamou"
                className="as-photo-bottom"
              />
              <div className="as-float-card">
                <div className="as-float-card-icon">
                  <FaLeaf />
                </div>
                <p className="as-float-card-text">
                  Notre Culture,
                  <br />
                  notre Identité
                </p>
              </div>
            </div>
          </div>

          <hr className="as-rule" />

          <div className="as-pres-grid">
            <div>
              <p className="as-eyebrow">Présentation</p>
              <h2 className="as-headline">
                Mamou, <em>ville</em> historique
                <br />
                <strong>du Fouta-Djalon</strong>
              </h2>
              <p className="as-body" style={{ marginBottom: 0 }}>
                Mamou est une ville de la Moyenne-Guinée, à environ 250 km au nord-est de
                Conakry. Créée en 1908 pour accueillir une gare sur la ligne Conakry-Niger,
                elle est devenue une «ville-carrefour» à l&apos;intersection de plusieurs routes
                et influences culturelles. Chef-lieu de la préfecture et de la région de
                Mamou, elle reste le cœur battant du Fouta-Djalon.
              </p>
            </div>

            <div>
              <div className="as-highlights">
                {Highlight.map((item, index) => (
                  <div key={index} className="as-highlight-item">
                    <FaCheckSquare className="as-highlight-check" />
                    <p className="as-highlight-text">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="as-partners">
        <div className="as-partners-inner">
          {Logos.map((logo, index) => (
            <div key={index} className="as-partner-item">
              <img src={logo.logo || "/placeholder.svg"} alt={`Logo ${logo.name}`} />
              <p className="as-partner-name">{logo.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutSection
