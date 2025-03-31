'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const gradientTextRef = useRef(null);

  // Efekt animacji gradientu
  useEffect(() => {
    if (!gradientTextRef.current) return;
    
    let degree = 0;
    const interval = setInterval(() => {
      degree = (degree + 1) % 360;
      if (gradientTextRef.current) {
        gradientTextRef.current.style.backgroundImage = `linear-gradient(${degree}deg, #3B82F6, #10B981)`;
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
          Porównaj i wybierz{' '}
          <span 
            ref={gradientTextRef} 
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
          >
            najlepsze subskrypcje
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Oszczędzaj czas i pieniądze porównując popularne serwisy streamingowe, muzyczne i gamingowe w jednym miejscu.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <Link 
            href="/compare" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-center text-lg md:text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Porównaj subskrypcje
          </Link>
          <Link 
            href="/calculator" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-center text-lg md:text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Znajdź idealny pakiet
          </Link>
        </div>
      </div>
    </section>
  )
}