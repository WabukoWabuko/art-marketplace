'use client'

import { useEffect, useState } from 'react'
import ArtworkCard from '../../components/ArtworkCard'
import CurrencySelector from '../../components/CurrencySelector'
import { api } from '../../lib/api'

export default function Marketplace() {
  const [artworks, setArtworks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadArtworks() {
      try {
        const data = await api.getArtworks({})
        setArtworks(data)
      } catch (e) {
        setError(e.message)
      }
    }
    loadArtworks()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Art Marketplace</h1>
        <CurrencySelector />
      </div>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {artworks.length === 0 ? (
          <p className="text-gray-600">Loading artworks...</p>
        ) : (
          artworks.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork} />)
        )}
      </div>
    </main>
  )
}
