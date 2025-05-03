import { AlertCircle, ArrowLeft, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Mosaic } from 'react-loading-indicators'
import { Link, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/blogs/${id}?populate=*`
        )
        if (!response.ok) throw new Error('Article non trouvé')
        const { data } = await response.json()
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Mosaic color="#3A59D1" size="medium" text="" textColor="" />
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        <AlertCircle className="mr-2" />
        <p>Erreur lors du chargement de l'article</p>
      </div>
    )

  return (
    <div className="font-sans bg-gray-50">
      <NavBar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/education"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour aux articles
        </Link>
      </div>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="mb-8">
          <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold rounded">
            Éducation
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
            {post?.Title}
          </h1>
          <div className="flex items-center text-gray-600">
            <BookOpen className="mr-2 h-5 w-5" />
            <time className="text-sm">
              {new Date(post?.attributes?.publishedDate).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
        </header>

        {post?.attributes?.Images?.data?.attributes?.url && (
          <img
            src={`http://localhost:1337${post.attributes.Images.data.attributes.url}`}
            alt={post.attributes.Title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
          />
        )}

        <div className="prose max-w-none">
          {post?.attributes?.Content?.map((section, index) => (
            <div key={index} className="mb-6">
              {section.children.map((child, childIndex) => (
                <p key={childIndex} className="text-gray-700 leading-relaxed mb-4">
                  {child.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

export default BlogPost