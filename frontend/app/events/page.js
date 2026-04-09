'use client'

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Events() {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await api.getEvents()
        setEvents(data)
      } catch (e) {
        setError(e.message)
      }
    }
    loadEvents()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Art Events</h1>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="text-gray-600">Loading events...</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-4">Location: {event.location}</p>
              <p className="mb-4">{event.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
