'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PromotionCard({ promotion }) {
  const [isCopied, setIsCopied] = useState(false)
  
  // Funkcja formatująca datę ważności
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }
  
  // Funkcja kopiująca kod promocyjny do schowka
  const copyCode = () => {
    if (promotion.code) {
      navigator.clipboard.writeText(promotion.code)
      setIsCopied(true)
      
      // Reset stanu po 3 sekundach
      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    }
  }
  
  // Sprawdź, czy promocja wygasa w ciągu najbliższych 7 dni
  const isExpiringSoon = () => {
    const today = new Date()
    const expiryDate = new Date(promotion.validUntil)
    const differenceInDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
    
    return differenceInDays <= 7 && differenceInDays >= 0
  }

  return (
    <div className="card relative overflow-hidden">
      {/* Badge zniżki */}
      <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg font-bold">
        {promotion.discount}
      </div>
      
      {/* Logo i provider */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-3 p-1">
          {/* Placeholder dla logo */}
          <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
            <span className="text-dark-300 font-bold">{promotion.provider[0]}</span>
          </div>
        </div>
        <span className="text-sm text-light-300">{promotion.provider}</span>
      </div>
      
      {/* Tytuł */}
      <h3 className="text-lg font-bold mb-3">{promotion.title}</h3>
      
      {/* Opis */}
      <p className="text-light-300 text-sm mb-4">
        {promotion.description}
      </p>
      
      {/* Data ważności */}
      <div className={`flex items-center text-sm mb-4 ${isExpiringSoon() ? 'text-red-400' : 'text-light-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          {isExpiringSoon() ? 'Wygasa wkrótce: ' : 'Ważne do: '}
          {formatDate(promotion.validUntil)}
        </span>
      </div>
      
      {/* Kod promocyjny */}
      {promotion.code && (
        <div className="mb-4">
          <div className="text-sm mb-1 text-light-300">Kod promocyjny:</div>
          <div 
            className="bg-dark-300 border border-dark-100 rounded p-2 flex justify-between items-center cursor-pointer"
            onClick={copyCode}
          >
            <span className="font-mono font-medium">{promotion.code}</span>
            <button className="text-primary hover:text-primary-dark">
              {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
          {isCopied && (
            <div className="text-xs text-green-400 mt-1">
              Skopiowano do schowka!
            </div>
          )}
        </div>
      )}
      
      {/* Przycisk */}
      <Link 
        href={promotion.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn-primary w-full text-center"
      >
        Skorzystaj z promocji
      </Link>
    </div>
  )
}