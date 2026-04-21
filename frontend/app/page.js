'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import EventCounter from '../components/EventCounter'
import { api } from '../lib/api'
import DynamicBackground from '../components/DynamicBackground'

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [featuredArtworks, setFeaturedArtworks] = useState([])
  const [featuredArtists, setFeaturedArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const normalizeArray = (data) => {
      if (Array.isArray(data)) return data
      if (Array.isArray(data?.results)) return data.results
      if (Array.isArray(data?.data)) return data.data
      return []
    }

    const getArtistDisplayName = (artist) => {
      if (!artist) return 'Artist'
      if (artist.first_name || artist.last_name) {
        return `${artist.first_name || ''} ${artist.last_name || ''}`.trim() || artist.username || 'Artist'
      }
      return artist.username || 'Artist'
    }

    const getArtistUrl = (artist) => {
      if (!artist) return '/profiles'
      return `/profiles/${artist.username || artist.id}`
    }

    const fetchData = async () => {
      try {
        const eventsData = await api.getEvents()
        setUpcomingEvents(normalizeArray(eventsData).slice(0, 3))

        const artworksData = await api.getArtworks({})
        setFeaturedArtworks(normalizeArray(artworksData).slice(0, 4))

        const artistsData = await api.getArtists({})
        setFeaturedArtists(normalizeArray(artistsData).slice(0, 3))
      } catch (error) {
        console.error('Error fetching data:', error)
        setFetchError('Unable to load homepage content at the moment. Please refresh or try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover & Celebrate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Extraordinary Art
              </span>
            </h1>
            <p className="text-xl text-blue-50 mb-8 leading-relaxed">
              Connect with talented artists worldwide. Buy, sell, and collect unique artworks in the largest digital art marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/marketplace" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl text-center">
                Explore Marketplace
              </Link>
              <Link href="/events" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 text-center">
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <p className="text-gray-600">Artworks Listed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2300+</div>
              <p className="text-gray-600">Active Artists</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">18K+</div>
              <p className="text-gray-600">Happy Collectors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$2.5M+</div>
              <p className="text-gray-600">Total Sales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          {fetchError ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-xl font-semibold text-red-700">{fetchError}</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Artworks</h2>
                <p className="text-xl text-gray-600">Curated selections from our most talented artists</p>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredArtworks.map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link href={`/marketplace/${artwork.id}`}>
                  <div className="relative h-48 bg-gray-200 overflow-hidden group">
                    <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    {artwork.is_limited && (
                      <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">Limited</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">{artwork.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{artwork.artist_name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold text-lg">${artwork.price}</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Available</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/marketplace" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
              View All Artworks
            </Link>
          </div>
        </>
      )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Don&apos;t miss out on exclusive art events and experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-40 bg-gray-300">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                  <div className="mb-4 flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-2.894 5.776A1 1 0 003.118 10h6.764a1 1 0 00.948-1.671L10.894 2.553z"></path></svg>
                    {event.location}
                  </div>
                  <EventCounter eventDate={event.date} eventTitle={event.title} />
                  <Link href={`/events/${event.id}`} className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-colors">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Artists</h2>
            <p className="text-xl text-gray-600">Meet the talented creators behind amazing artworks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <div key={artist.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{getArtistDisplayName(artist)}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{artist.specialty || 'Contemporary Artist'}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{artist.artworks_count ?? 0}</div>
                      <div className="text-xs text-gray-600">Artworks</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">{artist.followers_count ?? 0}+</div>
                      <div className="text-xs text-gray-600">Followers</div>
                    </div>
                  </div>
                  <Link href={getArtistUrl(artist)} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/profiles" className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition-colors">
              Explore All Artists
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600">Find artworks by genre and style</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Paintings', icon: '🎨', color: 'bg-red-100', textColor: 'text-red-600' },
              { name: 'Digital Art', icon: '💻', color: 'bg-blue-100', textColor: 'text-blue-600' },
              { name: 'Street Art', icon: '🏙️', color: 'bg-yellow-100', textColor: 'text-yellow-600' },
              { name: 'Photography', icon: '📸', color: 'bg-purple-100', textColor: 'text-purple-600' },
              { name: 'Sculpture', icon: '🗿', color: 'bg-gray-100', textColor: 'text-gray-600' },
              { name: 'Graffiti', icon: '🎪', color: 'bg-pink-100', textColor: 'text-pink-600' },
              { name: 'Animations', icon: '✨', color: 'bg-green-100', textColor: 'text-green-600' },
              { name: 'Mixed Media', icon: '🎭', color: 'bg-indigo-100', textColor: 'text-indigo-600' }
            ].map((category, idx) => (
              <Link key={idx} href={`/marketplace?category=${category.name}`}>
                <div className={`${category.color} rounded-xl p-8 text-center hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer`}>
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className={`text-xl font-bold ${category.textColor}`}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-909 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '1', title: 'Create Account', description: 'Sign up and complete your profile as a buyer or artist', icon: '👤' },
              { number: '2', title: 'Browse or Upload', description: 'Explore artworks or upload your creations to sell', icon: '📱' },
              { number: '3', title: 'Transact Securely', description: 'Buy or sell with safe, secure payment processing', icon: '💳' },
              { number: '4', title: 'Collect & Connect', description: 'Build your collection and connect with other art lovers', icon: '🎯' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a collector searching for unique pieces or an artist ready to showcase your talent, ArtMarket is your destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=buyer" className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors">
                Register as Buyer
              </Link>
              <Link href="/register?type=artist" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
                Register as Artist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </DynamicBackground>
  )
}
