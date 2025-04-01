'use client'

import { 
  Tv, 
  Music, 
  Gamepad2, 
  Headphones, 
  Trophy 
} from 'lucide-react';

export default function CategoryIcon({ category, size = 'md', className = '' }) {
  // Określenie rozmiaru ikony
  const sizeClass = {
    'sm': 'w-4 h-4',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-10 h-10'
  }[size] || 'w-6 h-6';
  
  // Określenie koloru ikony dla kategorii
  const colorClass = {
    'streaming': 'text-blue-400',
    'music': 'text-pink-400',
    'gaming': 'text-green-400',
    'audiobooks': 'text-amber-400',
    'sport': 'text-red-400'
  }[category] || 'text-blue-400';
  
  // Renderowanie odpowiedniej ikony
  const renderIcon = () => {
    switch(category) {
      case 'streaming':
        return <Tv className={`${sizeClass} ${colorClass} ${className}`} />;
      case 'music':
        return <Music className={`${sizeClass} ${colorClass} ${className}`} />;
      case 'gaming':
        return <Gamepad2 className={`${sizeClass} ${colorClass} ${className}`} />;
      case 'audiobooks':
        return <Headphones className={`${sizeClass} ${colorClass} ${className}`} />;
      case 'sport':
        return <Trophy className={`${sizeClass} ${colorClass} ${className}`} />;
      default:
        return <Tv className={`${sizeClass} ${colorClass} ${className}`} />;
    }
  };
  
  return renderIcon();
}

// Funkcja pomocnicza do uzyskania nazwy kategorii po polsku
export function getCategoryName(category) {
  const categoryNames = {
    'streaming': 'Streaming wideo',
    'music': 'Streaming muzyczny',
    'gaming': 'Gry',
    'audiobooks': 'Audiobooki',
    'sport': 'Sport'
  };
  
  return categoryNames[category] || category;
}