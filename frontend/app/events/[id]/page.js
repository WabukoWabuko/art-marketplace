'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import EventCounter from '../../../components/EventCounter'
import { api } from '../../../lib/api'

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await api.getEvent(params.id)
        setEvent(data)
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/events"
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
            <p className="text-xl text-purple-100">{event.description}</p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Event Image */}
              <div className="relative h-96 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 left-4 bg-purple-900/80 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {event.category || 'Event'}
                </div>
              </div>

              {/* Event Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Details</h2>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                      <span className="font-semibold">Date:</span>
                      <span className="ml-2">{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      <span className="font-semibold">Time:</span>
                      <span className="ml-2">{new Date(event.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="font-semibold">Location:</span>
                      <span className="ml-2">{event.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 7H9v6h4V7z"></path>
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm0 5a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd"></path>
                      </svg>
                      <span className="font-semibold">Attendees:</span>
                      <span className="ml-2">{Math.floor(Math.random() * 1000) + 100} registered</span>
                    </div>
                  </div>
                </div>

                {/* Event Counter */}
                <EventCounter eventDate={event.date} eventTitle={event.title} />

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Register for Event
                  </button>
                  <button className="flex-1 border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Full Description */}
            {event.long_description && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">About This Event</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">{event.long_description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back to Events */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <Link
            href="/events"
            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition-colors"
          >
            ← Back to All Events
          </Link>
        </div>
      </section>
    </div>
  )
}