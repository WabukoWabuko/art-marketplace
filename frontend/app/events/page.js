'use client'

import { useState } from 'react'
import Link from 'next/link'
import EventCounter from '../../components/EventCounter'

export default function EventsPage() {
  const [events] = useState([
    {
      id: 1,
      title: "Spring Art Expo 2026",
      date: "2026-05-15T18:00:00Z",
      description: "Join us for the largest art exhibition of the season featuring works from 100+ international artists.",
      longDescription: "The Spring Art Expo is our flagship event, bringing together the best contemporary and traditional artworks. Experience live paintings, sculptures, digital installations, and graffiti art. Meet artists, participate in workshops, and network with collectors.",
      location: "Central Art Gallery, Downtown",
      image: "/placeholder.jpg",
      attendees: 5250,
      category: "Exhibition",
      price: "Free"
    },
    {
      id: 2,
      title: "Artist Masterclass Series",
      date: "2026-06-01T14:00:00Z",
      description: "Learn advanced techniques from internationally renowned artists in multiple disciplines.",
      longDescription: "This exclusive series brings world-renowned artists to share their techniques and creative processes. Perfect for aspiring artists looking to elevate their skills. Limited seats available.",
      location: "Online & In-Person Venues",
      image: "/placeholder.jpg",
      attendees: 450,
      category: "Workshop",
      price: "From $49"
    },
    {
      id: 3,
      title: "Graffiti Street Festival",
      date: "2026-07-20T10:00:00Z",
      description: "Celebrate urban art culture with live demonstrations, workshops, and competitions.",
      longDescription: "Experience urban art at its finest! Watch live graffiti artists create massive murals, compete in speed painting contests, and participate in hands-on workshops. Free for all ages.",
      location: "Downtown Arts District",
      image: "/placeholder.jpg",
      attendees: 8900,
      category: "Festival",
      price: "Free"
    },
    {
      id: 4,
      title: "Photography Expo 2026",
      date: "2026-08-10T15:00:00Z",
      description: "Showcase of contemporary and classic photography featuring work from emerging and established photographers.",
      longDescription: "Discover stunning visual narratives through the lens. Features portfolio reviews, photography competitions, and equipment exhibitions.",
      location: "Art Center, East Wing",
      image: "/placeholder.jpg",
      attendees: 3200,
      category: "Exhibition",
      price: "$15"
    },
    {
      id: 5,
      title: "Digital Art Summit",
      date: "2026-09-05T09:00:00Z",
      description: "Explore cutting-edge digital art creation, NFTs, and virtual galleries with industry experts.",
      longDescription: "Learn from leading digital artists and tech innovators. Keynote speakers, panel discussions, and hands-on sessions.",
      location: "Tech Hub Convention Center",
      image: "/placeholder.jpg",
      attendees: 2100,
      category: "Summit",
      price: "From $75"
    },
    {
      id: 6,
      title: "Sculpture & Installation Art Fair",
      date: "2026-10-12T11:00:00Z",
      description: "Major outdoor event showcasing large-scale sculptures and interactive art installations.",
      longDescription: "Experience immersive art installations in an outdoor garden setting. Perfect for collectors and art enthusiasts.",
      location: "Grand Art Park",
      image: "/placeholder.jpg",
      attendees: 6400,
      category: "Fair",
      price: "Free"
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-4">Art Events & Experiences</h1>
          <p className="text-xl text-purple-100">Connect with the art community. Live exhibitions, workshops, and celebrations.</p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <input type="text" placeholder="Search events..." className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <select className="px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option>All Categories</option>
              <option>Exhibition</option>
              <option>Workshop</option>
              <option>Festival</option>
              <option>Summit</option>
            </select>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer h-full">
                  <div className="relative h-48 bg-gradient-to-br from-purple-400 to-indigo-500">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-4 left-4 bg-purple-900/80 text-white px-4 py-2 rounded-full text-xs font-bold">
                      {event.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white text-purple-600 px-4 py-2 rounded-full text-xs font-bold">
                      {event.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="flex items-center text-gray-600 mb-4 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-2.894 5.776A1 1 0 003.118 10h6.764a1 1 0 00.948-1.671L10.894 2.553z"></path>
                      </svg>
                      {event.location}
                    </div>

                    <div className="flex items-center text-gray-600 mb-6 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 7H9v6h4V7z"></path>
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm0 5a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd"></path>
                      </svg>
                      {event.attendees.toLocaleString()} attending
                    </div>

                    <EventCounter eventDate={event.date} eventTitle={event.title} />

                    <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Never Miss an Event</h2>
            <p className="text-purple-100 mb-8">Subscribe to get notifications about upcoming art events and exclusive early access.</p>
            <div className="flex gap-3">
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400" />
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
