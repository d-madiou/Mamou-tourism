"use client"

import {
  Calendar,
  Clock,
  MessageSquare,
  Share2,
  User,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link, useLocation, useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import { toMediaUrl } from "../config/api"

const BlogPost = ({
  blogsData,
  schoolsData,
  ecolesData,
  newsData,
  activitePopularData,
  contentTypes = ["blogs", "ecoles", "news"],
}) => {
  const [currentPost, setCurrentPost]   = useState(null)
  const [isLoading, setIsLoading]       = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])
  const params   = useParams()
  const location = useLocation()

  /* ── Helpers ───────────────────────────────────── */

  const getTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "Contenu non disponible"
    let text = ""
    blocks.forEach(block => {
      if (block.children && Array.isArray(block.children))
        block.children.forEach(child => { if (child.text) text += child.text + " " })
    })
    return text.trim()
  }

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/1200x600?text=Image+non+disponible"
    if (Array.isArray(image) && image.length > 0) {
      const first = image[0]
      return first?.url ? toMediaUrl(first.url) : "https://via.placeholder.com/1200x600?text=Image+non+disponible"
    }
    if (image?.url) return toMediaUrl(image.url)
    return "https://via.placeholder.com/1200x600?text=Image+non+disponible"
  }

  /* ── useEffect ─────────────────────────────────── */

  useEffect(() => {
    setIsLoading(true)
    if (!params.id) { setIsLoading(false); return }

    const sourceByType = {
      blogs:                 blogsData?.data || [],
      ecoles:                ecolesData?.data || schoolsData?.data || [],
      schools:               schoolsData?.data || [],
      news:                  newsData?.data || [],
      "activite-populaires": activitePopularData?.data || [],
    }

    let post = null, allPosts = []
    for (const type of contentTypes) {
      const source = sourceByType[type] || []
      const found  = source.find(item => item.id == params.id)
      if (found) { post = found; allPosts = source; break }
    }

    if (post) {
      setCurrentPost(post)
      setRelatedPosts(allPosts.filter(item => item.id !== post.id).slice(0, 3))
    }
    setIsLoading(false)
  }, [params.id, contentTypes, blogsData, schoolsData, ecolesData, newsData, activitePopularData])

  /* ── Getters ───────────────────────────────────── */

  const getPostTitle       = () => currentPost?.Titre || currentPost?.nom || currentPost?.titleSport || "Article sans titre"
  const getPostDescription = () => {
    if (currentPost?.contentSport) return getTextFromBlocks(currentPost.contentSport)
    if (currentPost?.description)  return getTextFromBlocks(currentPost.description)
    if (currentPost?.contenu)      return getTextFromBlocks(currentPost.contenu)
    return "Description non disponible"
  }
  const getPostImage = () => {
    if (currentPost?.imageSport) return getImageUrl(currentPost.imageSport)
    if (currentPost?.Image)      return getImageUrl(currentPost.Image)
    if (currentPost?.image)      return getImageUrl(currentPost.image)
    return "https://via.placeholder.com/1200x600?text=Image+non+disponible"
  }
  const getPostDate     = () => currentPost?.datePublication || currentPost?.dateSport || currentPost?.date || currentPost?.createdAt || new Date().toISOString()
  const getPostCategory = () => {
    if (currentPost?.type)      return currentPost.type.replace("_", " ").toUpperCase()
    if (currentPost?.categorie) return currentPost.categorie.replace("_", " ").toUpperCase()
    if (currentPost?.typeEcole) return currentPost.typeEcole.toUpperCase()
    return "ARTICLE"
  }
  const getAuthor = () => currentPost?.auteur || currentPost?.nomDuDirecteur || "Équipe éditoriale"

  const currentType  = location.pathname.split("/")[2] || "article"
  const fallbackPath = { education: "/education", school: "/education", sport: "/sport", article: "/articles" }[currentType] || "/articles"
  const seoTitle = currentPost ? `${getPostTitle()} | Ville de Mamou` : "Article | Ville de Mamou"
  const seoDescription = currentPost
    ? getPostDescription().slice(0, 160)
    : "Consultez les articles, actualités et contenus thématiques de la Ville de Mamou."

  const timeReading = () => {
    const c = getPostDescription()
    return c && c !== "Description non disponible" ? Math.ceil(c.split(" ").length / 200) : 5
  }

  const formatDate = (dateString) => {
    try { return new Date(dateString).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }) }
    catch { return "Date non disponible" }
  }

  /* ── Rich-text renderer ────────────────────────────────────────────────────
   *
   *  Strapi v4/v5 stores rich text as an array of block nodes.
   *  Supported block types:
   *
   *    paragraph        → <p>
   *    heading          → <h1>–<h6>
   *    list             → <ul> or <ol>
   *    quote            → <blockquote>
   *    code             → <pre><code>
   *    image            → <img>  ← was missing, this is the root fix
   *    thematic-break   → <hr>
   *
   *  Inline children support: bold, italic, underline, strikethrough, code, link
   *
   ─────────────────────────────────────────────────────────────────────────── */

  const renderInlineChildren = (children = []) =>
    children.map((child, i) => {
      // Link node
      if (child.type === "link") {
        return (
          <a key={i} href={child.url} target="_blank" rel="noopener noreferrer"
            style={{ color: "#0992c2", textDecoration: "underline" }}>
            {renderInlineChildren(child.children || [])}
          </a>
        )
      }
      // Text node with inline marks
      let el = <>{child.text}</>
      if (child.bold)          el = <strong>{el}</strong>
      if (child.italic)        el = <em>{el}</em>
      if (child.underline)     el = <u>{el}</u>
      if (child.strikethrough) el = <s>{el}</s>
      if (child.code)          el = (
        <code style={{ background: "#f1f5f9", borderRadius: "4px", padding: "1px 6px", fontFamily: "monospace", fontSize: "0.88em" }}>
          {el}
        </code>
      )
      return <span key={i}>{el}</span>
    })

  const renderBlock = (block, idx) => {
    switch (block.type) {

      case "paragraph":
        return (
          <p key={idx} style={{ marginBottom: "1.3rem", color: "#374151", lineHeight: 1.85, fontSize: "17px" }}>
            {renderInlineChildren(block.children)}
          </p>
        )

      case "heading": {
        const sizes = { 1: "2rem", 2: "1.7rem", 3: "1.45rem", 4: "1.25rem", 5: "1.1rem", 6: "1rem" }
        return (
          <h2 key={idx} style={{ fontSize: sizes[block.level] || "1.3rem", fontWeight: 800, color: "#0f172a", marginTop: "2.2rem", marginBottom: "0.75rem", lineHeight: 1.25 }}>
            {renderInlineChildren(block.children)}
          </h2>
        )
      }

      case "list": {
        const Tag       = block.format === "ordered" ? "ol" : "ul"
        const listStyle = block.format === "ordered" ? "decimal" : "disc"
        return (
          <Tag key={idx} style={{ paddingLeft: "1.6rem", marginBottom: "1.3rem", listStyleType: listStyle }}>
            {block.children?.map((item, ii) => (
              <li key={ii} style={{ color: "#374151", lineHeight: 1.8, marginBottom: "5px" }}>
                {renderInlineChildren(item.children)}
              </li>
            ))}
          </Tag>
        )
      }

      case "quote":
        return (
          <blockquote key={idx} style={{ borderLeft: "4px solid #0992c2", paddingLeft: "1.25rem", margin: "1.75rem 0", color: "#475569", fontStyle: "italic", fontSize: "1.08rem", lineHeight: 1.75 }}>
            {renderInlineChildren(block.children)}
          </blockquote>
        )

      case "code":
        return (
          <pre key={idx} style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: "12px", padding: "20px 24px", overflowX: "auto", marginBottom: "1.3rem", fontSize: "14px", lineHeight: 1.7 }}>
            <code>{renderInlineChildren(block.children)}</code>
          </pre>
        )

      /* ── IMAGE block ────────────────────────────────────────────────────────
       *
       *  Strapi sends:
       *  {
       *    type: "image",
       *    image: {
       *      url: "/uploads/photo.jpg",      ← relative or absolute
       *      alternativeText: "...",
       *      width: 1200,
       *      height: 800,
       *      caption: "optional caption"     ← sometimes top-level on block
       *    }
       *  }
       *
       *  We call toMediaUrl() to prepend the Strapi base URL when relative.
       ─────────────────────────────────────────────────────────────────────── */
      case "image": {
        const img = block.image
        if (!img) return null

        const src     = img.url ? toMediaUrl(img.url) : null
        if (!src) return null

        const alt     = img.alternativeText || getPostTitle()
        const caption = img.caption || block.caption   // Strapi sometimes puts it on the block itself

        return (
          <figure key={idx} style={{ margin: "2.25rem 0", textAlign: "center" }}>
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: "100%",
                borderRadius: "14px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                display: "inline-block",
              }}
              onError={e => { e.target.src = "https://via.placeholder.com/800x450?text=Image+non+disponible" }}
            />
            {caption && (
              <figcaption style={{ marginTop: "10px", fontSize: "13px", color: "#94a3b8", fontStyle: "italic" }}>
                {caption}
              </figcaption>
            )}
          </figure>
        )
      }

      case "thematic-break":
      case "divider":
        return <hr key={idx} style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "2rem 0" }} />

      default:
        // Unknown block — try to render children as plain text so nothing is silently lost
        if (block.children?.length) {
          return (
            <p key={idx} style={{ marginBottom: "1.3rem", color: "#374151", lineHeight: 1.85 }}>
              {renderInlineChildren(block.children)}
            </p>
          )
        }
        return null
    }
  }

  const renderContent = () => {
    // Try all known Strapi field names for body content
    const content =
      currentPost?.contenu ||
      currentPost?.description ||
      currentPost?.contentSport ||
      currentPost?.content ||
      currentPost?.body

    if (!content || !Array.isArray(content))
      return <p style={{ color: "#6b7280" }}>Contenu non disponible.</p>

    return content.map((block, idx) => renderBlock(block, idx))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: getPostTitle(), text: "Découvrez cet article intéressant", url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papier!")
    }
  }

  /* ── Loading / not found ───────────────────────── */

  if (isLoading) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
        </Helmet>
        <NavBar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-blue-600 text-lg">Chargement de l'article...</div>
        </div>
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
        </Helmet>
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h2>
            <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link to={fallbackPath} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
              Retour aux articles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── Main render ───────────────────────────────── */

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Helmet>
      <NavBar />

      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link to={fallbackPath} className="hover:text-blue-600 transition-colors duration-200">
                Retour à la section
              </Link>
              <span>/</span>
              <span className="text-gray-700">Article</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              {getPostTitle()}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-4 md:gap-6 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{formatDate(getPostDate())}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{timeReading()} min de lecture</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">0 commentaires</span>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {getPostCategory()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Par {getAuthor()}</p>
                  <p className="text-xs text-gray-500">{currentPost?.localisation || "Mamou, Guinée"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Hero image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg bg-white">
            <img
              src={getPostImage()}
              alt={getPostTitle()}
              className="w-full h-auto object-cover max-h-[500px]"
              onError={e => { e.target.src = "https://via.placeholder.com/1200x600?text=Image+non+disponible" }}
            />
          </div>

          {/* Share button */}
          <div className="flex justify-end mb-8">
            <button onClick={handleShare} className="flex items-center bg-blue-500 space-x-2 px-4 py-2 rounded-full border border-gray-200 text-white hover:bg-blue-600 transition-colors duration-200">
              <Share2 className="h-5 w-5" />
              <span>Partager</span>
            </button>
          </div>

          {/* Article body */}
          <article className="prose prose-lg max-w-none mb-12 bg-white p-8 rounded-xl shadow-sm">
            <div style={{ fontSize: "17px", lineHeight: 1.85, color: "#374151" }}>
              {renderContent()}
            </div>

            {/* School extra info */}
            {currentPost?.typeEcole && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4">Informations supplémentaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPost.anneeFondation && <div><strong>Année de fondation:</strong> {currentPost.anneeFondation}</div>}
                  {currentPost.capaciteEleves  && <div><strong>Capacité:</strong> {currentPost.capaciteEleves} élèves</div>}
                  {currentPost.telephone       && <div><strong>Téléphone:</strong> {currentPost.telephone}</div>}
                  {currentPost.email           && <div><strong>Email:</strong> {currentPost.email}</div>}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <footer className="bg-white border-t py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Articles similaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((item, index) => (
                  <Link to={`/blog/${currentType}/${item.id}`} key={item.id || index}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="h-40 bg-gray-200">
                      <img
                        src={getImageUrl(item.Image || item.image)}
                        alt={item.Titre || item.nom || `Article ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = "/placeholder.svg?height=160&width=320" }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-blue-600 mb-2">
                        {item.categorie?.replace("_", " ").toUpperCase() || item.typeEcole || "ARTICLE"}
                      </p>
                      <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                        {item.Titre || item.nom || `Article ${index + 1}`}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-3">
                        {getTextFromBlocks(item.description || item.contentSport).substring(0, 100)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default BlogPost
