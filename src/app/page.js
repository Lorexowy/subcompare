export default function Home() {
  // Przykładowe subskrypcje
  const popularSubscriptions = [
    {
      id: 'netflix-standard',
      name: 'Netflix Standard',
      provider: 'Netflix',
      priceMonthly: 43,
      yearlyDiscount: 0,
      screens: 2,
      resolution: 'Full HD',
      offlineViewing: true,
      rating: 4.7
    },
    {
      id: 'disney-plus',
      name: 'Disney+',
      provider: 'Disney',
      priceMonthly: 28.99,
      yearlyDiscount: 17,
      screens: 4,
      resolution: '4K',
      offlineViewing: true,
      rating: 4.6
    },
    {
      id: 'spotify-premium',
      name: 'Spotify Premium',
      provider: 'Spotify',
      priceMonthly: 19.99,
      yearlyDiscount: 17,
      screens: 1,
      resolution: 'N/A',
      offlineViewing: true,
      rating: 4.8
    },
    {
      id: 'hbo-max',
      name: 'HBO Max',
      provider: 'HBO',
      priceMonthly: 29.99,
      yearlyDiscount: 35,
      screens: 3,
      resolution: '4K',
      offlineViewing: true,
      rating: 4.6
    }
  ];

  // Przykładowe promocje
  const highlightedPromotions = [
    {
      id: 1,
      title: "HBO Max 50% taniej przez 3 miesiące",
      provider: "HBO Max",
      description: "Subskrypcja HBO Max w cenie 14,99 zł miesięcznie przez pierwsze 3 miesiące.",
      discount: "50%",
      validUntil: "2025-04-30"
    },
    {
      id: 2,
      title: "3 miesiące Spotify Premium za darmo",
      provider: "Spotify",
      description: "Nowi użytkownicy mogą skorzystać z 3 miesięcy Spotify Premium za darmo.",
      discount: "100%",
      validUntil: "2025-05-15"
    },
    {
      id: 3,
      title: "Amazon Prime 30 dni za darmo",
      provider: "Amazon",
      description: "Miesiąc Amazon Prime za darmo dla nowych użytkowników.",
      discount: "100%",
      validUntil: "2025-12-31"
    }
  ];

  // Przykładowe posty na blogu
  const latestBlogPosts = [
    {
      id: 'netflix-vs-disney-plus',
      title: 'Netflix vs Disney+ - szczegółowe porównanie',
      slug: 'netflix-vs-disney-plus',
      excerpt: 'Zastanawiasz się, która platforma streamingowa będzie lepszym wyborem?',
      author: 'Tomasz Kowalski',
      date: '2025-03-15',
      category: 'Porównania'
    },
    {
      id: 'jak-najtaniej-ogladac-premier-league',
      title: 'Jak najtaniej oglądać mecze Premier League?',
      slug: 'jak-najtaniej-ogladac-premier-league',
      excerpt: 'Porównujemy dostępne w Polsce opcje oglądania meczów angielskiej Premier League.',
      author: 'Mateusz Nowak',
      date: '2025-03-20',
      category: 'Sport'
    },
    {
      id: 'ktory-abonament-muzyczny-offline',
      title: 'Który abonament muzyczny jest najlepszy do słuchania offline?',
      slug: 'ktory-abonament-muzyczny-offline',
      excerpt: 'Porównujemy najpopularniejsze serwisy streamingu muzycznego pod kątem możliwości słuchania offline.',
      author: 'Anna Kowalczyk',
      date: '2025-03-18',
      category: 'Muzyka'
    }
  ];

  // Przykładowe pakiety subskrypcji
  const subscriptionPackages = [
    {
      id: 'budget',
      name: 'Budżetowy',
      description: 'Podstawowe usługi w atrakcyjnej cenie',
      price: 39.98,
      services: [
        {
          name: 'Amazon Prime Video',
          provider: 'Amazon'
        },
        {
          name: 'Empik Go Standard',
          provider: 'Empik'
        }
      ]
    },
    {
      id: 'optimal',
      name: 'Optymalny',
      description: 'Najlepszy stosunek jakości do ceny',
      price: 72.99,
      services: [
        {
          name: 'Netflix Standard',
          provider: 'Netflix'
        },
        {
          name: 'Audioteka Abonament',
          provider: 'Audioteka'
        }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Wszystko czego potrzebujesz w najwyższej jakości',
      price: 113.98,
      services: [
        {
          name: 'Netflix Premium',
          provider: 'Netflix'
        },
        {
          name: 'Disney+',
          provider: 'Disney'
        },
        {
          name: 'Spotify Premium',
          provider: 'Spotify'
        }
      ]
    }
  ];

  // Funkcja formatująca cenę
  const formatPrice = (price) => {
    return price.toFixed(2) + ' zł';
  };

  // Funkcja formatująca datę
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Porównaj i wybierz <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">najlepsze subskrypcje</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Oszczędzaj czas i pieniądze porównując popularne serwisy streamingowe, muzyczne i gamingowe w jednym miejscu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/compare" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-center">
              Porównaj subskrypcje
            </a>
            <a href="/calculator" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-center">
              Znajdź idealny pakiet
            </a>
          </div>
        </div>
      </section>

      {/* Kategorie */}
      <section className="py-12 px-4 md:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Przeszukaj według kategorii</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {[
              { name: "Streaming wideo", icon: "📺", slug: "streaming" },
              { name: "Streaming muzyczny", icon: "🎵", slug: "music" },
              { name: "Gry", icon: "🎮", slug: "gaming" },
              { name: "Audiobooki", icon: "📚", slug: "audiobooks" },
              { name: "Sport", icon: "⚽", slug: "sport" }
            ].map((category, index) => (
              <a 
                key={index} 
                href={`/compare?category=${category.slug}`} 
                className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <span className="font-medium">{category.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popularne subskrypcje */}
      <section className="py-12 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Popularne subskrypcje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {popularSubscriptions.map(subscription => (
              <div key={subscription.id} className="bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-200 hover:scale-[1.01] h-full flex flex-col">
                {/* Logo i nagłówek */}
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-3 p-1">
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                      <span className="text-gray-700 font-bold">{subscription.provider[0]}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{subscription.name}</h3>
                    <p className="text-gray-400 text-sm">{subscription.provider}</p>
                  </div>
                </div>
                
                {/* Cena */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold">{formatPrice(subscription.priceMonthly)}</span>
                    <span className="text-gray-400 text-sm ml-1">/miesiąc</span>
                  </div>
                  
                  {subscription.yearlyDiscount > 0 && (
                    <div className="mt-1 text-sm">
                      <span className="text-green-400">Zaoszczędź {subscription.yearlyDiscount}% </span>
                      <span className="text-gray-400">przy subskrypcji rocznej</span>
                    </div>
                  )}
                </div>
                
                {/* Szczegóły */}
                <div className="flex-grow space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {subscription.screens} {subscription.screens === 1 ? 'ekran' : subscription.screens < 5 ? 'ekrany' : 'ekranów'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>Jakość: {subscription.resolution}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{subscription.offlineViewing ? 'Oglądanie offline' : 'Brak oglądania offline'}</span>
                  </div>
                </div>
                
                {/* Ocena */}
                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill={star <= Math.floor(subscription.rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        className="w-5 h-5 text-yellow-400"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={star <= Math.floor(subscription.rating) ? 0 : 1.5} 
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">{subscription.rating.toFixed(1)}/5</span>
                </div>
                
                {/* Przycisk */}
                <div className="mt-auto">
                  <a
                    href={`/compare?id=${subscription.id}`}
                    className="w-full block text-center py-2 px-4 rounded font-semibold transition-colors duration-200 bg-gray-700 hover:bg-blue-500 text-white"
                  >
                    Szczegóły
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/compare" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
              Zobacz wszystkie subskrypcje
            </a>
          </div>
        </div>
      </section>

      {/* Przykładowe pakiety */}
      <section className="py-12 px-4 md:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Gotowe zestawy subskrypcji</h2>
          <p className="text-gray-300 mb-8 max-w-3xl">
            Sprawdź nasze rekomendowane zestawy subskrypcji dopasowane do różnych potrzeb i budżetów.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {subscriptionPackages.map(pkg => (
              <div key={pkg.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">{pkg.name}</h3>
                <p className="text-gray-400 text-center mb-4">{pkg.description}</p>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">{pkg.price.toFixed(2)} zł</span>
                  <span className="text-gray-400">/miesiąc</span>
                </div>
                
                <div className="flex-grow">
                  <h4 className="font-semibold mb-3">Zawiera:</h4>
                  <ul className="space-y-3">
                    {pkg.services.map((service, index) => (
                      <li key={index} className="flex items-center">
                        <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <span className="text-lg">•</span>
                        </div>
                        <span>{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href={`/calculator?package=${pkg.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 w-full text-center mt-6"
                >
                  Wybierz pakiet
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a href="/calculator" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
              Stwórz własny pakiet
            </a>
          </div>
        </div>
      </section>

      {/* Promocje */}
      <section className="py-12 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Najlepsze promocje</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {highlightedPromotions.map(promotion => (
              <div key={promotion.id} className="bg-gray-800 rounded-lg p-6 shadow-md relative overflow-hidden">
                {/* Badge zniżki */}
                <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-3 rounded-bl-lg font-bold">
                  {promotion.discount}
                </div>
                
                {/* Logo i provider */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-3 p-1">
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                      <span className="text-gray-700 font-bold">{promotion.provider[0]}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{promotion.provider}</span>
                </div>
                
                {/* Tytuł */}
                <h3 className="text-lg font-bold mb-3">{promotion.title}</h3>
                
                {/* Opis */}
                <p className="text-gray-400 text-sm mb-4">
                  {promotion.description}
                </p>
                
                {/* Data ważności */}
                <div className="flex items-center text-sm mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Ważne do: {formatDate(promotion.validUntil)}
                  </span>
                </div>
                
                {/* Przycisk */}
                <a 
                  href={`/promotions#${promotion.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 w-full text-center block"
                >
                  Skorzystaj z promocji
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/promotions" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
              Zobacz wszystkie promocje
            </a>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-12 px-4 md:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Z naszego bloga</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {latestBlogPosts.map(post => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col h-full">
                {/* Obraz */}
                <div className="bg-gray-700 h-48 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl opacity-20">{post.title.charAt(0)}</div>
                  </div>
                </div>
                
                {/* Kategoria i data */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-blue-400 font-medium">{post.category}</span>
                  <span className="text-gray-400">{formatDate(post.date)}</span>
                </div>
                
                {/* Tytuł */}
                <h3 className="font-bold text-lg mb-3">
                  <a href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors duration-200">
                    {post.title}
                  </a>
                </h3>
                
                {/* Zajawka */}
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {post.excerpt}
                </p>
                
                {/* Autor i link */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                      <span className="font-medium text-sm">{post.author.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-gray-400">{post.author}</span>
                  </div>
                  
                  <a href={`/blog/${post.slug}`} className="text-blue-400 text-sm hover:text-blue-300 transition-colors duration-200">
                    Czytaj więcej &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/blog" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
              Przejdź do bloga
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Gotowy, by znaleźć idealne subskrypcje?
          </h2>
          <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
            Porównaj oferty, znajdź promocje i oszczędzaj co miesiąc na swoich ulubionych serwisach.
          </p>
          <a href="/compare" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
            Porównaj teraz
          </a>
        </div>
      </section>
    </div>
  )
}