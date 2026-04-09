'use client'

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTutorials() {
      try {
        const data = await api.getTutorials()
        setTutorials(data)
      } catch (e) {
        setError(e.message)
      }
    }
    loadTutorials()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Art Tutorials</h1>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.length === 0 ? (
          <p className="text-gray-600">Loading tutorials...</p>
        ) : (
          tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 mb-4">{tutorial.description}</p>
              <a href={tutorial.video_url} className="text-purple-600 hover:underline">Watch</a>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
