"use client";

import React, { useState, useEffect } from "react";
import {
  AlertCircle, BookOpen, Calendar, Clock, MapPin,
  Search, User, Users, Phone, Mail,
  GraduationCap, School, Home, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NavBar from "../components/NavBar";
import { toMediaUrl } from "../config/api";

/* ─────────────────────────────────────────────────
   DESIGN SYSTEM — Education Edition
   Font: Poppins (display + body, as per site standard)
   Tone: civic institution meets aspirational learning —
         warm, trustworthy, optimistic
───────────────────────────────────────────────── */

const carouselImages = [
  "https://i.pinimg.com/1200x/63/10/1c/63101c87d3b3c0dea31484127f093a83.jpg",
  "https://international.blog.snes.edu/wp-content/uploads/sites/6/2019/05/guinee_2-scaled.jpg",
  "https://www.lerevelateur224.com/wp-content/uploads/2024/06/IMG-20240622-WA0018.jpg",
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');

  :root {
    --ed-navy:       #053f53;
    --ed-cobalt:     #0992c2;
    --ed-cobalt-dark:#086a8b;
    --ed-gold:       #fbbf24;
    --ed-gold-pale:  #fef3c7;
    --ed-gold-dim:   rgba(251,191,36,0.14);
    --ed-teal:       #087ea7;
    --ed-surface:    #ffffff;
    --ed-surface-2:  #ffffff;
    --ed-white:      #ffffff;
    --ed-ink:        #053f53;
    --ed-ink-mid:    #086a8b;
    --ed-ink-light:  #43bfd8;
    --ed-border:     #afe5f2;
    --ed-green:      #087ea7;
  }

  /* ── Root ───────────────────────────────────── */
  .ed-root {
    min-height: 100vh;
    background: var(--ed-surface);
    font-family: 'Poppins', system-ui, sans-serif;
    color: var(--ed-ink);
  }
  .ed-root * { box-sizing: border-box; }

  /* ── Hero ───────────────────────────────────── */
  .ed-hero {
    position: relative;
    min-height: clamp(500px, 70vh, 680px);
    overflow: hidden;
    display: flex; align-items: flex-end;
    padding-bottom: clamp(52px, 9vh, 96px);
  }
  .ed-hero-slide {
    position: absolute; inset: 0;
    transition: opacity 1.3s ease;
  }
  .ed-hero-slide img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: saturate(0.72) brightness(0.82);
    transform: scale(1.04);
    transition: transform 12s ease;
  }
  .ed-hero-slide.active img { transform: scale(1); }

  .ed-hero-scrim {
    position: absolute; inset: 0;
    background:
      linear-gradient(to top,   rgba(12,27,51,0.96) 0%,  rgba(12,27,51,0.0) 55%),
      linear-gradient(to bottom,rgba(12,27,51,0.50) 0%,  rgba(12,27,51,0.0) 35%),
      linear-gradient(to right, rgba(12,27,51,0.45) 0%,  rgba(12,27,51,0.0) 58%);
  }
  .ed-hero-lines {
    position: absolute; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px);
  }
  /* Gold left accent */
  .ed-hero-bar {
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(to bottom, transparent, var(--ed-gold) 35%, var(--ed-gold) 65%, transparent);
  }

  .ed-hero-inner {
    position: relative; z-index: 5;
    max-width: 1200px; margin: 0 auto;
    padding: 0 max(6vw, 28px); width: 100%;
  }
  .ed-breadcrumb {
    display: flex; align-items: center; gap: 7px;
    font-size: 11px; color: rgba(255,255,255,0.38); margin-bottom: 22px;
  }
  .ed-breadcrumb a { color: inherit; text-decoration: none; transition: color .2s; }
  .ed-breadcrumb a:hover { color: var(--ed-gold); }
  .ed-breadcrumb .cur { color: rgba(255,255,255,0.65); font-weight: 600; }

  .ed-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--ed-gold); margin-bottom: 16px;
  }
  .ed-hero-eyebrow::before { content:''; width:22px; height:1px; background:currentColor; }

  .ed-hero-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(2.4rem, 7vw, 5.4rem);
    font-weight: 800; line-height: 1.05; color: #fff;
    margin-bottom: 18px; letter-spacing: -0.01em;
  }
  .ed-hero-title .gold { color: var(--ed-gold); font-weight: 300; font-style: italic; }

  .ed-hero-sub {
    font-size: 15px; line-height: 1.75;
    color: rgba(255,255,255,0.55); max-width: 480px; margin-bottom: 32px;
  }
  .ed-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }

  .ed-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--ed-gold); color: var(--ed-navy);
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    border: none; padding: 14px 26px; cursor: pointer; transition: background .2s;
  }
  .ed-btn-primary:hover { background: #f59e0b; }

  .ed-btn-ghost {
    display: inline-flex; align-items: center; gap: 9px;
    background: transparent; color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.28); padding: 13px 24px; cursor: pointer;
    transition: border-color .2s, color .2s;
  }
  .ed-btn-ghost:hover { border-color: var(--ed-gold); color: var(--ed-gold); }

  /* Hero slide dots */
  .ed-hero-dots {
    position: absolute; bottom: 32px; right: max(6vw, 28px);
    display: flex; flex-direction: column; gap: 7px; z-index: 10;
  }
  .ed-hero-dot {
    width: 2px; background: rgba(255,255,255,0.22); border: none; cursor: pointer; padding: 0;
    transition: background .3s, height .3s;
  }
  .ed-hero-dot.active { background: var(--ed-gold); height: 28px !important; }

  /* ── Search Panel ───────────────────────────── */
  .ed-search-panel {
    max-width: 1200px; margin: -36px auto 52px;
    padding: 0 max(5vw, 24px); position: relative; z-index: 20;
  }
  .ed-search-card {
    background: var(--ed-white);
    border: 1px solid var(--ed-border);
    box-shadow: 0 8px 32px rgba(12,27,51,0.09);
    padding: 22px 26px;
  }
  .ed-search-row { display: flex; gap: 10px; margin-bottom: 14px; }
  .ed-search-field {
    flex: 1; display: flex; align-items: center; gap: 10px;
    border: 1px solid var(--ed-border); background: var(--ed-white); padding: 0 16px;
    transition: border-color .2s;
  }
  .ed-search-field:focus-within { border-color: var(--ed-gold); }
  .ed-search-field input {
    flex: 1; border: none; outline: none; background: transparent;
    font-family: 'Poppins', sans-serif; font-size: 14px; color: var(--ed-ink); padding: 13px 0;
  }
  .ed-search-field input::placeholder { color: var(--ed-ink-light); }

  .ed-chips { display: flex; flex-wrap: wrap; gap: 7px; }
  .ed-chip {
    padding: 5px 16px;
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid var(--ed-border); color: var(--ed-ink-light);
    background: transparent; cursor: pointer; transition: all .18s;
  }
  .ed-chip:hover { border-color: var(--ed-cobalt); color: var(--ed-cobalt-dark); }
  .ed-chip.active { background: var(--ed-navy); border-color: var(--ed-navy); color: #fff; }

  /* ── Page Content ───────────────────────────── */
  .ed-section { max-width: 1200px; margin: 0 auto; padding: 0 max(5vw, 24px) clamp(64px, 9vw, 96px); }

  /* ── Section Header ─────────────────────────── */
  .ed-sec-header { margin-bottom: 36px; }
  .ed-sec-header.center { text-align: center; }
  .ed-sec-header.center .ed-sec-eyebrow { justify-content: center; }
  .ed-sec-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ed-gold); margin-bottom: 10px;
  }
  .ed-sec-eyebrow::before, .ed-sec-eyebrow::after { content:''; width:18px; height:1px; background:currentColor; }
  .ed-sec-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 700;
    line-height: 1.15; color: var(--ed-ink);
  }
  .ed-sec-title .accent { color: var(--ed-gold); font-weight: 300; font-style: italic; }
  .ed-sec-sub { font-size: 14px; color: var(--ed-ink-mid); line-height: 1.75; max-width: 540px; margin-top: 8px; }
  .ed-sec-header.center .ed-sec-sub { margin: 8px auto 0; }

  /* ── Rule ───────────────────────────────────── */
  .ed-rule { border:none; border-top: 1px solid var(--ed-border); margin: 0; }

  /* ── Grid ───────────────────────────────────── */
  .ed-grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 22px; }

  /* ── School Card ────────────────────────────── */
  .ed-school-card {
    background: var(--ed-white);
    border: 1px solid var(--ed-border);
    overflow: hidden; display: flex; flex-direction: column;
    text-decoration: none; color: inherit;
    transition: box-shadow .25s, transform .25s;
  }
  .ed-school-card:hover { box-shadow: 0 16px 48px rgba(8,106,139,0.14); transform: translateY(-3px); }

  .ed-school-img { position: relative; height: 200px; overflow: hidden; flex-shrink: 0; }
  .ed-school-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform .6s ease;
  }
  .ed-school-card:hover .ed-school-img img { transform: scale(1.04); }
  .ed-school-img-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(5,63,83,0.48) 0%, transparent 55%);
  }

  .ed-school-type {
    position: absolute; bottom: 12px; left: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    background: var(--ed-cobalt); color: #fff; padding: 4px 10px;
  }
  .ed-school-year {
    position: absolute; bottom: 12px; right: 12px;
    font-size: 10px; color: rgba(255,255,255,0.65);
    font-weight: 500;
  }

  /* Top bar colour = cobalt */
  .ed-school-bar { height: 2px; background: var(--ed-cobalt); flex-shrink: 0; }

  .ed-school-body { padding: 20px 22px; flex: 1; display: flex; flex-direction: column; }
  .ed-school-name {
    font-size: 15px; font-weight: 700; color: var(--ed-ink);
    margin-bottom: 10px; line-height: 1.3;
  }
  .ed-school-meta { display: flex; flex-direction: column; gap: 7px; margin-bottom: 12px; }
  .ed-school-meta-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; color: var(--ed-ink-mid); font-weight: 500;
  }
  .ed-school-meta-icon {
    width: 20px; height: 20px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .ed-school-desc {
    font-size: 12px; color: var(--ed-ink-light); line-height: 1.7;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden; flex: 1; margin-bottom: 16px;
  }
  .ed-school-footer {
    border-top: 1px solid var(--ed-border); padding-top: 14px; margin-top: auto;
  }
  .ed-school-cta {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ed-gold);
    border-bottom: 1px solid rgba(201,168,76,0.3); padding-bottom: 1px;
    transition: border-color .2s, gap .2s;
  }
  .ed-school-card:hover .ed-school-cta { border-color: var(--ed-gold); gap: 11px; }

  /* ── Article Card ───────────────────────────── */
  .ed-article-card {
    background: var(--ed-white); border: 1px solid var(--ed-border);
    overflow: hidden; display: flex; flex-direction: column;
    text-decoration: none; color: inherit;
    transition: box-shadow .25s, transform .25s;
  }
  .ed-article-card:hover { box-shadow: 0 16px 48px rgba(8,106,139,0.14); transform: translateY(-3px); }

  .ed-article-img { position: relative; height: 190px; overflow: hidden; flex-shrink: 0; }
  .ed-article-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform .6s ease;
  }
  .ed-article-card:hover .ed-article-img img { transform: scale(1.04); }

  .ed-article-badge {
    position: absolute; bottom: 12px; left: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    background: var(--ed-teal); color: #fff; padding: 4px 10px;
  }
  .ed-article-date {
    position: absolute; bottom: 12px; right: 12px;
    font-size: 10px; color: rgba(255,255,255,0.65); font-weight: 500;
  }

  .ed-article-bar { height: 2px; background: var(--ed-teal); flex-shrink: 0; }
  .ed-article-body { padding: 20px 22px; flex: 1; display: flex; flex-direction: column; }
  .ed-article-title {
    font-size: 15px; font-weight: 700; color: var(--ed-ink);
    margin-bottom: 10px; line-height: 1.3;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .ed-article-card:hover .ed-article-title { color: var(--ed-cobalt-dark); }
  .ed-article-desc {
    font-size: 12px; color: var(--ed-ink-light); line-height: 1.7;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden; flex: 1;
  }

  /* ── Stats Strip ────────────────────────────── */
  .ed-stats-strip {
    background: var(--ed-navy);
    padding: clamp(56px, 8vw, 96px) max(5vw, 24px);
    position: relative; overflow: hidden;
  }
  .ed-stats-strip::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background: linear-gradient(to right, transparent, var(--ed-gold), transparent);
  }
  .ed-stats-strip::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .ed-stats-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
  .ed-stats-header { text-align: center; margin-bottom: 48px; }
  .ed-stats-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ed-gold); margin-bottom: 12px;
  }
  .ed-stats-eyebrow::before, .ed-stats-eyebrow::after { content:''; width:18px; height:1px; background:currentColor; }
  .ed-stats-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.4rem); font-weight: 700; color: #fff;
    line-height: 1.15;
  }
  .ed-stats-title .gold { color: var(--ed-gold); font-weight: 300; font-style: italic; }
  .ed-stats-sub { font-size: 13px; color: rgba(255,255,255,0.45); margin-top: 8px; }

  .ed-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.08); }
  @media (max-width: 768px) { .ed-stats-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 440px) { .ed-stats-grid { grid-template-columns: 1fr; } }

  .ed-stat-cell {
    background: rgba(255,255,255,0.03);
    padding: clamp(24px, 4vw, 44px) clamp(20px, 3vw, 32px);
    text-align: center;
    transition: background .2s;
  }
  .ed-stat-cell:hover { background: rgba(255,255,255,0.06); }
  .ed-stat-icon-wrap {
    width: 44px; height: 44px; margin: 0 auto 14px;
    border: 1px solid rgba(201,168,76,0.25);
    display: flex; align-items: center; justify-content: center;
    color: var(--ed-gold);
  }
  .ed-stat-num {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; line-height: 1;
    color: #fff; margin-bottom: 6px;
  }
  .ed-stat-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ed-gold); margin-bottom: 4px;
  }
  .ed-stat-desc { font-size: 11px; color: rgba(255,255,255,0.38); }

  /* Gender breakdown card */
  .ed-gender-card {
    max-width: 480px; margin: 36px auto 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 24px 28px;
    position: relative; z-index: 2;
  }
  .ed-gender-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .ed-gender-row:last-child { border-bottom: none; }
  .ed-gender-label { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; }
  .ed-gender-val { font-size: 15px; font-weight: 700; color: var(--ed-gold); }

  /* ── Empty States ───────────────────────────── */
  .ed-empty {
    text-align: center; padding: 80px 24px;
    background: var(--ed-white); border: 1px solid var(--ed-border);
  }
  .ed-empty h3 {
    font-size: 1.3rem; font-weight: 700; color: var(--ed-ink-mid); margin: 14px 0 7px;
  }
  .ed-empty p { font-size: 13px; color: var(--ed-ink-light); }

  /* ── State Screens ──────────────────────────── */
  .ed-full-state {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--ed-surface); font-family: 'Poppins', sans-serif;
  }
  .ed-state-card {
    background: var(--ed-white); border: 1px solid var(--ed-border);
    padding: 52px 56px; text-align: center; max-width: 440px; width: 90%;
  }
  .ed-state-card h2 { font-size: 1.5rem; font-weight: 700; color: var(--ed-ink); margin: 12px 0 8px; }
  .ed-state-card p  { font-size: 13px; color: var(--ed-ink-light); margin-bottom: 24px; }
  .ed-state-btn {
    background: var(--ed-navy); color: #fff; border: none; padding: 12px 28px;
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background .2s;
  }
  .ed-state-btn:hover { background: var(--ed-cobalt); }

  /* ── Responsive ─────────────────────────────── */
  @media (max-width: 640px) {
    .ed-grid-3 { grid-template-columns: 1fr; }
    .ed-hero-title { font-size: clamp(2rem, 12vw, 3.5rem); }
    .ed-hero-cta { flex-direction: column; }
  }
`;

const Education = ({ data = [], loading = false, error = null, schools = [], statistiqueEdu = [] }) => {
  const [searchQuery,       setSearchQuery]       = useState("");
  const [activeCategory,    setActiveCategory]    = useState("Tous");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ["Tous", "enseignement", "formation", "orientation", "pedagogie", "infrastructure", "diplomes"];

  /* ── Carousel (unchanged) ────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setCurrentImageIndex(p => (p + 1) % carouselImages.length), 10000);
    return () => clearInterval(t);
  }, []);

  /* ── Helpers (unchanged) ─────────────────────── */
  const getImageUrl = image => {
    if (!image) return "/placeholder.svg?height=400&width=800";
    return image.url ? toMediaUrl(image.url) : "/placeholder.svg?height=400&width=800";
  };

  const getTextFromBlocks = blocks => {
    if (!blocks || !Array.isArray(blocks)) return "Description non disponible";
    let text = "";
    blocks.forEach(block => {
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach(child => { if (child.text) text += child.text + " "; });
      }
    });
    return text.trim() || "Description non disponible";
  };

  const filteredData = data.filter(item => {
    const matchesSearch   = item.Titre?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || item.categorie === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getEducationStats = () => {
    if (!statistiqueEdu?.length) {
      return { totalEcoles: "24+", totalEtudiants: "4.7K+", pourcentageReussite: "67%", candidatsExamen: "1.2K+" };
    }
    const s = statistiqueEdu[0];
    const total = (s.totalEtudiantsGarcons || 0) + (s.totalEtudiantesFilles || 0);
    return {
      totalEcoles:         `${s.totalEcoles || 0}+`,
      totalEtudiants:      total > 1000 ? `${(total / 1000).toFixed(1)}K+` : `${total}+`,
      pourcentageReussite: `${s.pourcentageReussite || 0}%`,
      candidatsExamen:     s.candidatsExamen > 1000 ? `${(s.candidatsExamen / 1000).toFixed(1)}K+` : `${s.candidatsExamen || 0}+`,
    };
  };
  const stats = getEducationStats();

  /* ── State screens ─────────────────────────── */
  if (loading) return (
    <div className="ed-full-state"><style>{CSS}</style>
      <div className="ed-state-card">
        <GraduationCap size={40} style={{ color: "var(--ed-gold)", margin: "0 auto 12px", display: "block" }} />
        <h2>Chargement…</h2><p>Récupération des données éducatives.</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="ed-full-state"><style>{CSS}</style>
      <div className="ed-state-card">
        <AlertCircle size={40} style={{ color: "#b91c1c", margin: "0 auto 12px", display: "block" }} />
        <h2>Erreur de chargement</h2>
        <p>Veuillez réessayer plus tard ou contacter l'administrateur du site.</p>
        <button className="ed-state-btn" onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    </div>
  );

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div className="ed-root">
      <style>{CSS}</style>
      <Helmet>
        <title>Éducation à Mamou | Ville de Mamou</title>
        <meta name="description" content="Découvrez les écoles, statistiques et contenus éducatifs de Mamou pour élèves, parents et acteurs du secteur." />
      </Helmet>

      {/* NavBar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50 }}><NavBar /></div>

      {/* ════ HERO ════ */}
      <header className="ed-hero" style={{ paddingTop: 80 }}>
        {carouselImages.map((src, idx) => (
          <div key={idx} className={`ed-hero-slide${idx === currentImageIndex ? " active" : ""}`} style={{ opacity: idx === currentImageIndex ? 1 : 0 }}>
            <img src={src} alt="Éducation background" />
          </div>
        ))}
        <div className="ed-hero-scrim" />
        <div className="ed-hero-lines" />
        <div className="ed-hero-bar" />

        {/* Slide dots */}
        <div className="ed-hero-dots">
          {carouselImages.map((_, idx) => (
            <button key={idx} className={`ed-hero-dot${idx === currentImageIndex ? " active" : ""}`}
              style={{ height: idx === currentImageIndex ? 28 : 14 }}
              onClick={() => setCurrentImageIndex(idx)} aria-label={`Image ${idx + 1}`} />
          ))}
        </div>

        <div className="ed-hero-inner">
          <nav className="ed-breadcrumb">
            <Home size={11} style={{ display: "inline" }} />
            <Link to="/">Accueil</Link>
            <ChevronRight size={11} />
            <span className="cur">Éducation</span>
          </nav>
          <p className="ed-hero-eyebrow">Ville de Mamou</p>
          <h1 className="ed-hero-title">
            Éducation à <span className="gold">Mamou</span>
          </h1>
          <p className="ed-hero-sub">
            Découvrez les opportunités éducatives, les écoles et les statistiques de la région.
          </p>
          <div className="ed-hero-cta">
            <button className="ed-btn-primary"><Calendar size={13} /> Calendrier scolaire</button>
            <button className="ed-btn-ghost"><Mail size={13} /> Contactez-nous</button>
          </div>
        </div>
      </header>

      {/* ════ SEARCH PANEL ════ */}
      <div className="ed-search-panel">
        <div className="ed-search-card">
          <div className="ed-search-row">
            <div className="ed-search-field">
              <Search size={15} style={{ color: "var(--ed-ink-light)", flexShrink: 0 }} />
              <input type="text" placeholder="Rechercher du contenu éducatif…"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="ed-chips">
            {categories.map(cat => (
              <button key={cat} className={`ed-chip${activeCategory === cat ? " active" : ""}`} onClick={() => setActiveCategory(cat)}>
                {cat === "Tous" ? "Tous" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════ SCHOOLS ════ */}
      <section className="ed-section">
        <div className="ed-sec-header center">
          <p className="ed-sec-eyebrow">Établissements</p>
          <h2 className="ed-sec-title">Les Écoles de <span className="accent">Mamou</span></h2>
        </div>

        {schools.length === 0 ? (
          <div className="ed-empty">
            <School size={52} style={{ color: "var(--ed-border)", margin: "0 auto 12px", display: "block" }} />
            <h3>Aucune école trouvée</h3>
            <p>Vérifiez ultérieurement pour les informations sur les écoles.</p>
          </div>
        ) : (
          <div className="ed-grid-3">
            {schools.map((school, idx) => (
              <Link key={school.id || idx} to={`/blog/school/${school.id}`} className="ed-school-card">
                <div className="ed-school-img">
                  <img src={getImageUrl(school?.image?.[0])} alt={school?.nom || `École ${idx + 1}`}
                    onError={e => { e.target.src = "/placeholder.svg?height=400&width=800"; }} />
                  <div className="ed-school-img-scrim" />
                  <span className="ed-school-type">{school.typeEcole || "École"}</span>
                  {school.anneeFondation && <span className="ed-school-year">{school.anneeFondation}</span>}
                </div>
                <div className="ed-school-bar" />
                <div className="ed-school-body">
                  <h3 className="ed-school-name">{school?.nom || `École ${idx + 1}`}</h3>
                  <div className="ed-school-meta">
                    {school.localisation && (
                      <div className="ed-school-meta-row">
                        <div className="ed-school-meta-icon" style={{ background: "var(--ed-surface-2)" }}><MapPin size={10} style={{ color: "var(--ed-cobalt-dark)" }} /></div>
                        {school.localisation}
                      </div>
                    )}
                    {school.nomDuDirecteur && (
                      <div className="ed-school-meta-row">
                        <div className="ed-school-meta-icon" style={{ background: "var(--ed-gold-pale)" }}><User size={10} style={{ color: "var(--ed-gold)" }} /></div>
                        Dir. {school.nomDuDirecteur}
                      </div>
                    )}
                    {school.capaciteEleves && (
                      <div className="ed-school-meta-row">
                        <div className="ed-school-meta-icon" style={{ background: "var(--ed-surface-2)" }}><Users size={10} style={{ color: "var(--ed-teal)" }} /></div>
                        {school.capaciteEleves} élèves
                      </div>
                    )}
                    {school.telephone && (
                      <div className="ed-school-meta-row">
                        <div className="ed-school-meta-icon" style={{ background: "var(--ed-surface-2)" }}><Phone size={10} style={{ color: "var(--ed-teal)" }} /></div>
                        {school.telephone}
                      </div>
                    )}
                    {school.email && (
                      <div className="ed-school-meta-row">
                        <div className="ed-school-meta-icon" style={{ background: "var(--ed-surface-2)" }}><Mail size={10} style={{ color: "var(--ed-cobalt-dark)" }} /></div>
                        {school.email}
                      </div>
                    )}
                  </div>
                  <p className="ed-school-desc">{getTextFromBlocks(school?.description)}</p>
                  <div className="ed-school-footer">
                    <span className="ed-school-cta">En savoir plus →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Rule ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 max(5vw, 24px)" }}><hr className="ed-rule" /></div>

      {/* ════ ARTICLES ════ */}
      <section className="ed-section" style={{ paddingTop: "clamp(56px, 7vw, 80px)" }}>
        <div className="ed-sec-header center">
          <p className="ed-sec-eyebrow">Presse éducative</p>
          <h2 className="ed-sec-title">Actualités de <span className="accent">l'Éducation</span></h2>
          <p className="ed-sec-sub">
            {filteredData.length} article{filteredData.length !== 1 ? "s" : ""} trouvé{filteredData.length !== 1 ? "s" : ""}
            {activeCategory !== "Tous" && ` · catégorie "${activeCategory}"`}
          </p>
        </div>

        {filteredData.length === 0 ? (
          <div className="ed-empty">
            <BookOpen size={44} style={{ color: "var(--ed-border)", margin: "0 auto 12px", display: "block" }} />
            <h3>Aucun article trouvé</h3>
            <p>Essayez une autre recherche ou une autre catégorie.</p>
          </div>
        ) : (
          <div className="ed-grid-3">
            {filteredData.map((item, idx) => (
              <Link key={item.id || idx} to={`/blog/education/${item.id}`} className="ed-article-card">
                <div className="ed-article-img">
                  <img src={getImageUrl(item?.image?.[0])} alt={item?.Titre || `Article ${idx + 1}`}
                    onError={e => { e.target.src = "/placeholder.svg?height=400&width=800"; }} />
                  <span className="ed-article-badge">{(item.categorie || "éducation").replace("_", " ")}</span>
                  {item.datePublication && (
                    <span className="ed-article-date">{new Date(item.datePublication).toLocaleDateString("fr-FR")}</span>
                  )}
                </div>
                <div className="ed-article-bar" />
                <div className="ed-article-body">
                  <h3 className="ed-article-title">{item?.Titre || `Article ${idx + 1}`}</h3>
                  <p className="ed-article-desc">{getTextFromBlocks(item?.description)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ════ STATS STRIP ════ */}
      <div className="ed-stats-strip">
        <div className="ed-stats-inner">
          <div className="ed-stats-header">
            <p className="ed-stats-eyebrow">Données officielles</p>
            <h2 className="ed-stats-title">
              L'Éducation en <span className="gold">Chiffres</span>
            </h2>
            <p className="ed-stats-sub">
              Statistiques clés sur l'éducation dans la région de Mamou
              {statistiqueEdu.length > 0 && statistiqueEdu[0].anneeEnCours && ` · Année ${statistiqueEdu[0].anneeEnCours}`}
            </p>
          </div>

          <div className="ed-stats-grid">
            {[
              { value: stats.totalEcoles,         label: "Écoles",              desc: "Établissements scolaires",    Icon: School        },
              { value: stats.totalEtudiants,       label: "Étudiants",           desc: "Garçons et filles confondus", Icon: Users         },
              { value: stats.pourcentageReussite,  label: "Taux de réussite",    desc: "Aux examens officiels",       Icon: GraduationCap },
              { value: stats.candidatsExamen,      label: "Candidats examens",   desc: "Cette année scolaire",        Icon: BookOpen      },
            ].map(({ value, label, desc, Icon }, i) => (
              <div className="ed-stat-cell" key={i}>
                <div className="ed-stat-icon-wrap"><Icon size={18} /></div>
                <div className="ed-stat-num">{value}</div>
                <div className="ed-stat-label">{label}</div>
                <div className="ed-stat-desc">{desc}</div>
              </div>
            ))}
          </div>

          {statistiqueEdu.length > 0 && (
            <div className="ed-gender-card">
              <div className="ed-gender-row">
                <span className="ed-gender-label">Étudiants garçons</span>
                <span className="ed-gender-val">{statistiqueEdu[0].totalEtudiantsGarcons?.toLocaleString() || 0}</span>
              </div>
              <div className="ed-gender-row">
                <span className="ed-gender-label">Étudiantes filles</span>
                <span className="ed-gender-val">{statistiqueEdu[0].totalEtudiantesFilles?.toLocaleString() || 0}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
