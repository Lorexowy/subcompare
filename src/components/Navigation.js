'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Efekt wykrywający scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Funkcja sprawdzająca, czy link jest aktywny
  const isActive = (path) => {
    return pathname === path
  }

  // Zamknij menu po kliknięciu poza navem
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Definiujemy obiekty nawigacyjne z ikonami
  const navItems = [
    {
      name: "Porównywarka",
      href: "/compare",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: "Kalkulator pakietów",
      href: "/calculator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "Promocje",
      href: "/promotions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <nav 
      className={`${
        isScrolled 
          ? 'bg-dark-400/95 backdrop-blur-sm shadow-lg' 
          : 'bg-dark-400'
      } transition-all duration-300 sticky top-0 z-50`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              SubCompare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.href}
                href={item.href} 
                isActive={isActive(item.href)}
              >
                <span className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="text-white hover:text-primary focus:outline-none p-2 rounded-lg hover:bg-dark-300 transition-colors duration-200"
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
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
          <div className="md:hidden py-4 space-y-1 animate-fadeIn">
            {navItems.map((item) => (
              <MobileNavLink 
                key={item.href}
                href={item.href} 
                isActive={isActive(item.href)}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </span>
              </MobileNavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// Komponent dla linków nawigacji na desktop
function NavLink({ href, isActive, children }) {
  return (
    <Link 
      href={href} 
      className={`px-3 py-2 rounded-lg transition-colors duration-200 relative group ${
        isActive 
          ? 'text-white font-medium' 
          : 'text-light-300 hover:text-white hover:bg-dark-300'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></span>
      )}
    </Link>
  )
}

// Komponent dla linków nawigacji na mobile
function MobileNavLink({ href, isActive, onClick, children }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`block py-3 px-4 rounded-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500/10 to-green-500/10 text-white font-medium border-l-4 border-blue-500' 
          : 'text-light-300 hover:text-white hover:bg-dark-300'
      }`}
    >
      {children}
    </Link>
  )
}