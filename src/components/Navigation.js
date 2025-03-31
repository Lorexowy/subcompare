'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-dark-400 shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient">SubCompare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/compare" 
              className="text-light-100 hover:text-primary transition-colors duration-200"
            >
              Porównywarka
            </Link>
            <Link 
              href="/calculator" 
              className="text-light-100 hover:text-primary transition-colors duration-200"
            >
              Kalkulator pakietów
            </Link>
            <Link 
              href="/promotions" 
              className="text-light-100 hover:text-primary transition-colors duration-200"
            >
              Promocje
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              href="/compare" 
              className="block text-light-100 hover:text-primary py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Porównywarka
            </Link>
            <Link 
              href="/calculator" 
              className="block text-light-100 hover:text-primary py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Kalkulator pakietów
            </Link>
            <Link 
              href="/promotions" 
              className="block text-light-100 hover:text-primary py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Promocje
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}