'use client'

import Link from 'next/link'

export default function CategoriesSection() {
  const categories = [
    { name: "Streaming wideo", icon: "📺", slug: "streaming" },
    { name: "Streaming muzyczny", icon: "🎵", slug: "music" },
    { name: "Gry", icon: "🎮", slug: "gaming" },
    { name: "Audiobooki", icon: "📚", slug: "audiobooks" },
    { name: "Sport", icon: "⚽", slug: "sport" }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Przeszukaj według 
          <span className="text-blue-400"> kategorii</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              href={`/compare?category=${category.slug}`}
              className="group"
            >
              <div className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-all duration-300 
                              shadow-md group-hover:shadow-xl transform group-hover:-translate-y-1 h-full">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <span className="font-medium text-lg">{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}