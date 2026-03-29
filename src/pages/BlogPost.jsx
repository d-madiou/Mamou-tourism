"use client";

import {
  Calendar,
  Clock,
  MessageSquare,
  Share2,
  User,
  ArrowLeft,
  MapPin,
  Building,
  Mail,
  Phone,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { toMediaUrl } from "../config/api";

/* ─── Premium Easing ─────────────────────────────────────────────────── */
const easeOutExpo = [0.16, 1, 0.3, 1];

export default function BlogPost({
  blogsData,
  schoolsData,
  ecolesData,
  newsData,
  activitePopularData,
  contentTypes = ["blogs", "ecoles", "news"],
}) {
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const params = useParams();
  const location = useLocation();

  /* ── Helpers (Unchanged Logic) ───────────────────────────────────────── */

  const getTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "Contenu non disponible";
    let text = "";
    blocks.forEach(block => {
      if (block.children && Array.isArray(block.children))
        block.children.forEach(child => { if (child.text) text += child.text + " "; });
    });
    return text.trim();
  };

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.svg?height=600&width=1200";
    if (Array.isArray(image) && image.length > 0) {
      const first = image[0];
      return first?.url ? toMediaUrl(first.url) : "/placeholder.svg?height=600&width=1200";
    }
    if (image?.url) return toMediaUrl(image.url);
    return "/placeholder.svg?height=600&width=1200";
  };

  /* ── useEffect ───────────────────────────────────────────────────────── */

  useEffect(() => {
    setIsLoading(true);
    if (!params.id) { setIsLoading(false); return; }

    const sourceByType = {
      blogs: blogsData?.data || [],
      ecoles: ecolesData?.data || schoolsData?.data || [],
      schools: schoolsData?.data || [],
      news: newsData?.data || [],
      "activite-populaires": activitePopularData?.data || [],
    };

    let post = null, allPosts = [];
    for (const type of contentTypes) {
      const source = sourceByType[type] || [];
      const found = source.find(item => item.id == params.id);
      if (found) { post = found; allPosts = source; break; }
    }

    if (post) {
      setCurrentPost(post);
      setRelatedPosts(allPosts.filter(item => item.id !== post.id).slice(0, 3));
    }
    setIsLoading(false);
  }, [params.id, contentTypes, blogsData, schoolsData, ecolesData, newsData, activitePopularData]);

  /* ── Getters ─────────────────────────────────────────────────────────── */

  const getPostTitle = () => currentPost?.Titre || currentPost?.nom || currentPost?.titleSport || "Article sans titre";
  const getPostDescription = () => {
    if (currentPost?.contentSport) return getTextFromBlocks(currentPost.contentSport);
    if (currentPost?.description) return getTextFromBlocks(currentPost.description);
    if (currentPost?.contenu) return getTextFromBlocks(currentPost.contenu);
    return "Description non disponible";
  };
  const getPostImage = () => {
    if (currentPost?.imageSport) return getImageUrl(currentPost.imageSport);
    if (currentPost?.Image) return getImageUrl(currentPost.Image);
    if (currentPost?.image) return getImageUrl(currentPost.image);
    return "/placeholder.svg?height=600&width=1200";
  };
  const getPostDate = () => currentPost?.datePublication || currentPost?.dateSport || currentPost?.date || currentPost?.createdAt || new Date().toISOString();
  const getPostCategory = () => {
    if (currentPost?.type) return currentPost.type.replace("_", " ").toUpperCase();
    if (currentPost?.categorie) return currentPost.categorie.replace("_", " ").toUpperCase();
    if (currentPost?.typeEcole) return currentPost.typeEcole.toUpperCase();
    return "ARTICLE";
  };
  const getAuthor = () => currentPost?.auteur || currentPost?.nomDuDirecteur || "Équipe éditoriale";

  const currentType = location.pathname.split("/")[2] || "article";
  const fallbackPath = { education: "/education", school: "/education", sport: "/sport", article: "/articles" }[currentType] || "/articles";
  const seoTitle = currentPost ? `${getPostTitle()} | Ville de Mamou` : "Article | Ville de Mamou";
  const seoDescription = currentPost
    ? getPostDescription().slice(0, 160)
    : "Consultez les articles, actualités et contenus thématiques de la Ville de Mamou.";

  const timeReading = () => {
    const c = getPostDescription();
    return c && c !== "Description non disponible" ? Math.ceil(c.split(" ").length / 200) : 5;
  };

  const formatDate = (dateString) => {
    try { return new Date(dateString).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }); }
    catch { return "Date non disponible"; }
  };

  /* ── Rich-text renderer (Styled with Tailwind) ───────────────────────── */

  const renderInlineChildren = (children = []) =>
    children.map((child, i) => {
      if (child.type === "link") {
        return (
          <a key={i} href={child.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-500">
            {renderInlineChildren(child.children || [])}
          </a>
        );
      }
      let el = <>{child.text}</>;
      if (child.bold) el = <strong className="font-semibold text-blue-950">{el}</strong>;
      if (child.italic) el = <em className="italic text-blue-800">{el}</em>;
      if (child.underline) el = <u className="underline underline-offset-4">{el}</u>;
      if (child.strikethrough) el = <s className="text-blue-400">{el}</s>;
      if (child.code) el = (
        <code className="rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-[0.85em] text-blue-700">
          {el}
        </code>
      );
      return <span key={i}>{el}</span>;
    });

  const renderBlock = (block, idx) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={idx} className="mb-6 font-sans text-lg font-normal leading-relaxed text-blue-800 md:text-[1.15rem]">
            {renderInlineChildren(block.children)}
          </p>
        );

      case "heading": {
        const sizeClasses = {
          1: "text-4xl md:text-5xl",
          2: "text-3xl md:text-4xl",
          3: "text-2xl md:text-3xl",
          4: "text-xl md:text-2xl",
          5: "text-lg md:text-xl",
          6: "text-base md:text-lg"
        };
        return (
          <h2 key={idx} className={`mt-12 mb-6 font-semibold leading-tight tracking-tight text-blue-950 ${sizeClasses[block.level] || sizeClasses[2]}`}>
            {renderInlineChildren(block.children)}
          </h2>
        );
      }

      case "list": {
        const Tag = block.format === "ordered" ? "ol" : "ul";
        const listClass = block.format === "ordered" ? "list-decimal" : "list-disc";
        return (
          <Tag key={idx} className={`mb-8 ml-6 space-y-3 font-sans text-lg font-normal text-blue-800 md:text-[1.15rem] ${listClass}`}>
            {block.children?.map((item, ii) => (
              <li key={ii} className="pl-2 leading-relaxed tracking-wide">
                {renderInlineChildren(item.children)}
              </li>
            ))}
          </Tag>
        );
      }

      case "quote":
        return (
          <blockquote key={idx} className="my-10 rounded-r-2xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/70 to-transparent py-6 pl-8 pr-6 text-xl font-normal italic leading-relaxed text-blue-900">
            {renderInlineChildren(block.children)}
          </blockquote>
        );

      case "code":
        return (
          <pre key={idx} className="my-8 overflow-x-auto rounded-2xl bg-blue-950 p-6 text-[15px] leading-relaxed text-blue-100 shadow-inner">
            <code>{renderInlineChildren(block.children)}</code>
          </pre>
        );

      case "image": {
        const img = block.image;
        if (!img) return null;
        const src = img.url ? toMediaUrl(img.url) : null;
        if (!src) return null;
        const alt = img.alternativeText || getPostTitle();
        const caption = img.caption || block.caption;

        return (
          <figure key={idx} className="my-12 text-center">
            <img
              src={src}
              alt={alt}
              className="mx-auto w-full rounded-[2rem] object-cover shadow-xl shadow-blue-100/70 ring-1 ring-blue-100"
              onError={e => { e.target.src = "/placeholder.svg?height=600&width=1200"; }}
            />
            {caption && (
              <figcaption className="mt-4 font-sans text-sm font-medium italic text-blue-500">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case "thematic-break":
      case "divider":
        return <hr key={idx} className="my-12 border-t border-blue-100" />;

      default:
        if (block.children?.length) {
          return (
            <p key={idx} className="mb-6 font-sans text-lg font-normal leading-relaxed text-blue-800">
              {renderInlineChildren(block.children)}
            </p>
          );
        }
        return null;
    }
  };

  const renderContent = () => {
    const content =
      currentPost?.contenu ||
      currentPost?.description ||
      currentPost?.contentSport ||
      currentPost?.content ||
      currentPost?.body;

    if (!content || !Array.isArray(content))
      return <p className="font-normal text-blue-700">Contenu non disponible.</p>;

    return content.map((block, idx) => renderBlock(block, idx));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: getPostTitle(), text: "Découvrez cet article intéressant", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  /* ── States ──────────────────────────────────────────────────────────── */

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Helmet><title>{seoTitle}</title><meta name="description" content={seoDescription} /></Helmet>
        <NavBar />
        <div className="mt-20 flex max-w-md flex-col items-center rounded-[2rem] bg-white p-12 text-center shadow-xl shadow-blue-100/70 ring-1 ring-blue-100">
          <motion.div animate={{ rotateY: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <BookOpen size={48} className="mb-6 text-blue-600" />
          </motion.div>
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-blue-950">Chargement...</h2>
          <p className="text-sm text-blue-700">Ouverture de l'article en cours.</p>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Helmet><title>{seoTitle}</title><meta name="description" content={seoDescription} /></Helmet>
        <NavBar />
        <div className="mt-20 flex max-w-md flex-col items-center rounded-[2rem] bg-white p-12 text-center shadow-xl shadow-blue-100/70 ring-1 ring-blue-100">
          <AlertCircle size={48} className="mb-6 text-blue-600" />
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-blue-950">Article non trouvé</h2>
          <p className="mb-8 text-sm text-blue-700">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to={fallbackPath} className="rounded-full bg-blue-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800">
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  /* ── Main Render ─────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-blue-50 font-sans text-blue-950 selection:bg-blue-200 selection:text-blue-950" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Helmet>
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="pt-32 pb-20 md:pt-40">
        <article className="mx-auto max-w-4xl px-6">
          
          {/* Back Navigation & Category */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOutExpo }}
            className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link 
              to={fallbackPath} 
              className="group flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white py-2 pl-3 pr-5 text-sm font-medium text-blue-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-950 hover:shadow-md"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Retour
            </Link>
            <span className="w-fit rounded-full bg-blue-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-200 shadow-sm">
              {getPostCategory()}
            </span>
          </motion.div>

          {/* Title Area */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            className="mb-12"
          >
            <h1 className="mb-8 text-4xl font-semibold leading-[1.15] tracking-tight text-blue-950 md:text-6xl lg:text-[4rem]">
              {getPostTitle()}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-blue-100 py-6 text-sm text-blue-600">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <User size={18} />
                </div>
                <div>
                  <p className="font-semibold text-blue-950">{getAuthor()}</p>
                  <p className="text-xs">{currentPost?.localisation || "Mamou, Guinée"}</p>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-blue-100 sm:block" />
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <span>{formatDate(getPostDate())}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                <span>{timeReading()} min de lecture</span>
              </div>
              
              {/* Share Button (Desktop) */}
              <button onClick={handleShare} className="ml-auto hidden sm:flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 font-medium text-blue-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-950">
                <Share2 size={16} />
                Partager
              </button>
            </div>
          </motion.header>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: easeOutExpo }}
            className="relative mb-16 overflow-hidden rounded-[2rem] bg-blue-100 shadow-2xl shadow-blue-100/70 ring-1 ring-blue-100"
          >
            <img
              src={getPostImage()}
              alt={getPostTitle()}
              className="w-full max-h-[600px] object-cover object-center"
              onError={e => { e.target.src = "/placeholder.svg?height=600&width=1200"; }}
            />
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
          >
            {renderContent()}

            {/* School / Institution Extra Info */}
            {currentPost?.typeEcole && (
              <div className="mt-16 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-blue-100/60">
                <div className="bg-blue-900 px-8 py-6">
                  <h3 className="flex items-center gap-3 text-2xl font-semibold text-white">
                    <Building className="text-blue-300" /> Informations de l'établissement
                  </h3>
                </div>
                <div className="grid gap-6 p-8 md:grid-cols-2">
                  {currentPost.anneeFondation && (
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Fondation</span>
                      <span className="mt-1 text-lg font-medium text-blue-950">{currentPost.anneeFondation}</span>
                    </div>
                  )}
                  {currentPost.capaciteEleves && (
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Capacité</span>
                      <span className="mt-1 text-lg font-medium text-blue-950">{currentPost.capaciteEleves} élèves</span>
                    </div>
                  )}
                  {currentPost.telephone && (
                    <div className="flex flex-col">
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500"><Phone size={14}/> Téléphone</span>
                      <a href={`tel:${currentPost.telephone}`} className="mt-1 text-lg font-medium text-blue-600 transition-colors hover:text-blue-700">{currentPost.telephone}</a>
                    </div>
                  )}
                  {currentPost.email && (
                    <div className="flex flex-col">
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500"><Mail size={14}/> Email</span>
                      <a href={`mailto:${currentPost.email}`} className="mt-1 text-lg font-medium text-blue-600 transition-colors hover:text-blue-700">{currentPost.email}</a>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Share Button (Mobile) */}
            <div className="mt-12 flex justify-center border-t border-blue-100 pt-8 sm:hidden">
              <button onClick={handleShare} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-900 px-6 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-blue-800">
                <Share2 size={18} />
                Partager cet article
              </button>
            </div>
          </motion.div>
        </article>
      </main>

      {/* ════ RELATED POSTS ════ */}
      {relatedPosts.length > 0 && (
        <section className="relative overflow-hidden bg-blue-950 py-24 text-white">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">À découvrir</p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Articles <span className="italic text-blue-300">Similaires</span>
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((item, index) => (
                <Link 
                  to={`/blog/${currentType}/${item.id}`} 
                  key={item.id || index}
                  className="group flex flex-col overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:bg-white/10 hover:ring-blue-300/50"
                >
                  <div className="relative h-48 shrink-0 overflow-hidden bg-blue-900/30">
                    <img
                      src={getImageUrl(item.Image || item.image)}
                      alt={item.Titre || item.nom || `Article ${index + 1}`}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      onError={e => { e.target.src = "/placeholder.svg?height=400&width=800"; }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 text-blue-100">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-blue-300">
                      {item.categorie?.replace("_", " ") || item.typeEcole || "ARTICLE"}
                    </p>
                    <h4 className="mb-3 text-xl font-semibold leading-snug text-white transition-colors group-hover:text-blue-300 line-clamp-2">
                      {item.Titre || item.nom || `Article ${index + 1}`}
                    </h4>
                    <p className="mb-6 flex-1 text-sm font-normal leading-relaxed text-blue-100/75 line-clamp-3">
                      {getTextFromBlocks(item.description || item.contentSport)}
                    </p>
                    <span className="mt-auto w-fit border-b border-blue-300/30 pb-1 text-[10px] font-bold uppercase tracking-widest text-blue-300 transition-colors group-hover:border-blue-300">
                      Lire la suite
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
