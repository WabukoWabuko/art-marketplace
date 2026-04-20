'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../../lib/api'
import DynamicBackground from '../../components/DynamicBackground'

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTutorials() {
      try {
        setLoading(true)
        const data = await api.getTutorials()
        setTutorials(data || [])
      } catch (e) {
        setError(e.message || 'Failed to load tutorials')
      } finally {
        setLoading(false)
      }
    }
    loadTutorials()
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
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Art Tutorials</h1>
            <p className="text-slate-300">Learn from expert artists and improve your skills</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg mb-6">
              Error: {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 shadow-xl">
                  <h3 className="text-2xl font-semibold text-white mb-4">No Tutorials Available</h3>
                  <p className="text-slate-300 mb-6">We&apos;re working on adding amazing tutorials. Check back soon!</p>
                  <Link
                    href="/marketplace"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Explore Artworks Instead
                  </Link>
                </div>
              </div>
            ) : (
              tutorials.map((tutorial) => (
                <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-xl hover:scale-105 transition-transform cursor-pointer group">
                    {tutorial.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={tutorial.image}
                          alt={tutorial.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-3">
                      {tutorial.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>By {tutorial.author_name || 'Expert Artist'}</span>
                      <span className="text-blue-400 group-hover:text-blue-300">Watch →</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </DynamicBackground>
  )
}
