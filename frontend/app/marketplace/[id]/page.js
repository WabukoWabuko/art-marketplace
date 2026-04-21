'use client'

import { useEffect, useState, useContext } from 'react'
import { api } from '../../../lib/api'
import ReviewList from '../../../components/ReviewList'
import ReviewForm from '../../../components/ReviewForm'
import SocialShareButtons from '../../../components/SocialShareButtons'
import { CurrencyContext } from '../../../lib/currencyContext'

export default function ArtworkDetail({ params }) {
  const [artwork, setArtwork] = useState(null)
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)
  const { currency, convertPrice, currencySymbols } = useContext(CurrencyContext)

  useEffect(() => {
    async function loadArtwork() {
      try {
        setError(null)
        const data = await api.getArtwork(params.id)
        setArtwork(data)
        const reviewData = await api.getReviews(params.id)
        setReviews(Array.isArray(reviewData) ? reviewData : reviewData?.results || [])
      } catch (e) {
        setError(e.message)
      }
    }
    loadArtwork()
  }, [params.id])

  const handleReviewSubmit = async (reviewData) => {
    try {
      await api.createReview({ ...reviewData, artwork: params.id })
      const updatedReviews = await api.getReviews(params.id)
      setReviews(Array.isArray(updatedReviews) ? updatedReviews : updatedReviews?.results || [])
    } catch (e) {
      setError(e.message)
    }
  }

  if (error) {
    return <p className="text-red-600 p-8">Error: {error}</p>
  }

  if (!artwork) {
    return <p className="p-8">Loading artwork details...</p>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img src={artwork.image || '/placeholder.svg'} alt={artwork.title} className="w-full rounded-lg shadow-md mb-6" />
          <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
          <p className="text-gray-600 mb-2">By {artwork.artist_name}</p>
          <p className="text-2xl font-semibold mb-4">{currencySymbols[currency] || currency} {convertPrice ? convertPrice(artwork.price, 'USD', currency) : artwork.price}</p>
          <p className="text-gray-700 mb-6">{artwork.description}</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Add to Cart</button>
            <SocialShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={artwork.title} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <ReviewList reviews={reviews} />
          </div>
          <ReviewForm artworkId={params.id} onSubmit={handleReviewSubmit} />
        </div>
      </div>
    </main>
  )
}
