'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, Calculator, Tag, Menu, X, Home, 
  ChevronRight, ArrowRight, ChevronDown, Tv
} from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const pathname = usePathname();

  // Effect to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Navigate to a page and close menu
  const navigateTo = () => {
    setIsMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  // Check if a path is active
  const isActive = (path) => pathname === path;

  // Categories dropdown items
  const categories = [
    { name: "Streaming wideo", path: "/compare?category=streaming" },
    { name: "Streaming muzyczny", path: "/compare?category=music" },
    { name: "Gry", path: "/compare?category=gaming" },
    { name: "Audiobooki", path: "/compare?category=audiobooks" },
    { name: "Sport", path: "/compare?category=sport" }
  ];

  // Main navigation items
  const navItems = [
    {
      name: "Platformy",
      href: "/platform",
      icon: <Tv className="w-5 h-5" />
    },
    {
      name: "Porównywarka",
      href: "/compare",
      icon: <Compass className="w-5 h-5" />
    },
    {
      name: "Kalkulator pakietów",
      href: "/calculator",
      icon: <Calculator className="w-5 h-5" />
    },
    {
      name: "Promocje",
      href: "/promotions",
      icon: <Tag className="w-5 h-5" />
    }
  ];

  return (
    <nav 
      className={`${
        isScrolled 
          ? 'bg-dark-300/80 backdrop-blur-md shadow-lg' 
          : 'bg-dark-300'
      } transition-all duration-300 fixed top-0 left-0 right-0 z-50`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group" onClick={navigateTo}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center transition-all duration-300 group-hover:shadow-glow transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-500">
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
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-light-300 hover:text-white group-hover:bg-dark-100 transition-colors duration-200">
                <span className="mr-1">Kategorie</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-1 w-56 origin-top-right hidden group-hover:block animate-fade-in">
                <div className="glass rounded-xl py-2 shadow-xl shadow-black/10 border border-primary-900/20">
                  {categories.map((category, index) => (
                    <Link 
                      key={index}
                      href={category.path}
                      className="flex items-center px-4 py-2 text-sm text-light-300 hover:text-white hover:bg-primary-500/10 transition-colors duration-150"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100" />
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-white hover:text-primary-400 focus:outline-none p-2 rounded-lg hover:bg-dark-100 transition-colors duration-200"
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-down">
            <Link 
              href="/"
              onClick={navigateTo}
              className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-primary-500/10 text-white font-medium' 
                  : 'text-light-300 hover:text-white hover:bg-dark-100'
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Strona główna</span>
            </Link>
            
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={navigateTo}
                className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                  isActive(item.href) 
                    ? 'bg-primary-500/10 text-white font-medium' 
                    : 'text-light-300 hover:text-white hover:bg-dark-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile Categories Dropdown */}
            <div>
              <button 
                onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'categories' ? null : 'categories')}
                className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-light-300 hover:text-white hover:bg-dark-100 transition-colors duration-200"
              >
                <span className="flex items-center">
                  <Compass className="w-5 h-5 mr-3" />
                  <span>Kategorie</span>
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${activeMobileDropdown === 'categories' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeMobileDropdown === 'categories' && (
                <div className="mt-1 pl-12 pr-4 pb-2 space-y-1 animate-slide-down">
                  {categories.map((category, index) => (
                    <Link 
                      key={index}
                      href={category.path}
                      onClick={navigateTo}
                      className="flex items-center py-2 px-4 rounded-lg text-sm text-light-300 hover:text-white hover:bg-dark-100 transition-colors duration-200"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Component for desktop navigation links
function NavLink({ href, isActive, children }) {
  return (
    <Link 
      href={href} 
      className={`px-3 py-2 rounded-lg transition-all duration-200 relative group ${
        isActive 
          ? 'text-white font-medium' 
          : 'text-light-300 hover:text-white hover:bg-dark-100'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></span>
      )}
    </Link>
  );
}