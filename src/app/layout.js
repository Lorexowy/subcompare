import './globals.css'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata = {
  title: 'SubCompare - Porównywarka serwisów subskrypcyjnych',
  description: 'Porównuj oferty subskrypcyjne popularnych serwisów streamingowych, muzycznych i gamingowych. Znajdź najlepsze oferty w jednym miejscu.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className="dark">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}