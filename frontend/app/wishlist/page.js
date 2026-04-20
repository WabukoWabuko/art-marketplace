'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { api } from '../../lib/api'
import DynamicBackground from '../../components/DynamicBackground'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      setLoading(true)
      const wishlistData = await api.getWishlist()
      setWishlist(wishlistData || [])
    } catch (error) {
      setError('Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (wishlistId) => {
    try {
      await api.removeFromWishlist(wishlistId)
      setWishlist(wishlist.filter(item => item.id !== wishlistId))
    } catch (error) {
      setError('Failed to remove item from wishlist')
    }
  }

  if (loading) {
    return (
      <DynamicBackground>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </DynamicBackground>
    )
  }

  return (
    <DynamicBackground>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
            <p className="text-slate-300">Your saved artworks and favorite pieces</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {wishlist.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-12 text-center shadow-xl">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Your Wishlist is Empty</h3>
              <p className="text-slate-300 mb-6">Start exploring and save your favorite artworks!</p>
              <Link
                href="/marketplace"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-xl group">
                  <div className="aspect-square bg-slate-800 relative">
                    {item.artwork?.image ? (
                      <img
                        src={item.artwork.image}
                        alt={item.artwork.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <span className="text-4xl">🎨</span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {item.artwork?.title || 'Untitled Artwork'}
                    </h3>
                    <p className="text-slate-300 text-sm mb-2">
                      by {item.artwork?.artist_name || 'Unknown Artist'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg">
                        ${item.artwork?.price || '0.00'}
                      </span>
                      <Link
                        href={`/marketplace/${item.artwork?.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DynamicBackground>
  )
}