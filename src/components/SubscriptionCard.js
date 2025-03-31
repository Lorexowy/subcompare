'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Monitor, 
  Server, 
  Download, 
  Tag, 
  Clock, 
  ChevronRight,
  CheckCircle,
  User,
  Award,
  ExternalLink
} from 'lucide-react';

export default function SubscriptionCard({ subscription, featured = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Calculate yearly discount
  const yearlyDiscount = subscription.yearlyDiscount || 0;
  
  // Format price with 2 decimal places
  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',') + ' zł';
  };
  
  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const tiltX = (y - 0.5) * 10; // vertical tilt
    const tiltY = (0.5 - x) * 10; // horizontal tilt
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  // Reset tilt effect when mouse leaves
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-300 ease-out will-change-transform ${
        featured 
          ? 'card-highlight border-2 border-primary-700 transform scale-[1.03] z-10' 
          : 'card-interactive'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-1 -right-12 bg-primary-500 text-white py-1 w-36 text-center text-xs font-semibold transform rotate-45 shadow-md">
          Polecany
        </div>
      )}
      
      {/* Top part with logo and info */}
      <div className="flex items-start gap-4 mb-5">
        <div className={`flex-shrink-0 w-16 h-16 rounded-lg transition-all duration-300 ${
          isHovered ? 'bg-primary-500/20' : 'bg-dark-100'
        } flex items-center justify-center p-3`}>
          {/* Logo placeholder */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 w-full h-full rounded-md flex items-center justify-center">
            <span className="text-lg font-bold text-white">{subscription.provider[0]}</span>
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-white">{subscription.name}</h3>
          <Link 
            href={`/platform/${subscription.id}`}
            className="text-light-400 text-sm flex items-center hover:text-primary-400 transition-colors"
          >
            <User className="w-3 h-3 mr-1" />
            {subscription.provider}
          </Link>
        </div>
        
        {/* Rating */}
        <div className="flex-shrink-0 bg-dark-100 rounded-lg px-2 py-1 flex items-center">
          <Award className="w-4 h-4 text-amber-400 mr-1" />
          <span className="text-amber-400 font-semibold">{subscription.rating.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Pricing info */}
      <div className="mb-5">
        <div className="flex items-baseline mb-1">
          <span className="text-2xl font-bold text-white">{formatPrice(subscription.priceMonthly)}</span>
          <span className="text-light-400 text-sm ml-1">/miesiąc</span>
        </div>
        
        {yearlyDiscount > 0 && (
          <div className="text-sm flex items-center">
            <Tag className="w-4 h-4 text-secondary-400 mr-1" />
            <span className="text-secondary-400">Zaoszczędź {yearlyDiscount}% </span>
            <span className="text-light-400 ml-1">przy subskrypcji rocznej</span>
          </div>
        )}
      </div>
      
      {/* Feature list */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm bg-dark-100 p-3 rounded-lg">
          <Monitor className="w-4 h-4 text-primary-400 mr-3" />
          <span className="text-light-300">
            {subscription.screens} {subscription.screens === 1 ? 'ekran' : subscription.screens < 5 ? 'ekrany' : 'ekranów'}
          </span>
        </div>
        
        <div className="flex items-center text-sm bg-dark-100 p-3 rounded-lg">
          <Server className="w-4 h-4 text-primary-400 mr-3" />
          <span className="text-light-300">Jakość: {subscription.resolution}</span>
        </div>
        
        <div className="flex items-center text-sm bg-dark-100 p-3 rounded-lg">
          <Download className="w-4 h-4 text-primary-400 mr-3" />
          <span className="text-light-300">
            {subscription.offlineViewing ? (
              <span className="flex items-center text-light-300">
                <CheckCircle className="w-4 h-4 text-secondary-400 mr-1" />
                Pobieranie offline
              </span>
            ) : (
              'Brak pobierania offline'
            )}
          </span>
        </div>
        
        {subscription.trialPeriod > 0 && (
          <div className="flex items-center text-sm bg-dark-100 p-3 rounded-lg">
            <Clock className="w-4 h-4 text-primary-400 mr-3" />
            <span className="text-light-300">
              <span className="text-secondary-400 font-medium">{subscription.trialPeriod} dni</span> okresu próbnego
            </span>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/platform/${subscription.id}`}
          className={`block text-center py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
            isHovered 
              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' 
              : 'bg-dark-100 text-light-200 hover:bg-primary-600/20 hover:text-white'
          }`}
        >
          Szczegóły
          <ChevronRight className={`w-5 h-5 ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </Link>
        
        <Link
          href={`/compare?id=${subscription.id}`}
          className="block text-center py-2 px-4 rounded-lg font-semibold bg-dark-100 text-light-200 hover:bg-dark-300 hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          Porównaj
          <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}