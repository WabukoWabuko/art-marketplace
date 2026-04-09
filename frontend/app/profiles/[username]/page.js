'use client'

import { useEffect, useState } from 'react'
import { api } from '../../../lib/api'

export default function Profile({ params }) {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await api.getProfile(params.username)
        setProfile(data)
      } catch (e) {
        setError(e.message)
      }
    }
    loadProfile()
  }, [params.username])

  return (
    <main className="container mx-auto px-4 py-8">
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {!profile ? (
        <p className="text-gray-600">Loading profile...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-6">
              <img src={profile.profile_picture || '/placeholder-avatar.jpg'} alt={profile.username} className="w-20 h-20 rounded-full mr-6" />
              <div>
                <h1 className="text-3xl font-bold">{profile.username}</h1>
                <p className="text-gray-600">{profile.location || 'Artist'}</p>
              </div>
            </div>
            <p className="text-gray-700">{profile.bio || 'No profile biography yet.'}</p>
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Visit website</a>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
