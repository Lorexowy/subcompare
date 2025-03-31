'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function SubscriptionCard({ subscription }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Oblicz zniżkę przy płatności rocznej
  const yearlyDiscount = subscription.yearlyDiscount || 0

  // Renderuj gwiazdki oceny
  const renderRating = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Pełna gwiazdka
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        )
      } else if (i === fullStars && hasHalfStar) {
        // Pół gwiazdki
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        )
      } else {
        // Pusta gwiazdka
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-yellow-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )
      }
    }
    
    return stars
  }

  return (
    <div 
      className="card h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo i nagłówek */}
      <div className="flex items-start mb-4">
        <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center mr-4 p-2">
          {/* Placeholder dla logo */}
          <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
            <span className="text-dark-300 font-bold">{subscription.provider[0]}</span>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg">{subscription.name}</h3>
          <p className="text-light-300 text-sm">{subscription.provider}</p>
        </div>
      </div>
      
      {/* Cena */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{subscription.priceMonthly.toFixed(2)} zł</span>
          <span className="text-light-300 text-sm ml-1">/miesiąc</span>
        </div>
        
        {yearlyDiscount > 0 && (
          <div className="mt-1 text-sm">
            <span className="text-green-400">Zaoszczędź {yearlyDiscount}% </span>
            <span className="text-light-300">przy subskrypcji rocznej</span>
          </div>
        )}
      </div>
      
      {/* Szczegóły */}
      <div className="flex-grow space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{subscription.screens} {subscription.screens === 1 ? 'ekran' : subscription.screens < 5 ? 'ekrany' : 'ekranów'}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span>Jakość: {subscription.resolution}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{subscription.offlineViewing ? 'Oglądanie offline' : 'Brak oglądania offline'}</span>
        </div>
        
        {subscription.trialPeriod > 0 && (
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Okres próbny: {subscription.trialPeriod} dni</span>
          </div>
        )}
      </div>
      
      {/* Ocena */}
      <div className="flex items-center mb-6">
        <div className="flex mr-2">
          {renderRating(subscription.rating)}
        </div>
        <span className="text-light-300 text-sm">{subscription.rating.toFixed(1)}/5</span>
      </div>
      
      {/* Przycisk */}
      <div className="mt-auto">
        <Link
          href={`/compare?id=${subscription.id}`}
          className={`w-full block text-center py-2 px-4 rounded font-semibold transition-colors duration-200 ${
            isHovered ? 'bg-primary text-white' : 'bg-dark-200 text-white'
          }`}
        >
          Szczegóły
        </Link>
      </div>
    </div>
  )
}