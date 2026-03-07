"use client"

import { Calendar, MapPin, Camera, Info, ChevronRight, Compass, ArrowRight } from "lucide-react"
import { Helmet } from "react-helmet-async"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function PlaceVisite({ places = [] }) {
  const getImageUrl = (imageArray) => {
    if (!imageArray || !imageArray.length) return "/placeholder.svg?height=400&width=600";
    const image = imageArray[0];
    return image.url.startsWith('http') ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
  };

  const getDescriptionText = (descriptionArray) => {
    if (!descriptionArray || !descriptionArray.length) return "Description non disponible";
    const firstBlock = descriptionArray[0];
    if (firstBlock.children && firstBlock.children.length > 0) {
      return firstBlock.children[0].text || "Description non disponible";
    }
    return "Description non disponible";
  };

  const getTypeStyle = (type) => {
    const styles = {
      'agriculture': { bg: '#ecfdf5', color: '#059669', border: '#d1fae5' },
      'tourism':     { bg: '#eff6ff', color: '#2563eb', border: '#dbeafe' },
      'culture':     { bg: '#fffbeb', color: '#d97706', border: '#fef3c7' },
      'nature':      { bg: '#f0fdf4', color: '#16a34a', border: '#dcfce7' },
      'default':     { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
    };
    return styles[type] || styles.default;
  };

  const heroImage = places.length > 0 && places[0].image
    ? getImageUrl(places[0].image)
    : 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  const [featured, ...rest] = places;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <Helmet>
        <title>Lieux à Visiter | Ville de Mamou</title>
        <meta
          name="description"
          content="Explorez les lieux touristiques de Mamou: destinations naturelles, sites culturels et conseils de visite."
        />
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        :root {
          --primary: #2563eb;
          --primary-dark: #1d4ed8;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --accent: #fbbf24;
        }

        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }

        /* Animation Classes */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }

        /* Responsive Layouts */
        .container-responsive {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .hero-section {
          height: 85vh;
          min-height: 600px;
          max-height: 800px;
        }

        .featured-card-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .grid-places {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Mobile Adjustments */
        @media (max-width: 968px) {
          .featured-card-layout {
            grid-template-columns: 1fr;
          }
          .featured-image-container {
            min-height: 300px;
          }
          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            height: auto;
            min-height: 500px;
            padding-bottom: 60px;
          }
          .hero-title {
            font-size: 42px !important;
          }
          .grid-places {
            grid-template-columns: 1fr;
          }
          .container-responsive {
            padding: 0 20px;
          }
        }

        /* Interactive Elements */
        .hover-card-rise {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .hover-card-rise:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -5px rgba(0,0,0,0.1);
        }
        .hover-card-rise:hover .card-img-scale {
          transform: scale(1.05);
        }
        .card-img-scale {
          transition: transform 0.7s ease;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 14px 28px;
          border-radius: 50px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: var(--primary-dark);
          transform: translateX(4px);
        }
      `}</style>

      <NavBar />

      {/* ── Hero Section ────────────────────────────────────────── */}
      <header className="hero-section" style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
        {/* Background & Overlays */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src={heroImage}
            alt="Hero Mamou"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.9) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.07 }} />
        </div>

        <div className="container-responsive" style={{ position: "relative", zIndex: 10, width: "100%", paddingTop: "80px" }}>
          <div className="animate-fade" style={{ maxWidth: "650px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", borderRadius: "100px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.15)" }}>
              <Compass size={14} color="#fbbf24" />
              <span style={{ color: "#fbbf24", fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                Guinée · Mamou
              </span>
            </div>

            <h1 className="hero-title" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 6vw, 84px)",
              color: "white",
              lineHeight: 1.05,
              marginBottom: "24px",
              letterSpacing: "-0.02em"
            }}>
              Terres de <br/>
              <span style={{ color: "#fbbf24", fontStyle: "italic" }}>Traditions</span> & Nature
            </h1>

            <p style={{ color: "#cbd5e1", fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6, marginBottom: "40px", maxWidth: "540px" }}>
              Laissez-vous envoûter par les paysages vallonnés et la chaleur de l'accueil du Fouta Djallon. Une aventure authentique vous attend.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <button className="btn-primary" style={{ background: "#fbbf24", color: "#0f172a" }}>
                Voir les lieux
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <main style={{ position: "relative", zIndex: 20, marginTop: "-60px", paddingBottom: "80px" }}>
        
        {/* Intro Header */}
        <div className="container-responsive animate-fade delay-100" style={{ marginBottom: "50px", textAlign: "center" }}>
          <span style={{ display: "block", color: "#64748b", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Explorer
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", color: "#fff", marginBottom: "16px" }}>
            Nos Destinations
          </h2>
        </div>

        <div className="container-responsive">
          {places.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 20px", background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <div style={{ width: "60px", height: "60px", background: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Compass size={24} color="#94a3b8" />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0f172a" }}>Chargement en cours</h3>
              <p style={{ color: "#64748b", marginTop: "8px" }}>Nous préparons votre itinéraire...</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

              {/* 1. Featured Card (Large) */}
              {featured && (
                <div className="featured-card-layout animate-fade delay-200">
                  <div className="featured-image-container" style={{ position: "relative", overflow: "hidden", minHeight: "400px" }}>
                    <img
                      src={getImageUrl(featured.image)}
                      alt={featured.Titre}
                      className="card-img-scale"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
                    
                    {featured.type && (
                      <div style={{
                        position: "absolute", top: "24px", left: "24px",
                        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)",
                        padding: "6px 14px", borderRadius: "100px",
                        fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
                        color: getTypeStyle(featured.type).color,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}>
                        {featured.type}
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "clamp(30px, 5vw, 60px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px", marginBottom: "16px", fontWeight: 500 }}>
                      <Calendar size={14} style={{ color: "#2563eb" }} />
                      {featured.date ? new Date(featured.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : "Date inconnue"}
                    </div>
                    
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(32px, 3vw, 42px)",
                      lineHeight: 1.1,
                      color: "#0f172a",
                      marginBottom: "16px",
                      fontWeight: 700
                    }}>
                      {featured.Titre}
                    </h2>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
                      <MapPin size={16} style={{ color: "#2563eb" }} />
                      {featured.localisation || "Région de Mamou"}
                    </div>

                    <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "16px", marginBottom: "32px" }}>
                      {getDescriptionText(featured.description)}
                    </p>

                    <div>
                      <button className="btn-primary">
                        Découvrir ce lieu
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Grid for Rest of Items */}
              {rest.length > 0 && (
                <div className="grid-places">
                  {rest.map((place, index) => {
                    const style = getTypeStyle(place.type);
                    return (
                      <div key={place.id || index} className="hover-card-rise" style={{
                        background: "#fff",
                        borderRadius: "20px",
                        border: "1px solid #f1f5f9",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%"
                      }}>
                        {/* Image */}
                        <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                          <img
                            src={getImageUrl(place.image)}
                            alt={place.Titre}
                            className="card-img-scale"
                          />
                          <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                            <span style={{
                              background: style.bg, color: style.color, border: `1px solid ${style.border}`,
                              fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
                              padding: "6px 12px", borderRadius: "100px"
                            }}>
                              {place.type || "Visite"}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8", fontSize: "12px", marginBottom: "12px", fontWeight: 500 }}>
                            <MapPin size={12} />
                            {place.localisation || "Guinée"}
                          </div>

                          <h3 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#0f172a",
                            lineHeight: 1.2,
                            marginBottom: "12px"
                          }}>
                            {place.Titre}
                          </h3>

                          <p style={{
                            color: "#64748b",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            marginBottom: "24px",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            flexGrow: 1
                          }}>
                            {getDescriptionText(place.description)}
                          </p>

                          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px", marginTop: "auto" }}>
                            <button style={{
                              background: "transparent", border: "none", padding: 0,
                              color: "#2563eb", fontWeight: 700, fontSize: "14px",
                              display: "flex", alignItems: "center", gap: "6px", cursor: "pointer"
                            }}>
                              En savoir plus
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Visual Footer / CTA ───────────────────────────────── */}
      <section style={{ background: "#0f172a", color: "white", padding: "80px 0" }}>
        <div className="container-responsive">
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 48px)", marginBottom: "16px" }}>
              Prêt pour l'aventure ?
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.7 }}>
              Mamou regorge de trésors cachés qui n'attendent que vous. Organisez votre séjour avec nos guides locaux pour une expérience inoubliable.
            </p>
          </div>

          <div className="info-grid">
            {[
              { icon: MapPin, title: "Itinéraires", text: "Parcours optimisés pour la découverte" },
              { icon: Camera, title: "Photographie", text: "Les meilleurs spots panoramiques" },
              { icon: Info, title: "Guides Locaux", text: "Experts passionnés de la région" }
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "32px 24px",
                borderRadius: "16px",
                textAlign: "center"
              }}>
                <div style={{
                  width: "48px", height: "48px", background: "rgba(37,99,235,0.2)", color: "#60a5fa",
                  borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  <item.icon size={22} />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{item.title}</h4>
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlaceVisite
