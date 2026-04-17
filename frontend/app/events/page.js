'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import EventCounter from '../../components/EventCounter'
import { api } from '../../lib/api'

export default function EventsPage() {
const [events, setEvents] = useState([])
const [filteredEvents, setFilteredEvents] = useState([])
const [searchTerm, setSearchTerm] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All')
const [loading, setLoading] = useState(true)

const getRandomCategory = () => {
const categories = ['Exhibition', 'Workshop', 'Festival', 'Summit']
return categories[Math.floor(Math.random() * categories.length)]
}

useEffect(() => {
const fetchEvents = async () => {
try {
const data = await api.getEvents()


    const eventsWithDetails = data.map(event => ({
      ...event,
      attendees: Math.floor(Math.random() * 1000) + 100,
      category: event.category || getRandomCategory(),
      price: event.price || (Math.random() > 0.5 ? 'Free' : 'From $25'),
      longDescription: event.description || '',
      description: event.description || '',
      image: event.image || '/placeholder.jpg',
    }))

    setEvents(eventsWithDetails)
    setFilteredEvents(eventsWithDetails)
  } catch (error) {
    console.error('Error fetching events:', error)
  } finally {
    setLoading(false)
  }
}

fetchEvents()


}, [])

useEffect(() => {
let filtered = [...events]


if (searchTerm) {
  filtered = filtered.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

if (selectedCategory !== 'All') {
  filtered = filtered.filter(event => event.category === selectedCategory)
}

setFilteredEvents(filtered)


}, [searchTerm, selectedCategory, events])

return ( <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
{/* Hero Section */} <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-20"> <div className="container mx-auto px-6"> <h1 className="text-5xl font-bold text-white mb-4">
Art Events & Experiences </h1> <p className="text-xl text-purple-100">
Connect with the art community. Live exhibitions, workshops, and celebrations. </p> </div> </section>


  {/* Filter & Search */}
  <section className="py-12 bg-white border-b border-gray-200">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="All">All Categories</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Workshop">Workshop</option>
          <option value="Festival">Festival</option>
          <option value="Summit">Summit</option>
        </select>
      </div>
    </div>
  </section>

  {/* Events Grid */}
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No events found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer h-full">
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-indigo-500">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-purple-900/80 text-white px-4 py-2 rounded-full text-xs font-bold">
                    {event.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-purple-600 px-4 py-2 rounded-full text-xs font-bold">
                    {event.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center text-gray-600 mb-4 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-2.894 5.776A1 1 0 003.118 10h6.764a1 1 0 00.948-1.671L10.894 2.553z"></path>
                    </svg>
                    {event.location}
                  </div>

                  <div className="flex items-center text-gray-600 mb-6 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 7H9v6h4V7z"></path>
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm0 5a1 1 0 100 2h2a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {event.attendees.toLocaleString()} attending
                  </div>

                  <EventCounter
                    eventDate={event.date}
                    eventTitle={event.title}
                  />

                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>

  {/* Newsletter Section */}
  <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Never Miss an Event
        </h2>
        <p className="text-purple-100 mb-8">
          Subscribe to get notifications about upcoming art events and exclusive early access.
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </section>
</div>

)
}
