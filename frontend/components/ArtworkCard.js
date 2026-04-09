import Link from 'next/link'
import { useState } from 'react'

export default function ArtworkCard({ artwork }) {
  const [isHovered, setIsHovered] = useState(false)
  const imageSrc = artwork.image || '/placeholder.jpg'

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={artwork.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              href={`/marketplace/${artwork.id}`}
              className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
            >
              View Details →
            </Link>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <span className="font-bold text-gray-900">{artwork.currency} {artwork.price}</span>
        </div>

        {/* Limited Edition Badge */}
        {artwork.is_limited && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Limited Edition
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {artwork.title}
        </h3>

        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">
              {artwork.artist_name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <span className="text-gray-600 font-medium">By {artwork.artist_name}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {artwork.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link
            href={`/marketplace/${artwork.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            View Details
          </Link>

          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}