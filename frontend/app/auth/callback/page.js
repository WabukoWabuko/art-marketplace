'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing authentication...')
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        const error = urlParams.get('error')

        if (error) {
          setStatus('Authentication failed. Redirecting to login...')
          setTimeout(() => router.push('/login'), 2000)
          return
        }

        if (code) {
          const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
          const response = await fetch(`${apiBase}/auth/complete/google-oauth2/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: code,
              state: state,
            }),
          })

          if (response.ok) {
            const data = await response.json()
            if (data.access_token) {
              localStorage.setItem('access_token', data.access_token)
              localStorage.setItem('refresh_token', data.refresh_token)
              setStatus('Authentication successful! Redirecting...')
              setTimeout(() => router.push('/'), 2000)
            } else {
              setStatus('Authentication failed. Redirecting to login...')
              setTimeout(() => router.push('/login'), 2000)
            }
          } else {
            setStatus('Authentication failed. Redirecting to login...')
            setTimeout(() => router.push('/login'), 2000)
          }
        } else {
          setStatus('No authorization code received. Redirecting to login...')
          setTimeout(() => router.push('/login'), 2000)
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        setStatus('Authentication error. Redirecting to login...')
        setTimeout(() => router.push('/login'), 2000)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-600">
            <svg className="h-6 w-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {status}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please wait while we complete your authentication.
          </p>
        </div>
      </div>
    </div>
  )
}