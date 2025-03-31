'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import subscriptions from '../../data/subscriptions'
import ComparisonTable from '../../components/ComparisonTable'

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([])
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [maxPrice, setMaxPrice] = useState(100)
  
  // Kategorie subskrypcji
  const categories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'streaming', name: 'Streaming wideo' },
    { id: 'music', name: 'Streaming muzyczny' },
    { id: 'gaming', name: 'Gry' },
    { id: 'audiobooks', name: 'Audiobooki' },
    { id: 'sport', name: 'Sport' }
  ]
  
  // Obsługa parametrów URL
  useEffect(() => {
    // Sprawdź parametr kategorii
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
    
    // Sprawdź parametr id subskrypcji
    const idParam = searchParams.get('id')
    if (idParam) {
      const subscription = subscriptions.find(sub => sub.id === idParam)
      if (subscription) {
        setSelectedSubscriptions([subscription])
      }
    }
    
    // Znajdź maksymalną cenę wśród wszystkich subskrypcji
    const highestPrice = Math.ceil(
      Math.max(...subscriptions.map(sub => sub.priceMonthly))
    )
    setMaxPrice(highestPrice)
    setPriceRange([0, highestPrice])
    
  }, [searchParams])
  
  // Filtrowanie subskrypcji
  useEffect(() => {
    let filtered = [...subscriptions]
    
    // Filtruj według kategorii
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(sub => sub.category === selectedCategory)
    }
    
    // Filtruj według nazwy/opisu
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(term) || 
        sub.provider.toLowerCase().includes(term) || 
        sub.description.toLowerCase().includes(term)
      )
    }
    
    // Filtruj według zakresu cen
    filtered = filtered.filter(sub => 
      sub.priceMonthly >= priceRange[0] && 
      sub.priceMonthly <= priceRange[1]
    )
    
    setFilteredSubscriptions(filtered)
  }, [selectedCategory, searchTerm, priceRange])
  
  // Funkcja obsługi zaznaczenia/odznaczenia subskrypcji
  const toggleSubscription = (subscription) => {
    setSelectedSubscriptions(prev => {
      // Sprawdź czy subskrypcja jest już zaznaczona
      const isSelected = prev.some(sub => sub.id === subscription.id)
      
      if (isSelected) {
        // Jeśli tak, usuń ją z listy
        return prev.filter(sub => sub.id !== subscription.id)
      } else {
        // Jeśli nie, dodaj ją do listy (maksymalnie 4 subskrypcje)
        if (prev.length < 4) {
          return [...prev, subscription]
        } else {
          alert('Możesz porównać maksymalnie 4 subskrypcje jednocześnie.')
          return prev
        }
      }
    })
  }
  
  // Funkcja czyszcząca wszystkie wybrane subskrypcje
  const clearSelection = () => {
    setSelectedSubscriptions([])
  }

  return (
    <div className="min-h-screen">
      {/* Nagłówek */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <h1 className="heading-xl text-center">Porównaj subskrypcje</h1>
          <p className="text-center text-light-300 mb-8 max-w-3xl mx-auto">
            Wybierz i porównaj oferty najlepszych serwisów subskrypcyjnych. Możesz filtrować według kategorii, ceny i wyszukiwać konkretne usługi.
          </p>
        </div>
      </section>
      
      {/* Filtry */}
      <section className="bg-dark-200 py-8 border-b border-dark-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kategorie */}
            <div>
              <h3 className="text-lg font-medium mb-3">Kategorie</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`py-2 px-4 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-dark-100 text-light-300 hover:bg-dark-300'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Wyszukiwarka */}
            <div>
              <h3 className="text-lg font-medium mb-3">Wyszukaj</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nazwa, dostawca, opis..."
                  className="w-full bg-dark-100 border border-dark-100 rounded-md py-2 px-4 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 absolute right-3 top-2.5 text-light-300">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Zakres cenowy */}
            <div>
              <h3 className="text-lg font-medium mb-3">Cena miesięczna</h3>
              <div className="px-3">
                <div className="flex justify-between text-sm text-light-300 mb-2">
                  <span>{priceRange[0]} zł</span>
                  <span>{priceRange[1]} zł</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="bg-dark-300 min-h-screen">
        <div className="container-custom py-8">
          {/* Liczba wyników */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-light-300">
              Znaleziono {filteredSubscriptions.length} {filteredSubscriptions.length === 1 ? 'subskrypcję' : 
                filteredSubscriptions.length < 5 ? 'subskrypcje' : 'subskrypcji'}
            </p>
            
            {/* Przyciski akcji dla wybranych subskrypcji */}
            {selectedSubscriptions.length > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-light-300">
                  Wybrano: {selectedSubscriptions.length}
                </span>
                <button
                  onClick={clearSelection}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Wyczyść
                </button>
              </div>
            )}
          </div>
          
          {/* Wyniki wyszukiwania */}
          {filteredSubscriptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredSubscriptions.map(subscription => {
                const isSelected = selectedSubscriptions.some(
                  sub => sub.id === subscription.id
                )
                
                return (
                  <div 
                    key={subscription.id}
                    className={`card cursor-pointer transition-all duration-200 ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => toggleSubscription(subscription)}
                  >
                    {/* Status wyboru */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary bg-primary' : 'border-light-300'
                      }`}>
                        {isSelected && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    {/* Zawartość karty */}
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-3 p-1">
                        {/* Placeholder dla logo */}
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                          <span className="text-dark-300 font-bold">{subscription.provider[0]}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{subscription.name}</h3>
                        <p className="text-light-300 text-sm">{subscription.provider}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-baseline">
                        <span className="text-xl font-bold">{subscription.priceMonthly.toFixed(2)} zł</span>
                        <span className="text-light-300 text-sm ml-1">/miesiąc</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-light-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{subscription.screens} {subscription.screens === 1 ? 'ekran' : subscription.screens < 5 ? 'ekrany' : 'ekranów'}</span>
                      </div>
                      
                      <div className="flex items-center text-light-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span>Jakość: {subscription.resolution}</span>
                      </div>
                      
                      <div className="flex items-center text-light-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{subscription.offlineViewing ? 'Oglądanie offline' : 'Brak oglądania offline'}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-200 rounded-lg">
              <p className="text-xl text-light-300 mb-4">Nie znaleziono subskrypcji spełniających kryteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                  setPriceRange([0, maxPrice])
                }}
                className="btn-primary"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
          
          {/* Tabela porównawcza */}
          {selectedSubscriptions.length > 0 && (
            <div className="mt-8">
              <h2 className="heading-lg mb-6">Porównanie wybranych subskrypcji</h2>
              <ComparisonTable subscriptions={selectedSubscriptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}