'use client'

import Link from 'next/link';
import { 
  Mail, 
  Github, 
  Twitter, 
  Facebook, 
  ArrowRight, 
  Heart,
  Globe,
  Tv,
  Music,
  Gamepad2,
  Headphones,
  Trophy
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Navigation categories
  const categories = [
    { name: "Streaming wideo", path: "/compare?category=streaming", icon: <Tv className="w-4 h-4" /> },
    { name: "Streaming muzyczny", path: "/compare?category=music", icon: <Music className="w-4 h-4" /> },
    { name: "Gry", path: "/compare?category=gaming", icon: <Gamepad2 className="w-4 h-4" /> },
    { name: "Audiobooki", path: "/compare?category=audiobooks", icon: <Headphones className="w-4 h-4" /> },
    { name: "Sport", path: "/compare?category=sport", icon: <Trophy className="w-4 h-4" /> },
  ];
  
  // Main navigation links
  const mainLinks = [
    { name: "Porównywarka", path: "/compare" },
    { name: "Kalkulator pakietów", path: "/calculator" },
    { name: "Promocje", path: "/promotions" },
    { name: "Blog", path: "/blog" },
    { name: "O nas", path: "/about" },
  ];
  
  // Legal links
  const legalLinks = [
    { name: "Polityka prywatności", path: "/privacy" },
    { name: "Warunki korzystania", path: "/terms" },
    { name: "Cookies", path: "/cookies" },
  ];

  return (
    <footer className="relative bg-dark-400 pt-16 pb-8 overflow-hidden">
      {/* Background decor */}
      <div className="bg-grid opacity-10 absolute inset-0"></div>
      <div className="absolute top-0 inset-x-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto transform rotate-180">
          <path d="M0 120L48 113.3C96 107 192 93 288 80C384 67 480 53 576 46.7C672 40 768 40 864 53.3C960 67 1056 93 1152 100C1248 107 1344 93 1392 86.7L1440 80V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#171F2F"/>
        </svg>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand and About */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                SubCompare
              </span>
            </div>
            <p className="text-light-400 text-sm mb-6">
              Porównuj oferty subskrypcyjne popularnych serwisów streamingowych, muzycznych, gamingowych i wielu innych w jednym miejscu.
            </p>
            {/* Social links */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-dark-300 flex items-center justify-center text-light-400 hover:text-white hover:bg-primary-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                aria-label="Github"
                className="w-9 h-9 rounded-full bg-dark-300 flex items-center justify-center text-light-400 hover:text-white hover:bg-primary-600 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-dark-300 flex items-center justify-center text-light-400 hover:text-white hover:bg-primary-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-dark-300 flex items-center justify-center text-light-400 hover:text-white hover:bg-primary-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Access */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Szybki dostęp</h3>
            <ul className="space-y-3">
              {mainLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.path} 
                    className="text-light-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Kategorie</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={category.path} 
                    className="text-light-400 hover:text-primary-400 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-6 h-6 mr-2 text-primary-500/70">{category.icon}</span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Bądź na bieżąco</h3>
            <p className="text-light-400 text-sm mb-4">
              Zapisz się do naszego newslettera, aby otrzymywać najnowsze promocje i porównania.
            </p>
            
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Twój adres email" 
                className="input bg-dark-300 border-dark-200"
              />
              <button className="btn-primary">
                Zapisz się
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="divider"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left text-light-500 text-sm mb-4 md:mb-0">
            <p className="flex items-center justify-center md:justify-start">
              © {currentYear} SubCompare. Wszystkie prawa zastrzeżone.
            </p>
            <p className="flex items-center justify-center md:justify-start mt-1">
              Created with <Heart className="w-3 h-3 mx-1 text-red-500" /> by <a href='https://micheldev.pl/' target='_blank' rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors ml-1">www.micheldev.pl</a>
            </p>
          </div>
          
          {/* Legal links */}
          <div className="flex flex-wrap justify-center space-x-4">
            {legalLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className="text-sm text-light-500 hover:text-primary-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a href="#" className="text-sm text-light-500 hover:text-primary-400 transition-colors flex items-center">
              <Globe className="w-3 h-3 mr-1" /> Polski
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}