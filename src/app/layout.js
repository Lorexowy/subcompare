// Remove the 'use client' directive from this file
import './globals.css'
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ScrollToTopButton from '../components/ScrollToTopButton'

// Load fonts
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-montserrat',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata = {
  title: 'SubCompare - Porównaj serwisy subskrypcyjne',
  description: 'Porównuj oferty subskrypcyjne popularnych serwisów streamingowych, muzycznych i gamingowych. Znajdź najlepsze oferty w jednym miejscu.',
  keywords: 'porównanie subskrypcji, netflix, spotify, hbo max, disney plus, streaming, komparator, najlepsze oferty',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://subcompare.pl'),
  openGraph: {
    title: 'SubCompare - Porównaj serwisy subskrypcyjne',
    description: 'Znajdź i porównaj najlepsze subskrypcje w jednym miejscu',
    url: '/',
    siteName: 'SubCompare',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SubCompare - Porównywarka serwisów subskrypcyjnych',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SubCompare - Porównaj serwisy subskrypcyjne',
    description: 'Znajdź i porównaj najlepsze subskrypcje w jednym miejscu',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans text-light-100 bg-dark-300 antialiased pt-16">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}