'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '../../lib/api'
import DynamicBackground from '../../components/DynamicBackground'
import { useToast } from '../../components/Toast'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { showSuccess, showError } = useToast()

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

    try {
      const data = await api.login({
        email: formData.email,
        password: formData.password,
      })
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      // Dispatch storage event to update header
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'access_token',
        newValue: data.access
      }))
      showSuccess('Login successful! Redirecting to dashboard...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please check your credentials.'
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DynamicBackground>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-12 shadow-2xl shadow-slate-950/40 backdrop-blur-xl text-white">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600">
              <span className="text-3xl font-extrabold">A</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">UrbanKreative Access</h1>
            <p className="mt-3 text-slate-300">Fast, secure login to your artist and collector dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5 rounded-[1.75rem] bg-slate-900/90 p-6 shadow-inner shadow-slate-950/20 border border-white/10">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@urbankreative.co.ke"
                  className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-blue-500 focus:ring-blue-500" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-medium text-blue-300 hover:text-blue-200">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[1.75rem] bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Continue to dashboard'}
            </button>
          </form>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6 text-center">
            <p className="text-sm text-slate-400">New to UrbanKreative?</p>
            <Link
              href="/register"
              className="mt-4 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </DynamicBackground>
  )
}
