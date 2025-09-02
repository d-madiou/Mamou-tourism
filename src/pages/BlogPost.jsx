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
import { Link, useParams } from "react-router-dom"
import NavBar from "../components/NavBar"

const BlogPost = ({ blogsData, schoolsData, newsData, contentTypes = ['blogs', 'schools', 'news'] }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(42)
  const [hasLiked, setHasLiked] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])
  const params = useParams()

  // Helper function to extract text from blocks
  const getTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "Contenu non disponible";
    
    let text = "";
    blocks.forEach(block => {
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach(child => {
          if (child.text) {
            text += child.text + " ";
          }
        });
      }
    });
    return text.trim();
  };

  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/1200x600?text=Image+non+disponible";
    
    // Handle array of images (schools)
    if (Array.isArray(image) && image.length > 0) {
      const firstImage = image[0];
      return firstImage.url.startsWith('http') ? firstImage.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${firstImage.url}`;
    }
    
    // Handle single image (blogs, news)
    if (image.url) {
      return image.url.startsWith('http') ? image.url : `https://cozy-sparkle-24ced58ec1.strapiapp.com${image.url}`;
    }
    
    return "https://via.placeholder.com/1200x600?text=Image+non+disponible";
  };

  useEffect(() => {
    setIsLoading(true)
    
    if (!params.id) {
      setIsLoading(false)
      return
    }

    // Search in the appropriate data source based on contentTypes
    let post = null;
    let allPosts = [];

    if (contentTypes.includes('blogs') && blogsData?.data) {
      post = blogsData.data.find(item => item.id == params.id);
      if (post) {
        allPosts = blogsData.data;
      }
    }

    if (!post && contentTypes.includes('schools') && schoolsData?.data) {
      post = schoolsData.data.find(item => item.id == params.id);
      if (post) {
        allPosts = schoolsData.data;
      }
    }

    if (!post && contentTypes.includes('news') && newsData?.data) {
      post = newsData.data.find(item => item.id == params.id);
      if (post) {
        allPosts = newsData.data;
      }
    }

    if (post) {
      setCurrentPost(post);
      // Set related posts (exclude current post)
      const related = allPosts.filter(item => item.id !== post.id).slice(0, 3);
      setRelatedPosts(related);
      setLikes(Math.floor(Math.random() * 100) + 10); // Random likes for demo
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
        title: getPostTitle(),
        text: "Découvrez cet article intéressant",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papier!")
    }
  }

  const getPostTitle = () => {
    return currentPost?.Titre || currentPost?.nom || "Article sans titre";
  };

  const getPostDescription = () => {
    if (currentPost?.description) return getTextFromBlocks(currentPost.description);
    if (currentPost?.contenu) return getTextFromBlocks(currentPost.contenu);
    return "Description non disponible";
  };

  const getPostImage = () => {
    if (currentPost?.Image) return getImageUrl(currentPost.Image);
    if (currentPost?.image) return getImageUrl(currentPost.image);
    return "https://via.placeholder.com/1200x600?text=Image+non+disponible";
  };

  const getPostDate = () => {
    return currentPost?.datePublication || currentPost?.createdAt || new Date().toISOString();
  };

  const getPostCategory = () => {
    if (currentPost?.categorie) {
      return currentPost.categorie.replace("_", " ").toUpperCase();
    }
    if (currentPost?.typeEcole) {
      return currentPost.typeEcole.toUpperCase();
    }
    return "ARTICLE";
  };

  const getAuthor = () => {
    return currentPost?.auteur || currentPost?.nomDuDirecteur || "Équipe éditoriale";
  };

  const timeReading = () => {
    const content = getPostDescription();
    if (content && content !== "Description non disponible") {
      const wordCount = content.split(" ").length;
      return Math.ceil(wordCount / 200);
    }
    return 5; // Default reading time
  };

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
  };

  const renderContent = () => {
    const content = currentPost?.contenu || currentPost?.description;
    if (!content || !Array.isArray(content)) {
      return <p className="text-gray-700">Contenu non disponible.</p>;
    }

    return content.map((block, idx) => (
      <div key={idx} className="mb-6">
        {block.children?.map((child, cIdx) => {
          if (child.type === 'text') {
            let className = "text-gray-700 leading-relaxed";
            if (child.bold) className += " font-bold";
            if (child.italic) className += " italic";
            if (child.underline) className += " underline";
            
            return (
              <span key={cIdx} className={className}>
                {child.text}
              </span>
            );
          }
          return <span key={cIdx}>{child.text}</span>;
        })}
      </div>
    ));
  };

  if (isLoading) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen">
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
        <NavBar />
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
      <NavBar />

      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link to="/education" className="hover:text-blue-600 transition-colors duration-200">
                Accueil
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
                  <p className="text-xs text-gray-500">
                    {currentPost?.localisation || "Mamou, Guinée"}
                  </p>
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
              src={getPostImage()}
              alt={getPostTitle()}
              className="w-full h-auto object-cover max-h-[500px]"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1200x600?text=Image+non+disponible"
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            

            <button
              onClick={handleShare}
              className="flex items-center bg-blue-500 space-x-2 px-4 py-2 rounded-full border border-gray-200 text-white hover:bg-gray-50 transition-colors duration-200"
            >
              <Share2 className="h-5 w-5" />
              <span>Partager</span>
            </button>
          </div>

          <article className="prose prose-lg max-w-none mb-12 bg-white p-8 rounded-xl shadow-sm">
            <div className="text-lg leading-relaxed text-gray-700">
              {renderContent()}
            </div>
            
            {/* Additional Information for Schools */}
            {currentPost?.typeEcole && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4">Informations supplémentaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPost.anneeFondation && (
                    <div>
                      <strong>Année de fondation:</strong> {currentPost.anneeFondation}
                    </div>
                  )}
                  {currentPost.capaciteEleves && (
                    <div>
                      <strong>Capacité:</strong> {currentPost.capaciteEleves} élèves
                    </div>
                  )}
                  {currentPost.telephone && (
                    <div>
                      <strong>Téléphone:</strong> {currentPost.telephone}
                    </div>
                  )}
                  {currentPost.email && (
                    <div>
                      <strong>Email:</strong> {currentPost.email}
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>

      {relatedPosts.length > 0 && (
        <footer className="bg-white border-t py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Articles similaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((item, index) => (
                  <Link
                    to={`/blog/education/${item.id}`}
                    key={item.id || index}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="h-40 bg-gray-200">
                      <img
                        src={getImageUrl(item.Image || item.image)}
                        alt={item.Titre || item.nom || `Article ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=160&width=320";
                        }}
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
                        {getTextFromBlocks(item.description).substring(0, 100)}...
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