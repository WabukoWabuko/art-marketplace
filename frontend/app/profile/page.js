'use client'

import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import DynamicBackground from '../../components/DynamicBackground'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    specialty: '',
    location: ''
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      const userData = await api.getCurrentUser()
      setUser(userData)
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        bio: userData.bio || '',
        specialty: userData.specialty || '',
        location: userData.location || ''
      })
    } catch (error) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      // Note: This would need a backend endpoint to update profile
      // For now, just show success message
      setIsEditing(false)
      // You could add a toast notification here
    } catch (error) {
      setError('Failed to update profile')
    }
  }

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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                    />
                  ) : (
                    <p className="text-white text-lg">{user?.first_name || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                    />
                  ) : (
                    <p className="text-white text-lg">{user?.last_name || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <p className="text-white text-lg">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-white">{user?.bio || 'No bio added yet'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Specialty
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="e.g., Oil Painting, Digital Art..."
                    />
                  ) : (
                    <p className="text-white text-lg">{user?.specialty || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="City, Country"
                    />
                  ) : (
                    <p className="text-white text-lg">{user?.location || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DynamicBackground>
  )
}