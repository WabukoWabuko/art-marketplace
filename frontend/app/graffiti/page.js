'use client'

import Link from 'next/link'

const graffitiArtists = [
  {
    id: 1,
    name: 'Kaze One',
    location: 'Johannesburg, ZA',
    specialty: 'Large-scale murals, stencil street art',
    profile_picture: '/placeholder-avatar.jpg',
    bio: 'Kaze One blends graffiti heritage with modern expression through vibrant wall installations.',
  },
  {
    id: 2,
    name: 'Neon Mist',
    location: 'London, UK',
    specialty: 'Neon graffiti, experimental typography',
    profile_picture: '/placeholder-avatar.jpg',
    bio: 'Neon Mist pushes street art into digital textures and glowing mural compositions.',
  },
  {
    id: 3,
    name: 'Riot Bloom',
    location: 'São Paulo, BR',
    specialty: 'Urban portraits, political graffiti',
    profile_picture: '/placeholder-avatar.jpg',
    bio: 'Riot Bloom creates bold social murals that celebrate culture and ignite conversation.',
  },
]

export default function Graffiti() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_35%)]"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-300 mb-4">Graffiti & Street Art</p>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">The Urban Canvas Awaits</h1>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Explore authentic graffiti works, street art collections, and urban exhibitions from artists transforming city walls into cultural landmarks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/marketplace" className="inline-flex items-center justify-center bg-blue-500 px-8 py-4 rounded-full text-white font-semibold hover:bg-blue-400 transition-all duration-300">
                Browse Street Art
              </Link>
              <Link href="/events" className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                Find Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {graffitiArtists.map((artist) => (
              <div key={artist.id} className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-2xl shadow-slate-900/10">
                <div className="flex items-center gap-4 mb-5">
                  <img src={artist.profile_picture} alt={artist.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                  <div>
                    <h3 className="text-2xl font-bold">{artist.name}</h3>
                    <p className="text-sm text-slate-300">{artist.location}</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">{artist.bio}</p>
                <span className="inline-flex items-center rounded-full bg-blue-500/10 text-blue-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                  {artist.specialty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-blue-300 mb-4">Street Art Culture</p>
              <h2 className="text-4xl font-bold mb-6">Collect Bold Work, Support Emerging Artists</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                This page brings together graffiti artists, muralists, and street art fans. Find original pieces, limited editions, and creative collaborations that celebrate the vibrant energy of urban art.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/70 p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm">Exclusive drops from mural artists</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-6 border border-slate-800">
                  <p className="text-slate-400 text-sm">Street art tutorials and creative practice</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-fuchsia-600 p-8 shadow-2xl shadow-pink-500/20">
                <h3 className="text-xl font-bold mb-3">Graffiti Tours</h3>
                <p className="text-slate-100">Discover live street art tours and mural walks in major cities.</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-8 shadow-2xl shadow-emerald-500/20">
                <h3 className="text-xl font-bold mb-3">Artist Collaborations</h3>
                <p className="text-slate-100">Join artist collabs, pop-up exhibitions, and mural installation projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
