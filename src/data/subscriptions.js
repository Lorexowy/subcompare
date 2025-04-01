const subscriptions = [
  // ===== STREAMING WIDEO (Filmy i seriale) =====
  {
    id: 'netflix-basic',
    name: 'Netflix Basic',
    provider: 'Netflix',
    category: 'streaming',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12, // ~359.88 PLN rocznie
    yearlyDiscount: 0,
    screens: 1,
    resolution: 'HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 0,
    languages: ['Polski', 'Angielski', 'i 10+ innych'],
    logo: '/images/logos/netflix.png',
    description: 'Dostęp do filmów i seriali Netflix na jednym ekranie w jakości HD.',
    link: 'https://www.netflix.com',
    rating: 4.5,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: 'HD (1080p)' },
      { name: 'Dźwięk', value: 'Stereo' },
      { name: 'Jednoczesne odtwarzanie', value: '1 ekran' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'netflix-standard',
    name: 'Netflix Standard',
    provider: 'Netflix',
    category: 'streaming',
    priceMonthly: 43.99,
    priceYearly: 43.99 * 12,
    yearlyDiscount: 0,
    screens: 2,
    resolution: 'Full HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 0,
    languages: ['Polski', 'Angielski', 'i 10+ innych'],
    logo: '/images/logos/netflix.png',
    description: 'Dostęp do filmów i seriali Netflix na dwóch ekranach jednocześnie w jakości Full HD.',
    link: 'https://www.netflix.com',
    rating: 4.7,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: 'Full HD (1080p)' },
      { name: 'Dźwięk', value: 'Stereo' },
      { name: 'Jednoczesne odtwarzanie', value: '2 ekrany' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'netflix-premium',
    name: 'Netflix Premium',
    provider: 'Netflix',
    category: 'streaming',
    priceMonthly: 57.99,
    priceYearly: 57.99 * 12,
    yearlyDiscount: 0,
    screens: 4,
    resolution: '4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 0,
    languages: ['Polski', 'Angielski', 'i 10+ innych'],
    logo: '/images/logos/netflix.png',
    description: 'Dostęp do filmów i seriali Netflix na czterech ekranach jednocześnie w jakości 4K oraz z Dolby Atmos.',
    link: 'https://www.netflix.com',
    rating: 4.9,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: '4K + HDR' },
      { name: 'Dźwięk', value: 'Dolby Atmos' },
      { name: 'Jednoczesne odtwarzanie', value: '4 ekrany' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'max',
    name: 'Max',
    provider: 'Max',
    category: 'streaming',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12 * 0.65, // ~35% zniżki przy płatności rocznej
    yearlyDiscount: 35,
    screens: 3,
    resolution: '4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski', 'i 5+ innych'],
    logo: '/images/logos/max.png',
    description: 'Dostęp do bogatej biblioteki filmów i seriali, w tym produkcji oryginalnych od Max.',
    link: 'https://www.max.com',
    rating: 4.6,
    tags: ['filmy', 'seriale', 'produkcje Max'],
    features: [
      { name: 'Jakość obrazu', value: '4K + HDR' },
      { name: 'Dźwięk', value: 'Dolby Atmos' },
      { name: 'Jednoczesne odtwarzanie', value: '3 ekrany' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    provider: 'Disney',
    category: 'streaming',
    priceMonthly: 28.99,
    priceYearly: 28.99 * 12 * 0.83, // ok. 17% zniżki
    yearlyDiscount: 17,
    screens: 4,
    resolution: '4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 0,
    languages: ['Polski', 'Angielski', 'i 10+ innych'],
    logo: '/images/logos/disney-plus.png',
    description: 'Dostęp do treści Disney, Marvel, Star Wars, Pixar, National Geographic i więcej.',
    link: 'https://www.disneyplus.com',
    rating: 4.6,
    tags: ['filmy', 'seriale', 'bajki', 'Marvel', 'Star Wars'],
    features: [
      { name: 'Jakość obrazu', value: '4K + HDR' },
      { name: 'Dźwięk', value: 'Dolby Atmos' },
      { name: 'Jednoczesne odtwarzanie', value: '4 ekrany' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime Video',
    provider: 'Amazon',
    category: 'streaming',
    priceMonthly: 14.99,
    priceYearly: 14.99 * 12 * 0.8, // ~20% zniżki
    yearlyDiscount: 20,
    screens: 3,
    resolution: '4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski', 'i 5+ innych'],
    logo: '/images/logos/prime-video.png',
    description: 'Dostęp do biblioteki Prime Video oraz dodatkowe korzyści Amazon Prime.',
    link: 'https://www.primevideo.com',
    rating: 4.2,
    tags: ['filmy', 'seriale', 'darmowa dostawa'],
    features: [
      { name: 'Jakość obrazu', value: '4K + HDR' },
      { name: 'Dźwięk', value: 'Dolby Atmos' },
      { name: 'Jednoczesne odtwarzanie', value: '3 ekrany' },
      { name: 'Pobieranie', value: 'Tak' },
      { name: 'Prime Gaming', value: 'Tak' },
      { name: 'Darmowa dostawa', value: 'Tak' },
    ],
  },
  {
    id: 'skyshowtime',
    name: 'SkyShowtime',
    provider: 'SkyShowtime',
    category: 'streaming',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 2,
    resolution: '4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/skyshowtime.png',
    description: 'Platforma streamingowa oferująca filmy, seriale i programy rozrywkowe.',
    link: 'https://www.skyshowtime.com',
    rating: 4.5,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: '4K' },
      { name: 'Jednoczesne odtwarzanie', value: '2 ekrany' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'apple-tv-plus',
    name: 'Apple TV+',
    provider: 'Apple',
    category: 'streaming',
    priceMonthly: 9.99,
    priceYearly: 9.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 6,
    resolution: '4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/apple-tv-plus.png',
    description: 'Oryginalne produkcje filmowe i serialowe od Apple.',
    link: 'https://www.apple.com/apple-tv-plus/',
    rating: 4.4,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: '4K + HDR' },
      { name: 'Jednoczesne odtwarzanie', value: '6 ekranów' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'flixclassic',
    name: 'FlixClassic',
    provider: 'FlixClassic',
    category: 'streaming',
    priceMonthly: 12.99,
    priceYearly: 12.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/flixclassic.png',
    description: 'Klasyczne filmy i seriale dostępne na żądanie.',
    link: 'https://www.flixclassic.com',
    rating: 4.0,
    tags: ['filmy', 'seriale', 'klasyka'],
    features: [
      { name: 'Jakość obrazu', value: 'HD' },
      { name: 'Jednoczesne odtwarzanie', value: '1 ekran' },
    ],
  },
  {
    id: 'cda-premium',
    name: 'CDA Premium',
    provider: 'CDA',
    category: 'streaming',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'Full HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski'],
    logo: '/images/logos/cda-premium.png',
    description: 'Polska platforma VOD oferująca filmy, seriale i programy rozrywkowe.',
    link: 'https://www.cda.pl/premium',
    rating: 4.3,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: 'Full HD' },
      { name: 'Jednoczesne odtwarzanie', value: '1 ekran' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },
  {
    id: 'player-premium',
    name: 'Player.pl Premium',
    provider: 'TVN',
    category: 'streaming',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 2,
    resolution: 'Full HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski'],
    logo: '/images/logos/player-pl.png',
    description: 'Platforma streamingowa z filmami, serialami oraz programami TVN.',
    link: 'https://www.player.pl/premium',
    rating: 4.2,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: 'Full HD' },
      { name: 'Jednoczesne odtwarzanie', value: '2 ekrany' },
    ],
  },
  {
    id: 'polsat-box-go',
    name: 'Polsat Box Go',
    provider: 'Polsat',
    category: 'streaming',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'Full HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski'],
    logo: '/images/logos/polsat-box-go.png',
    description: 'Dostęp do filmów, seriali i programów telewizyjnych Polsatu.',
    link: 'https://www.polsatboxgo.pl',
    rating: 4.1,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: 'Full HD' },
      { name: 'Jednoczesne odtwarzanie', value: '1 ekran' },
    ],
  },
  {
    id: 'tvp-vod-premium',
    name: 'TVP VOD Premium',
    provider: 'TVP',
    category: 'streaming',
    priceMonthly: 9.99,
    priceYearly: 9.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 0,
    languages: ['Polski'],
    logo: '/images/logos/tvp-vod.png',
    description: 'Rozszerzony dostęp do zasobów TVP VOD, w tym filmów i seriali.',
    link: 'https://vod.tvp.pl/premium',
    rating: 4.0,
    tags: ['filmy', 'seriale'],
    features: [
      { name: 'Jakość obrazu', value: 'HD' },
      { name: 'Pobieranie', value: 'Tak' },
    ],
  },

  // ===== STREAMING MUZYCZNY =====
  {
    id: 'spotify-individual',
    name: 'Spotify Premium',
    provider: 'Spotify',
    category: 'music',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.83,
    yearlyDiscount: 17,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski', 'i 20+ innych'],
    logo: '/images/logos/spotify.png',
    description: 'Nieograniczony dostęp do milionów utworów bez reklam, z możliwością słuchania offline.',
    link: 'https://www.spotify.com',
    rating: 4.8,
    tags: ['muzyka', 'podcasty', 'audiobooki'],
    features: [
      { name: 'Jakość dźwięku', value: 'Do 320 kbps' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Bez reklam', value: 'Tak' },
      { name: 'Nielimitowane pomijanie', value: 'Tak' },
      { name: 'Podcasty', value: 'Tak' },
    ],
  },
  {
    id: 'spotify-duo',
    name: 'Spotify Duo',
    provider: 'Spotify',
    category: 'music',
    priceMonthly: 24.99,
    priceYearly: 24.99 * 12,
    yearlyDiscount: 0,
    screens: 2,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski', 'i 20+ innych'],
    logo: '/images/logos/spotify.png',
    description: 'Dwa oddzielne konta Premium dla pary mieszkającej pod tym samym adresem.',
    link: 'https://www.spotify.com',
    rating: 4.7,
    tags: ['muzyka', 'podcasty', 'audiobooki'],
    features: [
      { name: 'Jakość dźwięku', value: 'Do 320 kbps' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Bez reklam', value: 'Tak' },
      { name: 'Nielimitowane pomijanie', value: 'Tak' },
      { name: 'Podcasty', value: 'Tak' },
      { name: 'Liczba kont', value: '2 oddzielne konta' },
    ],
  },
  {
    id: 'spotify-family',
    name: 'Spotify Family',
    provider: 'Spotify',
    category: 'music',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12,
    yearlyDiscount: 0,
    screens: 6,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski', 'i 20+ innych'],
    logo: '/images/logos/spotify.png',
    description: 'Sześć oddzielnych kont Premium dla członków rodziny mieszkających pod tym samym adresem.',
    link: 'https://www.spotify.com',
    rating: 4.9,
    tags: ['muzyka', 'podcasty', 'audiobooki'],
    features: [
      { name: 'Jakość dźwięku', value: 'Do 320 kbps' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Bez reklam', value: 'Tak' },
      { name: 'Nielimitowane pomijanie', value: 'Tak' },
      { name: 'Podcasty', value: 'Tak' },
      { name: 'Liczba kont', value: '6 oddzielnych kont' },
      { name: 'Spotify Kids', value: 'Tak' },
    ],
  },
  {
    id: 'tidal-hifi',
    name: 'TIDAL HiFi',
    provider: 'TIDAL',
    category: 'music',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.83,
    yearlyDiscount: 17,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski', 'i 5+ innych'],
    logo: '/images/logos/tidal.png',
    description: 'Streaming muzyczny w wysokiej jakości dźwięku, bez reklam, z możliwością słuchania offline.',
    link: 'https://www.tidal.com',
    rating: 4.5,
    tags: ['muzyka', 'wysoka jakość dźwięku'],
    features: [
      { name: 'Jakość dźwięku', value: 'HiFi (FLAC 1411 kbps)' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Bez reklam', value: 'Tak' },
      { name: 'Teledyski', value: 'Tak' },
    ],
  },
  {
    id: 'tidal-hifi-plus',
    name: 'TIDAL HiFi Plus',
    provider: 'TIDAL',
    category: 'music',
    priceMonthly: 39.99,
    priceYearly: 39.99 * 12 * 0.83,
    yearlyDiscount: 17,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski', 'i 5+ innych'],
    logo: '/images/logos/tidal.png',
    description: 'Streaming muzyczny w najwyższej jakości dźwięku (Master), wsparcie dla Dolby Atmos i Sony 360 Audio.',
    link: 'https://www.tidal.com',
    rating: 4.6,
    tags: ['muzyka', 'najwyższa jakość dźwięku'],
    features: [
      { name: 'Jakość dźwięku', value: 'Master (do 9216 kbps)' },
      { name: 'Dolby Atmos', value: 'Tak' },
      { name: 'Sony 360 Audio', value: 'Tak' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Bez reklam', value: 'Tak' },
      { name: 'Teledyski', value: 'Tak' },
    ],
  },
  {
    id: 'youtube-music-premium',
    name: 'YouTube Music Premium',
    provider: 'YouTube',
    category: 'music',
    priceMonthly: 11.99,
    priceYearly: 11.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/youtube-music.png',
    description: 'Streaming muzyczny bez reklam z możliwością słuchania offline oraz dostępem do teledysków.',
    link: 'https://music.youtube.com',
    rating: 4.3,
    tags: ['muzyka'],
    features: [
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Bez reklam', value: 'Tak' },
    ],
  },
  {
    id: 'amazon-music-unlimited',
    name: 'Amazon Music Unlimited',
    provider: 'Amazon',
    category: 'music',
    priceMonthly: 14.99,
    priceYearly: 14.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 30,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/amazon-music.png',
    description: 'Szeroka biblioteka utworów dostępna w trybie streamingowym bez reklam.',
    link: 'https://music.amazon.com',
    rating: 4.2,
    tags: ['muzyka'],
    features: [
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Bez reklam', value: 'Tak' },
    ],
  },

  // ===== AUDIOBOOKI =====
  {
    id: 'audioteka-abonament',
    name: 'Audioteka Abonament',
    provider: 'Audioteka',
    category: 'audiobooks',
    priceMonthly: 24.99,
    priceYearly: 24.99 * 12 * 0.83,
    yearlyDiscount: 17,
    screens: 2,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 14,
    languages: ['Polski'],
    logo: '/images/logos/audioteka.png',
    description: 'Dostęp do audiobooków w bibliotece Audioteki w ramach abonamentu.',
    link: 'https://www.audioteka.com',
    rating: 4.3,
    tags: ['audiobooki', 'słuchowiska'],
    features: [
      { name: 'Dostępne tytuły', value: '2000+' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'Liczba urządzeń', value: '2' },
      { name: 'Synchronizacja', value: 'Tak' },
    ],
  },
  {
    id: 'empik-go-standard',
    name: 'Empik Go Standard',
    provider: 'Empik',
    category: 'audiobooks',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.83,
    yearlyDiscount: 17,
    screens: 3,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 14,
    languages: ['Polski'],
    logo: '/images/logos/empik-go.png',
    description: 'Nieograniczony dostęp do tysięcy audiobooków i e-booków.',
    link: 'https://www.empik.com/go',
    rating: 4.4,
    tags: ['audiobooki', 'e-booki'],
    features: [
      { name: 'Dostępne tytuły', value: '5000+' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'E-booki', value: 'Tak' },
      { name: 'Liczba urządzeń', value: '3' },
      { name: 'Aplikacja na smartfony', value: 'Tak' },
    ],
  },
  {
    id: 'empik-go-premium',
    name: 'Empik Go Premium',
    provider: 'Empik',
    category: 'audiobooks',
    priceMonthly: 39.99,
    priceYearly: 39.99 * 12 * 0.83,
    yearlyDiscount: 17,
    screens: 5,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 14,
    languages: ['Polski'],
    logo: '/images/logos/empik-go.png',
    description: 'Nieograniczony dostęp do największej kolekcji audiobooków i e-booków w Polsce.',
    link: 'https://www.empik.com/go',
    rating: 4.5,
    tags: ['audiobooki', 'e-booki'],
    features: [
      { name: 'Dostępne tytuły', value: '80000+' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
      { name: 'E-booki', value: 'Tak' },
      { name: 'Liczba urządzeń', value: '5' },
      { name: 'Aplikacja na smartfony', value: 'Tak' },
      { name: 'Nowości wydawnicze', value: 'Tak' },
    ],
  },
  {
    id: 'storytel',
    name: 'Storytel',
    provider: 'Storytel',
    category: 'audiobooks',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 2,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski'],
    logo: '/images/logos/storytel.png',
    description: 'Dostęp do tysięcy audiobooków i e-booków w modelu subskrypcyjnym.',
    link: 'https://www.storytel.com/pl/',
    rating: 4.4,
    tags: ['audiobooki', 'e-booki'],
    features: [
      { name: 'Dostępne tytuły', value: '30000+' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
    ],
  },
  {
    id: 'legimi',
    name: 'Legimi',
    provider: 'Legimi',
    category: 'audiobooks',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski'],
    logo: '/images/logos/legimi.png',
    description: 'Dostęp do e-booków i audiobooków w ramach abonamentu.',
    link: 'https://www.legimi.pl',
    rating: 4.3,
    tags: ['audiobooki', 'e-booki'],
    features: [
      { name: 'Dostępne tytuły', value: '50000+' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
    ],
  },
  {
    id: 'nexto-premium',
    name: 'Nexto Premium',
    provider: 'Nexto',
    category: 'audiobooks',
    priceMonthly: 9.99,
    priceYearly: 9.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski'],
    logo: '/images/logos/nexto.png',
    description: 'Subskrypcja z e-prasą, e-bookami i audiobookami.',
    link: 'https://www.nexto.pl',
    rating: 4.0,
    tags: ['audiobooki', 'e-booki', 'prasa'],
    features: [
      { name: 'Dostępne tytuły', value: '10000+' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
    ],
  },
  {
    id: 'bookbeat',
    name: 'BookBeat',
    provider: 'BookBeat',
    category: 'audiobooks',
    priceMonthly: 24.99,
    priceYearly: 24.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 2,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski'],
    logo: '/images/logos/bookbeat.png',
    description: 'Dostęp do audiobooków i e-booków w ramach abonamentu.',
    link: 'https://www.bookbeat.com',
    rating: 4.2,
    tags: ['audiobooki', 'e-booki'],
    features: [
      { name: 'Dostępne tytuły', value: '15000+' },
      { name: 'Odtwarzanie offline', value: 'Tak' },
    ],
  },

  // ===== GRY =====
  {
    id: 'xbox-game-pass',
    name: 'Xbox Game Pass',
    provider: 'Microsoft',
    category: 'gaming',
    priceMonthly: 39.99,
    priceYearly: 39.99 * 12,
    yearlyDiscount: 0,
    screens: 1,
    resolution: 'HD/4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 14,
    languages: ['Polski', 'Angielski', 'i 20+ innych'],
    logo: '/images/logos/xbox-game-pass.png',
    description: 'Dostęp do biblioteki ponad 100 gier na konsole Xbox i PC.',
    link: 'https://www.xbox.com/pl-PL/xbox-game-pass',
    rating: 4.7,
    tags: ['gry', 'konsole', 'PC'],
    features: [
      { name: 'Liczba gier', value: '100+' },
      { name: 'Gry od Xbox Game Studios', value: 'W dniu premiery' },
      { name: 'Rabaty na zakupy w sklepie', value: 'Do 20%' },
      { name: 'EA Play', value: 'Nie' },
      { name: 'Gry online', value: 'Wymaga Xbox Live Gold' },
    ],
  },
  {
    id: 'xbox-game-pass-ultimate',
    name: 'Xbox Game Pass Ultimate',
    provider: 'Microsoft',
    category: 'gaming',
    priceMonthly: 62.99,
    priceYearly: 62.99 * 12,
    yearlyDiscount: 0,
    screens: 1,
    resolution: 'HD/4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 14,
    languages: ['Polski', 'Angielski', 'i 20+ innych'],
    logo: '/images/logos/xbox-game-pass.png',
    description: 'Dostęp do biblioteki ponad 300 gier na konsole Xbox, PC, cloud gaming, Xbox Live Gold i EA Play.',
    link: 'https://www.xbox.com/pl-PL/xbox-game-pass',
    rating: 4.9,
    tags: ['gry', 'konsole', 'PC', 'cloud gaming'],
    features: [
      { name: 'Liczba gier', value: '300+' },
      { name: 'Gry od Xbox Game Studios', value: 'W dniu premiery' },
      { name: 'Rabaty na zakupy w sklepie', value: 'Do 20%' },
      { name: 'EA Play', value: 'Tak' },
      { name: 'Gry online', value: 'W pakiecie z Xbox Live Gold' },
      { name: 'Cloud Gaming', value: 'Tak' },
      { name: 'Platformy', value: 'Xbox, PC, Mobile (cloud)' },
    ],
  },
  {
    id: 'ea-play',
    name: 'EA Play',
    provider: 'Electronic Arts',
    category: 'gaming',
    priceMonthly: 14.99,
    priceYearly: 14.99 * 12 * 0.56,
    yearlyDiscount: 44,
    screens: 1,
    resolution: 'HD/4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 0,
    languages: ['Polski', 'Angielski', 'i 10+ innych'],
    logo: '/images/logos/ea-play.png',
    description: 'Dostęp do wybranych gier EA, wczesny dostęp do nowych tytułów i zniżki na zakupy w sklepie EA.',
    link: 'https://www.ea.com/ea-play',
    rating: 4.2,
    tags: ['gry', 'PC', 'konsole'],
    features: [
      { name: 'Liczba gier', value: '50+' },
      { name: 'Rabaty na zakupy', value: '10%' },
      { name: 'Wczesny dostęp', value: 'Tak (do 10 godzin wcześniej)' },
      { name: 'Platformy', value: 'PC, PlayStation, Xbox' },
    ],
  },
  {
    id: 'nintendo-switch-online',
    name: 'Nintendo Switch Online',
    provider: 'Nintendo',
    category: 'gaming',
    priceMonthly: 20,
    priceYearly: 20 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/nintendo-switch.png',
    description: 'Subskrypcja umożliwiająca grę online oraz dostęp do klasycznych tytułów Nintendo.',
    link: 'https://www.nintendo.com/switch/online-service/',
    rating: 4.3,
    tags: ['gry', 'Nintendo'],
    features: [
      { name: 'Gry online', value: 'Tak' },
      { name: 'Klasyczne gry', value: 'Tak' },
    ],
  },
  {
    id: 'ubisoft-plus',
    name: 'Ubisoft+',
    provider: 'Ubisoft',
    category: 'gaming',
    priceMonthly: 25,
    priceYearly: 25 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'HD/4K',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Angielski'],
    logo: '/images/logos/ubisoft-plus.png',
    description: 'Dostęp do szerokiej biblioteki gier Ubisoft na PC i konsolach.',
    link: 'https://plus.ubisoft.com',
    rating: 4.1,
    tags: ['gry', 'PC'],
    features: [
      { name: 'Liczba gier', value: '100+' },
      { name: 'Nowości', value: 'W dniu premiery' },
    ],
  },
  {
    id: 'geforce-now',
    name: 'GeForce NOW Priority',
    provider: 'NVIDIA',
    category: 'gaming',
    priceMonthly: 25,
    priceYearly: 25 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'HD/4K (varies)',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Angielski'],
    logo: '/images/logos/geforce-now.png',
    description: 'Chmurowa usługa grania, umożliwiająca dostęp do gier z biblioteki NVIDIA.',
    link: 'https://www.nvidia.com/en-us/geforce-now/',
    rating: 4.0,
    tags: ['gry', 'cloud gaming'],
    features: [
      { name: 'Czas oczekiwania', value: 'Niższy w wersji Priority' },
      { name: 'Gry', value: 'Kompatybilność z wieloma tytułami' },
    ],
  },
  {
    id: 'apple-arcade',
    name: 'Apple Arcade',
    provider: 'Apple',
    category: 'gaming',
    priceMonthly: 9.99,
    priceYearly: 9.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'N/A',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Angielski'],
    logo: '/images/logos/apple-arcade.png',
    description: 'Dostęp do ekskluzywnej kolekcji gier na urządzenia Apple bez reklam.',
    link: 'https://www.apple.com/apple-arcade/',
    rating: 4.5,
    tags: ['gry', 'Apple'],
    features: [
      { name: 'Brak reklam', value: 'Tak' },
      { name: 'Gry offline', value: 'Tak' },
    ],
  },

  // ===== SPORT =====
  {
    id: 'canal-plus-online-sport',
    name: 'CANAL+ Online',
    provider: 'CANAL+',
    category: 'sport',
    priceMonthly: 29,
    priceYearly: 29 * 12,
    yearlyDiscount: 0,
    screens: 1,
    resolution: 'Full HD',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 14,
    languages: ['Polski'],
    logo: '/images/logos/canal-plus.png',
    description: 'Dostęp do kanałów CANAL+ na żywo oraz treści na żądanie, w tym transmisji sportowych.',
    link: 'https://www.canalplus.com/pl/',
    rating: 4.3,
    tags: ['sport', 'transmisje na żywo'],
    features: [
      { name: 'Liga Mistrzów UEFA', value: 'Tak' },
      { name: 'PKO BP Ekstraklasa', value: 'Tak' },
      { name: 'Formuła 1', value: 'Tak' },
      { name: 'Jakość obrazu', value: 'Full HD' },
    ],
  },
  {
    id: 'eleven-sports',
    name: 'Eleven Sports',
    provider: 'Eleven Sports',
    category: 'sport',
    priceMonthly: 15.90,
    priceYearly: 15.90 * 12 * 0.83,
    yearlyDiscount: 17,
    screens: 1,
    resolution: 'HD',
    offlineViewing: false,
    adsFree: false,
    trialPeriod: 0,
    languages: ['Polski'],
    logo: '/images/logos/eleven-sports.png',
    description: 'Dostęp do transmisji sportowych z całego świata, m.in. LaLiga, Serie A, Bundesliga i F1.',
    link: 'https://www.elevensports.pl/',
    rating: 4.1,
    tags: ['sport', 'piłka nożna', 'sporty motorowe'],
    features: [
      { name: 'LaLiga', value: 'Tak' },
      { name: 'Serie A', value: 'Tak' },
      { name: 'Bundesliga', value: 'Tak' },
      { name: 'Formula 1', value: 'Tak' },
      { name: 'UFC', value: 'Tak' },
      { name: 'Jakość obrazu', value: 'HD' },
    ],
  },
  {
    id: 'viaplay-sport',
    name: 'Viaplay',
    provider: 'Viaplay',
    category: 'sport',
    priceMonthly: 34,
    priceYearly: 34 * 12,
    yearlyDiscount: 0,
    screens: 2,
    resolution: 'Full HD',
    offlineViewing: true,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/viaplay.png',
    description: 'Dostęp do transmisji sportowych, w tym Premier League oraz innych lig i wydarzeń.',
    link: 'https://viaplay.pl/',
    rating: 3.9,
    tags: ['sport', 'piłka nożna'],
    features: [
      { name: 'Premier League', value: 'Tak' },
      { name: 'KSW', value: 'Tak' },
      { name: 'Jakość obrazu', value: 'Full HD' },
      { name: 'Jednoczesne odtwarzanie', value: '2 ekrany' },
    ],
  },
  {
    id: 'dazn',
    name: 'DAZN',
    provider: 'DAZN',
    category: 'sport',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'Full HD',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/dazn.png',
    description: 'Streaming sportowy z transmisjami boksu, MMA i innych dyscyplin.',
    link: 'https://www.dazn.com',
    rating: 4.2,
    tags: ['sport', 'boks', 'MMA'],
    features: [
      { name: 'Transmisje na żywo', value: 'Tak' },
      { name: 'Jakość obrazu', value: 'Full HD' },
    ],
  },
  {
    id: 'nba-league-pass',
    name: 'NBA League Pass',
    provider: 'NBA',
    category: 'sport',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: '4K',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Angielski'],
    logo: '/images/logos/nba-league-pass.png',
    description: 'Streaming meczów NBA na żywo oraz dostęp do archiwum pełnych transmisji.',
    link: 'https://www.nba.com/leaguepass',
    rating: 4.4,
    tags: ['sport', 'koszykówka'],
    features: [
      { name: 'Transmisje na żywo', value: 'Tak' },
      { name: 'Archiwum meczów', value: 'Tak' },
    ],
  },
  {
    id: 'nfl-game-pass',
    name: 'NFL Game Pass',
    provider: 'NFL',
    category: 'sport',
    priceMonthly: 24.99,
    priceYearly: 24.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'HD',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Angielski'],
    logo: '/images/logos/nfl-game-pass.png',
    description: 'Dostęp do transmisji meczów NFL, skrótów i archiwum wydarzeń.',
    link: 'https://www.nflgamepass.com',
    rating: 4.3,
    tags: ['sport', 'football amerykański'],
    features: [
      { name: 'Transmisje na żywo', value: 'Tak' },
      { name: 'Archiwum', value: 'Tak' },
    ],
  },
  {
    id: 'f1-tv-pro',
    name: 'F1 TV Pro',
    provider: 'Formula 1',
    category: 'sport',
    priceMonthly: 29.99,
    priceYearly: 29.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: '4K',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Angielski'],
    logo: '/images/logos/f1-tv-pro.png',
    description: 'Streaming na żywo oraz archiwum wyścigów Formuły 1.',
    link: 'https://www.formula1.com/en/subscribe-to-f1-tv.html',
    rating: 4.5,
    tags: ['sport', 'F1'],
    features: [
      { name: 'Transmisje na żywo', value: 'Tak' },
      { name: 'Archiwum wyścigów', value: 'Tak' },
    ],
  },
  {
    id: 'eurosport-player',
    name: 'Eurosport Player',
    provider: 'Eurosport',
    category: 'sport',
    priceMonthly: 19.99,
    priceYearly: 19.99 * 12 * 0.8,
    yearlyDiscount: 20,
    screens: 1,
    resolution: 'Full HD',
    offlineViewing: false,
    adsFree: true,
    trialPeriod: 7,
    languages: ['Polski', 'Angielski'],
    logo: '/images/logos/eurosport-player.png',
    description: 'Dostęp do transmisji sportowych, w tym tenis, cyklistyka, sporty zimowe i więcej.',
    link: 'https://www.eurosportplayer.com',
    rating: 4.2,
    tags: ['sport', 'transmisje sportowe'],
    features: [
      { name: 'Transmisje na żywo', value: 'Tak' },
      { name: 'Archiwum wydarzeń', value: 'Tak' },
    ],
  },
];

export default subscriptions;
