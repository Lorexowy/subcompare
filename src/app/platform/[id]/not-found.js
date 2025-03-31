import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-300 py-16 px-4">
      <div className="container-custom text-center">
        <h1 className="heading-xl mb-4">Platforma nie została znaleziona</h1>
        <p className="text-light-300 mb-8 text-lg">
          Nie znaleźliśmy platformy o podanym identyfikatorze. Sprawdź poprawność adresu URL lub wróć do strony głównej.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Powrót do strony głównej
          </Link>
          <Link href="/compare" className="btn-secondary">
            Przeglądaj platformy
          </Link>
        </div>
      </div>
    </div>
  )
}