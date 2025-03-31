'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Tv, Music, Gamepad2, Headphones, Trophy, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react'

import subscriptions from '../../data/subscriptions'

export default function PlatformsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Grupuj subskrypcje według dostawcy
  const groupedByProvider = subscriptions.reduce((acc, subscription) => {
    const provider = subscription.provider
    
    if (!acc[provider]) {
      // Znajdź pierwszą subskrypcję dla danego dostawcy
      const firstSub = subscriptions.find(sub => sub.provider === provider)
      
      acc[provider] = {
        name: provider,
        category: firstSub.category,
        subscriptions: [],
        rating: calculateAverageRating(provider),
        id: firstSub.id, // Używamy ID pierwszej subskrypcji jako ID platformy
      }
    }
    
    acc[provider].subscriptions.push(subscription)
    return acc
  }, {})
  
  // Konwertuj obiekt na tablicę platform
  const platforms = Object.values(groupedByProvider)
  
  // Filtruj platformy na podstawie wyszukiwania i kategorii
  const filteredPlatforms = platforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  // Grupuj platformy według kategorii
  const platformsByCategory = filteredPlatforms.reduce((acc, platform) => {
    const category = platform.category
    
    if (!acc[category]) {
      acc[category] = []
    }
    
    acc[category].push(platform)
    return acc
  }, {})
  
  // Funkcja obliczająca średnią ocenę dla dostawcy
  function calculateAverageRating(provider) {
    const providerSubs = subscriptions.filter(sub => sub.provider === provider)
    if (providerSubs.length === 0) return 0
    
    const sum = providerSubs.reduce((total, sub) => total + sub.rating, 0)
    return (sum / providerSubs.length).toFixed(1)
  }
  
  // Funkcja zwracająca ikonę dla kategorii
  function getCategoryIcon(category) {
    switch(category) {
      case 'streaming':
        return <Tv className="w-5 h-5" />
      case 'music':
        return <Music className="w-5 h-5" />
      case 'gaming':
        return <Gamepad2 className="w-5 h-5" />
      case 'audiobooks':
        return <Headphones className="w-5 h-5" />
      case 'sport':
        return <Trophy className="w-5 h-5" />
      default:
        return <Tv className="w-5 h-5" />
    }
  }
  
  // Funkcja zwracająca nazwę kategorii po polsku
  function getCategoryName(category) {
    switch(category) {
      case 'streaming':
        return 'Streaming wideo'
      case 'music':
        return 'Streaming muzyczny'
      case 'gaming':
        return 'Gry'
      case 'audiobooks':
        return 'Audiobooki'
      case 'sport':
        return 'Sport'
      default:
        return category
    }
  }
  
  // Funkcja zmienia rozwinięcie kategorii
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }
  
  // Formatowanie ceny
  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',') + ' zł'
  }
  
  // Oblicz najtańszą subskrypcję dla platformy
  const getLowestPrice = (subscriptions) => {
    return Math.min(...subscriptions.map(sub => sub.priceMonthly))
  }
  
  // Otrzymaj opis platformy na podstawie kategorii
  const getPlatformDescription = (platform) => {
    switch(platform.category) {
      case 'streaming':
        return `Platforma streamingowa oferująca filmy, seriale i programy telewizyjne.`
      case 'music':
        return `Serwis streamingu muzycznego z dostępem do milionów utworów i playlist.`
      case 'gaming':
        return `Platforma z grami dostępnymi w ramach subskrypcji na różnych urządzeniach.`
      case 'audiobooks':
        return `Serwis z audiobookami i e-bookami w ramach abonamentu.`
      case 'sport':
        return `Platforma z transmisjami sportowymi na żywo z różnych dyscyplin.`
      default:
        return `Platforma subskrypcyjna z różnorodnymi treściami cyfrowymi.`
    }
  }

  return (
    <div className="min-h-screen bg-dark-300">
      {/* Nagłówek */}
      <section className="bg-dark-300 py-12 relative overflow-hidden">
        {/* Tło z gradientem i efektami */}
        <div className="absolute inset-0 bg-grid bg-noise opacity-10 z-0"></div>
        <div className="absolute -left-20 top-20 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 bottom-20 w-72 h-72 bg-secondary-600/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <h1 className="heading-xl text-center mb-4">Wszystkie platformy</h1>
          <p className="text-center text-light-300 mb-8 max-w-3xl mx-auto">
            Przeglądaj i porównuj wszystkie dostępne platformy subskrypcyjne. Znajdź idealną platformę dopasowaną do swoich potrzeb i budżetu.
          </p>
          
          {/* Wyszukiwarka i filtry */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Wyszukiwarka - POPRAWIONA CZĘŚĆ */}
              <div className="relative flex items-center">
                <input
                    type="text"
                    className="w-full bg-dark-100 border-none rounded-lg py-3 pl-12 pr-4 text-light-100 placeholder-light-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    placeholder="Szukaj platformy..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Search className="w-5 h-5 text-light-400" />
                </div>
                </div>
              
              {/* Filtr kategorii */}
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    selectedCategory === 'all' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-100 text-light-300 hover:bg-dark-200'
                  }`}
                  onClick={() => setSelectedCategory('all')}
                >
                  <Filter className="w-4 h-4" />
                  Wszystkie
                </button>
                
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    selectedCategory === 'streaming' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-100 text-light-300 hover:bg-dark-200'
                  }`}
                  onClick={() => setSelectedCategory('streaming')}
                >
                  <Tv className="w-4 h-4" />
                  Streaming
                </button>
                
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    selectedCategory === 'music' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-100 text-light-300 hover:bg-dark-200'
                  }`}
                  onClick={() => setSelectedCategory('music')}
                >
                  <Music className="w-4 h-4" />
                  Muzyka
                </button>
                
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    selectedCategory === 'gaming' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-100 text-light-300 hover:bg-dark-200'
                  }`}
                  onClick={() => setSelectedCategory('gaming')}
                >
                  <Gamepad2 className="w-4 h-4" />
                  Gry
                </button>
                
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    selectedCategory === 'audiobooks' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-100 text-light-300 hover:bg-dark-200'
                  }`}
                  onClick={() => setSelectedCategory('audiobooks')}
                >
                  <Headphones className="w-4 h-4" />
                  Audiobooki
                </button>
                
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    selectedCategory === 'sport' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-100 text-light-300 hover:bg-dark-200'
                  }`}
                  onClick={() => setSelectedCategory('sport')}
                >
                  <Trophy className="w-4 h-4" />
                  Sport
                </button>
              </div>
            </div>
          </div>
          
          {/* Liczba wyników */}
          <div className="text-center text-light-300 mb-4">
            Znaleziono {filteredPlatforms.length} {filteredPlatforms.length === 1 ? 'platformę' : 
              filteredPlatforms.length < 5 ? 'platformy' : 'platform'}
          </div>
        </div>
      </section>
      
      {/* Lista platform */}
      <section className="py-12">
        <div className="container-custom">
          {Object.keys(platformsByCategory).length > 0 ? (
            <div className="space-y-16">
              {Object.entries(platformsByCategory).map(([category, platforms]) => (
                <div key={category} className="space-y-6">
                  {/* Nagłówek kategorii */}
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    <div className="flex items-center">
                      <div className="bg-dark-200 p-2 rounded-lg mr-3">
                        {getCategoryIcon(category)}
                      </div>
                      <h2 className="heading-lg">{getCategoryName(category)}</h2>
                    </div>
                    
                    <button className="p-2 bg-dark-200 rounded-full">
                      {expandedCategory === category ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Lista platform */}
                  <div className={`transition-all duration-300 ${
                    expandedCategory === category || expandedCategory === null ? 'block' : 'hidden'
                  }`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {platforms.map((platform) => (
                        <Link 
                          href={`/platform/${platform.id}`} 
                          key={platform.name}
                          className="card hover-lift hover:border-primary-800 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4 mb-4">
                            {/* Logo platformy */}
                            <div className="flex-shrink-0 w-16 h-16 bg-dark-100 rounded-lg flex items-center justify-center">
                              <div className="text-2xl font-bold">{platform.name[0]}</div>
                            </div>
                            
                            <div className="flex-grow">
                              <h3 className="text-xl font-bold mb-1">{platform.name}</h3>
                              <div className="flex items-center">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span className="text-light-300">{platform.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-light-300 text-sm mb-3">
                            {getPlatformDescription(platform)}
                          </p>
                          
                          <div className="flex justify-between items-center mb-2 text-sm">
                            <span className="text-light-400">Liczba planów:</span>
                            <span className="font-medium">{platform.subscriptions.length}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-4 text-sm">
                            <span className="text-light-400">Ceny od:</span>
                            <span className="font-medium">{formatPrice(getLowestPrice(platform.subscriptions))}</span>
                          </div>
                          
                          <div className="flex items-center text-primary-400 text-sm font-medium">
                            <span>Zobacz szczegóły</span>
                            <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-200 rounded-lg">
              <p className="text-xl text-light-300 mb-4">
                Nie znaleziono platform spełniających kryteria wyszukiwania.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="btn-primary"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Sekcja CTA */}
      <section className="py-16 bg-dark-200">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-4">Nie wiesz, którą platformę wybrać?</h2>
          <p className="text-light-300 mb-8 max-w-2xl mx-auto">
            Skorzystaj z naszego kalkulatora, który pomoże Ci znaleźć idealny zestaw subskrypcji dopasowany do Twoich potrzeb i budżetu.
          </p>
          <Link href="/calculator" className="btn-primary">
            Przejdź do kalkulatora
          </Link>
        </div>
      </section>
    </div>
  )
}