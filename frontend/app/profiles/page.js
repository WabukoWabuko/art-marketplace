'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

export default function ProfilesPage() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')

  useEffect(() => {
    fetchArtists()
  }, [searchTerm, selectedSpecialty])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      if (selectedSpecialty && selectedSpecialty !== 'All Specialties') params.specialty = selectedSpecialty

      const data = await api.getArtists(params)
      setArtists(data)
    } catch (error) {
      console.error('Error fetching artists:', error)
      // Fallback to empty array if API fails
      setArtists([])
    } finally {
      setLoading(false)
    }
  }

  const getSpecialties = () => {
    const specialties = ['All Specialties', ...new Set(artists.map(artist => artist.specialty).filter(Boolean))]
    return specialties
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Featured Artists</h1>
          <p className="text-xl text-pink-100">Discover extraordinary talent from artists worldwide</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              {getSpecialties().map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
          ) : artists.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No artists found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artists.map((artist) => (
                <Link key={artist.id} href={`/profiles/${artist.username}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden cursor-pointer h-full">
                    <div className="relative h-48 bg-gradient-to-br from-pink-400 to-purple-500">
                      <img
                        src={artist.profile_image || "/placeholder.svg"}
                        alt={artist.full_name}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-4 right-4 bg-white text-pink-600 px-4 py-2 rounded-full text-xs font-bold">
                        {artist.location || 'Unknown'}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{artist.full_name}</h3>
                      <p className="text-pink-600 font-semibold mb-3">{artist.specialty || 'Artist'}</p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{artist.bio || 'Passionate artist creating unique works.'}</p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-pink-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-pink-600">{artist.artworks_count || 0}</div>
                          <div className="text-xs text-gray-600">Artworks</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-purple-600">{artist.followers_count || 0}</div>
                          <div className="text-xs text-gray-600">Followers</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                          View Profile
                        </button>
                        <button className="flex-1 border-2 border-pink-600 text-pink-600 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Are You an Artist?</h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Join thousands of artists already selling their work on ArtMarket. Reach collectors worldwide.
            </p>
            <Link
              href="/register?type=artist"
              className="inline-block bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors"
            >
              Become an Artist
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
