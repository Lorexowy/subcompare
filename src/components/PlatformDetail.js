'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Users, 
  Monitor, 
  Download, 
  CheckCircle, 
  XCircle, 
  StarIcon, 
  Tag, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'

import FeaturesTable from '../components/FeaturesTable'
import subscriptions from '../data/subscriptions'
import promotions from '../data/promotions'

export default function PlatformDetail({ params }) {
  const [platform, setPlatform] = useState(null)
  const [platformSubscriptions, setPlatformSubscriptions] = useState([])
  const [platformPromotions, setPlatformPromotions] = useState([])
  const [expandedPlan, setExpandedPlan] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Znajdź platformę i powiązane subskrypcje po ID z URL
  useEffect(() => {
    const initializePlatform = async () => {
      // Pobierz params jako obiekt Promise, jeśli jest to konieczne
      const resolvedParams = params ? (params.then ? await params : params) : {};
      
      if (resolvedParams?.id) {
        // Znajdź pierwszą subskrypcję z danym ID
        const foundSub = subscriptions.find(sub => sub.id === resolvedParams.id);
        
        if (foundSub) {
          // Ustaw platformę na podstawie dostawcy pierwszej znalezionej subskrypcji
          setPlatform({
            id: resolvedParams.id,
            name: foundSub.provider,
            description: `${foundSub.provider} to popularna platforma oferująca ${getServiceDescription(foundSub.category)}`,
            category: foundSub.category,
            logo: foundSub.logo || null,
            website: foundSub.link,
            rating: calculateAverageRating(foundSub.provider),
            features: getProviderFeatures(foundSub.provider, foundSub.category),
            yearlyDiscount: foundSub.yearlyDiscount || 0,
          });
          
          // Znajdź wszystkie subskrypcje tego samego dostawcy
          const providerSubs = subscriptions.filter(sub => sub.provider === foundSub.provider);
          setPlatformSubscriptions(providerSubs);
          
          // Znajdź wszystkie promocje dla tego dostawcy
          const providerPromos = promotions.filter(promo => promo.provider === foundSub.provider);
          setPlatformPromotions(providerPromos);
        }
      }
    };
    
    initializePlatform();
  }, [params]);
  
  // Funkcja obliczająca średnią ocenę dla dostawcy
  const calculateAverageRating = (provider) => {
    const providerSubs = subscriptions.filter(sub => sub.provider === provider)
    if (providerSubs.length === 0) return 0
    
    const sum = providerSubs.reduce((total, sub) => total + sub.rating, 0)
    return (sum / providerSubs.length).toFixed(1)
  }
  
  // Funkcja pobierająca opis kategorii serwisu
  const getServiceDescription = (category) => {
    switch(category) {
      case 'streaming':
        return 'treści wideo, w tym filmy, seriale i programy telewizyjne na żądanie.'
      case 'music':
        return 'muzykę, podcasty i treści audio dostępne przez streaming.'
      case 'gaming':
        return 'gry, które można pobierać i streaminwować na różnych urządzeniach.'
      case 'audiobooks':
        return 'audiobooki i e-booki dostępne w ramach abonamentu.'
      case 'sport':
        return 'transmisje sportowe z wydarzeń z całego świata.'
      default:
        return 'różnorodne treści cyfrowe dostępne w ramach abonamentu.'
    }
  }
  
  // Funkcja zwracająca unikalne cechy dostawcy
  const getProviderFeatures = (provider, category) => {
    // Przykładowe unikalne cechy dla różnych dostawców
    // W przypadku prawdziwego produktu należałoby uzupełnić te dane
    
    const featuresMap = {
      'Netflix': [
        { title: 'Oryginalne produkcje', description: 'Dostęp do setek oryginalnych seriali, filmów i dokumentów.' },
        { title: 'Pobieranie na urządzenia mobilne', description: 'Możliwość pobierania treści do oglądania offline.' },
        { title: 'Profile dla dzieci', description: 'Bezpieczne profile z treściami odpowiednimi dla dzieci.' },
        { title: 'Brak reklam', description: 'Oglądanie bez przerw na reklamy.' },
      ],
      'Disney': [
        { title: 'Treści Disney, Marvel i Star Wars', description: 'Ekskluzywny dostęp do treści Disney, Marvel, Star Wars i National Geographic.' },
        { title: 'Nowości i klasyki', description: 'Dostęp zarówno do najnowszych filmów, jak i klasycznych produkcji.' },
        { title: 'Bezpieczne dla dzieci', description: 'Możliwość tworzenia profili dziecięcych z ograniczonym dostępem do treści.' },
        { title: 'Streamowanie w 4K', description: 'Wysoka jakość obrazu dla wybranych treści.' },
      ],
      'HBO': [
        { title: 'Produkcje HBO', description: 'Dostęp do nagradzanych seriali i filmów produkcji HBO.' },
        { title: 'Premiery kinowe', description: 'Wczesny dostęp do filmów kinowych Warner Bros.' },
        { title: 'Wysoka jakość', description: 'Treści w jakości 4K i z dźwiękiem Dolby Atmos.' },
        { title: 'Różnorodne gatunki', description: 'Od dramatów, przez komedie, po dokumenty i programy rozrywkowe.' },
      ],
      'Spotify': [
        { title: 'Ogromna biblioteka muzyczna', description: 'Dostęp do ponad 70 milionów utworów i 2,6 miliona podcastów.' },
        { title: 'Personalizowane playlisty', description: 'Automatycznie generowane playlisty dostosowane do Twoich preferencji.' },
        { title: 'Podcasty i audiobajki', description: 'Rozbudowana biblioteka podcastów i treści dla dzieci.' },
        { title: 'Tryb offline', description: 'Możliwość pobierania muzyki do słuchania bez dostępu do internetu.' },
      ],
      'TIDAL': [
        { title: 'Jakość HiFi', description: 'Streaming muzyki w jakości bezstratnej FLAC (1411 kbps).' },
        { title: 'Master Quality', description: 'Wybrane utwory w jakości studyjnej MQA.' },
        { title: 'Ekskluzywne treści', description: 'Koncerty, wywiady i teledyski dostępne tylko w TIDAL.' },
        { title: 'Wsparcie dla artystów', description: 'Lepszy model wynagradzania artystów niż w innych serwisach.' },
      ],
      'Amazon': [
        { title: 'Korzyści Prime', description: 'Dostęp do Prime Video, darmowej dostawy, Prime Gaming i więcej.' },
        { title: 'Wideo + zakupy', description: 'Integracja platformy wideo z zakupami online.' },
        { title: 'X-Ray', description: 'Dostęp do informacji o aktorach i muzyce podczas oglądania.' },
        { title: 'Wsparcie dla HDR i 4K', description: 'Wysoka jakość obrazu dla wybranych treści.' },
      ],
      'Microsoft': [
        { title: 'Ogromna biblioteka gier', description: 'Setki gier na konsole Xbox i PC.' },
        { title: 'Gry premierowe w dniu wydania', description: 'Dostęp do nowych gier Xbox Game Studios w dniu premiery.' },
        { title: 'Cloud gaming', description: 'Możliwość grania na różnych urządzeniach przez chmurę.' },
        { title: 'Rabaty i oferty specjalne', description: 'Zniżki na zakup gier i dodatkowej zawartości.' },
      ],
      'Electronic Arts': [
        { title: 'Biblioteka gier EA', description: 'Dostęp do popularnych tytułów od Electronic Arts.' },
        { title: 'Wczesny dostęp', description: 'Możliwość grania w nowe gry przed oficjalną premierą.' },
        { title: 'Rabaty dla członków', description: 'Zniżki na zakupy w sklepie EA.' },
        { title: 'Zawartość premium', description: 'Eksklyzywna zawartość dostępna tylko dla subskrybentów.' },
      ],
      'Audioteka': [
        { title: 'Polskie produkcje audio', description: 'Bogata kolekcja polskich audiobooków i słuchowisk.' },
        { title: 'Produkcje własne', description: 'Oryginalne słuchowiska i audiobooki produkowane przez Audiotekę.' },
        { title: 'Tryb offline', description: 'Możliwość pobierania audiobooków do słuchania bez internetu.' },
        { title: 'Synchronizacja między urządzeniami', description: 'Kontynuuj słuchanie od tego samego momentu na różnych urządzeniach.' },
      ],
      'Empik': [
        { title: 'Audiobooki i e-booki', description: 'Dostęp zarówno do treści audio, jak i książek elektronicznych.' },
        { title: 'Polska literatura', description: 'Bogaty wybór polskich autorów i tłumaczeń.' },
        { title: 'Nowości wydawnicze', description: 'Regularnie aktualizowana oferta o najnowsze tytuły.' },
        { title: 'Integracja z Empik Go', description: 'Dostęp do zakupionych książek w aplikacji Empik Go.' },
      ],
      'CANAL+': [
        { title: 'Transmisje sportowe', description: 'Bogata oferta transmisji z najważniejszych wydarzeń sportowych.' },
        { title: 'Kanały na żywo', description: 'Dostęp do kanałów CANAL+ na żywo.' },
        { title: 'Filmy i seriale na żądanie', description: 'Biblioteka VOD z filmami i serialami.' },
        { title: 'Produkcje oryginalne', description: 'Oryginalne filmy i seriale produkowane przez CANAL+.' },
      ],
      'Eleven Sports': [
        { title: 'Sport na żywo', description: 'Transmisje z najważniejszych lig piłkarskich i innych dyscyplin sportowych.' },
        { title: 'Ekskluzywne prawa', description: 'Wyłączne prawa do transmisji wybranych rozgrywek.' },
        { title: 'Materiały dodatkowe', description: 'Analizy, wywiady i programy sportowe.' },
        { title: 'Multi-device', description: 'Dostęp na różnych urządzeniach.' },
      ],
      'Viaplay': [
        { title: 'Premier League', description: 'Transmisje wszystkich meczów angielskiej Premier League.' },
        { title: 'KSW', description: 'Wyłączne prawa do transmisji gal KSW.' },
        { title: 'Biblioteka filmów i seriali', description: 'Dostęp do treści VOD poza transmisjami sportowymi.' },
        { title: 'Platformy streamingowe', description: 'Dostęp na różnych urządzeniach i smart TV.' },
      ],
    }
    
    // Domyślne funkcje dla kategorii, jeśli nie znaleziono konkretnego dostawcy
    const defaultFeatures = {
      'streaming': [
        { title: 'Filmy i seriale', description: 'Bogata biblioteka filmów i seriali dostępnych na żądanie.' },
        { title: 'Wiele urządzeń', description: 'Możliwość oglądania na różnych urządzeniach.' },
        { title: 'Personalizowane rekomendacje', description: 'Sugestie treści dopasowane do Twoich preferencji.' },
        { title: 'Treści dla całej rodziny', description: 'Różnorodne treści dla widzów w każdym wieku.' },
      ],
      'music': [
        { title: 'Miliony utworów', description: 'Dostęp do ogromnej biblioteki muzycznej.' },
        { title: 'Spersonalizowane playlisty', description: 'Playlisty dostosowane do Twoich upodobań muzycznych.' },
        { title: 'Podcasty', description: 'Dostęp do podcastów i audycji.' },
        { title: 'Tryb offline', description: 'Możliwość pobierania muzyki do słuchania bez internetu.' },
      ],
      'gaming': [
        { title: 'Biblioteka gier', description: 'Dostęp do wielu gier w ramach abonamentu.' },
        { title: 'Gry premierowe', description: 'Dostęp do wybranych nowych gier w dniu premiery.' },
        { title: 'Różne platformy', description: 'Możliwość grania na różnych urządzeniach.' },
        { title: 'Rabaty i oferty', description: 'Zniżki dla subskrybentów.' },
      ],
      'audiobooks': [
        { title: 'Audiobooki i e-booki', description: 'Bogata biblioteka książek audio i elektronicznych.' },
        { title: 'Nowości wydawnicze', description: 'Dostęp do najnowszych tytułów.' },
        { title: 'Słuchanie offline', description: 'Możliwość pobierania treści do słuchania offline.' },
        { title: 'Synchronizacja', description: 'Synchronizacja postępu między urządzeniami.' },
      ],
      'sport': [
        { title: 'Transmisje na żywo', description: 'Transmisje z wydarzeń sportowych na żywo.' },
        { title: 'Wiele dyscyplin', description: 'Dostęp do różnych dyscyplin sportowych.' },
        { title: 'Analizy i powtórki', description: 'Materiały dodatkowe i analizy ekspertów.' },
        { title: 'Oglądanie na różnych urządzeniach', description: 'Dostęp na różnych platformach.' },
      ],
    }
    
    return featuresMap[provider] || defaultFeatures[category] || []
  }
  
  // Funkcja zwracająca opis oferty dla różnych typów platform
  const getCategoryDescription = (category) => {
    const descriptions = {
      'streaming': 'Platforma streamingowa oferująca dostęp do filmów, seriali i programów telewizyjnych na żądanie. Dzięki subskrypcji możesz oglądać treści kiedy chcesz, na wybranym urządzeniu, bez reklam i ograniczeń czasowych.',
      'music': 'Platforma streamingu muzycznego dająca dostęp do milionów utworów, playlist i podcastów. Możesz słuchać muzyki online lub pobierać ją do trybu offline, odkrywać nowych artystów i tworzyć własne kolekcje.',
      'gaming': 'Platforma gamingowa z biblioteką gier dostępnych w ramach subskrypcji. Zamiast kupować każdą grę osobno, uzyskujesz dostęp do setek tytułów, które możesz instalować i w które możesz grać bez dodatkowych opłat.',
      'audiobooks': 'Platforma z audiobookami i e-bookami dostępnymi w ramach miesięcznego abonamentu. Dzięki subskrypcji możesz słuchać i czytać nieograniczoną liczbę książek, oszczędzając znacznie w porównaniu do zakupu pojedynczych tytułów.',
      'sport': 'Platforma oferująca transmisje sportowe na żywo oraz dostęp do materiałów archiwalnych i analiz. Dzięki subskrypcji możesz oglądać wydarzenia sportowe z różnych dyscyplin bez konieczności wykupowania tradycyjnej telewizji.',
    }
    
    return descriptions[category] || descriptions['streaming']
  }
  
  // Formatowanie ceny
  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',') + ' zł'
  }
  
  // Funkcja renderująca ikonę Tak/Nie
  const renderBoolean = (value) => {
    if (value === true) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    } else {
      return <XCircle className="w-5 h-5 text-red-400" />
    }
  }
  
  // Funkcja zwracająca opis typu subskrypcji
  const getPlanDescription = (sub) => {
    if (sub.name.toLowerCase().includes('premium') || sub.name.toLowerCase().includes('family') || sub.name.toLowerCase().includes('plus')) {
      return 'Plan premium z pełnym dostępem do wszystkich funkcji i najwyższą jakością.'
    } else if (sub.name.toLowerCase().includes('standard')) {
      return 'Standardowa subskrypcja dla większości użytkowników oferująca dobry balans funkcji i ceny.'
    } else if (sub.name.toLowerCase().includes('basic') || sub.name.toLowerCase().includes('individual')) {
      return 'Podstawowa subskrypcja w przystępnej cenie dla indywidualnych użytkowników.'
    } else if (sub.name.toLowerCase().includes('duo')) {
      return 'Plan dla dwóch osób mieszkających pod tym samym adresem.'
    } else {
      return 'Subskrypcja oferująca dostęp do treści na wybranych urządzeniach.'
    }
  }
  
  // Funkcja generująca ocenę w gwiazdkach
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {hasHalfStar && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  // Jeśli platformy nie znaleziono, zwracamy null
  if (!platform) {
    return null // Komponent na poziomie strony obsłuży przekierowanie do notFound()
  }

  return (
    <div className="min-h-screen bg-dark-300">
      {/* Nagłówek platformy */}
      <section className="bg-dark-200 py-16 relative overflow-hidden">
        {/* Tło z gradientem i efektami */}
        <div className="absolute inset-0 bg-grid bg-noise opacity-10 z-0"></div>
        <div className="absolute -left-20 top-20 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 bottom-20 w-72 h-72 bg-secondary-600/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Logo platformy */}
            <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-2xl bg-dark-100 flex items-center justify-center p-4 shadow-lg">
              {platform.logo ? (
                <Image 
                  src={platform.logo}
                  alt={platform.name}
                  width={160}
                  height={160}
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-primary-500/40 rounded-xl flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">{platform.name[0]}</span>
                </div>
              )}
            </div>
            
            {/* Informacje o platformie */}
            <div className="flex-grow text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{platform.name}</h1>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4">
                <span className="badge-primary">{platform.category === 'streaming' ? 'Streaming wideo' : 
                  platform.category === 'music' ? 'Streaming muzyczny' : 
                  platform.category === 'gaming' ? 'Gry' : 
                  platform.category === 'audiobooks' ? 'Audiobooki' : 
                  platform.category === 'sport' ? 'Sport' : 'Inne'}</span>
                
                <div className="flex items-center space-x-1 badge-secondary">
                  <span className="font-semibold">{platform.rating}</span>
                  <span>/5</span>
                  <span className="ml-1">★</span>
                </div>
                
                {platform.yearlyDiscount > 0 && (
                  <div className="badge-amber">
                    <Tag className="w-3 h-3 mr-1" />
                    <span>Do {platform.yearlyDiscount}% taniej rocznie</span>
                  </div>
                )}
              </div>
              
              <p className="text-light-300 max-w-3xl mb-6">
                {platform.description}
              </p>
              
              {/* Przyciski akcji */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a 
                  href={platform.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary flex items-center"
                >
                  Odwiedź stronę
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                
                <Link 
                  href={`/compare?category=${platform.category}`}
                  className="btn-secondary flex items-center"
                >
                  Porównaj z innymi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nawigacja zakładek */}
      <section className="sticky top-16 z-30 bg-dark-100 border-b border-dark-200 shadow-md">
        <div className="container-custom">
          <div className="flex overflow-x-auto py-2 gap-2">
            <button 
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'overview' ? 'bg-primary-500 text-white' : 'text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Przegląd
            </button>
            
            <button 
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'plans' ? 'bg-primary-500 text-white' : 'text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setActiveTab('plans')}
            >
              Plany i ceny
            </button>
            
            <button 
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'features' ? 'bg-primary-500 text-white' : 'text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setActiveTab('features')}
            >
              Funkcje i możliwości
            </button>
            
            <button 
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'promotions' ? 'bg-primary-500 text-white' : 'text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setActiveTab('promotions')}
            >
              Promocje
              {platformPromotions.length > 0 && (
                <span className="ml-2 bg-secondary-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {platformPromotions.length}
                </span>
              )}
            </button>
            
            <button 
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'reviews' ? 'bg-primary-500 text-white' : 'text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Oceny i opinie
            </button>
          </div>
        </div>
      </section>
      
      {/* Zawartość zakładek */}
      <section className="py-12 bg-dark-300">
        <div className="container-custom">
          {/* Przegląd */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* O platformie */}
              <div>
                <h2 className="heading-lg mb-6">O platformie {platform.name}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <p className="text-light-300 mb-6">
                      {getCategoryDescription(platform.category)}
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="heading-sm">Co wyróżnia {platform.name}?</h3>
                      <ul className="space-y-2 text-light-300">
                        {platform.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-secondary-500 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium text-white">{feature.title}</span>
                              <span className="text-light-300"> - {feature.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Karta z podsumowaniem */}
                  <div className="card">
                    <h3 className="heading-sm mb-4">Podsumowanie</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-light-400 mb-1">Ocena użytkowników</div>
                        <div className="flex items-center">
                          {renderStars(parseFloat(platform.rating))}
                          <span className="ml-2 font-semibold">{platform.rating}/5</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-light-400 mb-1">Kategoria</div>
                        <div className="font-medium">{
                          platform.category === 'streaming' ? 'Streaming wideo' : 
                          platform.category === 'music' ? 'Streaming muzyczny' : 
                          platform.category === 'gaming' ? 'Gry' : 
                          platform.category === 'audiobooks' ? 'Audiobooki' : 
                          platform.category === 'sport' ? 'Sport' : 'Inne'
                        }</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-light-400 mb-1">Ceny od</div>
                        <div className="font-medium">{
                          formatPrice(Math.min(...platformSubscriptions.map(sub => sub.priceMonthly)))
                        } / miesiąc</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-light-400 mb-1">Okres próbny</div>
                        <div className="font-medium">{
                          Math.max(...platformSubscriptions.map(sub => sub.trialPeriod || 0)) > 0 
                            ? `Do ${Math.max(...platformSubscriptions.map(sub => sub.trialPeriod || 0))} dni` 
                            : 'Brak'
                        }</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-light-400 mb-1">Dostępność</div>
                        <div className="font-medium">Web, mobile, smart TV</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Plany subskrypcji (wersja skrócona) */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-lg">Dostępne plany</h2>
                  <button 
                    onClick={() => setActiveTab('plans')}
                    className="btn-text flex items-center"
                  >
                    Zobacz wszystkie plany
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platformSubscriptions.slice(0, 3).map((subscription) => (
                    <div key={subscription.id} className="card">
                      <h3 className="text-xl font-bold mb-2">{subscription.name}</h3>
                      <p className="text-light-300 text-sm mb-4">{getPlanDescription(subscription)}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold">{formatPrice(subscription.priceMonthly)}</span>
                          <span className="text-light-300 text-sm ml-1">/miesiąc</span>
                        </div>
                        
                        {subscription.yearlyDiscount > 0 && (
                          <div className="text-sm text-secondary-400 mt-1 flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            Zaoszczędź {subscription.yearlyDiscount}% przy płatności rocznej
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-light-300">Liczba ekranów</span>
                          <span className="font-medium">{subscription.screens}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-light-300">Jakość</span>
                          <span className="font-medium">{subscription.resolution}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-light-300">Oglądanie offline</span>
                          <div>{renderBoolean(subscription.offlineViewing)}</div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-light-300">Bez reklam</span>
                          <div>{renderBoolean(subscription.adsFree)}</div>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/compare?id=${subscription.id}`}
                        className="btn-primary w-full text-center"
                      >
                        Więcej szczegółów
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Najnowsze promocje (wersja skrócona) */}
              {platformPromotions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-lg">Aktualne promocje</h2>
                    <button 
                      onClick={() => setActiveTab('promotions')}
                      className="btn-text flex items-center"
                    >
                      Zobacz wszystkie promocje
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {platformPromotions.slice(0, 2).map((promotion) => (
                      <div key={promotion.id} className="card relative overflow-hidden">
                        {/* Badge zniżki */}
                        <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg font-bold">
                          {promotion.discount}
                        </div>
                        
                        {/* Tytuł promocji */}
                        <h3 className="text-lg font-bold mb-3">{promotion.title}</h3>
                        
                        {/* Opis */}
                        <p className="text-light-300 text-sm mb-4">
                          {promotion.description}
                        </p>
                        
                        {/* Data ważności */}
                        <div className="flex items-center text-sm mb-4 text-light-300">
                          <Calendar className="w-5 h-5 mr-2" />
                          <span>
                            Ważne do: {new Date(promotion.validUntil).toLocaleDateString('pl-PL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        {/* Przycisk */}
                        <a 
                          href={promotion.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-primary w-full text-center"
                        >
                          Skorzystaj z promocji
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Plany i ceny */}
          {activeTab === 'plans' && (
            <div>
              <h2 className="heading-lg mb-6">Plany i ceny</h2>
              
              {platformSubscriptions.length > 0 ? (
                <div className="space-y-6">
                  {platformSubscriptions.map((subscription) => (
                    <div key={subscription.id} className="card border border-dark-100">
                      <div onClick={() => setExpandedPlan(expandedPlan === subscription.id ? null : subscription.id)}
                          className="flex flex-col lg:flex-row lg:items-center justify-between cursor-pointer">
                        {/* Nazwa i opis planu */}
                        <div className="lg:w-1/3 mb-4 lg:mb-0">
                          <h3 className="text-xl font-bold">{subscription.name}</h3>
                          <p className="text-light-300 text-sm">{getPlanDescription(subscription)}</p>
                        </div>
                        
                        {/* Cena */}
                        <div className="lg:w-1/4 mb-4 lg:mb-0">
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold">{formatPrice(subscription.priceMonthly)}</span>
                            <span className="text-light-300 text-sm ml-1">/miesiąc</span>
                          </div>
                          
                          {subscription.yearlyDiscount > 0 && (
                            <div className="text-sm text-secondary-400 mt-1 flex items-center">
                              <Tag className="w-3 h-3 mr-1" />
                              Zaoszczędź {subscription.yearlyDiscount}% przy płatności rocznej
                            </div>
                          )}
                        </div>
                        
                        {/* Główne cechy */}
                        <div className="lg:w-1/3 grid grid-cols-2 gap-y-2 mb-4 lg:mb-0">
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 text-primary-400 mr-2" />
                            <span>{subscription.screens} {subscription.screens === 1 ? 'ekran' : 
                                subscription.screens < 5 ? 'ekrany' : 'ekranów'}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Monitor className="w-4 h-4 text-primary-400 mr-2" />
                            <span>{subscription.resolution}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Download className="w-4 h-4 text-primary-400 mr-2" />
                            <span>{subscription.offlineViewing ? 'Offline' : 'Brak offline'}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <ShieldCheck className="w-4 h-4 text-primary-400 mr-2" />
                            <span>{subscription.adsFree ? 'Bez reklam' : 'Z reklamami'}</span>
                          </div>
                        </div>
                        
                        {/* Ikona rozwijania */}
                        <div className="flex justify-end items-center">
                          {expandedPlan === subscription.id ? (
                            <ChevronUp className="w-6 h-6 text-primary-400" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-primary-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* Rozwinięte szczegóły */}
                      {expandedPlan === subscription.id && (
                        <div className="mt-6 pt-6 border-t border-dark-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Szczegóły planu */}
                          <div>
                            <h4 className="text-lg font-medium mb-3">Szczegóły planu</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm py-2 border-b border-dark-100">
                                <span className="text-light-300">Miesięczna cena</span>
                                <span className="font-medium">{formatPrice(subscription.priceMonthly)}</span>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm py-2 border-b border-dark-100">
                                <span className="text-light-300">Roczna cena</span>
                                <span className="font-medium">
                                  {subscription.priceYearly 
                                    ? formatPrice(subscription.priceYearly) 
                                    : formatPrice(subscription.priceMonthly * 12)}
                                  {subscription.yearlyDiscount > 0 && (
                                    <span className="text-secondary-400 ml-2">(-{subscription.yearlyDiscount}%)</span>
                                  )}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm py-2 border-b border-dark-100">
                                <span className="text-light-300">Okres próbny</span>
                                <span className="font-medium">
                                  {subscription.trialPeriod > 0 
                                    ? `${subscription.trialPeriod} dni` 
                                    : 'Brak'}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm py-2 border-b border-dark-100">
                                <span className="text-light-300">Liczba ekranów</span>
                                <span className="font-medium">{subscription.screens}</span>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm py-2 border-b border-dark-100">
                                <span className="text-light-300">Jakość obrazu/dźwięku</span>
                                <span className="font-medium">{subscription.resolution}</span>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm py-2 border-b border-dark-100">
                                <span className="text-light-300">Oglądanie offline</span>
                                <div>{renderBoolean(subscription.offlineViewing)}</div>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm py-2 border-b border-dark-100">
                                <span className="text-light-300">Bez reklam</span>
                                <div>{renderBoolean(subscription.adsFree)}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Dodatkowe funkcje */}
                          <div>
                            <h4 className="text-lg font-medium mb-3">Co zawiera ten plan?</h4>
                            
                            <ul className="space-y-3">
                              {subscription.features && subscription.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-secondary-500 mr-2 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-medium text-white">{feature.name}</span>
                                    <span className="text-light-300 block text-sm">{feature.value}</span>
                                  </div>
                                </li>
                              ))}
                              
                              {subscription.tags && subscription.tags.length > 0 && (
                                <li className="mt-4">
                                  <div className="text-sm text-light-400 mb-2">Dostępne kategorie:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {subscription.tags.map((tag, index) => (
                                      <span key={index} className="badge-primary text-xs">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </li>
                              )}
                            </ul>
                            
                            <div className="mt-6 flex justify-end">
                              <Link 
                                href={`/compare?id=${subscription.id}`}
                                className="btn-primary"
                              >
                                Porównaj z innymi
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-dark-200 rounded-lg">
                  <p className="text-xl text-light-300">
                    Brak dostępnych planów dla tej platformy.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Funkcje i możliwości */}
          {activeTab === 'features' && (
            <div>
              <h2 className="heading-lg mb-6">Funkcje i możliwości</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {platform.features.map((feature, index) => (
                  <div key={index} className="card">
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-light-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Dodatkowe informacje o funkcjach */}
              <div className="mt-12">
                <h3 className="heading-md mb-6">Dostępne funkcje w różnych planach</h3>
                
                {/* Używamy nowego komponentu FeaturesTable */}
                <FeaturesTable subscriptions={platformSubscriptions} />
                </div>
            </div>
          )}
          
          {/* Promocje */}
          {activeTab === 'promotions' && (
            <div>
              <h2 className="heading-lg mb-6">Promocje dla {platform.name}</h2>
              
              {platformPromotions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platformPromotions.map((promotion) => (
                    <div key={promotion.id} className="card relative overflow-hidden">
                      {/* Badge zniżki */}
                      <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg font-bold">
                        {promotion.discount}
                      </div>
                      
                      {/* Tytuł */}
                      <h3 className="text-lg font-bold mb-3">{promotion.title}</h3>
                      
                      {/* Opis */}
                      <p className="text-light-300 text-sm mb-4">
                        {promotion.description}
                      </p>
                      
                      {/* Data ważności */}
                      <div className="flex items-center text-sm mb-4 text-light-300">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>
                          Ważne do: {new Date(promotion.validUntil).toLocaleDateString('pl-PL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {/* Kod promocyjny */}
                      {promotion.code && (
                        <div className="mb-4">
                          <div className="text-sm mb-1 text-light-300">Kod promocyjny:</div>
                          <div className="bg-dark-300 border border-dark-100 rounded p-2 flex justify-between items-center cursor-pointer">
                            <span className="font-mono font-medium">{promotion.code}</span>
                            <button className="text-primary hover:text-primary-dark">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Przycisk */}
                      <a 
                        href={promotion.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary w-full text-center"
                      >
                        Skorzystaj z promocji
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-dark-200 rounded-lg">
                  <p className="text-xl text-light-300 mb-4">
                    Obecnie nie ma dostępnych promocji dla {platform.name}.
                  </p>
                  <p className="text-light-300">
                    Sprawdź później lub przejrzyj inne platformy, aby znaleźć aktualne promocje.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Oceny i opinie */}
          {activeTab === 'reviews' && (
            <div>
              <h2 className="heading-lg mb-6">Oceny i opinie</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Podsumowanie ocen */}
                <div className="card">
                  <h3 className="heading-sm mb-4">Podsumowanie ocen</h3>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-6xl font-bold mr-4">{platform.rating}</div>
                    <div>
                      <div className="mb-2">{renderStars(parseFloat(platform.rating))}</div>
                      <div className="text-sm text-light-300">Średnia ocena</div>
                    </div>
                  </div>
                  
                  {/* Pasek ocen (przykładowy) */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-8 text-right mr-2">5★</div>
                      <div className="flex-grow bg-dark-300 rounded-full h-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: '70%' }}></div>
                      </div>
                      <div className="w-8 text-right ml-2 text-sm">70%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 text-right mr-2">4★</div>
                      <div className="flex-grow bg-dark-300 rounded-full h-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-green-400" style={{ width: '20%' }}></div>
                      </div>
                      <div className="w-8 text-right ml-2 text-sm">20%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 text-right mr-2">3★</div>
                      <div className="flex-grow bg-dark-300 rounded-full h-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-yellow-500" style={{ width: '7%' }}></div>
                      </div>
                      <div className="w-8 text-right ml-2 text-sm">7%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 text-right mr-2">2★</div>
                      <div className="flex-grow bg-dark-300 rounded-full h-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-orange-500" style={{ width: '2%' }}></div>
                      </div>
                      <div className="w-8 text-right ml-2 text-sm">2%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 text-right mr-2">1★</div>
                      <div className="flex-grow bg-dark-300 rounded-full h-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: '1%' }}></div>
                      </div>
                      <div className="w-8 text-right ml-2 text-sm">1%</div>
                    </div>
                  </div>
                </div>
                
                {/* Opinie użytkowników (przykładowe) */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <div className="card">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">Karol M.</h4>
                        <div className="flex">
                          {renderStars(5)}
                        </div>
                      </div>
                      <p className="text-light-300 text-sm mb-1">
                        "Korzystam od ponad roku i jestem bardzo zadowolony. Szeroki wybór treści, dobra jakość i przystępna cena."
                      </p>
                      <p className="text-light-400 text-xs">Dodano: 12 marca 2025</p>
                    </div>
                    
                    <div className="card">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">Anna W.</h4>
                        <div className="flex">
                          {renderStars(4)}
                        </div>
                      </div>
                      <p className="text-light-300 text-sm mb-1">
                        "Bardzo dobra platforma, choć czasem brakuje mi najnowszych tytułów. Interfejs jest intuicyjny, a jakość streamingu doskonała."
                      </p>
                      <p className="text-light-400 text-xs">Dodano: 28 lutego 2025</p>
                    </div>
                    
                    <div className="card">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">Piotr K.</h4>
                        <div className="flex">
                          {renderStars(4.5)}
                        </div>
                      </div>
                      <p className="text-light-300 text-sm mb-1">
                        "Polecam wszystkim, którzy szukają dobrego stosunku jakości do ceny. Oferta jest regularnie aktualizowana, a aplikacja działa płynnie na wszystkich urządzeniach."
                      </p>
                      <p className="text-light-400 text-xs">Dodano: 15 lutego 2025</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-light-300 mb-4">
                      Recenzje są generowane na podstawie opinii użytkowników z różnych źródeł internetowych.
                    </p>
                    <button className="btn-primary">
                      Pokaż więcej recenzji
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Porównywarka (stała na dole każdej zakładki) */}
          <div className="mt-16 bg-dark-100 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Porównaj z innymi serwisami</h3>
            <p className="text-light-300 mb-6 max-w-2xl mx-auto">
              Nie jesteś pewien, czy ta platforma jest dla Ciebie odpowiednia? Porównaj ją z innymi serwisami, aby znaleźć najlepszą ofertę.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/compare?id=${platform.id}`} className="btn-primary">
                Porównaj z innymi platformami
              </Link>
              <Link href="/calculator" className="btn-secondary">
                Znajdź idealny pakiet
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}