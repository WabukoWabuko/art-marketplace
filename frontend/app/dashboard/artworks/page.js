'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../../../lib/api'
import DynamicBackground from '../../../components/DynamicBackground'

export default function DashboardArtworks() {
  const [artworks, setArtworks] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [userData, artworksData] = await Promise.all([
          api.getCurrentUser().catch(() => null),
          api.getArtworks().catch(() => [])
        ])

        const normalizedArtworks = Array.isArray(artworksData)
          ? artworksData
          : Array.isArray(artworksData?.results)
          ? artworksData.results
          : []

        setUser(userData)
        setArtworks(normalizedArtworks)
      } catch (e) {
        setError(e.message || 'Failed to load artworks')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const visibleArtworks = user?.is_artist
    ? artworks.filter((artwork) => artwork.artist_name === user.username || artwork.artist_username === user.username)
    : artworks

  return (
    <DynamicBackground>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Manage Artworks</h1>
            <p className="text-slate-300">
              {user?.is_artist
                ? 'Review and manage your published artworks in one place.'
                : 'Browse artwork data and manage listings from the artist dashboard.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg mb-6">
              Error: {error}
            </div>
          )}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-white">Artwork Catalog</h2>
              <p className="text-slate-400">{visibleArtworks.length} artwork{visibleArtworks.length !== 1 ? 's' : ''} found</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                Back to Dashboard
              </Link>
              <Link href="/admin/dashboard" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
                Admin Control Panel
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : visibleArtworks.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/10 p-8 text-slate-300 text-center">
              <h3 className="text-xl font-semibold text-white mb-3">No artworks available</h3>
              <p className="mb-4">No published artworks match your profile yet.</p>
              <Link href="/marketplace" className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleArtworks.map((artwork) => (
                <div key={artwork.id} className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
                  <h3 className="text-xl font-semibold text-white mb-2">{artwork.title || 'Untitled Artwork'}</h3>
                  <p className="text-slate-300 mb-3">{artwork.artist_name || artwork.artist_username || 'Unknown artist'}</p>
                  <p className="text-slate-400 mb-4 line-clamp-3">{artwork.description || 'No description provided.'}</p>
                  <div className="flex flex-col gap-3">
                    <Link href={`/marketplace/${artwork.id}`} className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                      View Artwork
                    </Link>
                    <span className="text-slate-400 text-sm">Status: {artwork.status || 'available'}</span>
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
