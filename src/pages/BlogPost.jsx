"use client"

import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  User,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Mosaic } from "react-loading-indicators"
import { Link, useParams } from "react-router-dom"
import NavBar from "../components/NavBar"

const BlogPost = ({  blogsData, schoolsData, newsData, data =[] ,contentTypes = ['blogs', 'schools', 'news'] }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(42)
  const [hasLiked, setHasLiked] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()

  const findPostById = (data) => data.find((item) => item.id == params.id)

  useEffect(() => {
    setIsLoading(true)
    const idToUse = params.id || localStorage.getItem("lastOpenedPostId")
    
    if (!idToUse) {
      setIsLoading(false)
      return
    }

    // Search only in specified content types
    const posts = []
    if (contentTypes.includes('blogs')) posts.push(...(blogsData?.data || []))
    if (contentTypes.includes('schools')) posts.push(...(schoolsData?.data || []))
    if (contentTypes.includes('news')) posts.push(...(newsData?.data || []))

    const post = posts.find((item) => item.id == params.id)

    if (post) {
      setCurrentPost(post)
      setLikes(post.likes || 0)
      localStorage.setItem("lastOpenedPostId", post.id)
    }
    setIsLoading(false)
  }, [params.id, contentTypes, blogsData, schoolsData, newsData])

  const handleBookmark = () => setIsBookmarked(!isBookmarked)

  const handleLike = () => {
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1))
    setHasLiked(!hasLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPost?.titleSport || currentPost?.Title,
        text: "Découvrez cet article intéressant",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papier!")
    }
  }

  const timeReading = () => {
    const content = currentPost?.contentSport || currentPost?.Content
    if (content) {
      const wordCount = content.reduce((acc, item) => {
        return acc + item.children?.reduce((childAcc, child) => childAcc + child.text.split(" ").length, 0) || 0
      }, 0)
      return Math.ceil(wordCount / 200)
    }
    return 5 // Default reading time
  }

  const getImageUrl = () => {
    if (currentPost?.imageSport?.[0]?.url) return `http://localhost:1337${currentPost.imageSport[0].url}`
    if (currentPost?.Images?.url) return `http://localhost:1337${currentPost.Images.url}`
    if (currentPost?.Image?.[0]?.url) return `http://localhost:1337${currentPost.Image[0].url}`
    return "https://via.placeholder.com/1200x600?text=Image+non+disponible"
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return "Date non disponible"
    }
  }

  const getCategory = () => {
    if (currentPost?.contentSport) return "Sport"
    if (currentPost?.formationTitle) return "Formation"
    return "Éducation"
  }

  const getPostDate = () => {
    return currentPost?.dateSport || currentPost?.publishedDate || new Date().toISOString()
  }

  const renderContent = () => {
    if (currentPost?.contentSport) {
      return currentPost.contentSport.map((item, idx) => (
        <div key={idx} className="mb-4">
          {item.children?.map((child, cIdx) => (
            <span key={cIdx} className="w-full">
              {child.text}
            </span>
          ))}
        </div>
      ))
    }

    if (currentPost?.Content) {
      return currentPost.Content.map((textItem, idx) => (
        <div key={idx} className="mb-4">
          {textItem.children.map((child, cIdx) => (
            <span key={cIdx} className="w-full">
              {child.text}
            </span>
          ))}
        </div>
      ))
    }

    return currentPost?.Description?.map((textItem, index) => (
      <div key={index} className="mb-4">
        {textItem.children.map((child, cIdx) => (
          <span key={cIdx} className="w-full">
            {child.text}
          </span>
        ))}
      </div>
    ))
  }

  if (isLoading) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Mosaic color="#3A59D1" size="medium" text="" textColor="" />
        </div>
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen">
        <div className="text-center">
          <NavBar />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h2>
            <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link
              to="/education"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Retour aux articles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <div className="text-center">
          <NavBar />
        </div>

      <header className="bg-white border-b shadow-sm mt-15">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link to="/education" className="hover:text-blue-600 transition-colors duration-200">
                Éducation
              </Link>
              <span>/</span>
              <span className="text-gray-700">Article</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              {currentPost.titleSport || currentPost.Title}
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
                <span className="text-sm">{currentPost.comments || 0} commentaires</span>
              </div>

              <div className="flex items-center">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {getCategory()}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Auteur</p>
                  <p className="text-xs text-gray-500">{currentPost.author || "Équipe éditoriale"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg bg-white">
            <img
              src={getImageUrl()}
              alt={currentPost.titleSport || currentPost.Title}
              className="w-full h-auto object-cover max-h-[500px]"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1200x600?text=Image+non+disponible"
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors duration-200 ${
                  hasLiked
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart className={`h-5 w-5 ${hasLiked ? "fill-red-500 text-red-500" : ""}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors duration-200 ${
                  isBookmarked
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                <span>{isBookmarked ? "Enregistré" : "Enregistrer"}</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              <Share2 className="h-5 w-5" />
              <span>Partager</span>
            </button>
          </div>

          <article className="prose prose-lg max-w-none mb-12 bg-white p-8 rounded-xl shadow-sm">
            <div className="text-base mt-3 max-w-3xl text-gray-700 leading-relaxed">
              {renderContent()}
            </div>
          </article>

          <div className="flex justify-between items-center border-t border-b py-6 mb-12">
            <Link
              to="#"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Article précédent</span>
            </Link>
            <Link
              to="#"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
            >
              <span>Article suivant</span>
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm mb-12">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Commentaires ({currentPost.comments || 0})</h3>
            {currentPost.comments && currentPost.comments > 0 ? (
              <div>
                <p className="text-gray-500">Chargement des commentaires...</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Soyez le premier à commenter cet article</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                  Ajouter un commentaire
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Articles similaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.slice(0, 3).map((item, index) => (
                <Link
                  to={`/blog/${item.id || index}`}
                  key={item?.id || index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="h-40 bg-gray-200">
                    <img
                      src={
                        item?.imageSport?.[0]?.url
                          ? `http://localhost:1337${item.imageSport[0].url}`
                          : item?.Images?.url
                          ? `http://localhost:1337${item.Images.url}`
                          : "/placeholder.svg?height=160&width=320"
                      }
                      alt={item?.titleSport || item?.Title || `Article ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-blue-600 mb-2">{item?.contentSport ? "Sport" : "Éducation"}</p>
                    <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                      {item?.titleSport || item?.Title || `Article ${index + 1}`}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {item?.contentSport?.[0]?.children?.[0]?.text ||
                        item?.Content?.[0]?.children?.[0]?.text ||
                        "Description de l'article"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogPost