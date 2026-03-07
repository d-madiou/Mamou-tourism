"use client"

import { useEffect, useState, useRef } from "react"
import {
  FaBars, FaChevronDown, FaTimes, FaHome,
  FaInfoCircle, FaCompass, FaNewspaper, FaEnvelope,
  FaGraduationCap, FaSearch, FaFileAlt, FaWhatsapp,
  FaFacebookF, FaFutbol,
} from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import LogoImage from "../assets/images/logo.png"
import { FaLocationCrosshairs } from "react-icons/fa6"

const NavBar = () => {
  const [isOpen, setIsOpen]                 = useState(false)
  const [isScrolled, setIsScrolled]         = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchValue, setSearchValue]       = useState("")
  const dropdownTimer                       = useRef(null)
  const location                            = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setIsOpen(false); setActiveDropdown(null) }, [location.pathname])

  const isActive        = (path) => location.pathname === path
  const isExploreActive = ["/nourriture", "/hotel", "/place"].includes(location.pathname)

  const openDropdown   = (name) => { clearTimeout(dropdownTimer.current); setActiveDropdown(name) }
  const closeDropdown  = () => { dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 130) }
  const toggleDropdown = (name) => setActiveDropdown(p => p === name ? null : name)
  const closeMenu      = () => { setIsOpen(false); setActiveDropdown(null) }

  const navLinks = [
    { to: "/",               icon: FaHome,          label: "Accueil" },
    { to: "/about",          icon: FaInfoCircle,    label: "À propos" },
    { to: "/articles",       icon: FaNewspaper,     label: "Articles" },
    { to: "/education",      icon: FaGraduationCap, label: "Éducation" },
    { to: "/sport",          icon: FaFutbol,        label: "Sport" },
    { to: "/administration", icon: FaFileAlt,       label: "Administration" },
    { to: "/contact",        icon: FaEnvelope,      label: "Contact" },
  ]

  const exploreLinks = [
    { to: "/nourriture", emoji: "🍽", label: "Nourriture" },
    { to: "/hotel",      emoji: "🏨", label: "Hotels" },
    { to: "/place",      emoji: "📍", label: "Places à visiter" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Root ── */
        .nb-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Top accent stripe */
        .nb-stripe {
          height: 3px;
          background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 35%, #fbbf24 50%, #3b82f6 65%, #1d4ed8 100%);
        }

        /* Main bar */
        .nb-bar {
          background: #1e50c8;
          box-shadow: 0 2px 0 rgba(0,0,0,0.12);
          transition: background 0.35s ease, box-shadow 0.35s ease;
        }
        .nb-root.scrolled .nb-bar {
          background: #1740a8;
          box-shadow: 0 4px 24px rgba(15,40,130,0.25);
        }

        .nb-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 20px;
          display: flex; align-items: center; justify-content: space-between;
          height: 60px;
          transition: height 0.3s ease;
        }
        .nb-root.scrolled .nb-inner { height: 54px; }

        /* ── Logo ── */
        .nb-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .nb-logo-img {
          width: 42px; height: 42px; border-radius: 50%; object-fit: contain;
          border: 2px solid rgba(251,191,36,0.5);
          box-shadow: 0 0 0 3px rgba(251,191,36,0.12);
          transition: all 0.3s ease;
        }
        .nb-root.scrolled .nb-logo-img { width: 38px; height: 38px; }
        .nb-logo-name { color: #fff; font-weight: 800; font-size: 15px; letter-spacing: 0.02em; line-height: 1.15; }
        .nb-logo-sub  { color: #fbbf24; font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }

        /* ── Desktop links ── */
        .nb-links { display: none; align-items: center; gap: 1px; list-style: none; margin: 0; padding: 0; }
        @media (min-width: 1024px) { .nb-links { display: flex !important; } }

        .nb-link {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 10px; border-radius: 8px;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.85);
          text-decoration: none; white-space: nowrap;
          border: 1px solid transparent;
          background: transparent; cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          position: relative;
        }
        .nb-link:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .nb-link.active {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }
        /* Gold underline pill */
        .nb-link.active::after {
          content: '';
          position: absolute; bottom: 3px; left: 50%;
          transform: translateX(-50%);
          width: 16px; height: 2px; border-radius: 2px;
          background: #fbbf24;
        }

        /* ── Dropdown ── */
        .nb-dd-wrap { position: relative; }
        .nb-dd {
          position: absolute; top: calc(100% + 8px); left: 0;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(10,30,100,0.2), 0 0 0 1px rgba(0,0,0,0.04);
          padding: 8px; min-width: 204px;
          border-top: 3px solid #fbbf24;
          list-style: none; margin: 0; z-index: 400;
        }
        .nb-dd-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 8px;
          color: #1e293b; text-decoration: none;
          font-size: 13.5px; font-weight: 600;
          transition: background 0.14s, color 0.14s;
        }
        .nb-dd-item:hover, .nb-dd-item.active { background: #eff6ff; color: #1d4ed8; }
        .nb-dd-emoji {
          width: 28px; height: 28px; background: #f1f5f9;
          border-radius: 7px; display: flex; align-items: center;
          justify-content: center; font-size: 14px; flex-shrink: 0;
        }

        /* ── Location chip ── */
        .nb-loc {
          display: none; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px; padding: 5px 13px;
          color: rgba(255,255,255,0.82); font-size: 12px; font-weight: 500;
          white-space: nowrap; flex-shrink: 0;
        }
        @media (min-width: 1024px) { .nb-loc { display: flex !important; } }

        /* ── Hamburger ── */
        .nb-hamburger {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 10px; color: #fff; cursor: pointer;
          transition: all 0.2s;
        }
        .nb-hamburger:hover { background: rgba(255,255,255,0.2); }
        .nb-hamburger.open  { background: rgba(251,191,36,0.2); border-color: rgba(251,191,36,0.45); }
        .nb-mob-ctrl { display: flex; align-items: center; }
        @media (min-width: 1024px) { .nb-mob-ctrl { display: none !important; } }

        /* ── Mobile panel ── */
        .nb-panel {
          background: #163daa;
          border-top: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .nb-panel-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 16px 20px 28px;
          max-height: 82vh; overflow-y: auto;
        }
        .nb-panel-inner::-webkit-scrollbar { display: none; }

        /* Search */
        .nb-search { position: relative; margin-bottom: 14px; }
        .nb-search input {
          width: 100%;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 11px; color: #fff;
          padding: 10px 14px 10px 38px;
          font-size: 14px; outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .nb-search input:focus   { border-color: rgba(251,191,36,0.5); }
        .nb-search input::placeholder { color: rgba(255,255,255,0.3); }
        .nb-search-ico {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); color: rgba(255,255,255,0.3);
          pointer-events: none;
        }

        /* Section label */
        .nb-sec-lbl {
          color: rgba(255,255,255,0.3); font-size: 10px;
          font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0 4px; margin: 12px 0 6px;
        }

        /* Mobile link */
        .nb-mob-link {
          display: flex; align-items: center; gap: 11px;
          padding: 10px 12px; border-radius: 12px;
          color: rgba(255,255,255,0.82); text-decoration: none;
          font-size: 14px; font-weight: 600;
          border: 1px solid transparent;
          transition: all 0.15s ease; background: transparent;
          font-family: 'DM Sans', sans-serif; cursor: pointer; width: 100%;
        }
        .nb-mob-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .nb-mob-link.active {
          background: rgba(251,191,36,0.11);
          border-color: rgba(251,191,36,0.28);
          color: #fbbf24;
        }
        .nb-mob-ico {
          width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.07);
          transition: background 0.15s;
        }
        .nb-mob-link.active .nb-mob-ico { background: rgba(251,191,36,0.14); }
        .nb-mob-dot { width: 6px; height: 6px; border-radius: 50%; background: #fbbf24; margin-left: auto; flex-shrink: 0; }
        .nb-mob-chev { margin-left: auto; color: rgba(255,255,255,0.28); transition: transform 0.22s ease; }

        /* Explore sub-links */
        .nb-sub { padding-left: 54px; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .nb-sub a {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px; border-radius: 9px;
          color: rgba(255,255,255,0.6); text-decoration: none;
          font-size: 13.5px; font-weight: 600; transition: all 0.14s;
        }
        .nb-sub a:hover  { color: #fff; background: rgba(255,255,255,0.06); }
        .nb-sub a.active { color: #fbbf24; background: rgba(251,191,36,0.08); }

        /* Footer row */
        .nb-mob-footer {
          margin-top: 18px; padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
        }
        .nb-mob-loc { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.45); font-size: 12px; }
        .nb-socials { display: flex; gap: 7px; }
        .nb-soc {
          width: 33px; height: 33px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff; text-decoration: none; transition: all 0.18s;
        }
        .nb-soc.fb:hover { background: #1877f2; border-color: #1877f2; }
        .nb-soc.wa:hover { background: #25d366; border-color: #25d366; }
      `}</style>

      <nav className={`nb-root ${isScrolled ? "scrolled" : ""}`}>
        {/* Gold accent stripe */}
        <div className="nb-stripe" />

        <div className="nb-bar">
          <div className="nb-inner">

            {/* Logo */}
            <Link to="/" className="nb-logo">
              <img src={LogoImage} alt="Mamou Ville" className="nb-logo-img" />
              <div>
                <div className="nb-logo-name">MamouVille</div>
                <div className="nb-logo-sub">Guinée · Officiel</div>
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="nb-links">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <Link to={to} className={`nb-link ${isActive(to) ? "active" : ""}`}>
                    <Icon size={11} />
                    {label}
                  </Link>
                </li>
              ))}

              {/* Explore */}
              <li className="nb-dd-wrap">
                <button
                  className={`nb-link ${isExploreActive ? "active" : ""}`}
                  style={{ border: "none" }}
                  onMouseEnter={() => openDropdown("explore")}
                  onMouseLeave={closeDropdown}
                >
                  <FaCompass size={11} />
                  Explorer
                  <FaChevronDown
                    size={8}
                    style={{
                      opacity: 0.65,
                      transition: "transform 0.22s",
                      transform: activeDropdown === "explore" ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "explore" && (
                    <motion.ul
                      className="nb-dd"
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={() => openDropdown("explore")}
                      onMouseLeave={closeDropdown}
                    >
                      {exploreLinks.map(({ to, emoji, label }) => (
                        <li key={to}>
                          <Link
                            to={to}
                            onClick={closeMenu}
                            className={`nb-dd-item ${isActive(to) ? "active" : ""}`}
                          >
                            <span className="nb-dd-emoji">{emoji}</span>
                            {label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            {/* Location chip */}
            <div className="nb-loc">
              <FaLocationCrosshairs size={11} style={{ color: "#fbbf24" }} />
              Mamou, Guinée
            </div>

            {/* Mobile hamburger */}
            <div className="nb-mob-ctrl">
              <button
                className={`nb-hamburger ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer" : "Menu"}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isOpen ? "x" : "b"}
                    initial={{ rotate: -80, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 80, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    style={{ display: "flex" }}
                  >
                    {isOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile panel ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="nb-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="nb-panel-inner">

                {/* Search */}
                <div className="nb-search">
                  <FaSearch size={13} className="nb-search-ico" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                  />
                </div>

                <p className="nb-sec-lbl">Navigation</p>

                <nav aria-label="Navigation mobile principale">
                  <ul style={{ display: "flex", flexDirection: "column", gap: "2px", margin: 0, padding: 0, listStyle: "none" }}>
                    {navLinks.map(({ to, icon: Icon, label }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={closeMenu}
                          className={`nb-mob-link ${isActive(to) ? "active" : ""}`}
                        >
                          <span className="nb-mob-ico">
                            <Icon size={13} style={{ color: isActive(to) ? "#fbbf24" : "rgba(255,255,255,0.55)" }} />
                          </span>
                          {label}
                          {isActive(to) && <span className="nb-mob-dot" />}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => toggleDropdown("explore")}
                        className={`nb-mob-link ${isExploreActive ? "active" : ""}`}
                      >
                        <span className="nb-mob-ico">
                          <FaCompass size={13} style={{ color: isExploreActive ? "#fbbf24" : "rgba(255,255,255,0.55)" }} />
                        </span>
                        Explorer
                        <FaChevronDown
                          size={11}
                          className="nb-mob-chev"
                          style={{ transform: activeDropdown === "explore" ? "rotate(180deg)" : "none" }}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === "explore" && (
                          <motion.ul
                            className="nb-sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ listStyle: "none", margin: 0 }}
                          >
                            {exploreLinks.map(({ to, emoji, label }) => (
                              <li key={to}>
                                <Link
                                  to={to}
                                  onClick={closeMenu}
                                  className={isActive(to) ? "active" : ""}
                                >
                                  <span style={{ fontSize: "15px" }}>{emoji}</span>
                                  {label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  </ul>
                </nav>

                {/* Footer */}
                <div className="nb-mob-footer">
                  <div className="nb-mob-loc">
                    <FaLocationCrosshairs size={11} style={{ color: "#fbbf24" }} />
                    Mamou, République de Guinée
                  </div>
                  <div className="nb-socials">
                    <a href="https://www.facebook.com/share/16XspHxKcv/?mibextid=wwXIfr"
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Facebook" className="nb-soc fb">
                      <FaFacebookF size={12} />
                    </a>
                    <a href="https://wa.me/224620150481"
                      target="_blank" rel="noopener noreferrer"
                      aria-label="WhatsApp" className="nb-soc wa">
                      <FaWhatsapp size={12} />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default NavBar
