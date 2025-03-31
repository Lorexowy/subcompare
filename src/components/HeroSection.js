'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Calculator, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  
  // Gradient animation for heading text
  const gradientTextRef = useRef(null);
  
  // Track element visibility for animation
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  // Gradient animation effect
  useEffect(() => {
    if (!gradientTextRef.current) return;
    
    let degree = 0;
    const interval = setInterval(() => {
      degree = (degree + 1) % 360;
      if (gradientTextRef.current) {
        gradientTextRef.current.style.backgroundImage = `linear-gradient(${degree}deg, #4F46E5, #10B981)`;
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Popular subscription categories
  const categories = [
    { name: "Streaming wideo", path: "/compare?category=streaming" },
    { name: "Streaming muzyczny", path: "/compare?category=music" },
    { name: "Gry", path: "/compare?category=gaming" },
    { name: "Audiobooki", path: "/compare?category=audiobooks" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36 overflow-hidden bg-dark-300"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid bg-noise opacity-20 z-0"></div>
      <div className="absolute top-20 -left-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Porównaj i wybierz{' '}
            <span 
              ref={gradientTextRef}
              className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 transition-all duration-300 inline-block"
            >
              najlepsze subskrypcje
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-70"></span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl mb-10 text-light-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Oszczędzaj czas i pieniądze porównując popularne serwisy streamingowe, muzyczne i gamingowe w jednym miejscu.
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center gap-4 md:gap-6 transition-all duration-700 delay-400 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Link 
              href="/compare" 
              className="btn-primary group flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Porównaj subskrypcje
              <ArrowRight className="w-4 h-4 ml-2 transition-transform transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/calculator" 
              className="btn-secondary group flex items-center justify-center"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Znajdź idealny pakiet
              <ArrowRight className="w-4 h-4 ml-2 transition-transform transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Popular Categories */}
          <div className={`mt-12 transition-all duration-700 delay-600 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-light-400 mb-4">Popularne kategorie:</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.path}
                  className="badge-primary hover:bg-primary-500/30 hover-lift px-4 py-2 rounded-full flex items-center"
                >
                  {category.name}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="hidden md:block">
            <div className="absolute top-1/3 left-10 w-24 h-24 rounded-full border border-primary-500/20 animate-pulse-slow"></div>
            <div className="absolute top-2/3 right-10 w-12 h-12 rounded-full border border-secondary-500/20 animate-pulse-slow"></div>
            <div className="absolute bottom-10 left-1/4 w-8 h-8 rounded-full bg-primary-500/10 animate-floating"></div>
            <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-secondary-500/10 animate-floating" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L48 113.3C96 107 192 93 288 80C384 67 480 53 576 46.7C672 40 768 40 864 53.3C960 67 1056 93 1152 100C1248 107 1344 93 1392 86.7L1440 80V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#171F2F"/>
        </svg>
      </div>
    </section>
  );
}