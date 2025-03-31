'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import blogPosts from '../../../data/blog-posts'
import BlogPostCard from '../../../components/BlogPostCard'
import { marked } from 'marked'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [htmlContent, setHtmlContent] = useState('')
  
  // Znajdź post na podstawie slugu
  useEffect(() => {
    const currentPost = blogPosts.find(p => p.slug === slug)
    
    if (currentPost) {
      setPost(currentPost)
      
      // Konwertuj markdown na HTML
      setHtmlContent(marked.parse(currentPost.content))
      
      // Znajdź powiązane posty (na podstawie kategorii i tagów)
      const related = blogPosts
        .filter(p => p.id !== currentPost.id) // Nie wyświetlaj aktualnego posta
        .filter(p => 
          p.category === currentPost.category || // Ta sama kategoria
          p.tags.some(tag => currentPost.tags.includes(tag)) // Wspólne tagi
        )
        .sort(() => 0.5 - Math.random()) // Losowa kolejność
        .slice(0, 3) // Tylko 3 posty
      
      setRelatedPosts(related)
    }
  }, [slug])
  
  // Formatowanie daty
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }
  
  // Obsługa przypadku, gdy post nie istnieje
  if (!post) {
    return (
      <div className="min-h-screen bg-dark-300 py-16">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-8">Artykuł nie został znaleziony</h1>
          <p className="text-light-300 mb-8">Przepraszamy, ale artykuł o podanym adresie nie istnieje.</p>
          <Link href="/blog" className="btn-primary">
            Wróć do bloga
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Nagłówek artykułu */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/blog" className="text-primary hover:text-primary-dark transition-colors">
              &larr; Wróć do bloga
            </Link>
            <span className="text-light-300">|</span>
            <span className="text-primary">{post.category}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center mr-3">
                <span className="font-medium">{post.author.charAt(0)}</span>
              </div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-light-300">{formatDate(post.date)}</div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/blog?tag=${tag}`}
                  className="bg-dark-200 hover:bg-dark-100 text-light-300 py-1 px-3 rounded-full text-sm transition-colors duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Obraz główny artykułu */}
      <div className="bg-dark-200 h-64 md:h-96 w-full overflow-hidden">
        {/* Placeholder dla obrazu */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-8xl opacity-20">{post.title.charAt(0)}</div>
        </div>
      </div>
      
      {/* Treść artykułu */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Artykuł */}
            <div className="lg:col-span-3">
              <div className="prose prose-invert prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-dark-100 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4">O autorze</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-dark-200 flex items-center justify-center mr-4">
                      <span className="font-medium text-lg">{post.author.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-sm text-light-300">Expert SubCompare</div>
                    </div>
                  </div>
                  <p className="text-light-300 text-sm">
                    Ekspert w dziedzinie usług streamingowych i subskrypcyjnych. Pasjonat technologii i innowacji, który pomaga czytelnikom znaleźć najlepsze rozwiązania dopasowane do ich potrzeb.
                  </p>
                </div>
                
                <div className="bg-dark-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Udostępnij</h3>
                  <div className="flex space-x-4">
                    <button className="bg-[#1877F2] w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </button>
                    <button className="bg-[#1DA1F2] w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="bg-[#0077B5] w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                    </button>
                    <button className="bg-dark-200 w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Powiązane artykuły */}
      {relatedPosts.length > 0 && (
        <section className="bg-dark-200 py-12">
          <div className="container-custom">
            <h2 className="heading-lg mb-8">Podobne artykuły</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Call to action */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Gotowy, by porównać wszystkie subskrypcje?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Sprawdź naszą porównywarkę i znajdź najlepsze oferty dopasowane do Twoich potrzeb i budżetu.
          </p>
          <Link href="/compare" className="bg-white text-primary hover:bg-light-300 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
            Porównaj subskrypcje
          </Link>
        </div>
      </section>
    </div>
  )
}