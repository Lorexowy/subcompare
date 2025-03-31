'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Tv, Music, Gamepad2, Headphones, Trophy } from 'lucide-react';

export default function CategoriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Categories with icons and descriptions
  const categories = [
    { 
      name: "Streaming wideo", 
      icon: <Tv className="w-10 h-10" />, 
      slug: "streaming",
      description: "Porównaj platformy VOD oferujące filmy i seriale",
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      name: "Streaming muzyczny", 
      icon: <Music className="w-10 h-10" />, 
      slug: "music",
      description: "Znajdź najlepsze serwisy streamingu muzycznego",
      gradient: "from-pink-500 to-rose-500"
    },
    { 
      name: "Gry", 
      icon: <Gamepad2 className="w-10 h-10" />, 
      slug: "gaming",
      description: "Poznaj subskrypcje pełne gier na różne platformy",
      gradient: "from-green-500 to-emerald-600"
    },
    { 
      name: "Audiobooki", 
      icon: <Headphones className="w-10 h-10" />, 
      slug: "audiobooks",
      description: "Odkryj platformy z audiobookami i e-bookami",
      gradient: "from-orange-500 to-amber-500"
    },
    { 
      name: "Sport", 
      icon: <Trophy className="w-10 h-10" />, 
      slug: "sport",
      description: "Porównaj platformy sportowe z transmisjami na żywo",
      gradient: "from-red-500 to-red-600"
    }
  ];
  
  // Track element visibility for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 bg-dark-200 relative overflow-hidden"
    >
      {/* Background noise and grid */}
      <div className="absolute inset-0 bg-grid bg-noise opacity-10"></div>
      
      {/* Background blobs */}
      <div className="absolute -left-20 top-20 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 bottom-20 w-72 h-72 bg-secondary-600/10 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold font-display mb-4 transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Przeszukaj według 
            <span className="text-primary-400"> kategorii</span>
          </h2>
          <p className={`text-light-400 max-w-2xl mx-auto transition-all duration-700 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Wybierz kategorię, która Cię interesuje i porównaj najlepsze dostępne subskrypcje.
          </p>
        </div>
        
        {/* Categories grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 transition-all duration-1000 delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              category={category}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, delay, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/compare?category=${category.slug}`}
      className={`group transition-all duration-700 delay-${delay} transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`rounded-xl p-0.5 bg-gradient-to-br ${category.gradient} transition-all duration-300 ${
        isHovered ? 'scale-[1.03] shadow-glow' : 'scale-100 shadow-md'
      }`}>
        <div className="bg-dark-200 rounded-[0.65rem] h-full flex flex-col items-center p-6 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid opacity-5"></div>
          
          {/* Icon */}
          <div className={`rounded-full p-4 mb-4 transition-all duration-300 ${
            isHovered 
              ? `bg-gradient-to-br ${category.gradient} text-white scale-110` 
              : 'bg-dark-100 text-light-300'
          }`}>
            {category.icon}
          </div>
          
          {/* Category name */}
          <h3 className="text-xl font-bold text-center mb-2">{category.name}</h3>
          
          {/* Description - hidden on small screens */}
          <p className="text-light-400 text-sm text-center mb-4 hidden sm:block">
            {category.description}
          </p>
          
          {/* Explore button */}
          <div className={`mt-auto flex items-center text-sm font-medium transition-colors duration-300 ${
            isHovered ? `text-gradient-to-r ${category.gradient.replace('from-', '').replace('to-', '')}` : 'text-primary-400'
          }`}>
            <span>Odkryj</span>
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </div>
        </div>
      </div>
    </Link>
  );
}