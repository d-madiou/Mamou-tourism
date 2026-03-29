"use client"
import {
  ArrowRight, Calendar, ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  ExternalLink, Facebook, Globe, Instagram, MapPin, Share2, TrendingUp,
  Twitter, Users, Play, Pause
} from "lucide-react"
import { useEffect, useState } from "react"
import { ThreeDot } from "react-loading-indicators"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"
import SousPrefectures from "../components/SousPrefectures"

/* ─────────────────────────────────────────────────────────
   DESIGN TOKENS  (single source of truth)
───────────────────────────────────────────────────────── */
const style = `
  :root {
    --ink:        #0f172a;
    --ink-muted:  #475569;
    --surface:    #f8fcfe;
    --surface-soft:#eef9fc;
    --brand:      #0992c2;
    --brand-dark: #086a8b;
    --brand-deep: #053f53;
    --brand-light:#d7f2f9;
    --brand-pale: #eef9fc;
    --white:      #ffffff;
    --border:     rgba(9,146,194,0.18);
    --shadow:     0 20px 50px rgba(8, 106, 139, 0.12);
  }

  /* ── Typography ─────────────────────────────────────── */
  .font-display  { font-family: 'Poppins', sans-serif; }
  .font-body     { font-family: 'Poppins', sans-serif; }

  /* ── Hero ───────────────────────────────────────────── */
  .hero-root { position: relative; min-height: 100vh; overflow: hidden; }

  .hero-slide {
    position: absolute; inset: 0;
    transition: opacity 1s ease;
  }
  .hero-slide img {
    width: 100%; height: 100%;
    object-fit: cover;
    transform: scale(1.05);
    transition: transform 8s ease;
  }
  .hero-slide.active img { transform: scale(1); }

  .hero-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(13,17,23,0.10) 0%,
      rgba(13,17,23,0.35) 50%,
      rgba(13,17,23,0.72) 100%
    );
  }

  .hero-text-block {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 0 max(5vw, 24px) clamp(48px, 8vh, 96px);
    max-width: 860px;
    z-index: 2;
  }

  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #b9ecfb;
    margin-bottom: 20px;
  }
  .hero-eyebrow::before {
    content: ''; display: block;
    width: 32px; height: 1px;
    background: var(--brand);
  }

  .hero-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(2rem, 7vw, 4rem);
    font-weight: 700; line-height: 1.0;
    color: #fff;
    margin-bottom: 28px;
    letter-spacing: -0.03em;
  }
  .hero-title em { font-style: normal; color: #F8DE22; }

  .hero-breadcrumb {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px; color: rgba(255,255,255,0.55);
    margin-bottom: 36px;
  }
  .hero-breadcrumb a { color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.2s; }
  .hero-breadcrumb a:hover { color: #99e3f6; }
  .hero-breadcrumb span.active { color: #99e3f6; }
  .hero-breadcrumb .sep { font-size: 10px; opacity: 0.4; }

  .hero-cta-row { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }

  .section-shell {
    padding: clamp(64px, 10vw, 120px) 0;
  }

  .section-head {
    max-width: 680px;
    margin-bottom: 56px;
  }

  .action-row {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    margin-top: 48px;
    align-items: center;
  }

  .faq-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: clamp(40px, 6vw, 96px);
    align-items: start;
  }

  .faq-intro {
    position: sticky;
    top: 96px;
  }

  .btn-gold {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 14px 30px;
    background: var(--brand);
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    border: none; cursor: pointer;
    border-radius: 999px;
    box-shadow: 0 14px 28px rgba(9,146,194,0.22);
    transition: background 0.25s, transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
  }
  .btn-gold:hover { background: var(--brand-dark); transform: translateY(-1px); box-shadow: 0 18px 34px rgba(9,146,194,0.28); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 13px 28px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.35); cursor: pointer;
    border-radius: 999px;
    transition: border-color 0.25s, background 0.25s, color 0.25s;
    text-decoration: none; position: relative;
  }
  .btn-ghost:hover { border-color: var(--brand); background: rgba(9,146,194,0.18); color: #fff; }

  /* ── Carousel Controls ──────────────────────────────── */
  .carousel-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.18);
    backdrop-filter: blur(12px);
    color: #fff; padding: 14px;
    cursor: pointer; transition: background 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  .carousel-nav:hover { background: rgba(255,255,255,0.18); }
  .carousel-nav.left  { left: 28px; }
  .carousel-nav.right { right: 28px; }

  .carousel-dots {
    position: absolute; bottom: 36px; right: max(5vw, 24px);
    display: flex; flex-direction: column; gap: 8px;
  }
  .dot {
    width: 2px; height: 20px;
    background: rgba(255,255,255,0.3);
    cursor: pointer; transition: background 0.3s, height 0.3s;
  }
  .dot.active { background: var(--brand); height: 36px; }

  .play-btn {
    position: absolute; bottom: 36px; left: max(5vw, 24px);
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.18);
    backdrop-filter: blur(12px);
    color: #fff; padding: 10px;
    cursor: pointer; transition: background 0.2s;
  }
  .play-btn:hover { background: rgba(255,255,255,0.18); }

  /* ── Share Menu ─────────────────────────────────────── */
  .share-dropdown {
    position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%);
    background: rgba(13,17,23,0.92);
    border: 1px solid rgba(9,146,194,0.22);
    backdrop-filter: blur(20px);
    padding: 14px 18px;
    display: flex; gap: 12px;
  }
  .share-icon {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7);
    transition: border-color 0.2s, color 0.2s;
    text-decoration: none;
  }
  .share-icon:hover { border-color: var(--brand); color: var(--brand-light); }

  /* ── Section Wrappers ───────────────────────────────── */
  .section-container {
    max-width: 1200px; margin: 0 auto;
    padding: 0 max(5vw, 24px);
  }

  .section-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 16px;
  }
  .section-eyebrow::before, .section-eyebrow::after {
    content: ''; display: block;
    width: 24px; height: 1px; background: var(--brand);
  }

  .section-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(2rem, 4vw, 3.1rem);
    font-weight: 700; line-height: 1.15;
    color: var(--ink);
    margin-bottom: 20px;
    letter-spacing: -0.03em;
  }
  .section-title em { font-style: normal; color: var(--brand); }

  .section-lead {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; line-height: 1.75;
    color: var(--ink-muted);
    max-width: 560px;
  }

  /* ── Divider ────────────────────────────────────────── */
  .gold-rule {
    display: block; width: 56px; height: 1px;
    background: var(--brand); margin: 0 auto 12px;
  }

  /* ── Tab Navigation ─────────────────────────────────── */
  .tab-row {
    display: flex; gap: 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: 40px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .tab-row::-webkit-scrollbar { display: none; }

  .tab-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 24px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ink-muted);
    background: transparent; border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: pointer; white-space: nowrap;
    transition: color 0.2s, border-color 0.2s;
  }
  .tab-btn:hover { color: var(--brand); }
  .tab-btn.active { color: var(--brand-dark); border-bottom-color: var(--brand); }
  .tab-btn svg { opacity: 0.7; }
  .tab-btn.active svg { opacity: 1; }

  /* ── Tab Content ────────────────────────────────────── */
  .tab-content-panel {
    animation: panelFadeIn 0.45s ease;
  }
  @keyframes panelFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .prose-body p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; line-height: 1.85;
    color: var(--ink-muted);
    margin-bottom: 20px;
  }

  /* ── Stat Strip ─────────────────────────────────────── */
  .stat-strip {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 28px;
    overflow: hidden;
    background: #fff;
    box-shadow: var(--shadow);
    margin-top: 48px;
  }
  .stat-cell {
    padding: 32px 28px;
    border-right: 1px solid var(--border);
    text-align: center;
  }
  .stat-cell:last-child { border-right: none; }
  .stat-num {
    font-family: 'Poppins', sans-serif;
    font-size: 2.4rem; font-weight: 700;
    color: var(--brand-dark); line-height: 1;
    margin-bottom: 6px;
  }
  .stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink-muted);
  }

  /* ── Map Section ────────────────────────────────────── */
  .map-wrapper {
    display: grid; grid-template-columns: 1fr 1.4fr;
    border: 1px solid var(--border);
    border-radius: 28px;
    overflow: hidden;
    background: #fff;
    box-shadow: var(--shadow);
  }
  @media (max-width: 768px) {
    .map-wrapper { grid-template-columns: 1fr; }
    .stat-strip  { grid-template-columns: 1fr; }
    .stat-cell   { border-right: none; border-bottom: 1px solid var(--border); }
    .stat-cell:last-child { border-bottom: none; }
  }

  .map-info-panel {
    background: linear-gradient(135deg, var(--brand-dark), var(--brand));
    padding: clamp(36px, 5vw, 64px);
    display: flex; flex-direction: column; justify-content: center;
    position: relative; overflow: hidden;
  }
  .map-info-panel::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px;
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 50%;
  }
  .map-info-panel::after {
    content: '';
    position: absolute; bottom: -80px; left: -40px;
    width: 260px; height: 260px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 50%;
  }

  .map-info-panel .section-eyebrow { color: #dff7fd; }
  .map-info-panel .section-eyebrow::before,
  .map-info-panel .section-eyebrow::after { background: #dff7fd; }
  .map-info-panel h2 {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; line-height: 1.2;
    color: #fff; margin-bottom: 16px;
    letter-spacing: -0.03em;
  }
  .map-info-panel p {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; line-height: 1.75;
    color: rgba(255,255,255,0.82); margin-bottom: 32px;
  }

  /* ── FAQ ────────────────────────────────────────────── */
  .faq-item {
    border-bottom: 1px solid var(--border);
  }
  .faq-item:first-child { border-top: 1px solid var(--border); }

  .faq-trigger {
    width: 100%; padding: 24px 0;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: transparent; border: none; cursor: pointer; text-align: left;
  }
  .faq-q {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink);
    transition: color 0.2s;
  }
  .faq-trigger:hover .faq-q { color: var(--brand); }

  .faq-icon {
    flex-shrink: 0; width: 28px; height: 28px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s, background 0.2s;
  }
  .faq-trigger:hover .faq-icon,
  .faq-item.open .faq-icon { border-color: var(--brand); background: var(--brand-pale); }

  .faq-body {
    max-height: 0; overflow: hidden;
    transition: max-height 0.35s ease, opacity 0.3s;
    opacity: 0;
  }
  .faq-item.open .faq-body { max-height: 240px; opacity: 1; }
  .faq-body p {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; line-height: 1.8;
    color: var(--ink-muted);
    padding-bottom: 24px;
  }

  /* ── Scroll-to-top ──────────────────────────────────── */
  .scroll-top-btn {
    position: fixed; bottom: 36px; right: 36px;
    width: 44px; height: 44px;
    background: var(--brand-dark);
    border: 1px solid var(--border);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 100;
    transition: background 0.2s;
  }
  .scroll-top-btn:hover { background: var(--brand); color: #fff; }

  /* ── Action Link ────────────────────────────────────── */
  .text-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--brand); text-decoration: none;
    border-bottom: 1px solid var(--border);
    padding-bottom: 2px;
    transition: border-color 0.2s, color 0.2s;
  }
  .text-link:hover { border-color: var(--brand); color: var(--brand-dark); }

  /* ── Loading / Error ────────────────────────────────── */
  .full-screen-state {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--surface);
  }
  .state-card {
    background: #fff; border: 1px solid var(--border);
    padding: 48px 56px; text-align: center; max-width: 440px; width: 90%;
    border-radius: 28px;
    box-shadow: var(--shadow);
  }
  .state-card h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem; font-weight: 700; color: var(--ink);
    margin: 16px 0 10px;
  }
  .state-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; color: var(--ink-muted);
    margin-bottom: 28px;
  }
  .state-card .btn-gold { margin: 0 auto; }

  /* ── Responsive tweaks ──────────────────────────────── */
  @media (max-width: 900px) {
    .faq-layout {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .faq-intro {
      position: static;
      top: auto;
    }
  }

  @media (max-width: 640px) {
    .hero-root {
      min-height: 760px;
      height: auto;
    }

    .hero-text-block {
      max-width: 100%;
      padding: 0 20px 112px;
    }

    .hero-eyebrow {
      font-size: 10px;
      letter-spacing: 0.14em;
      margin-bottom: 14px;
    }

    .hero-title {
      font-size: clamp(2.2rem, 12vw, 3.6rem);
      margin-bottom: 18px;
    }

    .hero-breadcrumb {
      flex-wrap: wrap;
      row-gap: 6px;
      margin-bottom: 24px;
      font-size: 11px;
    }

    .hero-cta-row {
      gap: 12px;
      width: 100%;
    }

    .hero-cta-row > * {
      width: 100%;
    }

    .btn-gold,
    .btn-ghost {
      width: 100%;
      justify-content: center;
      padding: 13px 18px;
      font-size: 11px;
    }

    .share-dropdown {
      left: 0;
      right: 0;
      bottom: calc(100% + 10px);
      transform: none;
      justify-content: center;
      padding: 12px;
    }

    .carousel-nav { padding: 10px; top: auto; bottom: 28px; transform: none; }
    .carousel-nav.left  { left: 12px; }
    .carousel-nav.right { right: 12px; }

    .carousel-dots {
      right: 50%;
      bottom: 30px;
      transform: translateX(50%);
      flex-direction: row;
      align-items: center;
    }

    .dot {
      width: 18px;
      height: 3px;
    }

    .dot.active {
      width: 32px;
      height: 3px;
    }

    .play-btn {
      left: auto;
      right: 12px;
      bottom: 72px;
    }

    .section-shell {
      padding: 56px 0;
    }

    .section-head {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: clamp(1.7rem, 8vw, 2.3rem);
      margin-bottom: 14px;
    }

    .section-lead,
    .prose-body p {
      font-size: 15px;
      line-height: 1.75;
    }

    .tab-row {
      margin-bottom: 28px;
      padding-bottom: 4px;
    }

    .tab-btn {
      padding: 12px 16px;
      font-size: 11px;
    }

    .action-row {
      gap: 16px;
      margin-top: 32px;
      align-items: stretch;
    }

    .action-row > * {
      width: 100%;
    }

    .text-link {
      justify-content: center;
      width: 100%;
      padding-top: 12px;
      border-top: 1px solid var(--border);
      border-bottom: none;
    }

    .map-wrapper,
    .stat-strip,
    .state-card {
      border-radius: 20px;
    }

    .map-info-panel {
      padding: 28px 20px;
    }

    .faq-trigger {
      padding: 18px 0;
      align-items: flex-start;
    }

    .faq-q {
      font-size: 14px;
      line-height: 1.6;
    }

    .scroll-top-btn {
      right: 16px;
      bottom: 16px;
    }
  }
`

const About = ({ loading, error, abouts, sousPrefectures }) => {
  const [activeTab, setActiveTab] = useState("histoire")
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const [openFAQItems, setOpenFAQItems] = useState(new Set([0]))

  const tabs = [
    { id: "histoire", label: "Histoire",  icon: Calendar   },
    { id: "culture",  label: "Culture",   icon: Globe      },
    { id: "economie", label: "Économie",  icon: TrendingUp },
    { id: "tourisme", label: "Tourisme",  icon: Users      },
  ]

  const faqs = [
    {
      question: "Quelle est la meilleure période pour visiter?",
      answer: "La saison sèche, de novembre à avril, offre un climat agréable avec des températures modérées et peu de précipitations, idéal pour explorer la région."
    },
    {
      question: "Comment se rendre à Mamou depuis Conakry?",
      answer: "Plusieurs options s'offrent à vous : par route nationale via taxi-brousse ou bus (4–5 heures), ou par transport privé pour plus de confort."
    },
    {
      question: "Quelles sont les spécialités culinaires locales?",
      answer: "Découvrez nos délicieuses spécialités : riz à la sauce arachide, fouti traditionnel, viandes grillées aux épices locales, et fruits frais de saison."
    },
    {
      question: "Quels types d'hébergements sont disponibles?",
      answer: "Une gamme variée d'options : hôtels modernes avec toutes commodités, gîtes traditionnels authentiques, et maisons d'hôtes familiales chaleureuses."
    },
  ]

  const primaryAbout = abouts?.[0] || null
  const carouselImages = primaryAbout?.aboutImage || []

  /* ── Carousel auto-play ─────────────────────────────── */
  useEffect(() => {
    if (!isPlaying || carouselImages.length <= 1) return
    const t = setInterval(() => {
      setCurrentIndex(i => (i === carouselImages.length - 1 ? 0 : i + 1))
    }, 5000)
    return () => clearInterval(t)
  }, [isPlaying, carouselImages.length])

  const goToSlide   = i  => setCurrentIndex(i)
  const goToPrevious = () => setCurrentIndex(i => (i === 0 ? carouselImages.length - 1 : i - 1))
  const goToNext     = () => setCurrentIndex(i => (i === carouselImages.length - 1 ? 0 : i + 1))
  const togglePlay   = ()  => setIsPlaying(p => !p)

  /* ── FAQ toggle ─────────────────────────────────────── */
  const toggleFAQItem = idx => {
    const next = new Set(openFAQItems)
    next.has(idx) ? next.delete(idx) : next.add(idx)
    setOpenFAQItems(next)
  }

  /* ── Scroll behaviours ──────────────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0)
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  /* ── Tab content ────────────────────────────────────── */
  const getTabContent = tabId => {
    if (tabId === 'histoire') {
      return abouts.map((about, i) => (
        <div key={i} className="prose-body">
          {(about.aboutText || []).map((textItem, j) => (
            <p key={j}>
              {(textItem.children || []).map((child, k) => (
                <span key={k}>{child.text}</span>
              ))}
            </p>
          ))}
        </div>
      ))
    }
    const staticContent = {
      culture: [
        "Culture riche et diversifiée avec musique, danse et artisanat traditionnel qui reflètent l'identité unique de notre région.",
        "Festivals culturels organisés tout au long de l'année pour préserver et célébrer notre patrimoine ancestral.",
      ],
      economie: [
        "Économie dynamique basée sur l'agriculture durable, l'élevage moderne et le commerce équitable.",
        "Développement continu des infrastructures et création d'opportunités d'emploi pour la jeunesse.",
      ],
      tourisme: [
        "Attractions touristiques exceptionnelles : paysages montagneux, cascades cristallines et patrimoine naturel préservé.",
        "Artisanat local authentique, cuisine traditionnelle savoureuse et festivités culturelles tout au long de l'année.",
      ],
    }
    return (
      <div className="prose-body">
        {(staticContent[tabId] || []).map((p, i) => <p key={i}>{p}</p>)}
      </div>
    )
  }

  /* ─────────────────── STATES ──────────────────────── */
  if (loading) return (
    <div className="full-screen-state font-body">
      <style>{style}</style>
      <div className="state-card">
        <ThreeDot variant="pulsate" color="#F8DE22" size="medium" text="Chargement…" textColor="#F8DE22" />
      </div>
    </div>
  )

  if (error) return (
    <div className="full-screen-state font-body">
      <style>{style}</style>
      <div className="state-card">
        <div style={{ fontSize: 48, marginBottom: 8 }}>✦</div>
        <h2>Une erreur s'est produite</h2>
        <p>Impossible de charger les données. Veuillez réessayer.</p>
        <button className="btn-gold" onClick={() => window.location.reload()}>
          Réessayer
        </button>
      </div>
    </div>
  )

  if (!abouts?.length) return (
    <div className="full-screen-state font-body">
      <style>{style}</style>
      <div className="state-card">
        <div style={{ fontSize: 48, marginBottom: 8 }}>○</div>
        <h2>Aucune donnée disponible</h2>
        <p>Les informations ne sont pas encore disponibles.</p>
        <button className="btn-gold" onClick={() => window.history.back()}>
          Retour
        </button>
      </div>
    </div>
  )

  /* ─────────────────── MAIN RENDER ─────────────────── */
  return (
    <div className="font-body" style={{ minHeight: '100vh', background: 'var(--surface)', color: 'var(--ink)' }}>
      <style>{style}</style>

      <Helmet>
        <title>À Propos de Mamou | Ville de Mamou</title>
        <meta name="description" content="Explorez l'histoire, la culture, l'économie et les sous-préfectures de Mamou avec des informations locales fiables." />
      </Helmet>

      <NavBar />

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero-root">
        {carouselImages.map((image, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
            style={{ opacity: idx === currentIndex ? 1 : 0 }}
          >
            <img
              src={image.url.startsWith("http") ? image.url : `https://api.villedemamou.org${image.url}`}
              alt={image.alternativeText || `Slide ${idx + 1}`}
            />
          </div>
        ))}

        <div className="hero-scrim" />

        {/* Bottom-anchored title block */}
        <div className="hero-text-block">
          <p className="hero-eyebrow">Préfecture de Guinée</p>
          <h1 className="hero-title font-display">
            {primaryAbout?.aboutTitle
              ? <>{primaryAbout.aboutTitle.split(' ')[0]} <em>{primaryAbout.aboutTitle.split(' ').slice(1).join(' ')}</em></>
              : <>À <em>propos</em></>}
          </h1>

          <nav className="hero-breadcrumb">
            <Link to="/">Accueil</Link>
            <span className="sep">›</span>
            <Link to="/about">À propos</Link>
            <span className="sep">›</span>
            <span className="active">Découverte</span>
          </nav>

          <div className="hero-cta-row">
            <div style={{ position: 'relative' }}>
              <button className="btn-ghost" onClick={() => setShowShareMenu(v => !v)}>
                <Share2 size={14} /> Partager
              </button>
              {showShareMenu && (
                <div className="share-dropdown">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="share-icon"><Facebook size={15} /></a>
                  <a href="https://twitter.com"  target="_blank" rel="noreferrer" className="share-icon"><Twitter  size={15} /></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="share-icon"><Instagram size={15} /></a>
                </div>
              )}
            </div>
            <a href="#content-section" className="btn-gold">
              <ArrowRight size={14} /> Découvrir
            </a>
          </div>
        </div>

        {/* Carousel controls — only when multiple images */}
        {carouselImages.length > 1 && (
          <>
            <button className="carousel-nav left"  onClick={goToPrevious} aria-label="Précédent"><ChevronLeft  size={20} /></button>
            <button className="carousel-nav right" onClick={goToNext}     aria-label="Suivant"><ChevronRight size={20} /></button>

            <div className="carousel-dots">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Diapositive ${idx + 1}`}
                />
              ))}
            </div>

            <button className="play-btn" onClick={togglePlay} aria-label="Lecture/Pause">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </>
        )}
      </section>

      {/* ══════════════ CONTENT ══════════════ */}
      <main id="content-section">

        {/* ── About / Tabs ─────────────────────────── */}
        <section className="section-shell">
          <div className="section-container">
            <div className="section-head">
              <p className="section-eyebrow">Notre Identité</p>
              <h2 className="section-title font-display">
                Découvrez Notre <em>Histoire</em>
              </h2>
              <p className="section-lead">
                Une ville façonnée par les siècles, portée par la culture et ouverte sur l'avenir — bienvenue à Mamou.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="tab-row">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="tab-content-panel" key={activeTab} style={{ maxWidth: 760 }}>
              {getTabContent(activeTab)}
            </div>

            {/* Stats */}
            <div className="stat-strip">
              {[
                { num: '12',   label: 'Sous-préfectures' },
                { num: '400K', label: 'Habitants'         },
                { num: '1908', label: 'Année de fondation' },
              ].map((s, i) => (
                <div className="stat-cell" key={i}>
                  <div className="stat-num font-display">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="action-row">
              <a href="#diwal-section" className="btn-gold">
                <MapPin size={14} /> Explorer les sous-préfectures
              </a>
              <button className="text-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <ExternalLink size={13} /> Plus de détails
              </button>
            </div>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────── */}
        <div style={{ borderTop: '1px solid var(--border)', margin: '0 max(5vw, 24px)' }} />

        {/* ── Sous-préfectures ─────────────────────── */}
        <section id="diwal-section" className="section-shell">
          <div className="section-container">
            <div className="section-head" style={{ maxWidth: 640 }}>
              <p className="section-eyebrow">Territoire</p>
              <h2 className="section-title font-display">
                Nos <em>Sous-Préfectures</em>
              </h2>
            </div>
            <SousPrefectures sousPrefectures={sousPrefectures} />
          </div>
        </section>

        {/* ── Divider ──────────────────────────────── */}
        <div style={{ borderTop: '1px solid var(--border)', margin: '0 max(5vw, 24px)' }} />

        {/* ── Map ──────────────────────────────────── */}
        <section className="section-shell">
          <div className="section-container">
            <div className="section-head" style={{ maxWidth: 560, marginBottom: 48 }}>
              <p className="section-eyebrow">Localisation</p>
              <h2 className="section-title font-display">
                Situez <em>Mamou</em> sur la carte
              </h2>
            </div>
            <div className="map-wrapper">
              <div className="map-info-panel">
                <p className="section-eyebrow">Carte interactive</p>
                <h2>Trouvez votre chemin vers Mamou</h2>
                <p>
                  Retrouvez la ville de Mamou et utilisez Google Maps pour préparer
                  votre trajet, explorer les environs ou partager la position exacte.
                </p>
                <a
                  href="https://www.google.com/maps?q=Mamou,+Guinea"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                  style={{ alignSelf: 'flex-start' }}
                >
                  <ExternalLink size={14} /> Ouvrir dans Google Maps
                </a>
              </div>
              <div style={{ minHeight: 400 }}>
                <iframe
                  title="Carte de Mamou"
                  src="https://www.google.com/maps?q=Mamou,+Guinea&z=12&output=embed"
                  style={{ width: '100%', height: '100%', minHeight: 400, border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────── */}
        <div style={{ borderTop: '1px solid var(--border)', margin: '0 max(5vw, 24px)' }} />

        {/* ── FAQ ──────────────────────────────────── */}
        <section className="section-shell">
          <div className="section-container">
            <div className="faq-layout">
              <div className="faq-intro">
                <p className="section-eyebrow">Informations</p>
                <h2 className="section-title font-display">
                  Questions <em>Fréquentes</em>
                </h2>
                <p className="section-lead" style={{ fontSize: 14 }}>
                  Tout ce que vous devez savoir avant de planifier votre visite à Mamou.
                </p>
              </div>
              <div>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`faq-item ${openFAQItems.has(idx) ? 'open' : ''}`}>
                    <button className="faq-trigger" onClick={() => toggleFAQItem(idx)}>
                      <span className="faq-q">{faq.question}</span>
                      <span className="faq-icon">
                        {openFAQItems.has(idx)
                          ? <ChevronUp  size={14} style={{ color: 'var(--brand)' }} />
                          : <ChevronDown size={14} style={{ color: 'var(--ink-muted)' }} />}
                      </span>
                    </button>
                    <div className="faq-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Scroll to Top ────────────────────────────── */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Haut de page">
          <ChevronUp size={18} />
        </button>
      )}
    </div>
  )
}

export default About
