"use client"

import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Clock, Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from "lucide-react"
import { useState } from "react"
import { FaHome, FaWhatsapp } from "react-icons/fa"
import { Helmet } from "react-helmet-async"
import NavBar from "../components/NavBar"

/* ─────────────────────────────────────────────────
   DESIGN SYSTEM — Contact Edition
   Tone: refined civic institution, warm and accessible
   The most "human" page on the site — people reach
   out here. Warm parchment surface, generous whitespace,
   editorial form design. Shared token set.
───────────────────────────────────────────────── */
const CSS = `
  :root {
    --ct-navy:       #032836;
    --ct-cobalt:     #0992c2;
    --ct-cobalt-dark:#086a8b;
    --ct-cobalt-soft:#43bfd8;
    --ct-cobalt-pale:#eef9fc;
    --ct-surface:    #eef9fc;
    --ct-surface-2:  #d7f2f9;
    --ct-white:      #ffffff;
    --ct-ink:        #053f53;
    --ct-ink-mid:    #086a8b;
    --ct-ink-light:  #43bfd8;
    --ct-border:     #afe5f2;
    --ct-green:      #087ea7;
    --ct-green-pale: #d7f2f9;
  }

  /* ── Root ───────────────────────────────────── */
  .ct-root {
    min-height: 100vh;
    background: var(--ct-surface);
    font-family: 'Poppins', system-ui, sans-serif;
    color: var(--ct-ink);
  }
  .ct-root * { box-sizing: border-box; }

  /* ── Hero ───────────────────────────────────── */
  .ct-hero {
    background: var(--ct-navy);
    padding: clamp(80px, 14vh, 140px) max(6vw, 28px) clamp(52px, 8vh, 88px);
    position: relative; overflow: hidden;
  }
  /* Gold left rule */
  .ct-hero::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(to bottom, transparent, var(--ct-cobalt) 35%, var(--ct-cobalt) 65%, transparent);
  }
  /* Dot-grid texture */
  .ct-hero::after {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .ct-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }

  .ct-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--ct-cobalt-soft); margin-bottom: 16px;
  }
  .ct-hero-eyebrow::before { content:''; width:22px; height:1px; background:currentColor; }

  .ct-hero-title {
    font-size: clamp(2.4rem, 6vw, 5rem);
    font-weight: 700; line-height: 1.06; color: #fff;
    margin-bottom: 16px;
  }
  .ct-hero-title em { font-style: italic; color: var(--ct-cobalt-soft); }

  .ct-hero-sub {
    font-size: 15px; color: rgba(255,255,255,0.76);
    line-height: 1.75; max-width: 460px; margin-bottom: 22px;
  }
  .ct-breadcrumb {
    display: flex; align-items: center; gap: 7px;
    font-size: 11px; color: rgba(255,255,255,0.35);
  }
  .ct-breadcrumb a { color:inherit; text-decoration:none; transition:color .2s; }
  .ct-breadcrumb a:hover { color: var(--ct-cobalt-soft); }
  .ct-breadcrumb .cur { color: rgba(255,255,255,0.6); font-weight:500; }
  .ct-breadcrumb .sep { opacity:.35; }

  /* ── Page Layout ────────────────────────────── */
  .ct-main {
    max-width: 1200px; margin: 0 auto;
    padding: clamp(56px,8vw,96px) max(5vw, 24px);
  }
  .ct-grid {
    display: grid; grid-template-columns: 1fr 1.7fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: start;
  }
  @media (max-width: 900px) { .ct-grid { grid-template-columns: 1fr; } }

  /* ── Info Panel ─────────────────────────────── */
  .ct-info-panel { display: flex; flex-direction: column; gap: 0; }

  .ct-info-card {
    background: var(--ct-white);
    border: 1px solid var(--ct-border);
    padding: clamp(24px, 4vw, 36px);
    box-shadow: 0 20px 44px rgba(8, 126, 167, 0.08);
  }

  .ct-panel-title {
    font-size: 1.5rem; font-weight: 700; color: var(--ct-ink);
    margin-bottom: 24px; line-height: 1.2;
  }
  .ct-panel-title em { font-style:italic; color: var(--ct-cobalt); }

  .ct-contact-list { display: flex; flex-direction: column; gap: 0; }

  .ct-contact-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 16px 0;
    border-bottom: 1px solid var(--ct-border);
  }
  .ct-contact-item:last-child { border-bottom: none; }

  .ct-contact-icon-wrap {
    width: 36px; height: 36px; flex-shrink: 0;
    border: 1px solid var(--ct-border);
    display: flex; align-items: center; justify-content: center;
    transition: border-color .2s, background .2s;
  }
  .ct-contact-item:hover .ct-contact-icon-wrap {
    border-color: var(--ct-cobalt); background: var(--ct-cobalt-pale);
  }

  .ct-contact-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ct-cobalt); margin-bottom: 3px;
  }
  .ct-contact-value {
    font-size: 13px; color: var(--ct-ink-mid); line-height: 1.65; font-weight: 400;
  }

  /* ── Social block ───────────────────────────── */
  .ct-social-card {
    background: var(--ct-navy);
    border: 1px solid rgba(255,255,255,0.07);
    border-top: none;
    padding: 24px clamp(24px, 4vw, 36px);
  }
  .ct-social-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ct-cobalt-soft); margin-bottom: 16px; display: block;
  }
  .ct-social-row { display: flex; gap: 10px; }
  .ct-social-link {
    width: 38px; height: 38px;
    border: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.55); text-decoration: none; font-size: 14px;
    transition: border-color .2s, color .2s;
  }
  .ct-social-link:hover { border-color: var(--ct-cobalt-soft); color: var(--ct-cobalt-soft); }

  /* ── Form Panel ─────────────────────────────── */
  .ct-form-card {
    background: var(--ct-white);
    border: 1px solid var(--ct-border);
    box-shadow: 0 20px 44px rgba(8, 126, 167, 0.08);
  }

  /* Tab strip */
  .ct-tabs {
    display: flex; border-bottom: 1px solid var(--ct-border);
  }
  .ct-tab {
    padding: 16px 24px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ct-ink-light); background: transparent; border: none;
    border-bottom: 2px solid transparent; margin-bottom: -1px;
    cursor: pointer; transition: color .2s, border-color .2s;
    white-space: nowrap;
  }
  .ct-tab:hover { color: var(--ct-ink); }
  .ct-tab.active { color: var(--ct-cobalt-dark); border-bottom-color: var(--ct-cobalt); }

  /* Form body */
  .ct-form-body { padding: clamp(24px, 4vw, 40px); }

  /* Field */
  .ct-field { margin-bottom: 22px; }
  .ct-label {
    display: block;
    font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--ct-ink-mid); margin-bottom: 8px;
  }
  .ct-input, .ct-textarea {
    width: 100%;
    border: 1px solid var(--ct-border);
    background: var(--ct-surface);
    font-family: 'Poppins', sans-serif; font-size: 14px; color: var(--ct-ink);
    padding: 12px 16px; outline: none;
    transition: border-color .2s, background .2s;
    border-radius: 18px;
  }
  .ct-input:focus, .ct-textarea:focus {
    border-color: var(--ct-cobalt);
    background: var(--ct-white);
  }
  .ct-input::placeholder, .ct-textarea::placeholder { color: var(--ct-ink-light); }
  .ct-textarea { resize: vertical; min-height: 130px; }

  /* Two-col fields */
  .ct-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 560px) { .ct-field-row { grid-template-columns: 1fr; } }

  /* Submit button */
  .ct-submit {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--ct-navy); color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    border: none; padding: 14px 28px; cursor: pointer;
    transition: background .22s;
    border-radius: 999px;
  }
  .ct-submit:hover:not(:disabled) { background: var(--ct-cobalt-dark); }
  .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Success message */
  .ct-success {
    display: flex; align-items: flex-start; gap: 14px;
    background: var(--ct-green-pale);
    border: 1px solid rgba(8,126,167,0.2);
    padding: 20px 22px;
    border-radius: 24px;
  }
  .ct-success-text h3 {
    font-size: 1.2rem; font-weight: 700; color: var(--ct-green); margin-bottom: 4px;
  }
  .ct-success-text p { font-size: 13px; color: var(--ct-cobalt-dark); }

  /* ── Rule ───────────────────────────────────── */
  .ct-rule { border:none; border-top:1px solid var(--ct-border); margin: clamp(56px,8vw,80px) 0; }

  /* ── Map Section ────────────────────────────── */
  .ct-map-wrap {
    display: grid; grid-template-columns: 1fr 1.5fr;
    border: 1px solid var(--ct-border);
    overflow: hidden;
  }
  @media (max-width: 768px) { .ct-map-wrap { grid-template-columns: 1fr; } }

  .ct-map-info {
    background: var(--ct-navy);
    padding: clamp(28px, 5vw, 56px);
    display: flex; flex-direction: column; justify-content: center;
    position: relative; overflow: hidden;
  }
  .ct-map-info::before {
    content:''; position:absolute; top:-60px; right:-60px;
    width:180px; height:180px;
    border: 1px solid rgba(67,191,216,0.18); border-radius: 50%;
  }
  .ct-map-info::after {
    content:''; position:absolute; bottom:-70px; left:-30px;
    width:220px; height:220px;
    border: 1px solid rgba(67,191,216,0.1); border-radius: 50%;
  }
  .ct-map-info-inner { position: relative; z-index: 2; }
  .ct-map-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ct-cobalt-soft); margin-bottom: 14px;
  }
  .ct-map-eyebrow::before { content:''; width:16px; height:1px; background:currentColor; }
  .ct-map-info h2 {
    font-size: clamp(1.5rem, 2.8vw, 2.2rem); font-weight: 700; color:#fff; line-height: 1.2;
    margin-bottom: 14px;
  }
  .ct-map-info p { font-size: 13px; color: rgba(255,255,255,0.76); line-height: 1.75; margin-bottom: 24px; }
  .ct-map-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--ct-cobalt); color: var(--ct-white);
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    border: none; padding: 12px 22px; cursor: pointer; align-self: flex-start;
    text-decoration: none; transition: background .2s;
    border-radius: 999px;
  }
  .ct-map-btn:hover { background: var(--ct-cobalt-dark); }

  .ct-map-embed { min-height: 380px; }
  .ct-map-embed iframe { width:100%; height:100%; min-height:380px; border:0; display:block; }

  /* ── FAQ ────────────────────────────────────── */
  .ct-faq-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: var(--ct-border);
    border: 1px solid var(--ct-border);
  }
  @media (max-width: 640px) { .ct-faq-grid { grid-template-columns: 1fr; } }

  .ct-faq-item {
    background: var(--ct-white);
    padding: 28px 26px;
    transition: background .18s;
  }
  .ct-faq-item:hover { background: var(--ct-cobalt-pale); }

  .ct-faq-q {
    font-size: 1.05rem; font-weight: 700; color: var(--ct-ink);
    line-height: 1.3; margin-bottom: 10px;
  }
  .ct-faq-a { font-size: 13px; color: var(--ct-ink-mid); line-height: 1.75; }

  /* ── Section header ─────────────────────────── */
  .ct-sec-header { margin-bottom: 32px; }
  .ct-sec-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ct-cobalt); margin-bottom: 10px;
  }
  .ct-sec-eyebrow::before, .ct-sec-eyebrow::after { content:''; width:16px; height:1px; background:currentColor; }
  .ct-sec-title {
    font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 700; line-height: 1.15; color: var(--ct-ink);
  }
  .ct-sec-title em { font-style:italic; color: var(--ct-cobalt); }
`;

/* ─────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────── */
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  /* ── Handlers (unchanged) ────────────────────── */
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  const contactItems = [
    { icon: <MapPin size={15} style={{ color: "var(--ct-cobalt)" }} />, label: "Adresse",            value: "Préfecture de Mamou, Région de Mamou, Guinée" },
    { icon: <Phone  size={15} style={{ color: "var(--ct-cobalt)" }} />, label: "Téléphone",          value: "+224 620 15 04 81" },
    { icon: <Mail   size={15} style={{ color: "var(--ct-cobalt)" }} />, label: "Email",              value: "contact@villedemamou.com" },
    { icon: <Clock  size={15} style={{ color: "var(--ct-cobalt)" }} />, label: "Heures d'ouverture", value: "Lun–Ven : 8h00–17h00 · Sam : 9h00–13h00 · Dim : Fermé" },
  ]

  const faqs = [
    { q: "Quels sont les horaires d'ouverture de la préfecture ?",    a: "La préfecture est ouverte du lundi au vendredi de 8h00 à 17h00, le samedi de 9h00 à 13h00, et fermée le dimanche." },
    { q: "Comment obtenir des informations touristiques ?",           a: "Contactez-nous par téléphone, email ou en personne. Nous proposons également des brochures et guides touristiques." },
    { q: "Est-il possible de réserver un guide touristique ?",        a: "Oui, nous proposons des services de guide. Contactez-nous au moins 48 heures à l'avance pour effectuer une réservation." },
    { q: "Comment signaler un problème dans la ville ?",              a: "Utilisez notre formulaire de contact ou appelez directement le service concerné pour tout signalement." },
  ]

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div className="ct-root">
      <style>{CSS}</style>
      <Helmet>
        <title>Contact | Ville de Mamou</title>
        <meta name="description" content="Contactez la Ville de Mamou pour vos demandes générales, informations touristiques, horaires administratifs et coordonnées utiles." />
      </Helmet>

      {/* NavBar */}
      <div style={{ position: "relative", zIndex: 50 }}><NavBar /></div>

      {/* ════ HERO ════ */}
      <header className="ct-hero">
        <div className="ct-hero-inner">
          <p className="ct-hero-eyebrow">Ville de Mamou</p>
          <h1 className="ct-hero-title">
            Contactez-<em>nous</em>
          </h1>
          <p className="ct-hero-sub">
            Nous sommes à votre écoute pour toute question, demande d'information ou signalement.
          </p>
          <nav className="ct-breadcrumb">
            <a href="/"><FaHome size={11} style={{ display: "inline" }} /> Accueil</a>
            <span className="sep">›</span>
            <span className="cur">Contact</span>
          </nav>
        </div>
      </header>

      {/* ════ MAIN ════ */}
      <main className="ct-main">

        {/* ── Two-column contact grid ── */}
        <div className="ct-grid">

          {/* Left: Info + Social */}
          <div className="ct-info-panel">
            <div className="ct-info-card">
              <h2 className="ct-panel-title">Coordonnées <em>& Horaires</em></h2>
              <div className="ct-contact-list">
                {contactItems.map((item, i) => (
                  <div className="ct-contact-item" key={i}>
                    <div className="ct-contact-icon-wrap">{item.icon}</div>
                    <div>
                      <p className="ct-contact-label">{item.label}</p>
                      <p className="ct-contact-value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ct-social-card">
              <span className="ct-social-label">Suivez-nous</span>
              <div className="ct-social-row">
                <motion.a href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                  whileHover={{ y: -3 }} className="ct-social-link" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook size={15} />
                </motion.a>
                <motion.a href="https://wa.me/224620150481"
                  whileHover={{ y: -3 }} className="ct-social-link" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp size={15} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="ct-form-card">
            {/* Tab navigation */}
            <div className="ct-tabs">
              <button className={`ct-tab${activeTab === "general" ? " active" : ""}`} onClick={() => setActiveTab("general")}>
                Demande générale
              </button>
              <button className={`ct-tab${activeTab === "articles" ? " active" : ""}`} onClick={() => setActiveTab("articles")}>
                Informations touristiques
              </button>
            </div>

            <div className="ct-form-body">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ct-success">
                  <CheckCircle size={20} style={{ color: "var(--ct-green)", flexShrink: 0, marginTop: 2 }} />
                  <div className="ct-success-text">
                    <h3>Message envoyé</h3>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <label htmlFor="name" className="ct-label">Nom complet</label>
                      <input id="name" name="name" type="text" className="ct-input"
                        placeholder="Votre nom" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="ct-field">
                      <label htmlFor="email" className="ct-label">Adresse email</label>
                      <input id="email" name="email" type="email" className="ct-input"
                        placeholder="votre@email.com" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label htmlFor="subject" className="ct-label">Sujet</label>
                    <input id="subject" name="subject" type="text" className="ct-input"
                      placeholder="Objet de votre message" value={formData.subject} onChange={handleChange} required />
                  </div>

                  <div className="ct-field" style={{ marginBottom: 28 }}>
                    <label htmlFor="message" className="ct-label">Message</label>
                    <textarea id="message" name="message" className="ct-textarea"
                      placeholder="Décrivez votre demande en détail…"
                      value={formData.message} onChange={handleChange} required />
                  </div>

                  <button type="submit" className="ct-submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? <span>Envoi en cours…</span>
                      : <><Send size={13} /> Envoyer le message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr className="ct-rule" />

        {/* ── Map ── */}
        <section>
          <div className="ct-sec-header">
            <p className="ct-sec-eyebrow">Localisation</p>
            <h2 className="ct-sec-title">Notre <em>emplacement</em></h2>
          </div>
          <div className="ct-map-wrap">
            <div className="ct-map-info">
              <div className="ct-map-info-inner">
                <p className="ct-map-eyebrow">Carte interactive</p>
                <h2>Trouvez-nous<br />à Mamou</h2>
                <p>Centre-ville de Mamou, chef-lieu de la préfecture et de la région de Mamou, Guinée.</p>
                <a href="https://maps.app.goo.gl/NmFfQYZvd7BK5CmU6" target="_blank" rel="noreferrer" className="ct-map-btn">
                  <MapPin size={12} /> Ouvrir dans Google Maps
                </a>
              </div>
            </div>
            <div className="ct-map-embed">
              <iframe
                title="Carte de Mamou"
                src="https://www.google.com/maps?q=Mamou,+Guinea&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="ct-rule" />

        {/* ── FAQ ── */}
        <section>
          <div className="ct-sec-header">
            <p className="ct-sec-eyebrow">Aide</p>
            <h2 className="ct-sec-title">Questions <em>fréquentes</em></h2>
          </div>
          <div className="ct-faq-grid">
            {faqs.map((faq, i) => (
              <div className="ct-faq-item" key={i}>
                <h3 className="ct-faq-q">{faq.q}</h3>
                <p className="ct-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default Contact
