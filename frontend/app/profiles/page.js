'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ProfilesPage() {
  const [artists] = useState([
    {
      id: 1,
      name: "Maria Silva",
      specialty: "Abstract Art",
      followers: 2400,
      artworks: 45,
      bio: "Contemporary artist creating bold abstract expressions",
      image: "/placeholder.jpg",
      country: "Spain"
    },
    {
      id: 2,
      name: "John Doe",
      specialty: "Street Art",
      followers: 1800,
      artworks: 32,
      bio: "Urban artist capturing city life and culture",
      image: "/placeholder.jpg",
      country: "USA"
    },
    {
      id: 3,
      name: "Lena Sparks",
      specialty: "Graffiti",
      followers: 3200,
      artworks: 58,
      bio: "Pioneering graffiti artist with international recognition",
      image: "/placeholder.jpg",
      country: "Germany"
    },
    {
      id: 4,
      name: "Anna Green",
      specialty: "Landscape",
      followers: 1600,
      artworks: 28,
      bio: "Nature-inspired painter capturing beautiful landscapes",
      image: "/placeholder.jpg",
      country: "Canada"
    },
    {
      id: 5,
      name: "Marco Rossi",
      specialty: "Digital Art",
      followers: 2800,
      artworks: 52,
      bio: "Digital artist exploring technology and art fusion",
      image: "/placeholder.jpg",
      country: "Italy"
    },
    {
      id: 6,
      name: "Nina Chen",
      specialty: "Photography",
      followers: 2100,
      artworks: 38,
      bio: "Documentary photographer telling stories through images",
      image: "/placeholder.jpg",
      country: "China"
    },
    {
      id: 7,
      name: "David Miller",
      specialty: "Sculpture",
      followers: 1300,
      artworks: 22,
      bio: "3D artist creating immersive sculptural experiences",
      image: "/placeholder.jpg",
      country: "UK"
    },
    {
      id: 8,
      name: "Sophie Laurent",
      specialty: "Mixed Media",
      followers: 2600,
      artworks: 41,
      bio: "Experimental artist combining traditional and modern techniques",
      image: "/placeholder.jpg",
      country: "France"
    },
    {
      id: 9,
      name: "Carlos Rodriguez",
      specialty: "Mural Art",
      followers: 3100,
      artworks: 67,
      bio: "Mural artist transforming urban spaces with color and meaning",
      image: "/placeholder.jpg",
      country: "Mexico"
    }
  ])

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
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <select className="px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600">
              <option>All Specialties</option>
              <option>Abstract Art</option>
              <option>Street Art</option>
              <option>Digital Art</option>
              <option>Photography</option>
              <option>Sculpture</option>
            </select>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Link key={artist.id} href={`/profiles/${artist.name.toLowerCase().replace(' ', '-')}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden cursor-pointer h-full">
                  <div className="relative h-48 bg-gradient-to-br from-pink-400 to-purple-500">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-4 right-4 bg-white text-pink-600 px-4 py-2 rounded-full text-xs font-bold">
                      {artist.country}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{artist.name}</h3>
                    <p className="text-pink-600 font-semibold mb-3">{artist.specialty}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{artist.bio}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-pink-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-pink-600">{artist.artworks}</div>
                        <div className="text-xs text-gray-600">Artworks</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-purple-600">{artist.followers}+</div>
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
