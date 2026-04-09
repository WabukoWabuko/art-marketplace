'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CurrencySelector from './CurrencySelector'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const profile = await response.json()
          setUser(profile)
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        setIsLoggedIn(false)
        setUser(null)
      }
    }

    fetchUserProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            ArtMarket
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link href="/" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Marketplace
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            </li>
            <li>
              <Link href="/events" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Events
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            </li>
            <li>
              <Link href="/graffiti" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Graffiti
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            </li>
            <li>
              <Link href="/tutorials" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                Tutorials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link href="/dashboard" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
              </li>
            )}
            {isLoggedIn && user?.is_staff && (
              <li>
                <Link href="/admin/dashboard" className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                  Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
              </li>
            )}
            <li className="ml-4">
              <CurrencySelector />
            </li>
            {/* Authentication Section */}
            {isLoggedIn ? (
              <li className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200">
                      {user?.first_name} {user?.last_name}
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-gray-700"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/events" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/graffiti" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Graffiti
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Tutorials
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Dashboard
                  </Link>
                </li>
              )}
              {isLoggedIn && user?.is_staff && (
                <li>
                  <Link href="/admin/dashboard" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Admin
                  </Link>
                </li>
              )}
              <li className="pt-4">
                <CurrencySelector />
              </li>
              {isLoggedIn && (
                <>
                  <li className="pt-4 border-t border-gray-200">
                    <Link href="/profile" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/wishlist" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Mobile Profile Menu */}
        {isProfileMenuOpen && isLoggedIn && (
          <div className="md:hidden absolute right-6 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200">
              {user?.first_name} {user?.last_name}
            </div>
            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
            <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Orders
            </Link>
            <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Wishlist
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}