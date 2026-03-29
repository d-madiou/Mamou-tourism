import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaCarCrash,
  FaExclamationTriangle,
  FaFireExtinguisher,
  FaPhoneAlt,
  FaTimes,
  FaUserInjured,
} from "react-icons/fa";

const STORAGE_KEY = "mamou_emergency_notice_seen";

const emergencyItems = [
  { label: "Incendie", icon: FaFireExtinguisher },
  { label: "Accident", icon: FaCarCrash },
  { label: "Blessé", icon: FaUserInjured },
  { label: "Violence", icon: FaExclamationTriangle },
];

function EmergencyAlertModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    try {
      const hasSeenNotice = sessionStorage.getItem(STORAGE_KEY);
      if (!hasSeenNotice) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    // Focus management preserved exactly
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors and still allow closing.
    }
    setIsOpen(false);
  };

  // Logic strictly preserved: early return if not open
  if (!isOpen) return null;

  // Premium, cinematic ease
  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 p-4 sm:p-6 backdrop-blur-md"
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-alert-title"
        aria-describedby="emergency-alert-description"
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-black/40 ring-1 ring-black/5"
      >
        {/* Refined Header Accent: A subtle, elegant crimson line instead of a heavy gradient block */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-800 via-rose-600 to-rose-800 opacity-90" />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          aria-label="Fermer l'alerte d'urgence"
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
        >
          <FaTimes size={16} />
        </button>

        <div className="p-8 sm:p-10">
          {/* Elegant Pill Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-3 pr-10">
            <span className="inline-flex items-center rounded-full border border-rose-200/60 bg-rose-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700">
              SOS
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
              Guinée
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
              24/7
            </span>
          </div>

          <h2
            id="emergency-alert-title"
            className="mb-3 text-2xl font-light tracking-tight text-slate-900 sm:text-3xl"
          >
            Assistance d’Urgence
          </h2>

          <p
            id="emergency-alert-description"
            className="mb-8 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base font-light"
          >
            Notre équipe de sécurité locale est disponible 24h/24 et 7j/7. En cas de besoin
            immédiat, utilisez ce service d'assistance officiel.
          </p>

          {/* Redesigned Icon Grid: Premium "Amenities" styling */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {emergencyItems.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-colors hover:border-rose-100 hover:bg-rose-50/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-colors group-hover:text-rose-600">
                  <Icon size={18} />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Concierge-style Phone Block */}
          <div className="mb-8 relative overflow-hidden rounded-[1.5rem] bg-slate-900 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950/40 opacity-90" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-rose-400/80">
                  Ligne d'Urgence Directe
                </p>
                <a
                  href="tel:613014040"
                  className="group flex items-center gap-4 text-white transition-opacity hover:opacity-90"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-900/50 transition-transform group-hover:scale-105">
                    <FaPhoneAlt size={16} />
                  </span>
                  <span className="text-3xl font-light tracking-tight sm:text-4xl">
                    613 01 40 40
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:items-center">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium tracking-wide text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
            >
              J’ai compris
            </button>
            <a
              href="tel:613014040"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-rose-600 px-8 py-3.5 text-sm font-medium tracking-wide text-white shadow-md shadow-rose-600/20 transition-all hover:bg-rose-700 hover:shadow-rose-600/30 active:scale-[0.98]"
            >
              <FaPhoneAlt size={12} />
              Appeler maintenant
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default EmergencyAlertModal;