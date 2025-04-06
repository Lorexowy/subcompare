'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import subscriptions from '../../data/subscriptions'

// Wydzielony komponent wewnętrzny (bez export)
function CalculatorContent() {
  const searchParams = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [budget, setBudget] = useState(50)
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  // Kategorie zainteresowań
  const categories = [
    { id: 'movies', name: 'Filmy', emoji: '🎬' },
    { id: 'series', name: 'Seriale', emoji: '📺' },
    { id: 'music', name: 'Muzyka', emoji: '🎵' },
    { id: 'sports', name: 'Sport', emoji: '⚽' },
    { id: 'gaming', name: 'Gry', emoji: '🎮' },
    { id: 'books', name: 'Książki/Audiobooki', emoji: '📚' },
    { id: 'kids', name: 'Treści dla dzieci', emoji: '👶' },
    { id: 'documentaries', name: 'Dokumenty', emoji: '🌍' },
  ]

  // Sprawdź parametr pakietu z URL
  useEffect(() => {
    const packageParam = searchParams.get('package')
    if (packageParam) {
      // Przykładowe predefiniowane pakiety
      if (packageParam === 'budget') {
        setSelectedCategories(['movies', 'series', 'books'])
        setBudget(40)
        calculateRecommendations(['movies', 'series', 'books'], 40)
      } else if (packageParam === 'optimal') {
        setSelectedCategories(['movies', 'series', 'music', 'books'])
        setBudget(70)
        calculateRecommendations(['movies', 'series', 'music', 'books'], 70)
      } else if (packageParam === 'premium') {
        setSelectedCategories(['movies', 'series', 'music', 'kids', 'sports'])
        setBudget(120)
        calculateRecommendations(['movies', 'series', 'music', 'kids', 'sports'], 120)
      }
      setShowResults(true)
    }
  }, [searchParams])

  // Funkcja aktualizująca wybrane kategorie
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Funkcja mapująca kategorie zainteresowań na kategorie subskrypcji
  const mapToSubscriptionCategories = (interestCategories) => {
    const mapping = {
      movies: ['streaming'],
      series: ['streaming'],
      music: ['music'],
      sports: ['sport'],
      gaming: ['gaming'],
      books: ['audiobooks'],
      kids: ['streaming'],
      documentaries: ['streaming'],
    }

    const subscriptionCategories = new Set()
    interestCategories.forEach(category => {
      if (mapping[category]) {
        mapping[category].forEach(subCategory => {
          subscriptionCategories.add(subCategory)
        })
      }
    })

    return Array.from(subscriptionCategories)
  }

  // Funkcja obliczająca punktację dla subskrypcji
  const scoreSubscription = (sub, interestCategories) => {
    let score = sub.rating

    if (interestCategories.includes('movies') && sub.tags.some(tag => tag === 'filmy')) score += 1
    if (interestCategories.includes('series') && sub.tags.some(tag => tag === 'seriale')) score += 1
    if (interestCategories.includes('music') && sub.tags.some(tag => ['muzyka', 'podcasty'].includes(tag))) score += 1
    if (interestCategories.includes('sports') && sub.tags.some(tag => ['sport', 'piłka nożna', 'transmisje sportowe'].includes(tag))) score += 1
    if (interestCategories.includes('gaming') && sub.tags.some(tag => tag === 'gry')) score += 1
    if (interestCategories.includes('books') && sub.tags.some(tag => ['audiobooki', 'e-booki'].includes(tag))) score += 1
    if (interestCategories.includes('kids') && sub.tags.some(tag => ['bajki', 'dzieci'].includes(tag))) score += 1
    if (interestCategories.includes('documentaries') && sub.tags.some(tag => tag === 'dokumenty')) score += 1

    if (sub.resolution === '4K' || sub.resolution === 'Full HD') score += 0.5
    if (sub.offlineViewing) score += 0.3
    if (sub.adsFree) score += 0.3
    if (sub.trialPeriod > 0) score += 0.2
    if (sub.yearlyDiscount > 0) score += 0.2

    return score
  }

  // Ulepszona funkcja generująca pakiet subskrypcji z wykorzystaniem algorytmu knapSack
  const generatePackage = (availableSubs, maxBudget, interestCategories) => {
    const MAX_SUBSCRIPTIONS = 4

    // Przypisanie punktacji i przeliczenie ceny na grosze (ceny w groszach)
    const scoredSubs = availableSubs.map(sub => ({
      ...sub,
      score: scoreSubscription(sub, interestCategories),
      cost: Math.round(sub.priceMonthly * 100)
    })).sort((a, b) => b.score - a.score)

    // Określ wymagane kategorie subskrypcji
    const requiredSubCategories = mapToSubscriptionCategories(interestCategories)

    // Faza 1: Wybierz subskrypcje, które pokrywają każdą wymaganą kategorię
    let remainingBudget = maxBudget
    let remainingBudgetCents = Math.floor(remainingBudget * 100)
    const selectedSubs = []

    requiredSubCategories.forEach(reqCategory => {
      // Znajdź kandydata dla danej kategorii, który mieści się w budżecie
      const candidates = scoredSubs.filter(sub =>
        sub.category === reqCategory &&
        sub.cost <= remainingBudgetCents &&
        !selectedSubs.find(s => s.id === sub.id)
      )
      if (candidates.length > 0) {
        const bestCandidate = candidates[0] // dzięki sortowaniu mamy najlepszego na początku
        selectedSubs.push(bestCandidate)
        remainingBudgetCents -= bestCandidate.cost
      }
    })

    // Faza 2: Dobierz dodatkowe subskrypcje przy użyciu algorytmu knapSack
    const remainingCount = MAX_SUBSCRIPTIONS - selectedSubs.length
    // Filtruj te, które nie zostały już wybrane i mieszczą się w aktualnym budżecie
    const remainingItems = scoredSubs.filter(sub =>
      !selectedSubs.find(s => s.id === sub.id) && sub.cost <= remainingBudgetCents
    )

    // Implementacja algorytmu knapSack z ograniczeniem liczby pozycji
    const memo = new Map()
    const dp = (i, budget, count) => {
      if (i >= remainingItems.length || count === 0 || budget <= 0) {
        return { score: 0, items: [] }
      }
      const key = `${i}-${budget}-${count}`
      if (memo.has(key)) {
        return memo.get(key)
      }
      // Opcja 1: pomiń bieżący element
      const option1 = dp(i + 1, budget, count)
      let option2 = { score: 0, items: [] }
      const item = remainingItems[i]
      if (item.cost <= budget) {
        const next = dp(i + 1, budget - item.cost, count - 1)
        option2 = { score: item.score + next.score, items: [item, ...next.items] }
      }
      const result = option1.score > option2.score ? option1 : option2
      memo.set(key, result)
      return result
    }

    const knapResult = dp(0, remainingBudgetCents, remainingCount)
    const finalSelected = [...selectedSubs, ...knapResult.items]

    const totalCostCents = finalSelected.reduce((sum, sub) => sum + sub.cost, 0)
    const totalCost = totalCostCents / 100

    return {
      subscriptions: finalSelected,
      totalCost,
      savings: maxBudget - totalCost
    }
  }

  // Funkcja obliczająca rekomendowane pakiety
  const calculateRecommendations = (categoriesInput = selectedCategories, budgetValue = budget) => {
    if (categoriesInput.length === 0) {
      alert('Wybierz co najmniej jedną kategorię zainteresowań.')
      return
    }

    // Mapuj kategorie zainteresowań na kategorie subskrypcji
    const subscriptionCategories = mapToSubscriptionCategories(categoriesInput)

    // Filtruj subskrypcje według wybranych kategorii
    const relevantSubscriptions = subscriptions.filter(sub =>
      subscriptionCategories.includes(sub.category)
    )

    // Przygotuj popularne wybory w każdej kategorii
    const popularChoices = subscriptionCategories.map(category => {
      return subscriptions
        .filter(sub => sub.category === category)
        .sort((a, b) => b.rating - a.rating)[0]
    }).filter(Boolean)

    // Generuj pakiety dla trzech scenariuszy budżetowych
    const budgetPackage = generatePackage(relevantSubscriptions, budgetValue * 0.7, categoriesInput)
    const optimalPackage = generatePackage(relevantSubscriptions, budgetValue, categoriesInput)
    const premiumPackage = generatePackage(relevantSubscriptions, budgetValue * 1.5, categoriesInput)

    setResults({
      budget: budgetPackage,
      optimal: optimalPackage,
      premium: premiumPackage,
      popularChoices
    })

    setShowResults(true)
  }

  return (
    <div className="min-h-screen">
      {/* Nagłówek */}
      <section className="bg-dark-300 py-12">
        <div className="container-custom">
          <h1 className="heading-xl text-center">Kalkulator zestawów abonamentowych</h1>
          <p className="text-center text-light-300 mb-8 max-w-3xl mx-auto">
            Wybierz swoje zainteresowania i budżet, a my zaproponujemy Ci najlepsze zestawy subskrypcji dopasowane do Twoich potrzeb.
          </p>
        </div>
      </section>

      {/* Formularz */}
      <section className={`bg-dark-200 py-12 ${showResults ? '' : 'pb-24'}`}>
        <div className="container-custom">
          <div className="bg-dark-100 rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="heading-md mb-6">Co Cię interesuje?</h2>

            {/* Kategorie zainteresowań */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`p-4 rounded-lg border-2 transition-colors text-center ${
                    selectedCategories.includes(category.id)
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-dark-200 hover:border-primary'
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="text-3xl mb-2">{category.emoji}</div>
                  <div className="font-medium">{category.name}</div>
                </button>
              ))}
            </div>

            {/* Budżet */}
            <div className="mb-8">
              <h2 className="heading-md mb-6">Twój miesięczny budżet</h2>
              <div className="flex items-center mb-4">
                <span className="text-light-300 text-lg mr-4">0 zł</span>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="flex-grow"
                />
                <span className="text-light-300 text-lg ml-4">200 zł</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold">{budget} zł</span>
                <span className="text-light-300 ml-2">/ miesiąc</span>
              </div>
            </div>

            {/* Przycisk obliczania */}
            <div className="text-center">
              <button
                onClick={() => calculateRecommendations()}
                className="btn-primary py-3 px-8 text-lg"
                disabled={selectedCategories.length === 0}
              >
                Znajdź idealne zestawy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Wyniki */}
      {showResults && results && (
        <section className="bg-dark-300 py-12">
          <div className="container-custom">
            <h2 className="heading-xl mb-8">Twoje rekomendowane zestawy</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pakiet budżetowy */}
              <div className="card">
                <div className="bg-dark-200 -mx-6 -mt-6 p-4 rounded-t-lg border-b border-dark-300 mb-6">
                  <h3 className="text-xl font-bold text-center">Budżetowy</h3>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-1">{results.budget.totalCost.toFixed(2)} zł</div>
                  <div className="text-light-300">/ miesiąc</div>
                </div>

                <div className="space-y-4 mb-6">
                  {results.budget.subscriptions.map(sub => (
                    <div key={sub.id} className="flex items-center bg-dark-200 p-3 rounded-lg">
                      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center mr-3 p-1">
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                          <span className="text-dark-300 font-bold text-xs">{sub.provider[0]}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-sm text-light-300">{sub.provider}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{sub.priceMonthly.toFixed(2)} zł</div>
                      </div>
                    </div>
                  ))}
                </div>

                {results.budget.subscriptions.length === 0 ? (
                  <p className="text-light-300 text-center">Nie znaleziono pasujących subskrypcji w tym budżecie.</p>
                ) : (
                  <Link
                    href={`/compare?id=${results.budget.subscriptions.map(s => s.id).join(',')}`}
                    className="btn-primary w-full text-center"
                  >
                    Porównaj subskrypcje
                  </Link>
                )}
              </div>

              {/* Pakiet optymalny */}
              <div className="card border-2 border-primary transform scale-105">
                <div className="bg-primary -mx-6 -mt-6 p-4 rounded-t-lg mb-6 relative">
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs py-1 px-3 rounded-full">
                    Polecany
                  </span>
                  <h3 className="text-xl font-bold text-center text-white">Optymalny</h3>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-1">{results.optimal.totalCost.toFixed(2)} zł</div>
                  <div className="text-light-300">/ miesiąc</div>
                </div>

                <div className="space-y-4 mb-6">
                  {results.optimal.subscriptions.map(sub => (
                    <div key={sub.id} className="flex items-center bg-dark-200 p-3 rounded-lg">
                      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center mr-3 p-1">
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                          <span className="text-dark-300 font-bold text-xs">{sub.provider[0]}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-sm text-light-300">{sub.provider}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{sub.priceMonthly.toFixed(2)} zł</div>
                      </div>
                    </div>
                  ))}
                </div>

                {results.optimal.subscriptions.length === 0 ? (
                  <p className="text-light-300 text-center">Nie znaleziono pasujących subskrypcji w tym budżecie.</p>
                ) : (
                  <Link
                    href={`/compare?id=${results.optimal.subscriptions.map(s => s.id).join(',')}`}
                    className="btn-primary w-full text-center"
                  >
                    Porównaj subskrypcje
                  </Link>
                )}
              </div>

              {/* Pakiet premium */}
              <div className="card">
                <div className="bg-dark-200 -mx-6 -mt-6 p-4 rounded-t-lg border-b border-dark-300 mb-6">
                  <h3 className="text-xl font-bold text-center">Premium</h3>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-1">{results.premium.totalCost.toFixed(2)} zł</div>
                  <div className="text-light-300">/ miesiąc</div>
                </div>

                <div className="space-y-4 mb-6">
                  {results.premium.subscriptions.map(sub => (
                    <div key={sub.id} className="flex items-center bg-dark-200 p-3 rounded-lg">
                      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center mr-3 p-1">
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                          <span className="text-dark-300 font-bold text-xs">{sub.provider[0]}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-sm text-light-300">{sub.provider}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{sub.priceMonthly.toFixed(2)} zł</div>
                      </div>
                    </div>
                  ))}
                </div>

                {results.premium.subscriptions.length === 0 ? (
                  <p className="text-light-300 text-center">Nie znaleziono pasujących subskrypcji w tym budżecie.</p>
                ) : (
                  <Link
                    href={`/compare?id=${results.premium.subscriptions.map(s => s.id).join(',')}`}
                    className="btn-primary w-full text-center"
                  >
                    Porównaj subskrypcje
                  </Link>
                )}
              </div>
            </div>

            {/* Najpopularniejsze wybory */}
            <div className="mt-16">
              <h2 className="heading-lg mb-6">Najpopularniejsze wybory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.popularChoices.map(sub => (
                  <div key={sub.id} className="card">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-3 p-1">
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                          <span className="text-dark-300 font-bold">{sub.provider[0]}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{sub.name}</h3>
                        <p className="text-light-300 text-sm">{sub.provider}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-baseline">
                        <span className="text-xl font-bold">{sub.priceMonthly.toFixed(2)} zł</span>
                        <span className="text-light-300 text-sm ml-1">/miesiąc</span>
                      </div>
                    </div>

                    <p className="text-sm text-light-300 mb-4">
                      {sub.description && sub.description.length > 100 
                        ? sub.description.substring(0, 100) + '...' 
                        : sub.description}
                    </p>

                    <Link
                      href={`/compare?id=${sub.id}`}
                      className="bg-dark-200 hover:bg-primary hover:text-white text-light-100 py-2 px-4 rounded font-semibold transition-colors duration-200 text-center block"
                    >
                      Szczegóły
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sekcja FAQ */}
      <section className="bg-dark-200 py-16">
        <div className="container-custom">
          <h2 className="heading-xl mb-8 text-center">Najczęściej zadawane pytania</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Jak działa kalkulator zestawów?</h3>
              <p className="text-light-300">
                Nasz kalkulator analizuje Twoje zainteresowania i budżet, a następnie proponuje trzy zestawy subskrypcji: budżetowy, optymalny i premium. Każdy zestaw zawiera najlepsze serwisy dopasowane do Twoich potrzeb.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Czy mogę modyfikować proponowane zestawy?</h3>
              <p className="text-light-300">
                Tak, możesz kliknąć "Porównaj subskrypcje" aby zobaczyć szczegóły proponowanych serwisów, a następnie dostosować swój zestaw według własnych preferencji.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Czy ceny są aktualne?</h3>
              <p className="text-light-300">
                Staramy się na bieżąco aktualizować ceny wszystkich serwisów, jednak zawsze warto zweryfikować aktualne ceny na stronach dostawców, szczególnie pod kątem promocji.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Czy mogę zaoszczędzić więcej?</h3>
              <p className="text-light-300">
                Zdecydowanie! Sprawdź naszą sekcję Promocje, gdzie regularnie aktualizujemy najlepsze oferty i kody promocyjne, które mogą dodatkowo obniżyć koszty Twoich subskrypcji.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// UWAGA: Tylko jeden export default!
export default function CalculatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-dark-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-light-200 text-xl">Ładowanie...</p>
        </div>
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  );
}
