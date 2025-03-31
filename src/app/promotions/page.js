'use client'

import { useState } from 'react'
import PromotionCard from '../../components/PromotionCard'
import promotions from '../../data/promotions'

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Kategorie promocji
  const categories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'streaming', name: 'Streaming wideo' },
    { id: 'music', name: 'Streaming muzyczny' },
    { id: 'gaming', name: 'Gry' },
    { id: 'audiobooks', name: 'Audiobooki' },
    { id: 'sport', name: 'Sport' }
  ]
  
  // Filtrowanie promocji
  const filteredPromotions = promotions.filter(promo => {
    // Filtrowanie według kategorii
    const categoryMatch = selectedCategory === 'all' || promo.category === selectedCategory
    
    // Filtrowanie według wyszukiwania
    const searchMatch = !searchTerm || 
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return categoryMatch && searchMatch
  })
  
  // Podziel promocje na wygasające wkrótce i resztę
  const today = new Date()
  const oneWeekFromNow = new Date(today)
  oneWeekFromNow.setDate(today.getDate() + 7)
  
  const expiringSoon = filteredPromotions.filter(promo => {
    const expiryDate = new Date(promo.validUntil)
    return expiryDate <= oneWeekFromNow && expiryDate >= today
  })
  
  const otherPromotions = filteredPromotions.filter(promo => {
    const expiryDate = new Date(promo.validUntil)
    return expiryDate > oneWeekFromNow
  })

  return (
    <div className="min-h-screen">
      {/* Nagłówek */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <h1 className="heading-xl text-center">Centrum promocji</h1>
          <p className="text-center text-light-300 mb-8 max-w-3xl mx-auto">
            Znajdź najlepsze promocje i rabaty na usługi streamingowe, muzyczne, gamingowe i więcej. Regularnie aktualizujemy tę stronę, aby zapewnić Ci dostęp do najnowszych ofert.
          </p>
        </div>
      </section>
      
      {/* Filtry */}
      <section className="bg-dark-200 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Kategorie */}
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
            
            {/* Wyszukiwarka */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Szukaj promocji..."
                className="w-full bg-dark-100 border border-dark-100 rounded-md py-2 px-4 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 absolute right-3 top-2.5 text-light-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Wygasające wkrótce promocje */}
      {expiringSoon.length > 0 && (
        <section className="bg-dark-300 py-12">
          <div className="container-custom">
            <div className="flex items-center mb-8">
              <h2 className="heading-lg text-red-400">Wygasają wkrótce</h2>
              <div className="ml-4 bg-red-400 bg-opacity-20 text-red-400 py-1 px-3 rounded-full text-sm">
                {expiringSoon.length} {expiringSoon.length === 1 ? 'promocja' : expiringSoon.length < 5 ? 'promocje' : 'promocji'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiringSoon.map(promotion => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Pozostałe promocje */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <div className="flex items-center mb-8">
            <h2 className="heading-lg">Aktualne promocje</h2>
            <div className="ml-4 bg-dark-100 py-1 px-3 rounded-full text-sm text-light-300">
              {otherPromotions.length} {otherPromotions.length === 1 ? 'promocja' : otherPromotions.length < 5 ? 'promocje' : 'promocji'}
            </div>
          </div>
          
          {otherPromotions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPromotions.map(promotion => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-200 rounded-lg">
              <p className="text-xl text-light-300">Nie znaleziono promocji spełniających kryteria.</p>
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
      
      {/* Sekcja zapisów na newsletter */}
      <section className="bg-primary bg-opacity-20 py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bądź na bieżąco z najlepszymi promocjami</h2>
          <p className="text-light-300 mb-8 max-w-2xl mx-auto">
            Zapisz się do naszego newslettera, aby otrzymywać powiadomienia o nowych promocjach i specjalnych ofertach bezpośrednio na swój adres e-mail.
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
      
      {/* FAQ */}
      <section className="bg-dark-200 py-16">
        <div className="container-custom">
          <h2 className="heading-xl mb-8 text-center">Najczęściej zadawane pytania</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Jak często aktualizujecie promocje?</h3>
              <p className="text-light-300">
                Nasze centrum promocji jest aktualizowane codziennie. Sprawdzamy wszystkie popularne serwisy, aby zapewnić, że masz dostęp do najbardziej aktualnych ofert.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Czy wszystkie kody promocyjne działają?</h3>
              <p className="text-light-300">
                Dokładamy wszelkich starań, aby wszystkie publikowane kody były aktualne i działały poprawnie. Jeśli jednak napotkasz niedziałający kod, prosimy o kontakt, abyśmy mogli to szybko skorygować.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Czy promocje są dostępne tylko dla nowych użytkowników?</h3>
              <p className="text-light-300">
                To zależy od konkretnej oferty. Większość promocji jest skierowana do nowych użytkowników, ale staramy się również znaleźć i udostępnić oferty dla obecnych klientów.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Jak skorzystać z promocji?</h3>
              <p className="text-light-300">
                Kliknij przycisk "Skorzystaj z promocji", aby przejść bezpośrednio do strony dostawcy. Jeśli promocja wymaga kodu, możesz go skopiować i wkleić podczas procesu płatności na stronie dostawcy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}