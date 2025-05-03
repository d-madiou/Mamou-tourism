<div>
    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
                <h2 className="text-2xl font-bold mb-6">Commentaires ({postData.comments})</h2>
    
                {/* Comment Form */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Laisser un commentaire</h3>
                  <form>
                    <div className="mb-4">
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows="4"
                        placeholder="Votre commentaire..."
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Votre nom"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Publier
                    </button>
                  </form>
                </div>
    
                {/* Sample Comments */}
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex items-start mb-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="User  Avatar"
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-semibold">Marie Camara</h4>
                          <span className="text-xs text-gray-500 ml-2">• il y a 2 jours</span>
                        </div>
                        <p className="text-gray-700 mt-1">
                          Excellent article qui met en lumière les défis et les opportunités du système éducatif à Mamou.
                          J'apprécie particulièrement l'accent mis sur les initiatives locales.
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <button className="flex items-center hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>12</span>
                          </button>
                          <button className="ml-4 hover:text-blue-600">Répondre</button>
                        </div>
                      </div>
                    </div>
    
                    {/* Nested Reply */}
                    <div className="ml-12 mt-4 pl-4 border-l-2 border-gray-200">
                      <div className="flex items-start">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="User  Avatar"
                          className="h-8 w-8 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-semibold">Amadou Diallo</h4>
                            <span className="text-xs text-gray-500 ml-2">• il y a 1 jour</span>
                          </div>
                          <p className="text-gray-700 mt-1">
                            Je suis d'accord. Il serait intéressant d'avoir plus d'informations sur les partenariats
                            public-privé dans le secteur éducatif.
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <button className="flex items-center hover:text-blue-600">
                              <ThumbsUp className="h-4 w- 4 mr-1" />
                              <span>5</span>
                            </button>
                            <button className="ml-4 hover:text-blue-600">Répondre</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div>
                    <div className="flex items-start">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="User  Avatar"
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-semibold">Ibrahim Sow</h4>
                          <span className="text-xs text-gray-500 ml-2">• il y a 3 jours</span>
                        </div>
                        <p className="text-gray-700 mt-1">
                          En tant qu'enseignant à Mamou, je peux confirmer que le manque de ressources pédagogiques est un
                          défi majeur. Cependant, la motivation des élèves et le soutien de la communauté sont des atouts
                          précieux.
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <button className="flex items-center hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>8</span>
                          </button>
                          <button className="ml-4 hover:text-blue-600">Répondre</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
    
    <section className="bg-blue-50 py-12">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Restez informé sur l'éducation à Mamou</h2>
        <p className="text-gray-600 mb-6">
          Abonnez-vous à notre newsletter pour recevoir les dernières actualités et analyses sur le système éducatif
          de Mamou.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            S'abonner
          </button>
        </div>
      </div>
    </div>
    </section>
    {/* Footer */}
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MamouVille</h3>
              <p className="text-gray-400">
                Votre source d'information sur l'éducation, la culture et le développement de Mamou.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Catégories</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Éducation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Culture
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tourisme
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Actualités
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    À propos
                  </a>
 </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Conditions d'utilisation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} MamouVille. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

        {/* Related Articles */}
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPostsData.map((relatedPost) => (
                <a key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105 "/>
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-blue-600">{relatedPost.category}</span>
                      <h3 className="font-semibold mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(relatedPost.publishedDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Voir plus de commentaires
            </button>

            <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full border transition-colors ${
                    hasLiked ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${hasLiked ? "fill-blue-600 text-blue-600" : "" }`} />
                  <span>{likes}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full border transition-colors ${
                    isBookmarked ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-600 text-blue-600" : ""}`} />
                </button>

                <div className="relative group">
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="p-2">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        <Facebook className="h-4 w-4 mr-3 text-blue-600" />
                        <span>Facebook</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        <Twitter className="h-4 w-4 mr-3 text-blue-400" />
                        <span>Twitter</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        <Linkedin className="h-4 w-4 mr-3 text-blue-700" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
</div>