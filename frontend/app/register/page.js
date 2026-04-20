'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '../../lib/api'

export default function Register() {
  const params = useSearchParams()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    user_type: 'buyer',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    const type = params?.get('type')
    if (type === 'artist' || type === 'buyer') {
      setFormData((prev) => ({ ...prev, user_type: type }))
    }
  }, [params])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (formData.password !== formData.password2) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const data = await api.register({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_type: formData.user_type,
      })
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      setSuccess('Account created successfully! Redirecting to dashboard...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1800)
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_40%),_radial-gradient(circle_at_bottom,_rgba(168,85,247,0.2),_transparent_35%),_linear-gradient(to_bottom,_#020617,_#111827)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-12 shadow-2xl shadow-slate-950/40 backdrop-blur-xl text-white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">Vision 2030</span>
            <h1 className="text-4xl font-semibold text-white">Create a better art future.</h1>
            <p className="text-slate-300 leading-relaxed">Join as a buyer or artist and experience a premium marketplace designed for the next generation of art commerce.</p>
            <div className="grid gap-3">
              <div className="rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                <h2 className="text-sm font-semibold text-blue-300">Secure access</h2>
                <p className="mt-2 text-sm text-slate-400">Everything is encrypted for your privacy and safety.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                <h2 className="text-sm font-semibold text-blue-300">Instant onboarding</h2>
                <p className="mt-2 text-sm text-slate-400">Register quickly and start browsing premium collections immediately.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-900/90 p-10 shadow-inner shadow-slate-950/20 border border-white/10">
            <h2 className="text-3xl font-semibold text-white mb-8">Create your account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  {success}
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-300">
                  First name
                  <input
                    name="first_name"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Maria"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  Last name
                  <input
                    name="last_name"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Silva"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-300">
                Email address
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                  placeholder="you@artmarket.com"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Choose a secure password"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  Confirm password
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    value={formData.password2}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Confirm your password"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-300">
                Account type
                <select
                  id="user_type"
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="buyer">Buyer</option>
                  <option value="artist">Artist</option>
                </select>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[1.75rem] bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create my account'}
              </button>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-blue-300 hover:text-blue-200">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
