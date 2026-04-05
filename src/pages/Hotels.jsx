"use client"

import { Mail, MapPin, Phone, Users, Star } from "lucide-react"
import { Helmet } from "react-helmet-async"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

/* ─────────────────────────────────────────────────
   DESIGN SYSTEM — Hotels Edition
   Font: Poppins
   Tone: aspirational hospitality, warm luxury,
         premium destination travel feel
───────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');

  :root {
    --ht-navy:       #0c1b33;
    --ht-cobalt:     #1d4ed8;
    --ht-gold:       #fbbf24;
    --ht-gold-pale:  #fdf6e3;
    --ht-gold-dim:   rgba(201,168,76,0.14);
    --ht-surface:    #f5f7fa;
    --ht-surface-2:  #eef1f6;
    --ht-white:      #ffffff;
    --ht-ink:        #0c1b33;
    --ht-ink-mid:    #3d5068;
    --ht-ink-light:  #7a90ab;
    --ht-border:     #dde3ed;
    --ht-green:      #15803d;
  }

  /* ── Root ───────────────────────────────────── */
  .ht-root {
    min-height: 100vh;
    background: var(--ht-surface);
    font-family: 'Poppins', system-ui, sans-serif;
    color: var(--ht-ink);
  }
  .ht-root * { box-sizing: border-box; }

  /* ── Hero ───────────────────────────────────── */
  .ht-hero {
    position: relative;
    height: clamp(480px, 65vh, 640px);
    overflow: hidden;
    display: flex; align-items: flex-end;
    padding-bottom: clamp(52px, 9vh, 96px);
  }
  .ht-hero-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    background-attachment: fixed;
    filter: saturate(0.7) brightness(0.8);
    transform: scale(1.04);
    transition: transform 12s ease;
  }
  .ht-hero:hover .ht-hero-bg { transform: scale(1); }

  .ht-hero-scrim {
    position: absolute; inset: 0;
    background:
      linear-gradient(to top,   rgba(12,27,51,0.95) 0%,  rgba(12,27,51,0.0) 55%),
      linear-gradient(to bottom,rgba(12,27,51,0.50) 0%,  rgba(12,27,51,0.0) 35%),
      linear-gradient(to right, rgba(12,27,51,0.45) 0%,  rgba(12,27,51,0.0) 58%);
  }
  /* Gold left rule */
  .ht-hero-bar {
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(to bottom, transparent, var(--ht-gold) 35%, var(--ht-gold) 65%, transparent);
  }

  .ht-hero-inner {
    position: relative; z-index: 5;
    max-width: 1200px; margin: 0 auto;
    padding: 0 max(6vw, 28px); width: 100%;
  }
  .ht-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--ht-gold); margin-bottom: 16px;
  }
  .ht-hero-eyebrow::before { content:''; width:22px; height:1px; background:currentColor; }

  .ht-hero-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(2.6rem, 7.5vw, 5.6rem);
    font-weight: 800; line-height: 1.04; color: #fff;
    margin-bottom: 18px; letter-spacing: -0.01em;
  }
  .ht-hero-title .gold { color: var(--ht-gold); font-weight: 300; font-style: italic; }

  .ht-hero-sub {
    font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.52);
    max-width: 480px; margin-bottom: 28px;
  }

  /* Trust tags */
  .ht-trust-row { display: flex; flex-wrap: wrap; gap: 16px; }
  .ht-trust-item {
    display: flex; align-items: center; gap: 7px;
    font-size: 12px; color: rgba(255,255,255,0.55); font-weight: 500;
  }

  /* ── Page Layout ────────────────────────────── */
  .ht-main { max-width: 1200px; margin: 0 auto; padding: clamp(64px, 9vw, 96px) max(5vw, 24px); }

  /* ── Section Header ─────────────────────────── */
  .ht-sec-header { text-align: center; margin-bottom: 44px; }
  .ht-sec-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ht-gold); margin-bottom: 10px;
  }
  .ht-sec-eyebrow::before, .ht-sec-eyebrow::after { content:''; width:18px; height:1px; background:currentColor; }
  .ht-sec-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.6rem, 3.5vw, 2.5rem); font-weight: 700; line-height: 1.15; color: var(--ht-ink);
  }
  .ht-sec-title .accent { color: var(--ht-gold); font-weight: 300; font-style: italic; }
  .ht-sec-sub { font-size: 14px; color: var(--ht-ink-mid); line-height: 1.75; max-width: 500px; margin: 10px auto 0; }

  /* ── Hotel Grid ─────────────────────────────── */
  .ht-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }

  /* ── Hotel Card ─────────────────────────────── */
  .ht-card {
    background: var(--ht-white);
    border: 1px solid var(--ht-border);
    overflow: hidden; display: flex; flex-direction: column;
    transition: box-shadow .25s, transform .25s;
  }
  .ht-card:hover { box-shadow: 0 18px 52px rgba(12,27,51,0.13); transform: translateY(-3px); }

  /* Image */
  .ht-card-img { position: relative; height: 220px; overflow: hidden; flex-shrink: 0; }
  .ht-card-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform .65s ease;
  }
  .ht-card:hover .ht-card-img img { transform: scale(1.04); }

  .ht-card-img-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(12,27,51,0.55) 0%, transparent 55%);
  }

  /* Badges on image */
  .ht-card-type {
    position: absolute; top: 14px; right: 14px;
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    background: var(--ht-gold); color: var(--ht-navy); padding: 4px 11px;
  }
  .ht-card-rooms {
    position: absolute; bottom: 14px; left: 14px;
    display: flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.8);
    background: rgba(12,27,51,0.65); backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.15); padding: 4px 10px;
  }

  /* Gold top accent bar */
  .ht-card-bar { height: 2px; background: var(--ht-gold); flex-shrink: 0; }

  /* Card body */
  .ht-card-body { padding: 20px 22px; flex: 1; display: flex; flex-direction: column; }

  .ht-card-name {
    font-size: 16px; font-weight: 700; color: var(--ht-ink);
    margin-bottom: 8px; line-height: 1.25;
  }

  .ht-card-location {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; color: var(--ht-ink-light); font-weight: 500;
    margin-bottom: 12px;
  }

  .ht-card-desc {
    font-size: 12px; color: var(--ht-ink-mid); line-height: 1.75;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden; flex: 1; margin-bottom: 16px;
  }

  /* Contact rows */
  .ht-card-contacts { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
  .ht-card-contact-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; color: var(--ht-ink-mid); font-weight: 500;
  }
  .ht-card-contact-icon {
    width: 20px; height: 20px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }

  /* Footer: price + CTA */
  .ht-card-footer {
    border-top: 1px solid var(--ht-border); padding-top: 16px; margin-top: auto;
    display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .ht-price-block {}
  .ht-price-num {
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem; font-weight: 800; color: var(--ht-ink); line-height: 1;
  }
  .ht-price-unit { font-size: 10px; color: var(--ht-ink-light); font-weight: 500; margin-top: 2px; }

  .ht-reserve-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--ht-navy); color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    border: none; padding: 10px 18px; cursor: pointer;
    transition: background .2s;
  }
  .ht-reserve-btn:hover { background: var(--ht-cobalt); }

  /* ── Empty State ────────────────────────────── */
  .ht-empty {
    text-align: center; padding: 80px 24px;
    border: 1px solid var(--ht-border); background: var(--ht-white); grid-column: 1/-1;
  }
  .ht-empty h3 { font-size: 1.25rem; font-weight: 700; color: var(--ht-ink-mid); margin: 14px 0 7px; }
  .ht-empty p  { font-size: 13px; color: var(--ht-ink-light); }

  /* ── Rule ───────────────────────────────────── */
  .ht-rule { border:none; border-top:1px solid var(--ht-border); margin: 0; }

  /* ── Contact Strip ──────────────────────────── */
  .ht-contact-strip {
    background: var(--ht-navy);
    padding: clamp(56px, 8vw, 96px) max(5vw, 24px);
    position: relative; overflow: hidden;
  }
  .ht-contact-strip::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background: linear-gradient(to right, transparent, var(--ht-gold), transparent);
  }
  .ht-contact-strip::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .ht-contact-inner {
    max-width: 1200px; margin: 0 auto; position: relative; z-index: 2;
  }
  .ht-contact-header { text-align: center; margin-bottom: 44px; }
  .ht-contact-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ht-gold); margin-bottom: 12px;
  }
  .ht-contact-eyebrow::before, .ht-contact-eyebrow::after { content:''; width:16px; height:1px; background:currentColor; }
  .ht-contact-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 700; color: #fff; line-height: 1.2;
    margin-bottom: 10px;
  }
  .ht-contact-title .gold { color: var(--ht-gold); font-weight: 300; font-style: italic; }
  .ht-contact-sub { font-size: 13px; color: rgba(255,255,255,0.45); max-width: 460px; margin: 0 auto; line-height: 1.75; }

  .ht-contact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    max-width: 800px; margin: 0 auto;
  }
  @media (max-width: 560px) { .ht-contact-grid { grid-template-columns: 1fr; } }

  .ht-contact-panel {
    background: rgba(255,255,255,0.03);
    padding: 32px 28px; transition: background .2s;
  }
  .ht-contact-panel:hover { background: rgba(255,255,255,0.06); }

  .ht-contact-panel-title {
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--ht-gold); margin-bottom: 18px;
  }

  .ht-contact-row {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 13px; font-size: 13px; color: rgba(255,255,255,0.6);
  }
  .ht-contact-row:last-child { margin-bottom: 0; }
  .ht-contact-icon-wrap {
    width: 28px; height: 28px; flex-shrink: 0;
    border: 1px solid rgba(201,168,76,0.2);
    display: flex; align-items: center; justify-content: center; color: var(--ht-gold);
  }

  .ht-service-list {
    display: flex; flex-direction: column; gap: 10px;
  }
  .ht-service-item {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,0.6);
  }
  .ht-service-dot { width: 3px; height: 3px; background: var(--ht-gold); border-radius: 50%; flex-shrink: 0; }

  /* ── Responsive ─────────────────────────────── */
  @media (max-width: 640px) {
    .ht-grid { grid-template-columns: 1fr; }
    .ht-hero-title { font-size: clamp(2.2rem, 13vw, 4rem); }
    .ht-trust-row { gap: 10px; }
  }
`;

function Hotels({ hotels = [] }) {
  /* ── Helpers (unchanged logic) ───────────────── */
  const getImageUrl = imageArray => {
    if (!imageArray?.length) return "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
    const img = imageArray[0];
    return img.url.startsWith("http") ? img.url : `https://api.villedemamou.org${img.url}`;
  };

  const getDescriptionText = arr => {
    if (!arr?.length) return "Description non disponible";
    const b = arr[0];
    if (b.children?.length > 0) return b.children[0].text || "Description non disponible";
    return "Description non disponible";
  };

  const formatPrice = price => new Intl.NumberFormat("fr-GN", { style: "decimal", maximumFractionDigits: 0 }).format(price);

  console.log("Hotels data in component:", hotels);

  const heroImage = hotels.length > 0 && hotels[0].image
    ? getImageUrl(hotels[0].image)
    : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div className="ht-root">
      <style>{CSS}</style>
      <Helmet>
        <title>Hôtels à Mamou | Ville de Mamou</title>
        <meta name="description" content="Trouvez les hôtels et hébergements à Mamou avec informations de contact, localisation, services et prix moyens." />
      </Helmet>

      {/* NavBar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50 }}><NavBar /></div>

      {/* ════ HERO ════ */}
      <header className="ht-hero" style={{ paddingTop: 80 }}>
        <div className="ht-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="ht-hero-scrim" />
        <div className="ht-hero-bar" />
        <div className="ht-hero-inner">
          <p className="ht-hero-eyebrow">Hébergement à Mamou</p>
          <h1 className="ht-hero-title">
            Hôtels à <span className="gold">Mamou</span>
          </h1>
          <p className="ht-hero-sub">
            Découvrez les meilleurs hébergements pour un séjour inoubliable dans notre belle région.
          </p>
          <div className="ht-trust-row">
            <span className="ht-trust-item"><Star size={13} style={{ color: "var(--ht-gold)" }} /> Hôtels de qualité</span>
            <span className="ht-trust-item"><MapPin size={13} style={{ color: "var(--ht-gold)" }} /> Centre-ville de Mamou</span>
          </div>
        </div>
      </header>

      {/* ════ HOTELS GRID ════ */}
      <main className="ht-main">
        <div className="ht-sec-header">
          <p className="ht-sec-eyebrow">Établissements</p>
          <h2 className="ht-sec-title">Nos <span className="accent">Hébergements</span></h2>
          <p className="ht-sec-sub">Une sélection d'hôtels et résidences pour tous les budgets et tous les goûts.</p>
        </div>

        {hotels.length === 0 ? (
          <div className="ht-grid">
            <div className="ht-empty">
              <h3>Chargement des hôtels…</h3>
              <p>Les informations sur les hébergements arrivent bientôt.</p>
            </div>
          </div>
        ) : (
          <div className="ht-grid">
            {hotels.map(hotel => (
              <div key={hotel.id} className="ht-card">
                {/* Image */}
                <div className="ht-card-img">
                  <img
                    src={getImageUrl(hotel.image)}
                    alt={hotel.nom}
                    onError={e => { e.target.src = "/placeholder.svg?height=300&width=500"; }}
                  />
                  <div className="ht-card-img-scrim" />
                  <span className="ht-card-type">{hotel.typeHotel || "Hôtel"}</span>
                  {hotel.nombreChambres && (
                    <span className="ht-card-rooms">
                      <Users size={10} /> {hotel.nombreChambres} chambres
                    </span>
                  )}
                </div>
                <div className="ht-card-bar" />

                {/* Body */}
                <div className="ht-card-body">
                  <h3 className="ht-card-name">{hotel.nom}</h3>
                  <p className="ht-card-location">
                    <MapPin size={11} style={{ color: "var(--ht-gold)", flexShrink: 0 }} />
                    {hotel.localisation || "Mamou"}
                  </p>
                  <p className="ht-card-desc">{getDescriptionText(hotel.description)}</p>

                  {(hotel.telephoneContact || hotel.emailContact) && (
                    <div className="ht-card-contacts">
                      {hotel.telephoneContact && (
                        <div className="ht-card-contact-row">
                          <div className="ht-card-contact-icon" style={{ background: "#dcfce7" }}><Phone size={10} style={{ color: "#15803d" }} /></div>
                          {hotel.telephoneContact}
                        </div>
                      )}
                      {hotel.emailContact && (
                        <div className="ht-card-contact-row">
                          <div className="ht-card-contact-icon" style={{ background: "#dbeafe" }}><Mail size={10} style={{ color: "#1d4ed8" }} /></div>
                          {hotel.emailContact}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="ht-card-footer">
                    <div className="ht-price-block">
                      {hotel.prixParNuit ? (
                        <>
                          <p className="ht-price-num">{formatPrice(hotel.prixParNuit)} GNF</p>
                          <p className="ht-price-unit">par nuit</p>
                        </>
                      ) : (
                        <p className="ht-price-unit">Prix sur demande</p>
                      )}
                    </div>
                    <button className="ht-reserve-btn">Réserver</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ════ CONTACT STRIP ════ */}
      <div className="ht-contact-strip bg-white">
        <div className="ht-contact-inner">
          <div className="ht-contact-header">
            <p className="ht-contact-eyebrow">Assistance</p>
            <h2 className="ht-contact-title">Besoin d'aide pour votre <span className="gold">réservation</span> ?</h2>
            <p className="ht-contact-sub">Notre équipe est à votre disposition pour vous aider à trouver l'hébergement idéal.</p>
          </div>

          <div className="ht-contact-grid">
            <div className="ht-contact-panel">
              <p className="ht-contact-panel-title">Contactez-nous</p>
              <div className="ht-contact-row">
                <div className="ht-contact-icon-wrap"><Phone size={13} /></div>
                +224 620 15 04 81
              </div>
              <div className="ht-contact-row">
                <div className="ht-contact-icon-wrap"><Mail size={13} /></div>
                contact@villedemamou.com
              </div>
              <div className="ht-contact-row">
                <div className="ht-contact-icon-wrap"><MapPin size={13} /></div>
                Centre-ville, Mamou, Guinée
              </div>
            </div>
            <div className="ht-contact-panel">
              <p className="ht-contact-panel-title">Services disponibles</p>
              <div className="ht-service-list">
                {["Réservation en ligne", "Service client 24/7", "Annulation gratuite", "Meilleurs prix garantis"].map((s, i) => (
                  <div className="ht-service-item" key={i}>
                    <span className="ht-service-dot" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels;