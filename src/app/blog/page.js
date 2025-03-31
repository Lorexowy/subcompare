'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BlogPostCard from '../../components/BlogPostCard'
import blogPosts from '../../data/blog-posts'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])
  
  // Unikalny zestaw kategorii z postów
  const allCategories = ['all', ...new Set(blogPosts.map(post => post.category))]
  
  // Unikalny zestaw tagów (dla popularnych tagów)
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))]
  
  // Popularność tagów (liczba wystąpień)
  const tagPopularity = allTags.reduce((acc, tag) => {
    acc[tag] = blogPosts.filter(post => post.tags.includes(tag)).length
    return acc
  }, {})
  
  // Sortowanie według popularności i ograniczenie do 10 najpopularniejszych
  const popularTags = allTags
    .sort((a, b) => tagPopularity[b] - tagPopularity[a])
    .slice(0, 10)
  
  // Filtrowanie postów
  useEffect(() => {
    let filtered = [...blogPosts]
    
    // Filtrowanie według kategorii
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }
    
    // Filtrowanie według wyszukiwania
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) || 
        post.content.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }
    
    // Sortowanie według daty (od najnowszych)
    filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm])
  
  // Sortuj posty według daty
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
  
  // Wyodrębnij najnowszy post
  const latestPost = sortedPosts[0]
  
  // Pozostałe posty
  const otherPosts = sortedPosts.slice(1)

  return (
    <div className="min-h-screen">
      {/* Nagłówek */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <h1 className="heading-xl text-center">Blog SubCompare</h1>
          <p className="text-center text-light-300 mb-8 max-w-3xl mx-auto">
            Porady, analizy i porównania dotyczące najlepszych serwisów streamingowych, muzycznych, gamingowych i nie tylko.
          </p>
        </div>
      </section>
      
      {/* Najnowszy post */}
      <section className="bg-dark-200 py-12">
        <div className="container-custom">
          <h2 className="heading-lg mb-8">Najnowszy artykuł</h2>
          
          <div className="bg-dark-100 rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Zdjęcie */}
              <div className="bg-dark-300 h-64 md:h-auto">
                {/* Placeholder dla obrazu */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl opacity-20">{latestPost.title.charAt(0)}</div>
                </div>
              </div>
              
              {/* Treść */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary font-medium">{latestPost.category}</span>
                  <span className="text-light-300 text-sm">{new Date(latestPost.date).toLocaleDateString('pl-PL')}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">
                  <Link href={`/blog/${latestPost.slug}`} className="hover:text-primary transition-colors duration-200">
                    {latestPost.title}
                  </Link>
                </h3>
                
                <p className="text-light-300 mb-6">
                  {latestPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center mr-3">
                      <span className="font-medium">{latestPost.author.charAt(0)}</span>
                    </div>
                    <span className="text-light-300">{latestPost.author}</span>
                  </div>
                  
                  <Link href={`/blog/${latestPost.slug}`} className="btn-primary">
                    Czytaj więcej
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filtry */}
      <section className="bg-dark-300 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Kategorie */}
            <div className="flex flex-wrap gap-2">
              {allCategories.map(category => (
                <button
                  key={category}
                  className={`py-2 px-4 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-dark-100 text-light-300 hover:bg-dark-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Wszystkie' : category}
                </button>
              ))}
            </div>
            
            {/* Wyszukiwarka */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Szukaj na blogu..."
                className="w-full bg-dark-100 border border-dark-100 rounded-md py-2 px-4 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 absolute right-3 top-2.5 text-light-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Wyniki wyszukiwania */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <div className="flex items-center mb-8">
            <h2 className="heading-lg">
              {searchTerm ? 'Wyniki wyszukiwania' : selectedCategory === 'all' ? 'Wszystkie artykuły' : selectedCategory}
            </h2>
            <div className="ml-4 bg-dark-100 py-1 px-3 rounded-full text-sm text-light-300">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artykuł' : filteredPosts.length < 5 ? 'artykuły' : 'artykułów'}
            </div>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-200 rounded-lg">
              <p className="text-xl text-light-300">Nie znaleziono artykułów spełniających kryteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                }}
                className="btn-primary mt-4"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Popularne tagi */}
      <section className="bg-dark-200 py-12">
        <div className="container-custom">
          <h2 className="heading-lg mb-6">Popularne tematy</h2>
          
          <div className="flex flex-wrap gap-3">
            {popularTags.map(tag => (
              <button
                key={tag}
                className="bg-dark-100 hover:bg-primary hover:text-white text-light-300 py-2 px-4 rounded-full text-sm transition-colors duration-200"
                onClick={() => setSearchTerm(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Subskrypcja newslettera */}
      <section className="bg-primary bg-opacity-20 py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bądź na bieżąco</h2>
          <p className="text-light-300 mb-8 max-w-2xl mx-auto">
            Zapisz się do naszego newslettera, aby otrzymywać powiadomienia o nowych artykułach, poradach i ekskluzywnych promocjach.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                className="flex-grow bg-dark-100 border border-dark-100 rounded-md py-3 px-4 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="btn-primary py-3 whitespace-nowrap">
                Zapisz się
              </button>
            </div>
            <p className="text-xs text-light-300 mt-2">
              * Szanujemy Twoją prywatność. Możesz zrezygnować z subskrypcji w dowolnym momencie.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}