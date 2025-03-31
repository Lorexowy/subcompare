import Link from 'next/link'

export default function BlogPostCard({ post }) {
  // Funkcja formatująca datę
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }
  
  return (
    <div className="card h-full flex flex-col">
      {/* Obraz */}
      <div className="bg-dark-300 h-48 rounded-lg mb-4 overflow-hidden">
        {/* Placeholder dla obrazu */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl opacity-20">{post.title.charAt(0)}</div>
        </div>
      </div>
      
      {/* Kategoria i data */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="text-primary font-medium">{post.category}</span>
        <span className="text-light-300">{formatDate(post.date)}</span>
      </div>
      
      {/* Tytuł */}
      <h3 className="font-bold text-lg mb-3">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors duration-200">
          {post.title}
        </Link>
      </h3>
      
      {/* Zajawka */}
      <p className="text-light-300 text-sm mb-4 flex-grow">
        {post.excerpt}
      </p>
      
      {/* Autor i link */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center mr-2">
            <span className="font-medium text-sm">{post.author.charAt(0)}</span>
          </div>
          <span className="text-sm text-light-300">{post.author}</span>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="text-primary text-sm hover:text-primary-dark transition-colors duration-200">
          Czytaj więcej &rarr;
        </Link>
      </div>
    </div>
  )
}