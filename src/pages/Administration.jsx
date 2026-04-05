"use client";
import { useState, useEffect } from "react";
import {
  Calendar, Clock, Download, FileText, Mail, MapPin, Phone,
  Search, User, Building2, Shield, Users, ChevronRight,
  Filter, Grid, List, Eye,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Image1 from "../assets/images/document.png";
import jsPDF from "jspdf";

const carouselImages = [
  Image1,
  "https://www.assembleeguinee.org/sites/default/files/post-gallery/galerie_mamou2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg/330px-%DF%9E%DF%8A%DF%B2%DF%9E%DF%8A%DF%B2%DF%AB_%DF%9E%DF%90%DF%B2%DF%AC%DF%9B%DF%8F%DF%AC%DF%9C%DF%98%DF%8B_%DF%96%DF%8C%DF%AC%DF%A6%DF%8A%DF%AC%DF%93%DF%8F%DF%B2.jpg",
];

/* ─────────────────────────────────────────────────
   DESIGN SYSTEM TOKENS
───────────────────────────────────────────────── */
const CSS = `
  :root {
    --navy:        #053f53;
    --navy-mid:    #086a8b;
    --cobalt:      #0992c2;
    --cobalt-dim:  #086a8b;
    --gold:        #0992c2;
    --gold-pale:   #eef9fc;
    --surface:     #f5f7fa;
    --surface-2:   #eef1f6;
    --white:       #ffffff;
    --ink:         #0f172a;
    --ink-mid:     #3d5068;
    --ink-light:   #7a90ab;
    --border:      #d7e9ef;
    --border-soft: rgba(215,233,239,0.7);
    --green:       #15803d;
    --amber:       #b45309;
    --red:         #b91c1c;
    --teal:        #0f766e;

    --radius-sm:   6px;
    --radius-md:   12px;
    --radius-lg:   20px;
    --shadow-sm:   0 1px 4px rgba(12,27,51,0.06);
    --shadow-md:   0 4px 20px rgba(12,27,51,0.09);
    --shadow-lg:   0 12px 40px rgba(12,27,51,0.12);
  }

  /* ── Base ───────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .adm-root {
    min-height: 100vh;
    background: var(--surface);
    font-family: 'Outfit', system-ui, sans-serif;
    color: var(--ink);
    overflow-x: hidden;
  }

  /* ── Typography helpers ─────────────────────── */
  .display   { font-family: 'Playfair Display', Georgia, serif; }
  .eyebrow   {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold);
    font-family: 'Outfit', sans-serif;
  }
  .eyebrow::before, .eyebrow::after {
    content: ''; display: block;
    width: 20px; height: 1px; background: currentColor;
  }

  /* ── Hero ───────────────────────────────────── */
  .hero {
    position: relative;
    min-height: 600px;
    overflow: hidden;
    display: flex; align-items: flex-end;
    padding-bottom: clamp(48px, 8vh, 88px);
  }
  .hero-slide {
    position: absolute; inset: 0;
    transition: opacity 1.2s ease;
  }
  .hero-slide img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: saturate(0.7);
  }
  .hero-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(
      105deg,
      rgba(12,27,51,0.95) 0%,
      rgba(12,27,51,0.75) 55%,
      rgba(12,27,51,0.30) 100%
    );
  }
  /* Subtle halftone texture */
  .hero-texture {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 22px 22px;
    pointer-events: none;
  }
  /* Vertical gold rule left accent */
  .hero-accent-bar {
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, transparent, var(--gold) 30%, var(--gold) 70%, transparent);
  }

  .hero-inner {
    position: relative; z-index: 5;
    max-width: 1200px; margin: 0 auto;
    padding: 0 max(5vw, 24px);
    width: 100%;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(201,168,76,0.35);
    color: var(--gold);
    font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 7px 16px;
    margin-bottom: 24px;
  }
  .hero-badge span { width: 5px; height: 5px; background: var(--gold); border-radius: 50%; }

  .hero-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2.6rem, 7vw, 5.2rem);
    font-weight: 700; line-height: 1.07; color: #fff;
    margin-bottom: 20px;
  }
  .hero-title .accent { color: var(--gold); font-weight: 400; font-style: italic; }

  .hero-sub {
    font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.62);
    max-width: 460px; margin-bottom: 36px;
  }

  /* ── Hero Search ────────────────────────────── */
  .search-shell {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(18px);
    padding: 10px; max-width: 540px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .search-inner {
    display: flex; gap: 8px;
  }
  .search-field {
    flex: 1; display: flex; align-items: center; gap: 10px;
    background: #fff;
    padding: 0 16px;
  }
  .search-field input {
    flex: 1; border: none; outline: none;
    font-family: 'Outfit', sans-serif; font-size: 14px;
    color: var(--ink); background: transparent;
    padding: 13px 0;
  }
  .search-field input::placeholder { color: var(--ink-light); }
  .btn-filter {
    background: var(--gold); color: var(--navy);
    border: none; padding: 0 20px;
    font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; display: flex; align-items: center; gap: 7px;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .btn-filter:hover { background: #fbbf24; }
  .filter-chips {
    display: flex; flex-wrap: wrap; gap: 7px;
    padding-top: 4px;
  }
  .chip {
    padding: 5px 14px;
    font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.05em; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.65);
    background: transparent; cursor: pointer; transition: all 0.18s;
  }
  .chip:hover { border-color: var(--gold); color: var(--gold); }
  .chip.active { background: var(--gold); border-color: var(--gold); color: var(--navy); }

  /* ── Breadcrumb ─────────────────────────────── */
  .breadcrumb {
    display: flex; align-items: center; gap: 7px;
    font-size: 12px; color: rgba(255,255,255,0.45);
    margin-bottom: 28px;
  }
  .breadcrumb a { color: inherit; text-decoration: none; }
  .breadcrumb a:hover { color: var(--gold); }
  .breadcrumb .cur { color: rgba(255,255,255,0.75); font-weight: 500; }

  /* ── Contact Strip ──────────────────────────── */
  .contact-strip {
    background: var(--navy);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative; z-index: 20;
  }
  .contact-strip-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 max(5vw, 24px);
    display: grid; grid-template-columns: repeat(4, 1fr);
    divide-x: 1px solid rgba(255,255,255,0.08);
  }
  .contact-cell {
    display: flex; align-items: center; gap: 14px;
    padding: 18px 0;
    border-right: 1px solid rgba(255,255,255,0.07);
    transition: background 0.2s;
    padding-left: 20px;
  }
  .contact-cell:first-child { padding-left: 0; }
  .contact-cell:last-child { border-right: none; }
  .contact-cell:hover { background: rgba(255,255,255,0.03); }
  .contact-icon-wrap {
    width: 38px; height: 38px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,0.12);
  }
  .contact-label { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 3px; }
  .contact-value { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 400; }

  /* ── Page Wrapper ───────────────────────────── */
  .page-wrap {
    max-width: 1200px; margin: 0 auto;
    padding: clamp(56px, 8vw, 96px) max(5vw, 24px);
  }

  /* ── Section Header ─────────────────────────── */
  .section-header { margin-bottom: 52px; }
  .section-header.center { text-align: center; }
  .section-header.center .eyebrow { display: flex; justify-content: center; }
  .section-header h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700; line-height: 1.15; color: var(--ink);
    margin-top: 14px; margin-bottom: 14px;
  }
  .section-header h2 em { color: var(--cobalt); font-weight: 400; }
  .section-header p { font-size: 15px; color: var(--ink-mid); line-height: 1.75; max-width: 520px; }
  .section-header.center p { margin: 0 auto; }

  /* ── Ruled Divider ──────────────────────────── */
  .page-rule {
    border: none;
    border-top: 1px solid var(--border);
    margin: 0;
  }

  /* ── Official Cards ─────────────────────────── */
  .off-grid-lg { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
  .off-grid-sm { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 18px; }

  .off-card {
    background: var(--white);
    border: 1px solid var(--border);
    display: flex; flex-direction: column; align-items: center;
    padding: 0 20px 24px;
    position: relative;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .off-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }

  .off-card-top-bar {
    width: 100%; height: 3px;
    margin-bottom: 28px;
  }

  .off-avatar-wrap { position: relative; margin-bottom: 20px; }
  .off-avatar {
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 3px solid var(--white);
  }
  .off-title-badge {
    position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
    font-size: 8px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--white); padding: 3px 10px;
    white-space: nowrap;
    border: 2px solid var(--white);
    font-family: 'Outfit', sans-serif;
  }

  .off-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 16px; font-weight: 600; color: var(--ink);
    text-align: center; margin-bottom: 16px;
  }
  .off-name.sm { font-size: 13px; margin-bottom: 10px; }

  .off-bio {
    font-size: 12px; color: var(--ink-light); line-height: 1.65;
    text-align: center; margin-bottom: 16px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .off-contacts { width: 100%; display: flex; flex-direction: column; gap: 7px; margin-top: auto; }
  .off-contact-row {
    display: flex; align-items: center; gap: 9px;
    font-size: 11px; color: var(--ink-mid); font-weight: 500;
  }
  .off-contact-icon {
    width: 22px; height: 22px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── Group Banner ───────────────────────────── */
  .group-banner {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 32px;
  }
  .group-banner-rule { flex: 1; height: 1px; background: var(--border); }
  .group-banner-pill {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 22px;
    font-family: 'Outfit', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--white);
    white-space: normal;
    text-align: center;
    max-width: min(100%, 1000px);
  }

  /* ── Document Cards ─────────────────────────── */
  .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .doc-list  { display: flex; flex-direction: column; gap: 14px; }

  .doc-card {
    background: var(--white);
    border: 1px solid var(--border);
    display: flex;
    transition: box-shadow 0.22s, transform 0.22s;
    overflow: hidden;
  }
  .doc-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
  .doc-card-accent { width: 4px; flex-shrink: 0; background: var(--cobalt); }
  .doc-card-body { padding: 22px; flex: 1; display: flex; flex-direction: column; }
  .doc-card-body.list { flex-direction: row; align-items: center; gap: 20px; }

  .doc-type-badge {
    display: inline-flex; padding: 3px 10px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--white); background: var(--cobalt-dim);
    font-family: 'Outfit', sans-serif;
    margin-bottom: 12px; align-self: flex-start;
  }
  .doc-icon-wrap {
    width: 40px; height: 40px; flex-shrink: 0;
    background: var(--surface-2);
    display: flex; align-items: center; justify-content: center;
  }
  .doc-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 15px; font-weight: 600; color: var(--ink);
    margin-bottom: 6px; line-height: 1.3;
  }
  .doc-desc {
    font-size: 12px; color: var(--ink-light); line-height: 1.65;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden; flex: 1; margin-bottom: 14px;
  }
  .doc-meta { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .doc-meta-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; color: var(--ink-mid); font-weight: 500;
  }
  .doc-meta-icon {
    width: 20px; height: 20px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }

  .doc-footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--border-soft); padding-top: 14px;
    flex-wrap: wrap; gap: 8px; margin-top: auto;
  }
  .doc-price {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 17px; font-weight: 700; color: var(--ink);
  }
  .doc-price.free { color: var(--green); }

  .btn-download {
    display: flex; align-items: center; gap: 6px;
    background: var(--navy); color: var(--white);
    border: none; padding: 9px 16px;
    font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s;
  }
  .btn-download:hover { background: var(--cobalt); }
  .btn-view {
    display: flex; align-items: center;
    background: var(--surface); color: var(--ink-mid);
    border: 1px solid var(--border); padding: 9px 12px;
    cursor: pointer; transition: background 0.18s;
  }
  .btn-view:hover { background: var(--surface-2); }

  /* ── Doc Toolbar ────────────────────────────── */
  .doc-toolbar {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  }
  .result-count { font-size: 13px; color: var(--ink-mid); font-weight: 500; }
  .view-toggle {
    display: flex; background: var(--surface-2);
    border: 1px solid var(--border); overflow: hidden;
  }
  .vt-btn {
    padding: 8px 13px; border: none;
    background: transparent; color: var(--ink-light);
    cursor: pointer; transition: all 0.18s;
    display: flex; align-items: center; justify-content: center;
  }
  .vt-btn.active { background: var(--navy); color: var(--white); }

  /* ── FAQ ────────────────────────────────────── */
  .faq-two-col {
    display: grid; grid-template-columns: 1fr 1.6fr;
    gap: clamp(40px, 6vw, 96px);
    align-items: start;
  }
  .faq-sticky { position: sticky; top: 96px; }

  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-item:first-child { border-top: 1px solid var(--border); }

  .faq-trigger {
    width: 100%; padding: 22px 0;
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
    background: transparent; border: none; cursor: pointer; text-align: left;
  }
  .faq-q {
    font-size: 14px; font-weight: 600; color: var(--ink);
    transition: color 0.2s;
  }
  .faq-trigger:hover .faq-q { color: var(--cobalt); }

  .faq-icon-wrap {
    width: 28px; height: 28px; flex-shrink: 0;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .faq-item.open .faq-icon-wrap { border-color: var(--gold); background: var(--gold-pale); }

  .faq-body {
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.35s ease, opacity 0.3s;
  }
  .faq-item.open .faq-body { max-height: 200px; opacity: 1; }
  .faq-answer {
    font-size: 13px; line-height: 1.8; color: var(--ink-mid);
    padding-bottom: 22px;
  }

  /* ── Empty State ────────────────────────────── */
  .empty-state {
    text-align: center; padding: 72px 24px;
    background: var(--white); border: 1px solid var(--border);
  }
  .empty-state h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: var(--ink); margin: 16px 0 8px; }
  .empty-state p  { font-size: 13px; color: var(--ink-light); margin-bottom: 24px; }
  .btn-reset {
    background: var(--navy); color: var(--white);
    border: none; padding: 11px 28px;
    font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s;
  }
  .btn-reset:hover { background: var(--cobalt); }

  /* ── Responsive ─────────────────────────────── */
  @media (max-width: 1024px) {
    .faq-two-col { grid-template-columns: 1fr; }
    .faq-sticky  { position: static; }
  }
  @media (max-width: 768px) {
    .contact-strip-inner { grid-template-columns: 1fr 1fr; }
    .contact-cell { padding-left: 0; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .contact-cell:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.07); }
    .off-grid-lg { grid-template-columns: 1fr 1fr; }
    .doc-grid    { grid-template-columns: 1fr; }
    .group-banner { gap: 10px; }
    .group-banner-pill { padding: 10px 14px; font-size: 10px; letter-spacing: 0.08em; }
  }
  @media (max-width: 560px) {
    .contact-strip-inner { grid-template-columns: 1fr; }
    .contact-cell { border-right: none !important; }
    .off-grid-lg { grid-template-columns: 1fr; }
    .off-grid-sm { grid-template-columns: 1fr 1fr; }
    .search-inner { flex-direction: column; }
    .btn-filter  { justify-content: center; padding: 13px 16px; }
    .group-banner { align-items: stretch; }
    .group-banner-rule { display: none; }
    .group-banner-pill { width: 100%; justify-content: center; }
  }
  @media (max-width: 360px) { .off-grid-sm { grid-template-columns: 1fr; } }
`;

/* ─────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────── */

const GroupBanner = ({ title, icon, accent }) => (
  <div className="group-banner">
    <div className="group-banner-rule" />
    <div className="group-banner-pill" style={{ background: accent }}>
      <span>{icon}</span>
      {title}
    </div>
    <div className="group-banner-rule" />
  </div>
);

const OfficialCard = ({ official, getImageUrl, getBiographyText, compact = false, accentColor = "#0992c2", basicOnly = false }) => {
  const avatarSize = compact ? 72 : 96;
  return (
    <div className="off-card"
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(12,27,51,0.14)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "";  e.currentTarget.style.transform = ""; }}
    >
      <div className="off-card-top-bar" style={{ background: accentColor }} />
      <div className="off-avatar-wrap" style={{ marginBottom: 20 }}>
        <img
          src={getImageUrl(official.image)}
          alt={official.nom}
          className="off-avatar"
          style={{ width: avatarSize, height: avatarSize }}
          onError={e => { e.target.src = "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"; }}
        />
        <div className="off-title-badge" style={{ background: accentColor }}>
          {official.titre}
        </div>
      </div>

      <h3 className={`off-name${compact ? " sm" : ""}`}>{official.nom}</h3>

      {!basicOnly && !compact && official.biographie && (
        <p className="off-bio">{getBiographyText(official.biographie)}</p>
      )}

      {!basicOnly && (
        <div className="off-contacts">
          {official.telephone && (
            <div className="off-contact-row">
              <div className="off-contact-icon" style={{ background: "#dcfce7" }}>
                <Phone size={11} style={{ color: "#15803d" }} />
              </div>
              <span style={{ wordBreak: "break-all" }}>{official.telephone}</span>
            </div>
          )}
          {official.email && (
            <div className="off-contact-row">
              <div className="off-contact-icon" style={{ background: "#d7f2f9" }}>
                <Mail size={11} style={{ color: "#0992c2" }} />
              </div>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{official.email}</span>
            </div>
          )}
          {official.adresseBureau && (
            <div className="off-contact-row">
              <div className="off-contact-icon" style={{ background: "#fef3c7" }}>
                <MapPin size={11} style={{ color: "#b45309" }} />
              </div>
              <span style={{ wordBreak: "break-word" }}>{official.adresseBureau}</span>
            </div>
          )}
          {official.dateDebut && (
            <div className="off-contact-row">
              <div className="off-contact-icon" style={{ background: "#ede9fe" }}>
                <Calendar size={11} style={{ color: "#7c3aed" }} />
              </div>
              <span>Depuis {new Date(official.dateDebut).toLocaleDateString("fr-FR")}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className={`faq-item${isOpen ? " open" : ""}`}>
    <button className="faq-trigger" onClick={onToggle}>
      <span className="faq-q">{faq.q}</span>
      <span className="faq-icon-wrap">
        {isOpen
          ? <ChevronRight size={13} style={{ color: "#c9a84c", transform: "rotate(90deg)", transition: "transform 0.2s" }} />
          : <ChevronRight size={13} style={{ color: "#7a90ab", transition: "transform 0.2s" }} />}
      </span>
    </button>
    <div className="faq-body">
      <p className="faq-answer">{faq.a}</p>
    </div>
  </div>
);

const DocCard = ({ doc, getDocumentIcon, getDescriptionText, generatePDF, listMode = false }) => (
  <div className="doc-card">
    <div className="doc-card-accent" />
    <div className={`doc-card-body${listMode ? " list" : ""}`}>
      {!listMode && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, gap: 8 }}>
            <div className="doc-icon-wrap">{getDocumentIcon(doc.typeDocument)}</div>
            <span className="doc-type-badge">{doc.typeDocument}</span>
          </div>
          <h3 className="doc-title">{doc.titre}</h3>
          <p className="doc-desc">{getDescriptionText(doc.description)}</p>
          <div className="doc-meta">
            {doc.lieu  && <div className="doc-meta-row"><div className="doc-meta-icon" style={{ background: "#d7f2f9" }}><MapPin size={10} style={{ color: "#0992c2" }} /></div>{doc.lieu}</div>}
            {doc.delai && <div className="doc-meta-row"><div className="doc-meta-icon" style={{ background: "#dcfce7" }}><Clock  size={10} style={{ color: "#15803d" }} /></div>Délai : {doc.delai} jours</div>}
          </div>
        </>
      )}
      {listMode && (
        <>
          <div className="doc-icon-wrap" style={{ flexShrink: 0 }}>{getDocumentIcon(doc.typeDocument)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className="doc-type-badge">{doc.typeDocument}</span>
            <h3 className="doc-title">{doc.titre}</h3>
          </div>
        </>
      )}
      <div className="doc-footer">
        <span className={`doc-price${!doc.prix ? " free" : ""}`}>
          {doc.prix ? `${doc.prix.toLocaleString()} GNF` : "Gratuit"}
        </span>
        <div style={{ display: "flex", gap: 7 }}>
          {doc.formulaireTelecharger && (
            <button className="btn-download" onClick={() => generatePDF(doc)}>
              <Download size={11} /> Télécharger
            </button>
          )}
          <button className="btn-view"><Eye size={13} /></button>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
const Administration = ({ documents = [], officials = [] }) => {
  const [searchTerm,        setSearchTerm]        = useState("");
  const [selectedCategory,  setSelectedCategory]  = useState("all");
  const [viewMode,          setViewMode]          = useState("grid");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [showFilters,       setShowFilters]       = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaqIndex,      setOpenFaqIndex]      = useState(null);

  /* ── PDF Generation (unchanged) ─────────────── */
  const generatePDF = (doc) => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(18); pdf.text(doc.titre, 20, 20);
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(12);
    pdf.text(`Type: ${doc.typeDocument}`, 20, 40);
    if (doc.description) pdf.text(`Description: ${doc.description}`, 20, 50);
    if (doc.lieu)        pdf.text(`Lieu: ${doc.lieu}`,             20, 60);
    if (doc.delai)       pdf.text(`Délai: ${doc.delai} jours`,     20, 70);
    pdf.text(doc.prix ? `Prix: ${doc.prix.toLocaleString()} GNF` : "Prix: Gratuit", 20, 80);
    pdf.save(`${doc.titre}.pdf`);
  };

  /* ── Carousel ───────────────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setCurrentImageIndex(p => (p + 1) % carouselImages.length), 10000);
    return () => clearInterval(t);
  }, []);

  /* ── Helpers (unchanged) ────────────────────── */
  const categories = [
    { id: "all",       label: "Tous",        count: documents.length },
    { id: "civil",     label: "État civil",  count: documents.filter(d => ["Acte de naissance","Acte de mariage","Acte de décès"].includes(d.typeDocument)).length },
    { id: "residence", label: "Résidence",   count: documents.filter(d => d.typeDocument === "Certificat de résidence").length },
    { id: "business",  label: "Commerce",    count: documents.filter(d => ["Licence commerciale","Permis de construire"].includes(d.typeDocument)).length },
    { id: "legal",     label: "Juridique",   count: documents.filter(d => d.typeDocument === "Jugement supplétif").length },
  ];

  useEffect(() => {
    const map = { civil: ["Acte de naissance","Acte de mariage","Acte de décès"], residence: ["Certificat de résidence"], business: ["Licence commerciale","Permis de construire"], legal: ["Jugement supplétif"] };
    let f = documents;
    if (selectedCategory !== "all") f = f.filter(d => map[selectedCategory]?.includes(d.typeDocument));
    if (searchTerm) f = f.filter(d => d.titre.toLowerCase().includes(searchTerm.toLowerCase()) || d.typeDocument.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredDocuments(f);
  }, [searchTerm, selectedCategory, documents]);

  const getImageUrl        = (arr) => { if (!arr?.length) return "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600"; const i = arr[0]; return i.url.startsWith("http") ? i.url : `https://api.villedemamou.org${i.url}`; };
  const getDescriptionText = (b)   => { if (!b?.length) return "Description non disponible"; const f = b[0]; return f.children?.[0]?.text || f.text || "Description non disponible"; };
  const getBiographyText   = (b)   => { if (!b?.length) return "Biographie non disponible";  const f = b[0]; return f.children?.[0]?.text || f.text || "Biographie non disponible"; };
  const getDocumentIcon    = (type) => {
    const map = {
      "Acte de naissance":      <User      size={18} style={{ color: "#0992c2" }} />,
      "Acte de mariage":        <Users     size={18} style={{ color: "#9d174d" }} />,
      "Acte de décès":          <FileText  size={18} style={{ color: "#64748b" }} />,
      "Certificat de résidence":<MapPin    size={18} style={{ color: "#b45309" }} />,
      "Licence commerciale":    <Building2 size={18} style={{ color: "#15803d" }} />,
      "Permis de construire":   <Building2 size={18} style={{ color: "#92400e" }} />,
      "Jugement supplétif":     <Shield    size={18} style={{ color: "#0992c2" }} />,
    };
    return map[type] || <FileText size={18} style={{ color: "#64748b" }} />;
  };

  /* ── Official Groups (unchanged logic) ──────── */
  const norm = (s) => s?.toLowerCase().trim() || "";
  const delegationTitleRank = (titre) => {
    const t = norm(titre);
    if (t === "président" || t === "president") return 0;
    if (t === "vice-président" || t === "vice-president") return 1;
    return 2;
  };
  const groups = [
    { key: "regional",  filter: o => ["préfet","prefet","gouverneur","président","president"].includes(norm(o.titre)), title: "Autorités Administratives",                          icon: "🏛",  accent: "#053f53", compact: false },
    { key: "delegation",filter: o => ["président","president","délégué","delegue","vice-président","vice-president"].includes(norm(o.titre)), title: "Délégation Spéciale — Commune Urbaine de Mamou", icon: "⚖️", accent: "#0992c2", compact: false },
    { key: "quartier",  filter: o => norm(o.titre).includes("président de quartier") || norm(o.titre).includes("president de quartier"), title: "Présidents de Quartier",             icon: "🏘",  accent: "#0f766e", compact: true  },
    { key: "conseiller",filter: o => norm(o.titre) === "conseiller",                                                                      title: "Conseillers de Quartier",            icon: "👥",  accent: "#15803d", compact: true  },
  ].map(g => {
    const list = officials.filter(g.filter);
    if (g.key === "delegation") {
      const sorted = list.map((o, i) => ({ o, i })).sort((a, b) => delegationTitleRank(a.o.titre) - delegationTitleRank(b.o.titre) || a.i - b.i);
      return { ...g, officials: sorted.map(x => x.o) };
    }
    return { ...g, officials: list };
  }).filter(g => g.officials.length > 0);

  const faqData = [
    { q: "Quels documents dois-je apporter pour un acte de naissance?", a: "Vous devez apporter une pièce d'identité valide, un certificat de résidence récent, et les informations complètes sur la personne concernée." },
    { q: "Combien de temps faut-il pour obtenir un document?",          a: "Les délais varient : 2-3 jours pour les certificats simples, 5-7 jours pour les actes d'état civil, jusqu'à 15 jours pour les documents complexes." },
    { q: "Puis-je faire une demande en ligne?",                         a: "Certaines démarches peuvent être initiées en ligne, mais la plupart nécessitent une visite en personne pour la vérification et la signature." },
    { q: "Quels sont les moyens de paiement acceptés?",                 a: "Nous acceptons les paiements en espèces, par chèque, et par mobile money (Orange Money, MTN Money)." },
    { q: "Comment contacter un élu spécifique?",                        a: "Prenez rendez-vous via notre secrétariat au +224 620 15 04 81 ou envoyez un email à admin@mamou.gov.gn." },
  ];

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div className="adm-root">
      <style>{CSS}</style>
      <Helmet>
        <title>Administration | Ville de Mamou</title>
        <meta name="description" content="Accédez aux services administratifs de Mamou: documents officiels, démarches, élus, informations pratiques et contacts utiles." />
      </Helmet>

      <NavBar />

      {/* ════ HERO ════ */}
      <header className="hero" style={{ paddingTop: 80 }}>
        {carouselImages.map((src, i) => (
          <div key={i} className="hero-slide" style={{ opacity: i === currentImageIndex ? 1 : 0 }}>
            <img src={src} alt="" />
          </div>
        ))}
        <div className="hero-scrim" />
        <div className="hero-texture" />
        <div className="hero-accent-bar" />

        <div className="hero-inner">
          <nav className="breadcrumb">
            <Link to="/">Accueil</Link>
            <ChevronRight size={12} />
            <span className="cur">Administration</span>
          </nav>

          <p className="hero-badge">
            <span />
            Services Officiels
            <span />
          </p>

          <h1 className="hero-title display">
            Administration<br />
            <span className="accent">Communale</span>
          </h1>

          <p className="hero-sub">
            Services administratifs modernes et efficaces pour tous vos besoins officiels à Mamou.
          </p>

          {/* Search */}
          <div className="search-shell">
            <div className="search-inner">
              <div className="search-field">
                <Search size={15} style={{ color: "var(--ink-light)", flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Rechercher une démarche..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn-filter" onClick={() => setShowFilters(v => !v)}>
                <Filter size={13} /> Filtres
              </button>
            </div>
            {showFilters && (
              <div className="filter-chips">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`chip${selectedCategory === cat.id ? " active" : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ════ CONTACT STRIP ════ */}
      <div className="contact-strip">
        <div className="contact-strip-inner">
          {[
            { Icon: Clock,  label: "Horaires",  value: "Lun–Ven : 8h–16h",      color: "var(--gold)"    },
            { Icon: Phone,  label: "Téléphone", value: "+224 620 15 04 81",       color: "#4ade80"        },
            { Icon: Mail,   label: "Email",     value: "contact@villedemamou.com",     color: "#60a5fa"        },
            { Icon: MapPin, label: "Adresse",   value: "Centre-ville, Mamou",    color: "#fb923c"        },
          ].map(({ Icon, label, value, color }) => (
            <div className="contact-cell" key={label}>
              <div className="contact-icon-wrap">
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p className="contact-label">{label}</p>
                <p className="contact-value">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ MAIN ════ */}
      <main>

        {/* ── Officials ─────────────────────────── */}
        {groups.length > 0 && (
          <section className="page-wrap" style={{ paddingBottom: 0 }}>
            <div className="section-header center">
              <p className="eyebrow">Gouvernance Locale</p>
              <h2>Élus & <em>Responsables</em></h2>
              <p>Rencontrez les personnes qui servent notre communauté avec dévouement.</p>
            </div>

            {groups.map((g, gi) => (
              <div key={g.key} style={{ marginBottom: gi < groups.length - 1 ? 64 : 0 }}>
                <GroupBanner title={g.title} icon={g.icon} accent={g.accent} />
                <div className={g.compact ? "off-grid-sm" : "off-grid-lg"}>
                  {g.officials.map(o => (
                    <OfficialCard
                      key={o.id} official={o}
                      getImageUrl={getImageUrl} getBiographyText={getBiographyText}
                      compact={g.compact} accentColor={g.accent}
                      basicOnly={g.key === "delegation"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── Rule ─────────────────────────────── */}
        <div className="page-wrap" style={{ paddingTop: 72, paddingBottom: 0 }}>
          <hr className="page-rule" />
        </div>

        {/* ── Documents ────────────────────────── */}
        <section className="page-wrap">
          <div className="section-header center">
            <p className="eyebrow">Démarches Administratives</p>
            <h2>Documents <em>Officiels</em></h2>
            <p>Obtenez facilement tous vos documents officiels avec nos services rapides et transparents.</p>
          </div>

          <div className="doc-toolbar">
            <span className="result-count">
              {filteredDocuments.length} résultat{filteredDocuments.length !== 1 ? "s" : ""}
            </span>
            <div className="view-toggle">
              {[{ mode: "grid", Icon: Grid }, { mode: "list", Icon: List }].map(({ mode, Icon }) => (
                <button
                  key={mode}
                  className={`vt-btn${viewMode === mode ? " active" : ""}`}
                  onClick={() => setViewMode(mode)}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="empty-state">
              <FileText size={52} style={{ color: "var(--border)", margin: "0 auto 14px", display: "block" }} />
              <h3>Aucun document trouvé</h3>
              <p>Essayez d'ajuster vos filtres ou votre terme de recherche.</p>
              <button className="btn-reset" onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                Réinitialiser les filtres
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="doc-grid">
              {filteredDocuments.map(doc => (
                <DocCard key={doc.id} doc={doc} getDocumentIcon={getDocumentIcon} getDescriptionText={getDescriptionText} generatePDF={generatePDF} />
              ))}
            </div>
          ) : (
            <div className="doc-list">
              {filteredDocuments.map(doc => (
                <DocCard key={doc.id} doc={doc} getDocumentIcon={getDocumentIcon} getDescriptionText={getDescriptionText} generatePDF={generatePDF} listMode />
              ))}
            </div>
          )}
        </section>

        {/* ── Rule ─────────────────────────────── */}
        <div className="page-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <hr className="page-rule" />
        </div>

        {/* ── FAQ ──────────────────────────────── */}
        <section className="page-wrap">
          <div className="faq-two-col">
            <div className="faq-sticky">
              <p className="eyebrow" style={{ marginBottom: 16 }}>Aide & Support</p>
              <h2 className="display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.15, marginBottom: 16 }}>
                Questions<br /><em style={{ color: "var(--cobalt)", fontWeight: 400 }}>Fréquentes</em>
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75, maxWidth: 320 }}>
                Tout ce que vous devez savoir avant de vous rendre à nos guichets administratifs.
              </p>
            </div>
            <div>
              {faqData.map((faq, i) => (
                <FaqItem
                  key={i} faq={faq}
                  isOpen={openFaqIndex === i}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Administration;
