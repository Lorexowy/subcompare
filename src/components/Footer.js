import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-dark-400 py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-100">SubCompare</h3>
            <p className="text-light-300 text-sm">
              Porównuj oferty subskrypcyjne popularnych serwisów streamingowych, muzycznych, gamingowych i wielu innych w jednym miejscu.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-100">Szybki dostęp</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/compare" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Porównywarka
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Kalkulator pakietów
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Promocje
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-100">Kategorie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/compare?category=streaming" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Streaming wideo
                </Link>
              </li>
              <li>
                <Link href="/compare?category=music" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Streaming muzyczny
                </Link>
              </li>
              <li>
                <Link href="/compare?category=gaming" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Gry
                </Link>
              </li>
              <li>
                <Link href="/compare?category=audiobooks" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Audiobooki
                </Link>
              </li>
              <li>
                <Link href="/compare?category=sport" className="text-light-300 hover:text-primary transition-colors duration-200">
                  Sport
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-100 mt-8 pt-6 text-center text-light-400 text-sm">
          <p>© {currentYear} SubCompare. Wszystkie prawa zastrzeżone. Created and coded by <a href='https://micheldev.pl/' target='_blank'>www.micheldev.pl</a></p>
        </div>
      </div>
    </footer>
  )
}